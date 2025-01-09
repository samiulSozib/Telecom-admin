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
import { Balance, Currency } from '@/types/interface';
import { ProgressBar } from 'primereact/progressbar';
import { _addBalance, _deleteBalance, _editBalance, _fetchBalances } from '@/app/redux/actions/balanceActions';
import withAuth from '../../authGuard';
import { useTranslation } from 'react-i18next';

const BalancePage = () => {

    let emptyBalance:Balance={
        id:0,
        reseller_id:0,
        transaction_type:'',
        payment_id:0,
        amount:'',
        remaining_balance:'',
        currency_id:0,
        description:'',
        created_at:'',
        updated_at:'',
        reseller:null,
        currency:null
    }


    const [balanceDialog, setBalanceDialog] = useState(false);
    const [deleteBalanceDialog, setDeleteBalanceDialog] = useState(false);
    const [deleteBalancesDialog, setDeleteBalancesDialog] = useState(false);
    const [balance,setBalance]=useState<Balance>(emptyBalance)
    const [selectedCompanies, setSelectedBalance] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);
    const dispatch=useDispatch<AppDispatch>()
    const {balances,loading}=useSelector((state:any)=>state.balanceReducer)
    const {countries}=useSelector((state:any)=>state.countriesReducer)
    const {t}=useTranslation()


    useEffect(()=>{
        dispatch(_fetchBalances())
        dispatch(_fetchCountries())
    },[dispatch])

    const openNew = () => {
        setBalance(emptyBalance)
        setSubmitted(false);
        setBalanceDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setBalanceDialog(false);
    };

    const hideDeleteBalanceDialog = () => {
        setDeleteBalanceDialog(false);
    };

    const hideDeleteBalancesDialog = () => {
        setDeleteBalancesDialog(false);
    };



    const saveBalance = () => {
        setSubmitted(true);
        if (balance.id && balance.id !== 0) {
            dispatch(_editBalance(balance.id,balance,toast));

        } else {
            dispatch(_addBalance(balance,toast));
        }

        setBalanceDialog(false);
        setBalance(emptyBalance);
    };

    const editBalance = (balance: Balance) => {
        setBalance({ ...balance});

        setBalanceDialog(true);
    };

    const confirmDeleteBalance = (balance: Balance) => {
        setBalance(balance);
        setDeleteBalanceDialog(true);
    };

    const deleteBalance = () => {
        if (!balance?.id) {
            console.error("Balance  ID is undefined.");
            return;
        }
        dispatch(_deleteBalance(balance?.id,toast))
        setDeleteBalanceDialog(false);

    };


    const confirmDeleteSelected = () => {
        setDeleteBalancesDialog(true);
    };



    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label={t('RESELLER.BALANCETRANSACTION.ADDBALANCE')} icon="pi pi-plus" severity="success" className=" mr-2" onClick={openNew} />
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


    const resellerNameBodyTemplate = (rowData: Balance) => {
        return (
            <>
                <span className="p-column-title">Reseller</span>
                {rowData.reseller?.reseller_name}
            </>
        );
    };


    const amountBodyTemplate = (rowData: Balance) => {
        return (
            <>
                <span className="p-column-title">Amount</span>
                {rowData.amount}
            </>
        );
    };

    const currencyBodyTemplate = (rowData: Balance) => {
        return (
            <>
                <span className="p-column-title">Currency</span>
                {rowData.currency?.code}
            </>
        );
    };


    const remainingBalanceBodyTemplate = (rowData: Balance) => {
        return (
            <>
                <span className="p-column-title">Remaining Balance</span>
                {rowData.remaining_balance}
            </>
        );
    };

    const statusBodyTemplate = (rowData: Balance) => {
        return (
            <>
                <span className="p-column-title">Status</span>
                {rowData.transaction_type}
            </>
        );
    };

    const descriptionBodyTemplate = (rowData: Balance) => {
        return (
            <>
                <span className="p-column-title">Description</span>
                {rowData.description}
            </>
        );
    };

    const createdAtBodyTemplate = (rowData: Balance) => {
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




    const actionBodyTemplate = (rowData: Balance) => {
        return (
            <>
                <Button icon="pi pi-pencil" rounded severity="success" className="mr-2"  onClick={()=>editBalance(rowData)}/>
                <Button icon="pi pi-trash" rounded severity="warning" onClick={() => confirmDeleteBalance(rowData)} />
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

    const balanceDialogFooter = (
        <>
            <Button label={t('APP.GENERAL.CANCEL')} icon="pi pi-times" text onClick={hideDialog} />
            <Button label={t('FORM.GENERAL.SUBMIT')} icon="pi pi-check" text onClick={saveBalance} />
        </>
    );
    const deleteBalanceDialogFooter = (
        <>
            <Button label={t('APP.GENERAL.CANCEL')} icon="pi pi-times" text onClick={hideDeleteBalanceDialog} />
            <Button label={t('FORM.GENERAL.SUBMIT')} icon="pi pi-check" text onClick={deleteBalance} />
        </>
    );
    const deleteCompaniesDialogFooter = (
        <>
            <Button label={t('APP.GENERAL.CANCEL')} icon="pi pi-times" text onClick={hideDeleteBalancesDialog} />
            <Button label={t('FORM.GENERAL.SUBMIT')} icon="pi pi-check" text  />
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
                        value={balances}
                        selection={selectedCompanies}
                        onSelectionChange={(e) => setSelectedBalance(e.value as any)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} balance code"
                        globalFilter={globalFilter}
                        emptyMessage="No Balance s found."
                        // header={header}
                        responsiveLayout="scroll"
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
                        <Column header={t('BALANCE.TABLE.COLUMN.RESELLER')} body={resellerNameBodyTemplate} sortable></Column>
                        <Column header={t('BALANCE.TABLE.COLUMN.AMOUNT')} body={amountBodyTemplate} sortable></Column>
                        <Column header={t('BALANCE.TABLE.COLUMN.CURRENCY')} body={currencyBodyTemplate} sortable></Column>
                        <Column header={t('BALANCE.TABLE.COLUMN.REMAINING_BALANCE')} body={remainingBalanceBodyTemplate} sortable></Column>
                        <Column header={t('BALANCE.TABLE.COLUMN.STATUS')} body={statusBodyTemplate} sortable></Column>
                        <Column header={t('BALANCE.TABLE.COLUMN.DESCRIPTIONS')} body={descriptionBodyTemplate} sortable></Column>
                        <Column header={t('BALANCE.TABLE.COLUMN.BALANCEDATE')} body={createdAtBodyTemplate} sortable></Column>
                        <Column body={actionBodyTemplate} ></Column>
                    </DataTable>

                    <Dialog visible={balanceDialog}  style={{ width: '550px' }} header={t('BALANCE.DETAILS.TITLE')} modal className="p-fluid" footer={balanceDialogFooter} onHide={hideDialog}>
                        {/* <div className="field">
                            <label htmlFor="balance_name">Reseller</label>
                            <InputText
                                id="balance_name"
                                value={balance.balance_name}
                                onChange={(e) =>
                                    setBalance((prevBalance) => ({
                                        ...prevBalance,
                                        balance_name: e.target.value,
                                    }))
                                }
                                required
                                autoFocus
                                className={classNames({
                                    'p-invalid': submitted && !balance.balance_name
                                })}
                            />
                            {submitted && !balance.balance_name && <small className="p-invalid">Balance Name is required.</small>}
                        </div>



                        <div className="field col">
                                <label htmlFor="country_id">Reseller</label>
                                <Dropdown
                                    id="country_id"
                                    value={balance.country_id}
                                    options={countries}
                                    onChange={(e) =>
                                        setBalance((prev) => ({

                                            ...prev,
                                            country_id: e.value,
                                        }))
                                    }
                                    optionLabel='country_name'
                                    optionValue='id'
                                    placeholder="Choose a country"
                                    className="w-full"
                                />

                        </div> */}
                    </Dialog>

                    <Dialog visible={deleteBalanceDialog} style={{ width: '450px' }} header={t('TABLE.GENERAL.CONFIRM')} modal footer={deleteBalanceDialogFooter} onHide={hideDeleteBalanceDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {balance && (
                                <span>
                                    Are you sure you want to delete <b></b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteBalancesDialog} style={{ width: '450px' }} header={t('TABLE.GENERAL.CONFIRM')} modal footer={deleteCompaniesDialogFooter} onHide={hideDeleteBalancesDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {balance && <span>Are you sure you want to delete the selected companies?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default withAuth(BalancePage);
