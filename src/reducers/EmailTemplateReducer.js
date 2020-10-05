import {
    GET_EMAIL_TEMPLATE_BY_ID
} from '../actions/types'
import { arrowFunctionExpression } from '@babel/types';

const INITIAL_STATE = {
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case GET_EMAIL_TEMPLATE_BY_ID:
            return {
                ...state,
                emailTemplateById: action.emailTemplateById

            }
        default:
            return state;
    }
}