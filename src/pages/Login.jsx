import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {assets} from "../assets/assets.js";
import Input from "../components/Input.jsx";
import axiosConfig from "../util/axiosConfig.js";
import { AppContext } from "../context/AppContext.jsx";
import toast from "react-hot-toast";
import { Loader, LoaderCircle } from "lucide-react";
import { validateEmail } from "../util/validation.js";


const Login = () => {
  const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[error, setError] = useState(null);
    const[isLoading, setIsLoading] = useState(false);
    const { setUser } = useContext(AppContext);

    const navigate = useNavigate();

    const handleSubmit = async(e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setIsLoading(true);
    
    //basic validation diri
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
    
    setError("");
    //LOGIN API call diri
    try{
        const response = await axiosConfig.post("/login", {
            email,
            password,
        });
        const {token, user} = response.data;
        if(token){
            localStorage.setItem("token", token);
            setUser(user);
            toast.success("Login successful!");
            navigate("/dashboard");
        }
    }catch(err){
        console.error("Login error:", err);
        if(err.response?.data?.message){
            setError(err.response.data.message);
        } else if(err.code === 'ECONNABORTED'){
            setError("Server is waking up, please wait and try again.");
        } else {
            setError(err.message || "Unable to login. Please try again.");
        }
    }finally{
        setIsLoading(false);
    }
}

  return (
    <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
            {/* Background img with blur ni diri */}
            <img src={assets.login_bg} alt="Background" className="absolute inset-0 w-full h-full object-cover filter blur-sm"/>

            <div className="relative z-10 w-full max-w-lg px-6">
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
                    <h3 className="text-2xl font-semibold text-black text-center mb-2">
                        Welcome Back!
                    </h3>
                    <p className="text-sm text-slate-700 text-center mb-8">
                        Please enter your credentials to log in to your account.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)} 
                      label="Email Address"
                      placeholder="nga@example.com"
                      type="text"
                      />

                      <Input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} 
                      label="Password"
                      placeholder="**************"
                      type="password"
                      />
                            
                       
                        {error && (
                            <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
                                {error}
                            </p>
                        )}

                        <button disabled={isLoading} className={`btn primary w-full py-3 text-lg font-medium bg-[#f69fbc] text-white rounded-lg hover:bg-[#e87fa8] transition-colors flex items-center justify-center gap-2 ${isLoading ? 'opacity-60 cursor-not-allowed': ''}`} type="submit">
                            {isLoading ? (
                                <>
                                    <LoaderCircle className="animate-spin w-5 h-5"/>
                                    Logging in...
                                </>
                            ): ("LOGIN")}
                        </button>

                        <p className="text-sm text-slate-800 text-center mt-6">
                            Don't have an account?{' '}
                            <Link to="/signup" className="font-medium text-black-600 underline hover:text-blue-800 transition-colors">
                                Sign up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>

        </div>
    );
};
export default Login;