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
import { _addService, _deleteService, _editService, _fetchServiceList } from '@/app/redux/actions/serviceActions';
import { _fetchServiceCategories } from '@/app/redux/actions/serviceCategoryActions';
import { _addBundle, _deleteBundle, _editBundle, _fetchBundleList } from '@/app/redux/actions/bundleActions';
import { Paginator } from 'primereact/paginator';
import { _fetchCurrencies } from '@/app/redux/actions/currenciesActions';
import { currenciesReducer } from '../../../redux/reducers/currenciesReducer';
import { AppDispatch } from '@/app/redux/store';
import { Bundle } from '@/types/interface';
import { ProgressBar } from 'primereact/progressbar';
import withAuth from '../../authGuard';
import { useTranslation } from 'react-i18next';

const BundlePage = () => {



    let emptyBundle:Bundle = {
        id: 0,
        bundle_code: "",
        service_id: 0,
        bundle_title: "",
        bundle_description: "",
        bundle_type: '',
        validity_type: "",
        admin_buying_price: "",
        buying_price: "",
        selling_price: "",
        amount: '',
        bundle_image_url: '',
        currency_id: 0,
        expired_date: '',
        deleted_at: '',
        created_at: "",
        updated_at: "",
        service: null ,
        currency: null,
    };

    const [serviceDialog, setServiceDialog] = useState(false);
    const [deleteServiceDialog, setDeleteServiceDialog] = useState(false);
    const [deleteServicesDialog, setDeleteServicesDialog] = useState(false);
    const [bundle,setBundle]=useState<Bundle>(emptyBundle);
    const [selectedCompanies, setSelectedCompanyCode] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);
    const dispatch=useDispatch<AppDispatch>()
    const {companies}=useSelector((state:any)=>state.companyReducer)
    const {services}=useSelector((state:any)=>state.serviceReducer)
    const {serviceCategories}=useSelector((state:any)=>state.serviceCategoryReducer)
    const {bundles,pagination,loading}=useSelector((state:any)=>state.bundleReducer)
    const {currencies}=useSelector((state:any)=>state.currenciesReducer)
    const {t}=useTranslation()



    useEffect(()=>{
        dispatch(_fetchBundleList())
        dispatch(_fetchCurrencies())
        dispatch(_fetchServiceList())
        dispatch(_fetchCompanies())
        dispatch(_fetchServiceCategories())
    },[dispatch])

    useEffect(()=>{
        //console.log(bundles)
    },[dispatch,bundles])


    const openNew = () => {
        setBundle(emptyBundle)
        setSubmitted(false);
        setServiceDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setServiceDialog(false);
    };

    const hideDeleteServiceDialog = () => {
        setDeleteServiceDialog(false);
    };

    const hideDeleteServicesDialog = () => {
        setDeleteServicesDialog(false);
    };



    const saveService = () => {
        setSubmitted(true);
        if (bundle.id && bundle.id !== 0) {
            dispatch(_editBundle(bundle.id,bundle,toast));

        } else {
            dispatch(_addBundle(bundle,toast));
        }

        setServiceDialog(false);
        setBundle(emptyBundle);
    };

    const editService = (bundle: Bundle) => {
        setBundle({ ...bundle});

        setServiceDialog(true);
    };

    const confirmDeleteService = (bundle: Bundle) => {
        setBundle(bundle);
        setDeleteServiceDialog(true);
    };

    const deleteService = () => {
        if (!bundle?.id) {
            console.error("Service ID is undefined.");
            return;
        }
        dispatch(_deleteBundle(bundle?.id,toast))
        setDeleteServiceDialog(false);

    };


    const confirmDeleteSelected = () => {
        setDeleteServicesDialog(true);
    };



    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label={t('BUNDLE.TABLE.CREATEBUNDLE')} icon="pi pi-plus" severity="success" className=" mr-2" onClick={openNew} />
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

    const bundleTitleBodyTemplate = (rowData: Bundle) => {
        return (
            <>
                <span className="p-column-title">Bundle Title</span>
                <span style={{ fontSize: '0.8rem', color: '#666' }}>
                    {rowData.bundle_title}
                </span>
            </>
        );
    };

    const descriptionBodyTemplate = (rowData: Bundle) => {
        return (
            <>
                <span className="p-column-title">Description</span>
                <span style={{ fontSize: '0.8rem', color: '#666' }}>
                    {rowData.bundle_description}
                </span>
            </>
        );
    };

    const validityTypeBodyTemplate = (rowData: Bundle) => {
        return (
            <>
                <span className="p-column-title">Validity Type</span>
                <span style={{ fontSize: '0.8rem', color: '#666' }}>
                    {rowData.validity_type}
                </span>
            </>
        );
    };

    const adminBuyingPriceBodyTemplate = (rowData: Bundle) => {
        return (
            <>
                <span className="p-column-title">Admin Buying Price</span>
                <span style={{ fontSize: '0.8rem', color: '#666' }}>
                    {rowData.admin_buying_price}
                </span>
            </>
        );
    };

    const buyingPriceBodyTemplate = (rowData: Bundle) => {
        return (
            <>
                <span className="p-column-title">Buying Price</span>
                <span style={{ fontSize: '0.8rem', color: '#666' }}>
                    {rowData.buying_price}
                </span>
            </>
        );
    };

    const sellingPriceBodyTemplate = (rowData: Bundle) => {
        return (
            <>
                <span className="p-column-title">Selling Price</span>
                <span style={{ fontSize: '0.8rem', color: '#666' }}>
                    {rowData.selling_price}
                </span>
            </>
        );
    };

    const currencyBodyTemplate = (rowData: Bundle) => {
        return (
            <>
                <span className="p-column-title">Currency</span>
                <span style={{ fontSize: '0.8rem', color: '#666' }}>
                    {rowData.currency?.name}
                </span>
            </>
        );
    };

    const serviceNameBodyTemplate = (rowData: Bundle) => {
        return (
            <>
                <span className="p-column-title">Service Name</span>
                <span style={{ fontSize: '0.8rem', color: '#666' }}>
                    {rowData.service?.company?.company_name}
                </span>
            </>
        );
    };

    const serviceCategoryBodyTemplate = (rowData: Bundle) => {
        return (
            <>
                <span className="p-column-title">Service Category</span>
                <span style={{ fontSize: '0.8rem', color: '#666' }}>
                    {rowData.service?.service_category?.category_name}
                </span>
            </>
        );
    };

    const createdAtBodyTemplate = (rowData: Bundle) => {
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







    const actionBodyTemplate = (rowData: Bundle) => {
        return (
            <>
                <Button icon="pi pi-pencil" rounded severity="success" className="mr-2"  onClick={()=>editService(rowData)}/>
                <Button icon="pi pi-trash" rounded severity="warning" onClick={() => confirmDeleteService(rowData)} />
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
            <Button label={t('APP.GENERAL.CANCEL')} icon="pi pi-times" text onClick={hideDialog} />
            <Button label={t('FORM.GENERAL.SUBMIT')} icon="pi pi-check" text onClick={saveService} />
        </>
    );
    const deleteCompanyDialogFooter = (
        <>
            <Button label={t('APP.GENERAL.CANCEL')} icon="pi pi-times" text onClick={hideDeleteServiceDialog} />
            <Button label={t('FORM.GENERAL.SUBMIT')} icon="pi pi-check" text onClick={deleteService} />
        </>
    );
    const deleteCompaniesDialogFooter = (
        <>
            <Button label={t('APP.GENERAL.CANCEL')} icon="pi pi-times" text onClick={hideDeleteServicesDialog} />
            <Button label={t('FORM.GENERAL.SUBMIT')} icon="pi pi-check" text  />
        </>
    );

    const onPageChange = (event: any) => {
        const page = event.page + 1;
        dispatch(_fetchBundleList(page));
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
                        value={bundles}
                        selection={selectedCompanies}
                        onSelectionChange={(e) => setSelectedCompanyCode(e.value as any)}
                        dataKey="id"
                        className="datatable-responsive"
                        globalFilter={globalFilter}
                        emptyMessage="No Service found."
                        // header={header}
                        responsiveLayout="scroll"
                        paginator={false} // Disable PrimeReact's built-in paginator
                        rows={pagination?.items_per_page}
                        totalRecords={pagination?.total}
                        currentPageReportTemplate={`Showing {first} to {last} of {totalRecords} items`}
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
                        <Column field="Bundle Title" header={t('BUNDLE.TABLE.COLUMN.BUNDLENAME')} sortable body={bundleTitleBodyTemplate} headerStyle={{ fontSize: '0.9rem', color: '#000' }}></Column>
                        <Column field="Description" header={t('BUNDLE.TABLE.COLUMN.BUNDLEDESCRIPTION')} sortable body={descriptionBodyTemplate} headerStyle={{ fontSize: '0.9rem', color: '#000' }}></Column>
                        <Column field="Validity Type" header={t('BUNDLE.TABLE.COLUMN.VALIDITYTYPE')} sortable body={validityTypeBodyTemplate} headerStyle={{ fontSize: '0.9rem', color: '#000' }}></Column>
                        <Column field="Admin Buying" header={t('BUNDLE.TABLE.COLUMN.ADMINBUYINGPRICE')} sortable body={adminBuyingPriceBodyTemplate} headerStyle={{ fontSize: '0.9rem', color: '#000' }}></Column>
                        <Column field="Buying Price" header={t('BUNDLE.TABLE.COLUMN.BUYINGPRICE')} sortable body={buyingPriceBodyTemplate} headerStyle={{ fontSize: '0.9rem', color: '#000' }}></Column>
                        <Column field="Selling Price" header={t('BUNDLE.TABLE.COLUMN.SELLINGPRICE')} sortable body={sellingPriceBodyTemplate} headerStyle={{ fontSize: '0.9rem', color: '#000' }}></Column>
                        <Column field="Currency" header={t('BUNDLE.TABLE.COLUMN.CURRENCYNAME')} sortable body={currencyBodyTemplate} headerStyle={{ fontSize: '0.9rem', color: '#000' }}></Column>
                        <Column field="Service" header={t('BUNDLE.TABLE.FILTER.SERVICE')}  sortable body={serviceNameBodyTemplate} headerStyle={{ fontSize: '0.9rem', color: '#000' }}></Column>
                        <Column field="Category" header={t('BUNDLE.TABLE.COLUMN.SERVICECATEGORY')} sortable body={serviceCategoryBodyTemplate} headerStyle={{ fontSize: '0.9rem', color: '#000' }}></Column>
                        <Column field="Created" header={t('TABLE.GENERAL.CREATEDAT')}  body={createdAtBodyTemplate} headerStyle={{ minWidth:'4rem', fontSize: '0.9rem', color: '#000' }}></Column>
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>
                    <Paginator
                        first={(pagination?.page - 1) * pagination?.items_per_page}
                        rows={pagination?.items_per_page}
                        totalRecords={pagination?.total}
                        onPageChange={(e) => onPageChange(e)}
                        template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    />


                    <Dialog visible={serviceDialog}  style={{ width: '700px' }} header="Bundle Details" modal className="p-fluid" footer={companyDialogFooter} onHide={hideDialog}>
                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="name">{t('BUNDLE.FORM.INPUT.BUNDLETITLE')}</label>
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
                                    placeholder={t('BUNDLE.FORM.PLACEHOLDER.BUNDLETITLE')}
                                    className={classNames({
                                        'p-invalid': submitted && !bundle.bundle_title
                                    })}
                                />
                                {submitted && !bundle.bundle_title && <small className="p-invalid">Bundle Title is required.</small>}
                            </div>

                            <div className="field col">
                                <label htmlFor="name">{t('BUNDLE.FORM.INPUT.BUNDLEDESCRIPTION')}</label>
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
                                    placeholder={t('BUNDLE.FORM.PLACEHOLDER.BUNDLEDESCRIPTION')}
                                    className={classNames({
                                        'p-invalid': submitted && !bundle.bundle_description
                                    })}
                                />
                                {submitted && !bundle.bundle_description && <small className="p-invalid">Bundle Description is required.</small>}
                            </div>
                        </div>

                        <div className="formgrid grid">
                            <div className="field col">

                                <label htmlFor="name">{t('BUNDLE.FORM.INPUT.ADMINBUYINGPRICE')}</label>
                                <InputText
                                    id="admin_buying_price"
                                    value={bundle.admin_buying_price}
                                    onChange={(e) =>
                                        setBundle((perv) => ({
                                            ...perv,
                                            admin_buying_price: e.target.value,
                                        }))
                                    }
                                    required
                                    autoFocus
                                    placeholder={t('BUNDLE.FORM.PLACEHOLDER.ADMINBUYINGPRICE')}
                                    className={classNames({
                                        'p-invalid': submitted && !bundle.admin_buying_price
                                    })}
                                />
                                {submitted && !bundle.admin_buying_price && <small className="p-invalid">Admin Buying Price is required.</small>}
                            </div>

                            <div className="field col">

                                <label htmlFor="name">{t('BUNDLE.FORM.INPUT.BUYINGPRICE')}</label>
                                <InputText
                                    id="buying_price"
                                    value={bundle.buying_price}
                                    onChange={(e) =>
                                        setBundle((perv) => ({
                                            ...perv,
                                            buying_price: e.target.value,
                                        }))
                                    }
                                    required
                                    autoFocus
                                    placeholder={t('BUNDLE.FORM.PLACEHOLDER.BUYINGPRICE')}
                                    className={classNames({
                                        'p-invalid': submitted && !bundle.buying_price
                                    })}
                                />
                                {submitted && !bundle.buying_price && <small className="p-invalid">Buying Price is required.</small>}
                            </div>
                        </div>


                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="name">{t('BUNDLE.FORM.INPUT.SELLINGPRICE')}</label>
                                <InputText
                                    id="selling_price"
                                    value={bundle.selling_price}
                                    onChange={(e) =>
                                        setBundle((perv) => ({
                                            ...perv,
                                            selling_price: e.target.value,
                                        }))
                                    }
                                    required
                                    autoFocus
                                    placeholder={t('BUNDLE.FORM.PLACEHOLDER.SELLINGPRICE')}
                                    className={classNames({
                                        'p-invalid': submitted && !bundle.selling_price
                                    })}
                                />
                                {submitted && !bundle.selling_price && <small className="p-invalid">Selling Price is required.</small>}
                            </div>
                            <div className="field col">
                                <label htmlFor="name">{t('BUNDLE.FORM.INPUT.VALIDITYTYPE')}</label>
                                <Dropdown
                                    id="validity_type"
                                    value={bundle.validity_type}
                                    options={[
                                        { label: "Unlimited", value: "unlimited" },
                                        { label: "Daily", value: "daily" },
                                        { label: "Nightly", value: "nightly" },
                                        { label: "Weekly", value: "weekly" },
                                        { label: "Monthly", value: "monthly" },
                                        { label: "Yearly", value: "yearly" }
                                    ]}
                                    onChange={(e) =>
                                        setBundle((prev) => ({
                                            ...prev,
                                            validity_type: e.value,
                                        }))
                                    }
                                    placeholder={t('BUNDLE.FORM.PLACEHOLDER.VALIDITYTYPE')}
                                    className="w-full"
                                />

                            </div>
                        </div>

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="name">{t('BUNDLE.FORM.INPUT.SERVICENAME')}</label>
                                <Dropdown
                                    id="service"
                                    value={bundle.service}
                                    options={services}
                                    onChange={(e) =>
                                        setBundle((prev) => ({
                                            ...prev,
                                            service: e.value,
                                        }))
                                    }
                                    optionLabel='company.company_name'
                                    // optionValue='id'
                                    placeholder={t('BUNDLE.FORM.PLACEHOLDER.SERVICENAME')}
                                    className="w-full"
                                    itemTemplate={(option) => (
                                        <div style={{display:'flex', gap:"5px"}}>
                                            <div>{option.service_category?.category_name}</div>
                                            <div>{option.company?.company_name}</div>
                                        </div>
                                    )}
                                />
                            </div>
                            <div className="field col">
                                <label htmlFor="name">{t('BUNDLE.FORM.INPUT.CURRENCY')}</label>
                                <Dropdown
                                    id="currency"
                                    value={bundle.currency}
                                    options={currencies}
                                    onChange={(e) =>
                                        setBundle((prev) => ({
                                            ...prev,
                                            currency: e.value,
                                        }))
                                    }
                                    optionLabel='name'
                                    // optionValue='id'
                                    placeholder={t('')}
                                    className="w-full"
                                />

                            </div>
                        </div>

                    </Dialog>

                    <Dialog visible={deleteServiceDialog} style={{ width: '450px' }} header={t('TABLE.GENERAL.CONFIRM')} modal footer={deleteCompanyDialogFooter} onHide={hideDeleteServiceDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {bundle && (
                                <span>
                                    Are you sure you want to delete <b>{bundle.bundle_title}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteServicesDialog} style={{ width: '450px' }} header={t('TABLE.GENERAL.CONFIRM')} modal footer={deleteCompaniesDialogFooter} onHide={hideDeleteServicesDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {bundle && <span>Are you sure you want to delete the selected companies?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default withAuth(BundlePage);
