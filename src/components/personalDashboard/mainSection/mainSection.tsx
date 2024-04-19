// MainSection.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import SubscriptionsPage from "./subscription/subscription";
import Trips from "./trips/trips";
import { AuthProvider } from "../../auth/AuthContext";

const MainSection = () => {
    return (
        <div className="main-section-main-container">
                <Routes>
                    <Route path="/subscriptions" element={<SubscriptionsPage/>}/>
                    <Route path="/trips" element={<Trips/>}/>
                    <Route path="/bills" element={<div>Bills content here.</div>}/>
                    <Route index element={<div>Select an option from the sidebar.</div>}/>
                </Routes>
        </div>
    );
};


export default MainSection;
