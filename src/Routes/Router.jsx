import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";

import Error from "../Pages/Error";

import LoginPage from "../Pages/Login";
import RegisterPage from "../Pages/Register";
import ForgetPassword from "../Pages/ForgetPassword";




const router = createBrowserRouter([
    {
        path:"/",
        element: <MainLayout></MainLayout>,
        children : [
            {
               index: true,
                element: <Home></Home>
            },
            {
                path:'/login',
                element: <LoginPage></LoginPage>
            },
            {
                path:'/register',
                element:<RegisterPage></RegisterPage>
            },
            {
               path:'/forget-password',
               element: <ForgetPassword></ForgetPassword>

            }
        ]
    },




    {
        path: '*',
        element: <Error></Error>
    }
])


export default router;