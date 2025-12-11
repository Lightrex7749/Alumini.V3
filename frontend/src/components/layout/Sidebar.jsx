import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Calendar,
  MessageSquare,
  Settings,
  Award,
  UserCheck,
  Bell,
  Mail,
  FileText,
  Upload,
  Activity,
  BookOpen,
} from 'lucide-react';

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const studentLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'My Profile', path: '/profile', icon: UserCheck },
    { name: 'Find Mentors', path: '/mentorship/find', icon: Users },
    { name: 'Browse Jobs', path: '/jobs', icon: Briefcase },
    { name: 'Events', path: '/events', icon: Calendar },
    { name: 'Forum', path: '/forum', icon: MessageSquare },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const alumniLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'My Profile', path: '/profile', icon: UserCheck },
    { name: 'Mentorship', path: '/mentorship/dashboard', icon: Users },
    { name: 'Mentor Management', path: '/mentorship/manage', icon: Users },
    { name: 'Post Jobs', path: '/jobs/post', icon: Briefcase },
    { name: 'Events', path: '/events', icon: Calendar },
    { name: 'Forum', path: '/forum', icon: MessageSquare },
    { name: 'Leaderboard', path: '/leaderboard', icon: Award },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const recruiterLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Post Job', path: '/jobs/post', icon: Briefcase },
    { name: 'Manage Jobs', path: '/jobs/manage', icon: Briefcase },
    { name: 'Browse Alumni', path: '/directory', icon: Users },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const adminLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'User Management', path: '/admin/users', icon: Users },
    { name: 'Verifications', path: '/admin/verifications', icon: UserCheck },
    { name: 'Content Moderation', path: '/admin/moderation', icon: MessageSquare },
    { name: 'Jobs Management', path: '/admin/jobs', icon: Briefcase },
    { name: 'Events Management', path: '/admin/events', icon: Calendar },
    { name: 'Mentorship Management', path: '/admin/mentorship', icon: Users },
    { name: 'Badge Management', path: '/admin/badges', icon: Award },
    { name: 'Knowledge Capsules', path: '/admin/knowledge-capsules', icon: BookOpen },
    { name: 'Email Queue', path: '/admin/email-queue', icon: Mail },
    { name: 'Notifications', path: '/admin/notifications', icon: Bell },
    { name: 'Audit Logs', path: '/admin/audit-logs', icon: FileText },
    { name: 'File Uploads', path: '/admin/file-uploads', icon: Upload },
    { name: 'Analytics', path: '/admin/analytics', icon: Activity },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const getLinks = () => {
    switch (user?.role) {
      case 'student':
        return studentLinks;
      case 'alumni':
        return alumniLinks;
      case 'recruiter':
        return recruiterLinks;
      case 'admin':
        return adminLinks;
      default:
        return studentLinks;
    }
  };

  const links = getLinks();

  return (
    <aside className="w-64 bg-gradient-to-b from-white to-gray-50/50 border-r border-gray-200/50 min-h-screen p-4 backdrop-blur-xl">
      {/* Role Badge */}
      <div className="mb-6 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100/50">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Role</p>
            <p className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent capitalize">{user?.role || 'User'}</p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/25">
            <Activity className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      <nav className="space-y-1.5">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`group relative flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 overflow-hidden ${
                isActive(link.path)
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
              }`}
            >
              {/* Active Indicator */}
              {isActive(link.path) && (
                <span className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"></span>
              )}
              
              {/* Hover Gradient Background */}
              {!isActive(link.path) && (
                <span className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              )}
              
              {/* Icon with Background */}
              <div className={`relative z-10 flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-300 ${
                isActive(link.path) 
                  ? 'bg-white/20' 
                  : 'bg-gray-100 group-hover:bg-blue-50'
              }`}>
                <Icon className={`w-5 h-5 transition-all duration-300 ${
                  isActive(link.path) 
                    ? 'text-white' 
                    : 'text-gray-600 group-hover:text-blue-600'
                }`} />
              </div>
              
              {/* Text */}
              <span className="relative z-10">{link.name}</span>
              
              {/* Shine Effect on Hover */}
              {!isActive(link.path) && (
                <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700"></span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
