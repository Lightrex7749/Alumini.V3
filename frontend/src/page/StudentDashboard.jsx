import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { mockProfileService } from '@/services/mockProfileService';
import { mockLeaderboardService } from '@/services/mockLeaderboardService';
import { createMentorshipRequest } from '@/services/mockMentorshipService';
import MainNavbar from '@/components/layout/MainNavbar';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Users, Briefcase, Calendar, MessageSquare, Award, TrendingUp, Eye, FileText, UserCheck, Trophy } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import mockData from '@/mockdata.json';
import { BlurFade, StaggerContainer, StaggerItem, BorderBeam, SpotlightCard } from '@/components/ui/aceternity';

const StudentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [applications, setApplications] = useState([]);
  const [mentorshipRequests, setMentorshipRequests] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [recommendedMentors, setRecommendedMentors] = useState([]);
  const [engagementScore, setEngagementScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [connectDialogOpen, setConnectDialogOpen] = useState(false);
  const [requestMessage, setRequestMessage] = useState('');
  const [requestGoals, setRequestGoals] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [profileData, appsData, mentorRequests, scoreData] = await Promise.all([
          mockProfileService.getProfileByUserId(user.id),
          mockProfileService.getJobApplicationsByUser(user.id),
          mockProfileService.getMentorshipRequestsByStudent(user.id),
          mockLeaderboardService.getMyScore(user.id),
        ]);

        setProfile(profileData);
        setApplications(appsData);
        setMentorshipRequests(mentorRequests);
        if (scoreData.success) setEngagementScore(scoreData.data);
        
        // Get upcoming events
        const events = mockData.events?.filter(e => 
          new Date(e.start_date) > new Date()
        ).slice(0, 3) || [];
        setUpcomingEvents(events);

        // Get recommended mentors
        const mentors = mockData.mentor_profiles?.slice(0, 3) || [];
        setRecommendedMentors(mentors);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user.id]);

  const handleConnectClick = (mentor) => {
    setSelectedMentor(mentor);
    setConnectDialogOpen(true);
    setRequestMessage('');
    setRequestGoals('');
  };

  const handleSendRequest = async () => {
    if (!requestMessage.trim() || !requestGoals.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const result = await createMentorshipRequest({
        student_id: user.id,
        mentor_id: selectedMentor.user_id,
        request_message: requestMessage,
        goals: requestGoals,
        preferred_topics: [],
      });

      if (result.success) {
        toast.success('Mentorship request sent successfully!');
        setConnectDialogOpen(false);
        setRequestMessage('');
        setRequestGoals('');
        // Reload mentorship requests
        const mentorRequests = await mockProfileService.getMentorshipRequestsByStudent(user.id);
        setMentorshipRequests(mentorRequests);
      } else {
        toast.error('Failed to send request');
      }
    } catch (error) {
      console.error('Error sending mentorship request:', error);
      toast.error('An error occurred');
    }
  };

  const handleViewMentorProfile = (mentorUserId) => {
    navigate(`/mentorship/mentor/${mentorUserId}`);
  };

  const profileCompletion = profile?.profile_completion_percentage || 0;
  const recentApplications = applications.slice(0, 3);
  const upcomingSessions = mentorshipRequests.filter(r => r.status === 'accepted').slice(0, 2);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <MainNavbar />
      
      <div className="flex flex-1">
        <Sidebar />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Welcome Section */}
            <BlurFade delay={0.1}>
            <div className="relative bg-gradient-to-br from-blue-600 via-cyan-600 to-purple-600 rounded-2xl p-8 text-white overflow-hidden shadow-2xl">
              {/* Animated background */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-30"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-400/20 rounded-full blur-2xl"></div>
              
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between relative z-10 gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-3xl">👋</span>
                    </div>
                    <div>
                      <h1 className="text-4xl font-bold tracking-tight">Welcome back, Student!</h1>
                      <p className="text-blue-100 mt-1 text-sm">Let's continue your journey</p>
                    </div>
                  </div>
                  <p className="text-blue-50 text-lg max-w-2xl">
                    Ready to advance your career? Check out your personalized recommendations below.
                  </p>
                </div>
                {engagementScore && engagementScore.total_score > 0 && (
                  <Badge 
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-white/30 text-lg px-5 py-3 cursor-pointer flex items-center gap-2 shadow-lg hover:scale-105 transition-transform duration-300"
                    onClick={() => navigate('/leaderboard')}
                    data-testid="engagement-points-badge"
                  >
                    <Trophy className="h-5 w-5" />
                    <span className="font-bold">{engagementScore.total_score}</span>
                    <span className="text-sm">points</span>
                  </Badge>
                )}
              </div>
            </div>
            </BlurFade>

            {/* Profile Completion */}
            <BlurFade delay={0.2}>
            <Card className="border-blue-100 bg-gradient-to-br from-blue-50/50 to-purple-50/50 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                        <UserCheck className="h-5 w-5 text-white" />
                      </div>
                      <span>Profile Completion</span>
                    </CardTitle>
                    <CardDescription className="mt-2">
                      Complete your profile to unlock all features and get better recommendations
                    </CardDescription>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {profileCompletion}%
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Progress value={profileCompletion} className="h-3" />
                  <div className="mt-2 text-xs text-gray-500 text-center">
                    {profileCompletion === 100 ? '🎉 Profile Complete!' : `${100 - profileCompletion}% remaining`}
                  </div>
                </div>
                {profileCompletion < 100 && (
                  <div className="flex gap-2">
                    <Button asChild className="w-full" data-testid="complete-profile-btn">
                      <Link to="/profile">Complete Profile</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            </BlurFade>

            {/* Quick Actions */}
            <BlurFade delay={0.3}>
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Get started with these common tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Link to="/mentorship/find" className="group relative p-6 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800 overflow-hidden" data-testid="find-mentor-btn">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-base font-bold text-gray-900 mb-1">Find a Mentor</div>
                      <div className="text-sm text-gray-500">Connect with experienced alumni</div>
                    </div>
                  </Link>
                  <Link to="/mentorship/dashboard" className="group relative p-6 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-purple-500 dark:hover:border-purple-400 hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800 overflow-hidden" data-testid="my-mentorship-btn">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <UserCheck className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-base font-bold text-gray-900 mb-1">My Mentorship</div>
                      <div className="text-sm text-gray-500">View sessions and requests</div>
                    </div>
                  </Link>
                  <Link to="/jobs" className="group relative p-6 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-green-500 dark:hover:border-green-400 hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800 overflow-hidden" data-testid="browse-jobs-btn">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Briefcase className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-base font-bold text-gray-900 mb-1">Browse Jobs</div>
                      <div className="text-sm text-gray-500">Find your next opportunity</div>
                    </div>
                  </Link>
                  <Link to="/jobs/my-applications" className="group relative p-6 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-orange-500 dark:hover:border-orange-400 hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800 overflow-hidden" data-testid="my-applications-btn">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <FileText className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-base font-bold text-gray-900 mb-1">My Applications</div>
                      <div className="text-sm text-gray-500">Track your applications</div>
                    </div>
                  </Link>
                </div>
              </CardContent>
            </Card>
            </BlurFade>

            <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Applications */}
              <StaggerItem>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Applications</CardTitle>
                  <CardDescription>Track your job application status</CardDescription>
                </CardHeader>
                <CardContent>
                  {recentApplications.length > 0 ? (
                    <div className="space-y-3">
                      {recentApplications.map(app => {
                        const job = mockData.jobs?.find(j => j.id === app.job_id);
                        return (
                          <div 
                            key={app.id} 
                            className="flex items-start justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={() => navigate(`/jobs/${app.job_id}`)}
                            data-testid={`application-${app.id}`}
                          >
                            <div className="flex-1">
                              <p className="font-medium text-sm">{job?.title || 'Job Title'}</p>
                              <p className="text-xs text-gray-500">{job?.company || 'Company'}</p>
                              <div className="mt-1">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                  app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                  app.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                                  app.status === 'shortlisted' ? 'bg-green-100 text-green-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {app.status}
                                </span>
                              </div>
                            </div>
                            <Button size="sm" variant="ghost" data-testid={`view-application-${app.id}`}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        );
                      })}
                      <Button asChild variant="outline" className="w-full" size="sm" data-testid="view-all-applications-btn">
                        <Link to="/jobs/my-applications">View All Applications</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Briefcase className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p className="text-sm">No applications yet</p>
                      <Button asChild size="sm" className="mt-3">
                        <Link to="/jobs">Browse Jobs</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
              </StaggerItem>

              {/* Recommended Mentors */}
              <StaggerItem>
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Mentors</CardTitle>
                  <CardDescription>Connect with alumni in your field</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recommendedMentors.map(mentor => {
                      const mentorUser = mockData.users?.find(u => u.id === mentor.user_id);
                      const mentorProfile = mockData.alumni_profiles?.find(p => p.user_id === mentor.user_id);
                      const hasRequested = mentorshipRequests.some(r => r.mentor_id === mentor.user_id && r.status === 'pending');
                      const isConnected = mentorshipRequests.some(r => r.mentor_id === mentor.user_id && r.status === 'accepted');
                      
                      return (
                        <div key={mentor.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <img
                              src={mentorProfile?.photo_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${mentorUser?.email}`}
                              alt={mentorProfile?.name}
                              className="h-10 w-10 rounded-full"
                            />
                            <div>
                              <p className="font-medium text-sm">{mentorProfile?.name}</p>
                              <p className="text-xs text-gray-500">{mentorProfile?.current_role}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleViewMentorProfile(mentor.user_id)}
                              data-testid={`view-profile-${mentor.id}`}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button 
                              size="sm" 
                              onClick={() => handleConnectClick(mentor)}
                              disabled={hasRequested || isConnected}
                              data-testid={`connect-btn-${mentor.id}`}
                            >
                              {isConnected ? 'Connected' : hasRequested ? 'Requested' : 'Connect'}
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                    <Button asChild variant="outline" className="w-full" size="sm">
                      <Link to="/mentorship/find">View All Mentors</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              </StaggerItem>
            </StaggerContainer>

            {/* Upcoming Sessions */}
            {upcomingSessions.length > 0 && (
              <BlurFade delay={0.4}>
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Mentorship Sessions</CardTitle>
                  <CardDescription>Your scheduled sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingSessions.map(session => {
                      const mentor = mockData.alumni_profiles?.find(p => p.user_id === session.mentor_id);
                      return (
                        <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <MessageSquare className="h-8 w-8 text-blue-600" />
                            <div>
                              <p className="font-medium text-sm">Session with {mentor?.name}</p>
                              <p className="text-xs text-gray-500">Status: {session.status}</p>
                            </div>
                          </div>
                          <Button size="sm" asChild data-testid={`view-session-${session.id}`}>
                            <Link to="/mentorship/dashboard">View Details</Link>
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
              </BlurFade>
            )}
          </div>
        </main>
      </div>
      
      {/* Connect Dialog */}
      <Dialog open={connectDialogOpen} onOpenChange={setConnectDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Request Mentorship</DialogTitle>
            <DialogDescription>
              Send a mentorship request to {selectedMentor && mockData.alumni_profiles?.find(p => p.user_id === selectedMentor.user_id)?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                placeholder="Introduce yourself and explain why you'd like this person as a mentor..."
                value={requestMessage}
                onChange={(e) => setRequestMessage(e.target.value)}
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="goals">Your Goals *</Label>
              <Textarea
                id="goals"
                placeholder="What do you hope to achieve with this mentorship?"
                value={requestGoals}
                onChange={(e) => setRequestGoals(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConnectDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendRequest}>
              Send Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default StudentDashboard;
