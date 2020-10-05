import { GET_ALL_PR_REQUEST, GET_PR_REQUEST_ID, POST_PR_REQUEST } from "../actions/types";



const INITIAL_STATE = {

}

export default(state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ALL_PR_REQUEST:
            {
                let newState = {...state}
                newState.AllPrRequest = action.AllPrRequest
                return newState
            }
        case POST_PR_REQUEST:
            return {
                ...state,
                prData:action.prData
            }
        case GET_PR_REQUEST_ID:
            return { 
                ...state,
                AllPrRequest:action.AllPrRequest
            }
        default:
            return state;
    }
}