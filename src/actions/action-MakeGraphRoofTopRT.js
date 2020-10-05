import {
    GET_GRAPH_ROOFTOP_RoofTop,
    CLEAR_GRAPH_RESPONSE
} from './types'
import service from "../services/allGraphServices";
import commonfunction from "../utility/commonFunctions.js";
import moment from 'moment';
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

function InverterGenerationBarSeries(realData,color) {
    let xValue = [];
    let name = [];
    let result = [];
    realData && realData.map((data, index) => {
        data && data.map((item) => {
            let yValue = [];
            const _name = name.filter((im => im === item["individual_name" + index]))[0];
            if (!_name) {
                name.push(item["individual_name" + index]);

                const filterData = data.filter((flt) => flt["individual_name" + index] === item["individual_name" + index]);
                filterData.forEach((itm) => {
                    yValue.push(parseFloat(itm["data" + index]));
                    const _date = xValue.filter((im => im === itm["data" + index]))[0];
                    if (!_date) {
                        xValue.push(commonfunction.dateFormat(itm["date" + index], "dm"));
                    }
                console.log("xValue check",_date)

                });
                result.push({ name: item["individual_name" + index], data: yValue,color: color[index] })
            }
        })
    })
    return { ySeries: result, xSeries: xValue };
}

function graphFormat1(data, graphID) {
    const mockResult = getMockData(graphID);
    const res = JSON.parse(data && data.result);
    let color=data.colorCode.split(',');
    const series = InverterGenerationBarSeries(res && res[0].length > 0 && res[0][0]["individual0"] ? res : mockResult && mockResult,color);
    const _result = {
        title: {
            text: "Date from: " + commonfunction.dateFormat(data.fromDate.substring(0,10),"dtINR") + " to: " + commonfunction.dateFormat(data.toDate.substring(0,10),"dtINR")//getDate(data.toDate)
        },
        xAxis: {
            categories:series.xSeries,
            tickInterval: 4
            // type: 'datetime',
            // dateTimeLabelFormats: {
            //     day: data.pointValue      //ex- 01 Jan
            //  },
            // labels: {
            //     overflow: 'justify',
            // },
        },
        yAxis:{
            title: { text: `${data.y1Title}(${data.y1Unit === "Blank"?"":data.y1Unit})`, style: { color: data.y1BaseColor,fontWeight:"bold" }},
            labels: {
                style: { color: data.y1BaseColor },
                formatter: function () {
                    return this.value;
                }
            },
        },
        legend:{
            borderWidth: 1,
            borderRadius:5,
            padding:15,
        },
        series: series.ySeries
    }
    return _result;
}

function getMockData(graphID) {
    const arrayResp = [];
        arrayResp[graphID] = 
            [
                    [
                        {
                            "individual0": "",
                            "individual_name0": "",
                            "data0": "0",
                            "date0": "0"
                        }
                    ]
            ]
    return arrayResp[graphID];
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

export function getMakeGraphGauge(data) {
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
                            type: GET_GRAPH_ROOFTOP_RoofTop,
                            payload: { "graphNo": "gaugeGraphs" + index, "categoriesNo": "categories" + index, "canvas": item, response: resp,"apiResponseNo":"apiResponse"+index, apiResponse:response.data }//}//graphFormat1(response.data,item)
                        })
                    })
                })
            }
        }
    }
}

function graphPageList(pageID, subPageID) {
    const graphList = [
        { pageID: 1, subPage: 1, graphIDs: ["861", "740", "685"] },
        { pageID: 1, subPage: 2, graphIDs: ["737", "735", "738"] },
        { pageID: 1, subPage: 3, graphIDs: ["771", "772", "673"] },
        { pageID: 1, subPage: 4, graphIDs: ["681", "682", "684"] },
        { pageID: 1, subPage: 5, graphIDs: ["751", "734", "683"] },
        { pageID: 1, subPage: 6, graphIDs: ["741", "773", "774", "775"] },
        { pageID: 1, subPage: 7, graphIDs: ["776", "777", "778", "779"] },
        { pageID: 1, subPage: 8, graphIDs: ["780", "781", "686"] },
        { pageID: 1, subPage: 9, graphIDs: ["841", "868", "837", "842"] },
        { pageID: 1, subPage: 10, graphIDs: ["843", "844", "845", "854"] },
        { pageID: 1, subPage: 11, graphIDs: ["856", "859", "860", "889"] },
        { pageID: 1, subPage: 12, graphIDs: ["894"] },
        { pageID: 1, subPage: 13, graphIDs: ["870", "892", "896", "897"] },
        { pageID: 1, subPage: 14, graphIDs: ["898", "899", "922", "939"] },
        { pageID: 1, subPage: 15, graphIDs: ["921"] },
        { pageID: 1, subPage: 16, graphIDs: ["940", "941", "942"] },
        { pageID: 1, subPage: 17, graphIDs: ["948", "949", "950", "951"] },
        { pageID: 1, subPage: 18, graphIDs: ["942", "943"] },
    ]
    const result = graphList.filter((flt) => flt.pageID === pageID && flt.subPage === subPageID)[0];
    if (result) {
        return result.graphIDs;
    }
    return null;
}