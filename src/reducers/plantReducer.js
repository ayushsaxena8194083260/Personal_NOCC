import {
    GET_ALL_PLANTS,
    POST_PLANT,
    DELETE_PLANT,
    GET_PLANTS_BY_TYPE,
    GET_ALL_PLANTS_BY_PLANTID
} from '../actions/types'
import { arrowFunctionExpression } from '@babel/types';

const INITIAL_STATE = {
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case GET_ALL_PLANTS:
            return {
                ...state,
                allplants: action.plants

            }
        
        case POST_PLANT:
            return {
                ...state,
                plant: action.plant
            }
            
        case DELETE_PLANT:
            console.log(state);
            console.log(action);
            return {
                ...state,
                //remove the deleted vendor from the state object
                allplants: state.allplants.filter(plant => plant.plantId !== action.response.id),
            }    

        case GET_PLANTS_BY_TYPE:
            console.log(action);    
        return{
                ...state,
                plantsByType: action.plantsByType
                
            }  
            
        case GET_ALL_PLANTS_BY_PLANTID:
                return {
                    ...state,
                    plantTiltsByPlantID: action.plantTiltsByPlantID
                }

        default:
            return state;
    }
}
