import Layout from "../layout/layout.jsx";
import React from "react";
import About from "../component/about.jsx";
import Team from "../component/team.jsx";
const AboutPage = () => {
    return (
        <Layout>
         <About/>
            <Team/>
        </Layout>
    );
};

export default AboutPage;