import {
    GET_GAUGE_MONTHLY_REPORT_RESPONSE,
    CLEAR_GRAPH_RESPONSE


} from './types'
import service from "../services/allGraphServices";
import { getPlantByProjectId } from "../actions/PlantFaultDataActions";
import {compareMakeGraphfgauge} from "./action-compareModelmakeGraphfgauge";

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
    return dd + "-" + mm + "-" + yyyy;
}
function findMaxNum(seriesMap) {
    let bigNum = 0;
    seriesMap && seriesMap.length > 0 && seriesMap.forEach((item) => {
        bigNum = Math.max(bigNum, parseFloat(item.data));
    })
    return bigNum;
}
function graphFormatForMonth(monthText, data, series, plotBands) {
    let result = {};
    result["id"] = "GraphGauge" + data.graphId;
    result["title"] = monthText;
    result["subtitleShow"] = true;
    result["legend"] = true;
    result["showDevReport"] = false;
    result["showCompare"] = false;
    result["showFilter"] = false;
    result["plantsShow"] = false;
    result["statisticsShow"] = false;
    result["statisticsText"] = "Grid statistics";

    result["tooltipValueSuffix"] = " MU";
    result["plotBands"] = plotBandsFormat(plotBands);
    result["min"] = data.meterMin ? data.meterMin : 0;
    result["max"] = data.meterMax ? data.meterMax : findMaxNum(series);
    result["yTitle"] = data.y1Title;
    result["y1Unit"] = data.y1Unit;
    result["yAxis"] = {};
    result["series"] = series;
    return result;
}

function plotBandsFormat(data){
    let plots =[];
    data && data.length > 0 && data.map((item,index)=> {
    //    if(index >= 2){
        plots.push({...item, from: parseFloat(item.from).toFixed(2), to: parseFloat(item.to).toFixed(2) })
    //    }
    })

    return plots; 
}

function graphFormat(data) {
    let result = {};
    result["id"] = "GraphGauge" + data.graphId;
    result["graphId"] = data.graphId;
    result["title"] = "Date from: " + getDate(data.fromDate) + " to: " + getDate(data.toDate);
    result["subtitleShow"] = true;
    result["legend"] = true;
    result["showDevReport"] = true;
    result["showCompare"] = true;
    result["showFilter"] = true;
    result["plantsShow"] = true;
    result["statisticsShow"] = true;
    result["statisticsText"] = "Grid statistics";

    result["tooltipValueSuffix"] = " MU";
    result["plotBands"] = plotBandsFormat(data.plotBands);
    result["min"] = data.meterMin ? data.meterMin : 0;
    result["max"] = data.meterMax ? data.meterMax : findMaxNum(data.seriesMap);
    result["yTitle"] = data.meterTitle;
    result["yAxis"] = {};
    result["series"] = data.seriesMap;



    // return { result: result, month:monthlygraph(data) };

    return result;
}

function getMonth(month) {
    const months = [{ displayText: "April", value: "4" }, { displayText: "May", value: "5" }, { displayText: "June", value: "6" }, { displayText: "July", value: "7" }, { displayText: "August", value: "8" }, { displayText: "September", value: "9" }, { displayText: "October", value: "10" },
    { displayText: "November", value: "11" }, { displayText: "December", value: "12" }, { displayText: "January", value: "1" }, { displayText: "February", value: "2" }, { displayText: "March", value: "3" }];

    const _month = months.filter((flt) => flt.value === month)[0];
    if (_month) {
        return _month.displayText;
    }
    return null;
}

// function monthlygraph(data) {
//     if (data && data.monthlySeriesList.length > 0) {
//         // var arr = [];
//         // Object.keys(data.monthlySeriesList[0]).forEach(function (key) {
//         //     arr.push({ monthNo: key, month: getMonth(key), series: data.monthlySeriesList[0][key], plotBands: data.monthlyPlotBandsList[0][key] });
//         // });

//        let grpahArray = [];
//         const arrSerise = arr.map((item) => {
//             return grpahArray.push({ graphNo: item.month, response: graphFormatForMonth(item, data, item.series, item.plotBands) });
//         })

//         return grpahArray;
//     }
//     return [];
// }

export function makeGraphfgauge(data, plant = []) {
    let defaultprops = {
        "allPlants": plant.length > 0 ? 1 : "",
        "canvas": "",
        "dataFlag": 0,
        "externalDate": "",
        "externalParam": "",
        "externalPlant": [],
        "fromDate": "",
        "graphId": "",
        "plant": plant,
        "toDate": ""
    }


    return (dispatch) => {
        if (data.graphId === "") {
        dispatch({
            type: CLEAR_GRAPH_RESPONSE

        })
    }

        // dispatch( getPlantByProjectId);
        if (data.pageID && data.subPageID) {
            const graphIDs = graphPageList(data.pageID, data.subPageID);
            if (graphIDs) {
                graphIDs && graphIDs.length > 0 && graphIDs.map((item, index) => {
                    if (data.graphId === "" || (data.graphId !==  "" && data.graphId === item)) {
                        service.makeGraphfgauge({ ...data, graphId: item }).then(response => {
                            dispatch(compareMakeGraphfgauge({ ...data, graphId: item }, [], "makeGraphfgauge"));
                            dispatch({
                                type: GET_GAUGE_MONTHLY_REPORT_RESPONSE,
                                payload: { "graphNo": "gaugeGraphs" + index, "canvas": data.graphId, response: graphFormat(response.data) }
                            })
                            let arr = [];
                            Object.keys(response.data.monthlySeriesList[0]).forEach(function (key) {
                                arr.push({ monthNo: key, month: getMonth(key), series: response.data.monthlySeriesList && response.data.monthlySeriesList.length > 0 && response.data.monthlySeriesList[0][key], plotBands: response.data.monthlyPlotBandsList && response.data.monthlyPlotBandsList.length > 0 && response.data.monthlyPlotBandsList[0][key] });
                            });

                            arr.map((item, subIndex) => {
                                //return grpahArray.push({ graphNo: item.month, response: graphFormatForMonth(item, data, item.series, item.plotBands) });
                                dispatch({
                                    type: GET_GAUGE_MONTHLY_REPORT_RESPONSE,
                                    payload: { "graphNo": "gaugeGraphs" + index + subIndex, "canvas": data.graphId, response: graphFormatForMonth(item.month, response.data, item.series, item.plotBands) }
                                })
                            })

                        })
                    }

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
    const result = graphList.filter((flt) => flt.pageID === pageID && flt.subPage === subPageID)[0];
    if (result) {
        return result.graphIDs;
    }
    return null;
}