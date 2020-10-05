import {
    GET_PAGENAME_LIST
} from './types';
import service from "../services/diagnosisServices";

export function getAllGraphNameByPageID(plantType) {
    return (dispatch) => {
        service.getAllGraphNameByPageID(plantType).then(response => {
            if (response.data) {

                dispatch({
                    type: GET_PAGENAME_LIST,
                    data: splitGraphNames(response.data && response.data.length > 0 && response.data[0])
                })
            } else {
                dispatch({ type: GET_PAGENAME_LIST });
            }
        }, error => {
            dispatch({ type: GET_PAGENAME_LIST })
        })
    }
}

function splitGraphNames(data) {
    let result =[];
    if (data) {
        const graphIDs = data.graphId.split(',');
        const graphNames = data.graphName.split('!@#');
        for (let i = 0; i <= graphIDs.length - 1; i++ ) {
            result.push({ graphID: graphIDs[i], graphName: graphNames[i] });
        }
       // return { GraphIDs: GraphIDs, GraphNames: GraphNames }
    }

    return result;
}


