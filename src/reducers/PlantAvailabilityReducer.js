import {
    GET_PLANT_AVALIABILITY,
} from '../actions/types'
import { stat } from 'fs'

const INITIAL_STATE = {
    PlantAvailability: []
};

function PlantAvailabilityReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_PLANT_AVALIABILITY: {
            let newState = { ...state }
            if (action.payload !== null && action.payload.length > 0) {
                newState.PlantAvailability = action.payload;
            }
            return newState;
        }
        default:
            return { ...state };
    }
}

export { PlantAvailabilityReducer as default, INITIAL_STATE}