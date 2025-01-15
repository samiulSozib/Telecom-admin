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
import {Country, Currency, Reseller } from '@/types/interface';
import { ProgressBar } from 'primereact/progressbar';
import { _addReseller, _changeResellerStatus, _deleteReseller, _editReseller, _fetchResellers, _getResellerById } from '@/app/redux/actions/resellerActions';
import { FileUpload } from 'primereact/fileupload';
import { Password } from 'primereact/password';
import { _fetchDistricts } from '@/app/redux/actions/districtActions';
import { _fetchProvinces } from '@/app/redux/actions/provinceActions';
import { _fetchCurrencies } from '@/app/redux/actions/currenciesActions';
import withAuth from '../../authGuard';
import { useTranslation } from 'react-i18next';
import { resellerGroupReducer } from '@/app/redux/reducers/resellerGroupReducer';
import { _fetchResellerGroups } from '@/app/redux/actions/resellerGroupActions';
import { InputSwitch } from 'primereact/inputswitch';
import { SplitButton } from 'primereact/splitbutton';
import { useRouter } from 'next/navigation';

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
        country_id: 0,
        province_id: 0,
        districts_id: 0,
        is_reseller_verified: 0,
        status: 0,
        payment: '0.00000',
        balance: 0,
        loan_balance: '0.00000',
        total_payments_received: '0.00000',
        total_balance_sent: '0.00000',
        net_payment_balance: '0.00000',
        fcm_token: null,
        created_at: '',
        updated_at: '',
        deleted_at: null,
        user: null,
        code:'',
        country:'',
        province:'',
        district:'',
        reseller_group_id:0,
        can_create_sub_resellers:0,
        sub_reseller_limit:0,
        sub_resellers_can_create_sub_resellers:0
      };


    const [resellerDialog, setResellerDialog] = useState(false);
    const [deleteResellerDialog, setDeleteResellerDialog] = useState(false);
    const [deleteResellersDialog, setDeleteResellersDialog] = useState(false);
    const [statusResellerDialog,setStatusResellerDialog]=useState(false)
    const [reseller,setReseller]=useState<Reseller>(emptyReseller)
    const [selectedCompanies, setSelectedCompanies] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);
    const dispatch=useDispatch<AppDispatch>()
    const {resellers,loading,singleReseller}=useSelector((state:any)=>state.resellerReducer)
    const {countries}=useSelector((state:any)=>state.countriesReducer)
    const {districts}=useSelector((state:any)=>state.districtReducer)
    const {provinces}=useSelector((state:any)=>state.provinceReducer)
    const {currencies}=useSelector((state:any)=>state.currenciesReducer)
    const {reseller_groups}=useSelector((state:any)=>state.resellerGroupReducer)
    const {t}=useTranslation()
    const router=useRouter()


    useEffect(()=>{
        dispatch(_fetchResellers())
        dispatch(_fetchCountries())
        dispatch(_fetchDistricts())
        dispatch(_fetchProvinces())
        dispatch(_fetchCurrencies())
        dispatch(_fetchResellerGroups())
    },[dispatch])

    useEffect(()=>{
        //console.log(resellers)
    },[dispatch,resellers])


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

    const hideStatusResellerDialog = () => {
        setStatusResellerDialog(false);
    };

    const hideDeleteResellersDialog = () => {
        setDeleteResellersDialog(false);
    };



    const saveReseller = () => {
        setSubmitted(true);
        //console.log(reseller.code)
        //return
        if (reseller.id && reseller.id !== 0) {
            dispatch(_editReseller(reseller.id,reseller,toast));

        } else {
            dispatch(_addReseller(reseller,toast));
        }

        setResellerDialog(false);
        setReseller(emptyReseller);
    };

    const editReseller = (reseller: Reseller) => {
        //console.log(reseller)
        setReseller({ ...reseller,
            country_id:parseInt(reseller.country_id?.toString()),
            province_id:parseInt(reseller.province_id?.toString()),
            districts_id:parseInt(reseller.districts_id?.toString()),
        });

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

    const confirmChangeStatus=(reseller:Reseller)=>{
        setReseller(reseller)
        setStatusResellerDialog(true)
    }

    const changeResellerStatus=()=>{
        if (!reseller?.id) {
            console.error("Reseller ID is undefined.");
            return;
        }
        dispatch(_changeResellerStatus(reseller?.id,reseller.status,toast))
        setStatusResellerDialog(false);
    }

    const viewResellerDetails=(reseller:Reseller)=>{
        //dispatch(_getResellerById(reseller.id))
        router.push(`/pages/reseller/${reseller.id}`);
    }

    useEffect(()=>{
        //console.log(singleReseller)
    },[dispatch,singleReseller])


    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="flex justify-end items-center space-x-2">
                    <Button label={t('RESELLER.TABLE.CREATERESELLER')} icon="pi pi-plus" severity="success" className=" mr-2" onClick={openNew} />
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


    const nameBodyTemplate = (rowData: Reseller) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                <div className="" style={{display:'flex',textAlign:'center',alignItems:'center', gap:'10px'}}>
                    <img
                        src={`${rowData.profile_image_url}`}
                        alt={rowData.reseller_name}
                        className="shadow-2"
                        style={{
                            width: '55px',
                            height: '55px',
                            borderRadius: '50%', // Makes the image circular
                            objectFit: 'cover', // Ensures the image is cropped correctly within the circle
                        }}
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
            //const menuType = rowData.menuType; // Assuming `menuType` is part of your data

            // Define the dropdown actions
            const items = [
                {
                    label: 'Edit',
                    icon: 'pi pi-pencil',
                    command: () => editReseller(rowData),
                    //disabled: menuType === 'guest', // Example condition
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-trash',
                    command: () => confirmDeleteReseller(rowData),
                    //disabled: menuType !== 'admin', // Example condition
                },
                {
                    label: 'Activate',
                    icon: 'pi pi-check',
                    command: () => confirmChangeStatus(rowData),
                    visible: rowData.status === 0, // Disable if already active
                },
                {
                    label: 'Deactivate',
                    icon: 'pi pi-times',
                    command: () => confirmChangeStatus(rowData),
                    visible: rowData.status === 1, // Disable if already inactive
                },
                {
                    label: 'View Details',
                    icon: 'pi pi-info-circle',
                    command: () => viewResellerDetails(rowData),
                },
            ];

            return (
                <SplitButton
                    label="Actions"
                    icon="pi pi-cog"
                    model={items}
                    className="p-button-rounded"
                    severity="info" // Optional: change severity or style
                />
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
            <Button label={t('APP.GENERAL.CANCEL')} icon="pi pi-times" severity="danger" onClick={hideDialog} />
            <Button label={t('FORM.GENERAL.SUBMIT')} icon="pi pi-check" severity="success" onClick={saveReseller} />
        </>
    );
    const deleteResellerDialogFooter = (
        <>
            <Button label={t('APP.GENERAL.CANCEL')} icon="pi pi-times" severity="danger" onClick={hideDeleteResellerDialog} />
            <Button label={t('FORM.GENERAL.SUBMIT')}  icon="pi pi-check" severity="success" onClick={deleteReseller} />
        </>
    );

    const statusResellerDialogFooter = (
        <>
            <Button label={t('APP.GENERAL.CANCEL')} icon="pi pi-times" severity="danger" onClick={hideStatusResellerDialog} />
            <Button label={t('FORM.GENERAL.SUBMIT')}  icon="pi pi-check" severity="success" onClick={changeResellerStatus} />
        </>
    );
    const deleteResellersDialogFooter = (
        <>
            <Button label={t('APP.GENERAL.CANCEL')} icon="pi pi-times" severity="danger" onClick={hideDeleteResellersDialog} />
            <Button label={t('FORM.GENERAL.SUBMIT')} icon="pi pi-check" severity="success"  />
        </>
    );




useEffect(() => {
        if (reseller.code) {
            const selectedCode = currencies.find((currency:Currency) => currency.code === reseller.code);

            if (selectedCode) {
                setReseller((prev) => ({
                    ...prev,
                    code: selectedCode.id, // Update with the selected company object
                }));
            }
        }
    }, [reseller.code, currencies]);


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
                        <Column field="name" header={t('RESELLER.TABLE.COLUMN.RESELLERNAME')} sortable body={nameBodyTemplate}></Column>
                        <Column field="phone" header={t('RESELLER.TABLE.COLUMN.PHONE')} sortable body={phoneBodyTemplate}></Column>
                        <Column field="balance" header={t('MENU.BALANCE')} sortable body={balanceBodyTemplate}></Column>
                        <Column field="total_payment" header={t('RESELLER.TABLE.COLUMN.PAYMENT')} sortable body={totalPaymentBodyTemplate}></Column>
                        <Column field="loan_amount" header={t('RESELLER.TABLE.COLUMN.LOANAMOUNT')} sortable body={loanAmountBodyTemplate}></Column>
                        <Column field="preferred_currency" header={t('RESELLER.TABLE.COLUMN.CURRENCYPREFERENCE')} sortable body={preferredCurrencyBodyTemplate}></Column>
                        <Column field="country" header={t('RESELLER.TABLE.COLUMN.COUNTRY')} sortable body={countryBodyTemplate}></Column>
                        <Column field="status" header={t('BUNDLE.TABLE.FILTER.STATUS')} sortable body={statusBodyTemplate}></Column>
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>

                    <Dialog visible={resellerDialog}  style={{ width: '900px',padding:'5px' }} header="Reseller Details" modal className="p-fluid" footer={resellerDialogFooter} onHide={hideDialog}>
                        <div style={{padding:"10px"}}>
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
                        mode="basic"
                            name="company_logo"
                            accept="image/*"
                            customUpload
                            onSelect={(e) => setReseller((prev:Reseller) => ({
                                ...prev,
                                profile_image_url: e.files[0],
                            }))}
                            style={{textAlign:'center',marginBottom:'10px'}}
                        />
                        <div className='formgrid grid'>
                            <div className="field col">
                                <label style={{fontWeight:'bold'}} htmlFor="name">{t('RESELLER.FORM.INPUT.RESELLERNAME')}</label>
                                <InputText
                                    id="reseller_name"
                                    value={reseller?.reseller_name}
                                    onChange={(e) =>
                                        setReseller((prev:Reseller) => ({
                                            ...prev,
                                            reseller_name: e.target.value,
                                        }))
                                    }
                                    required
                                    autoFocus
                                    placeholder={t('RESELLER.FORM.PLACEHOLDER.RESELLERNAME')}
                                    className={classNames({
                                        'p-invalid': submitted && !reseller.reseller_name
                                    })}
                                />
                                {submitted && !reseller.reseller_name && <small className="p-invalid" style={{ color: 'red' }}>Name is required.</small>}
                            </div>

                            <div className="field col">
                                <label style={{fontWeight:'bold'}} htmlFor="name">{t('RESELLER.FORM.INPUT.CONTACTNAME')}</label>
                                <InputText
                                    id="contact_name"
                                    value={reseller.contact_name || ''}
                                    onChange={(e) =>
                                        setReseller((prev:Reseller) => ({
                                            ...prev,
                                            contact_name: e.target.value,
                                        }))
                                    }
                                    placeholder={t('RESELLER.FORM.PLACEHOLDER.CONTACTNAME')}
                                    className={classNames({
                                        'p-invalid': submitted && !reseller.contact_name
                                    })}

                                />
                            </div>
                        </div>

                        <div className='formgrid grid'>
                            <div className="field col">
                                <label style={{fontWeight:'bold'}} htmlFor="name">{t('RESELLER.FORM.INPUT.EMAIL')}</label>
                                <InputText
                                    id="email"
                                    value={reseller?.email}
                                    onChange={(e) =>
                                        setReseller((prev:Reseller) => ({
                                            ...prev,
                                            email: e.target.value,
                                        }))
                                    }
                                    required
                                    autoFocus
                                    placeholder={t('RESELLER.FORM.PLACEHOLDER.EMAIL')}
                                    className={classNames({
                                        'p-invalid': submitted && !reseller.email
                                    })}
                                />
                                {submitted && !reseller.email && <small className="p-invalid" style={{ color: 'red' }}>Email is required.</small>}
                            </div>

                            <div className="field col">
                                <label style={{fontWeight:'bold'}} htmlFor="name">{t('RESELLER.FORM.INPUT.PHONE')}</label>
                                <InputText
                                    id="phone"
                                    value={reseller.phone || ''}
                                    onChange={(e) =>
                                        setReseller((prev:Reseller) => ({
                                            ...prev,
                                            phone: e.target.value,
                                        }))
                                    }
                                    placeholder={t('RESELLER.FORM.PLACEHOLDER.PHONE')}
                                    className={classNames({
                                        'p-invalid': submitted && !reseller.phone
                                    })}

                                />
                                {submitted && !reseller.phone && <small className="p-invalid" style={{ color: 'red' }}>Phone is required.</small>}
                            </div>
                        </div>
                        {reseller.id === 0 && (
                            <div className='formgrid grid'>
                                <div className="field col">
                                    <label style={{fontWeight:'bold'}} htmlFor="password">Password</label>
                                    <Password
                                        id="account_password"
                                        value={reseller?.account_password}
                                        onChange={(e) =>
                                            setReseller((prev:Reseller) => ({
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
                                    {submitted && !reseller.account_password && <small className="p-invalid" style={{ color: 'red' }}>Password is required.</small>}
                                </div>

                            </div>
                        )}
                        <div className="formgrid grid">
                            <div className="field col">
                                <label style={{fontWeight:'bold'}} htmlFor="name">{t('RESELLER.FORM.INPUT.COUNTRY')}</label>
                                <Dropdown
                                    id="country_id"
                                    value={reseller.country_id}
                                    options={countries}
                                    onChange={(e) =>
                                        setReseller((prev:Reseller) => ({

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
                                <label style={{fontWeight:'bold'}} htmlFor="name">{t('RESELLER.FORM.INPUT.PROVINCE')}</label>
                                <Dropdown
                                    id="province_id"
                                    value={reseller.province_id}
                                    options={provinces}
                                    onChange={(e) =>
                                        setReseller((prev:Reseller) => ({

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
                                <label style={{fontWeight:'bold'}} htmlFor="name">{t('RESELLER.FORM.INPUT.DISTRICT')}</label>
                                <Dropdown
                                    id="districts_id"
                                    value={reseller.districts_id}
                                    options={districts}
                                    onChange={(e) =>
                                        setReseller((prev:Reseller) => ({

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
                                <label style={{fontWeight:'bold'}} htmlFor="name">{t('RESELLER.FORM.INPUT.CURRENCYPREFERENCE')}</label>
                                <Dropdown
                                    id="code"
                                    value={reseller.code}
                                    options={currencies}
                                    onChange={(e) =>
                                        setReseller((prev:Reseller) => ({

                                            ...prev,
                                            code: e.value,
                                        }))
                                    }
                                    optionLabel='code'
                                    optionValue='id'
                                    placeholder={t('RESELLER.FORM.PLACEHOLDER.CURRENCY')}
                                    className="w-full"
                                />

                            </div>

                        </div>

                        <div className="formgrid grid">
                            <div className="field col">
                                <label style={{fontWeight:'bold'}} htmlFor="name">Reseller Group</label>
                                <Dropdown
                                    id="reseller_group_id"
                                    value={reseller.reseller_group_id}
                                    options={reseller_groups}
                                    onChange={(e) =>
                                        setReseller((prev:Reseller) => ({

                                            ...prev,
                                            reseller_group_id: e.value,
                                        }))
                                    }
                                    optionLabel='name'
                                    optionValue='id'
                                    placeholder="Choose a group"
                                    className="w-full"
                                />

                            </div>
                            <div className="field col">
                                <label style={{fontWeight:'bold'}} htmlFor="name">Sub Reseller Limit</label>
                                <InputText
                                    id="sub_reseller_limit"
                                    value={reseller.sub_reseller_limit.toString()}
                                    onChange={(e) =>
                                        setReseller((prev:Reseller) => ({
                                            ...prev,
                                            sub_reseller_limit: e.target.value,
                                        }))
                                    }
                                    placeholder='Sub Reseller limit'
                                    className={classNames({
                                        'p-invalid': submitted && !reseller.phone
                                    })}

                                />

                            </div>

                        </div>

                        <div className="formgrid grid">
                            <div className="field col flex align-items-center gap-2" >

                                <InputSwitch
                                    id="can_create_sub_resellers"
                                    checked={reseller.can_create_sub_resellers===1} // Replace logic as needed
                                    onChange={(e) =>
                                        setReseller((prev: Reseller) => ({
                                        ...prev,
                                        can_create_sub_resellers: e.value ? 1 : 0, // Adjust values based on your requirements
                                        }))
                                    }
                                    className="w-small"
                                />
                                <label style={{ fontWeight: 'bold' }} htmlFor="inputSwitch1">Can Create Sub Reseller</label>
                            </div>

                            <div className="field col flex align-items-center gap-2">

                                <InputSwitch
                                    id="sub_resellers_can_create_sub_resellers"
                                    checked={reseller.sub_resellers_can_create_sub_resellers===1} // Replace logic as needed
                                    onChange={(e) =>
                                        setReseller((prev: Reseller) => ({
                                        ...prev,
                                        sub_resellers_can_create_sub_resellers: e.value ? 1 : 0, // Adjust values based on your requirements
                                        }))
                                    }
                                    className="w-small"
                                />
                                <label style={{ fontWeight: 'bold' }} htmlFor="inputSwitch1">Sub Reseller Can Create Sub Reseller</label>
                            </div>


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

                    <Dialog visible={statusResellerDialog} style={{ width: '450px' }} header="Confirm" modal footer={statusResellerDialogFooter} onHide={hideStatusResellerDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {reseller && (
                                <span>
                                    Are you sure you want to change status <b>{reseller.reseller_name}</b>?
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

export default withAuth(ResellerPage);
