import {
    GET_PAGENAME_LIST,

} from '../actions/types'

const INITIAL_STATE = {
    allGraphNames: []
}

function diagnosisReducer  (state = INITIAL_STATE, action) {
    switch (action.type) {

        // case GET_PAGENAME_LIST:
        //     return {
        //         ...state,
        //         allGraphNames: action.data

        //     }

        default:
            return state;
    }
}
export { diagnosisReducer as default, INITIAL_STATE}