import React from "react";
import "./personalDashboard.scss";
import Sidebar from "./sidebar/sidebar";
import MainSection from "./mainSection/mainSection";

const PersonalDashboard = () => {
    return (
        <div className="dashboard-content">
            <div className="dashboard-content-wrapper">
                <div className="sidebar-container"><Sidebar /></div>
                <div className="main-section-container"><MainSection /></div>
            </div>
        </div>
    );
};

export default PersonalDashboard;
