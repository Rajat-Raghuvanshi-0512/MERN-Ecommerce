import React, { useEffect, useState } from 'react';
import { clearErrors, deleteProductAdmin, getAllProductsAdmin } from '../../../Redux/Actions/productAction';
import Loader from '../../Loader/Loader';
import Metadata from '../../Metadata';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import "./Products.css"
import SideBar from '../SideBar';
import CancelIcon from '@mui/icons-material/Cancel';
import LaunchIcon from '@mui/icons-material/Launch';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DELETE_PRODUCT_RESET, UPDATE_PRODUCT_RESET } from '../../../Redux/Constants/productConstants';

const ProductsList = () => {
    const dispatch = useDispatch()
    const Navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [id, setId] = useState("");

    const { products, error: productError, loading } = useSelector(state => state.allProducts)
    const { isUpdated, isDeleted, error } = useSelector(state => state.product)

    const columns = [
        {
            field: "id",
            headerName: "Product Id",
            minWidth: 250,
            flex: 1
        },
        {
            field: "category",
            headerName: "Category",
            minWidth: 150,
            flex: 0.7,
            cellClassName: "fw-bold"
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 200,
            flex: 0.3,
            cellClassName: "text-secondary"
        },
        {
            field: "price",
            headerName: "Price",
            minWidth: 100,
            flex: 0.5

        },
        {
            field: "stock",
            headerName: "Stock",
            minWidth: 80,
            flex: 1,
            cellClassName: (params) => {
                return params.row.stock > 0 ? "text-success" : "text-danger fw-bold"
            }
        },
        {
            field: "link",
            type: "number",
            headerName: "Actions",
            minWidth: 130,
            flex: 0.5,
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/product/${params.row.id}`} className='icon-link mx-2 cursor' ><LaunchIcon /></Link>
                        <Link to={`/product/edit/${params.row.id}`} className='icon-edit mx-2 cursor' ><EditIcon /></Link>
                        <div className='icon-delete mx-2 cursor' onClick={() => handleClickOpen(params.getValue(params.id, "id"))} ><DeleteIcon /></div>
                    </>
                )
            }
        }
    ]
    const rows = []

    products && products.forEach((product => {
        rows.push({
            id: product._id,
            category: product.category,
            name: product.name,
            price: `₹ ${product.price}`,
            stock: product.stock,
        })
    }))

    const handleClickOpen = (id) => {
        setOpen(true);
        setId(id)
    }

    const handleClose = () => {
        setOpen(false);
        setId("")
    }

    const deleteHandler = () => {
        dispatch(deleteProductAdmin(id));
        setOpen(false)
    }



    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }
        if (productError) {
            toast.error(productError)
            dispatch(clearErrors())
        }
        if (isUpdated) {
            toast.success("Product Updated")
            dispatch({ type: UPDATE_PRODUCT_RESET })
        }
        if (isDeleted) {
            toast.success("Product Deleted Successfully")
            dispatch({ type: DELETE_PRODUCT_RESET })
        }
        dispatch(getAllProductsAdmin())
    }, [error, dispatch, isUpdated, isDeleted, productError])


    return <>
        <Metadata title="Shop Buddy | Admin - All Products" />
        <div className="admin_container">
            <SideBar />
            <div className="AllproductsContainer">
                <Typography variant='h2' className='text-center border-bottom mb-5'>All Products</Typography>
                {
                    loading ? <Loader /> :
                        (
                            products.length > 0 ? <div className='productList'>
                                <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick autoHeight />
                                <Dialog
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">
                                        Delete Product
                                    </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            Are you sure you want to delete this product?
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose} color='error'>Cancel</Button>
                                        <Button onClick={deleteHandler} autoFocus>
                                            Yes
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </div> :
                                <div className='d-flex flex-column justify-content-center align-items-center' style={{ height: "50vh" }}>
                                    <CancelIcon className='text-danger' style={{ fontSize: "100px" }} />
                                    <Typography className='fw-bold fs-2 mb-4'>No products have been made! </Typography>
                                    <Button variant="contained" color='success' onClick={() => Navigate("/admin/product/create")} className='px-3 py-2'>Create a Product</Button>
                                </div>
                        )
                }
            </div>
        </div>
    </>;
};

export default ProductsList;
