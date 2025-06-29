import React, { useState, useEffect } from 'react';
import { TeamReadSection } from "../ApiRequest/APIRequest.js";
import Loader from "./loader.jsx";

const Team = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeamMembers = async () => {
            try {
                const response = await TeamReadSection();
                if (response.data) {
                    setList(response.data);  // Set the team data to state
                }
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);  // Stop loading once data is fetched
            }
        };

        fetchTeamMembers();
    }, []);

    // Display loading spinner while fetching data
    if (loading) {
        return <Loader />;
    }

    return (
        <div className="container mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Team</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {list.map((member) => (
                    <div key={member._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                        <img
                            src={member.img} // Using member.img for the image URL
                            alt={member.name}
                            className="w-32 h-32 object-cover rounded-full mx-auto"
                        />
                        <div className="mt-4 text-center">
                            <h2 className="text-xl font-semibold text-gray-800">{member.name}</h2>
                            <p className="text-gray-600 mt-2">{member.designation}</p> {/* Using member.designation */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Team;
