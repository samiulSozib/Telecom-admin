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
import { AppDispatch } from '@/app/redux/store';
import { CompanyCode } from '@/types/interface';
import { ProgressBar } from 'primereact/progressbar';
import withAuth from '../../authGuard';
import { useTranslation } from 'react-i18next';

const CompanyCodePage = () => {


    let emptyCompanyCode:CompanyCode={
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
    const dispatch=useDispatch<AppDispatch>()
    const {companyCodes,loading}=useSelector((state:any)=>state.companyCodeReducer)
    const {companies}=useSelector((state:any)=>state.companyReducer)
    const {t}=useTranslation()


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
        console.log(companyCode)
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
                <div className="flex justify-end items-center space-x-2    ">
                    <Button label={t('COMPANYCODE.TABLE.CREATECOMPANYCODE')} icon="pi pi-plus" severity="success" className=" mr-2" onClick={openNew} />
                    <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedCompanies || !(selectedCompanies as any).length} />
                </div>
            </React.Fragment>
        );
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex items-center">
                <span className="block mt-2 md:mt-0 p-input-icon-left w-full md:w-auto">
                    <i className="pi pi-search" />
                    <InputText
                        type="search"
                        onInput={(e) => setGlobalFilter(e.currentTarget.value)}
                        placeholder={t('ECOMMERCE.COMMON.SEARCH')}
                        className="w-full md:w-auto"
                    />
                </span>
            </div>
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
            <Button label={t('APP.GENERAL.CANCEL')} icon="pi pi-times" severity="danger" onClick={hideDialog} />
            <Button label={t('FORM.GENERAL.SUBMIT')} icon="pi pi-check" severity="success" onClick={saveCompanyCode} />
        </>
    );
    const deleteCompanyDialogFooter = (
        <>
            <Button label={t('APP.GENERAL.CANCEL')} icon="pi pi-times" severity="danger" onClick={hideDeleteCompanyCodeDialog} />
            <Button label={t('FORM.GENERAL.SUBMIT')} icon="pi pi-check" severity="success" onClick={deleteCompanyCode} />
        </>
    );
    const deleteCompaniesDialogFooter = (
        <>
            <Button label={t('APP.GENERAL.CANCEL')} icon="pi pi-times" severity="danger" onClick={hideDeleteCompanyCodesDialog} />
            <Button label={t('FORM.GENERAL.SUBMIT')} icon="pi pi-check" severity="success"  />
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
                        <Column field="name" header={t('COMPANYCODE.TABLE.COLUMN.RESERVEDDIGIT')} sortable body={reservedDigitBodyTemplate}></Column>
                        <Column field="Country" header={t('COMPANYCODE.TABLE.COLUMN.COUNTRYNAME')} body={countryNameBodyTemplate} sortable></Column>
                        <Column field="Chat Id" header={t('COMPANYCODE.TABLE.COLUMN.COMPANYNAME')} sortable body={companyNameBodyTemplate} ></Column>
                        <Column field="Country Code" header={t('COMPANYCODE.TABLE.COLUMN.COUNTRYCODE')} sortable body={countryCodeBodyTemplate} ></Column>
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>

                    <Dialog visible={companyCodeDialog}  style={{ width: '700px',padding:'5px' }} header={t('MENU.COMPANYCODE')} modal className="p-fluid" footer={companyDialogFooter} onHide={hideDialog}>
                        <div style={{padding:'40px'}}>
                            <div className="field">
                                <label htmlFor="name" style={{fontWeight:'bold'}}>{t('COMPANYCODE.FORM.INPUT.RESERVEDDIGIT')}</label>
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
                                    placeholder={t('COMPANYCODE.FORM.PLACEHOLDER.RESERVEDDIGIT')}
                                    className={classNames({
                                        'p-invalid': submitted && !companyCode.reserved_digit
                                    })}
                                />
                                {submitted && !companyCode.reserved_digit && <small className="p-invalid" style={{ color: 'red' }}>Reserved Digit is required.</small>}
                            </div>

                            <div className="formgrid grid">
                                <div className="field col">
                                    <label htmlFor="company" style={{fontWeight:'bold'}}>{t('COMPANYCODE.FORM.INPUT.COMPANYNAME')}</label>
                                    <Dropdown
                                        id="company"
                                        value={companyCode.company}
                                        options={companies}
                                        onChange={(e) =>
                                            setCompanyCode((prevCompanyCode) => ({

                                                ...prevCompanyCode,
                                                company: e.value,
                                            }))
                                        }
                                        optionLabel='company_name'

                                        placeholder={t('COMPANYCODE.FORM.PLACEHOLDER.COMPANYNAME')}
                                        className="w-full"
                                    />

                                </div>

                            </div>
                        </div>
                    </Dialog>

                    <Dialog visible={deleteCompanyCodeDialog} style={{ width: '450px' }} header={t('TABLE.GENERAL.CONFIRM')} modal footer={deleteCompanyDialogFooter} onHide={hideDeleteCompanyCodeDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {companyCode && (
                                <span>
                                    Are you sure you want to delete <b>{companyCode.reserved_digit}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteCompanyCodesDialog} style={{ width: '450px' }} header={t('TABLE.GENERAL.CONFIRM')} modal footer={deleteCompaniesDialogFooter} onHide={hideDeleteCompanyCodesDialog}>
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

export default withAuth(CompanyCodePage);
