// src/components/SubscriptionsPage.jsx
import React, { useState, useEffect } from "react";
import { Subscription } from '../../../../types'; // Make sure to import the type
import axios from "axios";
import "./subscription.scss";

const SubscriptionsPage = () => {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [totalMonthlyPayment, setTotalMonthlyPayment] = useState<string>('€0.00');

    useEffect(() => {
        const authToken = "30cd1804d9154288cac036e585f96e031aa65a3f"; // Your actual token here

        axios.get<Subscription[]>('http://localhost:8000/api/subscriptions/', {
            headers: {
                'Authorization': `Token ${authToken}`
            }
        })
            .then(response => {
                const fetchedSubscriptions = response.data;
                setSubscriptions(fetchedSubscriptions);
                calculateTotalMonthlyPayment(fetchedSubscriptions);
            })
            .catch(error => console.error('Failed to load subscriptions:', error));
    }, []);

    const calculateTotalMonthlyPayment = (subscriptions: Subscription[]) => {
        const total = subscriptions.reduce((acc, subscription) => {
            const monthlyCost = parseFloat(subscription.cost.replace('€', ''));
            return subscription.frequency === 'monthly' ?
                acc + monthlyCost :
                subscription.frequency === 'yearly' ?
                    acc + (monthlyCost / 12) :
                    acc;
        }, 0);
        setTotalMonthlyPayment(`€${total.toFixed(2)}`);
    };

    return (
        <div className="subscription-page-container">
            <div className="subscription-page-header">
                <div className="trip-page-header-title"><h2>Subscriptions</h2></div>
                <div className="trip-page-header-title"><h2>Total: {totalMonthlyPayment}</h2></div>
            </div>
            <div className="subscription-page-content">
                <table className="subscription-table">
                    <thead>
                    <tr>
                        <th className="trip-table-element">Logo</th>
                        <th className="trip-table-element">Service</th>
                        <th className="trip-table-element">Renewal Date</th>
                        <th className="trip-table-element">Start Date</th>
                        <th className="trip-table-element">End Date</th>
                        <th className="trip-table-element">Frequency</th>
                        <th className="trip-table-element">Cost</th>
                        <th className="trip-table-element">Active</th>
                        <th className="trip-table-element">Currency</th>
                        <th className="trip-table-element">Manage</th>
                    </tr>
                    </thead>
                    <tbody>
                    {subscriptions.map((subscription, index) => (
                        <tr key={index}>
                            <td className="trip-table-element">
                                <img src={subscription.logo} alt={`${subscription.service} logo`} className="table-element-logo-image" />
                            </td>
                            <td className="trip-table-element">{subscription.service}</td>
                            <td className="trip-table-element">{subscription.renews}</td>
                            <td className="trip-table-element">{subscription.start_date}</td>
                            <td className="trip-table-element">{subscription.end_date}</td>
                            <td className="trip-table-element">{subscription.frequency}</td>
                            <td className="trip-table-element">{`${subscription.cost} ${subscription.currency}`}</td>
                            <td className="trip-table-element">{subscription.is_active ? 'Yes' : 'No'}</td>
                            <td className="trip-table-element">{subscription.currency}</td>
                            <td className="trip-table-element"><button>Pause</button></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SubscriptionsPage;
