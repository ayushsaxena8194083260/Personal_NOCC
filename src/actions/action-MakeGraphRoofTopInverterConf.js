import {
    GET_GRAPH_ROOFTOP_RT,
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
    const _date = new Date(cDate)
    let dd = _date.getDate();
    let mm = _date.getMonth() + 1;
    const yyyy = _date.getFullYear();
    // let dd = today;
    // let mm = today.getMonth() + 1;
 
    // const yyyy = today.getFullYear();
    if (dd < 10) {
        dd = "0" + dd;
    }
    if(mm <10){
        mm = "0" + mm;
    }
    // if (mm < 10) {
    //     mm = "0" + mm;
    // }
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

            const _name = name.filter((im => im===item["inverter" + index]))[0];
            if (!_name) {
                name.push(item["inverter" + index]);

                const filterData = data.filter((flt) => flt["individual" + index]===item["individual" + index]);
                filterData.forEach((itm) => {
                    yValue.push(parseFloat(itm["data" + index]));
                    const _date = xValue.filter((im => im===itm["data" + index]))[0];
                    if (!_date) {
                        xValue.push(itm["data" + index]);
                    }
                });
                result.push({ name: item["inverter" + index], data: yValue,color:color[index] })
            }
        
            // const _data = filterData.forEach((itm) => yValue.push(parseFloat(item.data0)));

        })
    })
    return { ySeries: result, xSeries: xValue };
}

