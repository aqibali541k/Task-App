import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";

const AuthContext = createContext();
let initialState = { user: "", isAuth: false }
export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(initialState);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 🖼️ CHANGE PROFILE PIC
    const handleChangeProfilePic = async (file) => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("profilePic", file);

            const res = await axios.put("http://localhost:8000/auth/update-profile-pic", formData);

            const updatedUser = { ...user, profilePic: res.data.profilePic };
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));

            message.success("Profile picture updated!");
            setLoading(false);
            return res.data;
        } catch (error) {
            message.error(error?.response?.data?.message || "Failed to update profile picture");
            setLoading(false);
            return null;
        }
    };

    // 🔐 REGISTER
    const handleRegister = async (userData) => {
        try {
            setLoading(true);

            const res = await axios.post(
                "http://localhost:8000/auth/register",
                userData
            );

            const token = res.data?.token;
            const user = res.data?.user;

            if (token && user) {
                setToken(token);
                setUser(user);

                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
            }

            setLoading(false);
            setError(null);

            return res.data;

        } catch (error) {
            setError(error?.response?.data?.message || error.message || "Error");
            message.error(error?.response?.data?.message || error.message || "Registration Failed");
            setLoading(false);
        }
    };

    // 🔑 LOGIN
    const handleLogin = async (userData) => {
        try {
            setLoading(true);

            const res = await axios.post(
                "http://localhost:8000/auth/login",
                userData
            );

            const token = res.data?.token;
            const user = res.data?.user;

            setToken(token);
            setUser(user);

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            setLoading(false);
            setError(null);

        } catch (error) {
            setError(error?.response?.data?.message || error.message || "Login failed");
            message.error(error?.response?.data?.message || error.message || "Login failed");
            setLoading(false);
        }
    };

    // 🚪 LOGOUT
    const handleLogout = () => {
        setUser(initialState);
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    // 📧 FORGOT PASSWORD
    const handleForgotPassword = async (email) => {
        try {
            setLoading(true);
            const res = await axios.post("http://localhost:8000/auth/forgot-password", { email });
            setLoading(false);
            return res.data;
        } catch (error) {
            message.error(error?.response?.data?.message || "Failed to send reset email");
            setLoading(false);
            return null;
        }
    };

    // 🔄 RESET PASSWORD
    const handleResetPassword = async (token, password) => {
        try {
            setLoading(true);
            const res = await axios.put(`http://localhost:8000/auth/reset-password/${token}`, { password });
            setLoading(false);
            return res.data;
        } catch (error) {
            message.error(error?.response?.data?.message || "Failed to reset password");
            setLoading(false);
            return null;
        }
    };

    // 🔄 AUTO LOGIN ON REFRESH
    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");

        if (savedToken) {
            setToken(savedToken);
        }
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }

        // Setup global Axios defaults for Authorization header
        axios.interceptors.request.use(
            (config) => {
                const currentToken = localStorage.getItem("token");
                if (currentToken) {
                    config.headers.Authorization = currentToken;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            token,
            loading,
            error,
            isAuth: !!token,
            handleRegister,
            handleLogin,
            handleLogout,
            handleForgotPassword,
            handleResetPassword,
            handleChangeProfilePic
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthContext;