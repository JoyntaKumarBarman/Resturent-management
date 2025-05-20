import React, {useEffect, useState} from 'react';
import {
    DataTable,
    DataTableExpandedRows,
    DataTableFilterMeta,
    DataTableStateEvent,
    DataTableValueArray
} from 'primereact/datatable';
import {Column, ColumnFilterElementTemplateOptions} from 'primereact/column';
import {Food_List, OrderData} from "../type";
import {baseUrl} from "../utilis/webinfo";
import {Tag} from "primereact/tag";
import {FilterMatchMode} from "primereact/api";
import {Dropdown, DropdownChangeEvent} from "primereact/dropdown";
import {ProgressSpinner} from "primereact/progressspinner";
import {Image} from "primereact/image";


interface FiltersData extends DataTableFilterMeta {
    order_number: { value: string; matchMode: FilterMatchMode };
    order_status_id: { value: {id: number, name: string} | null; matchMode: FilterMatchMode };
    "order_type_id": { value: {id: number, name: string} | null; matchMode: FilterMatchMode };
    cooking_complete_status: { value: {id: number, name: string} | null; matchMode: FilterMatchMode };
    payment_status: { value: {id: number, name: string} | null; matchMode: FilterMatchMode };
}

interface PaginatorController {
    page: number;
    rows: number;
    total?: number;
    rowsPerPageOptions: number[];

}

interface OrderTypes {
    id: number;
    name: string;
    note: string;
    min_order: number;
}

interface OrderStatus {
    id: number;
    name: string;

}

interface DropDownData {
    order_type: OrderTypes[],
    order_status: OrderStatus[]
}

const initialPageControllerObj: PaginatorController = {
    page: 0,
    rows: 10,
    rowsPerPageOptions: [10, 20, 30],
}