// function getMockData(graphID) {
//     const arrayResp = [];
//     if (graphID==="225") {
//         arrayResp[graphID] =
//             [
//                 [
//                     {
//                         "individual_name0": "Net generation",
//                         "data0": "11185",
//                         "date0": "2020-03-01",
//                         "tariff0": "17.91"
//                     },
//                     {
//                         "individual_name0": "Net generation",
//                         "data0": "10620",
//                         "date0": "2020-03-02",
//                         "tariff0": "17.91"
//                     },
//                     {
//                         "individual_name0": "Net generation",
//                         "data0": "10852",
//                         "date0": "2020-03-03",
//                         "tariff0": "17.91"
//                     },
//                     {
//                         "individual_name0": "Net generation",
//                         "data0": "9013",
//                         "date0": "2020-03-04",
//                         "tariff0": "17.91"
//                     },
//                     {
//                         "individual_name0": "Net generation",
//                         "data0": "3220",
//                         "date0": "2020-03-05",
//                         "tariff0": "17.91"
//                     },
//                     {
//                         "individual_name0": "Net generation",
//                         "data0": "1883",
//                         "date0": "2020-03-06",
//                         "tariff0": "17.91"
//                     },
//                     {
//                         "individual_name0": "Net generation",
//                         "data0": "2420",
//                         "date0": "2020-03-07",
//                         "tariff0": "17.91"
//                     },
//                     {
//                         "individual_name0": "Net generation",
//                         "data0": "11240",
//                         "date0": "2020-03-08",
//                         "tariff0": "17.91"
//                     },
//                     {
//                         "individual_name0": "Net generation",
//                         "data0": "12782",
//                         "date0": "2020-03-09",
//                         "tariff0": "17.91"
//                     },
//                     {
//                         "individual_name0": "Net generation",
//                         "data0": "11804",
//                         "date0": "2020-03-10",
//                         "tariff0": "17.91"
//                     },
//                     {
//                         "individual_name0": "Net generation",
//                         "data0": "4391",
//                         "date0": "2020-03-11",
//                         "tariff0": "17.91"
//                     }
//                 ],
//                 [
//                     {
//                         "individual_name1": "Budget generation",
//                         "data1": "10462.266891290323",
//                         "date1": "2020-03-01"
//                     },
//                     {
//                         "individual_name1": "Budget generation",
//                         "data1": "10462.266891290323",
//                         "date1": "2020-03-02"
//                     },
//                     {
//                         "individual_name1": "Budget generation",
//                         "data1": "10462.266891290323",
//                         "date1": "2020-03-03"
//                     },
//                     {
//                         "individual_name1": "Budget generation",
//                         "data1": "10462.266891290323",
//                         "date1": "2020-03-04"
//                     },
//                     {
//                         "individual_name1": "Budget generation",
//                         "data1": "10462.266891290323",
//                         "date1": "2020-03-05"
//                     },
//                     {
//                         "individual_name1": "Budget generation",
//                         "data1": "10462.266891290323",
//                         "date1": "2020-03-06"
//                     },
//                     {
//                         "individual_name1": "Budget generation",
//                         "data1": "10462.266891290323",
//                         "date1": "2020-03-07"
//                     },
//                     {
//                         "individual_name1": "Budget generation",
//                         "data1": "10462.266891290323",
//                         "date1": "2020-03-08"
//                     },
//                     {
//                         "individual_name1": "Budget generation",
//                         "data1": "10462.266891290323",
//                         "date1": "2020-03-09"
//                     },
//                     {
//                         "individual_name1": "Budget generation",
//                         "data1": "10462.266891290323",
//                         "date1": "2020-03-10"
//                     },
//                     {
//                         "individual_name1": "Budget generation",
//                         "data1": "10462.266891290323",
//                         "date1": "2020-03-11"
//                     },
//                     {
//                         "individual_name1": "Budget generation",
//                         "data1": "10462.266891290323",
//                         "date1": "2020-03-12"
//                     }
//                 ],
//                 [
//                     {
//                         "individual_name2": "Actual PLF on PPA Capacity",
//                         "data2": "23.302083333333332",
//                         "date2": "2020-03-01"
//                     },
//                     {
//                         "individual_name2": "Actual PLF on PPA Capacity",
//                         "data2": "22.125",
//                         "date2": "2020-03-02"
//                     },
//                     {
//                         "individual_name2": "Actual PLF on PPA Capacity",
//                         "data2": "22.608333333333334",
//                         "date2": "2020-03-03"
//                     },
//                     {
//                         "individual_name2": "Actual PLF on PPA Capacity",
//                         "data2": "18.777083333333334",
//                         "date2": "2020-03-04"
//                     },
//                     {
//                         "individual_name2": "Actual PLF on PPA Capacity",
//                         "data2": "6.708333333333333",
//                         "date2": "2020-03-05"
//                     },
//                     {
//                         "individual_name2": "Actual PLF on PPA Capacity",
//                         "data2": "3.9229166666666666",
//                         "date2": "2020-03-06"
//                     },
//                     {
//                         "individual_name2": "Actual PLF on PPA Capacity",
//                         "data2": "5.041666666666667",
//                         "date2": "2020-03-07"
//                     },
//                     {
//                         "individual_name2": "Actual PLF on PPA Capacity",
//                         "data2": "23.416666666666668",
//                         "date2": "2020-03-08"
//                     },
//                     {
//                         "individual_name2": "Actual PLF on PPA Capacity",
//                         "data2": "26.629166666666666",
//                         "date2": "2020-03-09"
//                     },
//                     {
//                         "individual_name2": "Actual PLF on PPA Capacity",
//                         "data2": "24.591666666666665",
//                         "date2": "2020-03-10"
//                     },
//                     {
//                         "individual_name2": "Actual PLF on PPA Capacity",
//                         "data2": "9.147916666666667",
//                         "date2": "2020-03-11"
//                     }
//                 ]
//             ]
//     }
//     return arrayResp[graphID];
// }
function graphFormat1(data, graphID) {
    const mockResult = [];//getMockData();
    let color=data.colorCode.split(',');
    const res = JSON.parse(data && data.result);//mockResult.result;
    const series = InverterGenerationBarSeries(res && res[0].length > 0 ? res : mockResult && mockResult,color);
    const _result = {
        title: {
            text: "Date from: " + getDate(data.fromDate) + " to: " + getDate(data.toDate)
        },
        xAxis: {

            categories: series.xSeries
        },
        legend:{
            useHTML: true,
            borderWidth: 1,
            borderRadius:5,
            padding:15,
            // formatter: function () {
            //     var text='<b>'+data.plan
            // }
        },
        yAxis:{
            title: { text: `${data.y1Title}(${data.y1Unit})`, style: { color: data.y1BaseColor,fontWeight:"bold" }},
                labels: {
                    style: { color: data.y1BaseColor },
                    formatter: function () {
                        return this.value;
                    }
                },
        },
        series: series.ySeries
    }
    return _result;
}

