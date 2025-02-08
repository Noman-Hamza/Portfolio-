import React from 'react';
import Layout from "../layout/layout.jsx";
import Hero from "../component/hero.jsx";
import Blog from "../component/blog.jsx";


const HomePage = () => {
    return (
        <Layout>
            <Hero/>
            <Blog/>
        </Layout>
    );
};

export default HomePage;