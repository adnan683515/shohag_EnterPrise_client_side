import { createContext } from "react";

interface AuthContextType {
    name: string
}

export const AuthContext = createContext<AuthContextType | null>(null);
