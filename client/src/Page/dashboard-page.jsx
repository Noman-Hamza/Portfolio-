import React from 'react';
import Layout from "../layout/layout.jsx";
import BlogCRUD from "../component/BlogCRUD.jsx";
import TeamCRUD from "../component/TeamCRUD.jsx";
import ServiceCRUD from "../component/ServiceCRUD.jsx";
const DashboardPage = () => {
    return (
        <Layout>
            <BlogCRUD/>
            <TeamCRUD/>
            <ServiceCRUD/>
        </Layout>
    );
};

export default DashboardPage;