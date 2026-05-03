import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaCamera, FaTasks } from "react-icons/fa";
import { useAuthContext } from "../../config/AuthContext";
import ImageCropModal from '../ImageCropModal';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuth, handleLogout, user, handleChangeProfilePic } = useAuthContext();
    const fileInputRef = useRef(null);

    const [menuOpen, setMenuOpen] = useState(false);
    const [cropModalOpen, setCropModalOpen] = useState(false);
    const [selectedImageSrc, setSelectedImageSrc] = useState(null);

    const onFileSelect = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setSelectedImageSrc(reader.result);
                setCropModalOpen(true);
            };
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const handleCropComplete = async (croppedFile) => {
        await handleChangeProfilePic(croppedFile);
        setCropModalOpen(false);
        setSelectedImageSrc(null);
    };

    const handleCropCancel = () => {
        setCropModalOpen(false);
        setSelectedImageSrc(null);
    };

    const handleNavigate = (path) => {
        navigate(path);
        setMenuOpen(false); // close menu on click
    };

    return (
        <div className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-200">

            <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">

                {/* Logo */}
                <div
                    onClick={() => handleNavigate("/")}
                    className="flex items-center gap-2 cursor-pointer group"
                >
                    <div className="flex items-center justify-center bg-linear-to-br from-purple-600 to-pink-500 p-1.5 rounded-lg text-white shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300">
                        <FaTasks size={18} />
                    </div>
                    <div className="text-xl font-bold bg-linear-to-r from-purple-600 via-blue-600 to-pink-500 bg-clip-text text-transparent">
                        Taskify
                    </div>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6">
                    {!isAuth ? (
                        <>
                            <button
                                onClick={() => handleNavigate("/login")}
                                className={`text-sm cursor-pointer font-medium transition hover:text-purple-600 ${location.pathname === "/login" ? "text-purple-600" : "text-gray-700"
                                    }`}
                            >
                                Login
                            </button>

                            <button
                                onClick={() => handleNavigate("/register")}
                                className={`text-sm cursor-pointer font-medium transition hover:text-purple-600 ${location.pathname === "/register" ? "text-purple-600" : "text-gray-700"
                                    }`}
                            >
                                Register
                            </button>
                        </>
                    ) : (
                        <div className="flex items-center gap-3">
                            <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={onFileSelect} />
                            <div
                                onClick={() => fileInputRef.current.click()}
                                title="Change Profile Picture"
                                className="relative group flex items-center justify-center w-9 h-9 rounded-full bg-linear-to-br from-purple-500 to-pink-500 text-white font-bold text-sm shadow-md overflow-hidden cursor-pointer"
                            >
                                {user?.profilePic ? (
                                    <img src={user?.profilePic} alt="Profile" className="w-full h-full object-cover group-hover:opacity-50 transition" />
                                ) : (
                                    <span className="group-hover:opacity-50 transition">{user?.name?.charAt(0).toUpperCase() || "U"}</span>
                                )}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition text-white">
                                    <FaCamera size={14} />
                                </div>
                            </div>
                            <span className="text-gray-700 font-medium hidden sm:block">
                                {user?.name}
                            </span>
                            <button
                                onClick={() => {
                                    handleLogout();
                                    navigate("/login");
                                    setMenuOpen(false);
                                }}
                                className="ml-2 text-sm text-gray-500 hover:text-red-500 font-medium transition-colors cursor-pointer"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
                {/* Mobile Button */}
                <div className="md:hidden">
                    <button onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
                    </button>
                </div>

            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden px-4 pb-4 flex flex-col gap-3 bg-white border-t border-gray-200">
                    {!isAuth ? (
                        <>
                            <button
                                onClick={() => handleNavigate("/login")}
                                className="text-left cursor-pointer py-2 text-gray-700 hover:text-purple-600"
                            >
                                Login
                            </button>

                            <button
                                onClick={() => handleNavigate("/register")}
                                className="text-left cursor-pointer py-2 text-gray-700 hover:text-purple-600"
                            >
                                Register
                            </button>
                        </>
                    ) : (
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3 py-2 px-1">
                                <div
                                    onClick={() => fileInputRef.current.click()}
                                    title="Change Profile Picture"
                                    className="relative group flex items-center justify-center w-10 h-10 rounded-full bg-linear-to-br from-purple-500 to-pink-500 text-white font-bold text-lg shadow-md overflow-hidden cursor-pointer"
                                >
                                    {user?.profilePic ? (
                                        <img src={user?.profilePic} alt="Profile" className="w-full h-full object-cover group-hover:opacity-50 transition" />
                                    ) : (
                                        <span className="group-hover:opacity-50 transition">{user?.name?.charAt(0).toUpperCase() || "U"}</span>
                                    )}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition text-white">
                                        <FaCamera size={16} />
                                    </div>
                                </div>
                                <span className="text-gray-800 font-semibold text-lg">{user?.name}</span>
                            </div>
                            <button
                                onClick={() => {
                                    handleLogout();
                                    navigate("/login");
                                    setMenuOpen(false);
                                }}
                                className="text-left cursor-pointer py-2 text-red-500 hover:text-red-600 font-bold"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            )}

            {cropModalOpen && selectedImageSrc && (
                <ImageCropModal
                    imageSrc={selectedImageSrc}
                    onCropComplete={handleCropComplete}
                    onCancel={handleCropCancel}
                />
            )}

        </div>
    );
};

export default Navbar;