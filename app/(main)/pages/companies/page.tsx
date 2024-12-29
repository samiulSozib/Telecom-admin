/* eslint-disable @next/next/no-img-element */
'use client';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { _fetchCompanies,_deleteCompany, _addCompany,_editCompany } from '@/app/redux/actions/companyActions';
import { useSelector } from 'react-redux';
import { Dropdown } from 'primereact/dropdown';
import { _fetchCountries } from '@/app/redux/actions/countriesActions';
import { _fetchTelegramList } from '@/app/redux/actions/telegramActions';
import { AppDispatch } from '@/app/redux/store';
import { Company } from '@/types/interface';
import { ProgressBar } from 'primereact/progressbar';

const CompanyPage = () => {

    let emptyCompany: Company= {
        id: 0,
        company_name: '',
        company_logo:  '',
        country_id: 0,
        telegram_chat_id: null,
        _telegram_chat_id:null,
        deleted_at: '' ,
        created_at: '',
        updated_at: '',
        country: null

    };

    const [companyDialog, setCompanyDialog] = useState(false);
    const [deleteCompanyDialog, setDeleteCompanyDialog] = useState(false);
    const [deleteCompaniesDialog, setDeleteCompaniesDialog] = useState(false);
    const [company,setCompany]=useState<Company>(emptyCompany)
    const [selectedCompanies, setSelectedCompanies] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);
    const dispatch=useDispatch<AppDispatch>()
    const {companies,loading}=useSelector((state:any)=>state.companyReducer)
    const {countries}=useSelector((state:any)=>state.countriesReducer)
    const {telegramChatIds}=useSelector((state:any)=>state.telegramReducer)

    useEffect(()=>{
        dispatch(_fetchCompanies())
        dispatch(_fetchCountries())
        dispatch(_fetchTelegramList())
    },[dispatch])

    const openNew = () => {
        setCompany(emptyCompany)
        setSubmitted(false);
        setCompanyDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setCompanyDialog(false);
    };

    const hideDeleteCompanyDialog = () => {
        setDeleteCompanyDialog(false);
    };

    const hideDeleteCompaniesDialog = () => {
        setDeleteCompaniesDialog(false);
    };



    const saveCompany = () => {
        setSubmitted(true);
        console.log(company)
        if (company.id && company.id !== 0) {
            dispatch(_editCompany(company,toast));

        } else {
            dispatch(_addCompany(company,toast));
        }

        setCompanyDialog(false);
        setCompany(emptyCompany);
    };

    const editCompany = (company: Company) => {
        console.log(company)
        setCompany({ ...company,_telegram_chat_id:company.telegram_chat_id?.id||null});

        setCompanyDialog(true);
    };

    const confirmDeleteCompany = (company: Company) => {
        setCompany(company);
        setDeleteCompanyDialog(true);
    };

    const deleteCompany = () => {
        if (!company?.id) {
            console.error("Company ID is undefined.");
            return;
        }
        dispatch(_deleteCompany(company?.id,toast))
        setDeleteCompanyDialog(false);

    };


    const confirmDeleteSelected = () => {
        setDeleteCompaniesDialog(true);
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


    const nameBodyTemplate = (rowData: Company) => {
        return (
            <>
                <span className="p-column-title">Company Name</span>
                {rowData.company_name}
            </>
        );
    };

    const imageBodyTemplate = (rowData: Company) => {
        return (
            <>
                <span className="p-column-title">Image</span>
                <img src={`${rowData.company_logo}`} alt={rowData.company_logo.toString()} className="shadow-2" width="60" />
            </>
        );
    };

    const countryBodyTemplate = (rowData: Company) => {
        return (
            <>
                <span className="p-column-title">Country</span>
                {rowData.country?.country_name}
            </>
        );
    };

    const chatIdBodyTemplate = (rowData: Company) => {
        return (
            <>
                <span className="p-column-title">Chat ID</span>
                {rowData.telegram_chat_id?.chat_id}
            </>
        );
    };

    const telegramGroupNameBodyTemplate = (rowData: Company) => {
        return (
            <>
                <span className="p-column-title">Telegram Group Name</span>
                {rowData.telegram_chat_id?.group_name}
            </>
        );
    };





    const actionBodyTemplate = (rowData: Company) => {
        return (
            <>
                <Button icon="pi pi-pencil" rounded severity="success" className="mr-2"  onClick={()=>editCompany(rowData)}/>
                <Button icon="pi pi-trash" rounded severity="warning" onClick={() => confirmDeleteCompany(rowData)} />
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
            <Button label="Save" icon="pi pi-check" text onClick={saveCompany} />
        </>
    );
    const deleteCompanyDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteCompanyDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteCompany} />
        </>
    );
    const deleteCompaniesDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteCompaniesDialog} />
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
                        value={companies}
                        selection={selectedCompanies}
                        onSelectionChange={(e) => setSelectedCompanies(e.value as any)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} companies"
                        globalFilter={globalFilter}
                        emptyMessage="No Companies found."
                        // header={header}
                        responsiveLayout="scroll"
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
                        <Column field="name" header="Name" sortable body={nameBodyTemplate}></Column>
                        <Column header="Image" body={imageBodyTemplate}></Column>
                        <Column field="Country" header="Country" body={countryBodyTemplate} sortable></Column>
                        <Column field="Chat Id" header="Chat ID" sortable body={chatIdBodyTemplate} ></Column>
                        <Column field="Group Name" header="Telegram Group Name" sortable body={telegramGroupNameBodyTemplate} ></Column>
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>

                    <Dialog visible={companyDialog}  style={{ width: '550px' }} header="Company Details" modal className="p-fluid" footer={companyDialogFooter} onHide={hideDialog}>
                        {company.company_logo && (
                            <img
                                src={
                                    company.company_logo instanceof File
                                        ? URL.createObjectURL(company.company_logo) // Temporary preview for file
                                        : company.company_logo // Direct URL for existing logo
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
                            onSelect={(e) => setCompany((prevCompany) => ({
                                ...prevCompany,
                                company_logo: e.files[0],
                            }))}
                        />
                        <div className="field">
                            <label htmlFor="name">Name</label>
                            <InputText
                                id="company_name"
                                value={company?.company_name}
                                onChange={(e) =>
                                    setCompany((prevCompany) => ({
                                        ...prevCompany,
                                        company_name: e.target.value,
                                    }))
                                }
                                required
                                autoFocus
                                className={classNames({
                                    'p-invalid': submitted && !company.company_name
                                })}
                            />
                            {submitted && !company.company_name && <small className="p-invalid">Name is required.</small>}
                        </div>

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="country_id">Country</label>
                                <Dropdown
                                    id="country_id"
                                    value={company.country_id}
                                    options={countries}
                                    onChange={(e) =>
                                        setCompany((prevCompany) => ({

                                            ...prevCompany,
                                            country_id: e.value,
                                        }))
                                    }
                                    optionLabel='country_name'
                                    optionValue='id'
                                    placeholder="Choose a country"
                                    className="w-full"
                                />

                            </div>

                            <div className="field col">
                                <label htmlFor="telegram_chat_id">Telegram Group</label>
                                <Dropdown
                                    id="telegram_chat_id"
                                    value={company._telegram_chat_id}
                                    options={telegramChatIds}
                                    onChange={(e) =>
                                        setCompany((prevCompany) => ({
                                            ...prevCompany,
                                            _telegram_chat_id: e.value,
                                        }))
                                    }
                                    optionLabel="group_name"
                                    optionValue='id'
                                    placeholder="Choose a group"
                                    className="w-full"
                                />

                            </div>

                        </div>
                    </Dialog>

                    <Dialog visible={deleteCompanyDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteCompanyDialogFooter} onHide={hideDeleteCompanyDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {company && (
                                <span>
                                    Are you sure you want to delete <b>{company.company_name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteCompaniesDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteCompaniesDialogFooter} onHide={hideDeleteCompaniesDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {company && <span>Are you sure you want to delete the selected companies?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default CompanyPage;
