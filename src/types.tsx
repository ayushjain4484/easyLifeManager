// src/types.ts
export interface Subscription {
    id: number;
    service: string;
    renews?: string; // Optional if not always available
    start_date: string;
    end_date: string;
    frequency: string;
    cost: string;
    is_active: boolean;
    logo?: string; // Optional if not always available
    currency: string; // Assuming currency is another field you might want to display
}
