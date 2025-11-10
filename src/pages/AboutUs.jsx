import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// --- SVG Icons ---
const LogoIcon = () => (
  <svg className="h-8 w-auto text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.772-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919 4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const WalletIcon = () => (
  <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);

const ChartIcon = () => (
  <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const TargetIcon = () => (
  <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

const HeartIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

// --- ICONS FOR CORE VALUES ---
const CheckCircleIcon = () => (
  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const TransparencyIcon = () => (
  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const AccessibilityIcon = () => (
  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.105 11.886c.928.32 1.927.525 2.98.654a10.94 10.94 0 002.324 0c1.053-.129 2.052-.334 2.98-.654M16.61 14.12c.928-.32 1.927-.525 2.98-.654a10.94 10.94 0 002.324 0c1.053.129 2.052.334 2.98.654m-12.44 0a4.974 4.974 0 002.98 0M16.61 14.12a4.974 4.974 0 002.98 0M3.105 11.886c0-3.328 2.682-6.01 5.993-6.01 1.053 0 2.052.205 2.98.654m6.522 0c.928-.449 1.927-.654 2.98-.654 3.31 0 5.993 2.682 5.993 6.01m-12.44 0c0 3.328-2.682 6.01-5.993 6.01-1.053 0-2.052-.205-2.98-.654M16.61 14.12c0 3.328-2.682 6.01-5.993 6.01-1.053 0-2.052-.205-2.98-.654" />
  </svg>
);

const InnovationIcon = () => (
  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m1.636 6.364l.707-.707M12 21v-1m6.364-1.636l-.707-.707M6.343 6.343l.707.707m9.9 0l.707-.707M12 6a3 3 0 100-6 3 3 0 000 6z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18a6 6 0 100-12 6 6 0 000 12z" />
  </svg>
);

const CommunityIcon = () => (
  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-2.238M4 20h5v-2a3 3 0 015.356-2.238m0 0A3.001 3.001 0 0112 15a3 3 0 110 6 3 3 0 010-6z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15a3 3 0 110-6 3 3 0 010 6z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20a3 3 0 110-6 3 3 0 010 6zM4 20a3 3 0 110-6 3 3 0 010 6z" />
  </svg>
);

// --- Scroll Animation Hook ---
const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, isVisible];
};

// --- Header Component (CUSTOM #084062 THEME) ---
const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}
      style={scrolled ? { backgroundColor: '#084062' } : {}}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="transform transition-transform group-hover:scale-110 group-hover:rotate-12">
              <LogoIcon />
            </div>
            <span className="text-2xl font-black text-white tracking-tight">
              Equi<span className="text-yellow-400">Track</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link to="/dashboard" className="text-gray-200 hover:text-white transition-colors font-medium">
              Home
            </Link>
            <Link to="/aboutus" className="text-yellow-400 font-semibold relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-yellow-400">
              About Us
            </Link>
            <Link to="/contactus" className="text-gray-200 hover:text-white transition-colors font-medium">
              Contact Us
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Link to="/login" className="text-gray-200 hover:text-white px-5 py-2 rounded-lg transition-all font-medium">
              Login
            </Link>
            <Link to="/signup" className="px-6 py-2.5 bg-yellow-400 text-gray-900 rounded-lg font-bold shadow-lg hover:shadow-yellow-400/40 hover:scale-105 transition-all">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

// --- Team Member Card Component ---
const TeamMemberCard = ({ name, title, email, fbUrl, instaUrl, imageUrl, color, index }) => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <div 
      ref={ref}
      className={`group relative transition-all duration-500 transform ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative bg-slate-800 rounded-3xl p-8 border border-slate-700/50 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/10 transform hover:-translate-y-2">
        <div className="relative mx-auto w-40 h-40 mb-8">
          <div className={`absolute inset-0 bg-gradient-to-br ${color} rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300`}></div>
          <img
            className="relative h-full w-full rounded-full object-cover ring-4 ring-slate-700 group-hover:ring-yellow-500 transition-all duration-300"
            src={imageUrl}
            alt={name}
            onError={(e) => { e.target.src = 'https://placehold.co/160x160/1e293b/fde047?text=' + name.split(' ').map(n => n[0]).join(''); }}
          />
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
          <p className="text-yellow-400 font-semibold mb-5">{title}</p>
          <p className="text-slate-300 text-sm mb-6">{email}</p>
          <div className="flex justify-center gap-4 text-white">
            <a href={`mailto:${email}`} className="p-3 bg-slate-700 rounded-lg hover:bg-yellow-400 hover:text-slate-900 transition-all hover:scale-110">
              <MailIcon />
            </a>
            <a href={fbUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-700 rounded-lg hover:bg-blue-600 transition-all hover:scale-110">
              <FacebookIcon />
            </a>
            <a href={instaUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-700 rounded-lg hover:bg-pink-600 transition-all hover:scale-110">
              <InstagramIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Animated Section Component ---
const AnimatedSection = ({ children, delay = 0 }) => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 transform ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- Modal Component ---
const Modal = ({ content, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative text-white max-w-2xl w-full p-8 rounded-2xl shadow-2xl border border-white/10"
        style={{ backgroundColor: '#084062' }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h3 className="text-3xl font-bold text-yellow-400 mb-6">{content.title}</h3>
        <div className="prose prose-lg max-w-none text-gray-200 prose-headings:text-white prose-strong:text-white">
          {content.body}
        </div>
      </div>
    </div>
  );
};

// --- Main About Us Page ---
const AboutUs = () => {
  const [modalContent, setModalContent] = useState(null);

  const resourcesContent = {
    help: {
      title: "Help Center",
      body: "Get assistance with using EquiTrack. Our comprehensive help center covers everything from basic setup to advanced features."
    },
    privacy: {
      title: "Privacy Policy",
      body: "We take your privacy seriously. Learn how we protect your data and what information we collect to provide you with the best service."
    },
    terms: {
      title: "Terms of Service",
      body: "Understand the terms and conditions for using EquiTrack. Our commitment to transparency extends to our legal agreements."
    },
    faq: {
      title: "Frequently Asked Questions",
      body: "Find answers to common questions about EquiTrack features, pricing, and usage."
    }
  };
  
  const teamMembers = [
    {
      name: 'Kervin Gino M. Sarsonas',
      title: 'Lead Developer',
      email: 'kervingino.sarsonas@cit.edu',
      fbUrl: 'https://www.facebook.com/gino.sarsonas',
      instaUrl: 'https://www.instagram.com/ginowithhaki/',
      imageUrl: 'https://placehold.co/160x160/0ea5e9/0284c7?text=KS',
      color: 'from-sky-500 to-cyan-500'
    },
    {
      name: 'Michelle Marie P. Habon',
      title: 'Developer',
      email: 'michellemarie.habon@cit.edu',
      fbUrl: 'https://www.facebook.com/misyel846/',
      instaUrl: 'https://www.instagram.com/misyelarie/',
      imageUrl: 'https://placehold.co/160x160/f59e0b/d97706?text=MH',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      name: 'Ashley Igonia',
      title: 'Developer',
      email: 'ashley.igonia@cit.edu',
      fbUrl: 'https://www.facebook.com/ashley.igonia',
      instaUrl: 'https://www.instagram.com/carrydashes/',
      imageUrl: 'https://placehold.co/160x160/1d4ed8/2563eb?text=AI',
      color: 'from-blue-700 to-blue-500'
    },
  ];

  const coreValues = [
    { title: 'Transparency', desc: 'No hidden agendas. We believe in honest, open communication.', icon: TransparencyIcon },
    { title: 'Accessibility', desc: 'Financial tools should be for everyone, regardless of background.', icon: AccessibilityIcon },
    { title: 'Innovation', desc: 'Constantly pushing boundaries to create smarter ways to manage money.', icon: InnovationIcon },
    { title: 'Community', desc: 'Built by users, for users. Your feedback shapes our roadmap.', icon: CommunityIcon }
  ];
  
  const whyEquiTrackPoints = [
    { title: 'Built by Students', desc: 'For everyone who values financial independence, from a team that gets it.' },
    { title: 'Clarity First', desc: 'No hidden fees, no complicated jargon—just straightforward financial tools.' },
    { title: 'Privacy-First', desc: 'We take your security seriously with a zero data-selling policy. Period.' },
    { title: 'Community-Driven', desc: 'Continuous updates and new features based on real user feedback.' }
  ];

  return (
    <div 
      className="min-h-screen text-white font-sans overflow-hidden"
      style={{ backgroundColor: '#084062' }}
    >
      <Header />

      <main>
        {/* Hero Section - Deep Navy Blue */}
        <section 
          className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-16 bg-gradient-to-br from-slate-900 via-[#084062] to-blue-900"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <AnimatedSection>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="text-left">
                  <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
                    Smarter Money,
                    <span className="block text-yellow-400">
                      Brighter Future.
                    </span>
                  </h1>
                  
                  <div className="flex flex-wrap gap-8 my-12">
                    <div className="group w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-2xl shadow-yellow-500/50 hover:scale-110 transition-transform cursor-pointer">
                      <WalletIcon />
                    </div>
                    <div className="group w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-2xl shadow-blue-500/50 hover:scale-110 transition-transform cursor-pointer">
                      <ChartIcon />
                    </div>
                    <div className="group w-32 h-32 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center shadow-2xl shadow-sky-500/50 hover:scale-110 transition-transform cursor-pointer">
                      <TargetIcon />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-10">
                  <AnimatedSection delay={50}>
                    <div>
                      <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                        Welcome to <span className="text-yellow-400">EquiTrack</span>
                      </h2>
                      <p className="text-lg text-gray-200 leading-relaxed">
                        At EquiTrack, we believe that financial literacy is the foundation for independence and success. We are committed to making money management simple, clear, and empowering for everyone.
                      </p>
                    </div>
                  </AnimatedSection>
                  
                  <AnimatedSection delay={100}>
                    <div>
                      <h3 className="text-3xl font-black mb-4">
                        <span className="text-white">Our </span>
                        <span className="text-yellow-400">Mission</span>
                      </h3>
                      <p className="text-lg text-gray-200 leading-relaxed">
                        Our mission is to provide a platform that not only helps people take control of their finances but also encourages them to develop healthy, sustainable money habits.
                      </p>
                    </div>
                  </AnimatedSection>
                  
                  <AnimatedSection delay={150}>
                    <div>
                      <h3 className="text-3xl font-black mb-4">
                        <span className="text-white">Our </span>
                        <span className="text-yellow-400">Vision</span>
                      </h3>
                      <p className="text-lg text-gray-200 leading-relaxed">
                        We envision a future where managing money is no longer stressful or confusing—where students, young professionals, and individuals alike feel confident in making smart financial decisions.
                      </p>
                    </div>
                  </AnimatedSection>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Why EquiTrack? Section - Medium Blue Contrast */}
        <section 
          className="relative py-20 sm:py-24 bg-gradient-to-br from-slate-800 via-blue-800 to-slate-900"
        >
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-300 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-300 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <AnimatedSection>
              <div>
                <div className="text-center">
                  <h2 className="text-5xl font-black text-white mb-6">
                    Why <span className="text-yellow-400">EquiTrack?</span>
                  </h2>
                  <p className="text-xl text-gray-200 mb-20 max-w-3xl mx-auto">
                    Built by students who understand the challenges of managing finances in the real world.
                  </p>
                </div>

                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                  {whyEquiTrackPoints.map((point, i) => (
                    <AnimatedSection key={i} delay={i * 50}>
                      <div
                        className="group p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-yellow-400/30 transition-all hover:shadow-2xl hover:shadow-yellow-400/10 flex items-start gap-6"
                      >
                        <div className="flex-shrink-0 p-3 bg-white/10 rounded-full border border-white/20 transition-all group-hover:border-yellow-400 group-hover:scale-110">
                          <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/30">
                            <CheckCircleIcon />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-3">{point.title}</h3>
                          <p className="text-gray-300 leading-relaxed text-lg">{point.desc}</p>
                        </div>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Team Section - Deep Blue */}
        <section 
          className="relative py-20 sm:py-24 bg-gradient-to-br from-slate-900 via-[#084062] to-blue-900"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/3 w-80 h-80 bg-cyan-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-yellow-400 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <AnimatedSection>
              <div className="text-center mb-20">
                <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-6 py-3 mb-8">
                  <HeartIcon />
                  <span className="text-yellow-400 font-semibold">Meet the Team</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-black text-white mb-8">
                  The Minds Behind
                  <span className="block text-yellow-400">
                    The Magic
                  </span>
                </h2>
                <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                  Passionate CIT-U developers turning caffeine into code and ideas into reality.
                </p>
              </div>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {teamMembers.map((member, i) => (
                <TeamMemberCard key={i} {...member} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* CORE VALUES SECTION - Medium Blue Contrast */}
        <section 
          className="relative py-20 sm:py-24 bg-gradient-to-br from-slate-800 via-blue-800 to-slate-900"
        >
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-300 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <AnimatedSection>
              <div className="text-center mb-20">
                <h2 className="text-5xl font-black text-white mb-6">Our Core Values</h2>
                <p className="text-xl text-gray-300">Principles that guide every decision we make</p>
              </div>
            </AnimatedSection>
            
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              {coreValues.map((value, i) => {
                const Icon = value.icon;
                return (
                  <AnimatedSection key={i} delay={i * 50}>
                    <div
                      className="group p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-yellow-400/30 transition-all hover:shadow-2xl hover:shadow-yellow-400/10 flex items-start gap-6"
                    >
                      <div className="flex-shrink-0 p-3 bg-white/10 rounded-full border border-white/20 transition-all group-hover:border-yellow-400 group-hover:scale-110">
                        <Icon />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-3">{value.title}</h3>
                        <p className="text-gray-300 leading-relaxed text-lg">{value.desc}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section - Deep Blue */}
        <section 
          className="relative py-20 sm:py-24 bg-gradient-to-br from-slate-900 via-[#084062] to-blue-900 overflow-hidden"
        >
          <div className="absolute inset-0 opacity-[.03]">
            <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
          </div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-400 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <AnimatedSection>
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-5xl md:text-6xl font-black text-white mb-10">
                  Ready to Transform Your Finances?
                </h2>
                <p className="text-2xl text-gray-200 mb-14 leading-relaxed">
                  Join thousands who've taken control of their financial future. No credit card required. No commitment. Just clarity.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link to="/signup" className="group px-12 py-5 bg-yellow-400 text-gray-900 rounded-xl font-black text-xl shadow-2xl shadow-yellow-500/30 hover:shadow-yellow-400/50 hover:scale-105 transition-all">
                    Start Free Today
                    <span className="inline-block ml-2 group-hover:translate-x-2 transition-transform">→</span>
                  </Link>
                  <Link to="/contactus" className="px-12 py-5 bg-transparent text-white rounded-xl font-bold text-xl border-2 border-white/30 hover:bg-white/10 transition-all">
                    Questions? Ask Us
                  </Link>
                </div>
                <p className="mt-10 text-gray-400 text-sm">No spam, ever. We respect your inbox as much as your wallet.</p>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>

      {/* --- Footer --- */}
      <footer 
        className="relative border-t border-white/10 bg-slate-900"
      >
        <div className="container mx-auto px-6 lg:px-12 py-16">
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              <div className="md:col-span-2">
                <Link to="/" className="flex items-center gap-3 mb-6 group">
                  <div className="transform transition-transform group-hover:scale-110 group-hover:rotate-12">
                    <LogoIcon />
                  </div>
                  <span className="text-2xl font-black text-white">
                    Equi<span className="text-yellow-400">Track</span>
                  </span>
                </Link>
                <p className="text-gray-300 max-w-md leading-relaxed mb-6">
                  Built with passion by CIT-U students. Making financial management accessible, secure, and empowering for everyone.
                </p>
                <div className="flex gap-4 text-white">
                  <a href="https://www.facebook.com/profile.php?id=61582991625112" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 rounded-lg hover:bg-blue-600 transition-all hover:scale-110">
                    <FacebookIcon />
                  </a>
                  <a href="https://www.instagram.com/equitrack1/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 rounded-lg hover:bg-pink-600 transition-all hover:scale-110">
                    <InstagramIcon />
                  </a>
                  <a 
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=equitrack1@gmail.com&su=Inquiry%20about%20EquiTrack&body=Hello%20EquiTrack%20Team,%0A%0AI%20would%20like%20to%20get%20in%20touch%20with%20you%20regarding%20EquiTrack." 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-3 bg-white/10 rounded-lg hover:bg-yellow-400 hover:text-gray-900 transition-all hover:scale-110"
                  >
                  <MailIcon />
                  </a>
                </div>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4 text-lg">Quick Links</h4>
                <ul className="space-y-3">
                  <li><Link to="/dashboard" className="text-gray-300 hover:text-yellow-400 transition-colors">Home</Link></li>
                  <li><Link to="/aboutus" className="text-gray-300 hover:text-yellow-400 transition-colors">About Us</Link></li>
                  <li><Link to="/contactus" className="text-gray-300 hover:text-yellow-400 transition-colors">Contact</Link></li>
                  <li><Link to="/login" className="text-gray-300 hover:text-yellow-400 transition-colors">Login</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4 text-lg">Resources</h4>
                <ul className="space-y-3">
                  <li><button onClick={() => setModalContent(resourcesContent.help)} className="text-gray-300 hover:text-yellow-400 transition-colors text-left">Help Center</button></li>
                  <li><button onClick={() => setModalContent(resourcesContent.privacy)} className="text-gray-300 hover:text-yellow-400 transition-colors text-left">Privacy Policy</button></li>
                  <li><button onClick={() => setModalContent(resourcesContent.terms)} className="text-gray-300 hover:text-yellow-400 transition-colors text-left">Terms of Service</button></li>
                  <li><button onClick={() => setModalContent(resourcesContent.faq)} className="text-gray-300 hover:text-yellow-400 transition-colors text-left">FAQ</button></li>
                </ul>
              </div>
            </div>
          </AnimatedSection>
          <div className="pt-8 border-t border-white/10 text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} EquiTrack. Crafted with <span className="text-yellow-400">♥</span> by CIT-U Developers. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      
      {modalContent && <Modal content={modalContent} onClose={() => setModalContent(null)} />}
    </div>
  );
};

export default AboutUs;