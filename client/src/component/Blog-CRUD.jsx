import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:5050/api";

function BlogCRUD() {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [formData, setFormData] = useState({ title: "", des: "", img: "" });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/ReadAllBlog`);
            setBlogs(response.data.data);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };

    const handleCreate = async () => {
        console.log("handleCreate called", formData);
        try {
            const response = await axios.post(`${API_BASE_URL}/CreateBlog`, formData);
            if (response.data.status === "success") {
                setBlogs((prevBlogs) => [...prevBlogs, response.data.data]);
                setFormData({ title: "", des: "", img: "" });
            } else {
                console.error("Error creating blog:", response.data.message);
            }
        } catch (error) {
            console.error("Error creating blog:", error);
        }
    };

    const handleUpdate = async () => {
        try {
            await axios.post(`${API_BASE_URL}/UpdateBlog/${editingId}`, formData);
            setBlogs((prevBlogs) =>
                prevBlogs.map((blog) =>
                    blog._id === editingId ? { ...blog, ...formData } : blog
                )
            );
            setFormData({ title: "", des: "", img: "" });
            setEditingId(null);
        } catch (error) {
            console.error("Error updating blog:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.post(`${API_BASE_URL}/DeleteBlog`, { _id: id });
            setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
        } catch (error) {
            console.error("Error deleting blog:", error);
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post(`${API_BASE_URL}/logout`);
            navigate("/");
            window.location.reload();
        } catch (error) {
            setMessage("Error logging out");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleEdit = (blog) => {
        setFormData({ title: blog.title, des: blog.des, img: blog.img });
        setEditingId(blog._id);
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-1/5 bg-gray-800 text-white p-5">
                <h2 className="text-xl font-bold">Dashboard</h2>
                <ul className="mt-5 space-y-2">
                    <li className="p-2 bg-gray-700 rounded">Blog Management</li>
                    <li
                        className="p-2 bg-gray-700 rounded cursor-pointer"
                        onClick={() => navigate("/dashboard")}
                    >
                        Team Management
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

            {/* Main Content */}
            <div className="w-4/5 p-5">
                <h1 className="text-2xl font-bold">Blog CRUD Operations</h1>

                <form
                    className="bg-white p-5 shadow-md rounded mt-5 flex space-x-2"
                    onSubmit={(e) => {
                        e.preventDefault();
                        console.log("Form submitted");  // Debugging statement
                        editingId ? handleUpdate() : handleCreate();
                    }}
                >
                    <input
                        className="border p-2 rounded w-1/3"
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={formData.title}
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

                <div className="mt-5 grid grid-cols-3 gap-5">
                    {blogs.map((blog) => (
                        <div key={blog._id} className="bg-white p-5 shadow-md rounded">
                            <h3 className="text-lg font-bold">{blog.title}</h3>
                            <p>{blog.des}</p>
                            <img src={blog.img} alt={blog.title} className="w-24 h-24 mt-2 rounded-full" />
                            <div className="mt-2 flex space-x-2">
                                <button onClick={() => handleEdit(blog)} className="bg-yellow-500 text-white px-4 py-2 rounded">
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(blog._id)} className="bg-red-500 text-white px-4 py-2 rounded">
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

export default BlogCRUD;
