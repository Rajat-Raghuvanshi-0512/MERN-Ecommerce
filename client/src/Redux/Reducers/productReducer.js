import { ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_FAIL, CLEAR_ERRORS, PRODUCT_REQUEST, PRODUCT_SUCCESS, PRODUCT_FAIL, REVIEW_REQUEST, REVIEW_SUCCESS, REVIEW_FAIL, REVIEW_RESET, ADMIN_PRODUCT_REQUEST, ADMIN_PRODUCT_SUCCESS, ADMIN_PRODUCT_FAIL, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_FAIL, CREATE_PRODUCT_RESET, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_RESET, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_RESET, GET_ALL_REVIEWS_REQUEST, GET_ALL_REVIEWS_FAIL, GET_ALL_REVIEWS_SUCCESS, DELETE_REVIEW_REQUEST, DELETE_REVIEW_FAIL, DELETE_REVIEW_RESET, DELETE_REVIEW_SUCCESS, PRODUCT_BY_CATEGORY_REQUEST, PRODUCT_BY_CATEGORY_FAIL, PRODUCT_BY_CATEGORY_SUCCESS } from "../Constants/productConstants"



export const productsReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
        case ADMIN_PRODUCT_REQUEST:
            return {
                loading: true,
                products: []
            };
        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productCount: action.payload.NumberOfDocuments,
                ResultsPerPage: action.payload.ResultsPerPage,
                filteredProductsCount: action.payload.filteredProductsCount
            };
        case ADMIN_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload
            }
        case ALL_PRODUCT_FAIL:
        case ADMIN_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };

        default:
            return state;
    }
}

export const singleProductReducer = (state = {}, action) => {

    switch (action.type) {
        case PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                product: action.payload
            };
        case PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };

        default:
            return state;
    }
}

export const similarProductsReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_BY_CATEGORY_REQUEST:
            return {
                loading: true,
                products: []
            };
        case PRODUCT_BY_CATEGORY_SUCCESS:
            return {
                loading: false,
                products: action.payload
            };
        case PRODUCT_BY_CATEGORY_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };

        default:
            return state;
    }
}

export const createProductReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_PRODUCT_REQUEST:
            return {
                loading: true,
            };
        case CREATE_PRODUCT_SUCCESS:
            return {
                loading: false,
                success: action.payload
            };
        case CREATE_PRODUCT_RESET:
            return {
                success: false
            };
        case CREATE_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };

        default:
            return state;
    }
}


export const productReducer = (state = {}, action) => {
    switch (action.type) {

        case UPDATE_PRODUCT_REQUEST:
        case DELETE_PRODUCT_REQUEST:
            return {
                loading: true,
            };
        case UPDATE_PRODUCT_FAIL:
        case DELETE_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload
            };


        case UPDATE_PRODUCT_SUCCESS:
            return {
                loading: false,
                isUpdated: action.payload
            };
        case UPDATE_PRODUCT_RESET:
            return {
                isUpdated: false
            };


        case DELETE_PRODUCT_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload
            };
        case DELETE_PRODUCT_RESET:
            return {
                isDeleted: false
            };


        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };

        default:
            return state;
    }
}

export const reviewReducer = (state = {}, action) => {

    switch (action.type) {
        case REVIEW_REQUEST:
        case GET_ALL_REVIEWS_REQUEST:
        case DELETE_REVIEW_REQUEST:
            return {
                loading: true,
            };

        case REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload
            };
        case GET_ALL_REVIEWS_SUCCESS:
            return {
                ...state,
                loading: false,
                reviews: action.payload
            };
        case DELETE_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            };

        case REVIEW_FAIL:
        case GET_ALL_REVIEWS_FAIL:
        case DELETE_REVIEW_FAIL:
            return {
                loading: false,
                error: action.payload
            };

        case REVIEW_RESET:
            return {
                ...state,
                success: false
            };
        case DELETE_REVIEW_RESET:
            return {
                ...state,
                isDeleted: false
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };

        default:
            return state;
    }
}