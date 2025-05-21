import React, {useEffect, useState} from 'react';
import {DataTable, DataTableFilterMeta} from "primereact/datatable";
import {Column, ColumnFilterElementTemplateOptions} from "primereact/column";
import {Dropdown, DropdownChangeEvent} from "primereact/dropdown";
import {FilterMatchMode} from "primereact/api";
import useFetch from "../hook/UseFetch";


const Home = () => {
    const [orderUrl, setOrderUrl] = useState<string>("/api/order?page=0&size=100");
    const {data: {data: orders}, isLoading} = useFetch(orderUrl);
    const {data: {data: orderStatues}} = useFetch("/api/order_status?page=0&size=100")
    const [filters, setFilters] = useState<DataTableFilterMeta>({
        order_number: {value: '', matchMode: FilterMatchMode.CONTAINS},
        'order_status.name': {value: null, matchMode: FilterMatchMode.EQUALS},
    });



    const buildOrderFilterQuery = (filterMeta: any) => {
        const filterParams: any[] = [];

        if (filterMeta?.order_number?.value !== '') {
            filterParams.push(["order_number", "like", `${filterMeta?.order_number?.value}`]);
        }

        // if (filterMeta['order_status.name']?.value !== null && filterMeta['order_status.name']?.value !== undefined) {
        //     if (filterParams.length > 0) {
        //         filterParams.push(["AND"]);
        //     }
        //     filterParams.push(["order_status_id", filterMeta['order_status.name'].value.id]);
        // }

        if (filterMeta['order_status.name']?.value) {
            const selectedStatus = orderStatues?.items?.find(
                (status: any) => status.name === filterMeta['order_status.name'].value
            );

            if (selectedStatus) {
                if (filterParams.length > 0) {
                    filterParams.push(["AND"]);
                }
                filterParams.push(["order_status_id", selectedStatus.id]);
            }
        }

        return filterParams.length > 0
            ? `/api/order?page=0&size=100&filters=${JSON.stringify(filterParams)}`
            : `/api/order?page=0&size=100`;
    };

    const onGlobalFilterChange = (e: { filters: DataTableFilterMeta }) => {

        const newFilters = e.filters;



        setFilters(newFilters);
        const url = buildOrderFilterQuery(newFilters);
        console.log("url", url);
        setOrderUrl(url);
    };
    console.log(orders)

    const statusBodyTemplate = (rowData: any) => {
        return <p>{rowData.order_status.name}</p>;
    };

    const statusRowFilterTemplate = (option: ColumnFilterElementTemplateOptions) => {



        return (
            <Dropdown value={orderStatues?.items?.find((item: any) => item?.name === option?.value)}
                      onChange={(e: DropdownChangeEvent) => {
                          option.filterApplyCallback(e.value ? e.value.name : null);
                      }}
                      options={orderStatues?.items} placeholder="Select Status" optionLabel={'name'} filter
                      showClear
                      filterBy={'id'} showFilterClear className="p-column-filter" style={{minWidth: '12rem'}}/>
        );
    };


    return (
        <div className="card">
            <DataTable value={orders.items} loading={isLoading} paginator rows={10} dataKey="id" filters={filters}
                       filterDisplay="row"
                       globalFilterFields={['order_number', 'order_status.name']} emptyMessage="No orders found."
                       onFilter={onGlobalFilterChange}>
                <Column field="order_number" header="Order ID" filter filterPlaceholder="Search by order ID"
                        style={{minWidth: '12rem'}}/>
                <Column field="order_status.name" header="Status" showFilterMenu={false}
                        filterMenuStyle={{width: '14rem'}} style={{minWidth: '12rem'}} body={statusBodyTemplate} filter
                        filterElement={statusRowFilterTemplate}/>
            </DataTable>
        </div>
    );
};

export default Home;