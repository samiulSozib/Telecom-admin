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
import { _fetchCountries } from '@/app/redux/actions/countriesActions';
import { _fetchTelegramList } from '@/app/redux/actions/telegramActions';
import { _addCompanyCode, _deleteCompanyCode, _editCompanyCode, _fetchCompanyCodes } from '@/app/redux/actions/companyCodeActions';
import { CompanyCode } from '../../../redux/reducers/companyCodeReducer';

const CompanyCodePage = () => {


    let emptyCompanyCode={
        id: 0,
        company_id: 0,
        reserved_digit: '',
        deleted_at: '',
        created_at: '',
        updated_at: '',
        company: null,
    }

    const [companyCodeDialog, setCompanyCodeDialog] = useState(false);
    const [deleteCompanyCodeDialog, setDeleteCompanyCodeDialog] = useState(false);
    const [deleteCompanyCodesDialog, setDeleteCompanyCodesDialog] = useState(false);
    const [companyCode,setCompanyCode]=useState<CompanyCode>(emptyCompanyCode)
    const [selectedCompanies, setSelectedCompanyCode] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);
    const dispatch=useDispatch()
    const {companyCodes}=useSelector((state:any)=>state.companyCodeReducer)
    const {companies}=useSelector((state:any)=>state.companyReducer)


    useEffect(()=>{
        dispatch(_fetchCompanyCodes())
        dispatch(_fetchCompanies())
    },[dispatch])

    const openNew = () => {
        setCompanyCode(emptyCompanyCode)
        setSubmitted(false);
        setCompanyCodeDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setCompanyCodeDialog(false);
    };

    const hideDeleteCompanyCodeDialog = () => {
        setDeleteCompanyCodeDialog(false);
    };

    const hideDeleteCompanyCodesDialog = () => {
        setDeleteCompanyCodesDialog(false);
    };



    const saveCompanyCode = () => {
        setSubmitted(true);
        if (companyCode.id && companyCode.id !== 0) {
            dispatch(_editCompanyCode(companyCode,toast));

        } else {
            dispatch(_addCompanyCode(companyCode,toast));
        }

        setCompanyCodeDialog(false);
        setCompanyCode(emptyCompanyCode);
    };

    const editCompanyCode = (companyCode: CompanyCode) => {
        setCompanyCode({ ...companyCode});

        setCompanyCodeDialog(true);
    };

    const confirmDeleteCompany = (companyCode: CompanyCode) => {
        setCompanyCode(companyCode);
        setDeleteCompanyCodeDialog(true);
    };

    const deleteCompanyCode = () => {
        if (!companyCode?.id) {
            console.error("Company Code ID is undefined.");
            return;
        }
        dispatch(_deleteCompanyCode(companyCode?.id,toast))
        setDeleteCompanyCodeDialog(false);

    };


    const confirmDeleteSelected = () => {
        setDeleteCompanyCodesDialog(true);
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


    const reservedDigitBodyTemplate = (rowData: CompanyCode) => {
        return (
            <>
                <span className="p-column-title">Reserved Digit</span>
                {rowData.reserved_digit}
            </>
        );
    };



    const countryNameBodyTemplate = (rowData: CompanyCode) => {
        return (
            <>
                <span className="p-column-title">Country</span>
                {rowData.company?.country?.country_name}
            </>
        );
    };

    const companyNameBodyTemplate = (rowData: CompanyCode) => {
        return (
            <>
                <span className="p-column-title">Company</span>
                {rowData.company?.company_name}
            </>
        );
    };

    const countryCodeBodyTemplate = (rowData: CompanyCode) => {
        return (
            <>
                <span className="p-column-title">Country Code</span>
                {rowData.company?.country?.country_telecom_code}
            </>
        );
    };





    const actionBodyTemplate = (rowData: CompanyCode) => {
        return (
            <>
                <Button icon="pi pi-pencil" rounded severity="success" className="mr-2"  onClick={()=>editCompanyCode(rowData)}/>
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
            <Button label="Save" icon="pi pi-check" text onClick={saveCompanyCode} />
        </>
    );
    const deleteCompanyDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteCompanyCodeDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteCompanyCode} />
        </>
    );
    const deleteCompaniesDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteCompanyCodesDialog} />
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
                        value={companyCodes}
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
                        emptyMessage="No Company Codes found."
                        // header={header}
                        responsiveLayout="scroll"
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
                        <Column field="name" header="Reserved Digit" sortable body={reservedDigitBodyTemplate}></Column>
                        <Column field="Country" header="Country Name" body={countryNameBodyTemplate} sortable></Column>
                        <Column field="Chat Id" header="Company Name" sortable body={companyNameBodyTemplate} ></Column>
                        <Column field="Country Code" header="Country Code" sortable body={countryCodeBodyTemplate} ></Column>
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>

                    <Dialog visible={companyCodeDialog}  style={{ width: '550px' }} header="Company Details" modal className="p-fluid" footer={companyDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="name">Reserved Digit</label>
                            <InputText
                                id="reserved_digit"
                                value={companyCode?.reserved_digit}
                                onChange={(e) =>
                                    setCompanyCode((prevCompanyCode) => ({
                                        ...prevCompanyCode,
                                        reserved_digit: e.target.value,
                                    }))
                                }
                                required
                                autoFocus
                                className={classNames({
                                    'p-invalid': submitted && !companyCode.reserved_digit
                                })}
                            />
                            {submitted && !companyCode.reserved_digit && <small className="p-invalid">Reserved Digit is required.</small>}
                        </div>

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="country_id">Company</label>
                                <Dropdown
                                    id="company_id"
                                    value={companyCode.company_id}
                                    options={companies}
                                    onChange={(e) =>
                                        setCompanyCode((prevCompanyCode) => ({

                                            ...prevCompanyCode,
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
                    </Dialog>

                    <Dialog visible={deleteCompanyCodeDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteCompanyDialogFooter} onHide={hideDeleteCompanyCodeDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {companyCode && (
                                <span>
                                    Are you sure you want to delete <b>{companyCode.reserved_digit}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteCompanyCodesDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteCompaniesDialogFooter} onHide={hideDeleteCompanyCodesDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {companyCode && <span>Are you sure you want to delete the selected companies?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default CompanyCodePage;
