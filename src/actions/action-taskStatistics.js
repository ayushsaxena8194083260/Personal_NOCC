import {GET_ALL_TASK_STATISTICS} from './types';
import service from "../services/taskStatisticsServices";

export const getAllTaskStatistics =() => {

    return (dispatch) => {
        service.getAllTaskStatistics().then(response => {
            dispatch({
                type: GET_ALL_TASK_STATISTICS,
                data: response.data
            })
        },
        )

        // dispatch({
        //     type: GET_ALL_TASK_STATISTICS,
        //     data:  [
        //             {
        //                 "_id": "1",
        //                 "plant_name": "Punjab 1",
        //                 "requires_Completion": "19",
        //                 "completed": "0",
        //                 "requires_Completion1": "180",
        //                 "completed1": "0",
        //                 "requires_Completion2": "35",
        //                 "completed2": "0",
        //                 "requires_Completion3": "13",
        //                 "completed3": "0",
        //                 "requires_Completion4": "32",
        //                 "completed4": "0",
        //                 "requires_Completion5": "84",
        //                 "completed5": "0"
        //             }
        //         ]
            
        // })
    }
}

function mockData() {
    const _data = {
        data: [
            {
                "_id": "1",
                "plant_name": "Punjab 1",
                "requires_Completion": "19",
                "completed": "0",
                "requires_Completion1": "180",
                "completed1": "0",
                "requires_Completion2": "35",
                "completed2": "0",
                "requires_Completion3": "13",
                "completed3": "0",
                "requires_Completion4": "32",
                "completed4": "0",
                "requires_Completion5": "84",
                "completed5": "0"
            }
        ]
    }
    return _data;
}