import React, {useRef, useState} from 'react';
import {baseUrl} from "../utilis/webinfo";
import {Button} from "primereact/button";
import {Image} from "primereact/image";
import {Dialog} from "primereact/dialog";
import useFetch from "../hook/UseFetch";
import {Toast} from "primereact/toast";
import callToast from "../utilis/helper";


interface FoodList {
    id: number;
    name: string;
    description: string;
    food_photo_url: string;
    cooking_time: number;
    status: number;
}

const FoodItemCard = ({item}: { item: FoodList }) => {
    console.log("item", item);
    const [visible, setVisible] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [dialogData, setDialogData] = useState<FoodList[]>([]);
    const toast = useRef<Toast>(null);


    const handleFoodDetailsDialog = async (id: number) => {
        setLoading(true);

        // const {data, isLoading, hasError} = useFetch1(`${baseUrl?.url}/api/food_item?filters=[["id",${id}]]`);

        const response = await fetch(`${baseUrl?.url}/api/food_item?filters=[["id",${id}]]`, {headers: {Authorization: `bearer ${baseUrl?.token!}`}});
        if (response.ok) {
            const data = await response.json();
            setDialogData(data?.data?.items);
            setLoading(false);
            setVisible(true);
            return;
        }

        callToast(toast, false, "Data Fetch Error!")
        setLoading(false);



    }

    console.log(dialogData)

    return (


        <div key={item?.id} className={'col-3 p-3 '}>
            <Toast ref={toast}/>
            <div className={'border-primary bg-gray-100 border-round-lg overflow-hidden'}>

                <div className={'w-full h-15rem flex justify-content-center overflow-hidden'}>
                    <Image src={`${baseUrl?.url}${item?.food_photo_url}`} alt={item?.name}
                           imageClassName={'w-full h-auto border-round-lg'} style={{objectPosition: 'center'}} preview
                    />
                </div>
                <div className={'p-4'}>
                    <h2 className={'text-gray-900 h-2rem mb-4 overflow-hidden'}>{item?.name}</h2>
                    <p className={'text-gray-700 font-sm h-5rem'}>{item?.description}</p>

                    <p>{item?.status === 1 ? "In Stock": "Stock Out"}</p>
                    <div>
                        <p>{''}</p>
                    </div>

                    <Button loading={loading} className={'w-full  flex justify-content-center gap-2'}
                            onClick={() => handleFoodDetailsDialog(item?.id)}>Show Details</Button>

                </div>
            </div>
            {
                dialogData.length > 0 && <Dialog header="Food Details" visible={visible} style={{width: '50vw'}} onHide={() => {
                    if (!visible) return;
                    setVisible(false);
                }}>
                    <Image src={`${baseUrl?.url}${dialogData[0].food_photo_url}`} alt={item?.name}
                           imageClassName={'w-full h-auto border-round-lg'}
                    />
                </Dialog>
            }

        </div>

    );
};

export default FoodItemCard;