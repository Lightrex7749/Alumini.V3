import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import MainNavbar from '@/components/layout/MainNavbar';
import Footer from '@/components/layout/Footer';
import { ArrowRight, Users, Briefcase, Calendar, Award, MessageSquare, UserCheck, Target, Heart, TrendingUp, Network, Route, Map, CreditCard, BookOpen, BarChart3, Sparkles, Star, Zap, Globe, Shield } from 'lucide-react';

// Premium Aceternity UI Components
import { 
  Spotlight,
  SpotlightCard,
  TextGenerateEffect,
  FlipWords,
  GradientHeading,
  BlurFade,
  StaggerContainer,
  StaggerItem,
  ScrollProgress,
  HeroGradient,
  GridBackground,
  HoverCard,
  TiltCard,
  MagneticButton,
  ShineButton,
  GlowBorderCard,
} from '@/components/ui/aceternity';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const stats = [
    { label: 'Active Alumni', value: '5,000+', icon: Users, gradient: 'from-blue-500 to-cyan-500' },
    { label: 'Success Stories', value: '1,200+', icon: Award, gradient: 'from-purple-500 to-pink-500' },
    { label: 'Job Placements', value: '800+', icon: Briefcase, gradient: 'from-orange-500 to-red-500' },
    { label: 'Events Hosted', value: '200+', icon: Calendar, gradient: 'from-green-500 to-emerald-500' },
  ];

  const features = [
    {
      icon: Users,
      title: 'Alumni Directory',
      description: 'Connect with thousands of alumni from various industries and locations',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Briefcase,
      title: 'Job Portal',
      description: 'Discover exclusive job opportunities posted by alumni and recruiters',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Calendar,
      title: 'Events & Webinars',
      description: 'Attend workshops, conferences, and networking events',
      gradient: 'from-orange-500 to-amber-500',
    },
    {
      icon: UserCheck,
      title: 'Mentorship Program',
      description: 'Get guidance from experienced alumni in your field of interest',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: MessageSquare,
      title: 'Community Forum',
      description: 'Engage in discussions, share knowledge, and build connections',
      gradient: 'from-indigo-500 to-purple-500',
    },
    {
      icon: Award,
      title: 'Achievements & Badges',
      description: 'Earn recognition for your contributions and engagement',
      gradient: 'from-rose-500 to-pink-500',
    },
  ];

  const values = [
    {
      icon: Users,
      title: 'Community First',
      description: 'We believe in the power of community and fostering meaningful connections between alumni, students, and recruiters.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Target,
      title: 'Career Growth',
      description: 'Empowering members to achieve their professional goals through mentorship, job opportunities, and skill development.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Heart,
      title: 'Give Back',
      description: 'Encouraging alumni to share their knowledge and experiences with the next generation of professionals.',
      gradient: 'from-rose-500 to-orange-500',
    },
    {
      icon: TrendingUp,
      title: 'Continuous Learning',
      description: 'Providing access to resources, events, and knowledge that help our community stay ahead in their careers.',
      gradient: 'from-green-500 to-emerald-500',
    },
  ];

  const innovativeFeatures = [
    {
      icon: Network,
      title: 'Skill Graph AI',
      description: 'Skill matching + relationship network model',
      marketValue: 'Smart talent discovery',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Route,
      title: 'Career Path Engine',
      description: 'Predictive role-transition algorithm',
      marketValue: 'Student success insights',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Map,
      title: 'Talent Heatmap',
      description: 'Spatio-temporal career intelligence',
      marketValue: 'Recruiter targeting',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: CreditCard,
      title: 'Digital Alumni ID',
      description: 'Dynamic credential verification + QR security',
      marketValue: 'Trusted identity layer',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: BookOpen,
      title: 'Knowledge Capsules',
      description: 'Content validation tied to skill graph',
      marketValue: 'Micro-learning marketplace',
      gradient: 'from-indigo-500 to-blue-500',
    },
    {
      icon: BarChart3,
      title: 'Engagement Scoring',
      description: 'Contribution impact measurement',
      marketValue: 'Gamification & retention',
      gradient: 'from-yellow-500 to-orange-500',
    },
  ];

  const detailedFeatures = [
    {
      icon: Users,
      title: 'Alumni Directory',
      description: 'Connect with thousands of alumni across various industries, locations, and career stages. Build your professional network.',
    },
    {
      icon: Briefcase,
      title: 'Job Portal',
      description: 'Access exclusive job opportunities posted by alumni and top recruiters. Get referrals and increase your chances of landing your dream job.',
    },
    {
      icon: MessageSquare,
      title: 'Mentorship Program',
      description: 'Get personalized guidance from experienced alumni. Book one-on-one sessions and accelerate your career growth.',
    },
    {
      icon: Calendar,
      title: 'Events & Workshops',
      description: 'Attend networking events, technical workshops, webinars, and conferences organized by the community.',
    },
    {
      icon: MessageSquare,
      title: 'Community Forum',
      description: 'Engage in discussions, ask questions, share knowledge, and learn from the collective wisdom of the community.',
    },
    {
      icon: Award,
      title: 'Recognition & Badges',
      description: 'Earn badges and recognition for your contributions. Climb the leaderboard and showcase your engagement.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 via-white to-blue-50/30">
      {/* Scroll Progress Indicator */}
      <ScrollProgress />
      
      <MainNavbar />

      {/* Hero Section - Premium Design with Spotlight */}
      <section className="relative flex-1 flex items-center justify-center px-4 py-16 md:py-24 overflow-hidden min-h-[90vh]" data-testid="hero-section">
        {/* Spotlight Effect */}
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="blue" />
        
        {/* Gradient Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
          <div className="absolute top-20 -right-40 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }}></div>
          <div className="absolute -bottom-20 left-1/3 w-72 h-72 bg-gradient-to-br from-cyan-400/15 to-blue-400/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }}></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </div>

        <div className="relative max-w-5xl text-center space-y-8 z-10">
          {/* Badge with BlurFade */}
          <BlurFade delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200/50 rounded-full backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Trusted by 5,000+ Alumni Worldwide
              </span>
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            </div>
          </BlurFade>

          <div className="space-y-6">
            {/* Animated Title */}
            <BlurFade delay={0.2}>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight" data-testid="hero-title">
                <span className="text-gray-900">Connect, Grow &</span>
                <br />
                <GradientHeading gradient="from-blue-600 via-purple-600 to-cyan-500">
                  <FlipWords words={["Succeed Together", "Build Networks", "Grow Careers", "Share Knowledge"]} duration={3000} />
                </GradientHeading>
              </h1>
            </BlurFade>
            
            {/* Text Generate Effect for Description */}
            <BlurFade delay={0.3}>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed" data-testid="hero-description">
                Join thousands of alumni, students, and recruiters in building a stronger professional community with cutting-edge tools and meaningful connections.
              </p>
            </BlurFade>
          </div>

          {/* CTA Buttons */}
          <BlurFade delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              {isAuthenticated ? (
                <MagneticButton onClick={() => navigate('/dashboard')}>
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </MagneticButton>
              ) : (
                <>
                  <MagneticButton onClick={() => navigate('/register')} data-testid="get-started-btn">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </MagneticButton>
                  <ShineButton onClick={() => navigate('/login')} data-testid="sign-in-btn">
                    Sign In
                  </ShineButton>
                </>
              )}
            </div>
          </BlurFade>

          {/* Trust Indicators */}
          <BlurFade delay={0.5}>
            <div className="flex flex-wrap items-center justify-center gap-6 pt-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Secure & Private</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>AI-Powered Matching</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-500" />
                <span>Global Network</span>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Stats Section - Modern 3D Tilt Cards */}
      <section className="py-20 px-4 bg-white relative" data-testid="stats-section">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent"></div>
        <div className="max-w-7xl mx-auto relative">
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <StaggerItem key={index}>
                  <SpotlightCard
                    className="bg-white p-8 rounded-2xl text-center h-full"
                    spotlightColor="rgba(59, 130, 246, 0.1)"
                    data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${stat.gradient} rounded-2xl mb-5 shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">{stat.value}</div>
                    <div className="text-gray-500 font-medium">{stat.label}</div>
                  </SpotlightCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Innovative Features Section - Dark Theme with Spotlight */}
      <section className="py-24 px-4 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 relative overflow-hidden" data-testid="innovative-features-section">
        {/* Spotlight effect */}
        <Spotlight className="top-0 left-1/4" fill="rgba(59, 130, 246, 0.15)" />
        
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }}></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }}></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <BlurFade delay={0.1}>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-full mb-8 backdrop-blur-sm">
                <Sparkles className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-semibold text-blue-300">Next-Generation Innovation</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6" data-testid="innovative-features-title">
                <GradientHeading gradient="from-blue-400 via-cyan-400 to-purple-400">
                  Patentable Technology Stack
                </GradientHeading>
              </h2>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Revolutionary features that set us apart with cutting-edge algorithms and intelligent systems
              </p>
            </div>
          </BlurFade>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
            {innovativeFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <StaggerItem key={index}>
                  <GlowBorderCard
                    glowColor="blue"
                    className="h-full"
                    data-testid={`innovative-feature-${feature.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <div className="bg-gray-900/90 p-8 rounded-xl h-full">
                      <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-6 shadow-lg`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                      <p className="text-gray-400 mb-5 text-sm leading-relaxed">{feature.description}</p>
                      <div className="flex items-center gap-2 pt-4 border-t border-gray-700/50">
                        <div className={`w-2 h-2 bg-gradient-to-r ${feature.gradient} rounded-full`}></div>
                        <p className="text-sm font-medium bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">{feature.marketValue}</p>
                      </div>
                    </div>
                  </GlowBorderCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Features Section - Modern Grid with Tilt Cards */}
      <section id="features" className="py-24 px-4 bg-gradient-to-b from-white to-slate-50" data-testid="features-section">
        <div className="max-w-7xl mx-auto">
          <BlurFade delay={0.1}>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6" data-testid="features-title">
                <span className="text-gray-900">Everything You Need </span>
                <GradientHeading gradient="from-blue-600 via-purple-600 to-pink-600">
                  in One Place
                </GradientHeading>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                Powerful features to help you connect and grow professionally
              </p>
            </div>
          </BlurFade>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <StaggerItem key={index}>
                  <TiltCard
                    className="bg-white p-8 border border-gray-100 h-full overflow-hidden"
                    tiltAmount={8}
                    data-testid={`feature-${feature.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                    
                    <div className="relative">
                      <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-6 shadow-lg`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </TiltCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section id="about" className="py-24 px-4 bg-white relative overflow-hidden" data-testid="mission-section">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-50"></div>
        
        <div className="max-w-4xl mx-auto relative">
          <BlurFade delay={0.1}>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                <span className="text-gray-900">Our </span>
                <GradientHeading gradient="from-blue-600 to-purple-600">Mission</GradientHeading>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                To create a vibrant ecosystem where alumni can give back, students can learn and grow, 
                and recruiters can find exceptional talent. We're building more than just a platform – 
                we're nurturing a community that thrives on collaboration, mentorship, and mutual success.
              </p>
            </div>
          </BlurFade>

          {/* Values - Modern Cards with Hover Effect */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6" staggerDelay={0.15}>
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <StaggerItem key={index}>
                  <HoverCard
                    className="group bg-white p-8 rounded-2xl h-full"
                    data-testid={`value-${value.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <div className="flex gap-5">
                      <div className="flex-shrink-0">
                        <div className={`w-14 h-14 bg-gradient-to-br ${value.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{value.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{value.description}</p>
                      </div>
                    </div>
                  </HoverCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-slate-50 to-white" data-testid="detailed-features-section">
        <div className="max-w-7xl mx-auto">
          <BlurFade delay={0.1}>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                <span className="text-gray-900">What We </span>
                <GradientHeading gradient="from-purple-600 to-cyan-600">Offer</GradientHeading>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Comprehensive tools and features to support your professional journey
              </p>
            </div>
          </BlurFade>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
            {detailedFeatures.map((feature, index) => {
              const Icon = feature.icon;
              const gradients = [
                'from-blue-500 to-cyan-500',
                'from-purple-500 to-pink-500',
                'from-orange-500 to-red-500',
                'from-green-500 to-emerald-500',
                'from-indigo-500 to-purple-500',
                'from-rose-500 to-pink-500',
              ];
              const gradient = gradients[index % gradients.length];
              return (
                <StaggerItem key={index}>
                  <SpotlightCard
                    className="bg-white p-8 rounded-2xl h-full"
                    spotlightColor={`rgba(99, 102, 241, 0.1)`}
                    data-testid={`detailed-feature-${feature.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {/* Hover Glow */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                    
                    <div className="relative">
                      <div className={`w-14 h-14 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center mb-6 shadow-lg`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </SpotlightCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section - Stunning Gradient with Spotlight */}
      <section className="py-24 px-4 relative overflow-hidden" data-testid="cta-section">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600"></div>
        
        {/* Spotlight Effect */}
        <Spotlight className="top-0 left-1/3" fill="rgba(255, 255, 255, 0.15)" />
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
        </div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        <BlurFade delay={0.2}>
          <div className="relative max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">Join 5,000+ Members</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white" data-testid="cta-title">
              Join Our Community Today
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Be part of a network that's shaping the future of professional growth
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              {isAuthenticated ? (
                <ShineButton
                  onClick={() => navigate('/dashboard')}
                  className="text-base sm:text-lg px-8 py-6 bg-white text-blue-600 hover:bg-gray-100"
                  data-testid="cta-dashboard-btn"
                >
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </ShineButton>
              ) : (
                <>
                  <ShineButton
                    onClick={() => navigate('/register')}
                    className="text-base sm:text-lg px-8 py-6 bg-white text-blue-600"
                    data-testid="cta-register-btn"
                  >
                    Create Free Account
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </ShineButton>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => navigate('/login')}
                    className="text-base sm:text-lg px-8 py-6 bg-transparent text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                    data-testid="cta-signin-btn"
                  >
                    Sign In
                  </Button>
                </>
              )}
            </div>
          </div>
        </BlurFade>
      </section>

      <Footer />
    </div>
  );
};

export default Home;