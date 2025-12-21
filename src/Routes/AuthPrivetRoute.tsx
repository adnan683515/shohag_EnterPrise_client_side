import type { ReactNode } from "react";
import ReduxAuthHoook from "../Hooks/ReduxAuthHoook";
import { Navigate } from "react-router";

interface Props {
    children: ReactNode;
}

const AuthPrivetRoute = ({ children }: Props) => {
    const user = ReduxAuthHoook();

    // user already logged in
    if (user) {
        return <Navigate to="/deshboard" replace />;
    }

    return <>{children}</>;
};

export default AuthPrivetRoute;
