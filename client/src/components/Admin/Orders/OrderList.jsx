import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import "./OrderList.css"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { adminOrders, clearErrors, deleteOrder } from '../../../Redux/Actions/orderAction';
import Loader from '../../Loader/Loader';
import Metadata from '../../Metadata';
import SideBar from '../SideBar';
import Edit from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DELETE_ORDER_RESET } from '../../../Redux/Constants/orderConstants';

const OrderList = () => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const [id, setId] = useState("");

    const { orders, error, loading } = useSelector(state => state.allOrders)
    const { isDeleted, error: deleteError } = useSelector(state => state.order)


    const columns = [
        {
            field: "id",
            headerName: "Order ID",
            minWidth: 300,
            flex: 1
        },
        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.3,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === "Delivered" ? "text-success" : "text-danger"
            }
        },
        {
            field: "date",
            headerName: "Ordered On",
            type: "number",
            minWidth: 150,
            sortable: false,
            flex: 0.5

        },
        {
            field: "amount",
            type: "number",
            headerName: "Amount",
            minWidth: 150,
            flex: 0.3
        },
        {
            field: "link",
            type: "number",
            headerName: "Actions",
            minWidth: 100,
            flex: 0.5,
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/admin/order/${params.getValue(params.id, "id")}`} className='icon-edit mx-2 cursor' ><Edit /></Link>
                        <div className='icon-delete mx-2 cursor' onClick={() => handleClickOpen(params.getValue(params.id, "id"))} ><DeleteIcon /></div>
                    </>
                )
            }
        }
    ]
    const rows = []

    orders && orders.forEach((order => {
        rows.push({
            id: order._id,
            status: order.orderStatus,
            date: order.createdAt.slice(0, 10),
            amount: order.totalPrice
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
        dispatch(deleteOrder(id));
        setOpen(false)
    }

    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }
        if (deleteError) {
            toast.error(deleteError)
            dispatch(clearErrors())
        }
        if (isDeleted) {
            toast.success("Order deleted successfully")
            dispatch({ type: DELETE_ORDER_RESET })
        }
        dispatch(adminOrders())
    }, [error, dispatch, deleteError, isDeleted])
    return <>
        <Metadata title="Shop Buddy | Admin - Orders" />
        <div className="admin_container">
            <SideBar />
            <div className='adminOrdersContainer'>
                <Typography variant='h2' className='text-center border-bottom mb-5' >All Orders</Typography>
                {
                    loading ? <Loader /> :
                        (
                            orders && orders.length > 0 ? <div className="allOrders">
                                <DataGrid rows={rows} columns={columns} pageSize={5} disableSelectionOnClick autoHeight />
                                <Dialog
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">
                                        Delete Order
                                    </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            Are you sure you want to delete this order?
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
                                <div className='d-flex flex-column justify-content-center align-items-center' style={{ height: "40vh" }}>
                                    <CancelIcon className='text-danger' style={{ fontSize: "100px" }} />
                                    <Typography className='fw-bold fs-2 mb-4'>No orders have been placed yet! </Typography>
                                </div>
                        )
                }
            </div>
        </div>
    </>;
};

export default OrderList;
