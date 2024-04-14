// AppRoutes.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/home";
import PersonalDashboard from "./components/personalDashboard/personalDashboard";
import PageNotFound from "./components/pageNotFound/PageNotFound";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/personal/*" element={<PersonalDashboard />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
};

export default AppRoutes;
