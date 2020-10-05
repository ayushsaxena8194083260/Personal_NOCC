import {
    GET_GAUGE_REPORT_RESPONSE,
    GET_GRAPH_ANALYTICS,
    CLEAR_GRAPH_RESPONSE
} from './types'
import service from "../services/allGraphServices";
import commonfunction from "../utility/commonFunctions.js";
import commonGraph from "../utility/commonGraph";

function InverterGenerationBarSeries1(realData, graphID, color) {
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
            //else{
            yValue.push(parseFloat(item["data" + index] === "" ? 0 : item["data" + index]));
            const _date = xValue.filter(im => im === getMonthYear(item["month" + index], item["year" + index]))[0];
            if (!_date) {
                xValue.push(getMonthYear(item["month" + index], item["year" + index]));
            }
            //}


        })
        if (!name[index]) {
            name.push("");
        }
        result.push({ name: name[index], data: yValue, color: color[index] })
    })

    return { ySeries: result, xSeries: xValue };
}

function InverterGenerationBarSeries(realData, graphID, color) {
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
            //else{
            yValue.push(parseFloat(item["data" + index] === "" ? 0 : item["data" + index]));
            const _date = xValue.filter(im => im === item["date" + index])[0];
            if (!_date) {
                xValue.push(item["date" + index]);
            }
            //}

        })
        if (!name[index]) {
            name.push("");
        }
        if (graphID === "225") {
            console.log("there it goes", data)

            if (name[index] === "Actual PLF on PPA Capacity") {
                result.push({ name: name[index] ? name[index] : "", type: name[index] === "Actual PLF on PPA Capacity" ? "spline" : "column", yAxis: 1, data: yValue, tooltip: { valueSuffix: ' %' }, color: color[index] });

            }
            else {
                result.push({ name: name[index] ? name[index] : "", type: name[index] === "Actual PLF on PPA Capacity" ? "spline" : "column", data: yValue, tooltip: { valueSuffix: ' kWh' }, color: color[index] });
            }
        }
        else {
            result.push({ name: name[index] ? name[index] : "", data: yValue, color: color[index] });

        }
    })

    return { ySeries: result, xSeries: xValue.map((im) => { return commonfunction.dateFormat(im, "dm") }) };
}

function checkIndex(arrObj, value) {

    const elem = (element) => element === value;
    return arrObj.findIndex(elem)
}

function InverterGenerationLineSeries(realData, graphID, color) {
    let xValue = [];
    let name = [];
    let result = [];

    const time = ["00:00", "00:15", "00:30", "00:45", "01:00", "01:15", "01:30", "01:45", "02:00", "02:15", "02:30", "02:45", "03:00", "03:15", "03:30", "03:45", "04:00", "04:15", "04:30", "04:45", "05:00", "05:15", "05:30", "05:45", "06:00", "06:15", "06:30", "06:45", "07:00", "07:15", "07:30", "07:45", "08:00", "08:15", "08:30", "08:45", "09:00", "09:15", "09:30", "09:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45", "12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30", "14:45", "15:00", "15:15", "15:30", "15:45", "16:00", "16:15", "16:30", "16:45", "17:00", "17:15", "17:30", "17:45", "18:00", "18:15", "18:30", "18:45", "19:00", "19:15", "19:30", "19:45", "20:00", "20:15", "20:30", "20:45", "21:00", "21:15", "21:30", "21:45", "22:00", "22:15", "22:30", "22:45", "23:00", "23:15", "23:30", "23:45"];

    realData && realData.map((data, index) => {
        let timeResult = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        data && data.map((item, _index) => {
            let yValue = [];

            const _name = name.filter((im => im === item["individual_name" + index]))[0];
            if (!_name) {
                name.push(item["individual_name" + index]);
            }
            const iex = checkIndex(time, item["time" + index].substring(0, 5));
            if (iex !== -1) {
                timeResult[iex] = parseFloat(item["data" + index]);
            }

        })
        result.push({ name: name[index], data: timeResult, color: color[index] })
    })

    return { ySeries: result, xSeries: time };
}


