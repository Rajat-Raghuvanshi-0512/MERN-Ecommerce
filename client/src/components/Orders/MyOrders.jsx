import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import LaunchIcon from '@mui/icons-material/Launch';
import { clearErrors, myOrders } from '../../Redux/Actions/orderAction';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import "./MyOrder.css"
import Loader from '../Loader/Loader';
import Metadata from '../Metadata';
import { Button, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

const MyOrders = () => {
    const dispatch = useDispatch()
    const Navigate = useNavigate()

    const { orders, error, loading } = useSelector(state => state.myOrders)
    const { user } = useSelector(state => state.userInfo)


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
            minWidth: 100,
            sortable: false,
            flex: 0.5

        },
        {
            field: "amount",
            type: "number",
            headerName: "Amount",
            minWidth: 200,
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
                    <Link to={`/myorder/${params.getValue(params.id, "id")}`} className='icon-link' ><LaunchIcon /></Link>
                )
            }
        }
    ]
    const rows = []
    console.log(orders)

    orders && orders.reverse().forEach((order => {
        rows.push({
            id: order._id,
            status: order.orderStatus,
            date: order.createdAt.slice(0, 10),
            amount: order.totalPrice
        })
    }))
    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }
        dispatch(myOrders())
    }, [error, dispatch])
    return <>
        <Metadata title="Shop Buddy | My Orders" />
        <Typography variant='h4' className='userOrders'>{user.name}'s Orders</Typography>
        {
            loading ? <Loader /> :
                (
                    orders.length > 0 ? <div className="myOrders">
                        <DataGrid rows={rows} columns={columns} pageSize={5} disableSelectionOnClick autoHeight />
                    </div> :
                        <div className='d-flex flex-column justify-content-center align-items-center' style={{ height: "80vh" }}>
                            <CancelIcon className='text-danger' style={{ fontSize: "100px" }} />
                            <Typography className='fw-bold fs-2 mb-4'>You haven't purchased anything yet! </Typography>
                            <Button variant="contained" color='success' onClick={() => Navigate("/products")} className='px-3 py-2'>Purchase Now</Button>
                        </div>
                )
        }
    </>;
};

export default MyOrders;
