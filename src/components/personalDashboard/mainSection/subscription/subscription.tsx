// src/components/SubscriptionsPage.jsx
import React, { useState, useEffect } from "react";
import { Subscription } from '../../../../types';
import { fetchSubscriptions } from './subscriptionService';
import "./subscription.scss";

const SubscriptionsPage: React.FC = () => {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [totalMonthlyPayment, setTotalMonthlyPayment] = useState<string>('€0.00');

    useEffect(() => {
        fetchSubscriptions()
            .then(fetchedSubscriptions => {
                setSubscriptions(fetchedSubscriptions);
                calculateTotalMonthlyPayment(fetchedSubscriptions);
            })
            .catch(error => console.error('Failed to load subscriptions:', error));
    }, []);

    const calculateTotalMonthlyPayment = (subscriptions: Subscription[]): void => {
        const total = subscriptions.reduce((acc: number, subscription: Subscription) => {
            const monthlyCost = parseFloat(subscription.cost) / parseFloat(subscription.frequency);
            return subscription.is_active ? acc + monthlyCost : acc;
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
                            <td className="trip-table-element">{subscription.frequency} month(s)</td>
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
