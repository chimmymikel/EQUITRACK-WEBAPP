import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {assets} from "../assets/assets.js";
import Input from "../components/Input.jsx";

const Signup = () => {
    const[fullname, setFullname] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[error, setError] = useState(null);

    const navigate = useNavigate();

    return (
        <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
            {/* Background img with blur ni diri */}
            <img src={assets.login_bg} alt="Background" className="absolute inset-0 w-full h-full object-cover filter blur-sm"/>

            <div className="relative z-10 w-full max-w-lg px-6">
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
                    <h3 className="text-2xl font-semibold text-black text-center mb-2">
                        Create an Account
                    </h3>
                    <p className="text-sm text-slate-700 text-center mb-8">
                        Start Tracking your spendings by joining with us.
                    </p>

                    <form className="space-y-4">
                        <div className="flex justify-center mb-6">
                            {/* profile img ni diri */}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)} 
                            label="Full Name"
                            placeholder="John Wick"
                            type="text"
                            />

                            <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                            label="Email Address"
                            placeholder="nga@example.com"
                            type="text"
                            />

                            <div className="col-span-2">
                                <Input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                                label="Password"
                                placeholder="**************"
                                type="password"
                                />
                            </div>

                        </div>
                        {error && (
                            <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
                                {error}
                            </p>
                        )}

                        <button className="w-full py-3 text-lg font-medium bg-[#f69fbc] text-white rounded-lg hover:bg-[#e87fa8] transition-colors" type="submit">
                            SIGN UP
                        </button>

                        <p className="text-sm text-slate-800 text-center mt-6">
                            Already have an account?{' '}
                            <Link to="/login" className="font-medium text-black-600 underline hover:text-blue-800 transition-colors">
                                Log In
                            </Link>
                        </p>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Signup;