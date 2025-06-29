import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "https://portfolio-pi-ten-67.vercel.app/api";

function Dashboard() {
    const navigate = useNavigate();
    const [teams, setTeams] = useState([]);
    const [formData, setFormData] = useState({ name: "", designation: "", img: "" });
    const [editingId, setEditingId] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchTeams();
    }, []);

    const fetchTeams = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/TeamRead`);
            if (response.data.status === "success") {
                setTeams(response.data.data);
            } else {
                setMessage(response.data.Message);
            }
        } catch (error) {
            setMessage("Error fetching teams");
        }
    };

    const handleCreate = async () => {
        try {
            const response = await axios.post(`${API_BASE_URL}/TeamCreate`, formData);
            setMessage(response.data.Message);
            if (response.data.status === "success") {
                fetchTeams();
                setFormData({ name: "", designation: "", img: "" });
            }
        } catch (error) {
            setMessage("Error creating team");
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.post(`${API_BASE_URL}/TeamUpdate/${editingId}`, formData);
            setMessage(response.data.Message);
            if (response.data.status === "success") {
                fetchTeams();
                setFormData({ name: "", designation: "", img: "" });
                setEditingId(null);
            }
        } catch (error) {
            setMessage("Error updating team");
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/TeamRemove`, { _id: id });
            setMessage(response.data.message);
            if (response.data.status === "success") {
                fetchTeams();
            }
        } catch (error) {
            setMessage("Error deleting team");
        }
    };
    const handleLogout = async () => {
        try {
            localStorage.removeItem('token');
            await axios.post(`${API_BASE_URL}/logout`);
            navigate("/");
            window.location.reload();
        } catch (error) {
            setMessage("Error logging out");
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEdit = (team) => {
        setFormData({ name: team.name, designation: team.designation, img: team.img });
        setEditingId(team._id);
    };

    return (
        <div className="flex h-screen">
            <div className="w-1/5 bg-gray-800 text-white p-5">
                <h2 className="text-xl font-bold">Dashboard</h2>
                <ul className="mt-5 space-y-2">
                    <li className="p-2 bg-gray-700 rounded">Team Management</li>
                    <li
                        className="p-2 bg-gray-700 rounded cursor-pointer"
                        onClick={() => navigate("/dashboard/blog")}
                    >
                        Blog Management
                    </li>
                    <li
                        className="p-2 bg-gray-700 rounded cursor-pointer"
                        onClick={() => navigate("/dashboard/service")}
                    >
                        Service Management
                    </li>

                    <li
                        className="p-2 bg-gray-700 rounded cursor-pointer"
                        onClick={handleLogout}
                    >
                        Logout
                    </li>


                </ul>
            </div>

            <div className="w-4/5 p-5">
                <h1 className="text-2xl font-bold">Team CRUD Operations</h1>
                {message && <p className="text-red-500">{message}</p>}

                <form
                    className="bg-white p-5 shadow-md rounded mt-5 flex space-x-2"
                    onSubmit={(e) => {
                        e.preventDefault();
                        editingId ? handleUpdate() : handleCreate();
                    }}
                >
                    <input className="border p-2 rounded w-1/3" type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} required />
                    <input className="border p-2 rounded w-1/3" type="text" name="designation" placeholder="Designation" value={formData.designation} onChange={handleInputChange} required />
                    <input className="border p-2 rounded w-1/3" type="text" name="img" placeholder="Image URL" value={formData.img} onChange={handleInputChange} required />
                    <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
                        {editingId ? "Update" : "Create"}
                    </button>
                </form>

                <div className="mt-5 grid grid-cols-3 gap-5">
                    {teams.map((team) => (
                        <div key={team._id} className="bg-white p-5 shadow-md rounded">
                            <h3 className="text-lg font-bold">{team.name}</h3>
                            <p>{team.designation}</p>
                            <img src={team.img} alt={team.name} className="w-24 h-24 mt-2 rounded-full" />
                            <div className="mt-2 flex space-x-2">
                                <button onClick={() => handleEdit(team)} className="bg-yellow-500 text-white px-4 py-2 rounded">
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(team._id)} className="bg-red-500 text-white px-4 py-2 rounded">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;