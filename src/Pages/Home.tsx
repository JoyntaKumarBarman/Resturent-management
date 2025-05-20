import React from 'react';
import useFetch from "../hook/UseFetch";
import {ProgressSpinner} from "primereact/progressspinner";
import FoodCategories from "../components/FoodCategories";
import FoodItem from "./FoodItem";

const Home = () => {

    const {data, isLoading, hasError} = useFetch('/api/food_category?page=0&size=1100');

    console.log(data)

    if (isLoading) {
        return <div className={'flex h-screen justify-content-center align-content-center'}>
            <ProgressSpinner/>
        </div>
    }

    if(data.data.items.length === 0){
        return <div>No data found</div>
    }

    return (
        <div>
            <FoodCategories data={data} />

        </div>
    );
};

export default Home;