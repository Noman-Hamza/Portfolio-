import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Page/home-page.jsx";
import AboutPage from "./Page/about-page.jsx";
import BlogPage from "./Page/blog-page.jsx";
import ServicePage from "./Page/service-page.jsx";
import ContactPage from "./Page/contact-page.jsx";
import LoginPage from "./Page/login-page.jsx";


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/service" element={<ServicePage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
