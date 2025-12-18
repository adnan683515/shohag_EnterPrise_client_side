import { type ReactNode, useState } from "react";
import { AuthContext, type TUser } from "./AuthContext";

interface AuthProps {
    children: ReactNode;
}


const AuthProvider = ({ children }: AuthProps) => {
    const [user, setUser] = useState<TUser | null>(null);

    const [token, setToken] = useState<string | null>(null);
    
    const [loading, setLoading] = useState<boolean>(false);

    const setAuthData = (user: TUser, token: string) => {
        setUser(user);
        setToken(token);
        setLoading(false);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated: !!token,
                loading,
                setAuthData,
                logout,
                setLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
