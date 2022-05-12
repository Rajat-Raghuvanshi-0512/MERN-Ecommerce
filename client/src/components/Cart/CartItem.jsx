import React, { useState } from 'react';
import "./Cart.css"
import { useDispatch } from 'react-redux';
import { addItemToCart, removeItemFromCart } from '../../Redux/Actions/cartAction';
import { Link } from 'react-router-dom';

const CartItem = ({ item }) => {

    const [qty, setQty] = useState(item.quantity);
    const dispatch = useDispatch();

    const removeItem = () => {
        dispatch(removeItemFromCart(item.product_id))
    }
    const increment = () => {
        if (qty >= item.stock) return;
        const newqty = qty + 1
        setQty(newqty)
        dispatch(addItemToCart(item.product_id, newqty))
    }
    const decrement = () => {
        const newqty = qty - 1
        setQty(newqty)
        dispatch(addItemToCart(item.product_id, newqty))
    }

    return <>
        <div className="col-md-5 col-11 mx-auto bg-light d-flex justify-content-center align-items-center shadow item_img">
            <img src={item.image} className="img-fluid" alt="cart img" />
        </div>
        <div className="col-md-7 col-11 mx-auto px-2 mt-2 ">
            <div className="row">
                <div className="col-12 card-title">
                    <Link to={`/product/${item.product_id}`} className='Link'>
                        <h2 className="mb-4 carth2 item_name" >{item.name} </h2>
                        <p className=" cartp mb-2 desc1"> Description: {item.desc.slice(0, 100)}...</p>
                        <p className=" cartp mb-2"><strong>Category:</strong> {item.category}</p>
                    </Link>
                </div>
                <div className="col-12">
                    <ul className="pagination justify-content-center">
                        <li className="page-item">
                            <button className="page-link" disabled={qty <= 1 ? true : false} onClick={decrement}  >
                                <i className="fas fa-minus py-1"></i>
                            </button>
                        </li>
                        <li className="page-item">
                            <input type="text" name="" className="page-link" value={qty} id="textbox" readOnly />
                        </li>
                        <li className="page-item">
                            <button className="page-link" onClick={increment}>
                                <i className="fas fa-plus py-1"></i>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="row">
                <div className="col-8 d-flex flex-column remove_wish">
                    <p className=" cartp small cursor">
                        <i className=" d-block px-auto fas fa-trash-alt" >
                            <span className="trash-text" onClick={removeItem}> REMOVE ITEM</span>
                        </i>

                    </p>
                </div>
                <div className="col-4 d-flex justify-content-center price_money">
                    <h3>₹<span id="itemval">{item.price * qty}</span></h3>
                </div>
            </div>
        </div>
        <div className="my-3 gap"></div>
        <hr />

    </>;
};

export default CartItem;
