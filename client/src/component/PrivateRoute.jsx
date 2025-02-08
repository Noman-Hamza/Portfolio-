import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Loader from "./loader.jsx"; // Assuming you have a Loader component

const PrivateRoute = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [loading, setLoading] = useState(true);

    // Simulate an async check for user authentication
    const verify = async () => {
        // Example: Check localStorage or cookie for token
        const token = localStorage.getItem("token");
        return token ? true : false; // Return true if token exists
    };

    useEffect(() => {
        (async () => {
            try {
                let result = await verify();
                setIsLogin(result); // Set login status based on result
            } catch (error) {
                setIsLogin(false); // If error, assume not logged in
            } finally {
                setLoading(false); // Set loading to false once the check is complete
            }
        })();
    }, []);

    if (loading) {
        return <Loader />; // Show loading indicator while checking authentication
    }

    return isLogin ? children : <Navigate to="/login" />; // Redirect to login if not authenticated
};

export default PrivateRoute;
