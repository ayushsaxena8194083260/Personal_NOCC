import {GET_ALL_AMR_Meter} from './types';
import service from "../services/amrMeterServices";

export const getAllAMRMeter =() => {

    return (dispatch) => {
        // service.getAllTaskStatistics().then(response => {
        //     dispatch({
        //         type: GET_ALL_TASK_STATISTICS,
        //         payload: response.data
        //     })
        // },
        // )

        dispatch({
            type: GET_ALL_AMR_Meter,
            data:  [
                    {
                        "_id": "1",
                        "plant_name": "Punjab 1",
                        "month": "19",
                        "year": "0",
                        "budget_generation": "180"                       
                    }
                ]
            
        })
    }
}

