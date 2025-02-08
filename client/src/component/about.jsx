import { Link } from 'react-router-dom';
import React from 'react';

const About = () => {
    return (
        <section className="about-section py-16 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-8">

                    <div className="lg:w-1/2">
                        <img
                            src="https://img.freepik.com/free-photo/colleagues-working-project-discussing-details_114579-2817.jpg?t=st=1739004782~exp=1739008382~hmac=b8af1985f996d6a33f316629af01985f545842d08e0bbe9ef689cd9ee63ce6d9&w=1380"
                            alt="About Us"
                            className="w-full h-auto rounded-lg shadow-xl"
                        />
                    </div>

                    {/* Text Section */}
                    <div className="lg:w-1/2 text-center lg:text-left">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">About Us</h2>
                        <p className="text-lg text-gray-600 mb-4">
                            We are a dedicated team of professionals who work hard to deliver top-quality services. Our goal is to
                            help you achieve success in your business through innovative solutions and expert advice.
                        </p>
                        <p className="text-lg text-gray-600 mb-6">
                            Whether you are a small startup or an established enterprise, we have the experience and knowledge to
                            assist you. We believe in delivering results that drive growth and value.
                        </p>
                        <Link
                            to="/contact"
                            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
