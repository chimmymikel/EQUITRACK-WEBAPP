import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { useNavigate } from "react-router-dom";
import { LogOut, Menu, User, X } from "lucide-react";
import { assets } from "../assets/assets.js";
import Sidebar from "./Sidebar";

const Menubar = ({ activeMenu }) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const { user, clearUser } = useContext(AppContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        setShowDropdown(false);
        navigate("/login");
    };

    const closeSidebar = () => {
        setOpenSideMenu(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        if (showDropdown) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showDropdown]);

    return (
        <>
            <div className="flex items-center justify-between gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-4 sm:px-7 sticky top-0 z-30">
                {/* Left side - Menu button and title */}
                <div className="flex items-center gap-5">
                    <button
                        onClick={() => setOpenSideMenu(!openSideMenu)}
                        className="block lg:hidden text-black hover:bg-gray-100 p-1 rounded transition-colors"
                    >
                        {openSideMenu ? (
                            <X className="text-2xl" />
                        ) : (
                            <Menu className="text-2xl" />
                        )}
                    </button>

                    <div className="flex items-center gap-2">
                        <img src={assets.logo} alt="logo" className="h-10 w-10" />
                        <span className="text-lg font-medium text-black truncate">EquiTrack</span>
                    </div>
                </div>

                {/* Right side - Avatar photo */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-800 focus:ring-offset-2 overflow-hidden"
                    >
                        {user?.profileImageUrl ? (
                            <img 
                                src={user.profileImageUrl} 
                                alt={user.fullName || "Profile"} 
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <User className="text-purple-500" />
                        )}
                    </button>

                    {/* Dropdown menu */}
                    {showDropdown && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                            {/* User info */}
                            <div className="px-4 py-3 border-b border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full overflow-hidden">
                                        {user?.profileImageUrl ? (
                                            <img 
                                                src={user.profileImageUrl} 
                                                alt={user.fullName || "Profile"} 
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <User className="w-4 h-4 text-purple-600" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-800 truncate">
                                            {user?.fullName || "User"}
                                        </p>
                                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Dropdown options */}
                            <div className="py-1">
                                <button
                                    onClick={() => { setShowDropdown(false); navigate('/profile'); }}
                                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                                >
                                    <User className="w-4 h-4 text-gray-500" />
                                    <span>Profile</span>
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                                >
                                    <LogOut className="w-4 h-4 text-gray-500" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile side menu - Sliding drawer */}
            {openSideMenu && (
                <>
                    {/* Backdrop overlay */}
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40 top-[73px] animate-fadeIn"
                        onClick={closeSidebar}
                    />
                    
                    {/* Sidebar drawer */}
                    <div className="fixed top-[73px] left-0 lg:hidden z-50 h-[calc(100vh-73px)] animate-slideInLeft">
                        <Sidebar activeMenu={activeMenu} isMobile={true} onClose={closeSidebar} />
                    </div>
                </>
            )}
        </>
    );
};

export default Menubar;