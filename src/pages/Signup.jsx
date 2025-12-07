import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosConfig from "../util/axiosConfig.js";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import toast from "react-hot-toast";
import { LoaderCircle, Eye, EyeOff, Wallet, Shield, TrendingUp, CheckCircle, Zap, User, Camera } from "lucide-react";
import uploadProfileImage from "../util/uploadProfileImage.js";
import { validateEmail } from "../util/validation.js";

// --- ANIMATION STYLE ---
const PageAnimation = () => (
  <style>{`
    @keyframes popIn {
      0% { opacity: 0; transform: scale(0.95) translateY(20px); }
      100% { opacity: 1; transform: scale(1) translateY(0); }
    }
    .animate-pop-in {
      opacity: 0;
      animation: popIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      animation-delay: 0.1s;
    }
  `}</style>
);

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

    // Component: Profile Photo Selector
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

        const sizeClass = size === "lg" ? "w-16 h-16 md:w-20 md:h-20" : "w-14 h-14";

        return (
            <div className="flex flex-col items-center space-y-1">
                <div className="relative group">
                    <div className={`${sizeClass} rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center relative overflow-hidden border-3 border-white/20 group-hover:border-yellow-400 transition-all duration-300`}>
                        {image ? (
                            <img 
                                src={image} 
                                alt="Profile" 
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <User className="w-8 h-8 md:w-10 md:h-10 text-white" />
                        )}
                        
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <Camera className="w-5 h-5 text-white" />
                        </div>
                    </div>
                    
                    <label className="absolute -bottom-1 -right-1 bg-yellow-400 text-gray-900 p-1.5 rounded-full cursor-pointer hover:bg-yellow-500 transition-all duration-300 transform hover:scale-110 shadow-lg">
                        <Camera className="w-3 h-3" />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                    </label>
                </div>
                
                <p className="text-gray-300 text-xs text-center">
                    {image ? "Click to change" : "Add photo"}
                </p>
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
        <div className="min-h-screen w-full relative flex items-center justify-center bg-gradient-to-br from-slate-900 via-[#084062] to-blue-900 px-4 py-6 lg:py-0 overflow-x-hidden">
            
            {/* Inject Animation Styles */}
            <PageAnimation />

            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-3/4 left-1/3 w-48 h-48 bg-cyan-400 rounded-full blur-3xl opacity-15 animate-pulse" style={{ animationDelay: '4s' }}></div>
            </div>

            {/* Main Content Container - ADDED 'animate-pop-in' HERE */}
            <div className="relative z-10 w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-20 animate-pop-in">
                
                {/* Left Side - Branding & Features */}
                <div className="hidden lg:flex flex-1 w-full flex-col justify-center text-white space-y-8 text-left">
                    
                    {/* Header Group */}
                    <div className="space-y-6">
                        <Link to="/" className="inline-flex items-center gap-3 group">
                            <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-xl shadow-yellow-400/30">
                                <Wallet className="w-7 h-7 text-blue-900" />
                            </div>
                            <span className="text-3xl font-black tracking-tight">
                                Equi<span className="text-yellow-400">Track</span>
                            </span>
                        </Link>

                        <div className="space-y-3">
                            <h1 className="text-5xl lg:text-6xl font-black leading-tight">
                                Start Your
                                <span className="block text-yellow-400 mt-1">Financial Journey</span>
                            </h1>
                            
                            <p className="text-lg text-gray-200 leading-relaxed max-w-lg">
                                Join EquiTrack and take the first step towards financial clarity. It's free, simple, and designed for you.
                            </p>
                        </div>
                    </div>

                    {/* Features List - Vertically Aligned */}
                    <div className="space-y-4 max-w-lg">
                        <div className="flex items-center gap-4 group">
                            <div className="w-10 h-10 bg-white/10 rounded-lg flex shrink-0 items-center justify-center text-yellow-400 group-hover:bg-yellow-400 group-hover:text-blue-900 transition-all duration-300">
                                <TrendingUp className="w-5 h-5" />
                            </div>
                            <span className="text-gray-200 text-sm font-medium">Track expenses and income in real-time</span>
                        </div>

                        <div className="flex items-center gap-4 group">
                            <div className="w-10 h-10 bg-white/10 rounded-lg flex shrink-0 items-center justify-center text-yellow-400 group-hover:bg-yellow-400 group-hover:text-blue-900 transition-all duration-300">
                                <Wallet className="w-5 h-5" />
                            </div>
                            <span className="text-gray-200 text-sm font-medium">Smart budgeting tools and insights</span>
                        </div>

                        <div className="flex items-center gap-4 group">
                            <div className="w-10 h-10 bg-white/10 rounded-lg flex shrink-0 items-center justify-center text-yellow-400 group-hover:bg-yellow-400 group-hover:text-blue-900 transition-all duration-300">
                                <Shield className="w-5 h-5" />
                            </div>
                            <span className="text-gray-200 text-sm font-medium">Secure and private data protection</span>
                        </div>

                        <div className="flex items-center gap-4 group">
                            <div className="w-10 h-10 bg-white/10 rounded-lg flex shrink-0 items-center justify-center text-yellow-400 group-hover:bg-yellow-400 group-hover:text-blue-900 transition-all duration-300">
                                <CheckCircle className="w-5 h-5" />
                            </div>
                            <span className="text-gray-200 text-sm font-medium">Customizable financial categories</span>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="pt-4 border-t border-white/10 max-w-lg">
                        <div className="flex items-center gap-3 text-gray-400 text-xs">
                            <User className="w-4 h-4 text-yellow-400" />
                            <span>Built by CIT-U students for the community</span>
                        </div>
                    </div>
                </div>

                {/* --- RIGHT SIDE: FORM CARD --- */}
                <div className="flex-1 w-full max-w-lg">
                    {/* Compact padding (p-6) ensures it doesn't overflow height */}
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6 lg:p-8">
                        
                        {/* Mobile Header (Only visible on mobile) */}
                        <div className="text-center mb-4 lg:hidden">
                             <Link to="/" className="inline-flex items-center gap-2 group mb-2">
                                <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
                                    <Wallet className="w-5 h-5 text-blue-900" />
                                </div>
                                <span className="text-2xl font-black text-white">Equi<span className="text-yellow-400">Track</span></span>
                            </Link>
                        </div>

                        {/* Form Header */}
                        <div className="text-center mb-4">
                            <h2 className="text-2xl font-black text-white mb-1">
                                Join <span className="text-yellow-400">EquiTrack</span>
                            </h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-3">
                            
                            {/* Profile Photo */}
                            <div className="flex justify-center -mt-2">
                                <SimpleProfilePhotoSelector 
                                    image={profilePhoto} 
                                    setImage={setProfilePhoto}
                                    size="lg"
                                />
                            </div>

                            {/* Full Name Input */}
                            <div className="space-y-1">
                                <label className="text-white font-medium text-xs ml-1">Full Name</label>
                                <input
                                    value={fullname}
                                    onChange={(e) => setFullname(e.target.value)}
                                    placeholder="Enter your full name"
                                    type="text"
                                    className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300 text-sm"
                                    disabled={isLoading}
                                />
                            </div>

                            {/* Email Input */}
                            <div className="space-y-1">
                                <label className="text-white font-medium text-xs ml-1">Email Address</label>
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your.email@example.com"
                                    type="email"
                                    className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300 text-sm"
                                    disabled={isLoading}
                                />
                            </div>

                            {/* Password Input */}
                            <div className="space-y-1">
                                <label className="text-white font-medium text-xs ml-1">Password</label>
                                <div className="relative">
                                    <input
                                        value={password}
                                        onChange={handlePasswordChange}
                                        placeholder="Create a strong password"
                                        type={showPassword ? "text" : "password"}
                                        className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300 pr-10 text-sm"
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-400 transition-colors duration-300"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                                
                                {/* Password Strength Meter */}
                                {password && (
                                    <div className="space-y-1 mt-1">
                                        <div className="flex justify-between text-[10px]">
                                            <span className="text-gray-300">Strength:</span>
                                            <span className={`font-bold ${
                                                passwordStrength >= 75 ? "text-green-400" :
                                                passwordStrength >= 50 ? "text-yellow-400" :
                                                passwordStrength >= 25 ? "text-orange-400" : "text-red-400"
                                            }`}>
                                                {getPasswordStrengthText()}
                                            </span>
                                        </div>
                                        <div className="w-full bg-white/10 rounded-full h-1">
                                            <div 
                                                className={`h-1 rounded-full transition-all duration-500 ${getPasswordStrengthColor()}`}
                                                style={{ width: `${passwordStrength}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="p-2 bg-red-500/20 border border-red-400/50 rounded-lg">
                                    <p className="text-red-200 text-xs text-center">
                                        {error}
                                    </p>
                                </div>
                            )}

                            {/* Sign Up Button */}
                            <button
                                disabled={isLoading}
                                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none group text-sm mt-1"
                                type="submit"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    {isLoading ? (
                                        <>
                                            <LoaderCircle className="w-4 h-4 animate-spin" />
                                            Creating Account...
                                        </>
                                    ) : (
                                        <>
                                            Get Started
                                            <Zap className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                        </>
                                    )}
                                </span>
                            </button>

                            {/* Login Link */}
                            <div className="text-center pt-2">
                                <p className="text-gray-300 text-xs">
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
                        <div className="mt-4 p-2 bg-white/5 rounded-lg border border-white/10 text-center">
                            <div className="flex items-center gap-2 justify-center">
                                <Shield className="w-3 h-3 text-yellow-400 shrink-0" />
                                <p className="text-gray-400 text-[10px] leading-tight text-left">
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