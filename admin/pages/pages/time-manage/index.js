import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { FileUpload } from 'primereact/fileupload';
import { Image } from 'primereact/image';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Rating } from 'primereact/rating';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import { ProductService } from '../../../demo/service/ProductService';

const Crud = () => {
    let emptyProduct = {
        id: null,
        name: '',
        phone: '',
        email: '',
        image: null,
        company: '',
        designation: '',
        companyType: '',
        comm: '',
        price: 0,
        quantity: 0,
        interest: 0,
        inventoryStatus: 'INSTOCK'
    };

    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [file, setFile] = useState();
    const toast = useRef(null);
    const dt = useRef(null);
    const [toggleRefresh, setTogleRefresh] = useState(false);


    useEffect(() => {
        ProductService.getProducts().then((data) => setProducts(data));
    }, [toggleRefresh]);

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

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

        console.log("PP1", product);
        if((product.name && product.phone) && file ) {
            ProductService.postProducts(
                product.name, 
                product.phone, 
                product.email, 
                product.company, 
                product.designation, 
                product.interest, 
                product.companyType, 
                product.comm, 
                file
            ).then(()=>{
                setTogleRefresh(!toggleRefresh)
                setProductDialog(false);
            });
    
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
        ProductService.deleteProduct(product._id).then(()=>{
            setTogleRefresh(!toggleRefresh);
            setDeleteProductDialog(false);
            setProduct(emptyProduct);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        });

        
    };

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    };

    const deleteSelectedProducts = () => {
        let _products = products.filter((val) => !selectedProducts.includes(val));
        setProducts(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    };

    const onCategoryChange = (e) => {
        let _product = { ...product };
        _product['category'] = e.value;
        setProduct(_product);
    };

    const onInputChange = (e) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };
        _product['name'] = val;

        setProduct(_product);
    };

    const onInputNumberChange = (e, number) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };
        _product[`${number}`] = val;

        setProduct(_product);
    };

    const onInputEmailChange = (e) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };
        _product['email'] = val;

        setProduct(_product);
    };

    const onInputCompanyChange = (e) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };
        _product['company'] = val;

        setProduct(_product);
    };

    const onCommunicationChange = (e) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };
        _product['comm'] = val;

        setProduct(_product);
    };

    const onInterestLChange = (e) => {
        let _product = { ...product };
        _product['interest'] = e.value;
        setProduct(_product);
    };

    const onDesignationChange = (e) => {
        let _product = { ...product };
        _product['designation'] = e.value;
        setProduct(_product);
    };

    const onCompanyTChange = (e) => {
        // const val = (e.target && e.target.value) || '';
        let _product = { ...product };
        _product['companyType'] = e.value;
        setProduct(_product);
    };
    

    const groupedInterestL = [
            { label: 'One', value: '1' },
            { label: 'Two', value: '2' },
            { label: 'Three', value: '3' },
            { label: 'Four', value: '4' },
            { label: 'Five', value: '5' },
    ];
      
    // const groupedDesignation = [
    //     {
    //         label: 'Designation',
    //         code: 'IL',
    //         items: [
    //         { label: 'CEO', value: 'CEO' },
    //         { label: 'Software Engineer', value: 'Software Engineer' },
    //         { label: 'Developer', value: 'Developer' },
    //         { label: 'HR', value: 'HR' },
    //         ],
    //     }
    // ];

    const groupedDesignation = [
        { name: 'CEO', value: 'CEO' },
        { name: 'Software Engineer', value: 'Software Engineer' },
        { name: 'Developer', value: 'Developer' },
        { name: 'HR', value: 'HR' }
    ];

    const groupedCpmanyT = [
        { label: 'Software Firm', value: 'Software Firm' },
        { label: 'Multinational Company', value: 'Multinational Company' },
        { label: 'Forign Company', value: 'Forign Company' },
    ];

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="New" icon="pi pi-plus" severity="sucess" className="mr-2" onClick={openNew} />
                    <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
                </div>
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                {/* <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="mr-2 inline-block" /> */}
                <Button label="Export" icon="pi pi-upload" severity="help" onClick={exportCSV} />
            </React.Fragment>
        );
    };

    const codeBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Code</span>
                {rowData.code}
            </>
        );
    };

    const nameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.name}
            </>
        );
    };

    const phoneBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Phone</span>
                {rowData.phone}
            </>
        );
    };

    const emailBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Email</span>
                {rowData.email}
            </>
        );
    };

    const communicationBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Communications</span>
                {rowData.comm}
            </>
        );
    };


    const imageBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Image</span>
                <Image src={"http://36.255.69.40:5000/image/" + rowData.image}  alt="Image" height={60} width={120} preview />

            </>
        );
    };

    const designationBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Designation</span>
                {(rowData.designation)}
            </>
        );
    };

    const companyNameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Company Name</span>
                {rowData.company}
            </>
        );
    };

    const interestBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Interest Level</span>
                <Rating value={rowData.interest} readOnly cancel={false} />
            </>
        );
    };

    const statusBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Status</span>
                <span className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}>{rowData.inventoryStatus}</span>
            </>
        );
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button icon="pi pi-pencil" severity="success" rounded className="mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" severity="warning" rounded onClick={() => confirmDeleteProduct(rowData)} />
            </>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0 p-column-title">Customer List</h5>
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
    const deleteProductsDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteSelectedProducts} />
        </>
    );
    // console.log("GORU",product);

    return (
        <div className="grid crud-demo">
            <div className="col-14">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

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
                        emptyMessage="No products found."
                        header={header}
                        responsiveLayout="scroll"
                    >
                        {/* <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column> */}
                        {/* <Column field="code" header="Code" sortable body={codeBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column> */}
                        <Column field="name" header="Name" sortable body={nameBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="phone" header="Phone" body={phoneBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                        <Column field="email" header="Email" body={emailBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="designation" header="Designation" body={designationBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                        <Column field="company" header="Company Name" body={companyNameBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                        <Column field="interest" header="Interest Level" body={interestBodyTemplate} sortable></Column>
                        {/* <Column field="inventoryStatus" header="Status" body={statusBodyTemplate} sortable headerStyle={{ minWidth: '10rem' }}></Column> */}
                        <Column field="comm" header="Communication" body={communicationBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                        <Column header="Image" body={imageBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>

                    <Dialog visible={productDialog} style={{ width: '450px' }} header="Customer Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                        {product.image && <img src={`/demo/images/product/${product.image}`} alt={product.image} width="150" className="mt-0 mx-auto mb-5 block shadow-2" />}
                        <div className="field">
                            <label htmlFor="name">Name</label>
                            <InputText id="name" value={product.name} onChange={(e) => onInputChange(e)} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
                            {submitted && !product.name && <small className="p-invalid">Name is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="phone">Phone</label>
                            <InputText id="phone" value={product.phone} onChange={(e) => onInputNumberChange(e, 'phone')} required  className={classNames({ 'p-invalid': submitted && !product.phone })} />
                            {submitted && !product.phone && <small className="p-invalid">Phone is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="email">Email</label>
                            <InputText id="email" value={product.email} onChange={(e) => onInputEmailChange(e)} />
                        </div>
                        <div className="field">
                            <label htmlFor="companyName">Company Name</label>
                            <InputText id="companyName" value={product.companyName} onChange={(e) => onInputCompanyChange(e,)}/>
                        </div>
                        <br/>

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="companyt">Company Type</label>
                                <Dropdown
                                    value={product.companyType}
                                    name='companyType'
                                    onChange={(e) => onCompanyTChange(e)}
                                    options={groupedCpmanyT}
                                    optionLabel="label"
                                    showClear
                                    // optionGroupLabel="label"
                                    // optionGroupChildren="items"
                                    // optionGroupTemplate={groupedItemTemplate}
                                    className="w-full md:w-14rem"
                                    placeholder="Select Company Type"
                                />
                            </div>
                            <div className="field col">
                                <label htmlFor="designation">Designation</label>
                                <Dropdown
                                    value={product.designation}
                                    name='designation'
                                    onChange={(e) => onDesignationChange(e)}
                                    options={groupedDesignation}
                                    optionLabel="name"
                                    showClear
                                    // optionGroupLabel="label"
                                    // optionGroupChildren="items"
                                    // optionGroupTemplate={groupedItemTemplate}
                                    className="w-full md:w-14rem"
                                    placeholder="Select Designation"
                                />
                            </div>
                        </div><br/>

                        <div className="field">
                            <label htmlFor="communication">Communications</label>  
                            <InputTextarea id="communication" value={product.comm} onChange={(e) => onCommunicationChange(e)} />
                        </div>
                        <br/>

                        <div className="formgrid grid">
                            <div className="field col">
                            <label htmlFor="interest">Interest Level</label>
                                <Dropdown
                                    value={product.interest}
                                    name='interest'
                                    onChange={(e) => onInterestLChange(e)}
                                    options={groupedInterestL}
                                    optionLabel="label"
                                    showClear
                                    // optionGroupLabel="label"
                                    // optionGroupChildren="items"
                                    // optionGroupTemplate={groupedItemTemplate}
                                    className="w-full md:w-14rem"
                                    placeholder="Select Interest Level"
                                />
                            </div>
                            <div className="field col">
                                <label htmlFor="price">Image</label><br/>
                                <FileUpload required mode="basic" accept="image/*" maxFileSize={1000000} customUpload auto uploadHandler={(e)=> { 
                                    setFile(e.files[0]) 
                                }} 
                                    label="Import" chooseLabel="Import" 
                                    // className="mr-2 inline-block"
                                    
                                    className={classNames({ 'p-invalid': submitted && !file })}  
                                    />
                                    {submitted && !file && <small className="p-invalid">image is required.</small>}
                            </div>
                        </div>
                        {/* Designations */}
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

                    <Dialog visible={deleteProductsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {product && <span>Are you sure you want to delete the selected products?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default Crud;