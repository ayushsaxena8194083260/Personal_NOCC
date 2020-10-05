import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL, AUTH_LOGOUT, GET_MENU_PERMISSION_BY_ROLEID, HIDE_SPINNER } from "./types"
import Axios from "axios";
import service from '../services/loginServices';
import service1 from '../services/settingServices';

export const authStart = () => {
    return {
        type: AUTH_START
    };
}

export const authSuccess = (isAuthenticated) => {
    return {
        type: AUTH_SUCCESS,
        isAuthenticated: isAuthenticated,
    }
}

export const authFail = (error) => {
    return {
        type: AUTH_FAIL,
        error: error
    }
}
export const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('username');
    return {
        type: AUTH_LOGOUT
    }
}
export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
    }
}

// export const auth = (email, password) => {
//     return dispatch => {
//         dispatch(authStart());
//         const authData = {
//             email:email,
//             password:password,
//             returnSecureToken:true
//         }
//         Axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB782XCGzzIoUDenqPqB7VYfsWHzmYi4zw',authData).then(
//             res => {
//                 console.log(res);
//                 const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
//                 localStorage.setItem('token', res.data.idToken);
//                 localStorage.setItem('expirationDate', expirationDate);
//                 localStorage.setItem('userId', res.data.localId);
//                 dispatch(authSuccess(res.data.idToken,res.data.localId));
//                 dispatch(checkAuthTimeout(res.data.expiresIn))
//             }
//         ).catch(err => {
//             console.log(err);
//             dispatch(authFail(err))
//         })
//     }
// }
export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            username: email,
            textPassword: password,
        }
        
        service.validateUser(authData).then(res => {
            localStorage.setItem('isAuthenticated', JSON.stringify(res.data))
            if (res.data != null) {
                const creationTime = new Date();
                const expireTimestamp = creationTime.setTime(creationTime.getTime() + (1 * 60 * 60 * 1000))
                const expirationDate = expireTimestamp
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('username', authData.username);
                service1.getMenuPermissionByRoleId(res.data.roleId).then(response => {
                    if (response.data) {
                        dispatch({
                            type: GET_MENU_PERMISSION_BY_ROLEID,
                            menuByRoleId: response.data
                        })
                    }
                })
                dispatch(authSuccess(res.data))
            }
            else {

            }
        }).catch(err => {
            console.log(err);
            dispatch(authFail(err))
        })
    }
}
export const authCheckState = () => {
    return dispatch => {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        if (!isAuthenticated) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(JSON.parse(localStorage.getItem('expirationDate')));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(isAuthenticated));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
                // }   
            }
        };
    };
}