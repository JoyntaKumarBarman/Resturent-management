import React, {useState} from 'react';
import {Card} from "primereact/card";
import {Image} from "primereact/image";
import {baseUrl} from "../utilis/webinfo";
import {Link} from "react-router-dom";
import FoodItem from "../Pages/FoodItem";

interface Props {
   data: {
       status: boolean;
       data: {

           items: any[]
       }
   }

}

const FoodCategories = ({data}: Props) => {
    const [foodItems, setFoodItems] = useState<[]>([]);

    const {status, data: {items}} = data;
    console.log(data)

    return (
        <div>
            <Card>
                <h1 className={'text-center mb-4 underline'}>Categories</h1>
                <div className={'flex flex-wrap gap-4'}>
                    {
                        items.map((item: any, index: number) => {
                            return (<Link to={
                                {
                                    pathname: `/food-item/${item.id}`,

                                }
                            } key={item.id}>
                                <div key={item?.name} className=" card mb-0 w-12rem" >
                                    <div className={'w-full h-auto flex justify-content-center'}>
                                       <div >
                                           <Image src={`${baseUrl.url}${item.categoryphotourl}`} alt={item?.name} imageClassName={'w-6rem h-6rem object-cover '} />
                                       </div>
                                    </div>
                                    <div className={'mt-4'}>
                                        <p className={'text-center text-primary h-3rem text-xl font-semibold'}>{item?.name}</p>
                                        {/*<p>{item?.description}</p>*/}
                                    </div>

                                </div>
                            </Link>)

                        })
                    }


                </div>
            </Card>
            {/*<div className={'mt-8'}>*/}
            {/*    <FoodItem foodItems = {foodItems}/>*/}
            {/*</div>*/}
        </div>
    );
};

export default FoodCategories;