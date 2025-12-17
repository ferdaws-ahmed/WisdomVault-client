import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";


import Error from "../Pages/Error";

import LoginPage from "../Pages/Login";
import RegisterPage from "../Pages/Register";
import ForgetPassword from "../Pages/ForgetPassword";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home/Home";
import PublicLessons from "../Pages/PublicLessons";
import LessonDetails from "../Pages/LessonDetails";




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

            },
            {
                path:'/lessons',
                element:<PublicLessons></PublicLessons>
            },
            {
                path:'/lesson-details/:lessonId',
                element:<LessonDetails></LessonDetails>
            }
        ]
    },




    {
        path: '*',
        element: <ErrorPage></ErrorPage>
    }
])


export default router;