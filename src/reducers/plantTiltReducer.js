import {
    POST_PLANT_TILT,
    GET_ALL_PLANTS_BY_PLANTID,
    DELETE_PLANT_TILT,
    GET_ALL_TILTS_BY_PLANTID_DATE
    
} from '../actions/types'
import { arrowFunctionExpression } from '@babel/types';

const INITIAL_STATE = {
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

       case POST_PLANT_TILT:
            return {
                ...state,
                plant_tilt: action.plant_tilt
            }
        
        case GET_ALL_PLANTS_BY_PLANTID:
            return {
                ...state,
                plantTiltsByPlantID: action.plantTiltsByPlantID
            }

        case GET_ALL_TILTS_BY_PLANTID_DATE:
            return {
                ...state,
                plantTiltsByPlantIDDate: action.plantTiltsByPlantIDDate
            }

        case DELETE_PLANT_TILT: {
            return {
                ...state,
                plantTiltsByPlantIDDate: state.plantTiltsByPlantIDDate.filter(plant => plant.tiltId !== action.id)
            }
        }    

        default:
            return state;
    }
}
