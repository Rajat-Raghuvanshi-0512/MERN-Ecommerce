import React, { useEffect } from 'react';
import CartItem from './CartItem';
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Metadata from '../Metadata';
import { CLEAR_CART, GET_TOTAL } from '../../Redux/Constants/cartConstants';

const Cart = () => {

    const dispatch = useDispatch()
    const { cartItems, totalPrice } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.userInfo)
    const Navigate = useNavigate()

    useEffect(() => {
        dispatch({ type: GET_TOTAL })
    }, [dispatch, cartItems, totalPrice]);

    const checkOutHandler = () => {
        Navigate("/login?redirect=shipping")
    }

    return <>
        {user && <Metadata title={`Shop Buddy | ${user.name}'s Cart`} />}
        <div className="container-fluid h-auto pb-5" style={{ backgroundColor: "whitesmoke" }}>
            <div className="row">
                <div className="col-md-10 col-11 mx-auto">
                    <div className="row mt-5 gx-3">
                        <div className="col-md-12 col-lg-8 col-11 mx-auto main_cart mb-lg-0 mb-5 shadow">
                            <div className="cart_card p-4">
                                <h1 className="py-4 font-weight-bold">Cart <span className='fs-6 fw-bold'>({cartItems.length} items)</span></h1>
                                <div className="row">
                                    {cartItems.length === 0
                                        ?
                                        <h5 onClick={() => Navigate("/products")}>Add items to show in the cart....</h5>
                                        :
                                        cartItems.map((item, index) => {
                                            return <CartItem item={item} key={index} />
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-4 col-11 mx-auto mt-lg-0 mt-md-5">
                            <div className="right_side p-3 shadow bg-white">
                                <h3 className=" mb-4 d-flex justify-content-center "><strong>Grand total</strong></h3>
                                <hr />
                                <div className="total-amt d-flex justify-content-between font-weight-bold">
                                    <p>Total amount: </p>
                                    <p>₹<span id="total_cart_amt">{totalPrice}</span></p>
                                </div>
                                <div className="d-flex justify-content-around">
                                    <button className="btn btn-primary" disabled={cartItems.length <= 0 ? true : false} onClick={() => Navigate("/products")}
                                    >Add more</button>
                                    <button className="btn btn-danger" onClick={() => dispatch({ type: CLEAR_CART })} >Clear Cart</button>
                                </div>
                                <div className="d-flex justify-content-around mt-3">
                                    <button className="btn btn-dark text-uppercase" disabled={cartItems.length <= 0 ? true : false} onClick={checkOutHandler} >CheckOut</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>;
};

export default Cart;
