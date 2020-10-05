import {
    GET_GAUGE_REPORT_RESPONSE,
    CLEAR_GRAPH_RESPONSE
} from './types'
import service from "../services/allGraphServices";
import commonfunction from "../utility/commonFunctions.js";
import commonGraph from "../utility/commonGraph";

function plotBands(data) {
    let plotBands = [{
        color: "#55BF3B",
        from: data.redStartValue,
        to: data.redEndValue
    },
    {
        color: "#ffbf00",
        from: data.yellowStartValue,
        to: data.yellowEndValue
    },
    {
        color: "#DF5353",
        from: data.greenStartValue,
        to: data.greenEndValue
    }];

    return plotBands;
}
function getDate(cDate) {
    const _date = cDate && cDate.split('T');
    const today = cDate ? new Date(_date[0]) : new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;

    const yyyy = today.getFullYear();
    if (dd < 10) {
        dd = "0" + dd;
    }
    if (mm < 10) {
        mm = "0" + mm;
    }
    // return yyyy + "-" + mm + "-" + dd;
    return dd + "-" + mm + "-" + yyyy;
}
function todayDate() {

    const today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;

    const yyyy = today.getFullYear();
    if (dd < 10) {
        dd = "0" + dd;
    }
    if (mm < 10) {
        mm = "0" + mm;
    }
    return yyyy + "-" + mm + "-" + dd;
    //return dd + "-" + mm + "-" +  yyyy;
}

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
        service.makeGraph(data).then(response => {
            const resp = commonGraph.commonGraph(response.data, '', '', '', '');
            const data = doFormat(resp);
            dispatch({
                type: GET_GAUGE_REPORT_RESPONSE,
                payload: { "graphNo": "gaugeGraphs0", "canvas": data.graphId, response: data }//graphFormat1(response.data, item) }
            })
        })
    }
}

function graphPageList(pageID, subPageID) {
    const graphList = [
        { pageID: 1, subPage: 1, graphIDs: ["1008"] },
        { pageID: 1, subPage: 2, graphIDs: ["407", "408", "409"] },
        { pageID: 1, subPage: 3, graphIDs: ["411", "412", "413"] },
        { pageID: 1, subPage: 4, graphIDs: ["564", "429", "430"] },
        { pageID: 1, subPage: 5, graphIDs: ["565", "432", "433"] },
        { pageID: 1, subPage: 6, graphIDs: ["440"] },
        { pageID: 1, subPage: 7, graphIDs: ["570", "437"] },
        { pageID: 1, subPage: 8, graphIDs: ["558", "855"] },
        { pageID: 1, subPage: 9, graphIDs: ["795", "381", "1001"] },
        { pageID: 2, subPage: 1, graphIDs: ["861", "740", "685"] },
        { pageID: 2, subPage: 2, graphIDs: ["737", "735", "738"] },
        { pageID: 2, subPage: 3, graphIDs: ["771", "772", "673"] },
        { pageID: 2, subPage: 4, graphIDs: ["681", "682", "684"] },
        { pageID: 2, subPage: 5, graphIDs: ["751", "734", "683"] },
        { pageID: 2, subPage: 6, graphIDs: ["741", "773", "774", "775"] },
        { pageID: 2, subPage: 7, graphIDs: ["776", "777", "", "779"] },
        { pageID: 2, subPage: 8, graphIDs: ["780", "781", "686"] },
        { pageID: 2, subPage: 9, graphIDs: ["841", "868", "837", "842"] },
        { pageID: 2, subPage: 10, graphIDs: ["843", "844", "845", "854"] },
        { pageID: 2, subPage: 11, graphIDs: ["856", "859", "860", "889"] },
        { pageID: 2, subPage: 12, graphIDs: ["894"] },
        { pageID: 2, subPage: 13, graphIDs: ["870", "892", "896", "897"] },
        { pageID: 2, subPage: 14, graphIDs: ["898", "899", "922", "939"] },
        { pageID: 2, subPage: 15, graphIDs: ["921"] },
        { pageID: 2, subPage: 16, graphIDs: ["940", "941", "942"] },
        { pageID: 2, subPage: 17, graphIDs: ["948", "949", "950", "951"] },
        { pageID: 2, subPage: 18, graphIDs: ["942", "943"] },
    ]
    const result = graphList.filter((flt) => flt.pageID === pageID && flt.subPage === subPageID)[0];
    if (result) {
        return result.graphIDs;
    }
    return null;
}