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

import PrivateRoute from "../Routes/PrivateRoute";
import TermsAndConditions from "../Pages/TermsAndCondition";




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
                element:<PrivateRoute><LessonDetails></LessonDetails></PrivateRoute>
            },
            {
                path:'/upgrade',
                element: <PrivateRoute><Pricing></Pricing></PrivateRoute>,
                
            },
           
            
        ]
    },




    {
                path:'/dashboard',
                element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
                children: [
                    {
                        index: true,
                        element:<PrivateRoute> <UserOverview></UserOverview></PrivateRoute>
                    },
                    {
                        path:'add-lesson/user',
                        element:<PrivateRoute><AddLesson></AddLesson></PrivateRoute>
                    },
                    {
                        path:'my-lessons/user',
                        element:<PrivateRoute><MyLessons></MyLessons></PrivateRoute>
                    },
                    {
                        path:'profile/user',
                        element: <PrivateRoute><Profile></Profile></PrivateRoute>
                    },
                    {
                        path:'admin',
                        element:<PrivateRoute><AdminDashboard></AdminDashboard></PrivateRoute>
                    },
                    {
                        path:'admin/manage-users',
                        element:<PrivateRoute><ManageUsers></ManageUsers></PrivateRoute>
                    },
                    {
                        path:'admin/manage-lesson',
                        element:<PrivateRoute><ManageLessons></ManageLessons></PrivateRoute>
                    }
                ]
    },
    {
        path:'/terms-condition',
        element:<TermsAndConditions></TermsAndConditions>
    }


    {
        path: '*',
        element: <ErrorPage></ErrorPage>
    }
    
])


export default router;