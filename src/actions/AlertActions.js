import {SHOW_ALERT} from './types'


/**
 * success alert
 */
export const showSuccessAlert = (dispatch, message) => {
    dispatch({
        type: SHOW_ALERT,
        alert: {
            showAlert: true,
            colorAlert: 'success',
            messageAlert: message
        }
    })
}


/**
 * error alert
 */
export const showErrorAlert = (dispatch, message) => {
    dispatch({
        type: SHOW_ALERT,
        alert: {
            showAlert: true,
            colorAlert: 'danger',
            messageAlert: message
        }
    })
}