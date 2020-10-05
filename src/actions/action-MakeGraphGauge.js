import {
    GET_GAUGE_REPORT_RESPONSE,
    CLEAR_GRAPH_RESPONSE
} from './types'
import service from "../services/allGraphServices";
// import {graphPageList}  from "./Mockdata/GraphIDList";
import {compareMakeGraphfgauge} from "./action-compareModelmakeGraphfgauge";

function plotBands(data){
    let plotBands =[{
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
    const _date = cDate.split('T');
    const today = new Date(_date[0]);
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
   return dd + "-" + mm + "-" +  yyyy;
}

function graphFormat(data){
    let result = {};
    result["id"] = "GraphGauge"+data.graphId;
    result["title"] = "Date from: "+getDate(data.fromDate)+" to: "+getDate(data.toDate);
    result["subtitleShow"] = false;
    result["legend"] = false;
    result["showDevReport"] = false;
    result["showCompare"] = false;
    result["showFilter"] = true;
    result["plantsShow"] = true;
    result["statisticsShow"] = true;
    result["statisticsText"] = "Grid statistics";
    
    result["tooltipValueSuffix"] = " MU";
    result["plotBands"] = plotBands(data);
    result["min"] = data.meterMin;
    result["max"] = data.meterMax;
    result["yTitle"] = data.meterTitle;
    result["yAxis"] = {}; 
    result["series"] = data.seriesMap;
    return result;
}


export function getMakeGraphGauge(data) {
    let defaultprops = {
        "canvas": "id",
        "dataFlag": 0,
        "externalDate": "string",
        "externalParam": 0,
        "externalPlant": [
            "string"
        ],
        "fromDate": "string",
        "graphId": 0,
        "plant": [
            6, 8
        ],
        "toDate": "string"
    }       
   
    return (dispatch) => {
        dispatch({
            type: CLEAR_GRAPH_RESPONSE
           
        })
        if (data.pageID && data.subPageID) {
            const graphIDs = graphPageList(data.pageID, data.subPageID);
            if(graphIDs){
                graphIDs && graphIDs.length > 0 && graphIDs.map((item, index) => {
                    service.makeGraphrevfgauge({ ...defaultprops, graphId: item }).then(response => {
                        dispatch(compareMakeGraphfgauge({ ...data, graphId: item }, [], "makeGraphrevfgauge"));
                        dispatch({
                            type: GET_GAUGE_REPORT_RESPONSE,
                            payload: { "graphNo": "gaugeGraphs" + index, "canvas": data.graphId, response: graphFormat(response.data) }
                        })
                    })
    
                })
            }
            
        }
    }
}

function graphPageList(pageID, subPageID) {
    const graphList = [
        { pageID: 1, subPage: 1, graphIDs: ["984", "985", "986", "987"] },
        { pageID: 1, subPage: 2, graphIDs: ["995", "996", "997", "998"] },
        { pageID: 1, subPage: 3, graphIDs: ["988", "989", "990", "991"] },

        { pageID: 1, subPage: 4, graphIDs: ["992", "993", "999"] },
        { pageID: 1, subPage: 5, graphIDs: ["980", "979", "978", "994"] },
        { pageID: 1, subPage: 6, graphIDs: ["966", "967", "968", "969"] },
        { pageID: 1, subPage: 7, graphIDs: ["970", "971", "972", "973"] },

        { pageID: 2, subPage: 1, graphIDs: ["973", "984", "987", "991"] },
        { pageID: 2, subPage: 1, graphIDs: ["973", "984", "987", "991"] },
        { pageID: 2, subPage: 1, graphIDs: ["973", "984", "987", "991"] },
        { pageID: 2, subPage: 1, graphIDs: ["973", "984", "987", "991"] },
        { pageID: 2, subPage: 1, graphIDs: ["973", "984", "987", "991"] },
        { pageID: 2, subPage: 1, graphIDs: ["973", "984", "987", "991"] },
        { pageID: 2, subPage: 1, graphIDs: ["973", "984", "987", "991"] },
        { pageID: 2, subPage: 1, graphIDs: ["973", "984", "987", "991"] },
        { pageID: 2, subPage: 1, graphIDs: ["973", "984", "987", "991"] },
        { pageID: 2, subPage: 1, graphIDs: ["973", "984", "987", "991"] },
        { pageID: 2, subPage: 1, graphIDs: ["973", "984", "987", "991"] },

    ]
    const result = graphList.filter((flt) => flt.pageID == pageID && flt.subPage == subPageID)[0];
    if (result) {
        return result.graphIDs;
    }
    return null;
}
