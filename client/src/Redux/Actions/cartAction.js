import axios from "axios"
import { ADD_TO_CART, REMOVE_FROM_CART, SAVE_SHIPPING_INFO } from "../Constants/cartConstants"

export const addItemToCart = (id, qty) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`/api/product/${id}`)
        dispatch({
            type: ADD_TO_CART,
            payload: {
                product_id: data.product._id,
                name: data.product.name,
                price: data.product.price,
                image: data.product.images[0].url,
                stock: data.product.stock,
                desc: data.product.desc,
                category: data.product.category,
                quantity: qty
            }
        })
        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
    } catch (error) {
        console.log(error);
    }
}

export const removeItemFromCart = (id) => (dispatch, getState) => {
    try {
        dispatch({
            type: REMOVE_FROM_CART,
            payload: id
        })
        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
    } catch (error) {
        console.log(error);
    }
}

export const saveShippingInfo = (details) => (dispatch, getState) => {
    try {
        dispatch({
            type: SAVE_SHIPPING_INFO,
            payload: details
        })
        localStorage.setItem("shippingInfo", JSON.stringify(getState().cart.shippingInfo))
    } catch (error) {
        console.log(error);
    }
}