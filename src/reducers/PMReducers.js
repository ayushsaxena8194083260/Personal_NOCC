import {
    GET_PM_TASKS_BY_ACTIVITY_ID,
    SEARCH_PMUSERSTATUS_BY_ACTID_DATE_PLANTID,
    GET_PMUSERSTATUS_BY_ACTID_DATE_PLANTID,
    GET_PM_REMARK_STATUS_BY_USER_STATUS_ID,
    GET_PM_TASK_GROUP_BY_PM_ACTIVITY_ID
    
} from '../actions/types'
import { arrowFunctionExpression } from '@babel/types';
import { getPMRemarkStatusByPMUserStatusId} from "../../src/actions/PMActions";

const INITIAL_STATE = {
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

             
        case GET_PM_TASKS_BY_ACTIVITY_ID:
            return {
                ...state,
                pmTasksByActivityId: action.pmTasksByActivityId
            }

        case SEARCH_PMUSERSTATUS_BY_ACTID_DATE_PLANTID:
            return {
                ...state,
                pmUserStatusData: action.pmUserStatusData
            }  
            
        case GET_PMUSERSTATUS_BY_ACTID_DATE_PLANTID:
            return {
                ...state,
                pmUserStatus : action.pmUserStatus
            } 
            
        case GET_PM_REMARK_STATUS_BY_USER_STATUS_ID:
            return {
                ...state,
                pmRemarkStatus : action.pmRemarkStatus
            }   
        
        case GET_PM_TASK_GROUP_BY_PM_ACTIVITY_ID:
            return {
                ...state,
                pmTaskGroup : action.pmTaskGroup
            } 

        default:
            return state;
    }
}