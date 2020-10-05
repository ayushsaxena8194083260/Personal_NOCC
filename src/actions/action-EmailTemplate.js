import {
    GET_EMAIL_TEMPLATE_BY_ID,
    SHOW_SPINNER,
    HIDE_SPINNER,
    SHOW_ALERT
} from './types';
import service from "../services/externalBudgetServices";

export function getEmailTemplateById(emailTemplateId) {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.getEmailTemplateById(emailTemplateId).then(response => {
            if (response.data) {
                console.log(response.data);
                dispatch({
                    type: GET_EMAIL_TEMPLATE_BY_ID,
                    emailTemplateById: response.data
                })
            } else {
                dispatch({ type: HIDE_SPINNER })
                SHOW_ALERT(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            SHOW_ALERT(dispatch, 'failed operation' + error.toString())
        })
    }
}