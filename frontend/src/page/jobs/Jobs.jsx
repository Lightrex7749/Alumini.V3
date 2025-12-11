import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Briefcase, SlidersHorizontal, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import MainNavbar from '@/components/layout/MainNavbar';
import Footer from '@/components/layout/Footer';
import JobCard from '@/components/jobs/JobCard';
import JobSearchBar from '@/components/jobs/JobSearchBar';
import JobFilterSidebar from '@/components/jobs/JobFilterSidebar';
import JobSortDropdown from '@/components/jobs/JobSortDropdown';
import SkeletonCard from '@/components/loading/SkeletonCard';
import EmptyState from '@/components/empty-states/EmptyState';
import { filterJobs, sortJobs, paginateResults } from '@/services/mockJobService';

const Jobs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('recent');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  // Check if user can post jobs (alumni or recruiter)
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  const canPostJobs = ['alumni', 'recruiter'].includes(currentUser.role);

  // Filters state
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    companies: searchParams.getAll('company') || [],
    locations: searchParams.getAll('location') || [],
    jobTypes: searchParams.getAll('type') || [],
    skills: searchParams.getAll('skill') || [],
    experienceLevels: searchParams.getAll('experience') || [],
  });

  // Results state
  const [results, setResults] = useState({
    data: [],
    totalPages: 0,
    totalResults: 0,
    currentPage: 1,
    hasMore: false,
  });

  // Load results
  const loadResults = useCallback(() => {
    setLoading(true);
    try {
      let filtered = filterJobs(filters);
      filtered = sortJobs(filtered, sortBy);
      const paginated = paginateResults(filtered, currentPage, pageSize);
      setResults(paginated);
    } catch (error) {
      console.error('Error loading results:', error);
    } finally {
      setLoading(false);
    }
  }, [filters, sortBy, currentPage]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadResults();
    }, 300);
    return () => clearTimeout(timer);
  }, [loadResults]);

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.search) params.set('search', filters.search);
    filters.companies?.forEach(c => params.append('company', c));
    filters.locations?.forEach(l => params.append('location', l));
    filters.jobTypes?.forEach(t => params.append('type', t));
    filters.skills?.forEach(s => params.append('skill', s));
    filters.experienceLevels?.forEach(e => params.append('experience', e));
    setSearchParams(params);
  }, [filters, setSearchParams]);

  const handleSearchChange = (value) => {
    setFilters({ ...filters, search: value });
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      companies: [],
      locations: [],
      jobTypes: [],
      skills: [],
      experienceLevels: [],
    });
    setCurrentPage(1);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col" data-testid="jobs-page">
      <MainNavbar />
      
      <main className="flex-1 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 rounded-2xl p-8 text-white overflow-hidden shadow-2xl">
              {/* Animated background */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-30"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              
              <div className="flex items-center justify-between relative z-10">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                      <Briefcase className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight">Job Opportunities</h1>
                  </div>
                  <p className="text-blue-100 text-lg">
                    Discover exciting career opportunities from our alumni network
                  </p>
                </div>
                {canPostJobs && (
                  <Button 
                    onClick={() => navigate('/jobs/post')}
                    className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg hover:scale-105 transition-transform duration-300"
                    size="lg"
                    data-testid="post-job-button"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Post Job
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Search and Sort */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <JobSearchBar
                value={filters.search}
                onChange={handleSearchChange}
              />
            </div>
            <div className="flex gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="md:hidden">
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4">
                    <JobFilterSidebar
                      filters={filters}
                      onFilterChange={handleFilterChange}
                      onClearAll={handleClearFilters}
                    />
                  </div>
                </SheetContent>
              </Sheet>
              <JobSortDropdown value={sortBy} onChange={handleSortChange} />
            </div>
          </div>

          <div className="flex gap-6">
            {/* Desktop Filter Sidebar */}
            <aside className="hidden md:block w-64 flex-shrink-0">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sticky top-4">
                <JobFilterSidebar
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClearAll={handleClearFilters}
                />
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Results Count */}
              <div className="mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400" data-testid="results-count">
                  {loading ? 'Loading...' : `${results.totalResults} job${results.totalResults !== 1 ? 's' : ''} found`}
                </p>
              </div>

              {/* Job Grid */}
              {loading ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <SkeletonCard key={i} variant="job" />
                  ))}
                </div>
              ) : results.data.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4" data-testid="jobs-grid">
                    {results.data.map((job) => (
                      <JobCard key={job.id} job={job} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {results.totalPages > 1 && (
                    <div className="mt-8 flex justify-center">
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious
                              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                              className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                            />
                          </PaginationItem>
                          
                          {[...Array(results.totalPages)].map((_, i) => {
                            const page = i + 1;
                            if (
                              page === 1 ||
                              page === results.totalPages ||
                              (page >= currentPage - 1 && page <= currentPage + 1)
                            ) {
                              return (
                                <PaginationItem key={page}>
                                  <PaginationLink
                                    onClick={() => handlePageChange(page)}
                                    isActive={page === currentPage}
                                    className="cursor-pointer"
                                  >
                                    {page}
                                  </PaginationLink>
                                </PaginationItem>
                              );
                            } else if (
                              page === currentPage - 2 ||
                              page === currentPage + 2
                            ) {
                              return (
                                <PaginationItem key={page}>
                                  <span className="px-4">...</span>
                                </PaginationItem>
                              );
                            }
                            return null;
                          })}

                          <PaginationItem>
                            <PaginationNext
                              onClick={() => handlePageChange(Math.min(results.totalPages, currentPage + 1))}
                              className={currentPage === results.totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  )}
                </>
              ) : (
                <EmptyState
                  icon={Briefcase}
                  title="No jobs found"
                  description="Try adjusting your search or filters to find more opportunities"
                  action={{
                    label: "Clear Filters",
                    onClick: handleClearFilters
                  }}
                />
              )}
            </div>
          </div>

          {/* Manage Jobs Link */}
          {canPostJobs && (
            <div className="mt-8 text-center">
              <Button 
                variant="outline" 
                onClick={() => navigate('/jobs/manage')}
                data-testid="manage-jobs-button"
              >
                Manage My Jobs
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Jobs;
