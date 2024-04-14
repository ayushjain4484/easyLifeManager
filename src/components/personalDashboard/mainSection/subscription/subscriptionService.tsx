// src/services/subscriptionService.js
import axios from 'axios';
import { Subscription } from '../../../../types';

const API_URL = 'http://127.0.0.1:8000/api/subscriptions/';
const authToken="30cd1804d9154288cac036e585f96e031aa65a3f"

export const fetchSubscriptions = (): Promise<Subscription[]> => {
    return axios.get<Subscription[]>(API_URL, {
        headers: {
            'Authorization': `Token ${authToken}`
        }
    }).then(response => response.data);
};





// Add a new subscription
export const addSubscription = (subscription: Subscription) => {
    return axios.post<Subscription>(API_URL, subscription);
};

// Update an existing subscription
export const updateSubscription = (id: number, subscription: Subscription) => {
    return axios.put<Subscription>(`${API_URL}${id}/`, subscription);
};

// Delete a subscription
export const deleteSubscription = (id: number) => {
    return axios.delete(`${API_URL}${id}/`);
};
