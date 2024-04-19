// Sidebar.tsx
import React from "react";
import "./sidebar.scss";
import logo from "../../../static/images/logo_white.png";
import { FaMoneyCheck, FaPlane, FaReceipt } from "react-icons/fa";
import {NavLink, useNavigate} from "react-router-dom";
import {useAuth} from "../../auth/AuthContext";

const Sidebar = () => {
    const { logout } = useAuth(); // Get the logout function from context
    const navigate = useNavigate(); // To navigate after logout

    const signout = () => {
        logout(); // Call the logout function from the auth context
        navigate('/login'); // Redirect to the login page after logging out
    };
    return (
        <div className="sidebar-main-container">
            <div className="logo">
                <NavLink to="/"><img src={logo} alt="Home"/></NavLink>
            </div>
            <button onClick={signout}>Sign Out</button>
            <div className="sidebar-menu">
                <NavLink to="/personal/subscriptions" className="sidebar-menu-item">
                    <FaMoneyCheck/><span>Subscriptions</span>
                </NavLink>
                <NavLink to="/personal/trips" className="sidebar-menu-item">
                    <FaPlane/><span>Trips</span>
                </NavLink>
                <NavLink to="/personal/bills" className="sidebar-menu-item">
                    <FaReceipt/><span>Bills</span>
                </NavLink>
            </div>
        </div>
    );
};

export default Sidebar;
