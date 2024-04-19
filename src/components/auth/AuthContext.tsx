import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Define the types for the authentication context
interface User {
    username: string;
    // Add more user details as needed
}

interface AuthContextType {
    currentUser: User | null;
    isLoading: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

// Define the default context
const defaultAuthContext: AuthContextType = {
    currentUser: null,
    isLoading: false,
    login: async () => {
        throw new Error("login function not implemented");
    },
    logout: () => {
        throw new Error("logout function not implemented");
    }
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export function useAuth() {
    return useContext(AuthContext);
}

const API_URL = 'http://127.0.0.1:8000/api/login/';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isLoading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    // Effect for initializing authentication state from local storage
    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (username: string, password: string) => {
        setLoading(true);
        try {
            const response = await axios.post(API_URL, { username, password }, { withCredentials: true });
            if (response.data.user) {
                localStorage.setItem('currentUser', JSON.stringify(response.data.user));  // Persist user data
                setCurrentUser(response.data.user);
                setLoading(false);
                navigate('/personal');  // Navigate to a protected route after login
            } else {
                throw new Error("No user data returned on login");
            }
        } catch (error) {
            setLoading(false);
            console.error("Login failed:", error);
        }
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('currentUser');  // Clear user data from local storage
        navigate('/login');  // Redirect to login page after logout
    };

    const value = {
        currentUser,
        isLoading,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