function graphFormat(data) {
    let result = {};
    result["id"] = "GraphGauge" + data.graphId;
    result["title"] = "Date from: " + getDate(data.fromDate) + " to: " + getDate(data.toDate);
    result["subtitleShow"] = false;
    result["legend"] = false;
    result["showDevReport"] = false;
    result["showCompare"] = false;
    result["showFilter"] = true;
    result["plantsShow"] = true;
    result["statisticsShow"] = true;
    result["statisticsText"] = "Grid statistics";
    if (data.graphId===305 || data.graphId===225) {
        result["result"] = JSON.parse(data.result)[1];
    } else if (data.graphId===274) {
        result["result"] = JSON.parse(data.result)[2];
    }
    if (data.graphId===305 || data.graphId===225) {
        result["result1"] = JSON.parse(data.result)[0];
    } else if (data.graphId===274) {
        result["result1"] = JSON.parse(data.result)[1];
    }
    result["tooltipValueSuffix"] = " MU";
    result["plotBands"] = plotBands(data);
    result["min"] = data.meterMin;
    result["max"] = data.meterMax;
    result["yTitle"] = data.meterTitle;
    result["yAxis"] = {};
    result["series"] = data.seriesMap;
    return result;
}

function getXAxis(hour) {
    let _value = ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00",
        "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00",
        "21:00", "22:00", "23:00", "24:00"];
    let displayHour = [];
    let i = 0;
    for (i = 0; i < _value.length - 1; i++) {
        if (_value[i] !== hour) {
            displayHour.push(_value[i]);
        } else {
            i = _value.length - 1;
        }
    }
    return displayHour;
}
function categories(_date) {
    // return _date.getTime();
    let _todaydate = new Date();
    let currentDate = _todaydate.getDate();
    let currentMonth = _todaydate.getMonth() + 1;
    let currentYear = _todaydate.getFullYear();
    let _currtDate = currentYear + "-" + currentMonth + "-" + currentDate;
    let currentHour = "00:00";
    if (_currtDate===_date) {
        currentHour = _todaydate.getHours() + ":00";
    } else {
        return "24";
    }
    //let xAxis = getXAxis(currentHour);
    return currentHour;
}


