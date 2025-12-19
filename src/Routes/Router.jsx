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
import DashboardLayout from "../Dashboard/DashboardLayout";
import UserOverview from "../Dashboard/User-role/UserOverView";
import AddLesson from "../Dashboard/User-role/add-lesson";
import MyLessons from "../Dashboard/User-role/my-lessons";
import Profile from "../Dashboard/User-role/profile";





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
            },
            
        ]
    },




    {
                path:'/dashboard',
                element: <DashboardLayout></DashboardLayout>,
                children: [
                    {
                        index: true,
                        element: <UserOverview></UserOverview>
                    },
                    {
                        path:'add-lesson',
                        element:<AddLesson></AddLesson>
                    },
                    {
                        path:'my-lessons',
                        element:<MyLessons></MyLessons>
                    },
                    {
                        path:'profile',
                        element: <Profile></Profile>
                    }
                ]
    },


    {
        path: '*',
        element: <ErrorPage></ErrorPage>
    }
    
])


export default router;