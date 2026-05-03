import React, { useState } from 'react';
import { useAuthContext } from '../../../config/AuthContext';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import ImageCropModal from '../../../components/ImageCropModal';

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
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-600 via-blue-600 to-pink-500 px-4">

            {/* Card */}
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-10 my-8">

                {/* Heading */}
                <h2 className="text-3xl font-bold text-center text-gray-800">
                    Create Account ✨
                </h2>

                <p className="text-center text-gray-500 mt-2 mb-6">
                    Join and start managing your tasks
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Name */}
                    <div>
                        <label className="text-sm text-gray-600 font-medium">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            className="w-full mt-1 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-purple-500 transition"
                        />
                    </div>

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

                    {/* Profile Picture */}
                    <div>
                        <label className="text-sm text-gray-600 font-medium">
                            Profile Picture (Optional)
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 transition text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-purple-600 via-blue-600 to-pink-500 text-white py-3 rounded-xl font-semibold hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-60 shadow-lg shadow-purple-500/30 cursor-pointer mt-2"
                    >
                        {loading ? "Creating Account..." : "Register"}
                    </button>

                </form>

                {/* Footer */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    Already have an account? <span className="text-purple-600 font-medium cursor-pointer hover:underline" onClick={() => navigate("/login")}>Login</span>
                </p>

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