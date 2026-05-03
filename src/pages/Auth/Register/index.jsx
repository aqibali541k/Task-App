import React, { useState } from 'react';
import { useAuthContext } from '../../../config/AuthContext';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import ImageCropModal from '../../../components/ImageCropModal';
import { Player } from '@lottiefiles/react-lottie-player';

const Register = () => {

    const { handleRegister, loading } = useAuthContext();
    const navigate = useNavigate();

    const [user, setUser] = useState({ name: "", email: "", password: "", profilePic: null });
    const [cropModalOpen, setCropModalOpen] = useState(false);
    const [selectedImageSrc, setSelectedImageSrc] = useState(null);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setSelectedImageSrc(reader.result);
                setCropModalOpen(true);
            };
            e.target.value = "";
        }
    };

    const handleCropComplete = (croppedFile) => {
        setUser({ ...user, profilePic: croppedFile });
        setCropModalOpen(false);
        setSelectedImageSrc(null);
        message.success("Image cropped perfectly!");
    };

    const handleCropCancel = () => {
        setCropModalOpen(false);
        setSelectedImageSrc(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user.name || !user.email || !user.password) {
            return message.error("Please fill all fields");
        }

        const formData = new FormData();
        formData.append("name", user.name);
        formData.append("email", user.email);
        formData.append("password", user.password);
        if (user.profilePic) {
            formData.append("profilePic", user.profilePic);
        }

        const res = await handleRegister(formData);

        if (res) {
            message.success("Account created successfully 🚀");
            navigate("/");
            setUser({ name: "", email: "", password: "", profilePic: null });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col-reverse lg:flex-row w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[600px] border border-gray-100">
                
                {/* Form Section */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-16 relative">
                    <div className="w-full max-w-md">
                        {/* Heading */}
                        <div className="mb-8">
                            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                                Create an account
                            </h2>
                            <p className="text-gray-500 mt-2">
                                Join now and take control of your daily tasks.
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            
                            {/* Name */}
                            <div>
                                <label className="text-sm font-semibold text-gray-700 block mb-1.5">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={user.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all text-gray-800"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="text-sm font-semibold text-gray-700 block mb-1.5">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={user.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all text-gray-800"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label className="text-sm font-semibold text-gray-700 block mb-1.5">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={user.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all text-gray-800"
                                />
                            </div>

                            {/* Profile Picture */}
                            <div>
                                <label className="text-sm font-semibold text-gray-700 block mb-1.5">
                                    Profile Picture (Optional)
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                                />
                            </div>

                            {/* Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-purple-600 to-pink-500 text-white py-3.5 rounded-xl font-bold text-base hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-60 shadow-lg shadow-purple-500/25 cursor-pointer mt-6"
                            >
                                {loading ? "Creating Account..." : "Register"}
                            </button>

                        </form>

                        {/* Footer */}
                        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                            <p className="text-gray-500 text-sm">
                                Already have an account?{" "}
                                <span
                                    className="text-purple-600 font-bold cursor-pointer hover:underline hover:text-purple-700 transition"
                                    onClick={() => navigate("/login")}
                                >
                                    Log In
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Image Section - Hidden on Mobile */}
                <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900 border-l border-gray-100 items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center opacity-80 z-0">
                        <Player
                            autoplay
                            loop
                            src="https://assets5.lottiefiles.com/packages/lf20_7wwm6az7.json"
                            style={{ height: '90%', width: '90%' }}
                        />
                    </div>
                    {/* Dark gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-linear-to-t from-gray-950/90 via-gray-900/30 to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute bottom-12 left-12 right-12 text-white z-20 pointer-events-none">
                        <h3 className="text-3xl font-bold mb-3 tracking-wide">Start Your Journey</h3>
                        <p className="text-gray-200 text-lg leading-relaxed">Create your account and organize your life with our beautiful and intuitive tasks platform.</p>
                    </div>
                </div>

            </div>

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

export default Register;