import { createContext } from "react";

export type TUser = {
    name: string;
    email: string;
    role: "admin" | "user" | "subadmin";
    isVerified: boolean;
};

export interface AuthContextType {
    user: TUser | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;

    setAuthData: (user: TUser, token: string) => void;

    setLoading: (value: boolean) => void;
    
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
