import React, { useState, useEffect, useMemo } from "react";
import { Subscription } from '../../../../types'; // Ensure this is the correct path
import { fetchSubscriptions } from './subscriptionService';
import "./subscription.scss";


const SubscriptionsPage: React.FC = () => {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [sortConfig, setSortConfig] = useState<{ key: keyof Subscription; direction: 'ascending' | 'descending' } | null>(null);
    const [totalMonthlyPayment, setTotalMonthlyPayment] = useState<string>('€0.00');
    const [totalYearlyPayment, setTotalYearlyPayment] = useState<string>('€0.00');

    const sortedSubscriptions = useMemo(() => {
        return [...subscriptions].sort((a, b) => {
            if (!sortConfig) {
                return 0; // No sorting applied if sortConfig is null
            }

            const key = sortConfig.key;
            let aValue = a[key];
            let bValue = b[key];

            // Adjust cost based on frequency when sorting by cost
            if (key === 'cost') {
                // Convert both costs to numbers and adjust by frequency
                const aCostPerMonth = a.frequency ? parseFloat(a.cost) / parseFloat(a.frequency) : parseFloat(a.cost);
                const bCostPerMonth = b.frequency ? parseFloat(b.cost) / parseFloat(b.frequency) : parseFloat(b.cost);

                return sortConfig.direction === 'ascending' ? aCostPerMonth - bCostPerMonth : bCostPerMonth - aCostPerMonth;
            } else if (typeof aValue === 'string' && typeof bValue === 'string') {
                // String comparison
                return sortConfig.direction === 'ascending' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            } else if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
                // Boolean comparison (true > false)
                return sortConfig.direction === 'ascending' ? (aValue === bValue ? 0 : aValue ? 1 : -1) : (aValue === bValue ? 0 : aValue ? -1 : 1);
            }

            return 0;
        });
    }, [subscriptions, sortConfig]);


    useEffect(() => {
        fetchSubscriptions()
            .then(fetchedSubscriptions => {
                setSubscriptions(fetchedSubscriptions);
                calculateTotalMonthlyPayment(fetchedSubscriptions);
            })
            .catch(error => console.error('Failed to load subscriptions:', error));
    }, []);


    const requestSort = (key: keyof Subscription) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const calculateTotalMonthlyPayment = (subscriptions: Subscription[]): void => {
        const total = subscriptions.reduce((acc: number, subscription: Subscription) => {
            const monthlyCost = parseFloat(subscription.cost) / parseFloat(subscription.frequency);
            return subscription.is_active ? acc + monthlyCost : acc;
        }, 0);
        setTotalMonthlyPayment(`€${total.toFixed(2)}`);
        setTotalYearlyPayment(`€${(total * 12).toFixed(2)}`);
    };


    return (
        <div className="subscription-page-container">
            <div className="subscription-page-header">
                <div className="subscription-page-header-title"><h2>Subscriptions</h2></div>
                <div className="subscription-page-header-title"><h2>Monthly: {totalMonthlyPayment}</h2></div>
                <div className="subscription-page-header-title"><h2>Yearly: {totalYearlyPayment}</h2></div>
            </div>
            <div className="subscription-page-content">
                <table className="subscription-table">
                    <thead>
                    <tr>
                    <th className="subscription-table-element">Logo</th>
                        <th className="subscription-table-element" onClick={() => requestSort('service')}>Service</th>
                        <th className="subscription-table-element" onClick={() => requestSort('renews')}>Renewal Date</th>
                        <th className="subscription-table-element" onClick={() => requestSort('frequency')}>Frequency</th>
                        <th className="subscription-table-element" onClick={() => requestSort('cost')}>Cost</th>
                        <th className="subscription-table-element" onClick={() => requestSort('is_active')}>Active</th>
                        <th className="subscription-table-element" onClick={() => requestSort('currency')}>Currency</th>
                        <th className="subscription-table-element">Manage</th>
                    </tr>
                    </thead>

                    <tbody>
                    {sortedSubscriptions.map((subscription, index) => (
                        <tr key={index}>
                            <td className={subscription.is_active ? "subscription-table-element" : "subscription-table-element-red"}>
                                <img src={subscription.logo} alt={`${subscription.service} logo`}
                                     className="table-element-logo-image"/>
                            </td>
                            <td className={subscription.is_active ? "subscription-table-element" : "subscription-table-element-red"}>{subscription.service}</td>
                            <td className={subscription.is_active ? "subscription-table-element" : "subscription-table-element-red"}>{subscription.renews}</td>
                            <td className={subscription.is_active ? "subscription-table-element" : "subscription-table-element-red"}>{subscription.frequency}</td>
                            <td className={subscription.is_active ? "subscription-table-element" : "subscription-table-element-red"}>{`${subscription.cost} ${subscription.currency}`}</td>
                            <td className={subscription.is_active ? "subscription-table-element" : "subscription-table-element-red"}>{subscription.is_active ? 'Yes' : 'No'}</td>
                            <td className={subscription.is_active ? "subscription-table-element" : "subscription-table-element-red"}>{subscription.currency}</td>
                            <td className={subscription.is_active ? "subscription-table-element" : "subscription-table-element-red"}>
                                <button>Pause</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SubscriptionsPage;
