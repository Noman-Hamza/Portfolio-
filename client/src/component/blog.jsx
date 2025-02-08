import React, { useEffect, useState } from 'react';
import { ReadBlogSection } from "../ApiRequest/APIRequest.js";
import Loader from "./loader.jsx";
import {Link} from "react-router-dom";

const Blog = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await ReadBlogSection();
                if (response.data) {
                    setList(response.data);
                }
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="container mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-12">Blog Posts</h1>

            {/* Blog Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {list.slice(0, 6).map((blog) => {
                    return (
                        <div key={blog._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                            <img
                                src={blog.img}
                                alt={blog.title}
                                className="w-full h-40 object-cover rounded-t-lg"
                            />
                            <div className="mt-4">
                                <h2 className="text-xl font-semibold text-gray-800">{blog.title}</h2>
                                <p className="text-gray-600 mt-2">{blog.des}</p>
                                <Link
                                    to={`/blog`}
                                    className="text-blue-600 hover:underline mt-4 inline-block"
                                >
                                    Read More
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Blog;
