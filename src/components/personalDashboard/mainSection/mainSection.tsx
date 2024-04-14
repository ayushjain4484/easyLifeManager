// MainSection.tsx
import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import SubscriptionsPage from "./subscription/subscription";
import Trips from "./trips/trips";

const MainSection = () => {
    return (
        <div className="main-section-main-container">
            {/* Setup internal routes for MainSection */}
            <Routes>
                <Route path="subscriptions" element={<SubscriptionsPage />} />
                <Route path="trips" element={<Trips />} />
                <Route index element={<div>Select an option from the sidebar.</div>} />
            </Routes>
            <Outlet/>  {/* This Outlet is optional unless further nested routes are used */}
        </div>
    );
};

export default MainSection;
