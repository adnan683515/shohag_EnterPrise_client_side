import type { ReactNode } from "react";
import ReduxAuthHoook from "../Hooks/ReduxAuthHoook";
import { Navigate } from "react-router";


interface Props {
    children: ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
    const user = ReduxAuthHoook();

    if (!user) {
        return <Navigate to="/" />;
    }

    return <>{children}</>;
};

export default PrivateRoute;
