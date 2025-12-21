import { createBrowserRouter } from "react-router";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";

import Deshboard from "../components/Deshboard/Deshboard/Deshboard";
import PrivateRoute from './PrivateRoute';
import DeshboardHome from "../components/Deshboard/Deshboard/DeshboardHome";
import TodayTransection from "../components/Transection/TodayTransection";
import AuthPrivetRoute from "./AuthPrivetRoute";
import OTP_page from "../components/Auth/OTP_page";



export const route = createBrowserRouter([
    {
        path: '/',
        element: <AuthPrivetRoute>
            <Login></Login>
        </AuthPrivetRoute>

    }, {

        path: '/otp',
        element: <AuthPrivetRoute>
            <OTP_page></OTP_page>
        </AuthPrivetRoute>
    }, {
        path: '/signup',
        element: <AuthPrivetRoute>
            <SignUp></SignUp>
        </AuthPrivetRoute>
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
                Component: TodayTransection
            }
        ]
    }
])