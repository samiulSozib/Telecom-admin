/* eslint-disable @next/next/no-img-element */
'use client';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { _fetchCompanies,_deleteCompany, _addCompany,_editCompany } from '@/app/redux/actions/companyActions';
import { useSelector } from 'react-redux';
import { Dropdown } from 'primereact/dropdown';
import { Paginator } from 'primereact/paginator';
import { AppDispatch } from '@/app/redux/store';
import { Order } from '@/types/interface';
import { ProgressBar } from 'primereact/progressbar';
import { _deleteOrder, _fetchOrders } from '@/app/redux/actions/orderActions';

const OrderPage = () => {



    const [orderDialog, setOrderDialog] = useState(false);
    const [deleteOrderDialog, setDeleteOrderDialog] = useState(false);
    const [deleteOrdersDialog, setDeleteOrdersDialog] = useState(false);
    const [selectedCompanies, setSelectedCompanyCode] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);
    const dispatch=useDispatch<AppDispatch>()
    const {orders,pagination,loading}=useSelector((state:any)=>state.orderReducer)
    const [order,setOrder]=useState<Order>();



    useEffect(()=>{
        dispatch(_fetchOrders())
    },[dispatch])






    const hideDialog = () => {
        setSubmitted(false);
        setOrderDialog(false);
    };

    const hideDeleteOrderDialog = () => {
        setDeleteOrderDialog(false);
    };

    const hideDeleteOrdersDialog = () => {
        setDeleteOrdersDialog(false);
    };






    const confirmDeleteOrder = (order: Order) => {
        setOrder(order);
        setDeleteOrderDialog(true);
    };

    const deleteOrder = () => {
        if (!order?.id) {
            console.error("Order ID is undefined.");
            return;
        }
        dispatch(_deleteOrder(order?.id,toast))
        setDeleteOrderDialog(false);

    };


    const confirmDeleteSelected = () => {
        setDeleteOrdersDialog(true);
    };



    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    {/* <Button label="New" icon="pi pi-plus" severity="success" className=" mr-2" onClick={openNew} /> */}
                    <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedCompanies || !(selectedCompanies as any).length} />
                </div>
            </React.Fragment>
        );
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <span className="block mt-2 md:mt-0 p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." />
            </span>
            </React.Fragment>
        );
    };

    const resellerNameBodyTemplate = (rowData: Order) => {
        return (
            <>
                <span className="p-column-title">Reseller Name</span>
                <span style={{ fontSize: '0.8rem', color: '#666' }}>
                    {rowData.reseller?.reseller_name}
                </span>
            </>
        );
    };

    const rechargeableAccountBodyTemplate = (rowData: Order) => {
        return (
            <>
                <span className="p-column-title">Account</span>
                <span style={{ fontSize: '0.8rem', color: '#666' }}>
                    {rowData.rechargeble_account}
                </span>
            </>
        );
    };

    const bundleIdBodyTemplate = (rowData: Order) => {
        return (
            <>
                <span className="p-column-title">Bundle ID</span>
                <span style={{ fontSize: '0.8rem', color: '#666' }}>
                    {rowData.bundle?.id}
                </span>
            </>
        );
    };

    const payableAmountBodyTemplate = (rowData: Order) => {
        return (
            <>
                <span className="p-column-title">Payable Amount</span>
                <span style={{ fontSize: '0.8rem', color: '#666' }}>
                    {rowData.bundle?.buying_price}
                </span>
            </>
        );
    };

    const bundleTitleBodyTemplate = (rowData: Order) => {
        return (
            <>
                <span className="p-column-title">Bundle Title</span>
                <span style={{ fontSize: '0.8rem', color: '#666' }}>
                    {rowData.bundle?.bundle_title}
                </span>
            </>
        );
    };

    const rejectedReasonBodyTemplate = (rowData: Order) => {
        return (
            <>
                <span className="p-column-title">Reject Reason</span>
                <span style={{ fontSize: '0.8rem', color: '#666' }}>
                    {rowData.reject_reason}
                </span>
            </>
        );
    };

    const companyNameBodyTemplate = (rowData: Order) => {
        return (
            <>
                <span className="p-column-title">Company Name</span>
                <span style={{ fontSize: '0.8rem', color: '#666' }}>
                    {rowData.bundle?.service?.company?.company_name}
                </span>
            </>
        );
    };

    const categoryNameNameBodyTemplate = (rowData: Order) => {
        return (
            <>
                <span className="p-column-title">Category Name</span>
                <span style={{ fontSize: '0.8rem', color: '#666' }}>
                    {rowData.bundle?.service?.service_category?.category_name}
                </span>
            </>
        );
    };


    const createdAtBodyTemplate = (rowData: Order) => {
        const formatDate = (dateString: string) => {
            const date = new Date(dateString);
            const optionsDate: Intl.DateTimeFormatOptions = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            };
            const optionsTime: Intl.DateTimeFormatOptions = {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            };
            const formattedDate = date.toLocaleDateString('en-US', optionsDate);
            const formattedTime = date.toLocaleTimeString('en-US', optionsTime);

            return { formattedDate, formattedTime };
        };

        const { formattedDate, formattedTime } = formatDate(rowData.created_at);

        return (
            <>
                <span className="p-column-title">Created At</span>
                <span style={{ fontSize: '0.8rem', color: '#666' }}>{formattedDate}</span>
                <br />
                <span style={{ fontSize: '0.8rem', color: '#666' }}>{formattedTime}</span>
            </>
        );
    };

