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
import {Reseller } from '@/types/interface';
import { ProgressBar } from 'primereact/progressbar';
import { _addReseller, _deleteReseller, _editReseller, _fetchResellers } from '@/app/redux/actions/resellerActions';
import { FileUpload } from 'primereact/fileupload';
import { Password } from 'primereact/password';
import { _fetchDistricts } from '@/app/redux/actions/districtActions';
import { _fetchProvinces } from '@/app/redux/actions/provinceActions';
import { _fetchCurrencies } from '@/app/redux/actions/currenciesActions';

const ResellerPage = () => {


    const emptyReseller: Reseller = {
        id: 0,
        user_id: 0,
        parent_id: null,
        uuid: '',
        reseller_name: '',
        contact_name: '',
        reseller_type: '',
        email_verified_at: null,
        account_password: '',
        personal_pin: '',
        remember_token: null,
        profile_image_url: '',
        email: '',
        phone: '',
        country_id: '',
        province_id: '',
        districts_id: '',
        is_reseller_verified: 0,
        status: 0,
        payment: '',
        balance: '',
        loan_balance: '',
        total_payments_received: '',
        total_balance_sent: '',
        net_payment_balance: '',
        fcm_token: null,
        created_at: '',
        updated_at: '',
        deleted_at: null,
        user: null,
        code:'',
        country:''
      };


    const [resellerDialog, setResellerDialog] = useState(false);
    const [deleteResellerDialog, setDeleteResellerDialog] = useState(false);
    const [deleteResellersDialog, setDeleteResellersDialog] = useState(false);
    const [reseller,setReseller]=useState<Reseller>(emptyReseller)
    const [selectedCompanies, setSelectedCompanies] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);
    const dispatch=useDispatch<AppDispatch>()
    const {resellers,loading}=useSelector((state:any)=>state.resellerReducer)
    const {countries}=useSelector((state:any)=>state.countriesReducer)
    const {districts}=useSelector((state:any)=>state.districtReducer)
    const {provinces}=useSelector((state:any)=>state.provinceReducer)
    const {currencies}=useSelector((state:any)=>state.currenciesReducer)


    useEffect(()=>{
        dispatch(_fetchResellers())
        dispatch(_fetchCountries())
        dispatch(_fetchDistricts())
        dispatch(_fetchProvinces())
        dispatch(_fetchCurrencies())
    },[dispatch])



    const openNew = () => {
        setReseller(emptyReseller)
        setSubmitted(false);
        setResellerDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setResellerDialog(false);
    };

    const hideDeleteResellerDialog = () => {
        setDeleteResellerDialog(false);
    };

    const hideDeleteResellersDialog = () => {
        setDeleteResellersDialog(false);
    };



    const saveReseller = () => {
        setSubmitted(true);
        if (reseller.id && reseller.id !== 0) {
            dispatch(_editReseller(reseller.id,reseller,toast));

        } else {
            dispatch(_addReseller(reseller,toast));
        }

        setResellerDialog(false);
        setReseller(emptyReseller);
    };

    const editReseller = (reseller: Reseller) => {
        setReseller({ ...reseller});

        setResellerDialog(true);
    };

    const confirmDeleteReseller = (reseller: Reseller) => {
        setReseller(reseller);
        setDeleteResellerDialog(true);
    };

    const deleteReseller = () => {
        if (!reseller?.id) {
            console.error("Reseller ID is undefined.");
            return;
        }
        dispatch(_deleteReseller(reseller?.id,toast))
        setDeleteResellerDialog(false);

    };


    const confirmDeleteSelected = () => {
        setDeleteResellersDialog(true);
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


    const nameBodyTemplate = (rowData: Reseller) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                <div className="" style={{display:'flex',textAlign:'center',alignItems:'center', gap:'10px'}}>
                    <img
                        src={`${rowData.profile_image_url}`}
                        alt={rowData.profile_image_url.toString()}
                        className="shadow-2"
                        width="55"
                    />
                    <div style={{display:'flex',flexDirection:'column', textAlign:'start'}}>
                        <span style={{fontWeight:'bold'}}>{rowData.email}</span>
                        {rowData.reseller_name}
                    </div>
                </div>
            </>
        );
    };

    const phoneBodyTemplate = (rowData: Reseller) => {
        return (
            <>
                <span className="p-column-title">Phone</span>
                {rowData.phone}
            </>
        );
    };

    const balanceBodyTemplate = (rowData: Reseller) => {
        return (
            <>
                <span className="p-column-title">Balance</span>
                {rowData.balance}
            </>
        );
    };

    const totalPaymentBodyTemplate = (rowData: Reseller) => {
        return (
            <>
                <span className="p-column-title">Total Payment</span>
                {rowData.total_payments_received}
            </>
        );
    };

    const loanAmountBodyTemplate = (rowData: Reseller) => {
        return (
            <>
                <span className="p-column-title">Loan Amount</span>
                {rowData.loan_balance}
            </>
        );
    };

    const preferredCurrencyBodyTemplate = (rowData: Reseller) => {
        return (
            <>
                <span className="p-column-title">Preferred Currency</span>
                {rowData.code}
            </>
        );
    };

    const countryBodyTemplate = (rowData: Reseller) => {
        return (
            <>
                <span className="p-column-title">Country</span>
                {rowData.country}
            </>
        );
    };

        const statusBodyTemplate = (rowData: Reseller) => {
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




    const actionBodyTemplate = (rowData: Reseller) => {
        return (
            <>
                <Button icon="pi pi-pencil" rounded severity="success" className="mr-2"  onClick={()=>editReseller(rowData)}/>
                <Button icon="pi pi-trash" rounded severity="warning" onClick={() => confirmDeleteReseller(rowData)} />
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

    const resellerDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" text onClick={saveReseller} />
        </>
    );
    const deleteResellerDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteResellerDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteReseller} />
        </>
    );
    const deleteResellersDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteResellersDialog} />
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
                        value={resellers}
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
                        <Column field="phone" header="Phone" sortable body={phoneBodyTemplate}></Column>
                        <Column field="balance" header="Balance" sortable body={balanceBodyTemplate}></Column>
                        <Column field="total_payment" header="Total Payment" sortable body={totalPaymentBodyTemplate}></Column>
                        <Column field="loan_amount" header="Loan Amount" sortable body={loanAmountBodyTemplate}></Column>
                        <Column field="preferred_currency" header="Preferred Currency" sortable body={preferredCurrencyBodyTemplate}></Column>
                        <Column field="country" header="Country" sortable body={countryBodyTemplate}></Column>
                        <Column field="status" header="Status" sortable body={statusBodyTemplate}></Column>
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>

                    <Dialog visible={resellerDialog}  style={{ width: '650px' }} header="Reseller Details" modal className="p-fluid" footer={resellerDialogFooter} onHide={hideDialog}>
                        {reseller.profile_image_url && (
                            <img
                                src={
                                    reseller.profile_image_url instanceof File
                                        ? URL.createObjectURL(reseller.profile_image_url) // Temporary preview for file
                                        : reseller.profile_image_url // Direct URL for existing logo
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
                            onSelect={(e) => setReseller((prev) => ({
                                ...prev,
                                profile_image_url: e.files[0],
                            }))}
                        />
                        <div className='formgrid grid'>
                            <div className="field col">
                                <label htmlFor="name">Name</label>
                                <InputText
                                    id="reseller_name"
                                    value={reseller?.reseller_name}
                                    onChange={(e) =>
                                        setReseller((prev) => ({
                                            ...prev,
                                            reseller_name: e.target.value,
                                        }))
                                    }
                                    required
                                    autoFocus
                                    className={classNames({
                                        'p-invalid': submitted && !reseller.reseller_name
                                    })}
                                />
                                {submitted && !reseller.reseller_name && <small className="p-invalid">Name is required.</small>}
                            </div>

                            <div className="field col">
                                <label htmlFor="contact_name">Contact Name</label>
                                <InputText
                                    id="contact_name"
                                    value={reseller.contact_name || ''}
                                    onChange={(e) =>
                                        setReseller((prev) => ({
                                            ...prev,
                                            contact_name: e.target.value,
                                        }))
                                    }
                                    className={classNames({
                                        'p-invalid': submitted && !reseller.contact_name
                                    })}

                                />
                            </div>
                        </div>

                        <div className='formgrid grid'>
                            <div className="field col">
                                <label htmlFor="email">Email</label>
                                <InputText
                                    id="email"
                                    value={reseller?.email}
                                    onChange={(e) =>
                                        setReseller((prev) => ({
                                            ...prev,
                                            email: e.target.value,
                                        }))
                                    }
                                    required
                                    autoFocus
                                    className={classNames({
                                        'p-invalid': submitted && !reseller.email
                                    })}
                                />
                                {submitted && !reseller.email && <small className="p-invalid">Email is required.</small>}
                            </div>

                            <div className="field col">
                                <label htmlFor="phone">Phone</label>
                                <InputText
                                    id="phone"
                                    value={reseller.phone || ''}
                                    onChange={(e) =>
                                        setReseller((prev) => ({
                                            ...prev,
                                            phone: e.target.value,
                                        }))
                                    }
                                    className={classNames({
                                        'p-invalid': submitted && !reseller.phone
                                    })}

                                />
                                {submitted && !reseller.phone && <small className="p-invalid">Phone is required.</small>}
                            </div>
                        </div>

                        <div className='formgrid grid'>
                            <div className="field col">
                                <label htmlFor="password">Password</label>
                                <Password
                                    id="account_password"
                                    value={reseller?.account_password}
                                    onChange={(e) =>
                                        setReseller((prev) => ({
                                            ...prev,
                                            account_password: e.target.value,
                                        }))
                                    }
                                    required
                                    autoFocus
                                    className={classNames({
                                        'p-invalid': submitted && !reseller.account_password
                                    })}
                                />
                                {submitted && !reseller.account_password && <small className="p-invalid">Password is required.</small>}
                            </div>

                        </div>

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="country_id">Country</label>
                                <Dropdown
                                    id="country_id"
                                    value={reseller.country_id}
                                    options={countries}
                                    onChange={(e) =>
                                        setReseller((prev) => ({

                                            ...prev,
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
                                <label htmlFor="province_id">Province</label>
                                <Dropdown
                                    id="province_id"
                                    value={reseller.province_id}
                                    options={provinces}
                                    onChange={(e) =>
                                        setReseller((prev) => ({

                                            ...prev,
                                            province_id: e.value,
                                        }))
                                    }
                                    optionLabel='province_name'
                                    optionValue='id'
                                    placeholder="Choose a province"
                                    className="w-full"
                                />

                            </div>


                        </div>

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="country_id">District</label>
                                <Dropdown
                                    id="districts_id"
                                    value={reseller.districts_id}
                                    options={districts}
                                    onChange={(e) =>
                                        setReseller((prev) => ({

                                            ...prev,
                                            districts_id: e.value,
                                        }))
                                    }
                                    optionLabel='district_name'
                                    optionValue='id'
                                    placeholder="Choose a district"
                                    className="w-full"
                                />

                            </div>
                            <div className="field col">
                                <label htmlFor="code">Preferred Currency</label>
                                <Dropdown
                                    id="code"
                                    value={reseller.code}
                                    options={currencies}
                                    onChange={(e) =>
                                        setReseller((prev) => ({

                                            ...prev,
                                            code: e.value,
                                        }))
                                    }
                                    optionLabel='code'
                                    optionValue='id'
                                    placeholder="Choose a code"
                                    className="w-full"
                                />

                            </div>


                        </div>



                    </Dialog>

                    <Dialog visible={deleteResellerDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteResellerDialogFooter} onHide={hideDeleteResellerDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {reseller && (
                                <span>
                                    Are you sure you want to delete <b>{reseller.reseller_name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteResellersDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteResellersDialogFooter} onHide={hideDeleteResellersDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {reseller && <span>Are you sure you want to delete the selected companies?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default ResellerPage;
