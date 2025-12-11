import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Menu, X, Bell, User, LogOut, Settings, LayoutDashboard, ChevronDown, Network, TrendingUp, Trophy, CreditCard, MapPin, BookOpen } from 'lucide-react';
import NotificationBell from '@/components/notifications/NotificationBell';

const MainNavbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Role-based navigation links - Standardized structure with role-specific visibility
  const getRoleBasedNavLinks = () => {
    if (!isAuthenticated) {
      // Unauthenticated users - show main features (will prompt login)
      return [
        { name: 'Home', path: '/' },
        { name: 'Alumni', path: '/directory' },
        { name: 'Mentorship', path: '/mentorship/find' },
        { name: 'Jobs', path: '/jobs' },
        { name: 'Events', path: '/events' },
        { name: 'Forum', path: '/forum' },
      ];
    }

    const role = user?.role;

    // Standardized navigation structure: Home, Alumni, Mentorship, Jobs, Events, Forum
    // Role-specific visibility for what each role can access
    switch (role) {
      case 'admin':
        // Admin: Full access to all features
        return [
          { name: 'Home', path: '/' },
          { name: 'Alumni', path: '/directory' },
          { name: 'Mentorship', path: '/mentorship/find' },
          { name: 'Jobs', path: '/jobs' },
          { name: 'Events', path: '/events' },
          { name: 'Forum', path: '/forum' },
        ];

      case 'alumni':
        // Alumni: Can mentor, view directory, participate in events and forum
        return [
          { name: 'Home', path: '/' },
          { name: 'Alumni', path: '/directory' },
          { name: 'Mentorship', path: '/mentorship/dashboard' },
          { name: 'Jobs', path: '/jobs' },
          { name: 'Events', path: '/events' },
          { name: 'Forum', path: '/forum' },
        ];

      case 'student':
        // Student: Can find mentors, apply for jobs, attend events
        return [
          { name: 'Home', path: '/' },
          { name: 'Alumni', path: '/directory' },
          { name: 'Mentorship', path: '/mentorship/find' },
          { name: 'Jobs', path: '/jobs' },
          { name: 'Events', path: '/events' },
          { name: 'Forum', path: '/forum' },
        ];

      case 'recruiter':
        // Recruiter: Can post jobs, view directory for recruitment, attend events
        return [
          { name: 'Home', path: '/' },
          { name: 'Alumni', path: '/directory' },
          { name: 'Mentorship', path: '/mentorship/find' },
          { name: 'Jobs', path: '/jobs' },
          { name: 'Events', path: '/events' },
          { name: 'Forum', path: '/forum' },
        ];

      default:
        return [
          { name: 'Home', path: '/' },
          { name: 'Alumni', path: '/directory' },
        ];
    }
  };

  // Role-based advanced features for "More" dropdown
  const getRoleBasedAdvancedFeatures = () => {
    if (!isAuthenticated) {
      return []; // No advanced features for unauthenticated users
    }

    const role = user?.role;
    const allFeatures = [
      { name: 'Skill Graph', path: '/skills/graph', icon: Network, roles: ['admin', 'alumni', 'student', 'recruiter'] },
      { name: 'Career Paths', path: '/career/paths', icon: TrendingUp, roles: ['admin', 'alumni', 'student', 'recruiter'] },
      { name: 'Leaderboard', path: '/leaderboard', icon: Trophy, roles: ['admin', 'alumni', 'student'] },
      { name: 'Alumni Card', path: '/alumni-card', icon: CreditCard, roles: ['admin', 'alumni'] },
      { name: 'Talent Heatmap', path: '/heatmap', icon: MapPin, roles: ['admin', 'alumni', 'student', 'recruiter'] },
      { name: 'Knowledge', path: '/knowledge', icon: BookOpen, roles: ['admin', 'alumni', 'student', 'recruiter'] },
    ];

    // Filter features based on user role
    return allFeatures.filter(feature => feature.roles.includes(role));
  };

  const navLinks = getRoleBasedNavLinks();
  const advancedFeatures = getRoleBasedAdvancedFeatures();

  const isActive = (path) => location.pathname === path;

  const getInitials = (email) => {
    return email ? email.substring(0, 2).toUpperCase() : 'U';
  };

  return (
    <nav className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50 shadow-sm shadow-gray-100/50" data-testid="main-navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group" data-testid="navbar-logo">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-xl group-hover:shadow-blue-500/30 transition-all duration-300 group-hover:scale-105">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">AlumUnity</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                data-testid={`nav-${link.name.toLowerCase()}-link`}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive(link.path)
                    ? 'text-blue-600 bg-gradient-to-r from-blue-50 to-purple-50 shadow-sm'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* More Dropdown - Only show for authenticated users with advanced features */}
            {isAuthenticated && advancedFeatures.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button 
                    className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 flex items-center gap-1 transition-all duration-300"
                    data-testid="nav-more-dropdown"
                  >
                    More
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white/90 backdrop-blur-xl border-gray-200/50 shadow-xl shadow-gray-200/50 rounded-xl">
                  <DropdownMenuLabel className="text-gray-500">Advanced Features</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {advancedFeatures.map((feature) => (
                    <DropdownMenuItem key={feature.path} onClick={() => navigate(feature.path)} className="rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 cursor-pointer">
                      <feature.icon className="mr-2 h-4 w-4 text-blue-600" />
                      {feature.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Right Side - Auth & User Menu */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Notification Bell */}
                <NotificationBell />

                {/* User Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center space-x-2 focus:outline-none group">
                      <Avatar className="w-10 h-10 ring-2 ring-gray-100 group-hover:ring-blue-200 transition-all duration-300">
                        <AvatarImage src="" alt={user?.email} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white font-semibold">
                          {getInitials(user?.email)}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-white/90 backdrop-blur-xl border-gray-200/50 shadow-xl shadow-gray-200/50 rounded-xl">
                    <DropdownMenuLabel>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-900">{user?.email}</span>
                        <span className="text-xs text-gray-500 capitalize bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-medium">{user?.role}</span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/dashboard')} className="rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 cursor-pointer">
                      <LayoutDashboard className="mr-2 h-4 w-4 text-blue-600" />
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/profile')} className="rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 cursor-pointer">
                      <User className="mr-2 h-4 w-4 text-purple-600" />
                      My Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/settings/notifications')} className="rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 cursor-pointer">
                      <Settings className="mr-2 h-4 w-4 text-gray-600" />
                      Notification Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="rounded-lg hover:bg-red-50 cursor-pointer text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Button
                  variant="ghost"
                  onClick={() => navigate('/login')}
                  className="text-gray-600 hover:text-blue-600"
                >
                  Login
                </Button>
                <Button 
                  onClick={() => navigate('/register')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/25"
                >
                  Sign Up
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-xl transition-all duration-300"
              data-testid="mobile-menu-toggle"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden border-t border-gray-200/50 bg-white/95 backdrop-blur-xl"
            data-testid="mobile-menu"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                  isActive(link.path)
                    ? 'text-blue-600 bg-gradient-to-r from-blue-50 to-purple-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Advanced Features Section - Only show for authenticated users with features */}
            {isAuthenticated && advancedFeatures.length > 0 && (
              <div className="pt-4 border-t border-gray-100">
                <div className="px-4 py-2 text-sm font-semibold text-gray-400 uppercase tracking-wide">
                  Advanced Features
                </div>
                {advancedFeatures.map((feature) => (
                  <Link
                    key={feature.path}
                    to={feature.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300"
                  >
                    <feature.icon className="mr-3 h-5 w-5 text-blue-600" />
                    {feature.name}
                  </Link>
                ))}
              </div>
            )}
            
            {!isAuthenticated && (
              <div className="pt-6 space-y-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    navigate('/login');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-6 text-base"
                >
                  Login
                </Button>
                <Button
                  onClick={() => {
                    navigate('/register');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-6 text-base bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default MainNavbar;
