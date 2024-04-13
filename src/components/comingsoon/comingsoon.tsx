import React from "react";
import "./comingsoon.css";
import logo from "../../static/images/logo_white.png";

const ComingSoon = () => {
    const redirectToProfessional = () => {
        window.location.href = 'https://ayushjain.eu';
    };

    return (
        <React.Fragment>
            <div className="logo" onClick={redirectToProfessional}>
                <img src={logo} alt="Logo"/>
            </div>
            <div className="main-content">
                <div className="coming-soon">
                    Coming Soon!
                </div>
            </div>
        </React.Fragment>
    );
};

export default ComingSoon;
