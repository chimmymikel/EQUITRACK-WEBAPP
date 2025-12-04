import { useContext, useEffect, useState } from "react";
import { User, Phone, Mail, Calendar, Briefcase, TrendingUp, TrendingDown, Wallet, Activity, Edit2, X, Check, ArrowLeft, Save } from "lucide-react";
import { AppContext } from "../context/AppContext";
import { useUser } from "../hooks/useUser";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import uploadProfileImage from "../util/uploadProfileImage";
import toast from "react-hot-toast";
import ProfilePhotoSelector from "../components/ProfilePhotoSelector";
import { useNavigate } from "react-router-dom";
import Dashboard from "../components/Dashboard";

const Profile = () => {
    useUser();
    const { user, setUser } = useContext(AppContext);
    const navigate = useNavigate();

    const [stats, setStats] = useState({
        totalBalance: 0,
        totalIncome: 0,
        totalExpense: 0,
        recentTransactions: []
    });

    const [form, setForm] = useState({
        fullName: "",
        phone: "",
        bio: "",
    });
    
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (user) {
            setForm({
                fullName: user.fullName || "",
                phone: user.phone || "",
                bio: user.bio || "",
            });
        }
    }, [user]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axiosConfig.get(API_ENDPOINTS.DASHBOARD_DATA);
                if (response.status === 200) {
                    setStats({
                        totalBalance: response.data.totalBalance || 0,
                        totalIncome: response.data.totalIncome || 0,
                        totalExpense: response.data.totalExpense || 0,
                        recentTransactions: response.data.recentTransactions || []
                    });
                }
            } catch (err) {
                console.error("Failed to fetch stats", err);
                toast.error("Failed to load statistics");
            }
        };
        fetchStats();
    }, []);

    const handleChange = (key) => (e) => {
        const value = e?.target ? e.target.value : e;
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async () => {
        setLoading(true);

        try {
            let profileImageUrl = user?.profileImageUrl || null;

            if (image) {
                profileImageUrl = await uploadProfileImage(image);
            }

            const payload = {
                fullName: form.fullName,
                phone: form.phone,
                bio: form.bio,
                profileImageUrl,
            };

            const endpointsToTry = [
                { method: 'put', url: API_ENDPOINTS.GET_USER_INFO },
                { method: 'patch', url: API_ENDPOINTS.GET_USER_INFO },
                { method: 'post', url: API_ENDPOINTS.GET_USER_INFO },
                { method: 'put', url: '/profile/update' },
                { method: 'post', url: '/profile/update' },
                { method: 'put', url: '/user/update' },
                { method: 'post', url: '/user/update' },
            ];

            let response;
            let succeeded = false;
            let lastError;

            for (const { method, url } of endpointsToTry) {
                try {
                    if (method === 'put') {
                        response = await axiosConfig.put(url, payload);
                    } else if (method === 'patch') {
                        response = await axiosConfig.patch(url, payload);
                    } else if (method === 'post') {
                        response = await axiosConfig.post(url, payload);
                    }
                    
                    succeeded = true;
                    break;
                } catch (error) {
                    const status = error?.response?.status;
                    lastError = error;
                    
                    if (status !== 404 && status !== 405 && status !== 403) {
                        throw error;
                    }
                }
            }

            if (!succeeded) {
                throw lastError || new Error("All endpoints failed");
            }

            if (response?.data) {
                setUser(response.data);
                setImage(null);
                setIsEditing(false);
                toast.success("Profile updated successfully");
            } else {
                toast.error("Failed to update profile");
            }
        } catch (err) {
            const status = err?.response?.status;
            const errorData = err?.response?.data;
            
            let errorMessage = "Failed to update profile";
            
            if (status === 403) {
                errorMessage = `Access denied. The backend /profile endpoint might be read-only.`;
            } else if (status === 401) {
                errorMessage = "Session expired. Please login again.";
            } else if (status === 400) {
                errorMessage = `Bad request: ${errorData?.message || "Invalid data"}`;
            } else if (status === 404) {
                errorMessage = "Profile update endpoint not found.";
            } else if (errorData?.message) {
                errorMessage = errorData.message;
            }
            
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        if (user) {
            setForm({
                fullName: user.fullName || "",
                phone: user.phone || "",
                bio: user.bio || "",
            });
            setImage(null);
            setIsEditing(false);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const getMemberSince = () => {
        if (!user?.createdAt) return "Recently";
        const date = new Date(user.createdAt);
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    };

    const getTotalTransactions = () => {
        return stats.recentTransactions?.length || 0;
    };

    const getMostUsedCategory = () => {
        if (!stats.recentTransactions || stats.recentTransactions.length === 0) {
            return "N/A";
        }
        
        const categoryCounts = {};
        stats.recentTransactions.forEach(transaction => {
            const category = transaction.category || "Uncategorized";
            categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        });
        
        let maxCount = 0;
        let mostUsed = "N/A";
        for (const [category, count] of Object.entries(categoryCounts)) {
            if (count > maxCount) {
                maxCount = count;
                mostUsed = category;
            }
        }
        
        return mostUsed;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#084062] to-blue-900 relative overflow-hidden">
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

            <Dashboard activeMenu="Profile">
                <div className="my-5 relative z-10 w-full">
                    {/* Header with Back Button */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="flex items-center gap-2 px-4 py-2 bg-slate-800/60 hover:bg-slate-800/80 backdrop-blur-md border border-white/10 hover:border-yellow-400/50 text-gray-300 hover:text-yellow-400 transition-all font-semibold group rounded-lg shadow-lg"
                            >
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                <span className="text-sm">Back</span>
                            </button>
                            <h2 className="text-2xl font-bold text-white">My Profile</h2>
                        </div>
                        
                        {!isEditing && (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex items-center gap-2 px-6 py-2.5 bg-yellow-400 text-gray-900 rounded-lg font-bold shadow-lg hover:shadow-yellow-400/40 hover:scale-105 transition-all"
                            >
                                <Edit2 size={18} />
                                Edit Profile
                            </button>
                        )}
                    </div>

                    {/* Profile Header Card - Full Width */}
                    <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/20 rounded-xl shadow-xl p-6 mb-6">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                            <div className="relative group flex-shrink-0">
                                <div className="w-32 h-32 rounded-full border-4 border-yellow-400/30 bg-slate-700 overflow-hidden shadow-2xl ring-4 ring-yellow-400/10">
                                    {user?.profileImageUrl ? (
                                        <img 
                                            src={user.profileImageUrl} 
                                            alt={user?.fullName || "Profile"} 
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-yellow-400 to-yellow-600">
                                            <User className="w-16 h-16 text-slate-900" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex-1 text-center md:text-left">
                                <h1 className="text-3xl font-bold text-white mb-3">
                                    {user?.fullName || "User"}
                                </h1>
                                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-700/40 rounded-lg border border-white/10">
                                        <Mail className="w-4 h-4 text-yellow-400" />
                                        <span className="text-sm text-gray-300">{user?.email || "Not provided"}</span>
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-700/40 rounded-lg border border-white/10">
                                        <Calendar className="w-4 h-4 text-blue-400" />
                                        <span className="text-sm text-gray-300">Member since {getMemberSince()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Statistics Grid - Full Width */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        {/* Total Balance */}
                        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/20 rounded-xl p-6 hover:border-yellow-400/30 transition-all shadow-xl hover:scale-[1.02] hover:shadow-2xl">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-purple-600/20 rounded-xl ring-2 ring-purple-500/20">
                                    <Wallet className="w-7 h-7 text-purple-400" />
                                </div>
                                <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                                    stats.totalBalance >= 0 ? 'bg-green-500/20 text-green-400 ring-2 ring-green-500/30' : 'bg-red-500/20 text-red-400 ring-2 ring-red-500/30'
                                }`}>
                                    {stats.totalBalance >= 0 ? 'Positive' : 'Negative'}
                                </span>
                            </div>
                            <h3 className="text-gray-400 text-sm font-semibold mb-2">Total Balance</h3>
                            <p className={`text-2xl font-bold ${
                                stats.totalBalance >= 0 ? 'text-green-400' : 'text-red-400'
                            }`}>
                                {formatCurrency(stats.totalBalance)}
                            </p>
                        </div>

                        {/* Total Income */}
                        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/20 rounded-xl p-6 hover:border-yellow-400/30 transition-all shadow-xl hover:scale-[1.02] hover:shadow-2xl">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-green-600/20 rounded-xl ring-2 ring-green-500/20">
                                    <TrendingUp className="w-7 h-7 text-green-400" />
                                </div>
                            </div>
                            <h3 className="text-gray-400 text-sm font-semibold mb-2">Total Income</h3>
                            <p className="text-2xl font-bold text-green-400">
                                {formatCurrency(stats.totalIncome)}
                            </p>
                        </div>

                        {/* Total Expenses */}
                        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/20 rounded-xl p-6 hover:border-yellow-400/30 transition-all shadow-xl hover:scale-[1.02] hover:shadow-2xl">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-red-600/20 rounded-xl ring-2 ring-red-500/20">
                                    <TrendingDown className="w-7 h-7 text-red-400" />
                                </div>
                            </div>
                            <h3 className="text-gray-400 text-sm font-semibold mb-2">Total Expenses</h3>
                            <p className="text-2xl font-bold text-red-400">
                                {formatCurrency(stats.totalExpense)}
                            </p>
                        </div>

                        {/* Total Transactions */}
                        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/20 rounded-xl p-6 hover:border-yellow-400/30 transition-all shadow-xl hover:scale-[1.02] hover:shadow-2xl">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-blue-600/20 rounded-xl ring-2 ring-blue-500/20">
                                    <Activity className="w-7 h-7 text-blue-400" />
                                </div>
                            </div>
                            <h3 className="text-gray-400 text-sm font-semibold mb-2">Total Transactions</h3>
                            <p className="text-2xl font-bold text-white">{getTotalTransactions()}</p>
                            <p className="text-xs text-gray-500 mt-2">Most used: {getMostUsedCategory()}</p>
                        </div>
                    </div>

                    {/* Main Content Section - Enhanced */}
                    <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl p-6">
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                            <h2 className="text-xl font-bold text-white flex items-center gap-3">
                                <div className="p-2 bg-yellow-400/20 rounded-lg">
                                    <User className="w-6 h-6 text-yellow-400" />
                                </div>
                                {isEditing ? "Edit Profile Information" : "Profile Information"}
                            </h2>
                            {isEditing && (
                                <div className="flex gap-3">
                                    <button
                                        onClick={handleSubmit}
                                        disabled={loading}
                                        className="flex items-center gap-2 px-6 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg font-bold transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:scale-105"
                                    >
                                        {loading ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="w-5 h-5" />
                                                Save Changes
                                            </>
                                        )}
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        disabled={loading}
                                        className="flex items-center gap-2 px-6 py-2.5 bg-slate-700/50 hover:bg-slate-700 text-white rounded-lg font-semibold transition-all disabled:opacity-60"
                                    >
                                        <X className="w-5 h-5" />
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Left Column - Photo & Contact Info */}
                            <div className="space-y-6">
                                {isEditing && (
                                    <div className="bg-slate-700/30 rounded-xl p-5 border border-white/10">
                                        <label className="text-sm font-bold text-white block mb-3 flex items-center gap-2">
                                            <User className="w-4 h-4 text-yellow-400" />
                                            Profile Photo
                                        </label>
                                        <ProfilePhotoSelector image={image} setImage={setImage} />
                                    </div>
                                )}

                                <div className="bg-slate-700/30 rounded-xl p-5 border border-white/10">
                                    <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-yellow-400" />
                                        Contact Details
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3 p-3 bg-slate-600/30 rounded-lg border border-white/5">
                                            <div className="p-2 bg-slate-700/50 rounded-lg">
                                                <Mail className="w-4 h-4 text-yellow-400" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs text-gray-500 mb-1 font-semibold">Email Address</p>
                                                <p className="text-sm text-white font-semibold truncate">
                                                    {user?.email || "Not provided"}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3 p-3 bg-slate-600/30 rounded-lg border border-white/5">
                                            <div className="p-2 bg-slate-700/50 rounded-lg">
                                                <Phone className="w-4 h-4 text-green-400" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs text-gray-500 mb-1 font-semibold">Phone Number</p>
                                                <p className="text-sm text-white font-semibold">
                                                    {user?.phone || "Not provided"}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3 p-3 bg-slate-600/30 rounded-lg border border-white/5">
                                            <div className="p-2 bg-slate-700/50 rounded-lg">
                                                <Briefcase className="w-4 h-4 text-blue-400" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs text-gray-500 mb-1 font-semibold">Bio</p>
                                                <p className="text-sm text-white leading-relaxed">
                                                    {user?.bio || "No bio added yet."}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Edit Form */}
                            <div className="lg:col-span-2">
                                <div className="bg-slate-700/30 rounded-xl p-6 border border-white/10">
                                    <h3 className="text-sm font-bold text-white mb-5 flex items-center gap-2">
                                        <Edit2 className="w-4 h-4 text-yellow-400" />
                                        Personal Information
                                    </h3>
                                    
                                    <div className="space-y-5">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div>
                                                <label className="text-sm font-bold text-white block mb-2 flex items-center gap-2">
                                                    <User className="w-3.5 h-3.5 text-gray-400" />
                                                    Full Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={form.fullName}
                                                    onChange={handleChange("fullName")}
                                                    placeholder="Enter your full name"
                                                    disabled={!isEditing || loading}
                                                    className={`w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all text-white text-sm ${
                                                        !isEditing ? 'bg-slate-600/30 cursor-not-allowed' : 'bg-slate-600/50 hover:bg-slate-600/60'
                                                    }`}
                                                />
                                            </div>

                                            <div>
                                                <label className="text-sm font-bold text-white block mb-2 flex items-center gap-2">
                                                    <Phone className="w-3.5 h-3.5 text-gray-400" />
                                                    Phone Number
                                                </label>
                                                <input
                                                    type="text"
                                                    value={form.phone}
                                                    onChange={handleChange("phone")}
                                                    placeholder="09261540612"
                                                    disabled={!isEditing || loading}
                                                    className={`w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all text-white text-sm ${
                                                        !isEditing ? 'bg-slate-600/30 cursor-not-allowed' : 'bg-slate-600/50 hover:bg-slate-600/60'
                                                    }`}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-sm font-bold text-white block mb-2 flex items-center gap-2">
                                                <Mail className="w-3.5 h-3.5 text-gray-400" />
                                                Email Address
                                                <span className="text-xs text-gray-400 ml-auto font-normal">(Cannot be changed)</span>
                                            </label>
                                            <input
                                                type="email"
                                                value={user?.email || ""}
                                                disabled
                                                className="w-full px-4 py-3 border border-white/20 rounded-lg bg-slate-600/30 cursor-not-allowed text-gray-400 text-sm"
                                            />
                                        </div>

                                        <div>
                                            <label className="text-sm font-bold text-white block mb-2 flex items-center gap-2">
                                                <Briefcase className="w-3.5 h-3.5 text-gray-400" />
                                                Bio
                                            </label>
                                            <textarea
                                                value={form.bio}
                                                onChange={handleChange("bio")}
                                                placeholder="Tell us about yourself..."
                                                rows={5}
                                                disabled={!isEditing || loading}
                                                className={`w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all resize-none text-white text-sm leading-relaxed ${
                                                    !isEditing ? 'bg-slate-600/30 cursor-not-allowed' : 'bg-slate-600/50 hover:bg-slate-600/60'
                                                }`}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Dashboard>
        </div>
    );
};

export default Profile;