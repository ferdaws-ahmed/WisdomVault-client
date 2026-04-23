import { createBrowserRouter } from "react-router";
import { Helmet } from "react-helmet"; // Helmet ইম্পোর্ট করা হয়েছে
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
import PrivacyPolicy from "../Pages/Privacy";

const PageTitle = ({ title, icon = "/favicon.ico" }) => {
   
    return (
        <Helmet>
            <title>{title} </title>
            <link rel="icon" type="image/png" href={icon} />
        </Helmet>
    );
};
const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                index: true,
                element: (
                    <>
                        <PageTitle title="WisdomVault | Home" icon="/home-icon.png" />
                        <Home />
                    </>
                )
            },
            {
                path: '/login',
                element: (
                    <>
                        <PageTitle title="Login" icon="/login-icon.png" />
                        <LoginPage />
                    </>
                )
            },
            {
                path: '/register',
                element: (
                    <>
                        <PageTitle title="Register" />
                        <RegisterPage />
                    </>
                )
            },
            {
                path: '/forget-password',
                element: (
                    <>
                        <PageTitle title="Reset Password" />
                        <ForgetPassword />
                    </>
                )
            },
            {
                path: '/lessons',
                element: (
                    <>
                        <PageTitle title="Lessons" icon="/lesson-icon.png" />
                        <PublicLessons />
                    </>
                )
            },
            {
                path: '/lesson-details/:lessonId',
                element: (
                    <PrivateRoute>
                        <PageTitle title="Lesson Details" />
                        <LessonDetails />
                    </PrivateRoute>
                )
            },
            {
                path: '/upgrade',
                element: (
                    <PrivateRoute>
                        <PageTitle title="Upgrade / Pricing" icon="/pricing-icon.png" />
                        <Pricing />
                    </PrivateRoute>
                ),
            },
        ]
    },
    {
        path: '/terms-condition',
        element: (
            <>
                <PageTitle title="Terms & Conditions" />
                <TermsAndConditions />
            </>
        )
    },
    {
        path: '/privacy',
        element: (
            <>
                <PageTitle title="Privacy Policy" />
                <PrivacyPolicy />
            </>
        )
    },
    {
        path: '/dashboard',
        element: (
            <PrivateRoute>
                <PageTitle title="Dashboard" icon="/dashboard-icon.png" />
                <DashboardLayout />
            </PrivateRoute>
        ),
        children: [
            {
                index: true,
                element: <PrivateRoute> <UserOverview /> </PrivateRoute>
            },
            {
                path: 'add-lesson/user',
                element: <PrivateRoute><AddLesson /></PrivateRoute>
            },
            {
                path: 'my-lessons/user',
                element: <PrivateRoute><MyLessons /></PrivateRoute>
            },
            {
                path: 'profile/user',
                element: <PrivateRoute> <PageTitle title="Profile" icon="/dashboard-icon.png" /><Profile /></PrivateRoute>
            },
            {
                path: 'admin',
                element: <PrivateRoute><AdminDashboard /></PrivateRoute>
            },
            {
                path: 'admin/manage-users',
                element: <PrivateRoute><ManageUsers /></PrivateRoute>
            },
            {
                path: 'admin/manage-lesson',
                element: <PrivateRoute><ManageLessons /></PrivateRoute>
            }
        ]
    },
    {
        path: '*',
        element: (
            <>
                <PageTitle title="404 - Not Found" />
                <ErrorPage />
            </>
        )
    }
]);

export default router;