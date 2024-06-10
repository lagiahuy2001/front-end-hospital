import React from 'react';

import { Outlet } from 'react-router-dom';
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "../../components/ScrollToTop";
import Chatbot from "../../components/Chatbot";

const DefaultLayout = () => {
    return (
        <div>
            <ScrollToTop/>
            <Header/>
            <Outlet />
            <Footer/>
            <Chatbot/>
        </div>
    )
};

export default DefaultLayout;