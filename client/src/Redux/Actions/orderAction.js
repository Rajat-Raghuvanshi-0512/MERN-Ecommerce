import axios from "axios";
import { toast } from "react-toastify";
import { CLEAR_CART } from "../Constants/cartConstants";
import { ADMIN_ORDER_FAIL, ADMIN_ORDER_REQUEST, ADMIN_ORDER_SUCCESS, CLEAR_ERRORS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, DELETE_ORDER_FAIL, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, MYORDERS_FAIL, MYORDERS_REQUEST, MYORDERS_SUCCESS, SINGLE_ORDER_FAIL, SINGLE_ORDER_REQUEST, SINGLE_ORDER_SUCCESS, UPDATE_ORDER_FAIL, UPDATE_ORDER_REQUEST, UPDATE_ORDER_SUCCESS } from "../Constants/orderConstants";

export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST })
        const { data } = await axios.post("/api/order/new", order, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data.order
        })
        if (data.order) {
            dispatch({ type: CLEAR_CART })
            toast.success("Order placed successfully")
        }

    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
};

export const myOrders = () => async (dispatch) => {
    try {
        dispatch({ type: MYORDERS_REQUEST })
        const { data } = await axios.get("/api/orders/me")
        dispatch({
            type: MYORDERS_SUCCESS,
            payload: data.orders
        })

    } catch (error) {
        dispatch({
            type: MYORDERS_FAIL,
            payload: error.response.data.error
        })
    }
};

export const orderDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: SINGLE_ORDER_REQUEST })
        const { data } = await axios.get(`/api/order/${id}`)
        dispatch({
            type: SINGLE_ORDER_SUCCESS,
            payload: data.order
        })

    } catch (error) {
        dispatch({
            type: SINGLE_ORDER_FAIL,
            payload: error.response.data.error
        })
    }
};

//Admin - Get all orders
export const adminOrders = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_ORDER_REQUEST })
        const { data } = await axios.get("/api/admin/orders")
        dispatch({
            type: ADMIN_ORDER_SUCCESS,
            payload: { orders: data.orders, total: data.SubTotal }
        })

    } catch (error) {
        dispatch({
            type: ADMIN_ORDER_FAIL,
            payload: error.response.data.error
        })
    }
};
//Admin-Update order status
export const updateOrder = (id, status) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_ORDER_REQUEST })
        const { data } = await axios.put(`/api/admin/order/update/${id}`, { status }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch({
            type: UPDATE_ORDER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_ORDER_FAIL,
            payload: error.response.data.error
        })
    }
};

//Admin- Delete order
export const deleteOrder = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_ORDER_REQUEST })
        const { data } = await axios.delete(`/api/admin/order/delete/${id}`)
        dispatch({
            type: DELETE_ORDER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_ORDER_FAIL,
            payload: error.response.data.error
        })
    }
};

// For clearing errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}