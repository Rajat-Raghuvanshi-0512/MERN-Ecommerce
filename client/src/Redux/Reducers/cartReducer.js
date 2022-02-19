import { ADD_TO_CART, CLEAR_CART, GET_TOTAL, REMOVE_FROM_CART, SAVE_SHIPPING_INFO } from "../Constants/cartConstants";

export const cartReducer = (state = { cartItems: [], shippingInfo: {}, }, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload
            const itemExists = state.cartItems.find((i) => i.product_id === item.product_id)
            if (itemExists) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((i) => i.product_id === itemExists.product_id ? item : i)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                };
            }
        case REMOVE_FROM_CART:
            const product_id = action.payload
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.product_id !== product_id)
            }
        case GET_TOTAL:
            return {
                ...state,
                totalPrice: state.cartItems.reduce((acc, item) => {
                    return acc + item.price * item.quantity
                }, 0)
            }
        case CLEAR_CART:
            localStorage.removeItem("cartItems")
            return {
                ...state,
                cartItems: [],
                totalPrice: 0
            }
        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload
            }
        default:
            return state;
    }
};
