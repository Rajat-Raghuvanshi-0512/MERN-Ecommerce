import React, { useEffect } from 'react';
import "./payment.css"
import {
    useStripe,
    useElements,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
} from '@stripe/react-stripe-js';
import Metadata from '../Metadata';
import CheckOut from '../Checkout Steps/CheckOut';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { orderContainerCss } from './ObjectCss';
import { Button, Container, Typography } from '@mui/material';
import creditCard from "../../images/CreditCard.png"
import { useRef } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearErrors, createOrder } from '../../Redux/Actions/orderAction';

const Payment = () => {

    const dispatch = useDispatch()
    const { cartItems, shippingInfo } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.userInfo)
    const { error } = useSelector(state => state.newOrder)

    const stripe = useStripe();
    const elements = useElements();
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"))
    const paybtn = useRef(null)
    const Navigate = useNavigate()

    const paymentData = {
        amount: Math.round(orderInfo.grandTotal * 100)
    }
    const order = {
        shippingInfo,
        orderedItems: cartItems,
        user: user._id,
        itemsPrice: orderInfo.totalPrice,
        taxPrice: orderInfo.GST,
        shippingPrice: orderInfo.shippingCharge,
        totalPrice: orderInfo.grandTotal,
    }

    const handlePayment = async (e) => {
        e.preventDefault()
        try {
            paybtn.current.disabled = true
            const { data } = await axios.post("/api/payment/process", paymentData, {
                "Content-Type": "application/json"
            })
            const client_secret = data.client_secret
            if (!stripe || !elements) return

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            country: shippingInfo.country
                        }
                    }
                }
            })
            if (result.error) {
                paybtn.current.disabled = false
                toast.error(result.error.message)
            } else if (result.paymentIntent.status === "succeeded") {

                order.paymentInfo = {
                    id: result.paymentIntent.id,
                    status: result.paymentIntent.status
                }
                dispatch(createOrder(order))
                Navigate("/success")
            } else {
                toast.error("Error in processing payment")
            }

        } catch (err) {
            paybtn.current.disabled = false
            toast.error(err.response.data.message)
        }
    }

    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }
    }, [error, dispatch]);


    return <>
        <Metadata title="Shop Buddy | Payment " />
        <Container sx={orderContainerCss} >
            <CheckOut step={2} />
            <Container className='d-flex '>
                <Container className='w-50'>
                    <form onSubmit={handlePayment}>
                        <div className='d-flex align-items-center my-3'>
                            <div className='w-75'>
                                <Typography variant='h2' className='mb-4 text-center'>Card Info</Typography>
                                <div className='d-flex align-items-center my-4'>
                                    <CreditCardIcon className='cardIcon' />
                                    <CardNumberElement className='paymentInput' />
                                </div>
                                <div className='d-flex align-items-center my-4'>
                                    <EventIcon className='cardIcon' />
                                    <CardExpiryElement className='paymentInput' />
                                </div>
                                <div className='d-flex align-items-center my-4'>
                                    <VpnKeyIcon className='cardIcon' />
                                    <CardCvcElement className='paymentInput' />
                                </div>
                                <Button ref={paybtn} type='submit' color='success' variant='contained'>Pay ₹{orderInfo && orderInfo.grandTotal} </Button>
                            </div>
                        </div>
                    </form>
                </Container>
                <Container className='w-50'>
                    <img src={creditCard} alt="creditcard" />
                </Container>
            </Container>
        </Container>


    </>;
};

export default Payment;
