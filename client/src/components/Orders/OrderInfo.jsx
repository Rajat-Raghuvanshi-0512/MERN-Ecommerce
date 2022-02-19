import { Container, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearErrors, orderDetails } from '../../Redux/Actions/orderAction';
import Loader from '../Loader/Loader';
import Metadata from '../Metadata';
import ConfirmOrderCard from '../Shipping/ConfirmOrderCard';
import { orderContainerCss } from '../Shipping/ObjectCss';

const OrderInfo = () => {
    const dispatch = useDispatch()
    const { order, error, loading } = useSelector(state => state.orderDetails)
    const { id } = useParams()
    useEffect(() => {
        dispatch(orderDetails(id))
        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }
    }, [dispatch, id, error]);

    return <>
        <Metadata title="Shop Buddy | Order Details" />
        {
            loading ? <Loader /> :
                <>
                    <Container sx={orderContainerCss} >
                        <div className='d-flex my-3 justify-content-between'>
                            <Container maxWidth="lg">
                                <Typography variant='h4' className='text-center'>Ordered Items</Typography>
                                <hr />
                                <div className='container'>
                                    <div className="row my-4">
                                        <div className="col-md-2 fw-bold text-center">Product Img</div>
                                        <div className="col-md-4 fw-bold text-center">Product Name</div>
                                        <div className="col-md-3 fw-bold text-center">Product Quantity</div>
                                        <div className="col-md-3 fw-bold text-center">Product Price <span className='fs-6 opacity-50'>(1pc)</span></div>
                                    </div>
                                    <div className="row my-3">
                                        <hr />
                                        {
                                            order && order.orderedItems.map((item, index) => (
                                                <ConfirmOrderCard key={index} item={item} />
                                            ))
                                        }
                                    </div>
                                </div>
                            </Container>
                            <div className='w-25 mx-5'>
                                <Typography variant='h4' className="text-center mb-4">Order Details</Typography>
                                <div className='d-flex justify-content-between my-4'>
                                    <Typography >Subtotal:</Typography>
                                    <span className='fs-6 opacity-75'>₹{order && order.itemsPrice}</span>
                                </div>
                                <div className='d-flex justify-content-between my-4'>
                                    <Typography >Shipping Charge:</Typography>
                                    <span className='fs-6 opacity-75'>₹{order && order.shippingPrice}</span>
                                </div>
                                <div className='d-flex justify-content-between my-4'>
                                    <Typography >GST:</Typography>
                                    <span className='fs-6 opacity-75'>₹{order && order.taxPrice}</span>
                                </div>
                                <hr />
                                <div className='d-flex justify-content-between my-4'>
                                    <Typography variant='h6'>Grand Total:</Typography>
                                    <span className='fs-6 opacity-75 my-1 text-success'>₹{order && order.totalPrice}</span>
                                </div>
                                <hr />
                            </div>
                        </div>
                    </Container>
                </>
        }
    </>;
};

export default OrderInfo;
