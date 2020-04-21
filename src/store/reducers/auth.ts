import * as actions from '../actions/auth'

const authState = {
    accessToken: '',
    expiresAt: 0,
    idToken: '',
    isFetching: false,
    isAuthenticated: false,
}

function auth(state = authState, action: any) {
    const { type, auth } = action

    switch (type) {
        case actions.LOGIN_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case actions.SET_LOGIN:
            return {
                ...state,
                accessToken: auth.accessToken,
                expiresAt: auth.expiresAt,
                idToken: auth.idToken,
                isAuthenticated: auth.isAuthenticated,
                isFetching: false
            }
        case actions.LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                isFetching: false
            }
        case actions.LOGOUT:
            return {
                ...state,
                accessToken: '',
                expiresAt: 0,
                idToken: '',
                isAuthenticated: false,
                isFetching: false
            }
        default:
            return state
    }
}

export default auth