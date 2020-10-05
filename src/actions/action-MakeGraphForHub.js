import {
    GET_GAUGE_REPORT_RESPONSE,
    CLEAR_GRAPH_RESPONSE
} from './types'
import service from "../services/allGraphServices";
// import {graphPageList}  from "./Mockdata/GraphIDList";

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

function resultData(data) {
    let netGeneration = [];
    let budgetGeneration = [];
    let seriesData = [];

    const series = JSON.parse(data.result);

    if (series && series.length > 0) {
        const dataSet = series;

        series.forEach((arr => {
            let val = 0;
            arr.forEach(item => {
                val = parseFloat(parseFloat(item.data).toFixed(2));
            })

            seriesData.push(val);
        }))


        netGeneration = dataSet && dataSet.length > 0 && (dataSet[0]).map((item) => { return parseFloat(item.data0) });
        budgetGeneration = dataSet && dataSet.length > 1 && (dataSet[1]).map((item) => { return parseFloat(item.data1) });
    }

    return [{ name: "Net Generation", data: netGeneration }, { name: "Budget Generation", data: budgetGeneration }];
}

function resultDataForStacked(data) {
    let categories = [];
    let seriesData = [];
    let result = [];
    let names = [];
    const series = JSON.parse(data.result);
    const countList = []
    series && series.map((dateItem, index) => {
        countList.push(dateItem.length);
        dateItem && dateItem.map((item) => {
            const _categories = categories.filter((im => im === item["individual_name" + index]))[0];
            if (!_categories) {
                categories.push(item["individual_name" + index]);
            }

            const _name = names.filter((im => im === item["hub_name" + index]))[0];
            if (!_name) {
                names.push(item["hub_name" + index]);
            }

        })
    });

    names && names.map((item) => {
        let name = item;
        let data = [];

        series && series.map((dateItem, index) => {
            const res = dateItem && dateItem.filter(flt => flt["hub_name" + index] == item)[0];
            if (res) {
                data.push(parseFloat(res["data" + index] === "" ? 0 : res["data" + index]))
            }
            else {
                data.push(0);
            }

        })

        result.push({name: item, data: data});
    })
    return { categories: categories, series: result }
}


function graphFormat(data) {
    const _data = resultDataForStacked(data);
    let result = {};
    result["id"] = "Graph" + data.graphId;
    result["title"] = "Date from: " + getDate(data.fromDate) + " to: " + getDate(data.toDate);
    result["yTitle"] = data.y1Title + " " + data.y1Unit;
    result["yAxis"] = {};
    result["series"] = _data.series;
    result["categories"] = _data.categories
    result["stackLabels"]={
        enabled: true,
        useHTML: true,
        y: -15,
        style: {
            color: 'gray',
            position: 'absolute'
        },
            formatter: function () {
                var sx= this.x;
                var str ='';
                var revenueInUSD;
                if(sx === 0)
                {
                  var allSeries = data.series;
                  var totalAmount = 0;
                  for(var s in allSeries) {
                      totalAmount += allSeries[s].userOptions.data[sx].revenue;
                  }
                  revenueInUSD = (totalAmount/1000000) / (data.doller);
                  str+="<font color='blue'>Revenue(in Mn):</font><font color='black'>"+(totalAmount/1000000).toFixed(2)+" INR / "+revenueInUSD.toFixed(2) +" USD</font><br />";
                }
                
                  return str;
              }

    

    }
    // result["resultData"] =  resultData(data);
    return result;
}

function pieChatSeries(data) {
    let result = []

    data.map((item) => {
        return result.push([item.name, parseInt(item.y)])
    })
    return result;
}

function graphFormatForPie(data) {
    const mockResult = [];
    const res = JSON.parse(data && data.result);
    const series = pieChatSeries(res && res.length > 0 ? res[0] : []);
    const _result = {
        title: {
            text: "Date from: " + getDate(data.fromDate) + " to: " + getDate(data.toDate)
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: series
        }]
    }
    return _result;
}



export function getMakeGraph(data, chart = 1) {

    let defaultprops = {
        //"allPlants": 1,
        //"canvas": "id",
        "dataFlag": 0,
        // "externalDate": "2020-03-01",
        // "externalParam": 1,
        // "externalPlant": [],
        // "fromDate": "",
        "graphId": 0,
        // "plant": [],
        // "toDate": ""
    }


    return (dispatch) => {
        dispatch({
            type: CLEAR_GRAPH_RESPONSE

        })
        if (data.pageID && data.subPageID) {
            const graphIDs = graphPageList(data.pageID, data.subPageID);
            if (graphIDs) {
                graphIDs && graphIDs.length > 0 && graphIDs.map((item, index) => {
                    // externalDate:getCurrentDate(),fromDate:getCurrentDate()
                    service.makeGraph({ ...defaultprops, graphId: item }).then(response => {
                        if (item === "960") {
                            dispatch({
                                type: GET_GAUGE_REPORT_RESPONSE,
                                payload: { "graphNo": "gaugeGraphs" + index, "canvas": data.graphId, response: graphFormatForPie(response.data) }
                            })
                        }
                        else {
                            dispatch({
                                type: GET_GAUGE_REPORT_RESPONSE,
                                payload: { "graphNo": "gaugeGraphs" + index, "canvas": data.graphId, response: graphFormat(response.data) }
                            })
                        }

                    })

                })
            }

        }
    }
}


function getCurrentDate() {
    var today = new Date();
    var d = today.getDate();
    var m = today.getMonth() + 1;
    var y = today.getFullYear();
    var data;

    if (d < 10) {
        d = "0" + d;
    };
    if (m < 10) {
        m = "0" + m;
    };

    data = y + "-" + m + "-" + d;
    return data;
}
function graphPageList(pageID, subPageID) {
    const graphList = [
        { pageID: 1, subPage: 1, graphIDs: ["952", "953", "954", "955"] },
        { pageID: 1, subPage: 2, graphIDs: ["960"] },

    ]
    const result = graphList.filter((flt) => flt.pageID === pageID && flt.subPage === subPageID)[0];
    if (result) {
        return result.graphIDs;
    }
    return null;
}