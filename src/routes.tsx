// AppRoutes.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/home";
import PageNotFound from "./components/pageNotFound/PageNotFound";
import Login from "./components/auth/login";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import SubscriptionsPage from "./components/personalDashboard/mainSection/subscription/subscription";
import Trips from "./components/personalDashboard/mainSection/trips/trips";
import {AuthProvider} from "./components/auth/AuthContext";
import PersonalDashboard from "./components/personalDashboard/personalDashboard";

const AppRoutes = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/personal/*" element={<ProtectedRoute />}>
                    {/* PersonalDashboard is the layout component that includes the Sidebar */}
                    <Route element={<PersonalDashboard />}>
                        {/* Index route for PersonalDashboard */}
                        <Route index element={<div>Select an option from the sidebar.</div>} />
                        {/* Nested routes */}
                        <Route path="subscriptions" element={<SubscriptionsPage />} />
                        <Route path="trips" element={<Trips />} />
                        {/* Additional nested routes can be defined here */}
                    </Route>
                </Route>
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </AuthProvider>
    );
};

export default AppRoutes;
