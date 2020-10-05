import {
    GET_GAUGE_REPORT_RESPONSE,
    GET_GRAPH_ANALYTICS,
    CLEAR_GRAPH_RESPONSE
} from './types'
import service from "../services/allGraphServices";
import commonfunction from "../utility/commonFunctions.js";
import commonGraph from "../utility/commonGraph";


function graphFormatForPie(data, graphID) {
    const mockResult = [];
    const res = JSON.parse(data && data.result);
    const series = pieChatSeries(res && res.length > 0 ? res[0] : []);
    const _result = {
        title: {
            text: "Date from: " + getDate(data.fromDate) + " to: " + getDate(data.toDate)
        },
        yAxis: {
            title: {
                text: `${data.y1Title}(${data.y1Unit === "blank" ? '' : data.y1Unit})`
            }
        },

        series: [{
            name: data.y1_title,
            colorByPoint: true,
            data: series
        }],
        tooltip: {
            pointFormat: `<b>{series.name} : <b>{point.y:.f}</b> </b> <br/> <br/>
                          <span style="color:{point.color}">Module cleaning analysis</span>: <b>{point.mca:.f}</b><br/>
                          <span style="color:{point.color}">Partial Plantdown</span>: <b>{point.ppd:.f}</b><br/>
                          <span style="color:{point.color}">Complete Plantdown</span>: <b>{point.cpd:.f}</b><br/>`,
        },

    }
    return _result;
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

function getSeries(realData) {
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
                    //yValue.push(parseFloat(itm["data" + index]));
                    yValue.push(parseFloat(itm["data" + index]));
                    const _date = xValue.filter((im => im === itm["data" + index]))[0];
                    if (!_date) {
                        xValue.push(itm["data" + index]);
                    }
                });
                result.push({ name: item["individual_name" + index], data: yValue })
                console.log("result", result)
            }
            // const _data = filterData.forEach((itm) => yValue.push(parseFloat(item.data0)));

        })
    })

    return { ySeries: result, xSeries: name };
}

function getSeriesTodayBar(realData) {
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
                    // yValue = { y: parseFloat(itm["data" + index]) };
                    yValue.push(parseFloat(itm["data" + index]))
                    const _date = xValue.filter((im => im === itm["date" + index]))[0];
                    if (!_date) {
                        xValue.push(itm["date" + index]);
                    }
                });
                result.push({ name: item["individual_name" + index], data: yValue, color: "#3BF502" })
            }
        })
    })
    return { ySeries: result, xSeries: xValue.map((im) => { return commonfunction.dateFormat(im, "dm") }) };
}

function getSeriesTodayMonthBar(realData) {
    let xValue = [];
    let name = [];
    let result = [];
    realData && realData.map((data, index) => {
        let yValue = [];
        data && data.map((item) => {

            const _name = name.filter((im => im === item["individual_name" + index]))[0];
            if (!_name) {
                name.push(item["individual_name" + index]);
            }

            yValue.push(parseFloat(item["data" + index]));
        });
        result.push({ name: name[index], data: yValue, color: "#5499C7" })
    })

    return { ySeries: result, xSeries: name };
}

function xAxisTitle(graphID, fromDate, toDate) {
    let text = "";
    if (graphID === "925") {
        text = commonfunction.dateFormat(fromDate, "dm")
    }
    else if (graphID === "926") {
        text = commonfunction.dateFormat(fromDate, "my");
    }
    else if (graphID === "927") {
        text = commonfunction.dateFormat(fromDate, "dm") + " - " + commonfunction.dateFormat(toDate, "dm");
    }
    else {
        text = commonfunction.dateFormat(fromDate, "year");
    }

    return [text];
}

