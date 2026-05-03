import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../config/AuthContext';
import { message } from 'antd';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const { handleForgotPassword, loading } = useAuthContext();
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return message.error("Please enter your email");

        const res = await handleForgotPassword(email);
        if (res) {
            message.success("Password reset instructions sent to your email! 📩");
            navigate("/login");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-600 via-blue-600 to-pink-500 px-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-10">
                <h2 className="text-3xl font-bold text-center text-gray-800">Forgot Password</h2>
                <p className="text-center text-gray-500 mt-2 mb-6">Enter your email to receive a reset link</p>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="text-sm text-gray-600 font-medium">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full mt-1 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-purple-500 transition"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-linear-to-r from-purple-600 via-blue-600 to-pink-500 text-white py-3 rounded-xl font-semibold hover:scale-[1.02] transition disabled:opacity-60"
                    >
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>
                </form>
                <p className="text-center text-sm text-gray-500 mt-6 cursor-pointer hover:text-purple-600" onClick={() => navigate("/login")}>
                    Back to Login
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;
