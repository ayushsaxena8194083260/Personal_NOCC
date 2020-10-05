import {
    GET_ALL_AMR_Meter,

} from '../actions/types'

const INITIAL_STATE = {
    amrMeterData: []
}

function AMRMeterReducer  (state = INITIAL_STATE, action) {
    switch (action.type) {

        case GET_ALL_AMR_Meter:
            return {
                ...state,
                amrMeterData: action.data

            }

        default:
            return state;
    }
}
export { AMRMeterReducer as default, INITIAL_STATE}