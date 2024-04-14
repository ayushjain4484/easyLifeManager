// Sidebar.tsx
import React from "react";
import "./sidebar.scss";
import { NavLink } from "react-router-dom";
import { FaMoneyCheck, FaPlane, FaReceipt } from "react-icons/fa";
import logo from "../../../static/images/logo_white.png"; // Adjust path if necessary

const Sidebar = () => {
    return (
        <div className="sidebar-main-container">
            <div className="logo">
                <NavLink to="/"><img src={logo} alt="Home" /></NavLink>
            </div>
            <div className="sidebar-menu">
                <NavLink to="/personal/subscriptions" className="sidebar-menu-item">
                    <FaMoneyCheck /><span>Subscriptions</span>
                </NavLink>
                <NavLink to="/personal/trips" className="sidebar-menu-item">
                    <FaPlane /><span>Trips</span>
                </NavLink>
                <NavLink to="/personal/bills" className="sidebar-menu-item">
                    <FaReceipt /><span>Bills</span>
                </NavLink>
            </div>
        </div>
    );
};

export default Sidebar;
