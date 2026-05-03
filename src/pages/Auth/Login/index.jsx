import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../config/AuthContext';
import { message } from 'antd';

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
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-600 via-blue-600 to-pink-500 px-4">

            {/* Card */}
            <div className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 sm:p-10 border border-white/30">

                {/* Heading */}
                <h2 className="text-3xl font-bold text-center text-gray-800">
                    Welcome Back 👋
                </h2>

                <p className="text-center text-gray-500 mt-2 mb-6">
                    Login to continue your productivity journey
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Email */}
                    <div>
                        <label className="text-sm text-gray-600 font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full mt-1 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-purple-500 transition"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-sm text-gray-600 font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="w-full mt-1 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-purple-500 transition"
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-purple-600 via-blue-600 to-pink-500 text-white py-3 rounded-xl font-semibold hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-60 shadow-lg shadow-purple-500/30 cursor-pointer"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

                {/* Footer */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    Don’t have an account?{" "}
                    <span
                        className="text-purple-600 font-medium cursor-pointer hover:underline"
                        onClick={() => navigate("/register")}
                    >
                        Sign up
                    </span>
                </p>

                <p className="text-center text-sm text-gray-500 mt-2">
                    Forgot your password?{" "}
                    <span
                        className="text-purple-600 font-medium cursor-pointer hover:underline"
                        onClick={() => navigate("/forgot-password")}
                    >
                        Reset Password
                    </span>
                </p>

            </div>

        </div>
    );
};

export default Login;