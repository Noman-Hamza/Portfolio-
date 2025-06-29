import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "https://portfolio-pi-ten-67.vercel.app/api";

function ServiceCRUD() {
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const [formData, setFormData] = useState({ service: "", des: "", img: "" });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/ServiceRead`);
            setServices(response.data.data);
        } catch (error) {
            console.error("Error fetching services:", error);
        }
    };

    const handleCreate = async () => {
        try {
            const response = await axios.post(`${API_BASE_URL}/ServiceCreate`, formData);
            setServices(prevServices => [...prevServices, response.data.data]);
            setFormData({ service: "", des: "", img: "" });
        } catch (error) {
            console.error("Error creating service:", error);
        }
    };

    const handleUpdate = async () => {
        try {
            await axios.post(`${API_BASE_URL}/ServiceUpdate/${editingId}`, formData);
            setServices(prevServices =>
                prevServices.map(service => (service._id === editingId ? { ...service, ...formData } : service))
            );
            setFormData({ service: "", des: "", img: "" });
            setEditingId(null);
        } catch (error) {
            console.error("Error updating service:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.post(`${API_BASE_URL}/ServiceRemove`, { _id: id });
            setServices(prevServices => prevServices.filter(service => service._id !== id));
        } catch (error) {
            console.error("Error deleting service:", error);
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
        const { name, value } = e.target;
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
    };

    const handleEdit = (service) => {
        setFormData({ service: service.service, des: service.des, img: service.img });
        setEditingId(service._id);
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-1/5 bg-gray-800 text-white p-5">
                <h2 className="text-xl font-bold">Dashboard</h2>
                <ul className="mt-5 space-y-2">
                    <li className="p-2 bg-gray-700 rounded">Service Management</li>
                    <li
                        className="p-2 bg-gray-700 rounded cursor-pointer"
                        onClick={() => navigate("/dashboard")}
                    >
                        Team Management
                    </li>
                    <li
                        className="p-2 bg-gray-700 rounded cursor-pointer"
                        onClick={() => navigate("/dashboard/blog")}
                    >
                        Blog Management
                    </li>

                    <li
                        className="p-2 bg-gray-700 rounded cursor-pointer"
                        onClick={handleLogout}
                    >
                        Logout
                    </li>


                </ul>
            </div>

            {/* Main Content */}
            <div className="w-4/5 p-5">
                <h1 className="text-2xl font-bold">Service CRUD Operations</h1>

                {/* Form */}
                <form
                    className="bg-white p-5 shadow-md rounded mt-5 flex space-x-2"
                    onSubmit={(e) => {
                        e.preventDefault();
                        editingId ? handleUpdate() : handleCreate();
                    }}
                >
                    <input
                        className="border p-2 rounded w-1/3"
                        type="text"
                        name="service"
                        placeholder="ServiceCRUD Name"
                        value={formData.service}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        className="border p-2 rounded w-1/3"
                        type="text"
                        name="des"
                        placeholder="Description"
                        value={formData.des}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        className="border p-2 rounded w-1/3"
                        type="text"
                        name="img"
                        placeholder="Image URL"
                        value={formData.img}
                        onChange={handleInputChange}
                        required
                    />
                    <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
                        {editingId ? "Update" : "Create"}
                    </button>
                </form>

                {/* Services Display */}
                <div className="mt-5 grid grid-cols-3 gap-5">
                    {services.map((service) => (
                        <div key={service._id} className="bg-white p-5 shadow-md rounded">
                            <h3 className="text-lg font-bold">{service.service}</h3>
                            <p>{service.des}</p>
                            <img src={service.img} alt={service.service} className="w-24 h-24 mt-2 rounded-full" />
                            <div className="mt-2 flex space-x-2">
                                <button onClick={() => handleEdit(service)} className="bg-yellow-500 text-white px-4 py-2 rounded">
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(service._id)} className="bg-red-500 text-white px-4 py-2 rounded">
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

export default ServiceCRUD;
