import React from 'react';
import useFetch from "../hook/UseFetch";
import {useParams} from "react-router-dom";
import OrderTable from "../components/OrderTable";

const Order = () => {


    return (
        <div>
            <OrderTable/>
        </div>
    );
};

export default Order;