function graphFormat1(data, graphID) {
    const mockResult = [];
    const res = JSON.parse(data && data.result);
    let color = data.colorCode.split(',');
    const series = InverterGenerationLineSeries(res && res[0].length > 0 ? res : mockResult && mockResult, graphID, color);
    const _result = {
        title: {
            text: "Date from: " + commonfunction.dateFormat(data.fromDate.substring(0, 10), "dtINR") + " to: " + commonfunction.dateFormat(data.toDate.substring(0, 10), "dtINR")//getDate(data.toDate)
        },
        series: series.ySeries,
        plotOptions: {
            spline: {
                lineWidth: 4,
                states: {
                    hover: {
                        lineWidth: 5
                    }
                },
                marker: {
                    enabled: false
                },
                pointInterval: 720000
            }
        },
        xAxis: {
            type: 'datetime',
            labels: {
                overflow: 'justify',

            }
        },
        yAxis: [{
            title: { text: `${data.y1Title}(${data.y1Unit})`, style: { color: data.y1BaseColor, fontWeight: "bold" } },
            labels: {
                style: { color: data.y1BaseColor },
                formatter: function () {
                    return this.value;
                }
            },
        },
        {
            title: { text: `${data.y21Title}(${data.y21Unit})`, style: { color: data.y21BaseColor, fontWeight: "bold" } },
            labels: {
                style: { color: data.y21BaseColor },
                formatter: function () {
                    return this.value;
                }
            },
            opposite: true,
        }],
    }
    return _result;
}

function getMonthYear(month, year) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const _month = month && monthNames[parseInt(month) - 1].substring(0, 3);
    const _year = year && year.substring(2, 4);



    return _month + " " + _year;
}

function graphFormat(data, graphID) {
    const mockResult = [];
    const res = JSON.parse(data && data.result);
    let color = data.colorCode.split(',');

    let series = [];
    let _result = {};
    // console.log(color);
    if (graphID === "838") {
        series = InverterGenerationBarSeries1(res && res[0].length > 0 ? res : mockResult && mockResult, graphID, color);
    } else {
        series = InverterGenerationBarSeries(res && res[0].length > 0 ? res : mockResult && mockResult, graphID, color);
    }


    if (graphID === "225") {
        _result = {
            title: {
                text: "Date from: " + commonfunction.dateFormat(data.fromDate.substring(0, 10), "dtINR") + " to: " + commonfunction.dateFormat(data.toDate.substring(0, 10), "dtINR")//getDate(data.toDate)
            },
            xAxis: {

                categories: graphID === "225" ? (series.xSeries && series.xSeries.length > 0 ? series.xSeries : ["Net generation", "Budget generation", "Actual PLF on PPA Capacity"]) : series.xSeries
            },
            legend: {
                borderWidth: 1,
                borderRadius: 5,
                padding: 15,
            },
            yAxis: [{
                title: { text: `${data.y1Title}(${data.y1Unit})`, style: { color: data.y1BaseColor, fontWeight: "bold" } },
                labels: {
                    style: { color: data.y1BaseColor },
                    formatter: function () {
                        return this.value;
                    }
                },
            },

            {
                title: { text: `${data.y21Title}(${data.y21Unit})`, style: { color: data.y21BaseColor, fontWeight: "bold" } },
                labels: {
                    style: { color: data.y21BaseColor },
                    formatter: function () {
                        return this.value;
                    }
                },
                opposite: true,
            }],
            series: series.ySeries
        }
    }
    else {
        _result = {
            title: {
                text: "Date from: " + commonfunction.dateFormat(data.fromDate.substring(0, 10), "dtINR") + " to: " + commonfunction.dateFormat(data.toDate.substring(0, 10), "dtINR")//getDate(data.toDate)
            },
            xAxis: {

                categories: graphID === "225" ? (series.xSeries && series.xSeries.length > 0 ? series.xSeries : ["Net generation", "Budget generation", "Actual PLF on PPA Capacity"]) : series.xSeries
            },
            yAxis: {
                title: { text: "Generation(kWh)", style: { color: data.y1BaseColor, fontWeight: "bold" } },
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

function categories(_date) {
    // return _date.getTime();
    let _todaydate = new Date();
    let currentDate = _todaydate.getDate();
    let currentMonth = _todaydate.getMonth() + 1;
    let currentYear = _todaydate.getFullYear();
    let _currtDate = currentYear + "-" + currentMonth + "-" + currentDate;
    let currentHour = "00:00";
    if (_currtDate === _date) {
        currentHour = _todaydate.getHours() + ":00";
    } else {
        return "24";
    }
    //let xAxis = getXAxis(currentHour);
    return currentHour;
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
                            type: GET_GRAPH_ANALYTICS,
                            payload: { "graphNo": "gaugeGraphs" + index, "categoriesNo": "categories" + index, "canvas": data.graphId,"apiResponseNo":"apiResponse"+index, categories: [], response: resp, apiResponse:response.data }
                        })
                    })
                })
            }
        }
    }
}



function graphPageList(pageID, subPageID) {
    const graphList = [
        { pageID: 1, subPage: 1, graphIDs: ["305", "274", "225", "838"] }
    ]
    const result = graphList.filter((flt) => flt.pageID === pageID && flt.subPage === subPageID)[0];
    if (result) {
        return result.graphIDs;
    }
    return null;
}