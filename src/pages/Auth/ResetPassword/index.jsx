import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../../../config/AuthContext';
import { message } from 'antd';

const ResetPassword = () => {
    const navigate = useNavigate();
    const { token } = useParams();
    const { handleResetPassword, loading } = useAuthContext();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!password || !confirmPassword) return message.error("Please fill all fields");
        if (password !== confirmPassword) return message.error("Passwords do not match");

        const res = await handleResetPassword(token, password);
        if (res) {
            message.success("Password reset successfully! You can now login. 🎉");
            navigate("/login");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-600 via-blue-600 to-pink-500 px-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-10">
                <h2 className="text-3xl font-bold text-center text-gray-800">Reset Password</h2>
                <p className="text-center text-gray-500 mt-2 mb-6">Enter your new secure password</p>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="text-sm text-gray-600 font-medium">New Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter new password"
                            className="w-full mt-1 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-purple-500 transition"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-600 font-medium">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                            className="w-full mt-1 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-purple-500 transition"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-linear-to-r from-purple-600 via-blue-600 to-pink-500 text-white py-3 rounded-xl font-semibold hover:scale-[1.02] transition disabled:opacity-60"
                    >
                        {loading ? "Saving..." : "Update Password"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
