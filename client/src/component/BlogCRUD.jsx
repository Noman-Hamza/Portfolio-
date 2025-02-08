import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BlogCrud = () => {
    const [blogs, setBlogs] = useState([]);
    const [newBlog, setNewBlog] = useState({ title: '', des: '', img: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [updateBlog, setUpdateBlog] = useState(null);

    // Fetch all blogs with detailed error handling
    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:5050/api/ReadBlogByUser');
            console.log('Blogs fetched:', res.data);  // Debugging response
            setBlogs(res.data);
        } catch (err) {
            console.error('Error fetching blogs:', err);  // More detailed error logs
            setError('Error fetching blogs');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewBlog((prev) => ({ ...prev, [name]: value }));
    };

    // Create blog
    const handleCreate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:5050/api/CreateBlog', newBlog);
            console.log('Blog created:', res.data);  // Log the created blog response
            fetchBlogs();
            setNewBlog({ title: '', des: '', img: '' });
        } catch (err) {
            console.error('Error creating blog:', err);  // Error logs
            setError('Error creating blog');
        } finally {
            setLoading(false);
        }
    };

    // Delete blog
    const handleDelete = async (id) => {
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:5050/api/DeleteBlog', { _id: id });
            console.log('Blog deleted:', res.data);  // Log delete response
            fetchBlogs();
        } catch (err) {
            console.error('Error deleting blog:', err);  // Error logs
            setError('Error deleting blog');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = (blog) => {
        setUpdateBlog(blog);
        setNewBlog(blog);
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(`http://localhost:5050/api/UpdateBlog/${updateBlog._id}`, newBlog);
            console.log('Blog updated:', res.data);  // Log update response
            fetchBlogs();
            setNewBlog({ title: '', des: '', img: '' });
            setUpdateBlog(null);
        } catch (err) {
            console.error('Error updating blog:', err);  // Error logs
            setError('Error updating blog');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <h1 className="text-3xl font-semibold text-center">Blog CRUD Operations</h1>

            {/* Error message */}
            {error && <div className="text-red-500 text-center mb-4">{error}</div>}

            {/* Create and Update Form */}
            <form onSubmit={updateBlog ? handleUpdateSubmit : handleCreate} className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">{updateBlog ? 'Update Blog' : 'Create Blog'}</h2>
                <div>
                    <label htmlFor="title" className="block text-lg font-medium">Title</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Enter blog title"
                        value={newBlog.title}
                        onChange={handleChange}
                        required
                        className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="des" className="block text-lg font-medium">Description</label>
                    <textarea
                        name="des"
                        id="des"
                        placeholder="Enter blog description"
                        value={newBlog.des}
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
                        value={newBlog.img}
                        onChange={handleChange}
                        required
                        className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full p-3 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                >
                    {loading ? 'Processing...' : updateBlog ? 'Update Blog' : 'Create Blog'}
                </button>
            </form>

            {/* Display Blogs */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold">Blog List</h2>
                {loading && <div className="text-center">Loading...</div>}
                {!loading && blogs.length === 0 && <div>No blogs found</div>}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                    {blogs.map((blog) => (
                        <div key={blog._id} className="bg-white p-6 rounded-lg shadow-lg">
                            <img src={blog.img} alt={blog.title} className="w-full h-32 object-cover rounded-md mb-4" />
                            <h3 className="text-xl font-semibold">{blog.title}</h3>
                            <p className="text-gray-700">{blog.des}</p>

                            {/* Edit and Delete buttons */}
                            <div className="mt-4 flex justify-between">
                                <button
                                    onClick={() => handleUpdate(blog)}
                                    className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(blog._id)}
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

export default BlogCrud;
