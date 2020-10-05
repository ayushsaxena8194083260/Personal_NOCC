import {
    GET_ALL_Penalty,
    ADD_UPDATE_PENALTY
} from '../actions/types'

const INITIAL_STATE = {
    penaltyData: [],
    searchData:null
}

function PenaltyReducer  (state = INITIAL_STATE, action) {
    switch (action.type) {

        case GET_ALL_Penalty:
            return {
                ...state,
                penaltyData: action.payload.response,
                searchData: action.payload.searchData,

            }
            case ADD_UPDATE_PENALTY:
                return {
                    ...state,
                    displayName: action.payload
                }

        default:
            return state;
    }
}
export { PenaltyReducer as default, INITIAL_STATE}