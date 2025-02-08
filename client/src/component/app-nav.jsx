import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Cookies from "js-cookie";

const CustomNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Function to check if the user is logged in based on the token
    const checkLoginStatus = () => {
        const token = Cookies.get("token");
        setIsLoggedIn(!!token); // If token exists, the user is logged in
    };

    // Check the token initially and set the login state
    useEffect(() => {
        checkLoginStatus(); // Check login status on page load

        // Add event listener to listen for any cookie changes
        window.addEventListener("storage", checkLoginStatus);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener("storage", checkLoginStatus);
        };
    }, []);

    const handleLogout = () => {
        // Remove token on logout and update the state
        Cookies.remove("token");
        setIsLoggedIn(false); // Update state immediately
        // Optionally, redirect user after logout
        window.location.href = "/"; // Redirect to home page after logout
    };

    return (
        <nav className="bg-gray-100 text-gray-800 shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold">
                    Noman
                </Link>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-6">
                    <li>
                        <Link className="hover:text-blue-500 transition" to="/">Home</Link>
                    </li>
                    <li>
                        <Link className="hover:text-blue-500 transition" to="/about">About</Link>
                    </li>
                    <li>
                        <Link className="hover:text-blue-500 transition" to="/blog">Blog</Link>
                    </li>
                    <li>
                        <Link className="hover:text-blue-500 transition" to="/service">Service</Link>
                    </li>
                    <li>
                        <Link className="hover:text-blue-500 transition" to="/contact">Contact</Link>
                    </li>
                    {/* Login/Logout Conditional */}
                    {isLoggedIn ? (
                        <li>
                            <button
                                className="hover:text-blue-500 transition"
                                onClick={handleLogout}>
                                Logout
                            </button>
                        </li>
                    ) : (
                        <li>
                            <Link className="hover:text-blue-500 transition" to="/login">Login</Link>
                        </li>
                    )}
                </ul>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-gray-800"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-gray-100 text-gray-800 px-4 py-2">
                    <ul className="flex flex-col space-y-4">
                        <li>
                            <Link className="block py-2 hover:text-blue-500" to="/" onClick={() => setIsOpen(false)}>Home</Link>
                        </li>
                        <li>
                            <Link className="block py-2 hover:text-blue-500" to="/about" onClick={() => setIsOpen(false)}>About</Link>
                        </li>
                        <li>
                            <Link className="block py-2 hover:text-blue-500" to="/blog" onClick={() => setIsOpen(false)}>Blog</Link>
                        </li>
                        <li>
                            <Link className="block py-2 hover:text-blue-500" to="/service" onClick={() => setIsOpen(false)}>Service</Link>
                        </li>
                        <li>
                            <Link className="block py-2 hover:text-blue-500" to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
                        </li>
                        {/* Mobile Login/Logout Conditional */}
                        {isLoggedIn ? (
                            <li>
                                <button className="block py-2 hover:text-blue-500" onClick={() => { handleLogout(); setIsOpen(false); }}>
                                    Logout
                                </button>
                            </li>
                        ) : (
                            <li>
                                <Link className="block py-2 hover:text-blue-500" to="/login" onClick={() => setIsOpen(false)}>Login</Link>
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default CustomNavbar;
