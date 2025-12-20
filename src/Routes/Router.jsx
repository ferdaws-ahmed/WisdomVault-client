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
import DashboardLayout from "../Dashboard/UserDashboardLayout";
import UserOverview from "../Dashboard/User-role/UserOverView";
import AddLesson from "../Dashboard/User-role/add-lesson";
import MyLessons from "../Dashboard/User-role/my-lessons";
import Profile from "../Dashboard/User-role/profile";
import AdminDashboard from "../Dashboard/Admin-role/AdminDashboardLayout";
import ManageUsers from "../Dashboard/Admin-role/ManagesUser";
import ManageLessons from "../Dashboard/Admin-role/ManageLesson";
import Pricing from "../Pages/Upgrade";





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
            {
                path:'/upgrade',
                element: <Pricing></Pricing>
            }
            
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
                        path:'add-lesson/user',
                        element:<AddLesson></AddLesson>
                    },
                    {
                        path:'my-lessons/user',
                        element:<MyLessons></MyLessons>
                    },
                    {
                        path:'profile/user',
                        element: <Profile></Profile>
                    },
                    {
                        path:'admin',
                        element:<AdminDashboard></AdminDashboard>
                    },
                    {
                        path:'admin/manage-users',
                        element:<ManageUsers></ManageUsers>
                    },
                    {
                        path:'admin/manage-lesson',
                        element:<ManageLessons></ManageLessons>
                    }
                ]
    },


    {
        path: '*',
        element: <ErrorPage></ErrorPage>
    }
    
])


export default router;