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
import { _fetchTelegramList } from '@/app/redux/actions/telegramActions';
import { AppDispatch } from '@/app/redux/store';
import { Advertisement } from '@/types/interface';
import { ProgressBar } from 'primereact/progressbar';
import { _fetchCurrencies } from '@/app/redux/actions/currenciesActions';
import { _fetchLanguages } from '@/app/redux/actions/languageActions';
import { FileUpload } from 'primereact/fileupload';
import { _addAdvertisement, _deleteAdvertisement, _editAdvertisement, _fetchAdvertisements } from '@/app/redux/actions/advertisementActions';
import { advertisementsReducer } from '../../../redux/reducers/advertisementReducer';

const AdvertisementPage = () => {

    let emptyAdvertisement:Advertisement={
        id:0,
        advertisement_title:'',
        ad_slider_image_url:'',
        status:0,
        deleted_at:'',
        created_at:'',
        updated_at:''
    }



    const [advertisementDialog, setAdvertisementDialog] = useState(false);
    const [deleteAdvertisementDialog, setDeleteAdvertisementDialog] = useState(false);
    const [deleteAdvertisementsDialog, setDeleteAdvertisementsDialog] = useState(false);
    const [advertisement,setAdvertisement]=useState<Advertisement>(emptyAdvertisement)
    const [selectedCompanies, setSelectedAdvertisement] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);
    const dispatch=useDispatch<AppDispatch>()
    const {advertisements,loading}=useSelector((state:any)=>state.advertisementsReducer)


    useEffect(()=>{
        dispatch(_fetchAdvertisements())
    },[dispatch])

    const openNew = () => {
        setAdvertisement(emptyAdvertisement)
        setSubmitted(false);
        setAdvertisementDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setAdvertisementDialog(false);
    };

    const hideDeleteAdvertisementDialog = () => {
        setDeleteAdvertisementDialog(false);
    };

    const hideDeleteAdvertisementsDialog = () => {
        setDeleteAdvertisementsDialog(false);
    };



    const saveAdvertisement = () => {
        setSubmitted(true);
        if (advertisement.id && advertisement.id !== 0) {
            dispatch(_editAdvertisement(advertisement.id,advertisement,toast));

        } else {
            dispatch(_addAdvertisement(advertisement,toast));
        }

        setAdvertisementDialog(false);
        setAdvertisement(emptyAdvertisement);
    };

    const editAdvertisement = (advertisement: Advertisement) => {
        setAdvertisement({ ...advertisement});

        setAdvertisementDialog(true);
    };

    const confirmDeleteAdvertisement = (advertisement: Advertisement) => {
        setAdvertisement(advertisement);
        setDeleteAdvertisementDialog(true);
    };

    const deleteAdvertisement = () => {
        if (!advertisement?.id) {
            console.error("Advertisement  ID is undefined.");
            return;
        }
        dispatch(_deleteAdvertisement(advertisement?.id,toast))
        setDeleteAdvertisementDialog(false);

    };


    const confirmDeleteSelected = () => {
        setDeleteAdvertisementsDialog(true);
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

    const imageBodyTemplate = (rowData: Advertisement) => {
            return (
                <>
                    <span className="p-column-title">Image</span>
                    <img src={`${rowData.ad_slider_image_url}`} alt={rowData.ad_slider_image_url?.toString()} className="shadow-2" width="60" />
                </>
            );
        };


    const advertisementTitleBodyTemplate = (rowData: Advertisement) => {
        return (
            <>
                <span className="p-column-title">Advertisement Title</span>
                {rowData.advertisement_title}
            </>
        );
    };

    const statusBodyTemplate = (rowData: Advertisement) => {
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







    const actionBodyTemplate = (rowData: Advertisement) => {
        return (
            <>
                <Button icon="pi pi-pencil" rounded severity="success" className="mr-2"  onClick={()=>editAdvertisement(rowData)}/>
                <Button icon="pi pi-trash" rounded severity="warning" onClick={() => confirmDeleteAdvertisement(rowData)} />
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

    const advertisementDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" text onClick={saveAdvertisement} />
        </>
    );
    const deleteAdvertisementDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteAdvertisementDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteAdvertisement} />
        </>
    );
    const deleteCompaniesDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteAdvertisementsDialog} />
            <Button label="Yes" icon="pi pi-check" text  />
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
                        value={advertisements}
                        selection={selectedCompanies}
                        onSelectionChange={(e) => setSelectedAdvertisement(e.value as any)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} advertisement code"
                        globalFilter={globalFilter}
                        emptyMessage="No Advertisement s found."
                        // header={header}
                        responsiveLayout="scroll"
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
                        <Column field="" header="" sortable body={imageBodyTemplate}></Column>
                        <Column field="name" header="Advertisement Title" sortable body={advertisementTitleBodyTemplate}></Column>
                        <Column field="status" header="Status" body={statusBodyTemplate} sortable></Column>
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>

                    <Dialog visible={advertisementDialog}  style={{ width: '550px' }} header="Advertisement Details" modal className="p-fluid" footer={advertisementDialogFooter} onHide={hideDialog}>
                        {advertisement.ad_slider_image_url && (
                            <img
                                src={
                                    advertisement.ad_slider_image_url instanceof File
                                        ? URL.createObjectURL(advertisement.ad_slider_image_url) // Temporary preview for file
                                        : advertisement.ad_slider_image_url // Direct URL for existing logo
                                }
                                alt="Uploaded Preview"
                                width="150"
                                className="mt-0 mx-auto mb-5 block shadow-2"
                            />
                        )}
                        <FileUpload
                            name="company_logo"
                            accept="image/*"
                            customUpload
                            onSelect={(e) => setAdvertisement((prev) => ({
                                ...prev,
                                ad_slider_image_url: e.files[0],
                            }))}
                        />
                        <div className="field">
                            <label htmlFor="advertisement_title">Advertisement Title</label>
                            <InputText
                                id="advertisement_title"
                                value={advertisement.advertisement_title}
                                onChange={(e) =>
                                    setAdvertisement((prevAdvertisement) => ({
                                        ...prevAdvertisement,
                                        advertisement_title: e.target.value,
                                    }))
                                }
                                required
                                autoFocus
                                className={classNames({
                                    'p-invalid': submitted && !advertisement.advertisement_title
                                })}
                            />
                            {submitted && !advertisement.advertisement_title && <small className="p-invalid">Advertisement Title is required.</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="status">Status</label>
                            <Dropdown
                                id="status"
                                value={advertisement.status}
                                options={[
                                    { label: 'Active', value: 1 },
                                    { label: 'Inactive', value: 0 },
                                ]}
                                onChange={(e) =>
                                    setAdvertisement((prev) => ({
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


                    </Dialog>

                    <Dialog visible={deleteAdvertisementDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteAdvertisementDialogFooter} onHide={hideDeleteAdvertisementDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {advertisement && (
                                <span>
                                    Are you sure you want to delete <b>{advertisement.advertisement_title}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteAdvertisementsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteCompaniesDialogFooter} onHide={hideDeleteAdvertisementsDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {advertisement && <span>Are you sure you want to delete the selected companies?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default AdvertisementPage;
