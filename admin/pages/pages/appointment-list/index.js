import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import { ProductService } from '../../../demo/service/ProductService';

const Appointment = () => {
    let emptyProduct = {
        id: null,
        sl: 0,
        date1:'',
        doctor: '',
        specialist: '',
        serialNumber:0,
        name: '',
        phone:'',
        age: '',
        gender:'',
        time1:'',
        chamber: '',
        image: null,
        category: null,
        price: 0,
        details: '',
        status: 'SUCCESS'
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
        ProductService.getProducts().then((data) => setProducts(data));
    }, []);

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

        console.log("PPPP1",product)

        if(product.name && product.chamber && product.doctor && product.date1 && product.time1) {
            ProductService.postProducts(
                product.chamber,
                product.specialist,
                product.doctor,
                product.date1,
                product.time1,
                product.name,
                product.age,
                product.gender,
                product.phone,
                product.details,
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
        let _products = products.filter((val) => val.id !== product.id);
        setProducts(_products);
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
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
        let id = 0;
        for (let i = 0; i < products.length; i++) {
            id=i+1;
        }
        return id;
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };


    const onCategoryChange = (e) => {
        let _product = { ...product };
        _product['category'] = e.value;
        setProduct(_product);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };
        _product[`${name}`] = val;

        setProduct(_product);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _product = { ...product };
        _product[`${name}`] = val;

        setProduct(_product);
    };


    const onChamberChange = (e) => {
        let _product = {...product };
        _product['chamber'] = e.value;
        setProduct(_product);
    }

    const onDoctorChange = (e) => {
        let _product = {...product};
        _product['doctor'] = e.value;
        setProduct(_product);
    }

    const onSpecialistChange = (e) => {
        let _product = {...product};
        _product['specialist'] = e.value;
        setProduct(_product);
    }

    const chamberList = [
        { label: 'A', value: 'Chamber-A' },
        { label: 'B', value: 'Chamber-B' },
        { label: 'C', value: 'Chamber-C' },
        { label: 'D', value: 'Chamber-D' },
        { label: 'E', value: 'Chamber-E' },
    ];

    const doctorList = [
        { label: 'Dr. ABC', value: 'abc' },
        { label: 'Dr. XYZ', value: 'xyz' },
        { label: 'Dr. PQR', value: 'pqr' },
        { label: 'Dr. LMN', value: 'lmn' },
        { label: 'Dr. PPM', value: 'ppm' },
    ];

    const specialistList = [
        { label: 'Obstetrician/gynecologists', value: 'Obstetrician/gynecologists' },
        { label: 'Ophthalmologists', value: 'Ophthalmologists' },
        { label: 'Cardiologists', value: 'Cardiologists' },
        { label: 'Gastroenterologists', value: 'Gastroenterologists' },
        { label: 'Orthopedic surgeons', value: 'Orthopedic surgeons' },
    ];
  

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="New" icon="pi pi-plus" severity="sucess" className="mr-2" onClick={openNew} />
                    {/* <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} /> */}
                </div>
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                {/* <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="mr-2 inline-block" /> */}
                <Button
                    label="Add Appointment"
                    icon="pi pi-plus"
                    severity="sucess"
                    className="mr-2"
                    onClick={openNew}
                />
                <Button
                    label="Download list"
                    icon="pi pi-download"
                    severity="help"
                    onClick={exportCSV}
                />
            </React.Fragment>
        );
    };

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
    }

    const appointDateBodyTemplete = (rowData) => {
        return (
            <>
                <span className="p-column-title">Appointment Date</span>
                   {rowData.date1}
                
            </>
        );
    }

    const imageBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Image</span>
                <img src={`/demo/images/product/${rowData.image}`} alt={rowData.image} className="shadow-2" width="100" />
            </>
        );
    };

    const priceBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Price</span>
                {formatCurrency(rowData.price)}
            </>
        );
    };

    const serialNumberBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Serial Number</span>
                {rowData.serialNumber}
            </>
        );
    }

    const categoryBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Category</span>
                {rowData.category}
            </>
        );
    };

    const problemBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Problem</span>
                {rowData.details}
            </>
        );
    }

    const chamberBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Chamber</span>
                {rowData.chamber}
            </>
        );
    }

    const timeBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Time</span>
                {rowData.time1}
            </>
        );
    }
    
    const sexBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Sex</span>
                {rowData.gender}
            </>
        );
    }


    const statusBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Status</span>
                <span className={`product-badge status-${rowData.status}`}>{rowData.status}</span>
            </>
        );
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button icon="pi pi-pencil" severity="success" rounded className="mr-2" onClick={() => editProduct(rowData)} />
                {/* <Button icon="pi pi-trash" severity="warning" rounded onClick={() => confirmDeleteProduct(rowData)} /> */}
            </>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h2 className="m-0">Appointment List</h2>
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
   

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />

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
                        emptyMessage="Not found."
                        header={header}
                        responsiveLayout="scroll"
                    >
                        {/* <Column field="code" header="Code" sortable body={codeBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column> */}
                        <Column
                            field="sl"
                            header="SL"
                            body={codeBodyTemplate}
                            sortable
                        ></Column>
                        <Column
                            field="date1"
                            header="Appointment Date"
                            sortable
                            body={appointDateBodyTemplete}
                            headerStyle={{ minWidth: "10rem" }}
                        ></Column>
                        <Column
                            field="serialNumber"
                            header="Serial Number"
                            body={serialNumberBodyTemplate}
                        ></Column>
                        <Column
                            field="name"
                            header="Name"
                            sortable
                            body={nameBodyTemplate}
                            headerStyle={{ minWidth: "10rem" }}
                        ></Column>
                        {/* <Column header="Image" body={imageBodyTemplate}></Column> */}
                        <Column
                            field="phone"
                            header="Phone"
                            body={phoneBodyTemplate}
                        ></Column>
                        <Column
                            field="gender"
                            header="Sex"
                            sortable
                            body={sexBodyTemplate}
                            headerStyle={{ minWidth: "3rem" }}
                        ></Column>
                        <Column
                            field="time1"
                            header="Time"
                            body={timeBodyTemplate}
                            headerStyle={{ minWidth: "3rem" }}
                        ></Column>
                        <Column
                            field="chamber"
                            header="Chamber"
                            sortable
                            body={chamberBodyTemplate}
                            headerStyle={{ minWidth: "10rem" }}
                        ></Column>
                        <Column
                            field="details"
                            header="Problem"
                            body={problemBodyTemplate}
                            headerStyle={{ minWidth: "5rem" }}
                        ></Column>
                        <Column
                            field="status"
                            header="Status"
                            body={statusBodyTemplate}
                            sortable
                            headerStyle={{ minWidth: "5rem" }}
                        ></Column>
                        <Column
                            header="Action"
                            body={actionBodyTemplate}
                            headerStyle={{ minWidth: "2rem" }}
                        ></Column>
                    </DataTable>

                    <Dialog
                        visible={productDialog}
                        style={{ width: "450px" }}
                        header="Patient Details"
                        modal
                        className="p-fluid"
                        footer={productDialogFooter}
                        onHide={hideDialog}
                    >
                        {/* {product.image && (
                            <img
                                src={`/demo/images/product/${product.image}`}
                                alt={product.image}
                                width="150"
                                className="mt-0 mx-auto mb-5 block shadow-2"
                            />
                        )} */}
                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="chamber">Chamber</label>
                                <Dropdown
                                    value={product.chamber}
                                    name='chamber'
                                    onChange={(e) => onChamberChange(e)}
                                    options={chamberList}
                                    optionLabel="value"
                                    showClear
                                    placeholder="Select a Chamber"
                                    required
                                    autoFocus
                                    className={classNames({
                                        "chamber-invalid": submitted && !product.chamber,
                                    })}
                                />
                                </div>
                                {submitted && !product.chamber && (
                                    <small className="chamber-invalid">
                                        Chamber is required.
                                    </small>
                                )}
                        </div>
                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="specialist">Specialization</label>
                                <Dropdown
                                    value={product.specialist}
                                    name='spcialist'
                                    onChange={(e) => onSpecialistChange(e)}
                                    options={specialistList}
                                    optionLabel="label"
                                    showClear
                                    placeholder="Select a Chamber"
                                    required
                                    autoFocus
                                    className={classNames({
                                        "cham-invalid": submitted && !product.chamber,
                                    })}
                                />
                                {submitted && !product.chamber && (
                                    <small className="cham-invalid">
                                        Chamber is required.
                                    </small>
                                )}
                            </div>
                            <div className="field col">
                                <label htmlFor="doctor">Doctor</label>
                                <Dropdown
                                    value={product.doctor}
                                    name='doctor'
                                    onChange={(e) => onDoctorChange(e)}
                                    options={doctorList}
                                    optionLabel="label"
                                    showClear
                                    placeholder="Select a Doctor"
                                    required
                                    autoFocus
                                    className={classNames({
                                        "p-invalid": submitted && !product.doctor,
                                    })}
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label htmlFor="name">Name</label>
                            <InputText
                                id="name"
                                value={product.name}
                                onChange={(e) => onInputChange(e, "name")}
                                required
                                autoFocus
                                className={classNames({
                                    "p-invalid": submitted && !product.name,
                                })}
                            />
                            {submitted && !product.name && (
                                <small className="p-invalid">
                                    Name is required.
                                </small>
                            )}
                        </div>

                        <div className="field">
                            <label className="mb-3">Category</label>
                            <div className="formgrid grid">
                                <div className="field-radiobutton col-6">
                                    <RadioButton
                                        inputId="category1"
                                        name="category"
                                        value="Accessories"
                                        onChange={onCategoryChange}
                                        checked={
                                            product.category === "Accessories"
                                        }
                                    />
                                    <label htmlFor="category1">
                                        Accessories
                                    </label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton
                                        inputId="category2"
                                        name="category"
                                        value="Clothing"
                                        onChange={onCategoryChange}
                                        checked={
                                            product.category === "Clothing"
                                        }
                                    />
                                    <label htmlFor="category2">Clothing</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton
                                        inputId="category3"
                                        name="category"
                                        value="Electronics"
                                        onChange={onCategoryChange}
                                        checked={
                                            product.category === "Electronics"
                                        }
                                    />
                                    <label htmlFor="category3">
                                        Electronics
                                    </label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton
                                        inputId="category4"
                                        name="category"
                                        value="Fitness"
                                        onChange={onCategoryChange}
                                        checked={product.category === "Fitness"}
                                    />
                                    <label htmlFor="category4">Fitness</label>
                                </div>
                            </div>
                        </div>

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="price">Price</label>
                                <InputNumber
                                    id="price"
                                    value={product.price}
                                    onValueChange={(e) =>
                                        onInputNumberChange(e, "price")
                                    }
                                    mode="currency"
                                    currency="USD"
                                    locale="en-US"
                                />
                            </div>
                            <div className="field col">
                                <label htmlFor="quantity">Quantity</label>
                                <InputNumber
                                    id="quantity"
                                    value={product.quantity}
                                    onValueChange={(e) =>
                                        onInputNumberChange(e, "quantity")
                                    }
                                    integeronly="true"
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label htmlFor="description">Details</label>
                            <InputTextarea
                                id="description"
                                value={product.description}
                                onChange={(e) =>
                                    onInputChange(e, "description")
                                }
                                required
                                rows={3}
                                cols={20}
                            />
                        </div>
                    </Dialog>
                    
                    <Toolbar
                        className="mb-4"
                        left={rightToolbarTemplate}
                    ></Toolbar>
                </div>
            </div>
        </div>
    );
};

export default Appointment;
