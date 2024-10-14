// index.js
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import ReactDOM from "react-dom/client";
import App from "./App"; // Adjust the path based on your file structure
import { AuthProvider } from './AuthContext'; // Adjust the path based on your file structure

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>
);
