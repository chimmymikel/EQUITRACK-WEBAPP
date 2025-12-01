import { Wallet } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// --- SVG Icons (Matched from About Us) ---
const LogoIcon = () => (
  <svg className="h-8 w-auto text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// --- Scroll Animation Hook ---
const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    // Trigger animation immediately since there is no scrolling
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return [ref, isVisible];
};

// --- Animated Section ---
const AnimatedSection = ({ children, delay = 0, className = "" }) => {
  const [ref, isVisible] = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- Header (EXACT REPLICA OF ABOUT US HEADER) ---
const Header = () => {
  // Even though Landing Page doesn't scroll, we keep the structure identical
  // for visual consistency.
  return (
    <nav className="fixed w-full top-0 z-50 bg-transparent">
      {/* Removed max-w-7xl to match About Us spacing width */}
      <div className="container mx-auto px-6 lg:px-12"> 
        {/* Changed h-16 to h-20 to match About Us height */}
        <div className="flex justify-between items-center h-20"> 
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="transform transition-transform group-hover:scale-110 group-hover:rotate-12">
              <Wallet className="h-8 w-8 text-yellow-400" strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-black text-white tracking-tight">
              Equi<span className="text-yellow-400">Track</span>
            </span>
          </Link>

          {/* Center Links (Gap-8 matches About Us) */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-yellow-400 font-semibold relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-yellow-400"
            >
              Home
            </Link>
            <Link
              to="/aboutus"
              className="text-gray-200 hover:text-white transition-colors font-medium"
            >
              About Us
            </Link>
            <Link
              to="/contactus"
              className="text-gray-200 hover:text-white transition-colors font-medium"
            >
              Contact Us
            </Link>
          </div>

          {/* Right Buttons (Gap-4 matches About Us) */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/login"
              className="text-gray-200 hover:text-white px-5 py-2 rounded-lg transition-all font-medium"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-6 py-2.5 bg-yellow-400 text-gray-900 rounded-lg font-bold shadow-lg hover:shadow-yellow-400/40 hover:scale-105 transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

// --- Landing Page ---
const LandingPage = () => {
  return (
    <div className="h-screen w-screen font-sans text-white overflow-hidden bg-gradient-to-br from-slate-900 via-[#084062] to-blue-900 relative flex flex-col">
      <Header />

      {/* Main Content Centered */}
      <main className="flex-grow flex items-center justify-center relative z-10 px-6">
        
        {/* Visual Cue Gradient at Bottom */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent pointer-events-none z-20"></div>

        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-1/4 left-10 md:left-20 w-80 h-80 bg-yellow-400 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-1/4 right-10 md:right-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-400 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        {/* Hero Content */}
        <div className="text-center max-w-4xl mx-auto flex flex-col items-center gap-6 md:gap-8 relative z-30">
          <AnimatedSection delay={100}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight text-white">
              Take Control <br />
              <span className="text-yellow-400">Of Your Finances</span>
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <p className="text-gray-200 text-lg md:text-2xl leading-relaxed max-w-2xl mx-auto">
              EquiTrack empowers you to manage your money smarter. Track
              expenses, set budgets, and achieve your goals with confidence.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={300} className="w-full">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link
                to="/signup"
                className="group w-full sm:w-auto px-10 py-5 bg-yellow-400 text-gray-900 rounded-xl font-bold text-xl shadow-2xl shadow-yellow-500/30 hover:shadow-yellow-400/50 hover:scale-105 transition-all inline-flex items-center justify-center"
              >
                Start Free Today{" "}
                <span className="ml-2 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Link>
              <Link
                to="/aboutus"
                className="w-full sm:w-auto px-10 py-5 border-2 border-white/30 rounded-xl text-white font-bold text-xl hover:bg-white/10 transition-all text-center"
              >
                Learn More
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={400}>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-gray-400 text-sm md:text-base pt-6">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full shadow-lg shadow-green-400/50"></div>
                No credit card required
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"></div>
                Free forever plan
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50"></div>
                Made with Genuine Love
              </span>
            </div>
          </AnimatedSection>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;