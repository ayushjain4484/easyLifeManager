import React, { useState, useEffect } from "react";
import "./subscription.scss";
import subscriptionData from './subscriptions.json'; // adjust the path as needed

type Subscription = {
    service: string;
    renews: string;
    frequency: string;
    cost: string;
    logo?: string;
};

const SubscriptionsPage = () => {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [totalMonthlyPayment, setTotalMonthlyPayment] = useState<string>('€0.00');

    useEffect(() => {
        setSubscriptions(subscriptionData);

        // Calculate the total monthly payment
        const total = subscriptionData.reduce((acc, subscription) => {
            // Convert cost to number and add to the accumulator
            const monthlyCost = parseFloat(subscription.cost.replace('€', ''));
            if (subscription.frequency === 'monthly') {
                return acc + monthlyCost;
            } else if (subscription.frequency === 'yearly') {
                // Add one twelfth of the yearly cost
                return acc + (monthlyCost / 12);
            }
            return acc;
        }, 0);

        // Convert the total to a string and format it as currency
        const formattedTotal = `€${total.toFixed(2)}`;
        setTotalMonthlyPayment(formattedTotal);
    }, []);

    return (
        <React.Fragment>
            <div className="subscription-page-container">
                <div className="subscription-page-header">
                    <div className="subscription-page-header-title"><h2>Subscriptions</h2></div>
                    <div className="subscription-page-total-amount"><h2>Total: {totalMonthlyPayment}</h2></div>
                </div>
                <div className="subscription-page-content">
                    <table className="subscription-table">
                        <thead>
                        <tr>
                            <th className="subscription-table-element"></th>
                            <th className="subscription-table-element">Service</th>
                            <th className="subscription-table-element">Renewal Date</th>
                            <th className="subscription-table-element">Frequency</th>
                            <th className="subscription-table-element">Cost</th>
                            <th className="subscription-table-element">Manage</th>
                        </tr>
                        </thead>
                        <tbody>
                        {subscriptions.map((subscription, index) => (
                            <tr key={index}>
                                <td className="subscription-table-element">
                                    <div><img className="table-element-logo-image" src={subscription.logo}/></div>
                                </td>
                                <td className="subscription-table-element">{subscription.service}</td>
                                <td className="subscription-table-element">{subscription.renews}</td>
                                <td className="subscription-table-element">{subscription.frequency}</td>
                                <td className="subscription-table-element">{subscription.cost}</td>
                                <td className="subscription-table-element"><button>Pause</button></td>
                            </tr>
                        ))}
                        {/*<tr>
                            <td className="subscription-table-element"><input type="text"/></td>
                            <td className="subscription-table-element"><input type="text"/></td>
                            <td className="subscription-table-element"><input type="date"/></td>
                            <td className="subscription-table-element"><input type="text"/></td>
                            <td className="subscription-table-element"><input type="text"/></td>
                        </tr>*/}
                        </tbody>
                    </table>
                </div>
            </div>
        </React.Fragment>
    );
};

export default SubscriptionsPage;
