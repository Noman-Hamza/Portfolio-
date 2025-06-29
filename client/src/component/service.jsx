import React, { useState, useEffect } from 'react';
import { ServiceReadSection } from "../ApiRequest/APIRequest.js";
import Loader from "./loader.jsx";  // Assuming you have a Loader component

const Service = () => {
    // State for storing services and loading status
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch services on component mount
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await ServiceReadSection();
                if (response.data) {
                    setList(response.data);  // Set the fetched services
                }
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);  // Stop loading after fetching
            }
        };

        fetchServices();
    }, []);  // Empty dependency array ensures this runs once

    // Show loader while fetching data
    if (loading) {
        return <Loader />;  // Only show Loader until data is fetched
    }

    return (
        <div className="container mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Services</h1>

            {/* Grid layout for services */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {list.map((service) => (
                    <div key={service._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                        <img
                            src={service.img}
                            alt={service.service}
                            className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <div className="mt-4 text-center">
                            <h2 className="text-xl font-semibold text-gray-800">{service.service}</h2>
                            <p className="text-gray-600 mt-2">{service.des}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Service;
