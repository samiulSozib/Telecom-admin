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
import { Language } from '@/types/interface';
import { ProgressBar } from 'primereact/progressbar';
import { _addLanguage, _deleteLanguage, _editLanguage, _fetchLanguages } from '@/app/redux/actions/languageActions';

const LanguagePage = () => {


    let emptyLanguage:Language={
        id: 0,
        language_name: '',
        language_code: '',
        direction: 'ltr',
        deleted_at: '',
        created_at: '',
        updated_at: '',
    }

    const [languageDialog, setLanguageDialog] = useState(false);
    const [deleteLanguageDialog, setDeleteLanguageDialog] = useState(false);
    const [deleteLanguagesDialog, setDeleteLanguagesDialog] = useState(false);
    const [language,setLanguage]=useState<Language>(emptyLanguage)
    const [selectedCompanies, setSelectedLanguage] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);
    const dispatch=useDispatch<AppDispatch>()
    const {languages,loading}=useSelector((state:any)=>state.languageReducer)


    useEffect(()=>{
        dispatch(_fetchLanguages())
    },[dispatch])

    const openNew = () => {
        setLanguage(emptyLanguage)
        setSubmitted(false);
        setLanguageDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setLanguageDialog(false);
    };

    const hideDeleteLanguageDialog = () => {
        setDeleteLanguageDialog(false);
    };

    const hideDeleteLanguagesDialog = () => {
        setDeleteLanguagesDialog(false);
    };



    const saveLanguage = () => {
        setSubmitted(true);
        if (language.id && language.id !== 0) {
            dispatch(_editLanguage(language.id,language,toast));

        } else {
            dispatch(_addLanguage(language,toast));
        }

        setLanguageDialog(false);
        setLanguage(emptyLanguage);
    };

    const editLanguage = (language: Language) => {
        setLanguage({ ...language});

        setLanguageDialog(true);
    };

    const confirmDeleteLanguage = (language: Language) => {
        setLanguage(language);
        setDeleteLanguageDialog(true);
    };

    const deleteLanguage = () => {
        if (!language?.id) {
            console.error("Language  ID is undefined.");
            return;
        }
        dispatch(_deleteLanguage(language?.id,toast))
        setDeleteLanguageDialog(false);

    };


    const confirmDeleteSelected = () => {
        setDeleteLanguagesDialog(true);
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


    const languageCodeBodyTemplate = (rowData: Language) => {
        return (
            <>
                <span className="p-column-title">Language Code</span>
                {rowData.language_code}
            </>
        );
    };

    const languageNameBodyTemplate = (rowData: Language) => {
        return (
            <>
                <span className="p-column-title">Language Name</span>
                {rowData.language_name}
            </>
        );
    };

    const directionBodyTemplate = (rowData: Language) => {
        return (
            <>
                <span className="p-column-title">Direction</span>
                {rowData.direction}
            </>
        );
    };







    const actionBodyTemplate = (rowData: Language) => {
        return (
            <>
                <Button icon="pi pi-pencil" rounded severity="success" className="mr-2"  onClick={()=>editLanguage(rowData)}/>
                <Button icon="pi pi-trash" rounded severity="warning" onClick={() => confirmDeleteLanguage(rowData)} />
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

    const languageDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" text onClick={saveLanguage} />
        </>
    );
    const deleteLanguageDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteLanguageDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteLanguage} />
        </>
    );
    const deleteCompaniesDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteLanguagesDialog} />
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
                        value={languages}
                        selection={selectedCompanies}
                        onSelectionChange={(e) => setSelectedLanguage(e.value as any)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} language code"
                        globalFilter={globalFilter}
                        emptyMessage="No Language s found."
                        // header={header}
                        responsiveLayout="scroll"
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
                        <Column field="name" header="Language" sortable body={languageNameBodyTemplate}></Column>
                        <Column field="language_code" header="Language Code" body={languageCodeBodyTemplate} sortable></Column>
                        <Column field="direction" header="Direction" sortable body={directionBodyTemplate} ></Column>
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>

                    <Dialog visible={languageDialog}  style={{ width: '550px' }} header="Language Details" modal className="p-fluid" footer={languageDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="language_name">Language Name</label>
                            <InputText
                                id="language_name"
                                value={language.language_name}
                                onChange={(e) =>
                                    setLanguage((prevLanguage) => ({
                                        ...prevLanguage,
                                        language_name: e.target.value,
                                    }))
                                }
                                required
                                autoFocus
                                className={classNames({
                                    'p-invalid': submitted && !language.language_name
                                })}
                            />
                            {submitted && !language.language_name && <small className="p-invalid">Language Name is required.</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="language_code">Language Code</label>
                            <InputText
                                id="language_code"
                                value={language.language_code}
                                onChange={(e) =>
                                    setLanguage((prevLanguage) => ({
                                        ...prevLanguage,
                                        language_code: e.target.value,
                                    }))
                                }
                                required
                                autoFocus
                                className={classNames({
                                    'p-invalid': submitted && !language.language_code
                                })}
                            />
                            {submitted && !language.language_code && <small className="p-invalid">Language Code is required.</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="status">Direction</label>
                            <Dropdown
                                id="direction"
                                value={language.direction}
                                options={[
                                    { label: 'Left to Right(ltr)', value: "ltr" },
                                    { label: 'Right to Left(rtl)', value: 'rtl' },
                                ]}
                                onChange={(e) =>
                                    setLanguage((prev) => ({
                                        ...prev,
                                        direction: e.value,
                                    }))
                                }
                                optionLabel="label"
                                optionValue="value"
                                placeholder="Choose a direction"
                                className="w-full"
                            />
                        </div>
                    </Dialog>

                    <Dialog visible={deleteLanguageDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteLanguageDialogFooter} onHide={hideDeleteLanguageDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {language && (
                                <span>
                                    Are you sure you want to delete <b>{language.language_name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteLanguagesDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteCompaniesDialogFooter} onHide={hideDeleteLanguagesDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {language && <span>Are you sure you want to delete the selected companies?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default LanguagePage;
