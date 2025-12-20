import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const AuthHook = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("AuthHook must be used within AuthProvider");
    }

    return context;
};

export default AuthHook;
