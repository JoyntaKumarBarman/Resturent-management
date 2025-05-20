import {createBrowserRouter} from "react-router-dom";
import Home from "../Pages/Home";
import Layout from "../layout/Layout";
import NotFound from "../NotFound/NotFound";
import Order from "../Pages/Order";
import FoodItem from "../Pages/FoodItem";
import CustomTableForNothing from "../components/CustomTableForNothing";
import TestOrderTable from "../Pages/TestOrderTable";


export const router: any = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        errorElement: <NotFound/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: '/food-item/:id',
                element: <FoodItem/>
            }, {
                path: "/order",
                element: <Order/>,
            },
            {
                path: "/custom",
                element: <CustomTableForNothing/>
            },
            {
                path: '/test_order',
                element: <TestOrderTable/>
            }
        ],
    },
]);
