import { type ReactNode, useState } from "react";
import { AuthContext, type TUser } from "./AuthContext";

interface AuthProps {
    children: ReactNode;
}


const AuthProvider = ({ children }: AuthProps) => {
    const [user, setUser] = useState<TUser | null>(null);

    

    
    const [loading, setLoading] = useState<boolean>(false);

    const setAuthData = (user: TUser) => {
        console.log("set auth data",user)
        setUser(user);
    
        setLoading(false);
    };

    const logout = () => {
        setUser(null);

    };




    return (
        <AuthContext.Provider
            value={{
                user,
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
