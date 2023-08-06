import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Skeleton } from 'primereact/skeleton';
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
        serial: '',
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
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
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

    const saveProduct = () => {
        setSubmitted(true);

        console.log("PPPP1",product)

        if(product.name && product.chamber && product.doctor && product.date1 && product.time1 && product.serial) {
            ProductService.postPatient(
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
                product.serial,
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

    const deleteProduct = () => {
        let _products = products.filter((val) => val.id !== product.id);
        setProducts(_products);
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    };

    const exportCSV = () => {
        dt.current.exportCSV();
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

    const timeList = [
        { label: '09:00AM-12:00PM', value: '9-12' },
        { label: '02:00PM-05:00PM', value: '2-5' },
        { label: '05:00PM-08:00PM', value: '5-8' },
    ];

    const genderList = [
        { label: 'Male', value: 'male'},
        { label: 'Female', value: 'female'},
    ];


    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
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
                {rowData.sl}
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

    const serialBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Serial Number</span>
                {rowData.serial}
            </>
        );
    }

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

    const dateBodyTemplete = () => {
        return (
            <>
                <span className="p-column-title">Date</span>
                {rowData.date1}
            </>
        )
    }

    const timeBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Time</span>
                {rowData.time1}
            </>
        );
    }
    
    const genderBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Gender</span>
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

    const topHeader = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                <h2 className="m-0">Appointment List</h2>
                </div>
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
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
                            field="serial"
                            header="Serial Number"
                            body={serialBodyTemplate}
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
                            header="Gender"
                            sortable
                            body={genderBodyTemplate}
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
                        style={{ width: "600px" }}
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
                                    onChange={(e) => onSelectionChange(e, "chamber")}
                                    options={chamberList}
                                    optionLabel="value"
                                    showClear
                                    placeholder="Select a Chamber"
                                    required
                                    autoFocus
                                    className={classNames({
                                        "p-invalid": submitted && !product.chamber,
                                    })}
                                />
                                </div>
                                {submitted && !product.chamber && (
                                    <small className="p-invalid">
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
                                {submitted && !product.chamber && (
                                    <small className="p-invalid">
                                        Specialization is required.
                                    </small>
                                )}
                            </div>
                            <div className="field col">
                                <label htmlFor="doctor">Doctor</label>
                                <Dropdown
                                    value={product.doctor}
                                    name='doctor'
                                    onChange={(e) => onSelectionChange(e, "doctor")}
                                    options={doctorList}
                                    optionLabel="label"
                                    showClear
                                    placeholder="Select a Doctor"
                                    required
                                    className={classNames({
                                        "p-invalid": submitted && !product.doctor,
                                    })}
                                />
                                {submitted && !product.chamber && (
                                    <small className="p-invalid">
                                        Doctor is required.
                                    </small>
                                )}
                            </div>
                        </div>

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="date1">Date</label>
                                <Calendar 
                                    value={product.date1}
                                    name='date1' 
                                    onChange={(e) => onSelectionChange(e, "date1")} 
                                    dateFormat="dd/mm/yy" 
                                    placeholder="Select a Date"
                                    required
                                    className={classNames({
                                        "p-invalid": submitted && !product.date1,
                                    })}
                                />
                                {submitted && !product.date1 && (
                                    <small className="p-invalid">
                                        Date is required.
                                    </small>
                                )}
                            </div>
                            <div className="field col">
                                <label htmlFor="time1">Time</label>
                                <Dropdown
                                    value={product.time1}
                                    name='time1'
                                    onChange={(e) => onSelectionChange(e, "time1")}
                                    options={timeList}
                                    optionLabel="label"
                                    showClear
                                    placeholder="Select a Time"
                                    required
                                    className={classNames({
                                        "p-invalid": submitted && !product.time1,
                                    })}
                                />
                                {submitted && !product.chamber && (
                                    <small className="p-invalid">
                                        Time is required.
                                    </small>
                                )}
                            </div>
                        </div>

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="name">Name</label>
                                <InputText
                                    id="name"
                                    value={product.name}
                                    onChange={(e) => onInputChange(e, "name")}
                                    required
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
                            <div className="field col">
                                <label htmlFor="age">Age</label>
                                <InputText
                                    id="age"
                                    value={product.age}
                                    onChange={(e) => onInputChange(e, "age")}
                                />
                            </div>
                        </div>

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="gender">Gender</label>
                                <Dropdown
                                    value={product.gender}
                                    name='gender'
                                    onChange={(e) => onSelectionChange(e, "gender")}
                                    options={genderList}
                                    optionLabel="label"
                                    showClear
                                    placeholder="Select a Gender"
                                />
                            </div>
                            <div className="field col">
                                <label htmlFor="phone">Phone</label>
                                <InputText
                                    id="phone"
                                    value={product.phone}
                                    onChange={(e) => onInputChange(e, "phone")}
                                />
                            </div>
                        </div>

                        <div className="field">
                            <label htmlFor="details">Details</label>
                            <InputTextarea
                                id="details"
                                value={product.details}
                                onChange={(e) =>
                                    onInputChange(e, "details")
                                }
                                required
                                rows={3}
                                cols={20}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="serial">Add Serial Number</label>
                            <InputText
                                id="serial"
                                value={product.serial}
                                onChange={(e) => onInputChange(e, "serial")}
                                required
                                className={classNames({
                                    "p-invalid": submitted && !product.serial,
                                })}
                            />
                            {submitted && !product.serial && (
                                <small className="p-invalid">
                                    Serial Number is required.
                                </small>
                            )}
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
