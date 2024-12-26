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
import { _addServiceCategory, _deleteServiceCategory, _editServiceCategory, _fetchServiceCategories } from '@/app/redux/actions/serviceCategoryActions';
import { ServiceCategory } from '@/app/redux/reducers/serviceCategoryReducer';

const Category = () => {


    let emptyServiceCategory={
        id: 0,
        category_name: '',
        type: '',
        service_category_sub_type_id: 0,
        category_image_url: '',
        deleted_at: '' ,
        created_at: '',
        updated_at: '',
    }

    const [serviceCategoryDialog, setServiceCategoryDialog] = useState(false);
    const [deleteServiceCategoryDialog, setDeleteServiceCategoryDialog] = useState(false);
    const [deleteServiceCategoriesDialog, setDeleteServiceCategoriesDialog] = useState(false);
    const [serviceCategory,setServiceCategory]=useState<ServiceCategory>(emptyServiceCategory)
    const [selectedCompanies, setSelectedCompanyCode] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);
    const dispatch=useDispatch()
    const {serviceCategories}=useSelector((state:any)=>state.serviceCategoryReducer)


    useEffect(()=>{
        dispatch(_fetchServiceCategories())
    },[dispatch])


    const openNew = () => {
        setServiceCategory(emptyServiceCategory)
        setSubmitted(false);
        setServiceCategoryDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setServiceCategoryDialog(false);
    };

    const hideDeleteServiceCategoryDialog = () => {
        setDeleteServiceCategoryDialog(false);
    };

    const hideDeleteServiceCategoriesDialog = () => {
        setDeleteServiceCategoriesDialog(false);
    };



    const saveServiceCategory = () => {
        setSubmitted(true);
        if (serviceCategory.id && serviceCategory.id !== 0) {
            dispatch(_editServiceCategory(serviceCategory,toast));

        } else {
            dispatch(_addServiceCategory(serviceCategory,toast));
        }

        setServiceCategoryDialog(false);
        setServiceCategory(emptyServiceCategory);
    };

    const editServiceCategory = (serviceCategory: ServiceCategory) => {
        setServiceCategory({ ...serviceCategory});

        setServiceCategoryDialog(true);
    };

    const confirmDeleteServiceCategory = (serviceCategory: ServiceCategory) => {
        setServiceCategory(serviceCategory);
        setDeleteServiceCategoryDialog(true);
    };

    const deleteServiceCategory = () => {
        if (!serviceCategory?.id) {
            //console.error("Service Category ID is undefined.");
            return;
        }
        dispatch(_deleteServiceCategory(serviceCategory?.id,toast))
        setDeleteServiceCategoryDialog(false);

    };


    const confirmDeleteSelected = () => {
        setDeleteServiceCategoriesDialog(true);
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


    const serviceCategoryNameBodyTemplate = (rowData: ServiceCategory) => {
        return (
            <>
                <span className="p-column-title">Service Category Name</span>
                {rowData.category_name}
            </>
        );
    };



    const serviceCategoryTypeBodyTemplate = (rowData: ServiceCategory) => {
        return (
            <>
                <span className="p-column-title">Service Category Type</span>
                {rowData.type}
            </>
        );
    };







    const actionBodyTemplate = (rowData: ServiceCategory) => {
        return (
            <>
                <Button icon="pi pi-pencil" rounded severity="success" className="mr-2"  onClick={()=>editServiceCategory(rowData)}/>
                <Button icon="pi pi-trash" rounded severity="warning" onClick={() => confirmDeleteServiceCategory(rowData)} />
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

    const serviceCategoryDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" text onClick={saveServiceCategory} />
        </>
    );
    const deleteServiceCategoryDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteServiceCategoryDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteServiceCategory} />
        </>
    );
    const deleteServiceCategoriesDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteServiceCategoriesDialog} />
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
                        value={serviceCategories}
                        selection={selectedCompanies}
                        onSelectionChange={(e) => setSelectedCompanyCode(e.value as any)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} categories"
                        globalFilter={globalFilter}
                        emptyMessage="No Category Codes found."
                        // header={header}
                        responsiveLayout="scroll"
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
                        <Column field="name" header="Service Category Name" sortable body={serviceCategoryNameBodyTemplate}></Column>
                        <Column field="Country" header="Service Category Body" body={serviceCategoryTypeBodyTemplate} sortable></Column>
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>

                    <Dialog visible={serviceCategoryDialog}  style={{ width: '550px' }} header="Category Details" modal className="p-fluid" footer={serviceCategoryDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="name">Service Category Name</label>
                            <InputText
                                id="category_name"
                                value={serviceCategory.category_name}
                                onChange={(e) =>
                                    setServiceCategory((prev) => ({
                                        ...prev,
                                        category_name: e.target.value,
                                    }))
                                }
                                required
                                autoFocus
                                className={classNames({
                                    'p-invalid': submitted && !serviceCategory.category_name
                                })}
                            />
                            {submitted && !serviceCategory.category_name && <small className="p-invalid">Category Name is required.</small>}
                        </div>

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="type">Category Type</label>
                                <Dropdown
                                    id="type"
                                    value={serviceCategory.type}
                                    options={[
                                        { label: "Social", value: "social" },
                                        { label: "Non-Social", value: "nonsocial" }
                                    ]}
                                    onChange={(e) =>
                                        setServiceCategory((prev) => ({
                                            ...prev,
                                            type: e.value,
                                        }))
                                    }
                                    placeholder="Choose a Type"
                                    className="w-full"
                                />
                            </div>
                        </div>
                    </Dialog>

                    <Dialog visible={deleteServiceCategoryDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteServiceCategoryDialogFooter} onHide={hideDeleteServiceCategoryDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {serviceCategory && (
                                <span>
                                    Are you sure you want to delete <b>{serviceCategory.category_name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteServiceCategoriesDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteServiceCategoriesDialogFooter} onHide={hideDeleteServiceCategoriesDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {serviceCategory && <span>Are you sure you want to delete the selected categories?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default Category;
