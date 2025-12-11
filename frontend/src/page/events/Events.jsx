import { useState, useEffect } from 'react';
import { Search, Plus, Filter, Calendar as CalendarIcon } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import EventCard from '@/components/events/EventCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import SkeletonCard from '@/components/loading/SkeletonCard';
import EmptyState from '@/components/empty-states/EmptyState';
import mockEventService from '@/services/mockEventService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Events = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [activeTab, setActiveTab] = useState('upcoming');

  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  const canCreateEvent = ['admin', 'alumni'].includes(currentUser.role);

  useEffect(() => {
    loadEvents();
  }, [activeTab, selectedType, searchTerm]);

  const loadEvents = async () => {
    setLoading(true);
    try {
      const filters = {
        status: activeTab,
        search: searchTerm
      };
      
      if (selectedType !== 'all') {
        filters.type = selectedType;
      }

      const response = await mockEventService.getEvents(filters);
      
      if (response.success) {
        setEvents(response.data);
      } else {
        toast.error('Failed to load events');
      }
    } catch (error) {
      toast.error('Error loading events');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-7xl" data-testid="events-page">
        {/* Header */}
        <div className="mb-8">
          <div className="relative bg-gradient-to-br from-orange-600 via-pink-600 to-purple-600 rounded-2xl p-8 text-white overflow-hidden shadow-2xl">
            {/* Animated background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-30"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                    <CalendarIcon className="w-6 h-6 text-white" />
                  </div>
                  <h1 className="text-4xl font-bold tracking-tight">Events</h1>
                </div>
                <p className="text-orange-100 text-lg">
                  Discover and join upcoming workshops, webinars, and networking events
                </p>
              </div>
              {canCreateEvent && (
                <div className="flex gap-3">
                  <Button 
                    onClick={() => navigate('/events/create')}
                    className="bg-white text-orange-600 hover:bg-gray-100 shadow-lg hover:scale-105 transition-transform duration-300"
                    size="lg"
                    data-testid="create-event-button"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Create Event
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/events/manage')}
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
                    size="lg"
                    data-testid="manage-events-button"
                  >
                    Manage My Events
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search events..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                data-testid="search-events-input"
              />
            </div>
            
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full sm:w-[200px]" data-testid="event-type-filter">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Event Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="workshop">Workshop</SelectItem>
                <SelectItem value="webinar">Webinar</SelectItem>
                <SelectItem value="conference">Conference</SelectItem>
                <SelectItem value="networking">Networking</SelectItem>
                <SelectItem value="meetup">Meetup</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="upcoming" data-testid="upcoming-tab">
              Upcoming Events
            </TabsTrigger>
            <TabsTrigger value="past" data-testid="past-tab">
              Past Events
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-6">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <SkeletonCard key={i} variant="event" />
                ))}
              </div>
            ) : events.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={CalendarIcon}
                title="No upcoming events"
                description={
                  searchTerm || selectedType !== 'all'
                    ? 'Try adjusting your filters to find more events'
                    : 'Check back later for new events and announcements'
                }
              />
            )}
          </TabsContent>

          <TabsContent value="past" className="mt-6">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                  <SkeletonCard key={i} variant="event" />
                ))}
              </div>
            ) : events.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={CalendarIcon}
                title="No past events"
                description="Past events and their recordings will appear here"
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Events;
