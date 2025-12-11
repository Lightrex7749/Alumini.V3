import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 border-t border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* About */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-5">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">AlumUnity</span>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Connecting alumni, students, and recruiters to build a stronger, more vibrant community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-5">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/directory" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Alumni Directory
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Job Board
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Events
                </Link>
              </li>
              <li>
                <Link to="/mentorship" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Mentorship
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-5">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-5">Connect</h3>
            <div className="flex space-x-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-600 hover:text-white hover:bg-gradient-to-br hover:from-gray-700 hover:to-gray-900 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-600 hover:text-white hover:bg-gradient-to-br hover:from-blue-400 hover:to-blue-600 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-600 hover:text-white hover:bg-gradient-to-br hover:from-blue-600 hover:to-blue-800 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@alumni.edu"
                className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-600 hover:text-white hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200/50">
          <p className="text-center text-gray-500 flex items-center justify-center gap-1">
            © {currentYear} AlumUnity. Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
