import {
    GET_ALL_PenaltyColor,
    ADD_UPDATE_PENALTYCOLOR
} from '../actions/types'

const INITIAL_STATE = {
    penaltyColorData: [],
    
}

function PenaltyColorReducer  (state = INITIAL_STATE, action) {
    switch (action.type) {

        case GET_ALL_PenaltyColor:
            return {
                ...state,
                penaltyColorData: action.payload                

            }
            case ADD_UPDATE_PENALTYCOLOR:
                return {
                    ...state,
                    displayName: action.payload
                }

        default:
            return state;
    }
}
export { PenaltyColorReducer as default, INITIAL_STATE}