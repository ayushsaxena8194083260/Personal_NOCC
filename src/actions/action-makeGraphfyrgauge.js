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
function plotBandsFormat(data){
    let plots =[];
    data && data.length > 0 && data.map((item,index)=> {
    //    if(index >= 2){
        plots.push({...item, from: parseFloat(item.from).toFixed(2), to: parseFloat(item.to).toFixed(2) })
    //    }
    })

    return plots; 
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
    result["min"] = data.meterMin?data.meterMin: 0;
    result["max"] = data.meterMax? data.meterMax : findMaxNum(series);
    result["yTitle"] = data.y1Title;
    result["y1Unit"] = data.y1Unit;    
    result["yAxis"] = {};
    result["series"] = series;
    return result;
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
    result["min"] = data.meterMin?data.meterMin: 0;
    result["max"] = data.meterMax? data.meterMax : findMaxNum(data.seriesMap);
    result["yTitle"] = data.meterTitle;
    result["yAxis"] = {};
    result["series"] = data.seriesMap;



   // return { result: result, month:monthlygraph(data) };

   return result;
}

function getMonth(month) {
    const months = [{ displayText: "April", value: "4" }, { displayText: "May", value: "5" }, { displayText: "June", value: "6" }, { displayText: "July", value: "7" }, { displayText: "August", value: "8" }, { displayText: "September", value: "9" }, { displayText: "October", value: "10" },
    { displayText: "November", value: "11" }, { displayText: "December", value: "12" }, { displayText: "January", value: "1" }, { displayText: "February", value: "2" }, { displayText: "March", value: "3" }];

    const _month = months.filter((flt) => flt.value == month)[0];
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

export function makeGraphfyrgauge(data, plant = []) {
    let defaultprops = {
        "allPlants": 1,
        "canvas": "id",
        "dataFlag": 0,
        "externalDate": "string",
        "externalParam": 0,
        "externalPlant": [
            "string"
        ],
        "fromDate": "string",
        "graphId": 0,
        "plant": [],
        // "plant": [2,6,10,14,18,19,20,21,22,23
        //     ,24,
        //     25,
        //     26,
        //     27,
        //     28,
        //     29,
        //     30,
        //     31,
        //     32,
        //     33,
        //     34,
        //     35,
        //     36,
        //     37,
        //     38,
        //     39,
        //     40,
        //     41,
        //     42,
        //     43,
        //     44,
        //     45,
        //     46,
        //     47,
        //     48,
        //     49,
        //     50,
        //     51,
        //     52,
        //     54,
        //     55,
        //     56,
        //     57,
        //     58,
        //     59,
        //     60,
        //     61,
        //     62,
        //     63,
        //     64,
        //     65,
        //     66,
        //     75,
        //     77,
        //     78,
        //     79,
        //     80,
        //     82,
        //     83,
        //     84,
        //     85,
        //     86,
        //     87,
        //     88,
        //     89,
        //     90,
        //     91,
        //     92,
        //     93,
        //     94,
        //     95,
        //     96,
        //     97,
        //     99,
        //     100,
        //     101,
        //     102,
        //     103,
        //     104,
        //     105,
        //     106,
        //     107,
        //     108,
        //     109,
        //     112,
        //     113,
        //     114,
        //     115,
        //     118,
        //     119,
        //     120,
        //     121,
        //     122,
        //     123,
        //     124,
        //     125,
        //     126,
        //     127,
        //     128,
        //     129,
        //     130,
        //     131,
        //     132,
        //     133,
        //     134,
        //     135,
        //     136,
        //     137,
        //     138,
        //     139,
        //     140,
        //     141,
        //     142,
        //     143,
        //     144,
        //     145,
        //     146,
        //     147,
        //     148,
        //     149,
        //     150,
        //     151,
        //     152,
        //     153,
        //     155,
        //     156,
        //     157,
        //     160,
        //     161,
        //     162,
        //     163,
        //     164,
        //     165,
        //     166,
        //     167,
        //     168,
        //     169,
        //     170,
        //     171,
        //     172,
        //     173,
        //     174,
        //     175,
        //     176,
        //     177,
        //     178,
        //     179,
        //     180,
        //     181,
        //     182,
        //     183,
        //     184,
        //     185,
        //     186,
        //     187,
        //     188,
        //     189,
        //     190,
        //     191,
        //     192,
        //     193,
        //     194,
        //     195,
        //     196,
        //     197,
        //     198,
        //     199,
        //     200,
        //     201,
        //     202,
        //     203,
        //     204,
        //     205,
        //     206,
        //     207,
        //     208,
        //     209,
        //     210,
        //     211,
        //     212,
        //     213,
        //     214,
        //     215,
        //     216,
        //     217,
        //     218,
        //     219,
        //     220,
        //     221,
        //     222,
        //     223,
        //     224,
        //     225,
        //     226,
        //     227,
        //     228,
        //     229,
        //     230,
        //     231,
        //     232,
        //     233,
        //     234,
        //     235,
        //     236,
        //     237,
        //     238,
        //     240,
        //     241,
        //     242,
        //     243,
        //     244,
        //     245,
        //     246,
        //     247,
        //     248,
        //     249,
        //     250,
        //     251,
        //     252,
        //     253,
        //     254,
        //     255,
        //     256,
        //     257,
        //     258,
        //     259,
        //     260,
        //     261,
        //     262,
        //     263,
        //     264,
        //     265,
        //     266,
        //     267,
        //     268,
        //     269,
        //     270,
        //     271,
        //     272,
        //     273,
        //     274,
        //     275,
        //     276,
        //     277,
        //     278,
        //     279,
        //     280,
        //     281,
        //     282,
        //     283,
        //     284,
        //     285,
        //     286,
        //     287,
        //     288,
        //     289,
        //     290,
        //     291,
        //     292,
        //     293,
        //     294,
        //     295,
        //     296,
        //     297,
        //     298,
        //     299,
        //     300,
        //     301,
        //     302,
        //     303,
        //     304,
        //     305,
        //     306,
        //     307,
        //     308,
        //     309,
        //     310,
        //     311,
        //     312,
        //     313,
        //     314,
        //     315,
        //     316,
        //     317,
        //     318,
        //     319,
        //     320,
        //     321,
        //     322,
        //     323,
        //     326,
        //     327,
        //     328,
        //     329,
        //     331,
        //     332,
        //     333,
        //     334,
        //     335,
        //     336,
        //     337,
        //     338,
        //     339,
        //     340,
        //     341,
        //     342,
        //     343,
        //     344,
        //     345,
        //     346,
        //     347,
        //     348,
        //     349,
        //     350,
        //     351,
        //     352,
        //     353,
        //     354,
        //     355,
        //     356,
        //     357,
        //     358,
        //     359,
        //     360,
        //     361,
        //     362,
        //     363,
        //     364,
        //     365,
        //     366,
        //     367,
        //     368,
        //     369,
        //     370,
        //     371,
        //     372,
        //     373,
        //     374,
        //     375,
        //     376,
        //     377,
        //     378,
        //     379,
        //     380,
        //     381,
        //     384,
        //     385,
        //     386,
        //     387,
        //     388,
        //     389,
        //     390,
        //     391,
        //     392,
        //     393,
        //     394,
        //     395,
        //     396,
        //     397,
        //     398,
        //     399,
        //     400,
        //     401,
        //     402,
        //     403,
        //     404,
        //     405,
        //     406,
        //     407,
        //     408,
        //     409,
        //     410,
        //     411,
        //     412,
        //     413,
        //     414,
        //     415,
        //     416,
        //     417,
        //     418,
        //     419,
        //     420,
        //     421,
        //     422,
        //     423,
        //     424,
        //     425,
        //     426,
        //     427,
        //     428,
        //     429,
        //     430,
        //     431,
        //     432,
        //     433,
        //     434,
        //     435,
        //     436,
        //     437,
        //     438,
        //     439,
        //     440,
        //     441,
        //     442,
        //     443,
        //     444,
        //     445,
        //     446,
        //     447,
        //     448,
        //     449,
        //     450,
        //     451,
        //     452,
        //     453,
        //     454,
        //     455,
        //     456,
        //     457,
        //     458,
        //     459,
        //     460,
        //     461,
        //     462,
        //     463,
        //     464,
        //     465,
        //     466,
        //     467,
        //     468,
        //     469,
        //     470,
        //     471,
        //     472,
        //     473,
        //     474,
        //     475,
        //     476,
        //     477,
        //     478,
        //     479,
        //     480,
        //     481,
        //     482,
        //     483,
        //     484,
        //     485,
        //     486,
        //     487,
        //     488,
        //     489,
        //     490,
        //     491,
        //     492,
        //     493,
        //     494,
        //     495,
        //     496,
        //     497,
        //     498,
        //     499,
        //     500,
        //     501,
        //     502,
        //     503,
        //     504,
        //     505,
        //     506,
        //     507,
        //     508,
        //     509,
        //     510,
        //     511,
        //     512,
        //     513,
        //     514,
        //     515,
        //     516,
        //     517,
        //     518,
        //     519,
        //     520,
        //     521,
        //     522,
        //     523,
        //     524,
        //     525,
        //     526,
        //     527,
        //     528,
        //     529,
        //     530,
        //     531,
        //     532,
        //     533,
        //     534,
        //     535,
        //     536,
        //     537,
        //     538,
        //     539,
        //     540,
        //     541,
        //     542,
        //     543,
        //     544,
        //     545,
        //     546,
        //     547,
        //     548,
        //     549,
        //     550,
        //     551,
        //     552,
        //     553,
        //     554,
        //     555,
        //     556,
        //     557,
        //     558,
        //     559,
        //     560,
        //     561,
        //     562,
        //     563,
        //     564,
        //     565,
        //     566,
        //     567,
        //     568,
        //     569,
        //     570,
        //     571,
        //     572,
        //     573,
        //     574,
        //     575,
        //     576,
        //     577,
        //     578,
        //     579,
        //     580,
        //     581,
        //     582,
        //     583,
        //     584,
        //     585,
        //     586,
        //     587,
        //     588,
        //     589,
        //     590,
        //     591,
        //     592,
        //     593,
        //     594,
        //     595,
        //     596,
        //     597,
        //     598,
        //     599,
        //     600,
        //     601,
        //     602,
        //     603,
        //     604,
        //     605,
        //     606,
        //     607,
        //     608,
        //     609,
        //     610,
        //     611,
        //     612,
        //     613,
        //     614,
        //     615,
        //     616,
        //     617,
        //     618,
        //     619,
        //     620,
        //     621,
        //     622,
        //     623,
        //     624,
        //     625,
        //     626,
        //     627,
        //     628,
        //     629,
        //     630,
        //     631,
        //     632,
        //     633,
        //     634,
        //     635,
        //     636,
        //     637,
        //     638,
        //     639,
        //     640,
        //     641,
        //     642,
        //     643,
        //     644,
        //     645,
        //     646,
        //     647,
        //     648,
        //     649,
        //     650,
        //     651,
        //     652,
        //     653,
        //     654,
        //     656,
        //     657,
        //     658,
        //     659,
        //     663,
        //     664,
        //     665,
        //     666,
        //     667,
        //     668,
        //     669,
        //     670,
        //     672,
        //     673,
        //     674,
        //     675,
        //     676,
        //     677,
        //     678,
        //     679,
        //     680,
        //     681,
        //     682,
        //     683,
        //     684,
        //     685,
        //     686,
        //     687,
        //     688,
        //     689,
        //     690,
        //     691],
        "toDate": "string"
    }


    return (dispatch) => {
        if (data.graphId == "") {
        dispatch({
            type: CLEAR_GRAPH_RESPONSE

        })
    }

       // dispatch( getPlantByProjectId);
        if (data.pageID && data.subPageID) {
            const graphIDs = graphPageList(data.pageID, data.subPageID);
            if (graphIDs) {
                graphIDs && graphIDs.length > 0 && graphIDs.map((item, index) => {
                    if (data.graphId == "" || (data.graphId != "" && data.graphId == item)) {
                        service.makeGraphfyrgauge({ ...data, graphId: item }).then(response => {
                            dispatch(compareMakeGraphfgauge({ ...data, graphId: item }, [], "makeGraphfyrgauge"));
                        dispatch({
                            type: GET_GAUGE_MONTHLY_REPORT_RESPONSE,
                            payload: { "graphNo": "gaugeGraphs" + index, "canvas": data.graphId, response: graphFormat(response.data) }
                        })
                        let arr =[];
                        Object.keys(response.data && response.data.monthlySeriesList.length >0 ? response.data.monthlySeriesList[0]:[]).forEach(function (key) {
                            arr.push({ monthNo: key, month: getMonth(key), series: response.data.monthlySeriesList && response.data.monthlySeriesList.length >0 && response.data.monthlySeriesList[0][key], plotBands: response.data.monthlyPlotBandsList&& response.data.monthlyPlotBandsList.length >0 && response.data.monthlyPlotBandsList[0][key] });
                        });

                        arr.map((item, subIndex) => {
                            //return grpahArray.push({ graphNo: item.month, response: graphFormatForMonth(item, data, item.series, item.plotBands) });
                            dispatch({
                                type: GET_GAUGE_MONTHLY_REPORT_RESPONSE,
                                payload: { "graphNo": "gaugeGraphs" + index+subIndex, "canvas": data.graphId, response: graphFormatForMonth(item.month,response.data,   item.series,item.plotBands ) }
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
    const result = graphList.filter((flt) => flt.pageID == pageID && flt.subPage == subPageID)[0];
    if (result) {
        return result.graphIDs;
    }
    return null;
}