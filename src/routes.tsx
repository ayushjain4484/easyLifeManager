import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/home";
import PageNotFound from "./components/pageNotFound/PageNotFound";
import ComingSoon from "./components/comingsoon/comingsoon";
import PersonalDashboard from "./components/personalDashboard/personalDashboard";



const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/personal" element={<PersonalDashboard/>} />
        </Routes>
    );
};

export default AppRoutes;
