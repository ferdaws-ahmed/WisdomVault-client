import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Error from "../Pages/Error";



const router = createBrowserRouter([
    {
        path:"/",
        element: <MainLayout></MainLayout>,
        children : [
            {
                path:'/',
                element: <Home></Home>
            },
            {
                path:'/',
                element: <Login></Login>
            }
        ]
    },




    {
        path: '*',
        element: <Error></Error>
    }
])


export default router;