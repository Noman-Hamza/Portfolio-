import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-100 text-gray-800 py-4 mt-8">
            <div className="container mx-auto text-center">
                <p>Copyright © {new Date().getFullYear()} - All rights reserved by NOMAN</p>
            </div>
        </footer>
    );
};

export default Footer;
