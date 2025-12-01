import React, { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Send, Wallet, Zap, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- CUSTOM ANIMATION STYLE ---
// This creates the "Pop Up" effect with a slight delay
const PageAnimation = () => (
  <style>{`
    @keyframes popInBottom {
      0% {
        opacity: 0;
        transform: scale(0.9) translateY(50px); /* Starts smaller and lower */
      }
      100% {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }
    
    .animate-card-entry {
      opacity: 0; /* Initially hidden */
      /* 0.2s delay, 0.8s duration, "Bouncy" effect */
      animation: popInBottom 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
      animation-delay: 0.2s; 
    }
  `}</style>
);

// --- Header Component ---
const Header = () => {
  return (
    <nav className="fixed w-full top-0 z-50 bg-transparent pointer-events-none">
      <div className="container mx-auto px-6 lg:px-12"> 
        <div className="flex justify-between items-center h-20"> 
          
          {/* LOGO: Wallet Icon */}
          <Link to="/" className="flex items-center gap-3 group pointer-events-auto">
            <div className="transform transition-transform group-hover:scale-110 group-hover:rotate-12">
              <Wallet className="h-8 w-8 text-yellow-400" strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-black text-white tracking-tight">
              Equi<span className="text-yellow-400">Track</span>
            </span>
          </Link>

          {/* Center Links */}
          <div className="hidden md:flex items-center gap-8 pointer-events-auto">
            <Link to="/" className="text-gray-200 hover:text-white transition-colors font-medium">Home</Link>
            <Link to="/aboutus" className="text-gray-200 hover:text-white transition-colors font-medium">About Us</Link>
            <Link to="/contactus" className="text-yellow-400 font-semibold relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-yellow-400">Contact Us</Link>
          </div>

          {/* Right Buttons */}
          <div className="hidden md:flex items-center gap-4 pointer-events-auto">
            <Link to="/login" className="text-gray-200 hover:text-white px-5 py-2 rounded-lg transition-all font-medium">Login</Link>
            <Link to="/signup" className="px-6 py-2.5 bg-yellow-400 text-gray-900 rounded-lg font-bold shadow-lg hover:shadow-yellow-400/40 hover:scale-105 transition-all">Get Started</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

const ContactUs = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Enter a valid email';
        }
        if (!formData.message.trim()) newErrors.message = 'Message is required';
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setIsSubmitting(true);
        setTimeout(() => {
            setSubmitStatus('success');
            setIsSubmitting(false);
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setSubmitStatus(null), 5000);
        }, 1500);
    };

    return (
        <div className="h-screen w-full relative flex flex-col overflow-hidden bg-gradient-to-br from-slate-900 via-[#084062] to-blue-900">
            
            {/* Inject the Animation Styles */}
            <PageAnimation />
            
            <Header />

            {/* Background Animations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Main Content Area */}
            <div className="relative z-10 flex-grow flex items-center justify-center p-4 lg:p-6 mt-12">
                
                {/* Main Card - APPLIED ANIMATION HERE */}
                <div className="w-full max-w-6xl h-[80vh] min-h-[600px] bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl ring-1 ring-white/5 flex flex-col lg:flex-row overflow-hidden animate-card-entry">
                    
                    {/* LEFT PANEL */}
                    <div className="hidden lg:flex w-5/12 bg-black/20 p-8 xl:p-10 flex-col relative">
                        
                        <div className="flex flex-col h-full">
                            
                            {/* Title Section */}
                            <div className="mt-4 mb-8">
                                <h1 className="text-4xl font-black text-white leading-tight">
                                    <span className="text-yellow-400">Contact</span> Us
                                </h1>
                                <p className="text-gray-300 text-sm mt-3 leading-relaxed">
                                    Have questions? We'd love to hear from you! Our team is here to help.
                                </p>
                            </div>

                            {/* Contact Details */}
                            <div className="space-y-4 flex-grow flex flex-col justify-start">
                                <a href="mailto:equitrack1@gmail.com" className="flex items-center gap-4 group cursor-pointer p-3 rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10">
                                    <div className="p-2.5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg shadow-lg group-hover:scale-110 transition-transform">
                                        <Mail className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-medium uppercase">Email Us</p>
                                        <p className="text-white font-bold group-hover:text-yellow-400 transition-colors">equitrack1@gmail.com</p>
                                    </div>
                                </a>

                                <a href="tel:+639261540612" className="flex items-center gap-4 group cursor-pointer p-3 rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10">
                                    <div className="p-2.5 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg shadow-lg group-hover:scale-110 transition-transform">
                                        <Phone className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-medium uppercase">Call Us</p>
                                        <p className="text-white font-bold group-hover:text-yellow-400 transition-colors">+63 926 154 0612</p>
                                    </div>
                                </a>

                                <div className="flex items-center gap-4 group p-3 rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10">
                                    <div className="p-2.5 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg shadow-lg group-hover:scale-110 transition-transform">
                                        <MapPin className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-medium uppercase">Visit Us</p>
                                        <p className="text-white font-bold group-hover:text-yellow-400 transition-colors">CIT University, Cebu City</p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="mt-auto pb-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <MessageCircle className="w-4 h-4 text-yellow-400" />
                                    <p className="text-sm text-gray-300 font-medium">Connect with us</p>
                                </div>
                                <div className="flex gap-3">
                                    <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-3 bg-white/10 hover:bg-blue-600 rounded-xl transition-all hover:scale-110 border border-white/10 shadow-lg">
                                        <Facebook className="w-5 h-5 text-white" />
                                    </a>
                                    <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-3 bg-white/10 hover:bg-pink-600 rounded-xl transition-all hover:scale-110 border border-white/10 shadow-lg">
                                        <Instagram className="w-5 h-5 text-white" />
                                    </a>
                                    <a href="https://telegram.org" target="_blank" rel="noreferrer" className="p-3 bg-white/10 hover:bg-blue-500 rounded-xl transition-all hover:scale-110 border border-white/10 shadow-lg">
                                        <Send className="w-5 h-5 text-white" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT PANEL */}
                    <div className="w-full lg:w-7/12 bg-white/[0.02] p-8 lg:p-12 relative flex flex-col">
                        
                        <div className="text-center lg:text-left mb-6">
                            <h2 className="text-3xl font-black text-white">
                                Send a <span className="text-yellow-400">Message</span>
                            </h2>
                        </div>

                        <form onSubmit={handleSubmit} className="flex-grow flex flex-col justify-between h-full">
                            
                            {/* Inputs */}
                            <div className="space-y-4">
                                <div className="space-y-1.5 group">
                                    <label className="text-gray-300 font-medium text-xs uppercase tracking-wider ml-1 group-focus-within:text-yellow-400 transition-colors">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your full name"
                                        className={`w-full px-5 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:bg-white/10 focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition-all duration-300 ${errors.name ? 'border-red-400/50' : 'border-white/10'}`}
                                    />
                                    {errors.name && <p className="text-red-300 text-xs ml-1 mt-1">{errors.name}</p>}
                                </div>

                                <div className="space-y-1.5 group">
                                    <label className="text-gray-300 font-medium text-xs uppercase tracking-wider ml-1 group-focus-within:text-yellow-400 transition-colors">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="your.email@example.com"
                                        className={`w-full px-5 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:bg-white/10 focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition-all duration-300 ${errors.email ? 'border-red-400/50' : 'border-white/10'}`}
                                    />
                                    {errors.email && <p className="text-red-300 text-xs ml-1 mt-1">{errors.email}</p>}
                                </div>

                                <div className="space-y-1.5 group">
                                    <label className="text-gray-300 font-medium text-xs uppercase tracking-wider ml-1 group-focus-within:text-yellow-400 transition-colors">Your Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="How can we help you?"
                                        className={`w-full h-28 px-5 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:bg-white/10 focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition-all duration-300 resize-none ${errors.message ? 'border-red-400/50' : 'border-white/10'}`}
                                    />
                                    {errors.message && <p className="text-red-300 text-xs ml-1 mt-1">{errors.message}</p>}
                                </div>
                            </div>

                            {/* Footer Area */}
                            <div className="mt-4 mb-2">
                                {submitStatus === 'success' && (
                                    <div className="mb-4 p-3 bg-green-500/20 border border-green-400/50 rounded-xl">
                                        <p className="text-green-200 text-sm text-center font-medium">✅ Message sent successfully!</p>
                                    </div>
                                )}
                                
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3.5 px-6 rounded-xl transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-2xl hover:shadow-yellow-400/20 disabled:opacity-50 disabled:transform-none disabled:shadow-none group relative overflow-hidden"
                                >
                                    <span className="flex items-center justify-center gap-2 relative z-10">
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                Send Message 
                                                <Zap className="w-5 h-5 group-hover:scale-110 transition-transform fill-gray-900" />
                                            </>
                                        )}
                                    </span>
                                </button>
                                
                                <div className="text-center mt-3">
                                    <p className="text-gray-400 text-xs">
                                        💬 Quick chat? <a href="https://t.me/yourusername" className="text-yellow-400 hover:text-yellow-300 font-bold underline hover:no-underline transition-all">Message us on Telegram</a>
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ContactUs;