import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import { ProductService } from '../../../demo/service/ProductService';

const Chamber_Manage = () => {
    let emptyProduct = {
        st_time: '',
        en_time: '',
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


    const deleteSelectedProducts = () => {
        let _products = products.filter((val) => !selectedProducts.includes(val));
        setProducts(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    };


    const onInputChange = (e) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };
        _product['name'] = val;

        setProduct(_product);
    };

    const leftToolbarTemplate = () => {
        return (
            <>
                <React.Fragment>
                    <div className="my-2">
                        <h2 className="m-0 p-column-title">Chamber Management</h2>
                        {/* <Button label="New" icon="pi pi-plus" severity="sucess" className="mr-2" onClick={openNew} /> */}
                    </div>
                </React.Fragment>
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
            <Button label="New" icon="pi pi-plus" severity="sucess" className="mr-2" onClick={openNew} />
            <span className="block mt-2 md:mt-0 p-input-icon-left">

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
                    <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>

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
                        
                        <Column 
                            field="name" 
                            header="Chamber Name"  
                            body={nameBodyTemplate} 
                            headerStyle={{ minWidth: '15rem' }}
                        >
                
                        </Column>
                        <Column 
                            header="Action" 
                            body={actionBodyTemplate} 
                            headerStyle={{ minWidth: '10rem' }}
                        >
                        </Column>
                    </DataTable>

                    <Dialog 
                        visible={productDialog} 
                        style={{ width: '450px' }} 
                        header="Add New Chamber" 
                        modal 
                        className="p-fluid" 
                        footer={productDialogFooter} 
                        onHide={hideDialog}
                    >
            
                        <div className="field">
                            <label htmlFor="name">Chamber Name</label>
                            <InputText 
                                id="name" 
                                value={product.name} 
                                onChange={(e) => onInputChange(e)} 
                                required autoFocus 
                                className={classNames({ 'p-invalid': submitted && !product.name })} 
                                />
                            {submitted && !product.name && <small className="p-invalid">
                                Name is required.
                            </small>}
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

export default Chamber_Manage;