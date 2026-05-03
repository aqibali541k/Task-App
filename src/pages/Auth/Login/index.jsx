import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../config/AuthContext';
import { message } from 'antd';
import { Player } from '@lottiefiles/react-lottie-player';

const initialState = { email: "", password: "" };

const Login = () => {

    const navigate = useNavigate();
    const { handleLogin, loading } = useAuthContext();

    const [user, setUser] = useState(initialState);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = user;

        if (!email || !password) {
            return message.error("Please fill all fields");
        }

        const res = await handleLogin({ email, password });

        if (res !== undefined) {
            message.success("Login successful 🚀");
            setUser(initialState);
            navigate("/");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-6 lg:p-8">
            <div className="flex w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[600px] border border-gray-100">
                {/* Image Section - Hidden on Mobile */}
                <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900 border-r border-gray-100 items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center opacity-80 z-0">
                        <Player
                            autoplay
                            loop
                            src="https://assets3.lottiefiles.com/packages/lf20_w51pcehl.json"
                            style={{ height: '90%', width: '90%' }}
                        />
                    </div>
                    {/* Dark gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-linear-to-t from-gray-950/90 via-gray-900/30 to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute bottom-12 left-12 right-12 text-white z-20 pointer-events-none">
                        <h3 className="text-3xl font-bold mb-3 tracking-wide">Welcome Back</h3>
                        <p className="text-gray-200 text-lg leading-relaxed">Pick up where you left off and accomplish your tasks with ease and flow.</p>
                    </div>
                </div>

                {/* Form Section */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-16 relative">
                    <div className="w-full max-w-md">
                        {/* Heading */}
                        <div className="mb-8">
                            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                                Log in to your account
                            </h2>
                            <p className="text-gray-500 mt-2">
                                Welcome back! Please enter your details.
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            
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

                            {/* Forgot Password link */}
                            <div className="flex justify-end mt-1">
                                <span
                                    className="text-sm text-purple-600 font-medium cursor-pointer hover:text-purple-700 hover:underline transition-colors block"
                                    onClick={() => navigate("/forgot-password")}
                                >
                                    Forgot Password?
                                </span>
                            </div>

                            {/* Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-purple-600 to-pink-500 text-white py-3.5 rounded-xl font-bold text-base hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-60 shadow-lg shadow-purple-500/25 cursor-pointer mt-6"
                            >
                                {loading ? "Logging in..." : "Log In"}
                            </button>

                        </form>

                        {/* Footer */}
                        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                            <p className="text-gray-500 text-sm">
                                Don't have an account?{" "}
                                <span
                                    className="text-purple-600 font-bold cursor-pointer hover:underline hover:text-purple-700 transition"
                                    onClick={() => navigate("/register")}
                                >
                                    Sign up
                                </span>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;