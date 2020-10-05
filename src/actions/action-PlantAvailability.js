import {
    GET_PLANT_AVALIABILITY_FOR_PLANTID
} from './types';
import service from "../services/plantAvailabilityServices";

export function getPlantAvailabilityByPlantId(plantData) {
    const plantIds = plantData && plantData.map((item)=> item.id);
    return (dispatch) => {
        service.getPlantAvailabilityByPlantId(plantIds).then(response => {
            dispatch({
                type: GET_PLANT_AVALIABILITY_FOR_PLANTID,
                payload: response.data
            })
        })
    }
}