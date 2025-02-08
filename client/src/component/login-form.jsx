import React, { useState } from "react";
import Loader from "./Loader.jsx";
import { useNavigate } from "react-router-dom";
import { login } from "../ApiRequest/APIRequest.js";
import { Toaster, toast } from "react-hot-toast";

const LoginForm = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [data, setData] = useState({ email: "", password: "" });

    // Handle input change
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    // Form validation for email and password
    const validateForm = () => {
        if (!data.email || !data.password) {
            toast.error("Both email and password are required.");
            return false;
        }
        return true;
    };

    // Submit form data
    const submitData = async (e) => {
        e.preventDefault();

        // Validate the form before submitting
        if (!validateForm()) return;

        setLoading(true);

        // Dismiss any previous toasts to avoid duplication
        toast.dismiss();

        console.log("Submitted Data:", data);

        try {
            // Call the login API
            const result = await login(data);

            // Log the result from the login API for debugging
            console.log("API Response:", result);

            setLoading(false);

            // Check if the login was successful
            if (result?.status?.toLowerCase() === "success" && result?.Message?.trim() === "User Login successfully") {
                toast.success(result?.Message);
                setTimeout(() => {
                    navigate("/dashboard");
                }, 1500); // Shorter time for better user experience
            } else {
                // Handle login failure and show an error message
                toast.error(result?.Message || "Invalid email or password.");
            }
        } catch (error) {
            // Handle any errors from the login API
            setLoading(false);
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
            {loading && <Loader />}
            <form onSubmit={submitData} className="bg-gray-900 p-8 shadow-lg rounded-lg w-96 text-white">
                <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

                {/* Email Input */}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={data.email}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                    required
                />

                {/* Password Input */}
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={data.password}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                    required
                />

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition duration-300 disabled:bg-gray-500"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
            <Toaster /> {/* Toast messages */}
        </div>
    );
};

export default LoginForm;
