import React, { useEffect } from "react";
import "./mainSection.scss";
import SubscriptionsPage from "./subscription/subscription";
import Trips from "./trips/trips";


const MainSection = () => {

    return (
        <React.Fragment>
            <div className="main-section-main-container">
                <SubscriptionsPage></SubscriptionsPage>
                <Trips></Trips>
            </div>
        </React.Fragment>
    );
};

export default MainSection;
