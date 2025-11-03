import { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Send } from 'lucide-react';

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
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8" 
            style={{ background: 'linear-gradient(135deg, #0b617e 0%, #0a4d63 50%, #083e50 100%)' }}>
            
            <div className="w-full max-w-6xl bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20">
                <div className="grid md:grid-cols-2 gap-0">
                    
                    {/* Contact Info */}
                    <div className="p-8 lg:p-12 bg-gradient-to-br from-[#0a5570] to-[#083e50] text-white flex flex-col justify-center">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                                    Contact Us
                                </h1>
                                <p className="text-lg text-white/90 leading-relaxed">
                                    Have questions, feedback, or ideas to make EquiTrack even better? We'd love to hear from you!
                                </p>
                            </div>

                            <div className="space-y-6">
                                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=sonephoenix46@gmail.com" target="_blank" rel="noopener noreferrer" className="flex items-start space-x-4 group cursor-pointer">
                                    <div className="mt-1 p-3 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-white/70 mb-1">Email</p>
                                        <p className="text-white font-medium hover:underline">sonephoenix46@gmail.com</p>
                                    </div>
                                </a>

                                <a href="tel:+639123456789" className="flex items-start space-x-4 group cursor-pointer">
                                    <div className="mt-1 p-3 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-white/70 mb-1">Phone</p>
                                        <p className="text-white font-medium hover:underline">+63 926 154 0612</p>
                                    </div>
                                </a>

                                <div className="flex items-start space-x-4 group">
                                    <div className="mt-1 p-3 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-white/70 mb-1">Address</p>
                                        <p className="text-white font-medium">CIT University, Cebu City, Philippines</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6">
                                <p className="text-sm text-white/70 mb-4">Connect with us</p>
                                <div className="flex space-x-4">
                                    <a href="https://facebook.com/ashley.igonia" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all hover:scale-110 transform">
                                        <Facebook className="w-6 h-6" />
                                    </a>
                                    <a href="https://instagram.com/carrydashes" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all hover:scale-110 transform">
                                        <Instagram className="w-6 h-6" />
                                    </a>
                                    <a href="https://t.me/yourusername" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all hover:scale-110 transform">
                                        <Send className="w-6 h-6" />
                                    </a>
                                    <a href="mailto:sonephoenix46@gmail.com" className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all hover:scale-110 transform">
                                        <Mail className="w-6 h-6" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="p-8 lg:p-12 bg-white flex flex-col justify-center">
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-[#0b617e] ${
                                        errors.name ? 'border-red-500' : 'border-gray-200'
                                    }`}
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter a valid email address"
                                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-[#0b617e] ${
                                        errors.email ? 'border-red-500' : 'border-gray-200'
                                    }`}
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                    Your Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Enter your message"
                                    rows="5"
                                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-[#0b617e] resize-none ${
                                        errors.message ? 'border-red-500' : 'border-gray-200'
                                    }`}
                                />
                                {errors.message && (
                                    <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                                )}
                            </div>

                            {submitStatus === 'success' && (
                                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                                    <p className="text-green-700 text-sm font-medium">
                                        Thank you! Your message has been sent successfully.
                                    </p>
                                </div>
                            )}

                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="w-full hover:shadow-lg text-white font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                style={{ backgroundColor: '#f69fbc' }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#f587ad'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = '#f69fbc'}
                            >
                                {isSubmitting ? 'Sending...' : 'SUBMIT'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;