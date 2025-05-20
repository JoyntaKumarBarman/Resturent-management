import React, {useRef} from 'react';
import useFetch from "../hook/UseFetch";
import {ProgressSpinner} from "primereact/progressspinner";
import callToast from "../utilis/helper";
import {Toast} from "primereact/toast";
import {Image} from "primereact/image";
import {baseUrl} from "../utilis/webinfo";
import {useParams} from "react-router-dom";
import {Button} from "primereact/button";
import {classNames} from "primereact/utils";
import FoodItemCard from "../components/FoodItemCard";


    interface FoodList  {
        id: number;
        name: string;
        description: string;
        food_photo_url: string;
        cooking_time: number;
        status: number;
    }


const FoodItem = ({foodItems}: any) => {
    const toast = useRef<Toast>(null);
    const {id} = useParams();

    const {data: {status, data: {items}}, isLoading, hasError} = useFetch('/api/food_category?page=0&size=1100');
    const categoriItems = items.find((item: { id: number }) => item?.id == parseInt(id!));


    if (isLoading) {
        return <div className={'flex h-screen justify-content-center align-content-center'}>
            <ProgressSpinner/>
        </div>
    }

    if (!status) {
        callToast(toast, false, "Fetch error")
        return (<Toast ref={toast}/>)
    }

    if (categoriItems.food_list.length === 0) {
        return <div>No data found</div>
    }

    return (
        <div className={'card'}>
            <h1 className={'text-center'}>Food List</h1>
            {/*    Cards*/}

            <div className={'grid'}>
                {
                    categoriItems.food_list.map((item: FoodList, index: number) => {
                        return (<FoodItemCard key={item?.id} item={item}/>)
                    })
                }
            </div>
        </div>
    );
};

export default FoodItem;