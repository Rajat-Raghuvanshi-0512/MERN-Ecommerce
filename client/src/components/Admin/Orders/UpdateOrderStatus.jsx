import { Button, Container, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearErrors, orderDetails, updateOrder } from '../../../Redux/Actions/orderAction';
import { UPDATE_ORDER_RESET } from '../../../Redux/Constants/orderConstants';
import Loader from "../../Loader/Loader"
import Metadata from '../../Metadata';
import ConfirmOrderCard from '../../Shipping/ConfirmOrderCard';
import SideBar from '../SideBar';

const orderContainerCss = {
    boxShadow: '5',
    margin: '35px',
    width: '100%',
    borderRadius: '5px',
    padding: "10px",
    background: 'linear-gradient(to bottom,#fefeff,#eee )'
}

const UpdateOrderStatus = () => {

    const [OrderStatus, setOrderStatus] = useState("");

    const dispatch = useDispatch()
    const { order, error, loading } = useSelector(state => state.orderDetails)
    const { isUpdated, error: UpdateError, loading: UpdateLoading } = useSelector(state => state.order)
    const { id } = useParams()
    const Navigate = useNavigate()


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateOrder(id, OrderStatus))
    }


    useEffect(() => {
        if (error) {
            Navigate(-1, { replace: true })
            dispatch(clearErrors())
        }
        if (UpdateError) {
            toast.error(UpdateError)
            dispatch(clearErrors())
        }
        if (isUpdated) {
            toast.success("Order Status Updated Successfully")
            Navigate("/admin/orders")
            dispatch({ type: UPDATE_ORDER_RESET })
        }
        dispatch(orderDetails(id))
    }, [dispatch, id, error, UpdateError, isUpdated, Navigate]);

    return <>
        <Metadata title="Shop Buddy | Admin - Order Details" />
        <div className="admin_container">
            <SideBar />
            {
                loading ? <Loader /> :
                    <>
                        <Container sx={orderContainerCss} >
                            <div className='d-flex my-3 justify-content-between'>
                                <Container>
                                    <div>
                                        <Typography variant='h4' className='mb-4 text-center'>Shipping Info</Typography>
                                        <hr />
                                        <div className='d-flex justify-content-between my-3'>
                                            <Typography >Name: </Typography>
                                            <span className='fs-6 opacity-75'>{order && order.user.name}</span>
                                        </div>
                                        <div className='d-flex justify-content-between my-3'>
                                            <Typography >Address: </Typography>
                                            <span className='fs-6 opacity-75'>{order && `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.country}`}</span>
                                        </div>
                                        <div className='d-flex justify-content-between my-3'>
                                            <Typography >Phone number: </Typography>
                                            <span className='fs-6 opacity-75'>{order && order.shippingInfo.phone}</span>
                                        </div>
                                    </div>
                                    <Typography variant='h4' className='text-center mt-5'>Ordered Items</Typography>
                                    <hr />
                                    <div className='container'>
                                        <div className="row my-4">
                                            <div className="col-md-2 fw-bold text-center">Product Img</div>
                                            <div className="col-md-4 fw-bold text-center">Product Name</div>
                                            <div className="col-md-3 fw-bold text-center">Product Quantity</div>
                                            <div className="col-md-3 fw-bold text-center">Product Price <span className='fs-6 opacity-50'>(1pc)</span></div>
                                        </div>
                                        <div className="row my-3">
                                            {
                                                order && order.orderedItems.map((item, index) => (
                                                    <ConfirmOrderCard key={index} item={item} />
                                                ))
                                            }
                                        </div>
                                    </div>
                                </Container>
                                <div className='w-50 mx-4'>
                                    <Typography variant='h4' className="text-center mb-4">Order Details</Typography>
                                    <hr />
                                    {order && order.orderStatus.toLowerCase() === "delivered"
                                        ?
                                        <>
                                            <Typography variant='h5' className='text-center my-5 text-success '> Delivered </Typography>
                                            <div className='d-flex justify-content-between'>
                                                <Typography className='text-center mb-4'>Delivered On:</Typography>
                                                <span> {order && order.deliveredAt.slice(0, 10)} </span>
                                            </div>
                                        </>
                                        :
                                        <form onSubmit={handleSubmit}>
                                            <FormControl className="d-flex justify-content-between my-4">
                                                <InputLabel id='Order-Status'>Update Status</InputLabel>
                                                <Select
                                                    value={OrderStatus}
                                                    labelId="Order-Status"
                                                    label="Order Status"
                                                    onChange={(e) => setOrderStatus(e.target.value)}
                                                    required
                                                    fullWidth
                                                    disabled={order && order.orderStatus === "Delivered" ? true : false}
                                                >
                                                    {order && order.orderStatus === "Processing..." && <MenuItem value="Shipped" >Shipped</MenuItem>}
                                                    {order && order.orderStatus === "Shipped" && <MenuItem value="Delivered" >Delivered</MenuItem>}
                                                </Select>
                                            </FormControl>
                                            <div className="d-flex justify-content-center">
                                                <Button type='submit' variant='contained' className='my-3' color='success' disabled={order && order.orderStatus === "Delivered" ? true : false || UpdateLoading ? true : false}>Update</Button>
                                            </div>
                                        </form>
                                    }
                                    <div className='d-flex justify-content-between my-4'>
                                        <Typography>Grand Total:</Typography>
                                        <span className='fs-6 opacity-75 my-1 text-success'>₹{order && order.totalPrice}</span>
                                    </div>
                                    <hr />
                                    <div className="d-flex justify-content-between my-4">
                                        <Typography className=' mb-3'>Payment:</Typography>
                                        <span className={`${order && String(order.paymentInfo.status).toLowerCase() === "pending" ? "text-danger" : "text-success"} text-capitalize`}>
                                            {order && order.paymentInfo.status.toLowerCase() === "pending" && "Cash On Delivery"}
                                            {order && order.paymentInfo.status.toLowerCase() === "succeeded" && "Paid Online"}</span>
                                    </div>
                                </div>
                            </div>
                        </Container>
                    </>
            }
        </div>
    </>;
};

export default UpdateOrderStatus;
