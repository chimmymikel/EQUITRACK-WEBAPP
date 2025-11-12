import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import Input from "../components/Input.jsx";
import { validateEmail } from "../util/validation.js";
import axiosConfig from "../util/axiosConfig.js";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import toast from "react-hot-toast";
import { LoaderCircle, Eye, EyeOff, Wallet, Shield, TrendingUp, CheckCircle, Zap, User, Camera } from "lucide-react";
import ProfilePhotoSelector from "../components/ProfilePhotoSelector.jsx";
import uploadProfileImage from "../util/uploadProfileImage.js";

const Signup = () => {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [passwordStrength, setPasswordStrength] = useState(0);

    const navigate = useNavigate();

    const checkPasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 8) strength += 25;
        if (/[A-Z]/.test(password)) strength += 25;
        if (/[0-9]/.test(password)) strength += 25;
        if (/[^A-Za-z0-9]/.test(password)) strength += 25;
        setPasswordStrength(strength);
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        checkPasswordStrength(newPassword);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const getPasswordStrengthColor = () => {
        if (passwordStrength >= 75) return "bg-green-500";
        if (passwordStrength >= 50) return "bg-yellow-500";
        if (passwordStrength >= 25) return "bg-orange-500";
        return "bg-red-500";
    };

    const getPasswordStrengthText = () => {
        if (passwordStrength >= 75) return "Strong";
        if (passwordStrength >= 50) return "Good";
        if (passwordStrength >= 25) return "Weak";
        return "Very Weak";
    };

    // Simple profile photo selector component
    const SimpleProfilePhotoSelector = ({ image, setImage, size = "lg" }) => {
        const handleImageUpload = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setImage(e.target.result);
                };
                reader.readAsDataURL(file);
            }
        };

        const sizeClass = size === "lg" ? "w-24 h-24" : "w-16 h-16";

        return (
            <div className="flex flex-col items-center space-y-4">
                <div className="relative group">
                    <div className={`${sizeClass} rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center relative overflow-hidden border-4 border-white/20 group-hover:border-yellow-400 transition-all duration-300`}>
                        {image ? (
                            <img 
                                src={image} 
                                alt="Profile" 
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <User className="w-8 h-8 text-white" />
                        )}
                        
                        {/* Camera overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <Camera className="w-6 h-6 text-white" />
                        </div>
                    </div>
                    
                    {/* Floating upload button */}
                    <label className="absolute -bottom-2 -right-2 bg-yellow-400 text-gray-900 p-2 rounded-full cursor-pointer hover:bg-yellow-500 transition-all duration-300 transform hover:scale-110 shadow-lg">
                        <Camera className="w-4 h-4" />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                    </label>
                </div>
                
                <p className="text-gray-300 text-sm text-center">
                    {image ? "Click camera to change" : "Add profile photo"}
                </p>
                
                {image && (
                    <button
                        type="button"
                        onClick={() => setImage(null)}
                        className="text-red-400 hover:text-red-300 text-xs transition-colors duration-300"
                    >
                        Remove photo
                    </button>
                )}
            </div>
        );
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        let profileImageUrl = "";
        setIsLoading(true);

        if(!fullname.trim()){
            setError("Please enter your fullname.");
            setIsLoading(false);
            return;
        }

        if(!validateEmail(email)){
            setError("Please enter a valid email address.");
            setIsLoading(false);
            return;
        }

        if(!password.trim()){
            setError("Please enter your password.");
            setIsLoading(false);
            return;
        }

        if(passwordStrength < 50){
            setError("Please use a stronger password for better security.");
            setIsLoading(false);
            return;
        }

        setError("");
        
        try{
            if(profilePhoto){
                const imageUrl = await uploadProfileImage(profilePhoto);
                profileImageUrl = imageUrl || "";
            }
            const response = await axiosConfig.post(API_ENDPOINTS.REGISTER, {
                fullName: fullname,
                email,
                password,
                profileImageUrl,
            })
            if(response.status === 201){
                toast.success("Profile created successfully!");
                navigate("/login");
            }
        }catch(err){
            console.error("Something went wrong:", err);
            if(err.code === 'ECONNABORTED'){
                setError("Server is waking up, this may take up to 60 seconds. Please try again.");
            } else if(err.response){
                setError(err.response.data?.message || "Registration failed. Please try again.");
            } else {
                setError("Unable to connect to server. Please try again.");
            }
        }finally{
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-[#084062] to-blue-900 p-4">
            
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-3/4 left-1/3 w-48 h-48 bg-cyan-400 rounded-full blur-3xl opacity-15 animate-pulse" style={{ animationDelay: '4s' }}></div>
            </div>

            {/* Main Content Container */}
            <div className="relative z-10 w-full max-w-6xl flex flex-col lg:flex-row items-start justify-between gap-12 py-8">
                
                {/* Left Side - Branding & Benefits */}
                <div className="flex-1 max-w-lg text-white space-y-10 pt-4">
                    <div className="space-y-8">
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="w-14 h-14 bg-yellow-400 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-xl shadow-yellow-400/30">
                                <Wallet className="w-8 h-8 text-blue-900" />
                            </div>
                            <span className="text-4xl font-black tracking-tight">
                                Equi<span className="text-yellow-400">Track</span>
                            </span>
                        </Link>

                        <div className="space-y-6">
                            <h1 className="text-5xl lg:text-6xl font-black leading-tight tracking-tight">
                                Start Your
                                <span className="block text-yellow-400 mt-2">Financial Journey</span>
                            </h1>
                            
                            <p className="text-lg lg:text-xl text-gray-200 leading-relaxed max-w-md">
                                Join EquiTrack and take the first step towards financial clarity and control. 
                                It's free, simple, and designed for students and young professionals.
                            </p>
                        </div>
                    </div>

                    {/* Benefits List */}
                    <div className="space-y-5">
                        <div className="flex items-start gap-4 text-gray-200 text-base lg:text-lg">
                            <CheckCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                            <span className="leading-relaxed">Track expenses and income in real-time</span>
                        </div>
                        <div className="flex items-start gap-4 text-gray-200 text-base lg:text-lg">
                            <CheckCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                            <span className="leading-relaxed">Smart budgeting tools and insights</span>
                        </div>
                        <div className="flex items-start gap-4 text-gray-200 text-base lg:text-lg">
                            <CheckCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                            <span className="leading-relaxed">Secure and private data protection</span>
                        </div>
                        <div className="flex items-start gap-4 text-gray-200 text-base lg:text-lg">
                            <CheckCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                            <span className="leading-relaxed">Customizable financial categories</span>
                        </div>
                    </div>

                    {/* Trust Indicators */}
                    <div className="pt-4 space-y-4 border-t border-white/10">
                        <div className="flex items-center gap-4 text-gray-300">
                            <Shield className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                            <span className="text-sm lg:text-base">Built by CIT-U students for the community</span>
                        </div>
                        <div className="flex items-center gap-4 text-gray-300">
                            <TrendingUp className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                            <span className="text-sm lg:text-base">Completely free to use</span>
                        </div>
                    </div>
                </div>

                {/* Right Side - Signup Form */}
                <div className="flex-1 max-w-md">
                    <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 lg:p-10">
                        
                        {/* Form Header */}
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-black text-white mb-2">
                                Join <span className="text-yellow-400">EquiTrack</span>
                            </h2>
                            <p className="text-gray-200">
                                Create your account in 30 seconds
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            
                            {/* Profile Photo */}
                            <div className="flex justify-center mb-6">
                                <SimpleProfilePhotoSelector 
                                    image={profilePhoto} 
                                    setImage={setProfilePhoto}
                                    size="lg"
                                />
                            </div>

                            {/* Full Name Input */}
                            <div className="space-y-2">
                                <label className="text-white font-medium text-sm">Full Name</label>
                                <input
                                    value={fullname}
                                    onChange={(e) => setFullname(e.target.value)}
                                    placeholder="Enter your full name"
                                    type="text"
                                    className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300"
                                    disabled={isLoading}
                                />
                            </div>

                            {/* Email Input */}
                            <div className="space-y-2">
                                <label className="text-white font-medium text-sm">Email Address</label>
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your.email@example.com"
                                    type="email"
                                    className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300"
                                    disabled={isLoading}
                                />
                            </div>

                            {/* Password Input */}
                            <div className="space-y-3">
                                <label className="text-white font-medium text-sm">Password</label>
                                <div className="relative">
                                    <input
                                        value={password}
                                        onChange={handlePasswordChange}
                                        placeholder="Create a strong password"
                                        type={showPassword ? "text" : "password"}
                                        className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300 pr-12"
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-400 transition-colors duration-300"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                
                                {/* Password Strength Meter */}
                                {password && (
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-gray-300">Password strength:</span>
                                            <span className={`font-medium ${
                                                passwordStrength >= 75 ? "text-green-400" :
                                                passwordStrength >= 50 ? "text-yellow-400" :
                                                passwordStrength >= 25 ? "text-orange-400" : "text-red-400"
                                            }`}>
                                                {getPasswordStrengthText()}
                                            </span>
                                        </div>
                                        <div className="w-full bg-white/10 rounded-full h-2">
                                            <div 
                                                className={`h-2 rounded-full transition-all duration-500 ${getPasswordStrengthColor()}`}
                                                style={{ width: `${passwordStrength}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="p-4 bg-red-500/20 border border-red-400/50 rounded-xl">
                                    <p className="text-red-200 text-sm text-center">
                                        {error}
                                    </p>
                                </div>
                            )}

                            {/* Sign Up Button */}
                            <button
                                disabled={isLoading}
                                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-400/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none group"
                                type="submit"
                            >
                                <span className="flex items-center justify-center gap-3">
                                    {isLoading ? (
                                        <>
                                            <LoaderCircle className="w-5 h-5 animate-spin" />
                                            Creating Account...
                                        </>
                                    ) : (
                                        <>
                                            Start Free Today
                                            <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                        </>
                                    )}
                                </span>
                            </button>

                            {/* Login Link */}
                            <div className="text-center pt-6">
                                <p className="text-gray-300">
                                    Already have an account?{' '}
                                    <Link 
                                        to="/login" 
                                        className="text-yellow-400 hover:text-yellow-300 font-bold underline transition-colors duration-300"
                                    >
                                        Sign In
                                    </Link>
                                </p>
                            </div>
                        </form>

                        {/* Security Notice */}
                        <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
                            <div className="flex items-center gap-3">
                                <Shield className="w-5 h-5 text-yellow-400" />
                                <p className="text-gray-300 text-sm">
                                    Your data is secure. We never share your personal information.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;