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
import { ResellerGroup } from '@/types/interface';
import { ProgressBar } from 'primereact/progressbar';
import { _addResellerGroup, _deleteResellerGroup, _editResellerGroup, _fetchResellerGroups } from '@/app/redux/actions/resellerGroupActions';
import { _fetchCurrencies } from '@/app/redux/actions/currenciesActions';
import { _fetchLanguages } from '@/app/redux/actions/languageActions';
import { FileUpload } from 'primereact/fileupload';
import { resellerGroupReducer } from '../../../redux/reducers/resellerGroupReducer';
import { InputTextarea } from 'primereact/inputtextarea';

const ResellerGroupPage = () => {

    let emptyResellerGroup:ResellerGroup={
        id:0,
        name:'',
        discount_type:'',
        discount_value:'',
        can_create_sub_resellers:0,
        can_sub_reseller_create_subs:0,
        sub_reseller_limit:0,
        status:'',
        notes:'',
        created_at:'',
        updated_at:''
    }



    const [resellerGroupDialog, setResellerGroupDialog] = useState(false);
    const [deleteResellerGroupDialog, setDeleteResellerGroupDialog] = useState(false);
    const [deleteResellerGroupsDialog, setDeleteResellerGroupsDialog] = useState(false);
    const [resellerGroup,setResellerGroup]=useState<ResellerGroup>(emptyResellerGroup)
    const [selectedCompanies, setSelectedResellerGroup] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);
    const dispatch=useDispatch<AppDispatch>()
    const {countries,loading}=useSelector((state:any)=>state.countriesReducer)
    const {currencies}=useSelector((state:any)=>state.currenciesReducer)
    const {languages}=useSelector((state:any)=>state.languageReducer)
    const {reseller_groups}=useSelector((state:any)=>state.resellerGroupReducer)


    useEffect(()=>{
        dispatch(_fetchResellerGroups())

    },[dispatch])

    const openNew = () => {
        setResellerGroup(emptyResellerGroup)
        setSubmitted(false);
        setResellerGroupDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setResellerGroupDialog(false);
    };

    const hideDeleteResellerGroupDialog = () => {
        setDeleteResellerGroupDialog(false);
    };

    const hideDeleteResellerGroupsDialog = () => {
        setDeleteResellerGroupsDialog(false);
    };



    const saveResellerGroup = () => {
        setSubmitted(true);
        if (resellerGroup.id && resellerGroup.id !== 0) {
            dispatch(_editResellerGroup(resellerGroup.id,resellerGroup,toast));

        } else {
            dispatch(_addResellerGroup(resellerGroup,toast));
        }

        setResellerGroupDialog(false);
        setResellerGroup(emptyResellerGroup);
    };

    const editResellerGroup = (resellerGroup: ResellerGroup) => {
        setResellerGroup({ ...resellerGroup});

        setResellerGroupDialog(true);
    };

    const confirmDeleteResellerGroup = (resellerGroup: ResellerGroup) => {
        setResellerGroup(resellerGroup);
        setDeleteResellerGroupDialog(true);
    };

    const deleteResellerGroup = () => {
        if (!resellerGroup?.id) {
            console.error("ResellerGroup  ID is undefined.");
            return;
        }
        dispatch(_deleteResellerGroup(resellerGroup?.id,toast))
        setDeleteResellerGroupDialog(false);

    };


    const confirmDeleteSelected = () => {
        setDeleteResellerGroupsDialog(true);
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




    const resellerGroupNameBodyTemplate = (rowData: ResellerGroup) => {
        return (
            <>
                <span className="p-column-title">ResellerGroup</span>
                {rowData.name}
            </>
        );
    };

    const discount_typeBodyTemplate = (rowData: ResellerGroup) => {
        return (
            <>
                <span className="p-column-title">Discount Type</span>
                {rowData.discount_type}
            </>
        );
    };

    const discount_valueBodyTemplate = (rowData: ResellerGroup) => {
        return (
            <>
                <span className="p-column-title">Discount Value</span>
                {rowData.discount_value}
            </>
        );
    };

    const subresellerLimitBodyTemplate = (rowData: ResellerGroup) => {
        return (
            <>
                <span className="p-column-title">Sub reseller Limit</span>
                {rowData.sub_reseller_limit}
            </>
        );
    };

    const canAddSubResellerBodyTemplate = (rowData: ResellerGroup) => {
        return (
            <>
                <span className="p-column-title">Can Add Sub-reseller</span>
                {rowData.can_create_sub_resellers}
            </>
        );
    };

    const canSubResellerCreateSubsBodyTemplate = (rowData: ResellerGroup) => {
        return (
            <>
                <span className="p-column-title">Can Sub-reseller Add Sub</span>
                {rowData.can_sub_reseller_create_subs}
            </>
        );
    };

    const statusBodyTemplate = (rowData: ResellerGroup) => {
        return (
            <>
                <span className="p-column-title">Status</span>
                {rowData.status}
            </>
        );
    };

    const notesBodyTemplate = (rowData: ResellerGroup) => {
        return (
            <>
                <span className="p-column-title">Notes</span>
                {rowData.notes}
            </>
        );
    };






    const actionBodyTemplate = (rowData: ResellerGroup) => {
        return (
            <>
                <Button icon="pi pi-pencil" rounded severity="success" className="mr-2"  onClick={()=>editResellerGroup(rowData)}/>
                <Button icon="pi pi-trash" rounded severity="warning" onClick={() => confirmDeleteResellerGroup(rowData)} />
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

    const resellerGroupDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" text onClick={saveResellerGroup} />
        </>
    );
    const deleteResellerGroupDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteResellerGroupDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteResellerGroup} />
        </>
    );
    const deleteCompaniesDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteResellerGroupsDialog} />
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
                        value={reseller_groups}
                        selection={selectedCompanies}
                        onSelectionChange={(e) => setSelectedResellerGroup(e.value as any)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} resellerGroup code"
                        globalFilter={globalFilter}
                        emptyMessage="No ResellerGroup s found."
                        // header={header}
                        responsiveLayout="scroll"
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
                        <Column field="name" header="Reseller Group" sortable body={resellerGroupNameBodyTemplate}></Column>
                        <Column field="guard_name" header="Discount Type" body={discount_typeBodyTemplate} sortable></Column>
                        <Column field="guard_name" header="Discount Value" body={discount_valueBodyTemplate} sortable></Column>
                        <Column field="guard_name" header="Sub Reseller Limit" body={subresellerLimitBodyTemplate} sortable></Column>
                        <Column field="guard_name" header="Can Add Sub-reseller" body={canAddSubResellerBodyTemplate} sortable></Column>
                        <Column field="guard_name" header="Can Sub-reseller add sub" body={canSubResellerCreateSubsBodyTemplate} sortable></Column>
                        <Column field="guard_name" header="Status" body={statusBodyTemplate} sortable></Column>
                        <Column field="guard_name" header="Notes" body={notesBodyTemplate} sortable></Column>
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>


                    <Dialog visible={resellerGroupDialog}  style={{ width: '750px' }} header="Purchased Product Details" modal className="p-fluid" footer={resellerGroupDialogFooter} onHide={hideDialog}>
                        <div className="card flex flex-column md:flex-row gap-3">
                            <div>
                                <div className="field col flex-1">
                                    <label htmlFor="supplier">Group Name</label>
                                    <InputText
                                        id="name"
                                        value={resellerGroup.name}
                                        onChange={(e) =>
                                            setResellerGroup((prev) => ({
                                                ...prev,
                                                name: e.target.value,
                                            }))
                                        }
                                        required
                                        autoFocus
                                        className={classNames({
                                            'p-invalid': submitted && !resellerGroup.name
                                        })}
                                    />
                                </div>

                                <div className="field col flex-1">
                                    <label htmlFor="supplier">Discount Value</label>
                                    <InputText
                                        id="discount_value"
                                        value={resellerGroup.discount_value}
                                        onChange={(e) =>
                                            setResellerGroup((prev) => ({
                                                ...prev,
                                                discount_value: e.target.value,
                                            }))
                                        }
                                        required
                                        autoFocus
                                        className={classNames({
                                            'p-invalid': submitted && !resellerGroup.discount_value
                                        })}
                                    />
                                </div>

                                <div className="field col flex-1">
                                    <label htmlFor="supplier">Sub Reseller Limit</label>
                                    <InputText
                                        id="sub_reseller_limit"
                                        value={resellerGroup.sub_reseller_limit.toString()}
                                        onChange={(e) =>
                                            setResellerGroup((prev) => ({
                                                ...prev,
                                                sub_reseller_limit: e.target.value,
                                            }))
                                        }
                                        required
                                        autoFocus
                                        className={classNames({
                                            'p-invalid': submitted && !resellerGroup.sub_reseller_limit
                                        })}
                                    />
                                </div>

                                <div className="field col flex-1">
                                    <label htmlFor="status">Status</label>
                                    <Dropdown
                                        id="status"
                                        value={resellerGroup.status}
                                        options={[
                                            { label: 'Active', value: 'Active' },
                                            { label: 'Inactive', value: 'Inactive' },
                                        ]}
                                        onChange={(e) =>
                                            setResellerGroup((prev) => ({
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


                            </div>
                            <br />
                            <div>
                                <div className="field col flex-1">
                                    <label htmlFor="discount_type">Discount Type</label>
                                    <Dropdown
                                        id="discount_type"
                                        value={resellerGroup.discount_type}
                                        options={[
                                            { label: 'Percentage', value: 'Percentage' },
                                            { label: 'Fixed', value: 'Fixed' },
                                        ]}
                                        onChange={(e) =>
                                            setResellerGroup((prev) => ({
                                                ...prev,
                                                discount_type: e.value,
                                            }))
                                        }
                                        optionLabel="label"
                                        optionValue="value"
                                        placeholder="Choose a status"
                                        className="w-full"
                                    />
                                </div>
                                <div className="field col flex-1">
                                    <label htmlFor="status">Can Add Sub-reseller</label>
                                    <Dropdown
                                        id="can_create_sub_resellers"
                                        value={resellerGroup.can_create_sub_resellers}
                                        options={[
                                            { label: 'Yes', value: 1 },
                                            { label: 'No', value: 0 },
                                        ]}
                                        onChange={(e) =>
                                            setResellerGroup((prev) => ({
                                                ...prev,
                                                can_create_sub_resellers: e.value,
                                            }))
                                        }
                                        optionLabel="label"
                                        optionValue="value"
                                        placeholder="Choose a status"
                                        className="w-full"
                                    />
                                </div>
                                <div className="field col flex-1">
                                    <label htmlFor="status">Can Sub-reseller add Subs</label>
                                    <Dropdown
                                        id="can_sub_reseller_create_subs"
                                        value={resellerGroup.can_sub_reseller_create_subs}
                                        options={[
                                            { label: 'Yes', value: 1 },
                                            { label: 'No', value: 0 },
                                        ]}
                                        onChange={(e) =>
                                            setResellerGroup((prev) => ({
                                                ...prev,
                                                can_sub_reseller_create_subs: e.value,
                                            }))
                                        }
                                        optionLabel="label"
                                        optionValue="value"
                                        placeholder="Choose a status"
                                        className="w-full"
                                    />
                                </div>
                                <div className="field col flex-1">
                                    <label htmlFor="notes">Notes</label>
                                    <InputTextarea
                                    value={resellerGroup.notes}
                                    onChange={(e) =>
                                        setResellerGroup((prev) => ({
                                        ...prev,
                                        notes: e.target.value,
                                    }))
                                    } rows={3} cols={30}
                                    placeholder=''
                                    />

                                </div>
                            </div>


                        </div>
                    </Dialog>

                    <Dialog visible={deleteResellerGroupDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteResellerGroupDialogFooter} onHide={hideDeleteResellerGroupDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {resellerGroup && (
                                <span>
                                    Are you sure you want to delete <b>{resellerGroup.name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteResellerGroupsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteCompaniesDialogFooter} onHide={hideDeleteResellerGroupsDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {resellerGroup && <span>Are you sure you want to delete the selected companies?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default ResellerGroupPage;
