import { GET_PAGE_DETAIL_AND_GRAPH_DETAIL } from "../actions/types";


const INITIAL_STATE = {
    graphDetails: []
}

function AnalyticsReducer  (state = INITIAL_STATE, action) {
    switch (action.type) {

        case GET_PAGE_DETAIL_AND_GRAPH_DETAIL:
            return {
                ...state,
                graphDetails: action.graphDetails
            }

        default:
            return state;
    }
}
export { AnalyticsReducer as default, INITIAL_STATE}