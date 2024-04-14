import React, { useState, useEffect } from "react";
import "./trips.scss";
import tripData from './trips.json'; // Adjust the path as needed

type Trip = { // The type should be singular since it represents a single trip
    service: string;
    renews: string;
    frequency: string;
    cost: string;
    logo?: string;
};

const TripsPage = () => {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [totalMonthlyPayment, setTotalMonthlyPayment] = useState<string>('€0.00');

    useEffect(() => {
        setTrips(tripData);

        // Calculate the total monthly payment
        const total = tripData.reduce((acc, trip) => {
            // Convert cost to number and add to the accumulator
            const monthlyCost = parseFloat(trip.cost.replace('€', ''));
            if (trip.frequency === 'monthly') {
                return acc + monthlyCost;
            } else if (trip.frequency === 'yearly') {
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
            <div className="trip-page-container">
                <div className="trip-page-header">
                    <div className="trip-page-header-title"><h2>Trips</h2></div>
                    <div className="trip-page-total-amount"><h2>Total: {totalMonthlyPayment}</h2></div>
                </div>
                <div className="trip-page-content">
                    <table className="trip-table">
                        <thead>
                        <tr>
                            <th className="trip-table-element">Logo</th>
                            <th className="trip-table-element">Service</th>
                            <th className="trip-table-element">Renewal Date</th>
                            <th className="trip-table-element">Frequency</th>
                            <th className="trip-table-element">Cost</th>
                            <th className="trip-table-element">Manage</th>
                        </tr>
                        </thead>
                        <tbody>
                        {trips.map((trip, index) => (
                            <tr key={index}>
                                <td className="trip-table-element">
                                    {trip.logo && <img className="table-element-logo-image" src={trip.logo} alt={trip.service + ' logo'}/>}
                                </td>
                                <td className="trip-table-element">{trip.service}</td>
                                <td className="trip-table-element">{trip.renews}</td>
                                <td className="trip-table-element">{trip.frequency}</td>
                                <td className="trip-table-element">{trip.cost}</td>
                                <td className="trip-table-element"><button>Pause</button></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </React.Fragment>
    );
};

export default TripsPage;
