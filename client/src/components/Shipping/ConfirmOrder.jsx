import { Container, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GET_TOTAL } from '../../Redux/Constants/cartConstants';
import CheckOut from '../Checkout Steps/CheckOut';
import ConfirmOrderCard from './ConfirmOrderCard';
import { orderContainerCss } from './ObjectCss';
import Metadata from '../Metadata';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearErrors, createOrder } from '../../Redux/Actions/orderAction';

const ConfirmOrder = () => {
    const { user } = useSelector(state => state.userInfo)
    const { shippingInfo, cartItems, totalPrice } = useSelector(state => state.cart)
    const { error } = useSelector(state => state.newOrder)

    const dispatch = useDispatch()
    const Navigate = useNavigate()

    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.country}`
    const phone = `${shippingInfo.phoneCode} ${shippingInfo.phone}`
    const shippingCharge = totalPrice && totalPrice > 2000 ? 0 : 100
    const GST = Math.floor(totalPrice * 0.18)
    const grandTotal = totalPrice + shippingCharge + GST;


    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const proceedToPayment = () => {
        const data = {
            totalPrice, shippingCharge, GST, grandTotal
        }
        sessionStorage.setItem("orderInfo", JSON.stringify(data))
        Navigate("/process/payment")
    }
    const COD = () => {

        const order = {
            shippingInfo,
            orderedItems: cartItems,
            user: user._id,
            itemsPrice: totalPrice,
            taxPrice: GST,
            shippingPrice: shippingCharge,
            totalPrice: grandTotal,
            paymentInfo: {
                status: "Pending"
            }
        }
        dispatch(createOrder(order))
        Navigate("/success")
    }

    useEffect(() => {
        if (totalPrice === 0) {
            Navigate("/cart")
        }
        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }
        dispatch({
            type: GET_TOTAL
        })
    }, [dispatch, totalPrice, error, Navigate]);


    return <>
        <Metadata title="Shop Buddy | Confirm Order" />
        <Container sx={orderContainerCss} >
            <CheckOut step={1} />
            <div className='d-flex my-3 justify-content-between'>
                <div className='w-50 mx-5'>
                    <Typography variant='h4' className='mb-4 text-center'>Shipping Info</Typography>
                    <div className='d-flex justify-content-between my-3'>
                        <Typography >Name: </Typography>
                        <span className='fs-6 opacity-75'>{user.name}</span>
                    </div>
                    <div className='d-flex justify-content-between my-3'>
                        <Typography >Address: </Typography>
                        <span className='fs-6 opacity-75'>{address}</span>
                    </div>
                    <div className='d-flex justify-content-between my-3'>
                        <Typography >Phone number: </Typography>
                        <span className='fs-6 opacity-75'>{phone}</span>
                    </div>
                </div>
                <div className='w-25 mx-5'>
                    <Typography variant='h4' className="text-center mb-4">Order Details</Typography>
                    <div className='d-flex justify-content-between my-3'>
                        <Typography >Subtotal:</Typography>
                        <span className='fs-6 opacity-75'>₹{totalPrice}</span>
                    </div>
                    <div className='d-flex justify-content-between my-3'>
                        <Typography >Shipping Charge:</Typography>
                        <span className='fs-6 opacity-75'>₹{shippingCharge}</span>
                    </div>
                    <div className='d-flex justify-content-between my-3'>
                        <Typography >GST:</Typography>
                        <span className='fs-6 opacity-75'>₹{GST}</span>
                    </div>
                    <hr />
                    <div className='d-flex justify-content-between my-3'>
                        <Typography variant='h6'>Grand Total:</Typography>
                        <span className='fs-6 opacity-75'>₹{grandTotal}</span>
                    </div>
                    <Button variant='contained' color='success' className='mx-1' onClick={proceedToPayment}>Pay Online </Button>
                    <Button variant='contained' color='success' onClick={handleClickOpen}>Cash on Delivery </Button>
                </div>
            </div>
            <hr />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Place order"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to confirm your order?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='error'>Cancel</Button>
                    <Button onClick={COD} autoFocus>
                        Place Order
                    </Button>
                </DialogActions>
            </Dialog>
            <Container maxWidth="lg">
                <Typography variant='h4' className='text-center'>Ordered Items</Typography>
                <div className='container'>
                    <div className="row my-4">
                        <div className="col-md-2 fw-bold text-center">Product Image</div>
                        <div className="col-md-4 fw-bold text-center">Product Name</div>
                        <div className="col-md-3 fw-bold text-center">Product Quantity</div>
                        <div className="col-md-3 fw-bold text-center">Product Price <span className='fs-6 opacity-50'>(1pc)</span></div>
                    </div>
                    <div className="row my-3">
                        {
                            cartItems && cartItems.map((item, index) => (
                                <ConfirmOrderCard key={index} item={item} />
                            ))
                        }
                    </div>
                </div>
            </Container>
        </Container>
    </>;
};

export default ConfirmOrder;
