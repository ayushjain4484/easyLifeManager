import React, { useEffect } from "react";
import "./home.css";
import personalImage from "../../static/images/personal.jpeg";
import professionalImage from "../../static/images/professional.jpeg";
import logo from "../../static/images/logo_white.png";
import {useNavigate} from "react-router-dom";

const Home = () => {
	const navigate = useNavigate();
	const redirectToProfessional = () => {
		window.location.href = 'https://ayushjain.de';
	};
	const redirectToPersonal = () => {
		navigate('/personal');
	};

	return (
		<React.Fragment>
			<div className="logo">
				<img src={logo} alt="Personal"/>
			</div>
			<div className="home-page-content">
				<div className="home-content-wrapper">
					<div className="image-container" onClick={redirectToProfessional}>
						<div className="image-label label-professional"><h2>PROFESSIONAL</h2></div>
						<img src={professionalImage} alt="Personal"/>
					</div>
					<div className="image-container" onClick={redirectToPersonal}>
						<div className="image-label label-personal"><h2>PERSONAL</h2></div>
						<img src={personalImage} alt="Personal"/>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Home;
