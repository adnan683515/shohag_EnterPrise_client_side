import { createBrowserRouter } from "react-router";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";
import MainLayout from "../Layout/MainLayout";
import Deshboard from "../components/Deshboard/Deshboard/Deshboard";


export const route = createBrowserRouter([
    {
        path: '/',
        Component: Login
    }, {
        path: '/signup',
        Component: SignUp
    }, {
        path: '/deshboard',
        Component: MainLayout,
        children: [
            {
                path: '/deshboard',
                Component: Deshboard
            }
        ]
    }
])