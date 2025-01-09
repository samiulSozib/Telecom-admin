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
import { User } from '@/types/interface';
import { ProgressBar } from 'primereact/progressbar';
import { _fetchCurrencies } from '@/app/redux/actions/currenciesActions';
import { _fetchLanguages } from '@/app/redux/actions/languageActions';
import { InputTextarea } from 'primereact/inputtextarea';
import { _addUser, _deleteUser, _editUser, _fetchUserList } from '@/app/redux/actions/userListActions';
import { userReducer } from '../../../redux/reducers/userListReducer';
import { rolesReducer } from '../../../redux/reducers/rolesReducer';
import { _fetchRoleList } from '@/app/redux/actions/rolesActions';

const UserListGroupPage = () => {

    let emptyUser:any={
        id: 0,
        uuid: '',
        first_name: '',
        last_name:'',
        email: '',
        password:'',
        confirm_password:'',
        phone_number: '',
        user_type: '',
        email_verified_at: '' ,
        currency_preference_code: '',
        currency_preference_id: 0,
        fcm_token: '',
        deleted_at: '' ,
        created_at: '',
        updated_at: '',
        currency: null,
        roles:null
    }



    const [userListDialog, setUserListDialog] = useState(false);
    const [deleteUserListDialog, setDeleteUserListDialog] = useState(false);
    const [deleteUserListsDialog, setDeleteUserListsDialog] = useState(false);
    const [user,setUser]=useState<any>(emptyUser)
    const [selectedCompanies, setSelectedUserList] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);
    const dispatch=useDispatch<AppDispatch>()
    const {currencies}=useSelector((state:any)=>state.currenciesReducer)
    const {roles}=useSelector((state:any)=>state.rolesReducer)
    const {users,loading}=useSelector((state:any)=>state.userReducer)



    useEffect(()=>{
        dispatch(_fetchUserList())
        dispatch(_fetchCurrencies())
        dispatch(_fetchRoleList())
    },[dispatch])

    const openNew = () => {
        setUser(emptyUser)
        setSubmitted(false);
        setUserListDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setUserListDialog(false);
    };

    const hideDeleteUserListDialog = () => {
        setDeleteUserListDialog(false);
    };

    const hideDeleteUserListsDialog = () => {
        setDeleteUserListsDialog(false);
    };



    const saveUserList = () => {
        setSubmitted(true);
        if (user.id && user.id !== 0) {
            dispatch(_editUser(user.id,user,toast));

        } else {
            dispatch(_addUser(user,toast));
        }

        setUserListDialog(false);
        setUser(emptyUser);
    };

    const editUserList = (user: User) => {
        setUser({ ...user});

        setUserListDialog(true);
    };

    const confirmDeleteUserList = (user: User) => {
        setUser(user);
        setDeleteUserListDialog(true);
    };

    const deleteUserList = () => {
        if (!user?.id) {
            console.error("UserList  ID is undefined.");
            return;
        }
        dispatch(_deleteUser(user?.id,toast))
        setDeleteUserListDialog(false);

    };


    const confirmDeleteSelected = () => {
        setDeleteUserListsDialog(true);
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




    const userNameBodyTemplate = (rowData: User) => {
        return (
            <>
                <span className="p-column-title">First Name</span>
                {rowData.name}
            </>
        );
    };

    const emailBodyTemplate = (rowData: User) => {
        return (
            <>
                <span className="p-column-title">Email</span>
                {rowData.email}
            </>
        );
    };

    const phoneNumberBodyTemplate = (rowData: User) => {
        return (
            <>
                <span className="p-column-title">Phone Number</span>
                {rowData.phone}
            </>
        );
    };

    const roleBodyTemplate = (rowData: User) => {
        return (
            <>
                <span className="p-column-title">Role</span>
                {rowData.roles && rowData.roles.length > 0
                    ? rowData.roles.map((role) => role.name).join(', ')
                    : 'No roles assigned'}
            </>
        );
    };









    const actionBodyTemplate = (rowData: User) => {
        return (
            <>
                <Button icon="pi pi-pencil" rounded severity="success" className="mr-2"  onClick={()=>editUserList(rowData)}/>
                <Button icon="pi pi-trash" rounded severity="warning" onClick={() => confirmDeleteUserList(rowData)} />
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

    const userListDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" text onClick={saveUserList} />
        </>
    );
    const deleteUserListDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteUserListDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteUserList} />
        </>
    );
    const deleteCompaniesDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteUserListsDialog} />
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
                        value={users}
                        selection={selectedCompanies}
                        onSelectionChange={(e) => setSelectedUserList(e.value as any)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} userList code"
                        globalFilter={globalFilter}
                        emptyMessage="No UserList s found."
                        // header={header}
                        responsiveLayout="scroll"
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
                        <Column field="name" header="First Name" sortable body={userNameBodyTemplate}></Column>
                        <Column field="guard_name" header="Email" body={emailBodyTemplate} sortable></Column>
                        <Column field="guard_name" header="Phone Number" body={phoneNumberBodyTemplate} sortable></Column>
                        <Column field="guard_name" header="Role" body={roleBodyTemplate} sortable></Column>
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>


                    <Dialog visible={userListDialog}  style={{ width: '750px' }} header="User Details" modal className="p-fluid" footer={userListDialogFooter} onHide={hideDialog}>
                        <div className="card flex flex-column md:flex-row gap-3">
                            <div>
                                <div className="field col flex-1">
                                    <label htmlFor="supplier">First Name</label>
                                    <InputText
                                        id="name"
                                        value={user.name}
                                        onChange={(e) =>
                                            setUser((prev:any) => ({
                                                ...prev,
                                                name: e.target.value,
                                            }))
                                        }
                                        required
                                        autoFocus
                                        className={classNames({
                                            'p-invalid': submitted && !user.name
                                        })}
                                    />
                                </div>

                                <div className="field col flex-1">
                                    <label htmlFor="supplier">Email</label>
                                    <InputText
                                        id="discount_value"
                                        value={user.email}
                                        onChange={(e) =>
                                            setUser((prev:any) => ({
                                                ...prev,
                                                email: e.target.value,
                                            }))
                                        }
                                        required
                                        autoFocus
                                        className={classNames({
                                            'p-invalid': submitted && !user.email
                                        })}
                                    />
                                </div>

                                <div className="field col flex-1">
                                    <label htmlFor="supplier">Password</label>
                                    <InputText
                                        id="sub_reseller_limit"
                                        value={user.password}
                                        onChange={(e) =>
                                            setUser((prev:any) => ({
                                                ...prev,
                                                password: e.target.value,
                                            }))
                                        }
                                        required
                                        autoFocus
                                        className={classNames({
                                            'p-invalid': submitted && !user.sub_reseller_limit
                                        })}
                                    />
                                </div>

                                <div className="field col flex-1">
                                    <label htmlFor="supplier">Confirm Password</label>
                                    <InputText
                                        id="sub_reseller_limit"
                                        value={user.confirm_password}
                                        onChange={(e) =>
                                            setUser((prev:any) => ({
                                                ...prev,
                                                confirm_password: e.target.value,
                                            }))
                                        }
                                        required
                                        autoFocus
                                        className={classNames({
                                            'p-invalid': submitted && !user.confirm_password
                                        })}
                                    />
                                </div>


                            </div>
                            <br />
                            <div>
                            <div className="field col flex-1">
                                    <label htmlFor="supplier">Phone Number</label>
                                    <InputText
                                        id="phone"
                                        //value={user.phone.toString()}
                                        onChange={(e) =>
                                            setUser((prev:any) => ({
                                                ...prev,
                                                phone: e.target.value,
                                            }))
                                        }
                                        required
                                        autoFocus
                                        className={classNames({
                                            'p-invalid': submitted && !user.phone
                                        })}
                                    />
                                </div>
                                <div className="field col flex-1">
                                    <label htmlFor="discount_type">Role</label>
                                    <Dropdown
                                        id="discount_type"
                                        value={user.roles}
                                        options={roles}
                                        onChange={(e) =>
                                            setUser((prev:any) => ({
                                                ...prev,
                                                role: e.value,
                                            }))
                                        }
                                        optionLabel="name"
                                        optionValue="id"

                                        placeholder="Choose a Role"
                                        className="w-full"
                                    />
                                </div>
                                <div className="field col flex-1">
                                    <label htmlFor="status">Currency</label>
                                    <Dropdown
                                        id="currency_preference_id"
                                        value={user.currency_preference_id}
                                        options={currencies}
                                        onChange={(e) =>
                                            setUser((prev:any) => ({
                                                ...prev,
                                                currency_preference_id: e.value,
                                            }))
                                        }
                                        optionLabel="name"
                                        optionValue="id"
                                        placeholder="Choose a currency"
                                        className="w-full"
                                    />
                                </div>

                            </div>


                        </div>
                    </Dialog>

                    <Dialog visible={deleteUserListDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteUserListDialogFooter} onHide={hideDeleteUserListDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {user && (
                                <span>
                                    Are you sure you want to delete <b>{user.name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteUserListsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteCompaniesDialogFooter} onHide={hideDeleteUserListsDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {user && <span>Are you sure you want to delete the selected companies?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default UserListGroupPage;