export default function OrderTable() {
    const [isLoading, setIsLoading] = useState(true);
    const [tableLoading, setTableLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [orderData, setOrderData] = useState<OrderData[]>([]);
    const [filters, setFilters] = useState<FiltersData>({
        order_number: {value: '', matchMode: FilterMatchMode.CONTAINS},
        "order_status_id": {value: null, matchMode: FilterMatchMode.EQUALS},
        "order_type_id": {value: null, matchMode: FilterMatchMode.EQUALS},
        "cooking_complete_status": {value: null, matchMode: FilterMatchMode.IN},
        payment_status: {value: null, matchMode: FilterMatchMode.EQUALS},
    });
    const [orderTypes, setOrderTypes] = useState<OrderTypes[]>([{id: 1, name: '', note: '', min_order: 1}]);
    const [dropdownData, setDropdownData] = useState<DropDownData>({
        order_type: [],
        order_status: []
    });

    const [filterUrl, setFilterUrl] = useState('');
    const [expandedRows, setExpandedRows] = useState<DataTableExpandedRows | DataTableValueArray | undefined>(undefined);
    const [paginatorController, setPaginatorController] = useState<PaginatorController>(initialPageControllerObj);

    const [totalData, setTotalData] = useState<number>(0)
    const [pageNumber, setPageNumber] = useState<number>(0)
    const [limitData, setLimitData] = useState<number>(10)
    const [currentPage, setCurrentPage] = useState<number>(0)


    useEffect(() => {
        let pages = Math.ceil(pageNumber / limitData + 1);
        setCurrentPage(pages);
    }, [pageNumber, limitData])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const orderTypeDropdownRes = await fetch(`${baseUrl.url}/api/order_type?page=0&size=100`, {headers: {Authorization: `bearer ${baseUrl.token}`}});
                const orderStatusDropdownRes = await fetch(`${baseUrl.url}/api/order_status?page=0&size=100`, {headers: {Authorization: `bearer ${baseUrl.token}`}});
                const orderTypesData = await orderTypeDropdownRes.json();
                const orderStatusData = await orderStatusDropdownRes.json();

                setOrderTypes(orderTypesData?.data?.items);
                setDropdownData(prevState => ({...prevState, order_status: orderStatusData?.data?.items}));
            } catch (error) {
                setHasError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData().then();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setTableLoading(true);
            try {
                const response = await fetch(`${baseUrl.url}/api/order?page=${paginatorController?.page}&size=${paginatorController?.rows}${filterUrl ? filterUrl : ''}`, {headers: {Authorization: `bearer ${baseUrl.token}`}});
                if (response.ok) {
                    const data = await response.json();
                    setOrderData(data?.data?.items);
                    setTotalData(data.data.total)
                    if(!paginatorController?.total){
                        setPaginatorController(prevState => ({...prevState, total: data?.data?.total}));
                    }
                } else {
                    setOrderData([])
                }

            } catch (error) {
                setOrderData([])
                setHasError(true);
            } finally {
                setIsLoading(false);
                setTableLoading(false);
            }
        };

        fetchData().then();
    }, [filterUrl, currentPage]);

    if (isLoading) {
        return <div className={'flex h-screen justify-content-center align-content-center'}>
            <ProgressSpinner/>
        </div>
    }

    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">

            </div>
        );
    };

    const getOrderStatusSeverity = (status: number) => {
        switch (status) {
            case 1:
                return 'warning';

            case 2:
                return 'success';

            case 3:
                return 'danger';


        }
    };
    const getOrderStatusText = (status: number) => {
        switch (status) {
            case 1:
                return 'Processing';

            case 2:
                return 'Completed';

            case 3:
                return 'Cancelled';


        }
    };
    const getFilterUrl = (status: any) => {
        switch (status) {
            case 1:
                return 'Processing';

            case 2:
                return 'Completed';

            case 3:
                return 'Cancelled';


        }
    };


    const orderStatusTemplate = (rowData: OrderData) => {
        return <Tag
            severity={getOrderStatusSeverity(rowData?.order_status_id)}>{getOrderStatusText(rowData?.order_status_id)}</Tag>;
    }

    const cookingCompleteTemplate = (rowData: OrderData) => {

        return rowData.cooking_complete_status === 1 ? <Tag severity={'success'}>Complete</Tag> :
            <Tag severity={'danger'}>Pending</Tag>;
    }

    const paymentStatusTemplate = (rowData: OrderData) => {

        return rowData.payment_status === 1 ? <Tag severity={'success'}>Complete</Tag> :
            <Tag severity={'warning'}>Incomplete</Tag>;
    }

    const dropdownItemTemplate = (dropdownData: DataTableFilterMeta) => {
        return `${dropdownData?.name}`
    }

    const orderTypeTemplate = (rowData: OrderData) => {
        return orderTypes.find((type: { id: number }) => type.id === rowData.order_type_id)?.name;
    }

    const orderTypeRowFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
        return (
            <Dropdown value={options?.value}
                      options={orderTypes?.map((type: any) => ({id: type?.id, name: type?.name}))}
                      optionLabel="name"
                      placeholder="Select order type"
                      className="w-full md:w-14rem"
                      itemTemplate={dropdownItemTemplate}
                      showClear
                      showFilterClear
                      onChange={(e: DropdownChangeEvent) => {

                          // options.value = e.value
                          options.filterApplyCallback(e.value)
                      }}

            />

        );
    };

    const orderStatusRowFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
        return (
            <Dropdown value={options?.value}
                      options={dropdownData.order_status}
                      optionLabel="name"
                      placeholder="Select order type"
                      className="w-full md:w-14rem"
                      itemTemplate={dropdownItemTemplate}
                      showClear={true}
                      showFilterClear
                      onChange={(e: DropdownChangeEvent) => {

                          options.value = e.value
                          options.filterApplyCallback(e.value)
                      }}

            />
        )
    }
    const cookingCompleteStatusRowFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
        return (
            <Dropdown value={options?.value}
                      options={[{id: 1, name: "Complete"}, {id: 2, name: "Pending"}]}
                      optionLabel="name"
                      placeholder="Select order type"
                      className="w-full md:w-14rem"
                      itemTemplate={dropdownItemTemplate}
                      showClear={true}
                      onChange={(e: DropdownChangeEvent) => {

                          options.value = e.value
                          options.filterApplyCallback(e.value)
                      }}

            />
        )
    }
    const paymentStatusRowFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
        return (
            <Dropdown value={options?.value}
                      options={[{id: 1, name: "Complete"}, {id: 2, name: "Incomplete"}]}
                      optionLabel="name"
                      placeholder="Select order type"
                      className="w-full md:w-14rem"
                      itemTemplate={dropdownItemTemplate}
                      showClear={true}
                      showFilterClear
                      onChange={(e: DropdownChangeEvent) => {

                          options.value = e.value
                          options.filterApplyCallback(e.value)
                      }}

            />
        )
    }

    const orderFoodItemTemplate = (rowData: Food_List) => {
        console.log(rowData)
        return <div>
            <Image src={`${baseUrl?.url}${rowData?.food_item.food_photo_url}`} alt={`${rowData?.food_item?.name}`}
                   imageClassName={'small_image'} preview/>
        </div>
    }

    const rowExpansionTemplate = (data: OrderData) => {
        return (
            <div className="p-3">
                <h5>Foodlist for </h5>
                <DataTable value={data?.food_list}>
                    <Column field="id" header="Id" style={{maxWidth: '1rem'}}></Column>
                    <Column field="food_item.name" header="Food name" style={{maxWidth: '5rem'}}></Column>
                    <Column field="food_item.description" header="Description" style={{maxWidth: '10rem'}} ></Column>
                    <Column field="food_item.food_photo_url" header="Image" body={orderFoodItemTemplate} style={{maxWidth: '5rem'}} ></Column>
                    <Column field="food_item.sold_count" header="Sold"></Column>
                </DataTable>
            </div>
        );
    };


    const handleOnFilter = async ({filters}: DataTableFilterMeta) => {



        const filterUrl = Object.entries(filters).reduce((acc: any, [key, value]) => {
            if (!value.value) return acc;
            if (key === "order_number") {
                acc.push(`["${key}","LIKE","${value.value}"]`);
                return acc;

            } else if (typeof value.value === "object") {
                acc.push(`["${key}","${value.value?.id}"]`);
                return acc;
            } else {
                acc.push(`["${key}","${value.value}"]`);
                return acc;

            }
            // return acc
        }, []).join(`,["AND"],`);


        setFilterUrl(`&filters=[${filterUrl}]`);


    }

    const allowExpansion = (rowData: OrderData) => {
        return rowData.food_list.length > 0;
        // return rowData.orders!.length > 0;
    };


    const header = renderHeader();

    const rows = JSON.stringify(paginatorController?.rows)


    console.log("add something.")
    return (
        <div className="card">
            <DataTable value={orderData} dataKey="id" filters={filters} filterDisplay="row"
                       onFilter={handleOnFilter}
                       header={header}
                       loading={tableLoading}
                       emptyMessage="No Order found."
                       expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                       rowExpansionTemplate={rowExpansionTemplate}


            >
                <Column expander={allowExpansion} style={{width: '5rem'}}/>
                <Column field="id" header="Order ID." style={{minWidth: '2rem'}}

                />
                <Column field="order_number" header="Order Number." filter filterPlaceholder="Search by Order number"
                        showFilterMenu={false} style={{minWidth: '12rem'}}/>
                <Column field="order_status_id" header="Order Status" body={orderStatusTemplate} filter
                        filterElement={orderStatusRowFilterTemplate} showFilterMenu={false}
                        filterPlaceholder="Search by name" filterField={"order_status_id"}
                        style={{minWidth: '12rem'}}/>
                <Column field="order_type_id" filterField={'order_type_id'} header="Order Type" body={orderTypeTemplate}
                        filter filterElement={orderTypeRowFilterTemplate} showFilterMenu={false}
                        filterPlaceholder="Search by name"
                        style={{minWidth: '12rem'}}/>
                <Column field="cooking_complete_status" header="Cooking Complete status" body={cookingCompleteTemplate}
                        showFilterMenu={false}
                        filter filterElement={cookingCompleteStatusRowFilterTemplate} filterPlaceholder="Search by name"
                        style={{minWidth: '12rem'}}/>
                <Column field="payment_status" header="Payment Status" body={paymentStatusTemplate}
                        showFilterMenu={false}
                        filter filterElement={paymentStatusRowFilterTemplate} filterPlaceholder="Search by name"
                        style={{minWidth: '12rem'}}/>

            </DataTable>
        </div>
    );
}

