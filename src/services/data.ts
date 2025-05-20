export const orders = {
    "id": 1,
    "order_number": "ORD-0331",
    "order_type_id": 1,
    "order_type": {
        "name": "Take-Away",
        "note": "",
        "min_order": 0
    },
    "note": "",
    "cancellation_note": "",
    "cancellation_approval_status": 0,
    "cancelled_by_id": 0,
    "cancelled_by": null,
    "user_id": 0,
    "waiter": null,
    "chef_id": 1,
    "chef": {
        "name": "Mr Admin 1",
        "lastlogin": "0001-01-01T00:00:00Z"
    },
    "discount_id": 0,
    "discount": null,
    "coupon_id": 0,
    "coupon": null,
    "payment_status": 1,
    "reservation_id": 0,
    "reservation": null,
    "customer_id": 0,
    "customer": null,
    "membership_card_id": 0,
    "membership_card": null,
    "no_of_guest": 1,
    "invoice_printed": 0,
    "cooking_complete_status": 1,
    "total_cooking_time": 15,
    "total_price": 400,
    "total_discount": 0,
    "net_payable": 448,
    "order_status_id": 2,
    "order_status": {
        "id": 2,
        "name": "Completed"
    },
    "event_time": "2024-03-23T09:13:06+06:00",
    "end_time": "2023-12-28T17:07:47+06:00",
    "is_reduce": 0,
    "dining_table_list": [],
    "food_list": [
        {
            "id": 1,
            "order_id": 1,
            "food_item_id": 38,
            "food_item": {
                "id": 38,
                "name": "Naga Wings",
                "description": "Naga Sauce and fry",
                "food_category_id": 4,
                "sold_count": 5,
                "food_photo_url": "/assets/images/food/food-image0f0f1fbf-292c-4c4f-a761-c10155a47828.jpg",
                "cooking_time": 15,
                "status": 1,
                "contains_ingredient_list": null,
                "contains_size_list": null,
                "contains_addon_list": null
            },
            "size_list": [
                {
                    "id": 1,
                    "order_contains_food_id": 1,
                    "food_item_contains_size_id": 34,
                    "food_item_contains_size": {
                        "id": 34,
                        "food_item_id": 38,
                        "size_name": "(4pcs)",
                        "price": 200,
                        "discount_amount": 0
                    },
                    "quantity": 1,
                    "price": 200
                }
            ]
        },
        {
            "id": 2,
            "order_id": 1,
            "food_item_id": 40,
            "food_item": {
                "id": 40,
                "name": "Chicken Lollipop (6pcs)",
                "description": "Chicken lollipop is essentially a frenched chicken winglet, wherein the meat is cut loose from the bone end and pushed down, creating a lollipop appearance.",
                "food_category_id": 4,
                "sold_count": 20,
                "food_photo_url": "/assets/images/food/food-image021b9036-8c27-4353-95b0-00346a794f78.jpg",
                "cooking_time": 15,
                "status": 1,
                "contains_ingredient_list": null,
                "contains_size_list": null,
                "contains_addon_list": null
            },
            "size_list": [
                {
                    "id": 2,
                    "order_contains_food_id": 2,
                    "food_item_contains_size_id": 35,
                    "food_item_contains_size": {
                        "id": 35,
                        "food_item_id": 40,
                        "size_name": " (6pcs)",
                        "price": 200,
                        "discount_amount": 0
                    },
                    "quantity": 1,
                    "price": 200
                }
            ]
        }
    ],
    "combo_list": [],
    "additional_charge_list": [
        {
            "id": 1,
            "order_id": 1,
            "additional_charge_id": 4,
            "additional_charge": {
                "id": 4,
                "name": "Vat",
                "percentage": 1,
                "status": 1
            }
        },
        {
            "id": 2,
            "order_id": 1,
            "additional_charge_id": 15,
            "additional_charge": {
                "id": 15,
                "name": "Service Charge",
                "percentage": 11,
                "status": 1
            }
        }
    ],
    "payment_detail": [
        {
            "id": 1,
            "order_id": 1,
            "payment_method_id": 111,
            "payment_method": {
                "id": 111,
                "name": "Cash",
                "adjustment_percentage": 20,
                "description": "Cash Payment"
            },
            "paid_amount": 500,
            "returned_amount": 52,
            "event_time": "2023-12-28T17:07:20+06:00"
        }
    ],
    "flat_discount": {
        "id": 0,
        "order_id": 0,
        "amount": 0,
        "percentage": 0
    }
}