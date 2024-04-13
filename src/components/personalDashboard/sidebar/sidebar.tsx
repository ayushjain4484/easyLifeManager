import React, { useEffect } from "react";
import "./sidebar.scss";
import logo from "../../../static/images/logo_white.png";
import { FaMoneyCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";



const Sidebar = () => {
    return (
        <React.Fragment>
            <div className="sidebar-main-container">
                <div className="logo">
                    <Link to="/">
                        <img src={ logo }/>
                    </Link>
                </div>
                <div className="sidebar-menu">
                   <div className="sidebar-menu-item">
                       <FaMoneyCheck></FaMoneyCheck><span>Subscriptions</span>
                   </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Sidebar;
