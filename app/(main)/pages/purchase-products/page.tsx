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
import { useSelector } from 'react-redux';
import { Dropdown } from 'primereact/dropdown';
import { _fetchCountries } from '@/app/redux/actions/countriesActions';
import { _fetchTelegramList } from '@/app/redux/actions/telegramActions';
import { AppDispatch } from '@/app/redux/store';
import { PurchasedProduct } from '@/types/interface';
import { ProgressBar } from 'primereact/progressbar';
import { _fetchResellers } from '@/app/redux/actions/resellerActions';
import { InputTextarea } from 'primereact/inputtextarea';
import { _addPurchasedProduct, _deletePurchasedProduct, _editPurchasedProduct, _fetchPurchasedProducts } from '@/app/redux/actions/purchasedProductsActions';
import { purchasedProductsReducer } from '../../../redux/reducers/purchasedProductsReducer';
import { _fetchSuppliers } from '@/app/redux/actions/supplierActions';
import { _fetchServiceList } from '@/app/redux/actions/serviceActions';
import { suppliersReducer } from '../../../redux/reducers/supplierReducer';
import serviceReducer from '../../../redux/reducers/serviceReducer';
import withAuth from '../../authGuard';
import { useTranslation } from 'react-i18next';

const PurchasedProductPage = () => {

    let emptyPurchasedProduct:PurchasedProduct={
        id: 0,
        supplier_id: 0,
        service_id: 0,
        product_name: '',
        quantity: 0,
        purchase_price: '',
        purchase_date: '',
        status: 1,
        created_at: '',
        updated_at: '',
        supplier: null,
        service: null,
    }


    const [purchasedProductDialog, setPurchasedProductDialog] = useState(false);
    const [deletePurchasedProductDialog, setDeletePurchasedProductDialog] = useState(false);
    const [deletePurchasedProductsDialog, setDeletePurchasedProductsDialog] = useState(false);
    const [purchasedProduct,setPurchasedProduct]=useState<PurchasedProduct>(emptyPurchasedProduct)
    const [selectedCompanies, setSelectedPurchasedProduct] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);
    const dispatch=useDispatch<AppDispatch>()
    const {purchasedProducts,loading}=useSelector((state:any)=>state.purchasedProductsReducer)
    const {suppliers}=useSelector((state:any)=>state.suppliersReducer)
    const {services}=useSelector((state:any)=>state.serviceReducer)
    const {t}=useTranslation()



    useEffect(()=>{
        dispatch(_fetchPurchasedProducts())
        dispatch(_fetchSuppliers())
        dispatch(_fetchServiceList())
    },[dispatch])

    const openNew = () => {
        setPurchasedProduct(emptyPurchasedProduct)
        setSubmitted(false);
        setPurchasedProductDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setPurchasedProductDialog(false);
    };

    const hideDeletePurchasedProductDialog = () => {
        setDeletePurchasedProductDialog(false);
    };

    const hideDeletePurchasedProductsDialog = () => {
        setDeletePurchasedProductsDialog(false);
    };



    const savePurchasedProduct = () => {
        setSubmitted(true);
        if (purchasedProduct.id && purchasedProduct.id !== 0) {
            dispatch(_editPurchasedProduct(purchasedProduct.id,purchasedProduct,toast));

        } else {
            dispatch(_addPurchasedProduct(purchasedProduct,toast));
        }

        setPurchasedProductDialog(false);
        setPurchasedProduct(emptyPurchasedProduct);
    };

    const editPurchasedProduct = (purchasedProduct: PurchasedProduct) => {
        setPurchasedProduct({ ...purchasedProduct});

        setPurchasedProductDialog(true);
    };

    const confirmDeletePurchasedProduct = (purchasedProduct: PurchasedProduct) => {
        setPurchasedProduct(purchasedProduct);
        setDeletePurchasedProductDialog(true);
    };

    const deletePurchasedProduct = () => {
        if (!purchasedProduct?.id) {
            console.error("PurchasedProduct  ID is undefined.");
            return;
        }
        dispatch(_deletePurchasedProduct(purchasedProduct?.id,toast))
        setDeletePurchasedProductDialog(false);

    };


    const confirmDeleteSelected = () => {
        setDeletePurchasedProductsDialog(true);
    };



    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label={t('PURCHASEDPRODUCT.TABLE.CREATEPURCHASEDPRODUCT')} icon="pi pi-plus" severity="success" className=" mr-2" onClick={openNew} />
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
                    <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder={t('ECOMMERCE.COMMON.SEARCH')}  />
            </span>
            </React.Fragment>
        );
    };


    const supplierNameBodyTemplate = (rowData: PurchasedProduct) => {
        return (
            <>
                <span className="p-column-title">Supplier</span>
                {rowData.supplier?.supplier_name}
            </>
        );
    };

    const productNameBodyTemplate = (rowData: PurchasedProduct) => {
        return (
            <>
                <span className="p-column-title">Product Name</span>
                {rowData.product_name}
            </>
        );
    };


    const quantityBodyTemplate = (rowData: PurchasedProduct) => {
        return (
            <>
                <span className="p-column-title">Quantity</span>
                {rowData.quantity}
            </>
        );
    };

    const purchasePriceBodyTemplate = (rowData: PurchasedProduct) => {
        return (
            <>
                <span className="p-column-title">Purchase Price</span>
                {rowData.purchase_price}
            </>
        );
    };



    const serviceBodyTemplate = (rowData: PurchasedProduct) => {
        return (
            <>
                <span className="p-column-title">Service</span>
                {rowData.service?.company?.company_name}
            </>
        );
    };

    const purchasedProductDateBodyTemplate = (rowData: PurchasedProduct) => {
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

            const { formattedDate, formattedTime } = formatDate(rowData.purchase_date);

            return (
                <>
                    <span className="p-column-title">Created At</span>
                    <span style={{ fontSize: '0.8rem', color: '#666' }}>{formattedDate}</span>
                    <br />
                    <span style={{ fontSize: '0.8rem', color: '#666' }}>{formattedTime}</span>
                </>
            );
        };




    const actionBodyTemplate = (rowData: PurchasedProduct) => {
        return (
            <>
                <Button icon="pi pi-pencil" rounded severity="success" className="mr-2"  onClick={()=>editPurchasedProduct(rowData)}/>
                <Button icon="pi pi-trash" rounded severity="warning" onClick={() => confirmDeletePurchasedProduct(rowData)} />
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

    const purchasedProductDialogFooter = (
        <>
            <Button label={t('APP.GENERAL.CANCEL')} icon="pi pi-times" text onClick={hideDialog} />
            <Button label={t('FORM.GENERAL.SUBMIT')} icon="pi pi-check" text onClick={savePurchasedProduct} />
        </>
    );
    const deletePurchasedProductDialogFooter = (
        <>
            <Button label={t('APP.GENERAL.CANCEL')} icon="pi pi-times" text onClick={hideDeletePurchasedProductDialog} />
            <Button label={t('FORM.GENERAL.SUBMIT')} icon="pi pi-check" text onClick={deletePurchasedProduct} />
        </>
    );
    const deleteCompaniesDialogFooter = (
        <>
            <Button label={t('APP.GENERAL.CANCEL')} icon="pi pi-times" text onClick={hideDeletePurchasedProductsDialog} />
            <Button label={t('FORM.GENERAL.SUBMIT')} icon="pi pi-check" text  />
        </>
    );




    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    {loading && <ProgressBar mode="indeterminate" style={{ height: '6px' }} />}
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <DataTable
                        ref={dt}
                        value={purchasedProducts}
                        selection={selectedCompanies}
                        onSelectionChange={(e) => setSelectedPurchasedProduct(e.value as any)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} purchasedProduct code"
                        globalFilter={globalFilter}
                        emptyMessage="No PurchasedProduct s found."
                        // header={header}
                        responsiveLayout="scroll"
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
                        <Column header={t('PURCHASEDPRODUCT.TABLE.COLUMN.SUPPLIER')} body={supplierNameBodyTemplate} sortable></Column>
                        <Column header={t('PURCHASEDPRODUCT.TABLE.COLUMN.PRODUCTNAME')} body={productNameBodyTemplate} sortable></Column>
                        <Column header={t('PURCHASEDPRODUCT.TABLE.COLUMN.QUANTITY')} body={quantityBodyTemplate} sortable></Column>
                        <Column header={t('PURCHASEDPRODUCT.TABLE.COLUMN.PURCHASEPRICE')} body={purchasePriceBodyTemplate} sortable></Column>
                        <Column header={t('PURCHASEDPRODUCT.TABLE.COLUMN.PURCHASEDATE')} body={purchasedProductDateBodyTemplate} sortable></Column>
                        <Column header={t('PURCHASEDPRODUCT.TABLE.COLUMN.SERVICE')} body={serviceBodyTemplate} sortable></Column>
                        <Column body={actionBodyTemplate} ></Column>
                    </DataTable>

                    <Dialog visible={purchasedProductDialog}  style={{ width: '750px' }} header="Purchased Product Details" modal className="p-fluid" footer={purchasedProductDialogFooter} onHide={hideDialog}>
                    <div className="card flex flex-column md:flex-row gap-3">
                        <div>
                            <div className="field col flex-1">
                                <label htmlFor="supplier">{t('PURCHASEDPRODUCT.FORM.INPUT.SUPPLIER')}</label>
                                <Dropdown
                                    id="supplier"
                                    value={purchasedProduct.supplier}
                                    options={suppliers}
                                    onChange={(e) =>
                                        setPurchasedProduct((prev) => ({

                                            ...prev,
                                            supplier: e.value,
                                        }))
                                    }
                                    optionLabel='supplier_name'
                                    // optionValue='id'
                                    placeholder="Choose a supplier"
                                    className="w-full"
                                />
                            </div>

                            <div className="field col flex-1">
                                <label htmlFor="product_name">{t('PURCHASEDPRODUCT.FORM.INPUT.PRODUCTNAME')}</label>
                                <InputText
                                    id="product_name"
                                    value={purchasedProduct.product_name}
                                    onChange={(e) =>
                                        setPurchasedProduct((prev) => ({
                                            ...prev,
                                            product_name: e.target.value,
                                        }))
                                    }
                                    required
                                    autoFocus
                                    className={classNames({
                                        'p-invalid': submitted && !purchasedProduct.product_name
                                    })}
                                />
                                {submitted && !purchasedProduct.product_name && <small className="p-invalid">Product Name is required.</small>}
                            </div>
                            <div className="field col flex-1">
                                <label htmlFor="purchase_price">{t('PURCHASEDPRODUCT.FORM.INPUT.PURCHASEPRICE')}</label>
                                <InputText
                                    id="purchase_price"
                                    value={purchasedProduct.purchase_price}
                                    onChange={(e) =>
                                        setPurchasedProduct((prev) => ({
                                            ...prev,
                                            purchase_price: e.target.value,
                                        }))
                                    }
                                    required
                                    autoFocus
                                    className={classNames({
                                        'p-invalid': submitted && !purchasedProduct.purchase_price
                                    })}
                                />
                                {submitted && !purchasedProduct.purchase_price && <small className="p-invalid">Purchase Price is required.</small>}
                            </div>
                            <div className="field">
                                <label htmlFor="status">{t('PURCHASEDPRODUCT.FORM.INPUT.STATUS')}</label>
                                <Dropdown
                                    id="status"
                                    value={purchasedProduct.status}
                                    options={[
                                        { label: 'Active', value: 1 },
                                        { label: 'Inactive', value: 0 },
                                    ]}
                                    onChange={(e) =>
                                        setPurchasedProduct((prev) => ({
                                            ...prev,
                                            status: e.value,
                                        }))
                                    }
                                    optionLabel="label"
                                    optionValue="value"
                                    placeholder="Choose a status"
                                    className="w-full"
                                />
                            </div>

                        </div>
                        <br />
                        <div>
                            <div className="field col flex-1">
                                <label htmlFor="service">{t('PURCHASEDPRODUCT.FORM.INPUT.SERVICE')}</label>
                                <Dropdown
                                    id="service"
                                    value={purchasedProduct.service}
                                    options={services}
                                    onChange={(e) =>
                                        setPurchasedProduct((prev) => ({
                                            ...prev,
                                            service: e.value,
                                        }))
                                    }
                                    optionLabel='company.company_name'
                                    // optionValue='id'
                                    placeholder="Choose a Type"
                                    className="w-full"
                                    itemTemplate={(option) => (
                                        <div style={{display:'flex', gap:"5px"}}>
                                            <div>{option.service_category?.category_name}</div>
                                            <div>{option.company?.company_name}</div>
                                        </div>
                                    )}
                                />
                            </div>


                            <div className="field col flex-1">
                                <label htmlFor="purchasedProduct_date">{t('PURCHASEDPRODUCT.FORM.INPUT.QUANTITY')}</label>
                                <InputText
                                    id="quantity"
                                    value={purchasedProduct.quantity.toString()}
                                    onChange={(e) =>
                                        setPurchasedProduct((prev) => ({
                                            ...prev,
                                            quantity: parseInt(e.target.value),
                                        }))
                                    }
                                    required
                                    autoFocus
                                    className={classNames({
                                        'p-invalid': submitted && !purchasedProduct.quantity
                                    })}
                                />
                            </div>

                            <div className="field col flex-1">
                                <label htmlFor="purchase_date">{t('PURCHASEDPRODUCT.FORM.INPUT.PURCHASEDATE')}</label>
                                <InputText
                                    id="purchase_date"
                                    value={purchasedProduct.purchase_date}
                                    onChange={(e) =>
                                        setPurchasedProduct((prev) => ({
                                            ...prev,
                                            purchase_date: e.target.value,
                                        }))
                                    }
                                    required
                                    autoFocus
                                    className={classNames({
                                        'p-invalid': submitted && !purchasedProduct.purchase_date
                                    })}
                                />
                            </div>
                        </div>


                    </div>
                    </Dialog>

                    <Dialog visible={deletePurchasedProductDialog} style={{ width: '450px' }} header={t('TABLE.GENERAL.CONFIRM')} modal footer={deletePurchasedProductDialogFooter} onHide={hideDeletePurchasedProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {purchasedProduct && (
                                <span>
                                    Are you sure you want to delete <b></b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deletePurchasedProductsDialog} style={{ width: '450px' }} header={t('TABLE.GENERAL.CONFIRM')} modal footer={deleteCompaniesDialogFooter} onHide={hideDeletePurchasedProductsDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {purchasedProduct && <span>Are you sure you want to delete the selected companies?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default withAuth(PurchasedProductPage);