function getMockData(){
    const mock = {
            "graphTitle":"Per Kilowatt Inverter wise Comparison",
            "graphType":"basic",
            "external_flag":"1",
            "time":"day",
            "unit":"day",
            "x_axis":"inverter",
            "legend":"1",
            "y1_title":"Levelized Power Per ",
            "y1_unit":"kW",
            "y1_base_color":"#2121FF",
            "y1_min":"0",
            "y1_max":"0",
            "y21_title":null,
            "y21_unit":null,
            "y21_base_color":null,
            "y21_min":null,
            "y21_max":null,
            "y22_title":null,
            "y22_unit":null,
            "y22_base_color":null,
            "y22_min":null,
            "y22_max":null,
            "y23_title":null,
            "y23_unit":null,
            "y23_base_color":null,
            "y23_min":null,
            "y23_max":null,
            "plant_name":"Punjab 1",
            "plant":null,
            "label":"Inverter",
            "device":"individual",
            "channel":"Power DC-capacity",
            "chart":"column",
            "color":"#2121FF",
            "yaxis":"0",
            "coefficient":"1.00",
            "result":[
               [
                  {
                     "individual0":"34",
                     "individual_name0":"Punjab 1",
                     "data0":"0.45610843552711905",
                     "inverter0":"INV-1"
                  },
                  {
                     "individual0":"38",
                     "individual_name0":"Punjab 1",
                     "data0":"0.4435909545840984",
                     "inverter0":"INV-2"
                  },
                  {
                     "individual0":"62",
                     "individual_name0":"Punjab 1",
                     "data0":"0.42646056478463756",
                     "inverter0":"INV-3"
                  },
                  {
                     "individual0":"70",
                     "individual_name0":"Punjab 1",
                     "data0":"0.4363623175257024",
                     "inverter0":"INV-4"
                  }
               ]
            ],
            "queryArray":[
               "SELECT DISTINCT(i.inverter_id) as individual0,p.plant_name as individual_name0,((AVG( id.pac_kw ) \/ i.dc_loading)) as data0,i.inverter_name as inverter0 FROM inverter i INNER JOIN plant p ON p.plant_id = i.plant_id INNER JOIN inverter_data id ON id.inverter_id = i.inverter_id WHERE id.inverter_date = '2020-03-12' AND id.inverter_time BETWEEN '08:30:00' AND '17:30:00' AND i.plant_id = 6 GROUP BY i.inverter_id"
            ],
            "pointStart":"2020-03-12",
            "pointInterval":86400000,
            "pointLabel":"day",
            "pointValue":"%e. %b",
            "to_date":"12\/03\/2020",
            "from_date":"12\/03\/2020",
            "doller":"74.784997",
            "cacheFlag":0
         }
     return mock;
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
                            dispatch({
                                type: GET_GRAPH_ROOFTOP_RT,
                                payload: { "graphNo": "gaugeGraphs" + index, "categoriesNo": "categories" + index, "canvas": data.graphId, categories: categories(data.externalDate), response: graphFormat1(response.data),"apiResponseNo":"apiResponse"+index, apiResponse:response.data }
                            })
                        })
                })
            }
            }
        }
    }




function graphPageList(pageID, subPageID) {
    const graphList = [
        { pageID: 1, subPage: 1, graphIDs: ["887"] },
        { pageID:2,subPage:1,graphIDs:["861","740","685"]},
        { pageID:2,subPage:2,graphIDs:["737","735","738"]},
        { pageID:2,subPage:3,graphIDs:["771","772","673"]},
        { pageID:2,subPage:4,graphIDs:["681","682","684"]},
        { pageID:2,subPage:5,graphIDs:["751","734","683"]},
        { pageID:2,subPage:6,graphIDs:["741","773","774","775"]},
        { pageID:2,subPage:7,graphIDs:["776","777","","779"]},
        { pageID:2,subPage:8,graphIDs:["780","781","686"]},
        { pageID:2,subPage:9,graphIDs:["841","868","837","842"]},
        { pageID:2,subPage:10,graphIDs:["843","844","845","854"]},
        { pageID:2,subPage:11,graphIDs:["856","859","860","889"]},
        { pageID:2,subPage:12,graphIDs:["894"]},
        { pageID:2,subPage:13,graphIDs:["870","892","896","897"]},
        { pageID:2,subPage:14,graphIDs:["898","899","922","939"]},
        { pageID:2,subPage:15,graphIDs:["921"]},
        { pageID:2,subPage:16,graphIDs:["940","941","942"]},
        { pageID:2,subPage:17,graphIDs:["948","949","950","951"]},
        { pageID:2,subPage:18,graphIDs:["942","943"]},

    ]
    const result = graphList.filter((flt) => flt.pageID === pageID && flt.subPage === subPageID)[0];
    if (result) {
        return result.graphIDs;
    }
    return null;
}