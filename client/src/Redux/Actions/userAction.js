import axios from "axios"
import { CLEAR_ERRORS, DELETE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, FORGOT_PASS_FAIL, FORGOT_PASS_REQUEST, FORGOT_PASS_SUCCESS, GET_ALL_USERS_FAIL, GET_ALL_USERS_REQUEST, GET_ALL_USERS_SUCCESS, GET_USER_FAIL, GET_USER_PHOTO_FAIL, GET_USER_PHOTO_REQUEST, GET_USER_PHOTO_SUCCESS, GET_USER_REQUEST, GET_USER_SUCCESS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS, RESET_PASS_FAIL, RESET_PASS_REQUEST, RESET_PASS_SUCCESS, UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_USER_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS } from "../Constants/userConstants"

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST })
        const { data } = await axios.post("/api/login", { email, password }, {
            headers: { "Content-Type": "application/json" }
        })
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.error
        })
    }
}

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_REQUEST })
        const { data } = await axios.post("/api/signup", { name, email, password }, {
            headers: { "Content-Type": "application/json" }
        })
        dispatch({
            type: REGISTER_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: REGISTER_FAIL,
            payload: error.response.data.error
        })
    }
}

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST })
        const { data } = await axios.get("/api/aboutme")
        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.error
        })
    }
}

export const logout = () => async (dispatch) => {
    try {
        await axios.get("/api/logout")
        dispatch({ type: LOGOUT_SUCCESS })

    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.error
        })
    }
}

export const updateProfile = (name, email, profilePhoto = "") => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST })
        const { data } = await axios.put("/api/me/update", { name, email, profilePhoto }, {
            headers: { "Content-Type": "application/json" }
        })
        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.error
        })
    }
}

export const updatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST })
        const { data } = await axios.put("/api/password/update", { ...passwords }, {
            headers: { "Content-Type": "application/json" }
        })
        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.error
        })
    }
}

export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: FORGOT_PASS_REQUEST })
        const { data } = await axios.post("/api/password/forgot", { email }, {
            headers: { "Content-Type": "application/json" }
        })
        dispatch({
            type: FORGOT_PASS_SUCCESS,
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: FORGOT_PASS_FAIL,
            payload: error.response.data.error
        })
    }
}

export const resetPassword = (token, password, cpassword) => async (dispatch) => {
    try {
        dispatch({ type: RESET_PASS_REQUEST })
        const { data } = await axios.put(`/api/password/reset/${token}`, { password, cpassword }, {
            headers: { "Content-Type": "application/json" }
        })
        dispatch({
            type: RESET_PASS_SUCCESS,
            payload: data.user ? true : false
        })

    } catch (error) {
        dispatch({
            type: RESET_PASS_FAIL,
            payload: error.response.data.error
        })
    }
}

// Get all users admin
export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_USERS_REQUEST })
        const { data } = await axios.get("/api/admin/users")
        dispatch({
            type: GET_ALL_USERS_SUCCESS,
            payload: data.userDetails
        })

    } catch (error) {
        dispatch({
            type: GET_ALL_USERS_FAIL,
            payload: error.response.data.error
        })
    }
}
export const getUserPhoto = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_USER_PHOTO_REQUEST })
        const { data } = await axios.get(`/api/photo/${id}`)
        dispatch({
            type: GET_USER_PHOTO_SUCCESS,
            payload: data.photo
        })

    } catch (error) {
        dispatch({
            type: GET_USER_PHOTO_FAIL,
            payload: error.response.data.error
        })
    }
}

// ADMIN - get user details
export const getUserInfo = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_USER_REQUEST })
        const { data } = await axios.get(`/api/admin/user/${id}`)
        dispatch({
            type: GET_USER_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: GET_USER_FAIL,
            payload: error.response.data.error
        })
    }
}

// ADMIN - Delete user
export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_USER_REQUEST })
        const { data } = await axios.delete(`/api/admin/user/${id}`)
        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response.data.error
        })
    }
}

// ADMIN - Update user
export const updateUser = (id, role) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_USER_REQUEST })
        const { data } = await axios.put(`/api/admin/user/${id}`, { role }, {
            headers: { "Content-Type": "application/json" }
        })
        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.error
        })
    }
}

// For clearing errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}