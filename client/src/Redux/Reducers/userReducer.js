import { CLEAR_ERRORS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_RESET, UPDATE_PROFILE_SUCCESS, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_RESET, UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_SUCCESS, FORGOT_PASS_SUCCESS, FORGOT_PASS_FAIL, FORGOT_PASS_REQUEST, RESET_PASS_REQUEST, RESET_PASS_SUCCESS, RESET_PASS_FAIL, GET_ALL_USERS_REQUEST, GET_ALL_USERS_SUCCESS, GET_ALL_USERS_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_FAIL, UPDATE_USER_RESET, DELETE_USER_SUCCESS, DELETE_USER_RESET, GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAIL, GET_USER_PHOTO_REQUEST, GET_USER_PHOTO_FAIL, GET_USER_PHOTO_SUCCESS } from "../Constants/userConstants"

export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {

        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
            };

        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            };

        case LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null
            }

        case LOGIN_FAIL:
        case REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                error: action.payload,
                user: null
            };

        case LOAD_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                error: action.payload,
                user: null
            };
        case LOGOUT_FAIL:
            return {
                ...state,
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
}

export const profileReducer = (state = {}, action) => {
    switch (action.type) {

        case UPDATE_PROFILE_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
        case UPDATE_USER_REQUEST:
        case DELETE_USER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case UPDATE_PROFILE_FAIL:
        case UPDATE_PASSWORD_FAIL:
        case UPDATE_USER_FAIL:
        case DELETE_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,

            }
        case UPDATE_PASSWORD_RESET:
        case UPDATE_PROFILE_RESET:
        case UPDATE_USER_RESET:
            return {
                ...state,
                isUpdated: false
            }

        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,

            }
        case DELETE_USER_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const forgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case FORGOT_PASS_REQUEST:
        case RESET_PASS_REQUEST:
            return {
                ...state,
                loading: true
            };

        case FORGOT_PASS_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload
            };
        case RESET_PASS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload
            }

        case FORGOT_PASS_FAIL:
        case RESET_PASS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const allUserReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case GET_ALL_USERS_REQUEST:
            return {
                loading: true
            }
        case GET_ALL_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload
            }
        case GET_ALL_USERS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS: {
            return {
                ...state,
                error: null
            }
        }

        default:
            return state;
    }
}

export const singleUserReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case GET_USER_REQUEST:
        case GET_USER_PHOTO_REQUEST:
            return {
                loading: true
            }
        case GET_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload
            }
        case GET_USER_PHOTO_SUCCESS:
            return {
                ...state,
                loading: false,
                photo: action.payload
            }
        case GET_USER_FAIL:
        case GET_USER_PHOTO_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS: {
            return {
                ...state,
                error: null
            }
        }

        default:
            return state;
    }
}