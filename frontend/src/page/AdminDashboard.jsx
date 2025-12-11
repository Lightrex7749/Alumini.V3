import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { mockProfileService } from '@/services/mockProfileService';
import MainNavbar from '@/components/layout/MainNavbar';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Briefcase, Calendar, AlertCircle, TrendingUp, CheckCircle, UserCheck, Award, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import mockData from '@/mockdata.json';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [systemStats, setSystemStats] = useState(null);
  const [pendingVerifications, setPendingVerifications] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [stats, verifications] = await Promise.all([
          mockProfileService.getSystemStats(),
          mockProfileService.getPendingVerifications(),
        ]);

        setSystemStats(stats);
        setPendingVerifications(verifications);

        // Mock recent activity
        const activity = [
          { id: 1, type: 'user', message: 'New user registered: maria.garcia@alumni.edu', time: '5 minutes ago' },
          { id: 2, type: 'job', message: 'New job posted: Senior Full-Stack Engineer', time: '1 hour ago' },
          { id: 3, type: 'event', message: 'Event created: Tech Career Fair 2025', time: '2 hours ago' },
          { id: 4, type: 'verification', message: 'Profile verification requested', time: '3 hours ago' },
          { id: 5, type: 'user', message: 'User login: david.kim@techcorp.com', time: '4 hours ago' },
        ];
        setRecentActivity(activity);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user.id]);

  const stats = [
    {
      title: 'Total Users',
      value: systemStats?.totalUsers || 0,
      icon: Users,
      change: '+12% this month',
      changeType: 'positive',
    },
    {
      title: 'Verified Alumni',
      value: systemStats?.verifiedAlumni || 0,
      icon: UserCheck,
      change: `${systemStats?.totalUsers || 0} total users`,
      changeType: 'neutral',
    },
    {
      title: 'Active Jobs',
      value: systemStats?.activeJobs || 0,
      icon: Briefcase,
      change: 'Currently active',
      changeType: 'positive',
    },
    {
      title: 'Upcoming Events',
      value: systemStats?.upcomingEvents || 0,
      icon: Calendar,
      change: 'Scheduled',
      changeType: 'neutral',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <MainNavbar />
      
      <div className="flex flex-1">
        <Sidebar />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Welcome Section */}
            <div className="relative bg-gradient-to-br from-red-600 via-pink-600 to-purple-600 rounded-2xl p-8 text-white overflow-hidden shadow-xl shadow-red-500/20">
              {/* Animated Background */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-50"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-400/20 rounded-full blur-2xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-3xl">🛡️</span>
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold tracking-tight">Admin Dashboard</h1>
                    <p className="text-red-100 mt-1 text-sm">System Control Center</p>
                  </div>
                </div>
                <p className="mt-4 text-red-50 text-lg max-w-2xl">
                  Monitor platform health, manage users, and oversee all system operations from this central hub.
                </p>
              </div>
            </div>

            {/* Pending Verifications Alert */}
            {pendingVerifications.length > 0 && (
              <Card className="border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 shadow-lg shadow-amber-100/50 hover:shadow-xl hover:shadow-amber-100/70 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/30">
                      <AlertCircle className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-amber-900 text-lg font-bold">
                        {pendingVerifications.length} Pending Verification{pendingVerifications.length !== 1 ? 's' : ''}
                      </CardTitle>
                      <CardDescription className="text-amber-700 text-sm">
                        Alumni profiles waiting for verification
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button asChild size="default" className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-lg shadow-amber-500/30 font-semibold">
                    <Link to="/admin/verifications">Review Verifications →</Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                const gradients = [
                  'from-blue-500 to-cyan-500',
                  'from-purple-500 to-pink-500',
                  'from-orange-500 to-red-500',
                  'from-green-500 to-emerald-500',
                ];
                const gradient = gradients[index % gradients.length];
                
                return (
                  <Card key={index} className="group relative overflow-hidden hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 border-gray-100">
                    {/* Gradient Background on Hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                    
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
                      <CardTitle className="text-sm font-semibold text-gray-600">
                        {stat.title}
                      </CardTitle>
                      <div className={`w-10 h-10 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <div className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                        {stat.value}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${gradient}`}></div>
                        <p className={`text-xs font-medium ${
                          stat.changeType === 'positive' ? 'text-green-600' :
                          stat.changeType === 'negative' ? 'text-red-600' :
                          'text-gray-600'
                        }`}>
                          {stat.change}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks - Full database management</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <Link to="/admin/users" className="p-4 border rounded-lg hover:bg-gray-50 hover:border-red-500 transition-all" data-testid="admin-link-users">
                    <Users className="h-8 w-8 text-blue-600 mb-2" />
                    <div className="text-sm font-medium text-gray-900">Manage Users</div>
                    <div className="text-xs text-gray-500 mt-1">View, edit & delete users</div>
                  </Link>
                  <Link to="/admin/verifications" className="p-4 border rounded-lg hover:bg-gray-50 hover:border-red-500 transition-all" data-testid="admin-link-verifications">
                    <CheckCircle className="h-8 w-8 text-green-600 mb-2" />
                    <div className="text-sm font-medium text-gray-900">Verifications</div>
                    <div className="text-xs text-gray-500 mt-1">Approve/reject profiles</div>
                  </Link>
                  <Link to="/admin/moderation" className="p-4 border rounded-lg hover:bg-gray-50 hover:border-red-500 transition-all" data-testid="admin-link-moderation">
                    <AlertCircle className="h-8 w-8 text-yellow-600 mb-2" />
                    <div className="text-sm font-medium text-gray-900">Content Moderation</div>
                    <div className="text-xs text-gray-500 mt-1">Review flagged content</div>
                  </Link>
                  <Link to="/admin/jobs" className="p-4 border rounded-lg hover:bg-gray-50 hover:border-red-500 transition-all" data-testid="admin-link-jobs">
                    <Briefcase className="h-8 w-8 text-indigo-600 mb-2" />
                    <div className="text-sm font-medium text-gray-900">Jobs Management</div>
                    <div className="text-xs text-gray-500 mt-1">Manage all job postings</div>
                  </Link>
                  <Link to="/admin/events" className="p-4 border rounded-lg hover:bg-gray-50 hover:border-red-500 transition-all" data-testid="admin-link-events">
                    <Calendar className="h-8 w-8 text-orange-600 mb-2" />
                    <div className="text-sm font-medium text-gray-900">Events Management</div>
                    <div className="text-xs text-gray-500 mt-1">Manage all events</div>
                  </Link>
                  <Link to="/admin/mentorship" className="p-4 border rounded-lg hover:bg-gray-50 hover:border-red-500 transition-all" data-testid="admin-link-mentorship">
                    <Users className="h-8 w-8 text-teal-600 mb-2" />
                    <div className="text-sm font-medium text-gray-900">Mentorship</div>
                    <div className="text-xs text-gray-500 mt-1">Manage mentorships</div>
                  </Link>
                  <Link to="/admin/badges" className="p-4 border rounded-lg hover:bg-gray-50 hover:border-red-500 transition-all" data-testid="admin-link-badges">
                    <Award className="h-8 w-8 text-yellow-600 mb-2" />
                    <div className="text-sm font-medium text-gray-900">Badge Management</div>
                    <div className="text-xs text-gray-500 mt-1">Create & manage badges</div>
                  </Link>
                  <Link to="/admin/knowledge-capsules" className="p-4 border rounded-lg hover:bg-gray-50 hover:border-red-500 transition-all" data-testid="admin-link-capsules">
                    <AlertCircle className="h-8 w-8 text-pink-600 mb-2" />
                    <div className="text-sm font-medium text-gray-900">Knowledge Capsules</div>
                    <div className="text-xs text-gray-500 mt-1">Manage capsules</div>
                  </Link>
                  <Link to="/admin/email-queue" className="p-4 border rounded-lg hover:bg-gray-50 hover:border-red-500 transition-all" data-testid="admin-link-email">
                    <AlertCircle className="h-8 w-8 text-cyan-600 mb-2" />
                    <div className="text-sm font-medium text-gray-900">Email Queue</div>
                    <div className="text-xs text-gray-500 mt-1">Monitor email delivery</div>
                  </Link>
                  <Link to="/admin/notifications" className="p-4 border rounded-lg hover:bg-gray-50 hover:border-red-500 transition-all" data-testid="admin-link-notifications">
                    <AlertCircle className="h-8 w-8 text-blue-600 mb-2" />
                    <div className="text-sm font-medium text-gray-900">Notifications</div>
                    <div className="text-xs text-gray-500 mt-1">Send system notifications</div>
                  </Link>
                  <Link to="/admin/audit-logs" className="p-4 border rounded-lg hover:bg-gray-50 hover:border-red-500 transition-all" data-testid="admin-link-audit">
                    <AlertCircle className="h-8 w-8 text-gray-600 mb-2" />
                    <div className="text-sm font-medium text-gray-900">Audit Logs</div>
                    <div className="text-xs text-gray-500 mt-1">View admin actions</div>
                  </Link>
                  <Link to="/admin/file-uploads" className="p-4 border rounded-lg hover:bg-gray-50 hover:border-red-500 transition-all" data-testid="admin-link-files">
                    <AlertCircle className="h-8 w-8 text-red-600 mb-2" />
                    <div className="text-sm font-medium text-gray-900">File Uploads</div>
                    <div className="text-xs text-gray-500 mt-1">Manage uploaded files</div>
                  </Link>
                  <Link to="/admin/analytics" className="p-4 border rounded-lg hover:bg-gray-50 hover:border-red-500 transition-all" data-testid="admin-link-analytics">
                    <TrendingUp className="h-8 w-8 text-purple-600 mb-2" />
                    <div className="text-sm font-medium text-gray-900">Analytics</div>
                    <div className="text-xs text-gray-500 mt-1">View platform stats</div>
                  </Link>
                  <Link to="/admin/settings" className="p-4 border rounded-lg hover:bg-gray-50 hover:border-red-500 transition-all" data-testid="admin-link-settings">
                    <CheckCircle className="h-8 w-8 text-slate-600 mb-2" />
                    <div className="text-sm font-medium text-gray-900">System Settings</div>
                    <div className="text-xs text-gray-500 mt-1">Configure platform</div>
                  </Link>
                  <Link to="/admin/datasets/history" className="p-4 border rounded-lg hover:bg-gray-50 hover:border-red-500 transition-all bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-300" data-testid="admin-link-datasets">
                    <TrendingUp className="h-8 w-8 text-blue-600 mb-2" />
                    <div className="text-sm font-medium text-gray-900">AI Dataset Upload</div>
                    <div className="text-xs text-gray-500 mt-1">Upload & manage datasets</div>
                  </Link>
                  <Link to="/admin/ai/monitor" className="p-4 border rounded-lg hover:bg-gray-50 hover:border-red-500 transition-all bg-gradient-to-br from-purple-50 to-pink-50 border-purple-300" data-testid="admin-link-ai-monitor">
                    <Activity className="h-8 w-8 text-purple-600 mb-2" />
                    <div className="text-sm font-medium text-gray-900">AI System Monitor</div>
                    <div className="text-xs text-gray-500 mt-1">Monitor AI health & metrics</div>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pending Verifications */}
              <Card>
                <CardHeader>
                  <CardTitle>Pending Verifications</CardTitle>
                  <CardDescription>Alumni profiles awaiting approval</CardDescription>
                </CardHeader>
                <CardContent>
                  {pendingVerifications.length > 0 ? (
                    <div className="space-y-3">
                      {pendingVerifications.slice(0, 5).map(profile => {
                        const profileUser = mockData.users?.find(u => u.id === profile.user_id);
                        return (
                          <div key={profile.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <img
                                src={profile.photo_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profileUser?.email}`}
                                alt={profile.name}
                                className="h-10 w-10 rounded-full"
                              />
                              <div>
                                <p className="font-medium text-sm">{profile.name}</p>
                                <p className="text-xs text-gray-500">{profileUser?.email}</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="text-green-600">Approve</Button>
                              <Button size="sm" variant="outline" className="text-red-600">Reject</Button>
                            </div>
                          </div>
                        );
                      })}
                      <Button asChild variant="outline" className="w-full" size="sm">
                        <Link to="/admin/verifications">View All</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <CheckCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p className="text-sm">No pending verifications</p>
                      <p className="text-xs mt-1">All profiles are verified</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest platform actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentActivity.map(activity => (
                      <div key={activity.id} className="flex items-start gap-3 p-2">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          activity.type === 'user' ? 'bg-blue-600' :
                          activity.type === 'job' ? 'bg-green-600' :
                          activity.type === 'event' ? 'bg-purple-600' :
                          'bg-yellow-600'
                        }`}></div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{activity.message}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* User Growth Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>User Growth Over Time</CardTitle>
                  <CardDescription>Monthly user registration trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={[
                      { month: 'Jul', users: 20 },
                      { month: 'Aug', users: 35 },
                      { month: 'Sep', users: 48 },
                      { month: 'Oct', users: 62 },
                      { month: 'Nov', users: 78 },
                      { month: 'Dec', users: mockData.users?.length || 95 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="users" stroke="#dc2626" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Users by Role Pie Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Users by Role</CardTitle>
                  <CardDescription>Distribution of user roles</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Students', value: mockData.users?.filter(u => u.role === 'student').length || 0, color: '#10b981' },
                          { name: 'Alumni', value: mockData.users?.filter(u => u.role === 'alumni').length || 0, color: '#3b82f6' },
                          { name: 'Recruiters', value: mockData.users?.filter(u => u.role === 'recruiter').length || 0, color: '#8b5cf6' },
                          { name: 'Admins', value: mockData.users?.filter(u => u.role === 'admin').length || 0, color: '#ef4444' },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {[
                          { name: 'Students', value: mockData.users?.filter(u => u.role === 'student').length || 0, color: '#10b981' },
                          { name: 'Alumni', value: mockData.users?.filter(u => u.role === 'alumni').length || 0, color: '#3b82f6' },
                          { name: 'Recruiters', value: mockData.users?.filter(u => u.role === 'recruiter').length || 0, color: '#8b5cf6' },
                          { name: 'Admins', value: mockData.users?.filter(u => u.role === 'admin').length || 0, color: '#ef4444' },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Job Postings Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>Job Postings Trend</CardTitle>
                  <CardDescription>Monthly job postings activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={[
                      { month: 'Jul', jobs: 5 },
                      { month: 'Aug', jobs: 8 },
                      { month: 'Sep', jobs: 12 },
                      { month: 'Oct', jobs: 15 },
                      { month: 'Nov', jobs: 18 },
                      { month: 'Dec', jobs: mockData.jobs?.length || 22 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="jobs" fill="#f59e0b" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Event Participation */}
              <Card>
                <CardHeader>
                  <CardTitle>Event Participation</CardTitle>
                  <CardDescription>Event registrations over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={[
                      { month: 'Jul', registrations: 45 },
                      { month: 'Aug', registrations: 62 },
                      { month: 'Sep', registrations: 78 },
                      { month: 'Oct', registrations: 95 },
                      { month: 'Nov', registrations: 112 },
                      { month: 'Dec', registrations: 145 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="registrations" stroke="#8b5cf6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;