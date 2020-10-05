import {
    GET_GAUGE_REPORT_RESPONSE,
    GET_GRAPH_ANALYTICS,
    CLEAR_GRAPH_RESPONSE,
    GET_HUB_PLANT_DATE
} from './types'
import service from "../services/allGraphServices";
import commonfunction from "../utility/commonFunctions.js";
import commonGraph from "../utility/commonGraph";


function formatResponse(response, index, data, dispatch) {
    const resp = commonGraph.commonGraph(response.data, '', '', '', response.data.graphId);
    dispatch({
        type: GET_GRAPH_ANALYTICS,
        payload: { "graphNo": "gaugeGraphs" + index, "categoriesNo": "categories" + index, "canvas": data.graphId, categories: [], response: resp }
    })
}
function formatResponse1(response, index, data, dispatch) {
    //const resp = commonGraph.commonGraph(response.data, '', '', '', response.data.graphId);
    dispatch({
        type: GET_GRAPH_ANALYTICS,
        payload: { "graphNo": "gaugeGraphs" + index, "categoriesNo": "categories" + index, "canvas": data.graphId, categories: [], response: response }
    })
}

export function getMakeGraphGauge(data, graphAPI="") {
    return (dispatch) => {
        if (data.graphId == "") {
            dispatch({
                type: CLEAR_GRAPH_RESPONSE
            })
        }
        if (data.pageID && data.subPageID) {
            let graphIDs = graphPageList(data.pageID, data.subPageID);
            if (graphIDs) {
                graphIDs && graphIDs.length > 0 && graphIDs.map((item, index) => {
                    if (data.graphId == "" || (data.graphId != "" && data.graphId == item))
                        if (graphAPI == "makeGauge") {
                            service.makeGraph({ ...data, graphId: parseInt(item), fromDate: getDateFrom(parseInt(item)), toDate: getDateTo(parseInt(item)) }).then(response => {
                                formatResponse(response, index, data, dispatch);
                            })
                        }
                        else if (graphAPI == "makeFGauge") {
                            service.makeGraphfgauge({ ...data, graphId: parseInt(item)}).then(response => {
                                formatResponse1(response, index, data, dispatch);
                            })//fromDate: getDateFrom(parseInt(item)), toDate: getDateTo(parseInt(item))
                        }
                        else if (graphAPI == "makeFYRGauge") {
                            service.makeGraphfyrgauge({ ...data, graphId: parseInt(item), fromDate: getDateFrom(parseInt(item)), toDate: getDateTo(parseInt(item)) }).then(response => {
                                formatResponse1(response, index, data, dispatch);
                            })
                        }
                        else if (graphAPI == "makeRevFGauge") {
                            service.makeGraphrevfgauge({ ...data, graphId: parseInt(item), fromDate: getDateFrom(parseInt(item)), toDate: getDateTo(parseInt(item)) }).then(response => {
                                formatResponse1(response, index, data, dispatch);
                            })
                        }
                        else if (graphAPI == "makeRevFiGauge") {
                            service.makeGraphrevfigauge({ ...data, graphId: parseInt(item), fromDate: getDateFrom(parseInt(item)), toDate: getDateTo(parseInt(item)) }).then(response => {
                                formatResponse1(response, index, data, dispatch);
                            })
                        }
                })
            }
        }
    }
}



function graphPageList(pageID, subPageID) {
    const graphList = [
        // { pageID: 1, subPage: 1, graphIDs: ["966", "967", "968", "969"] },
        // { pageID: 1, subPage: 2, graphIDs: ["970", "971", "972", "973"] },
        // { pageID: 1, subPage: 3, graphIDs: ["984", "985", "986", "987"] },
        { pageID: 1, subPage: 1, graphIDs: ["984", "985", "986", "987"] },
        { pageID: 1, subPage: 2, graphIDs: ["995", "996", "997", "998"] },
        { pageID: 1, subPage: 3, graphIDs: ["988", "989", "990", "991"] },

        { pageID: 1, subPage: 4, graphIDs: ["992", "993", "999"] },
        { pageID: 1, subPage: 5, graphIDs: ["980", "979", "978", "994"] },
        { pageID: 1, subPage: 6, graphIDs: ["966", "967", "968", "969"] },
        { pageID: 1, subPage: 7, graphIDs: ["970", "971", "972", "973"] },
    ]
    const result = graphList.filter((flt) => flt.pageID === pageID && flt.subPage === subPageID)[0];
    if (result) {
        return result.graphIDs;
    }
    return null;
}

function getDateFrom(graphId) {
    if (graphId == 966) {
        return "2020-02-02";
    } else {
        return "2020-02-01";
    }
}

function getDateTo(graphId) {
    return "2020-02-02";

}