function graphFormat1(data, graphID) {
    const mockResult = [];
    const res = JSON.parse(data && data.result);
    let color = data.colorCode.split(',');
    let series = []
    if (graphID === 930) {
        series = getSeries(res && res.length > 0 ? res : []);
        console.log(series)
    }
    else if (graphID === "201") {
        series = getSeriesTodayBar(res && res.length > 0 ? res : []);
        console.log(series)
    }
    else if (graphID === "925" || graphID === "926" || graphID === "927" || graphID === "928") {
        series = getSeriesTodayMonthBar(res && res.length > 0 ? res : [], graphID);

    }
    else {
        series = getSeries(res && res[0] && res[0].length > 0 ? res : mockResult && mockResult);
    }

    let _result = {}
    if (graphID === "201") {
        _result = {
            title: {
                text: "Date from: " + getDate(data.fromDate) + " to: " + getDate(data.toDate)
            },
            xAxis: {

                categories: series.xSeries
            },
            yAxis: {
                title: {
                    text: `${data.y1Title}(${data.y1Unit})`,
                    style: {
                        color: data.y1BaseColor,
                        fontWeight: "bold"
                    }
                },
                labels: {
                    style: {
                        color: data.y1BaseColor
                    }
                },
                min: 0,
                max: 100
            },
            labels: {
                enabled: false
            },
            legend: {
                enabled: false
            },
            tooltip: {
                valueSuffix: data.y1Unit,
            },
            // plotOptions: {
            //     series: {
            //         pointWidth: 1
            //     }
            // },
            series: series.ySeries
        }
    }
    else if (graphID === "925" || graphID === "926" || graphID === "927" || graphID === "928") {
        _result = {
            title: {
                text: "Date from: " + getDate(data.fromDate) + " to: " + getDate(data.toDate)
            },
            xAxis: {

                categories: xAxisTitle(graphID, data.fromDate, data.toDate)
            },

            yAxis: {
                title: {
                    text: `${data.y1Title}()`,
                    style: {
                        color: data.y1BaseColor,
                        fontWeight: "bold"
                    }
                },
                labels: {
                    style: { color: data.y1BaseColor },
                    formatter: function () {
                        return this.value;
                    },
                }

            },
            legend: {
                enabled: true,
                borderWidth: 1,
                borderRadius: 5,
                padding: 15,
                fontSize: 10,
                width: 400

            },
            series: series.ySeries
        }
    }
    else if (graphID === "936") {
        _result = {
            title: {
                text: "Date from: " + getDate(data.fromDate) + " to: " + getDate(data.toDate)
            },
            xAxis: {

                categories: series.xSeries
            },
            yAxis: {
                title: { text: `${data.y1Title}(${data.y1Unit})`, style: { color: data.y1BaseColor, fontWeight: "bold" } },
                labels: {
                    style: { color: data.y1BaseColor },
                    formatter: function () {
                        return this.value;
                    }
                },

            },
            series: series.ySeries,
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: false
                    }
                }
            }
        }
    }

    else {
        _result = {
            title: {
                text: "Date from: " + getDate(data.fromDate) + " to: " + getDate(data.toDate)
            },
            xAxis: {

                categories: series.xSeries
            },
            yAxis: {
                title: { text: `${data.y1Title}(${data.y1Unit})`, style: { color: data.y1BaseColor, fontWeight: "bold" } },
                labels: {
                    style: { color: data.y1BaseColor },
                    formatter: function () {
                        return this.value;
                    }
                },
            },
            series: series.ySeries
        }
    }
    return _result;
}


function pieChatSeries(data) {
    let result = []

    result = data.map((item) => {
        return { name: item.name, y: parseInt(item.y) }
    })
    return result;
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
        service.makeGraph(data).then(response => {
            const resp = commonGraph.commonGraph(response.data, '', '', '', '');
            const data = doFormat(resp);
            dispatch({
                type: GET_GRAPH_ANALYTICS,
                payload: { "graphNo": "gaugeGraphs0", "categoriesNo": "categories0", "canvas": data.graphId, categories: [], response: data, apiResponse: response.data }
            })
        })
    }
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
                payload: { "graphNo": "gaugeGraphs0", "canvas": data.graphId, "apiResponseNo": "apiResponse0", response: data, apiResponse: response.data }//graphFormat1(response.data, item) }
            })
        })
    }
}

export function getMakeGraphRoofTop(data) {

    // let defaultprops = {
    //     "allPlants": 1,
    //     "canvas": "",
    //     "dataFlag": 0,
    //      "externalDate": todayDate(),
    //    // "externalDate": "2020-03-20",
    //     "externalParam": 1,
    //     "externalPlant": [],
    //     "fromDate": "",
    //     "graphId": 0,
    //     "plant": [],
    //     "toDate": ""
    // }


    return (dispatch) => {
        dispatch({
            type: CLEAR_GRAPH_RESPONSE

        })
        service.makeGraph(data).then(response => {
            if (data.graphId === "960") {
                dispatch({
                    type: GET_GAUGE_REPORT_RESPONSE,
                    payload: { "graphNo": "graphs0", "canvas": data.graphId, response: graphFormatForPie(response.data, data.graphId), "apiResponseNo": "apiResponse0", apiResponse: response.data }
                })
            }
            else {
                dispatch({
                    type: GET_GAUGE_REPORT_RESPONSE,
                    payload: { "graphNo": "graphs0", "canvas": data.graphId, response: graphFormat1(response.data, data.graphId), "apiResponseNo": "apiResponse0", apiResponse: response.data }
                })
            }

        })


    }
}