const statusBodyTemplate = (rowData: Order) => {
            // Define the text and background color based on the status value
            const getStatusText = (status: number) => {
                return status === 1 ? 'Active' : 'Deactivated';
            };

            const getStatusClasses = (status: number) => {
                return status === 1
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white';
            };

            return (
                <>
                    <span className="p-column-title">Status</span>
                    <span style={{borderRadius:"5px"}}
                        className={`inline-block px-2 py-1 rounded text-sm font-semibold ${getStatusClasses(
                            rowData.status
                        )}`}
                    >
                        {getStatusText(rowData.status)}
                    </span>
                </>
            );
        };





    const actionBodyTemplate = (rowData: Order) => {
        return (
            <>
                {/* <Button icon="pi pi-pencil" rounded severity="success" className="mr-2"  onClick={()=>editOrder(rowData)}/> */}
                <Button icon="pi pi-trash" rounded severity="warning" onClick={() => confirmDeleteOrder(rowData)} />
            </>
        );
    };

    // const header = (
    //     <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
    //         <h5 className="m-0">Manage Products</h5>
    //         <span className="block mt-2 md:mt-0 p-input-icon-left">
    //             <i className="pi pi-search" />
    //             <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." />
    //         </span>
    //     </div>
    // );

    const companyDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" text onClick={()=>{}} />
        </>
    );
    const deleteCompanyDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteOrderDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteOrder} />
        </>
    );
    const deleteCompaniesDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteOrdersDialog} />
            <Button label="Yes" icon="pi pi-check" text  />
        </>
    );

    const onPageChange = (event: any) => {
        const page = event.page + 1;
        dispatch(_fetchOrders(page));
    };


    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                {loading && <ProgressBar mode="indeterminate" style={{ height: '6px' }} />}
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <DataTable
                        ref={dt}
                        value={orders}
                        selection={selectedCompanies}
                        onSelectionChange={(e) => setSelectedCompanyCode(e.value as any)}
                        dataKey="id"
                        className="datatable-responsive"
                        globalFilter={globalFilter}
                        emptyMessage="No order found."
                        // header={header}
                        responsiveLayout="scroll"
                        paginator={false} // Disable PrimeReact's built-in paginator
                        rows={pagination?.items_per_page}
                        totalRecords={pagination?.total}
                        currentPageReportTemplate={`Showing {first} to {last} of {totalRecords} items`}
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
                        <Column field="" header="Reseller Name" sortable body={resellerNameBodyTemplate} headerStyle={{ fontSize: '0.9rem', color: '#000' }}></Column>
                        <Column field="" header="Rechargeable Account" sortable body={rechargeableAccountBodyTemplate} headerStyle={{ fontSize: '0.9rem', color: '#000' }}></Column>
                        <Column field="" header="Bundle ID" sortable body={bundleIdBodyTemplate} headerStyle={{ fontSize: '0.9rem', color: '#000' }}></Column>
                        <Column field="" header="Payable Amount" sortable body={payableAmountBodyTemplate} headerStyle={{ fontSize: '0.9rem', color: '#000' }}></Column>
                        <Column field="" header="Bundle Title" sortable body={bundleTitleBodyTemplate} headerStyle={{ fontSize: '0.9rem', color: '#000' }}></Column>
                        <Column field="" header="Reject Reason" sortable body={rejectedReasonBodyTemplate} headerStyle={{ fontSize: '0.9rem', color: '#000' }}></Column>
                        <Column field="" header="Company" sortable body={companyNameBodyTemplate} headerStyle={{ fontSize: '0.9rem', color: '#000' }}></Column>
                        <Column field="" header="Category" sortable body={categoryNameNameBodyTemplate} headerStyle={{ fontSize: '0.9rem', color: '#000' }}></Column>
                        <Column field="" header="Order Date" sortable body={createdAtBodyTemplate} headerStyle={{ fontSize: '0.9rem', color: '#000' }}></Column>
                        <Column field="" header="Status" sortable body={statusBodyTemplate} headerStyle={{ fontSize: '0.9rem', color: '#000' }}></Column>
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>
                    <Paginator
                        first={(pagination?.page - 1) * pagination?.items_per_page}
                        rows={pagination?.items_per_page}
                        totalRecords={pagination?.total}
                        onPageChange={(e) => onPageChange(e)}
                        template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    />


                    <Dialog visible={orderDialog}  style={{ width: '700px' }} header="Bundle Details" modal className="p-fluid" footer={companyDialogFooter} onHide={hideDialog}>
                        {/* <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="name">Bundle Title</label>
                                <InputText
                                    id="bundle_title"
                                    value={bundle.bundle_title}
                                    onChange={(e) =>
                                        setBundle((perv) => ({
                                            ...perv,
                                            bundle_title: e.target.value,
                                        }))
                                    }
                                    required
                                    autoFocus
                                    className={classNames({
                                        'p-invalid': submitted && !bundle.bundle_title
                                    })}
                                />
                                {submitted && !bundle.bundle_title && <small className="p-invalid">Bundle Title is required.</small>}
                            </div>

                            <div className="field col">
                                <label htmlFor="name">Bundle Description</label>
                                <InputText
                                    id="bundle_description"
                                    value={bundle.bundle_description}
                                    onChange={(e) =>
                                        setBundle((perv) => ({
                                            ...perv,
                                            bundle_description: e.target.value,
                                        }))
                                    }
                                    required
                                    autoFocus
                                    className={classNames({
                                        'p-invalid': submitted && !bundle.bundle_description
                                    })}
                                />
                                {submitted && !bundle.bundle_description && <small className="p-invalid">Bundle Description is required.</small>}
                            </div>
                        </div> */}



                    </Dialog>

                    <Dialog visible={deleteOrderDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteCompanyDialogFooter} onHide={hideDeleteOrderDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {order && (
                                <span>
                                    Are you sure you want to delete <b>{order.rechargeble_account}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteOrdersDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteCompaniesDialogFooter} onHide={hideDeleteOrdersDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {order && <span>Are you sure you want to delete the selected companies?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
