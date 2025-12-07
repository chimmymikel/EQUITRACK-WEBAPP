import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosConfig from "../util/axiosConfig.js";
import { AppContext } from "../context/AppContext.jsx";
import toast from "react-hot-toast";
import { LoaderCircle, Eye, EyeOff, Wallet, Shield, Zap } from "lucide-react";
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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(AppContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }
    
    if (!password.trim()) {
      setError("Please enter your password.");
      setIsLoading(false);
      return;
    }
    
    try {
      const response = await axiosConfig.post("/login", {
        email,
        password,
      });

      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        setUser(user);
        toast.success("Login successful!");
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.code === 'ECONNABORTED') {
        setError("Server is waking up, please wait and try again.");
      } else {
        setError(err.message || "Unable to login. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    // Container: min-h-screen allows growth, lg:py-0 locks height on desktop
    <div className="min-h-screen w-full relative flex items-center justify-center bg-gradient-to-br from-slate-900 via-[#084062] to-blue-900 px-4 py-6 lg:py-0 overflow-x-hidden">
      
      {/* Inject Animation Styles */}
      <PageAnimation />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-3/4 left-1/3 w-48 h-48 bg-cyan-400 rounded-full blur-3xl opacity-15 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-20 animate-pop-in">
        
        {/* Left Side - Branding & Features */}
        {/* HIDDEN on mobile (hidden lg:flex) to ensure single card view */}
        <div className="hidden lg:flex flex-1 w-full flex-col justify-center text-white space-y-8 text-left">
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-3 group mx-auto lg:mx-0">
              <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                <Wallet className="w-7 h-7 text-blue-900" />
              </div>
              <span className="text-3xl font-black">
                Equi<span className="text-yellow-400">Track</span>
              </span>
            </Link>

            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black leading-tight">
              Welcome
              <span className="block text-yellow-400">Back!</span>
            </h1>
            
            <p className="text-lg text-gray-200 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Continue your journey to financial freedom. Track, manage, and optimize your finances with EquiTrack.
            </p>
          </div>

          {/* Features List */}
          <div className="hidden sm:block space-y-5 max-w-lg mx-auto lg:mx-0">
            <div className="flex items-center gap-4 group hover:transform hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex shrink-0 items-center justify-center group-hover:bg-yellow-400 group-hover:text-gray-900 transition-all duration-300">
                <Shield className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-lg">Secure & Protected</h3>
                <p className="text-gray-300">Your financial data is safe and encrypted</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group hover:transform hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex shrink-0 items-center justify-center group-hover:bg-yellow-400 group-hover:text-gray-900 transition-all duration-300">
                <Zap className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-lg">Real-time Updates</h3>
                <p className="text-gray-300">See your income and expenses instantly</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group hover:transform hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex shrink-0 items-center justify-center group-hover:bg-yellow-400 group-hover:text-gray-900 transition-all duration-300">
                <Wallet className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-lg">Smart Budgeting</h3>
                <p className="text-gray-300">Set spending limits and track your categories</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex-1 w-full max-w-lg">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8">
            
            {/* Mobile Header (Visible only on mobile) */}
            <div className="text-center mb-4 lg:hidden">
                <Link to="/" className="inline-flex items-center gap-2 group mb-2">
                <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-blue-900" />
                </div>
                <span className="text-2xl font-black text-white">Equi<span className="text-yellow-400">Track</span></span>
                </Link>
            </div>

            <div className="text-center mb-6">
              {/* RESTORED "Sign In to EquiTrack" */}
              <h2 className="text-3xl font-black text-white mb-2">
                Sign In to <span className="text-yellow-400">EquiTrack</span>
              </h2>
              <p className="text-gray-200">
                Enter your credentials to access your account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="space-y-1.5">
                <label className="text-white font-medium text-sm">Email Address</label>
                <div className="relative">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    type="email"
                    className="w-full px-4 py-3.5 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-white font-medium text-sm">Password</label>
                <div className="relative">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 py-3.5 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300 pr-12"
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
              </div>

              <div className="text-right">
                <button
                  type="button"
                  className="text-yellow-400 hover:text-yellow-300 text-sm font-medium transition-colors duration-300"
                >
                  Forgot your password?
                </button>
              </div>

              {error && (
                <div className="p-4 bg-red-500/20 border border-red-400/50 rounded-xl">
                  <p className="text-red-200 text-sm text-center">
                    {error}
                  </p>
                </div>
              )}

              <button
                disabled={isLoading}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3.5 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-400/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none group"
                type="submit"
              >
                <span className="flex items-center justify-center gap-3">
                  {isLoading ? (
                    <>
                      <LoaderCircle className="w-5 h-5 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In
                      <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </>
                  )}
                </span>
              </button>

              <div className="text-center pt-4">
                <p className="text-gray-300">
                  New to EquiTrack?{' '}
                  <Link 
                    to="/signup" 
                    className="text-yellow-400 hover:text-yellow-300 font-bold underline transition-colors duration-300"
                  >
                    Join Free
                  </Link>
                </p>
              </div>
            </form>

            <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-yellow-400 shrink-0" />
                <p className="text-gray-300 text-sm">
                  Your financial data is secure and encrypted
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;