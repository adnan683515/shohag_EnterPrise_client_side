import { createContext } from "react";

export type TUser = {
    name: string;
    email: string;
    role: "admin" | "user" | "subadmin";
    isVerified: boolean;
    tokens?: string;
    refreshToken?: string;
};

export interface AuthContextType {
    user: TUser | null;

    loading: boolean;

    setAuthData: (user: TUser,) => void;

    setLoading: (value: boolean) => void;

    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
