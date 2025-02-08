import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Toaster} from "react-hot-toast";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App/>
        <div><Toaster position="bottom-center"/></div>
    </StrictMode>,
)
