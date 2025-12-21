import { createBrowserRouter } from "react-router";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";

import Deshboard from "../components/Deshboard/Deshboard/Deshboard";
import PrivateRoute from './PrivateRoute';
import DeshboardHome from "../components/Deshboard/Deshboard/DeshboardHome";
import TodayTransection from "../components/Transection/TodayTransection";



export const route = createBrowserRouter([
    {
        path: '/',
        Component: Login
    }, {
        path: '/signup',
        Component: SignUp
    }, {
        path: '/deshboard',
        element: <PrivateRoute>
            <DeshboardHome></DeshboardHome>
        </PrivateRoute>,
        children: [
            {
                path: '/deshboard',
                Component: Deshboard
            }, {
                path: '/deshboard/TTransection',
                Component : TodayTransection
            }
        ]
    }
])