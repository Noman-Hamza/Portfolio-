import React from 'react';
import AppNav from "../component/app-nav.jsx";
import Footer from "../component/footer.jsx";


const Layout = (props) => {
    return (
        <div>
              <AppNav/>
            {props.children}
               <Footer/>
        </div>
    );
};

export default Layout;