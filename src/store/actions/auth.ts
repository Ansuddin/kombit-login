import { AuthResult } from '../../models/authresult';

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const SET_LOGIN = 'SET_LOGIN'
export const CHECK_AUTHENTICATION = 'CHECK_AUTHENTICATION'
export const LOGOUT = 'LOGOUT'

const receiveLogin = () => ({ type: LOGIN_SUCCESS })
const setLogin = (auth: AuthResult) => ({ type: SET_LOGIN, auth })
const requestLogout = () => ({ type: LOGOUT })

export function persistLogin() {
    return (dispatch: any) => {
        dispatch(receiveLogin())
    }
}

export function updateLogin(authResult: AuthResult) {
    return (dispatch: any) => {
        dispatch(setLogin(authResult))
    }
}

export function logout() {
    return (dispatch: any) => {
        dispatch(requestLogout());
        localStorage.clear();
        window.location.href = "/";
    }
}