import type {MenuModel} from "../../types";
import AppSubMenu from "./AppSubMenu";

const AppMenu = () => {
    const model: MenuModel[] = [
        {
            label: "Dashboards",
            icon: "pi pi-home",
            items: [
                {
                    label: "Categories",
                    icon: "pi pi-fw pi-bars",
                    to: "/",

                },{
                    label: "Order",
                    icon: "pi pi-shopping-cart",
                    to: "/order",
                },
                {
                    label: 'Test Order Table',
                    icon: 'pi pi-shopping-cart',
                    to: '/test_order',
                }
            ],
        },
    ];

    return <AppSubMenu model={model}/>;
};

export default AppMenu;
