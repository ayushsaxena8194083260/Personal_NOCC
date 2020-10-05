import {
    POST_PLANT_TILT_SCHEDULE,
    GET_ALL_PLANT_TILT_SCHEDULE,
    GET_TILT_SCHEDULE_DATE_PLANTID,
    DELETE_PLANT_TILT_SCHEDULE
    
} from '../actions/types'
import { arrowFunctionExpression } from '@babel/types';

const INITIAL_STATE = {
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

       case POST_PLANT_TILT_SCHEDULE:
            return {
                ...state,
                plant_tilt_schedule: action.plant_tilt_schedule
            }
        
        case GET_ALL_PLANT_TILT_SCHEDULE:
            return {
                ...state,
                allPlantTiltSchedule: action.allPlantTiltSchedule.filter(plant => plant.plant_id === action.plant_id)
                // .map((plant1)=> {
                //     plant1['plant_type']=action.plant_type;
                //     plant1['plant_name']=action.plant_name;
                // })
            }  
            
        case GET_TILT_SCHEDULE_DATE_PLANTID:
            return {
                ...state,
                allTiltScheduleByDatePlantId: action.allTiltScheduleByDatePlantId
            }
            
        case DELETE_PLANT_TILT_SCHEDULE:
            return {
                ...state,
                allTiltScheduleByDatePlantId: state.allTiltScheduleByDatePlantId.filter(plant => plant.plantTiltScheduleId !== action.id)
            }    
           
        default:
            return state;
    }
}
