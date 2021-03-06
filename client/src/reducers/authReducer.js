import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from "../actions/types";

/**
 *
 * @type {{isLoading: boolean, isAuthenticated: null, user: null, token: string}}
 */
const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null
}

/**
 *
 * @param state
 * @param action
 * @returns {{isLoading: boolean, isAuthenticated: null, user: null, token: string}|{isLoading: boolean, isAuthenticated: boolean, user, token: string}|{isLoading: boolean, isAuthenticated: boolean, user: null, token: null}|(*&{isLoading: boolean, isAuthenticated: boolean, user: null, token: string})}
 */
export default function (state = initialState, action)
{
    switch (action.type)
    {
        case USER_LOADING:
            return {
                ...state, isLoading: true
            }

        // This action will be run all the time with every request
        // to see if we're logged in or not
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            }

        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
            }

        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            }

        default:
            return state;

    }
}