import React, { useState, useEffect } from 'react';
import { ReadHeroSection } from "../ApiRequest/APIRequest.js";
import Loader from "./loader.jsx";
import { Link } from 'react-router-dom';


const Hero = () => {
    const [list, setList] = useState(null);

    useEffect(() => {
        // Prevent multiple API calls by making sure the effect only runs once
        const fetchData = async () => {
            try {
                const response = await ReadHeroSection();
                if (response && response.data && response.data.length > 0) {
                    setList(response.data[0]);
                }
            } catch (e) {
                console.error("Error fetching data:", e);
            }
        };

        fetchData(); // Call API once
    }, []); // Empty dependency array ensures it only runs on mount

    // Display loader while fetching data
    if (!list) {
        return <Loader />;
    }

    return (
        <div className="hero bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 min-h-screen py-24 lg:py-32 px-6">
            <div className="container mx-auto flex flex-col lg:flex-row items-center gap-8">
                {/* Hero Image */}
                <div className="lg:w-1/2">
                    <img
                        src={list.img}
                        alt="Hero Image"
                        className="w-full h-auto rounded-lg shadow-lg transform transition-all hover:scale-105"
                    />
                </div>

                {/* Hero Text Content */}
                <div className="lg:w-1/2 text-center lg:text-left space-y-6 text-white">
                    <h1 className="text-4xl md:text-5xl font-bold">{list.title}</h1>
                    <p className="text-lg md:text-xl">{list.shortdes}</p>
                    <Link
                        to="/about"
                        className="inline-block bg-white text-blue-600 px-8 py-3 rounded-md shadow-md hover:bg-blue-700 hover:text-white transition ease-in-out duration-300"
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Hero;
