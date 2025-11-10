import { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Send, Wallet, Zap, MessageCircle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }
        
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const newErrors = validateForm();
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        
        setIsSubmitting(true);
        setSubmitStatus(null);
        
        setTimeout(() => {
            setSubmitStatus('success');
            setIsSubmitting(false);
            setFormData({ name: '', email: '', message: '' });
            
            setTimeout(() => {
                setSubmitStatus(null);
            }, 5000);
        }, 1500);
    };

    return (
        <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-[#084062] to-blue-900 p-4 pt-20">
            
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-3/4 left-1/3 w-48 h-48 bg-cyan-400 rounded-full blur-3xl opacity-15 animate-pulse" style={{ animationDelay: '4s' }}></div>
                <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-purple-400 rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '6s' }}></div>
            </div>
            
            {/* Main Content Container */}
            <div className="relative z-10 w-full max-w-6xl flex flex-col lg:flex-row items-stretch justify-between gap-8">
                
                {/* Left Side - Contact Info */}
                <div className="flex-1 max-w-lg text-white space-y-8">
                    <div className="space-y-6">
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="w-14 h-14 bg-yellow-400 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-xl shadow-yellow-400/30">
                                <Wallet className="w-8 h-8 text-blue-900" />
                            </div>
                            <span className="text-4xl font-black tracking-tight">
                                Equi<span className="text-yellow-400">Track</span>
                            </span>
                        </Link>

                        <div className="space-y-4">
                            <h1 className="text-5xl lg:text-6xl font-black leading-tight tracking-tight">
                                <span className="text-yellow-400">Contact</span> Us
                            </h1>
                            
                            <p className="text-lg text-gray-200 leading-relaxed">
                                Have questions, feedback, or ideas? We'd love to hear from you! Our team is here to help.
                            </p>
                        </div>
                    </div>

                    {/* Contact Methods - More Compact */}
                    <div className="space-y-4">
                        {/* Email */}
                        <a 
                            href="https://mail.google.com/mail/?view=cm&fs=1&to=equitrack1@gmail.com&su=Inquiry%20about%20EquiTrack&body=Hello%20EquiTrack%20Team,%0A%0AI%20would%20like%20to%20get%20in%20touch%20with%20you%20regarding%20EquiTrack." 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center gap-3 group cursor-pointer hover:transform hover:translate-x-1 transition-all duration-300 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-yellow-400/50 hover:bg-white/10"
                        >
                            <div className="p-2.5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg group-hover:scale-110 transition-transform duration-300 shadow-lg flex-shrink-0">
                                <Mail className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                                <p className="text-xs text-gray-400 mb-0.5">Email Us</p>
                                <span className="text-white font-medium group-hover:text-yellow-400 transition-colors text-sm">equitrack1@gmail.com</span>
                            </div>
                        </a>

                        {/* Phone */}
                        <a 
                            href="tel:+639261540612" 
                            className="flex items-center gap-3 group cursor-pointer hover:transform hover:translate-x-1 transition-all duration-300 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-yellow-400/50 hover:bg-white/10"
                        >
                            <div className="p-2.5 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg group-hover:scale-110 transition-transform duration-300 shadow-lg flex-shrink-0">
                                <Phone className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                                <p className="text-xs text-gray-400 mb-0.5">Call Us</p>
                                <span className="text-white font-medium group-hover:text-yellow-400 transition-colors text-sm">+63 926 154 0612</span>
                            </div>
                        </a>

                        {/* Address */}
                        <div className="flex items-center gap-3 group hover:transform hover:translate-x-1 transition-all duration-300 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-yellow-400/50 hover:bg-white/10 cursor-pointer">
                            <div className="p-2.5 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg group-hover:scale-110 transition-transform duration-300 shadow-lg flex-shrink-0">
                                <MapPin className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                                <p className="text-xs text-gray-400 mb-0.5">Visit Us</p>
                                <span className="text-white font-medium group-hover:text-yellow-400 transition-colors text-sm">
                                    CIT University, Cebu City
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Social Links - Compact */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <MessageCircle className="w-4 h-4 text-yellow-400" />
                            <p className="text-sm text-gray-300 font-medium">Connect with us</p>
                        </div>
                        <div className="flex gap-3">
                            <a 
                                href="https://www.facebook.com/profile.php?id=61582991625112" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="p-3 bg-white/10 hover:bg-blue-600 rounded-xl transition-all duration-300 hover:scale-110 transform group backdrop-blur-sm border border-white/10"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>
                            
                            <a 
                                href="https://www.instagram.com/equitrack1/" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="p-3 bg-white/10 hover:bg-pink-600 rounded-xl transition-all duration-300 hover:scale-110 transform group backdrop-blur-sm border border-white/10"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                            
                            <a 
                                href="https://t.me/yourusername" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="p-3 bg-white/10 hover:bg-blue-500 rounded-xl transition-all duration-300 hover:scale-110 transform group backdrop-blur-sm border border-white/10"
                            >
                                <Send className="w-5 h-5" />
                            </a>
                            
                            <a 
                                href="https://mail.google.com/mail/?view=cm&fs=1&to=equitrack1@gmail.com&su=Inquiry%20about%20EquiTrack" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="p-3 bg-white/10 hover:bg-yellow-400 hover:text-gray-900 rounded-xl transition-all duration-300 hover:scale-110 transform group backdrop-blur-sm border border-white/10"
                            >
                                <Mail className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Right Side - Contact Form */}
                <div className="flex-1 max-w-md">
                    <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8">
                        
                        {/* Form Header */}
                        <div className="text-center mb-6">
                            <h2 className="text-3xl font-black text-white mb-2">
                                Send a <span className="text-yellow-400">Message</span>
                            </h2>
                            <p className="text-gray-200 text-sm">
                                We'll respond within 24 hours
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Name Input */}
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-white font-medium text-sm">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300 ${
                                        errors.name ? 'border-red-400/50' : 'border-white/20'
                                    }`}
                                />
                                {errors.name && (
                                    <p className="text-red-300 text-xs">{errors.name}</p>
                                )}
                            </div>

                            {/* Email Input */}
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-white font-medium text-sm">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="your.email@example.com"
                                    className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300 ${
                                        errors.email ? 'border-red-400/50' : 'border-white/20'
                                    }`}
                                />
                                {errors.email && (
                                    <p className="text-red-300 text-xs">{errors.email}</p>
                                )}
                            </div>

                            {/* Message Input */}
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-white font-medium text-sm">
                                    Your Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="How can we help you?"
                                    rows="4"
                                    className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300 resize-none ${
                                        errors.message ? 'border-red-400/50' : 'border-white/20'
                                    }`}
                                />
                                {errors.message && (
                                    <p className="text-red-300 text-xs">{errors.message}</p>
                                )}
                            </div>

                            {/* Success Message */}
                            {submitStatus === 'success' && (
                                <div className="p-3 bg-green-500/20 border border-green-400/50 rounded-xl">
                                    <p className="text-green-200 text-xs text-center font-medium">
                                        ✅ Message sent successfully! We'll get back to you soon.
                                    </p>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3.5 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-400/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none group"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <Zap className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                        </>
                                    )}
                                </span>
                            </button>

                            {/* Telegram Quick Link */}
                            <div className="text-center pt-2">
                                <p className="text-gray-300 text-xs">
                                    💬 Quick chat?{' '}
                                    <a 
                                        href="https://t.me/yourusername" 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-yellow-400 hover:text-yellow-300 font-bold underline transition-colors duration-300"
                                    >
                                        Message us on Telegram
                                    </a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;