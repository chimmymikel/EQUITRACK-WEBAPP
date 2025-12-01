import { useContext, useEffect, useState } from "react";
import { User, Phone, Mail, Calendar, Briefcase, TrendingUp, TrendingDown, Wallet, Activity, Edit2, X, Check } from "lucide-react";
import { AppContext } from "../context/AppContext";
import { useUser } from "../hooks/useUser";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import uploadProfileImage from "../util/uploadProfileImage";
import toast from "react-hot-toast";
import ProfilePhotoSelector from "../components/ProfilePhotoSelector";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Profile = () => {
    useUser(); // ensures user is loaded or redirected
    const { user, setUser } = useContext(AppContext);
    const navigate = useNavigate();

    // State for dashboard statistics
    const [stats, setStats] = useState({
        totalBalance: 0,
        totalIncome: 0,
        totalExpense: 0, // Match the key from dashboard API
        recentTransactions: []
    });

    // Form state
    const [form, setForm] = useState({
        fullName: "",
        phone: "",
        bio: "",
    });
    
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // Initialize form with user data
    useEffect(() => {
        if (user) {
            setForm({
                fullName: user.fullName || "",
                phone: user.phone || "",
                bio: user.bio || "",
            });
        }
    }, [user]);

    // Fetch dashboard statistics
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axiosConfig.get(API_ENDPOINTS.DASHBOARD_DATA);
                console.log("Dashboard data:", response.data); // Debug log
                
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

    // Handler functions
    const handleChange = (key) => (e) => {
        const value = e?.target ? e.target.value : e;
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    // Handle form submission
    const handleSubmit = async () => {
        setLoading(true);

        try {
            let profileImageUrl = user?.profileImageUrl || null;

            // Upload image if changed
            if (image) {
                console.log("Uploading image...");
                profileImageUrl = await uploadProfileImage(image);
                console.log("Image uploaded:", profileImageUrl);
            }

            const payload = {
                fullName: form.fullName,
                // DO NOT include email - backends don't allow email updates
                phone: form.phone,
                bio: form.bio,
                profileImageUrl,
            };

            console.log("=== DEBUG INFO ===");
            console.log("Token exists:", !!localStorage.getItem("token"));
            console.log("Submitting payload:", payload);
            console.log("Base endpoint:", API_ENDPOINTS.GET_USER_INFO);
            console.log("==================");

            // Try different endpoints and methods
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
                    console.log(`Trying ${method.toUpperCase()} ${url}...`);
                    
                    if (method === 'put') {
                        response = await axiosConfig.put(url, payload);
                    } else if (method === 'patch') {
                        response = await axiosConfig.patch(url, payload);
                    } else if (method === 'post') {
                        response = await axiosConfig.post(url, payload);
                    }
                    
                    console.log(`✅ SUCCESS with ${method.toUpperCase()} ${url}`);
                    console.log("Response:", response.data);
                    succeeded = true;
                    break;
                } catch (error) {
                    const status = error?.response?.status;
                    console.log(`❌ ${method.toUpperCase()} ${url} failed with status ${status}`);
                    lastError = error;
                    
                    // If we get 404, try next endpoint
                    // If we get 403/401, might be auth issue, but keep trying
                    // If we get 405, wrong method for this endpoint
                    if (status !== 404 && status !== 405 && status !== 403) {
                        // For other errors, stop trying
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
            console.error("=== ERROR DETAILS ===");
            console.error("Error:", err);
            console.error("Status:", err?.response?.status);
            console.error("Response data:", err?.response?.data);
            console.error("Headers sent:", err?.config?.headers);
            console.error("URL tried:", err?.config?.url);
            console.error("Method tried:", err?.config?.method);
            console.error("=====================");
            
            const status = err?.response?.status;
            const errorData = err?.response?.data;
            
            let errorMessage = "Failed to update profile";
            
            if (status === 403) {
                errorMessage = `Access denied. The backend /profile endpoint might be read-only. Check your backend docs.`;
            } else if (status === 401) {
                errorMessage = "Session expired. Please login again.";
            } else if (status === 400) {
                errorMessage = `Bad request: ${errorData?.message || "Invalid data"}`;
            } else if (status === 404) {
                errorMessage = "Profile update endpoint not found. Need to check backend API docs.";
            } else if (status === 405) {
                errorMessage = "Method not allowed. Backend might need different HTTP method.";
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

    // Utility functions
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
        
        // Count category occurrences
        const categoryCounts = {};
        stats.recentTransactions.forEach(transaction => {
            const category = transaction.category || "Uncategorized";
            categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        });
        
        // Find most common category
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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
            <div className="max-w-6xl mx-auto space-y-6">

                <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors font-medium group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Back to Dashboard
                </button>
                
                {/* Header Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="h-32 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800"></div>
                    <div className="px-6 pb-6">
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 gap-4">
                            {/* Profile Photo & Basic Info */}
                            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4">
                                <div className="relative group">
                                    <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-100 overflow-hidden shadow-lg">
                                        {user?.profileImageUrl ? (
                                            <img 
                                                src={user.profileImageUrl} 
                                                alt={user?.fullName || "Profile"} 
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-400 to-purple-600">
                                                <User className="w-16 h-16 text-white" />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="text-center sm:text-left mb-2">
                                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                                        {user?.fullName || "User"}
                                    </h1>
                                    <p className="text-gray-500 flex items-center gap-2 justify-center sm:justify-start mt-1">
                                        <Calendar className="w-4 h-4" />
                                        Member since {getMemberSince()}
                                    </p>
                                </div>
                            </div>

                            {/* Edit Button */}
                            {!isEditing && (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-lg transition-colors font-medium flex items-center gap-2 justify-center"
                                >
                                    <Edit2 className="w-4 h-4" />
                                    Edit Profile
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Account Statistics Dashboard */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Total Balance */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                            <div className="p-3 bg-purple-100 rounded-lg">
                                <Wallet className="w-6 h-6 text-purple-600" />
                            </div>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                                stats.totalBalance >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                                {stats.totalBalance >= 0 ? 'Positive' : 'Negative'}
                            </span>
                        </div>
                        <h3 className="text-gray-600 text-sm font-medium mb-1">Total Balance</h3>
                        <p className={`text-2xl font-bold ${
                            stats.totalBalance >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                            {formatCurrency(stats.totalBalance)}
                        </p>
                    </div>

                    {/* Total Income */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                            <div className="p-3 bg-green-100 rounded-lg">
                                <TrendingUp className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                        <h3 className="text-gray-600 text-sm font-medium mb-1">Total Income</h3>
                        <p className="text-2xl font-bold text-green-600">
                            {formatCurrency(stats.totalIncome)}
                        </p>
                    </div>

                    {/* Total Expenses */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                            <div className="p-3 bg-red-100 rounded-lg">
                                <TrendingDown className="w-6 h-6 text-red-600" />
                            </div>
                        </div>
                        <h3 className="text-gray-600 text-sm font-medium mb-1">Total Expenses</h3>
                        <p className="text-2xl font-bold text-red-600">
                            {formatCurrency(stats.totalExpense)}
                        </p>
                    </div>

                    {/* Total Transactions */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <Activity className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                        <h3 className="text-gray-600 text-sm font-medium mb-1">Total Transactions</h3>
                        <p className="text-2xl font-bold text-gray-800">{getTotalTransactions()}</p>
                        <p className="text-xs text-gray-500 mt-1">Most used: {getMostUsedCategory()}</p>
                    </div>
                </div>

                {/* Profile Information & Edit Form */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Contact Information */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <User className="w-5 h-5 text-purple-600" />
                                Contact Information
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-gray-500 mb-1">Email</p>
                                        <p className="text-sm text-gray-800 font-medium truncate">
                                            {user?.email || "Not provided"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-gray-500 mb-1">Phone</p>
                                        <p className="text-sm text-gray-800 font-medium">
                                            {user?.phone || "Not provided"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Briefcase className="w-5 h-5 text-gray-400 mt-0.5" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-gray-500 mb-1">Bio</p>
                                        <p className="text-sm text-gray-800">
                                            {user?.bio || "No bio yet"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Edit Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <Edit2 className="w-5 h-5 text-purple-600" />
                                {isEditing ? "Edit Your Information" : "Your Information"}
                            </h2>

                            <div className="space-y-4">
                                {/* Profile Photo Upload (only show when editing) */}
                                {isEditing && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 block mb-2">
                                            Profile Photo
                                        </label>
                                        <ProfilePhotoSelector image={image} setImage={setImage} />
                                    </div>
                                )}

                                {/* Full Name */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        value={form.fullName}
                                        onChange={handleChange("fullName")}
                                        placeholder="John Doe"
                                        disabled={!isEditing || loading}
                                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors ${
                                            !isEditing ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                                        }`}
                                    />
                                </div>

                                {/* Email (Read-only) */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-2">
                                        Email Address
                                        <span className="text-xs text-gray-500 ml-2">(Cannot be changed)</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={user?.email || ""}
                                        disabled
                                        className="w-full px-4 py-2.5 border rounded-lg bg-gray-50 cursor-not-allowed text-gray-600"
                                    />
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        value={form.phone}
                                        onChange={handleChange("phone")}
                                        placeholder="09261540612"
                                        disabled={!isEditing || loading}
                                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors ${
                                            !isEditing ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                                        }`}
                                    />
                                </div>

                                {/* Bio */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-2">
                                        Bio
                                    </label>
                                    <textarea
                                        value={form.bio}
                                        onChange={handleChange("bio")}
                                        placeholder="Tell us about yourself..."
                                        rows={4}
                                        disabled={!isEditing || loading}
                                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors resize-none ${
                                            !isEditing ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                                        }`}
                                    />
                                </div>

                                {/* Action Buttons */}
                                {isEditing && (
                                    <div className="flex gap-3 pt-2">
                                        <button
                                            onClick={handleSubmit}
                                            disabled={loading}
                                            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        >
                                            {loading ? (
                                                <>
                                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                    Saving...
                                                </>
                                            ) : (
                                                <>
                                                    <Check className="w-4 h-4" />
                                                    Save Changes
                                                </>
                                            )}
                                        </button>

                                        <button
                                            onClick={handleCancel}
                                            disabled={loading}
                                            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                                        >
                                            <X className="w-4 h-4" />
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;