import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeamCrud = () => {
    const [teamMembers, setTeamMembers] = useState([]);
    const [newMember, setNewMember] = useState({ name: '', designation: '', img: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [updateMember, setUpdateMember] = useState(null); // To store the member being updated

    // Fetch all team members
    const fetchTeamMembers = async () => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:5050/api/TeamRead');
            setTeamMembers(res.data);
        } catch (err) {
            setError('Error fetching team members');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeamMembers();
    }, []);

    // Handle form inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewMember((prev) => ({ ...prev, [name]: value }));
    };

    // Create a new team member
    const handleCreate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('http://localhost:5050/api/TeamCreate', newMember);
            fetchTeamMembers(); // Refresh team list after creating a new member
            setNewMember({ name: '', designation: '', img: '' });
        } catch (err) {
            setError('Error creating team member');
        } finally {
            setLoading(false);
        }
    };

    // Delete a team member
    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await axios.delete(`http://localhost:5050/api/TeamRemove/${id}`);
            fetchTeamMembers(); // Refresh the team list after deleting
        } catch (err) {
            setError('Error deleting team member');
        } finally {
            setLoading(false);
        }
    };

    // Update team member form handling
    const handleUpdate = (member) => {
        setUpdateMember(member);
        setNewMember(member); // Set form to existing member data
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`http://localhost:5050/api/TeamUpdate/${updateMember._id}`, newMember);
            fetchTeamMembers(); // Refresh the team list after update
            setNewMember({ name: '', designation: '', img: '' });
            setUpdateMember(null); // Reset the update state
        } catch (err) {
            setError('Error updating team member');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <h1 className="text-3xl font-semibold text-center">Team CRUD Operations</h1>

            {/* Error message */}
            {error && <div className="text-red-500 text-center mb-4">{error}</div>}

            {/* Create and Update Form */}
            <form onSubmit={updateMember ? handleUpdateSubmit : handleCreate} className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">{updateMember ? 'Update Team Member' : 'Create Team Member'}</h2>
                <div>
                    <label htmlFor="name" className="block text-lg font-medium">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter team member's name"
                        value={newMember.name}
                        onChange={handleChange}
                        required
                        className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="designation" className="block text-lg font-medium">Designation</label>
                    <input
                        type="text"
                        name="designation"
                        id="designation"
                        placeholder="Enter team member's designation"
                        value={newMember.designation}
                        onChange={handleChange}
                        required
                        className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="img" className="block text-lg font-medium">Image URL</label>
                    <input
                        type="url"
                        name="img"
                        id="img"
                        placeholder="Enter image URL"
                        value={newMember.img}
                        onChange={handleChange}
                        required
                        className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full p-3 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                >
                    {loading ? 'Processing...' : updateMember ? 'Update Team Member' : 'Create Team Member'}
                </button>
            </form>

            {/* Display Team Members */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold">Team List</h2>
                {loading && <div className="text-center">Loading...</div>}
                {!loading && teamMembers.length === 0 && <div>No team members found</div>}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                    {teamMembers.map((member) => (
                        <div key={member._id} className="bg-white p-6 rounded-lg shadow-lg">
                            <img src={member.img} alt={member.name} className="w-full h-32 object-cover rounded-md mb-4" />
                            <h3 className="text-xl font-semibold">{member.name}</h3>
                            <p className="text-gray-700">{member.designation}</p>

                            {/* Edit and Delete buttons */}
                            <div className="mt-4 flex justify-between">
                                <button
                                    onClick={() => handleUpdate(member)}
                                    className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(member._id)}
                                    className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeamCrud;
