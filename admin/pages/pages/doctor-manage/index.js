import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Skeleton } from 'primereact/skeleton';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import { ProductService } from '../../../demo/service/ProductService';

const Doctor_Manage = () => {
    let emptyProduct = {
        id: 0,
        name: '',
        specialist: '',
        designation: '',
        degree: '',
        experience: '',
    };

    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const [toggleRefresh, setTogleRefresh] = useState(false);


    useEffect(() => {
        ProductService.getDoctor().then((data) => setProducts(data));
    }, [toggleRefresh]);

    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };

    const saveProduct = () => {
        setSubmitted(true);

        if( product.name && product.specialist &&  product.degree && product.designation) {
            ProductService.postDoctor(
                product.name,
                product.specialist,
                product.degree,
                product.designation,
                product.experience

            ).then(() => {
                setTogleRefresh(!toggleRefresh);
                setProductDialog(false);
            })
        }
    };

    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
    };

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };

    const deleteProduct = () => {
        ProductService.deleteChember(product._id).then(() => {
            setTogleRefresh(!toggleRefresh);
            setDeleteProductDialog(false);
            setProduct(emptyProduct);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Chamber is Deleted', life: 3000 });
        })
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };
        _product[`${name}`] = val;

        setProduct(_product);
    };

    const onSelectionChange = (e, name) => {
        let _product = {...product };
        _product[`${name}`] = e.value;
        setProduct(_product);
    }

    const specialistList = [
        { label: 'Gynecologists', value: 'Gynecologists' },
        { label: 'Ophthalmologists', value: 'Ophthalmologists' },
        { label: 'Cardiologists', value: 'Cardiologists' },
        { label: 'Gastroenterologists', value: 'Gastroenterologists' },
        { label: 'Orthopedic surgeons', value: 'Orthopedic surgeons' },
    ];

    const codeBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Code</span>
                {rowData.id}
            </>
        );
    };

    const nameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Doctor Name</span>
                {rowData.name}
            </>
        );
    }

    const specialistBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Specialization</span>
                {rowData.specialist}
            </>
        );
    }

    const designationBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Designation</span>
                {rowData.designation}
            </>
        );
    }

    const degreeBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Degree</span>
                {rowData.degree}
            </>
        );
    }

    const experienceBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Experience</span>
                {rowData.experience}
            </>
        );
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button icon="pi pi-pencil" severity="success" rounded className="mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" severity="warning" rounded onClick={() => confirmDeleteProduct(rowData)} />
            </>
        );
    };
        
    const topHeader = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <h2 className="m-0">Doctor Management</h2>
                </div>
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <Button
                    label="Add Doctor"
                    icon="pi pi-plus"
                    severity="sucess"
                    className="mr-2"
                    onClick={openNew}
                />
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const productDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" text onClick={saveProduct} />
        </>
    );
    const deleteProductDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteProduct} />
        </>
    );

    if(products == null) {
        return (
            <div className="card">
                <div className="border-round border-1 surface-border p-4 surface-card">
                    <div className="flex mb-3">
                        <Skeleton shape="circle" size="4rem" className="mr-2"></Skeleton>
                        <div>
                            <Skeleton width="10rem" className="mb-2"></Skeleton>
                            <Skeleton width="5rem" className="mb-2"></Skeleton>
                            <Skeleton height=".5rem"></Skeleton>
                        </div>
                    </div>
                    <Skeleton width="100%" height="500px"></Skeleton>
                    <div className="flex justify-content-between mt-3">
                        <Skeleton width="4rem" height="2rem"></Skeleton>
                        <Skeleton width="4rem" height="2rem"></Skeleton>
                    </div>
                </div>
            </div>
        )
    }


    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar
                        className="mb-4"
                        left={topHeader}
                    ></Toolbar>
                    <DataTable
                        ref={dt}
                        value={products}
                        selection={selectedProducts}
                        onSelectionChange={(e) => setSelectedProducts(e.value)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                        globalFilter={globalFilter}
                        emptyMessage="Not Available Chamber-Management item in Here."
                        header={header}
                        responsiveLayout="scroll"
                    >

                        <Column
                            field="sl"
                            header="SL"
                            body={codeBodyTemplate}
                            sortable
                        ></Column>
                         <Column
                            field="name"
                            header="Doctor Name"
                            body={nameBodyTemplate}
                            headerStyle={{ minWidth: "15rem" }}
                        ></Column> 
                        <Column
                            field="specialist"
                            header="Specialization"
                            body={specialistBodyTemplate}
                            headerStyle={{ minWidth: "15rem" }}
                        ></Column> 
                        <Column
                            field="designation"
                            header="Designation"
                            body={designationBodyTemplate}
                            headerStyle={{ minWidth: "15rem" }}
                        ></Column> 
                        <Column
                            field="degree"
                            header="Degree"
                            body={degreeBodyTemplate}
                            headerStyle={{ minWidth: "15rem" }}
                        ></Column>
                        <Column
                            field="experience"
                            header="Experience"
                            body={experienceBodyTemplate}
                            headerStyle={{ minWidth: "15rem" }}
                        ></Column>
                        <Column
                            header="Action"
                            body={actionBodyTemplate}
                            headerStyle={{ minWidth: "10rem" }}
                        ></Column>
                    </DataTable>

                    <Dialog
                        visible={productDialog}
                        style={{ width: "450px" }}
                        header="Add New Doctor"
                        modal
                        className="p-fluid"
                        footer={productDialogFooter}
                        onHide={hideDialog}
                    >
                        <div className="field">
                            <label htmlFor="name">Doctor Name</label>
                            <InputText 
                                id="name" 
                                value={product.name} 
                                onChange={(e) => onInputChange(e, "name")} 
                                required 
                                autoFocus
                                className={classNames({ 'p-invalid': submitted && !product.name })} 
                                />
                            {submitted && !product.name && <small className="p-invalid">
                                Doctor Name is required.
                            </small>}
                        </div>
                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="specialist">Specialization</label>
                                <Dropdown
                                    value={product.specialist}
                                    name='chamber'
                                    onChange={(e) => onSelectionChange(e, "specialist")}
                                    options={specialistList}
                                    optionLabel="label"
                                    showClear
                                    placeholder="Select a Specialization"
                                    required
                                    className={classNames({
                                        "p-invalid": submitted && !product.specialist,
                                    })}
                                />
                                </div>
                                {submitted && !product.specialist && (
                                    <small className="p-invalid">
                                        Specialization is required.
                                    </small>
                                )}
                        </div>
                        <div className="field">
                            <label htmlFor="designation">Designation</label>
                            <InputText 
                                id="designation" 
                                value={product.designation} 
                                onChange={(e) => onInputChange(e, "designation")} 
                                required 
                                className={classNames({ 'p-invalid': submitted && !product.designation })} 
                                />
                            {submitted && !product.designation && <small className="p-invalid">
                                Designation is required.
                            </small>}
                        </div>
                        <div className="field">
                            <label htmlFor="degree">Degree</label>
                            <InputText 
                                id="degree" 
                                value={product.degree} 
                                onChange={(e) => onInputChange(e, "degree")} 
                                required 
                                className={classNames({ 'p-invalid': submitted && !product.degree })} 
                                />
                            {submitted && !product.degree && <small className="p-invalid">
                                Degree is required.
                            </small>}
                        </div>
                        <div className="field">
                            <label htmlFor="experience">Experience</label>
                            <InputText 
                                id="experience" 
                                value={product.experience} 
                                onChange={(e) => onInputChange(e, "experience")} 
                                />
                        </div>
                    </Dialog>

                    <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {product && (
                                <span>
                                    Are you sure you want to delete <b>{product.name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>
                    
                </div>
            </div>
        </div>
    );
};

export default  Doctor_Manage;
