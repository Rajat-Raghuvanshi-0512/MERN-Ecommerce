import axios from "axios"
import { ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_FAIL, CLEAR_ERRORS, PRODUCT_REQUEST, PRODUCT_SUCCESS, PRODUCT_FAIL, REVIEW_REQUEST, REVIEW_SUCCESS, REVIEW_FAIL, ADMIN_PRODUCT_FAIL, ADMIN_PRODUCT_SUCCESS, ADMIN_PRODUCT_REQUEST, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_FAIL, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL, GET_ALL_REVIEWS_REQUEST, GET_ALL_REVIEWS_SUCCESS, GET_ALL_REVIEWS_FAIL, DELETE_REVIEW_SUCCESS, DELETE_REVIEW_FAIL, DELETE_REVIEW_REQUEST, PRODUCT_BY_CATEGORY_REQUEST, PRODUCT_BY_CATEGORY_SUCCESS, PRODUCT_BY_CATEGORY_FAIL } from "../Constants/productConstants"

//Get all products
export const getProducts = (keyword = "", price = [0, 150000], rating = 0, page = 1, category = []) => async (dispatch) => {
    try {
        dispatch({
            type: ALL_PRODUCT_REQUEST
        })
        let link;
        if (price[1] === 15000) {
            price[1] = 150000
        }
        if (category.length !== 0) {
            let products = [];
            category.map(async (cat) => {
                link = `/api/products?keyword=${keyword}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${rating}&category=${cat}`;
                const { data } = await axios.get(link)
                products.push(...data.data)
                dispatch({
                    type: ALL_PRODUCT_SUCCESS,
                    payload: { products, NumberOfDocuments: data.NumberOfDocuments, ResultsPerPage: data.ResultsPerPage, filteredProductsCount: data.filteredProductsCount }
                })
            })
        }
        else {
            link = `/api/products?keyword=${keyword}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${rating}`;
            const { data } = await axios.get(link)
            dispatch({
                type: ALL_PRODUCT_SUCCESS,
                payload: { products: data.data, NumberOfDocuments: data.NumberOfDocuments, ResultsPerPage: data.ResultsPerPage, filteredProductsCount: data.filteredProductsCount }
            })
        }

    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

//Get all products - Admin
export const getAllProductsAdmin = () => async (dispatch) => {
    try {
        dispatch({
            type: ADMIN_PRODUCT_REQUEST
        })
        const { data } = await axios.get("/api/admin/products")
        dispatch({
            type: ADMIN_PRODUCT_SUCCESS,
            payload: data.products
        })

    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

//ADD a new product - Admin
export const addProductAdmin = (productDetails) => async (dispatch) => {
    try {
        dispatch({
            type: CREATE_PRODUCT_REQUEST
        })
        const { data } = await axios.post("/api/newproduct", { ...productDetails }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch({
            type: CREATE_PRODUCT_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: CREATE_PRODUCT_FAIL,
            payload: error.response.data.error
        })
    }
}

// UPDATE a product - Admin
export const updateProductAdmin = (id, productDetails) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_PRODUCT_REQUEST
        })
        const { data } = await axios.put(`/api/updateproduct/${id}`, { ...productDetails }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.error
        })
    }
}

// DELETE a product - Admin
export const deleteProductAdmin = (id) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_PRODUCT_REQUEST
        })
        const { data } = await axios.delete(`/api/deleteproduct/${id}`)
        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data.error
        })
    }
}

//Get single product
export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_REQUEST
        })
        const { data } = await axios.get(`/api/product/${id}`)
        dispatch({
            type: PRODUCT_SUCCESS,
            payload: data.product
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_FAIL,
            payload: error.response.data.error
        })
    }
}

// Add a review
export const addReview = (productId, rating, comment) => async (dispatch) => {
    try {
        dispatch({
            type: REVIEW_REQUEST
        })
        const { data } = await axios.put(`/api/addreview`, { productId, rating, comment }, {
            headers: { "Content-Type": "application/json" }
        })
        dispatch({
            type: REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: REVIEW_FAIL,
            payload: error.response.data.error
        })
    }
}

export const getProductsByCategory = (category) => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_BY_CATEGORY_REQUEST
        })
        const { data } = await axios.get(`/api/products/category/${category}`)
        dispatch({
            type: PRODUCT_BY_CATEGORY_SUCCESS,
            payload: data.products
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_BY_CATEGORY_FAIL,
            payload: error.response.data.error
        })
    }
}

// Admin - GET all reviews
export const getReviews = (productId) => async (dispatch) => {
    try {
        dispatch({
            type: GET_ALL_REVIEWS_REQUEST
        })
        const { data } = await axios.get(`/api/reviews?id=${productId}`)
        dispatch({
            type: GET_ALL_REVIEWS_SUCCESS,
            payload: data.reviews
        })

    } catch (error) {
        dispatch({
            type: GET_ALL_REVIEWS_FAIL,
            payload: error.response.data.error
        })
    }
}

// Admin - DELETE a review
export const deleteReview = (reviewId, productId) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_REVIEW_REQUEST
        })
        const { data } = await axios.delete(`/api/reviews?userId=${reviewId}&productId=${productId}`)
        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_REVIEW_FAIL,
            payload: error.response.data.error
        })
    }
}

// For clearing errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}