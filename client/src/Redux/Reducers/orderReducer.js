import { ADMIN_ORDER_FAIL, ADMIN_ORDER_REQUEST, ADMIN_ORDER_SUCCESS, CLEAR_ERRORS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, DELETE_ORDER_FAIL, DELETE_ORDER_REQUEST, DELETE_ORDER_RESET, DELETE_ORDER_SUCCESS, MYORDERS_FAIL, MYORDERS_REQUEST, MYORDERS_SUCCESS, SINGLE_ORDER_FAIL, SINGLE_ORDER_REQUEST, SINGLE_ORDER_SUCCESS, UPDATE_ORDER_FAIL, UPDATE_ORDER_REQUEST, UPDATE_ORDER_RESET, UPDATE_ORDER_SUCCESS } from "../Constants/orderConstants";


export const newOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }

        case CREATE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                order: action.payload
            }

        case CREATE_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
};

export const myOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case MYORDERS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case MYORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload
            }

        case MYORDERS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
};

// Get all orders - ADMIN
export const allOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ADMIN_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }

        case ADMIN_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload.orders,
                total: action.payload.total
            }

        case ADMIN_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
};

// Update order status - ADMIN
export const orderReducer = (state = {}, action) => {

    switch (action.type) {
        case UPDATE_ORDER_REQUEST:
        case DELETE_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }

        case UPDATE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }

        case DELETE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case UPDATE_ORDER_RESET:
            return {
                ...state,
                isUpdated: false
            }

        case DELETE_ORDER_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case UPDATE_ORDER_FAIL:
        case DELETE_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
};



export const getSingleOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case SINGLE_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }

        case SINGLE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                order: action.payload
            }

        case SINGLE_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
};

