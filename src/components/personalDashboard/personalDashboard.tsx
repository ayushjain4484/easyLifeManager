// PersonalDashboard.tsx
import React from "react";
import Sidebar from "./sidebar/sidebar";
import { Outlet } from "react-router-dom";
import "./personalDashboard.scss";

const PersonalDashboard = () => {
    return (
        <div className="dashboard-content">
            <div className="dashboard-content-wrapper">
                <div className="sidebar-container">
                    <Sidebar />
                </div>
                <div className="main-section-container">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default PersonalDashboard;
