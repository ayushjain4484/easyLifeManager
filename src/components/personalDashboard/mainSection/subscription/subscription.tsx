import React, { useState, useEffect, useMemo } from "react";
import { Subscription } from '../../../../types'; // Ensure this is the correct path
import { fetchSubscriptions } from './subscriptionService';
import "./subscription.scss";



const SubscriptionsPage: React.FC = () => {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [sortConfig, setSortConfig] = useState<{ key: keyof Subscription; direction: 'ascending' | 'descending' } | null>(null);
    const [totalMonthlyPayment, setTotalMonthlyPayment] = useState<string>('€0.00');
    const [totalYearlyPayment, setTotalYearlyPayment] = useState<string>('€0.00');
    const [totalEntertainmentCost, setTotalEntertainmentCost] = useState(0);
    const [totalInsuranceCost, setTotalInsuranceCost] = useState(0);
    const [totalUtilityCost, setTotalUtilityCost] = useState(0);
    const [totalFitnessCost, setTotalFitnessCost] = useState(0);
    const [totalBackupCost, setTotalBackupCost] = useState(0);
    const [totalTravelCost, setTotalTravelCost] = useState(0);
    const [totalOtherCost, setTotalOtherCost] = useState(0);
    const [totalInactiveCost, setTotalInactiveCost] = useState(0);
    const [showInactive, setShowInactive] = useState(false);


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
                calculateTotalEntertainmentCost(fetchedSubscriptions);
                calculateTotalUtilityCost(fetchedSubscriptions);
                calculateTotalBackupCost(fetchedSubscriptions);
                calculateTotalTravelCost(fetchedSubscriptions);
                calculateTotalInsuranceCost(fetchedSubscriptions);
                calculateTotalFitnessCost(fetchedSubscriptions);
                calculateTotalOtherCost(fetchedSubscriptions);
                calculateInactiveOtherCost(fetchedSubscriptions);
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


    const calculateTotalEntertainmentCost = (subscriptions: Subscription[]) => {
        const total = subscriptions.reduce((sum, subscription) => {
            if (subscription.category === 'entertainment' && subscription.is_active) {
                return sum + parseFloat(subscription.cost);
            }
            return sum;
        }, 0);
        setTotalEntertainmentCost(total);
    };


    const calculateTotalUtilityCost = (subscriptions: Subscription[]) => {
        const total = subscriptions.reduce((sum, subscription) => {
            if (subscription.category === 'utility' && subscription.is_active) {
                return sum + parseFloat(subscription.cost);
            }
            return sum;
        }, 0);
        setTotalUtilityCost(total);
    };

    const calculateTotalInsuranceCost = (subscriptions: Subscription[]) => {
        const total = subscriptions.reduce((sum, subscription) => {
            if (subscription.category === 'insurance' && subscription.is_active) {
                return sum + parseFloat(subscription.cost);
            }
            return sum;
        }, 0);
        setTotalInsuranceCost(total);

    };

    const calculateTotalBackupCost = (subscriptions: Subscription[]) => {
        const total = subscriptions.reduce((sum, subscription) => {
            if (subscription.category === 'backup' && subscription.is_active) {
                return sum + parseFloat(subscription.cost);
            }
            return sum;
        }, 0);
        setTotalBackupCost(total);
    };

    const calculateTotalTravelCost = (subscriptions: Subscription[]) => {
        const total = subscriptions.reduce((sum, subscription) => {
            if (subscription.category === 'travel' && subscription.is_active) {
                return sum + parseFloat(subscription.cost);
            }
            return sum;
        }, 0);
        setTotalTravelCost(total);
    };

    const calculateTotalFitnessCost = (subscriptions: Subscription[]) => {
        const total = subscriptions.reduce((sum, subscription) => {
            if (subscription.category === 'fitness' && subscription.is_active) {
                return sum + parseFloat(subscription.cost);
            }
            return sum;
        }, 0);
        setTotalFitnessCost(total);
    };

    const calculateTotalOtherCost = (subscriptions: Subscription[]) => {
        const total = subscriptions.reduce((sum, subscription) => {
            if (subscription.category === 'other' && subscription.is_active) {
                return sum + parseFloat(subscription.cost);
            }
            return sum;
        }, 0);
        setTotalOtherCost(total);
    };

    const calculateInactiveOtherCost = (subscriptions: Subscription[]) => {
        const total = subscriptions.reduce((sum, subscription) => {
            if (!subscription.is_active) {
                return sum + parseFloat(subscription.cost);
            }
            return sum;
        }, 0);
        setTotalInactiveCost(total);
    };


    return (
        <div className="subscription-page-container">
            <div className="subscription-page-header">
                <div className="subscription-page-header-title"><h2>Subscriptions</h2></div>
                <div className="subscription-page-total-amount-container">
                    <div className="subscription-page-header-title"><h2>Monthly: {totalMonthlyPayment}</h2></div>
                    <div className="subscription-page-header-title"><h2>Yearly: {totalYearlyPayment}</h2></div>
                </div>
            </div>
            <div className='subscription-page-content-show-inactive-flag'>
                <label>
                    Show Inactive :
                    <span className="checkbox-wrapper">
                          <input
                              className="subscription-page-content-show-inactive-flag-checkbox"
                              type="checkbox"
                              checked={showInactive}
                              onChange={e => setShowInactive(e.target.checked)}
                              style={{display: 'none'}} // Hide the default checkbox
                          />
                         <span className="custom-checkbox"></span> {/* This will be our custom checkbox */}
                    </span>
                </label>
            </div>
            <div className="subscription-page-content">

                <div className="subscription-table">
                    <table className="subscription-table">
                        <thead>
                        <tr>
                            <th className="subscription-table-element">Logo</th>
                            <th className="subscription-table-element" onClick={() => requestSort('service')}>Service
                            </th>
                            <th className="subscription-table-element" onClick={() => requestSort('renews')}>Renewal
                                Date
                            </th>
                            <th className="subscription-table-element"
                                onClick={() => requestSort('frequency')}>Frequency
                            </th>
                            <th className="subscription-table-element" onClick={() => requestSort('cost')}>Cost</th>
                            <th className="subscription-table-element" onClick={() => requestSort('is_active')}>Active
                            </th>
                            <th className="subscription-table-element">Manage</th>
                        </tr>
                        </thead>

                        <tbody>
                        {sortedSubscriptions.map((subscription, index) => {
                            if (subscription.is_active || showInactive) {
                                return (
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
                                        <td className={subscription.is_active ? "subscription-table-element" : "subscription-table-element-red"}>
                                            <button>Pause</button>
                                        </td>
                                    </tr>
                                );
                            }
                            return null; // Skip rendering for inactive subscriptions if the flag is false
                        })}

                        </tbody>
                    </table>
                </div>


                <div className='subscription-page-right-container'>
                    <div className="subscription-page-right-container-tile">
                        <div className="subscription-page-right-container-tile-header">
                            <h4>Entertainment (€{totalEntertainmentCost.toFixed(2)})</h4>
                        </div>
                        <div className="subscription-page-right-container-tile-content">
                            {sortedSubscriptions.map((subscription, index) => {
                                // Only render the image if the category is 'entertainment'
                                if (subscription.category === 'entertainment' && subscription.is_active) {
                                    return (
                                        <div key={index}>
                                            <img src={subscription.logo} alt={`${subscription.service} logo`}
                                                 className="table-element-logo-image"/>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    </div>
                    <div className="subscription-page-right-container-tile">
                        <div className="subscription-page-right-container-tile-header">
                            <h4>Utility (€{totalUtilityCost.toFixed(2)})</h4>
                        </div>
                        <div className="subscription-page-right-container-tile-content">
                            {sortedSubscriptions.map((subscription, index) => {
                                // Only render the image if the category is 'entertainment'
                                if (subscription.category === 'utility' && subscription.is_active) {
                                    return (
                                        <div key={index}>
                                            <img src={subscription.logo} alt={`${subscription.service} logo`}
                                                 className="table-element-logo-image"/>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    </div>
                    <div className="subscription-page-right-container-tile-container-small">
                        <div className="subscription-page-right-container-tile-small">
                            <div className="subscription-page-right-container-tile-header">
                                <h4>Backup (€{totalBackupCost.toFixed(2)})</h4>
                            </div>
                            <div className="subscription-page-right-container-tile-content">
                                {sortedSubscriptions.map((subscription, index) => {
                                    // Only render the image if the category is 'entertainment'
                                    if (subscription.category === 'backup' && subscription.is_active) {
                                        return (
                                            <div key={index}>
                                                <img src={subscription.logo} alt={`${subscription.service} logo`}
                                                     className="table-element-logo-image"/>
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                        </div>
                        <div className="subscription-page-right-container-tile-small">
                            <div className="subscription-page-right-container-tile-header">
                                <h4>Fitness (€{totalFitnessCost.toFixed(2)})</h4>
                            </div>
                            <div className="subscription-page-right-container-tile-content">
                                {sortedSubscriptions.map((subscription, index) => {
                                    // Only render the image if the category is 'entertainment'
                                    if (subscription.category === 'fitness' && subscription.is_active) {
                                        return (
                                            <div key={index}>
                                                <img src={subscription.logo} alt={`${subscription.service} logo`}
                                                     className="table-element-logo-image"/>
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="subscription-page-right-container-tile-container-small">
                        <div className="subscription-page-right-container-tile-small">
                            <div className="subscription-page-right-container-tile-header">
                                <h4>Insurance (€{totalInsuranceCost.toFixed(2)})</h4>
                            </div>
                            <div className="subscription-page-right-container-tile-content">
                                {sortedSubscriptions.map((subscription, index) => {
                                    // Only render the image if the category is 'entertainment'
                                    if (subscription.category === 'insurance' && subscription.is_active) {
                                        return (
                                            <div key={index}>
                                                <img src={subscription.logo} alt={`${subscription.service} logo`}
                                                     className="table-element-logo-image"/>
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                        </div>
                        <div className="subscription-page-right-container-tile-small">
                            <div className="subscription-page-right-container-tile-header">
                                <h4>Travel (€{totalTravelCost.toFixed(2)})</h4>
                            </div>
                            <div className="subscription-page-right-container-tile-content">
                                {sortedSubscriptions.map((subscription, index) => {
                                    // Only render the image if the category is 'entertainment'
                                    if (subscription.category === 'travel' && subscription.is_active) {
                                        return (
                                            <div key={index}>
                                                <img src={subscription.logo} alt={`${subscription.service} logo`}
                                                     className="table-element-logo-image"/>
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="subscription-page-right-container-tile">
                        <div className="subscription-page-right-container-tile-header">
                            <h4>Other (€{totalOtherCost.toFixed(2)})</h4>
                        </div>
                        <div className="subscription-page-right-container-tile-content">
                            {sortedSubscriptions.map((subscription, index) => {
                                // Only render the image if the category is 'entertainment'
                                if (subscription.category === 'other' && subscription.is_active) {
                                    return (
                                        <div key={index}>
                                            <img src={subscription.logo} alt={`${subscription.service} logo`}
                                                 className="table-element-logo-image"/>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    </div>
                    <div className="subscription-page-right-container-tile">
                        <div className="subscription-page-right-container-tile-header">
                            <h4>Inactive (€{totalInactiveCost.toFixed(2)})</h4>
                        </div>
                        <div className="subscription-page-right-container-tile-content">
                            {sortedSubscriptions.map((subscription, index) => {
                                // Only render the image if the category is 'entertainment'
                                if (!subscription.is_active) {
                                    return (
                                        <div key={index}>
                                            <img src={subscription.logo} alt={`${subscription.service} logo`}
                                                 className="table-element-logo-image"/>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionsPage;
