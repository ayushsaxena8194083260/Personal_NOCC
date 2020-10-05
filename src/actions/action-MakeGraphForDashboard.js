import {
    GET_GAUGE_REPORT_RESPONSE,
    CLEAR_GRAPH_RESPONSE,
    GET_GRAPH_ANALYTICS
} from './types'
import service from "../services/allGraphServices";
// import {graphPageList}  from "./Mockdata/GraphIDList";
import commonfunction from "../utility/commonFunctions.js";
import commonGraph from "../utility/commonGraph";

function doFormat(data) {
    let _yAxis = [];
    let i = 0;
    data.yAxis.map(items => {
        if (!items.title.text.includes("null")) {
            _yAxis.push(items);
        }
    })
    data.yAxis = _yAxis;
    return data
}
export function getMakeGraph(data) {

    return (dispatch) => {
        dispatch({
            type: CLEAR_GRAPH_RESPONSE
        })
        if (data.pageID && data.subPageID) {
            const graphIDs = graphPageList(data.pageID, data.subPageID);
            if (graphIDs) {
                graphIDs && graphIDs.length > 0 && graphIDs.map((item, index) => {
                    service.makeGraph({ ...data, graphId: parseInt(item) }).then(response => {
                        const resp = commonGraph.commonGraph(response.data, '', '', '', parseInt(item));
                        const data = doFormat(resp);
                        dispatch({
                            type: GET_GRAPH_ANALYTICS,
                            payload: { "graphNo": "gaugeGraphs" + index, "categoriesNo": "categories" + index, "canvas": data.graphId,"apiResponseNo":"apiResponse"+index, categories: [], response: resp, apiResponse:response.data }
                        })
                    })
                })
            }
        }
    }
}



// function getCurrentDate() {
//     var today = new Date();
//     var d = today.getDate();
//     var m = today.getMonth() + 1;
//     var y = today.getFullYear();
//     var data;

//     if (d < 10) {
//         d = "0" + d;
//     };
//     if (m < 10) {
//         m = "0" + m;
//     };

//     data = y + "-" + m + "-" + d;
//     return data;
// }

function graphPageList(pageID, subPageID) {
    // const graphList = [
    //     { pageID: 1, subPage: 1, graphIDs: ["905", "906", "907", "908"] },       
    // ]
    // const result = graphList.filter((flt) => flt.pageID === pageID && flt.subPage === subPageID)[0];
    // if (result) {
    //     return result.graphIDs;
    // }
    return ["905", "906", "907", "908"];
}