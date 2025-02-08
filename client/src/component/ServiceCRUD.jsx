import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ServiceCrud = () => {
    const [services, setServices] = useState([]);
    const [newService, setNewService] = useState({ title: '', description: '', img: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [updateService, setUpdateService] = useState(null);

    // Fetch all services
    const fetchServices = async () => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:5050/api/ServiceRead');
            setServices(res.data);
        } catch (err) {
            setError('Error fetching services');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewService((prev) => ({ ...prev, [name]: value }));
    };

    // Create a new service
    const handleCreate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('http://localhost:5050/api/CreateService', newService);
            fetchServices();
            setNewService({ title: '', description: '', img: '' });
        } catch (err) {
            setError('Error creating service');
        } finally {
            setLoading(false);
        }
    };

    // Delete a service
    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await axios.post(`http://localhost:5050/api/ServiceRemove`, { id });
            fetchServices();
        } catch (err) {
            setError('Error deleting service');
        } finally {
            setLoading(false);
        }
    };

    // Update service
    const handleUpdate = (service) => {
        setUpdateService(service);
        setNewService(service);
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`http://localhost:5050/api/ServiceUpdate/${updateService._id}`, newService);
            fetchServices();
            setNewService({ title: '', description: '', img: '' });
            setUpdateService(null);
        } catch (err) {
            setError('Error updating service');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <h1 className="text-3xl font-semibold text-center">Service CRUD Operations</h1>

            {error && <div className="text-red-500 text-center mb-4">{error}</div>}

            <form onSubmit={updateService ? handleUpdateSubmit : handleCreate} className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">{updateService ? 'Update Service' : 'Create Service'}</h2>
                <div>
                    <label className="block text-lg font-medium">Title</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter service title"
                        value={newService.title}
                        onChange={handleChange}
                        required
                        className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-lg font-medium">Description</label>
                    <textarea
                        name="description"
                        placeholder="Enter service description"
                        value={newService.description}
                        onChange={handleChange}
                        required
                        className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-lg font-medium">Image URL</label>
                    <input
                        type="url"
                        name="img"
                        placeholder="Enter image URL"
                        value={newService.img}
                        onChange={handleChange}
                        required
                        className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full p-3 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                >
                    {loading ? 'Processing...' : updateService ? 'Update Service' : 'Create Service'}
                </button>
            </form>

            <div className="mt-6">
                <h2 className="text-xl font-semibold">Service List</h2>
                {loading && <div className="text-center">Loading...</div>}
                {!loading && services.length === 0 && <div>No services found</div>}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                    {services.map((service) => (
                        <div key={service._id} className="bg-white p-6 rounded-lg shadow-lg">
                            <img src={service.img} alt={service.title} className="w-full h-32 object-cover rounded-md mb-4" />
                            <h3 className="text-xl font-semibold">{service.title}</h3>
                            <p className="text-gray-700">{service.description}</p>

                            <div className="mt-4 flex justify-between">
                                <button
                                    onClick={() => handleUpdate(service)}
                                    className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(service._id)}
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

export default ServiceCrud;
