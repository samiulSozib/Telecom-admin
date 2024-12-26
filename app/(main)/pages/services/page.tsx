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
import { Service } from '@/app/redux/reducers/serviceReducer';

const Services = () => {
    let emptyService={
        id: 0,
        service_category_id: 0,
        service_name:'',
        company_id: 0,
        deleted_at: '' ,
        created_at: '',
        updated_at: '',
        service_category: null,
        company:  null,
    }

    const [serviceDialog, setServiceDialog] = useState(false);
    const [deleteServiceDialog, setDeleteServiceDialog] = useState(false);
    const [deleteServicesDialog, setDeleteServicesDialog] = useState(false);
    const [service,setService]=useState<Service>(emptyService)
    const [selectedCompanies, setSelectedCompanyCode] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);
    const dispatch=useDispatch()
    const {companies}=useSelector((state:any)=>state.companyReducer)
    const {services}=useSelector((state:any)=>state.serviceReducer)
    const {serviceCategories}=useSelector((state:any)=>state.serviceCategoryReducer)



    useEffect(()=>{
        dispatch(_fetchServiceList())
        dispatch(_fetchCompanies())
        dispatch(_fetchServiceCategories())
    },[dispatch])


    const openNew = () => {
        setService(emptyService)
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
        if (service.id && service.id !== 0) {
            dispatch(_editService(service.id,service,toast));

        } else {
            dispatch(_addService(service,toast));
        }

        setServiceDialog(false);
        setService(emptyService);
    };

    const editService = (service: Service) => {
        setService({ ...service});

        setServiceDialog(true);
    };

    const confirmDeleteService = (service: Service) => {
        setService(service);
        setDeleteServiceDialog(true);
    };

    const deleteService = () => {
        if (!service?.id) {
            console.error("Service ID is undefined.");
            return;
        }
        dispatch(_deleteService(service?.id,toast))
        setDeleteServiceDialog(false);

    };


    const confirmDeleteSelected = () => {
        setDeleteServicesDialog(true);
    };



    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="New" icon="pi pi-plus" severity="success" className=" mr-2" onClick={openNew} />
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

    const countryNameBodyTemplate = (rowData: Service) => {
        return (
            <>
                <span className="p-column-title">Country</span>
                {rowData.company?.country?.country_name}
            </>
        );
    };

    const companyInfoBodyTemplate = (rowData: Service) => {
        return (
            <>
                <span className="p-column-title">Company Info</span>
                <div className="" style={{display:'flex',textAlign:'center',alignItems:'center', gap:'10px'}}>
                    <img
                        src={`${rowData.company?.company_logo}`}
                        alt={rowData.company?.company_logo.toString()}
                        className="shadow-2"
                        width="60"
                    />
                    <div style={{display:'flex',flexDirection:'column', textAlign:'start'}}>
                        <span style={{fontWeight:'bold'}}>{rowData.company?.company_name}</span>
                        {rowData.company?.country?.country_name}
                    </div>
                </div>
            </>
        );
    };


    const serviceCategoryNameBodyTemplate = (rowData: Service) => {
        return (
            <>
                <span className="p-column-title">Service Category</span>
                {rowData.service_category?.category_name}
            </>
        );
    };


    const actionBodyTemplate = (rowData: Service) => {
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
            <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" text onClick={saveService} />
        </>
    );
    const deleteCompanyDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteServiceDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteService} />
        </>
    );
    const deleteCompaniesDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteServicesDialog} />
            <Button label="Yes" icon="pi pi-check" text  />
        </>
    );




    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <DataTable
                        ref={dt}
                        value={services}
                        selection={selectedCompanies}
                        onSelectionChange={(e) => setSelectedCompanyCode(e.value as any)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} company code"
                        globalFilter={globalFilter}
                        emptyMessage="No Service found."
                        // header={header}
                        responsiveLayout="scroll"
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
                        <Column field="Company Name" header="Company Name" sortable body={companyInfoBodyTemplate} ></Column>
                        <Column field="Country" header="Country Name" body={countryNameBodyTemplate} sortable></Column>
                        <Column field="Service Category" header="Service Category" sortable body={serviceCategoryNameBodyTemplate} ></Column>
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>

                    <Dialog visible={serviceDialog}  style={{ width: '550px' }} header="Company Details" modal className="p-fluid" footer={companyDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="name">Service Category</label>
                            <InputText
                                id="service"
                                value={service.service_name}
                                onChange={(e) =>
                                    setService((perv) => ({
                                        ...perv,
                                        service_name: e.target.value,
                                    }))
                                }
                                required
                                autoFocus
                                className={classNames({
                                    'p-invalid': submitted && !service.service_name
                                })}
                            />
                            {submitted && !service.service_name && <small className="p-invalid">Service Name is required.</small>}
                        </div>

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="country_id">Company</label>
                                <Dropdown
                                    id="company_id"
                                    value={service.company_id}
                                    options={companies}
                                    onChange={(e) =>
                                        setService((perv) => ({

                                            ...perv,
                                            company_id: e.value,
                                        }))
                                    }
                                    optionLabel='company_name'
                                    optionValue='id'
                                    placeholder="Choose a Company"
                                    className="w-full"
                                />

                            </div>
                        </div>
                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="country_id">Service Category</label>
                                <Dropdown
                                    id="service_category_id"
                                    value={service.service_category_id}
                                    options={serviceCategories}
                                    onChange={(e) =>
                                        setService((perv) => ({

                                            ...perv,
                                            service_category_id: e.value,
                                        }))
                                    }
                                    optionLabel='category_name'
                                    optionValue='id'
                                    placeholder="Choose a Category"
                                    className="w-full"
                                />

                            </div>
                        </div>
                    </Dialog>

                    <Dialog visible={deleteServiceDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteCompanyDialogFooter} onHide={hideDeleteServiceDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {service && (
                                <span>
                                    Are you sure you want to delete <b>{service.service_name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteServicesDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteCompaniesDialogFooter} onHide={hideDeleteServicesDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {service && <span>Are you sure you want to delete the selected companies?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default Services;
