export interface OrderData {
    id: number;
    order_number: string;
    order_type_id: number;
    order_type: {
        "name": string;
    };
    cooking_complete_status: number;
    payment_status: number,
    order_status_id: number;
    order_status: {
        id: number;
        name: string;
    };
    food_list: Food_List[];


}

export interface Food_List {
    id: number;
    order_id: number;
    food_item_id: number;
    food_item: {
        id: number;
        name: string;
        description: string;
        sold_count: number;
        food_photo_url: string;
        cooking_time: number;
    };
    size_list: {
        id: number;
        "order_contains_food_id": number;
        "food_item_contains_size_id": number,
        "food_item_contains_size": {
            "id": number;
            "food_item_id": number;
            "size_name": string,
            "price": number;
            "discount_amount": number;
        },
        "quantity": number,
        price: number;
    }[]
}