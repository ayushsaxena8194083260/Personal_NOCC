import {
    GET_GAUGE_REPORT_RESPONSE,
    CLEAR_GRAPH_RESPONSE
} from './types'
import service from "../services/allGraphServices";
// import {graphPageList}  from "./Mockdata/GraphIDList";
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

function graphFormat(data) {

    let result = {};
    result["id"] = "Graph" + data.graphId;
    result["title"] = "Date from: " + getDate(data.fromDate) + " to: " + getDate(data.toDate);
    result["yTitle"] = data.y1Title + " " + data.y1Unit;
    result["yAxis"] = {};
    result["series"] = resultData(data);
    result["categories"] = ["Net Generation", "Budget Generation"]
    // result["resultData"] =  resultData(data);
    return result;
}

function InverterGenerationBarSeries(realData,color) {
    let xValue = [];
    let name = [];
    let result = [];
    realData && realData.map((data, index)=> {
        data && data.map((item) => {
            let yValue = [];
             
            const _name = name.filter((im => im === item["individual_name"+index]))[0];
            if (!_name) {
                name.push(item["individual_name"+index]);
                const filterData = data.filter((flt) => flt["individual_name"+index] === item["individual_name"+index]);
                filterData.forEach((itm) => {
                    yValue.push(parseFloat(itm["data"+index]));
                    const _date = xValue.filter((im => im === itm["data"+index]))[0];
                    if (!_date) {
                        xValue.push(commonfunction.dateFormat(itm["date"+index], "dm"));
                        //xValue.push(commonfunction.dateFormat(itm["date" + index], "dm"));
                    }
                });
                result.push({ name: item["individual_name"+index], data: yValue,color: color[index] })
            }
            // const _data = filterData.forEach((itm) => yValue.push(parseFloat(item.data0)));
            
        })
    })
    
    return {  ySeries: result, xSeries: xValue };
}

function graphFormat1(data, graphID) {
    const mockResult = getMockData(graphID);
    const res = JSON.parse(data && data.result);
    let color=data.colorCode.split(',');

    const series = InverterGenerationBarSeries(res && res[0].length > 0 ? res : mockResult && mockResult,color);
    const _result = {
        id: graphID,
        title: {
            text: "Date from: " + getDate(data.fromDate) + " to: " + getDate(data.toDate)
        },
        xAxis: {

            categories: series.xSeries,
            tickInterval: 7,
            lables:{}
        },
        yAxis:{
            title: { text: `${data.y1Title}(${data.y1Unit ==="Blank"?"":data.y1Unit})`, style: { color: data.y1BaseColor,fontWeight:"bold" }},
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

function getMockData(graphID) {
    const arrayResp = [];
    if(graphID === "866" || graphID === "867" || graphID === "888"){
    arrayResp[graphID] = [
        [
            {
                "individual0": "634",
                "individual_name0": "inv_1",
                "data0": "5555700.2000",
                "date0": "2020-03-01"
            },
            {
                "individual0": "634",
                "individual_name0": "inv_1",
                "data0": "5558944.3000",
                "date0": "2020-03-02"
            },
            {
                "individual0": "634",
                "individual_name0": "inv_1",
                "data0": "5562365.5000",
                "date0": "2020-03-03"
            },
            {
                "individual0": "634",
                "individual_name0": "inv_1",
                "data0": "5566044.3000",
                "date0": "2020-03-04"
            },
            {
                "individual0": "634",
                "individual_name0": "inv_1",
                "data0": "5569649.1000",
                "date0": "2020-03-05"
            },
            {
                "individual0": "634",
                "individual_name0": "inv_1",
                "data0": "5572951.6000",
                "date0": "2020-03-06"
            },
            {
                "individual0": "634",
                "individual_name0": "inv_1",
                "data0": "5576925.8000",
                "date0": "2020-03-07"
            },
            {
                "individual0": "634",
                "individual_name0": "inv_1",
                "data0": "5580902.6000",
                "date0": "2020-03-08"
            },
            {
                "individual0": "634",
                "individual_name0": "inv_1",
                "data0": "5584817.4000",
                "date0": "2020-03-09"
            },
            {
                "individual0": "634",
                "individual_name0": "inv_1",
                "data0": "5588092.2000",
                "date0": "2020-03-10"
            },
            {
                "individual0": "634",
                "individual_name0": "inv_1",
                "data0": "5590999.4000",
                "date0": "2020-03-11"
            },
            {
                "individual0": "635",
                "individual_name0": "inv_2",
                "data0": "5564449.9000",
                "date0": "2020-03-01"
            },
            {
                "individual0": "635",
                "individual_name0": "inv_2",
                "data0": "5567724.0000",
                "date0": "2020-03-02"
            },
            {
                "individual0": "635",
                "individual_name0": "inv_2",
                "data0": "5571184.3000",
                "date0": "2020-03-03"
            },
            {
                "individual0": "635",
                "individual_name0": "inv_2",
                "data0": "5574885.7000",
                "date0": "2020-03-04"
            },
            {
                "individual0": "635",
                "individual_name0": "inv_2",
                "data0": "5578485.0000",
                "date0": "2020-03-05"
            },
            {
                "individual0": "635",
                "individual_name0": "inv_2",
                "data0": "5581874.1000",
                "date0": "2020-03-06"
            },
            {
                "individual0": "635",
                "individual_name0": "inv_2",
                "data0": "5585880.3000",
                "date0": "2020-03-07"
            },
            {
                "individual0": "635",
                "individual_name0": "inv_2",
                "data0": "5589884.4000",
                "date0": "2020-03-08"
            },
            {
                "individual0": "635",
                "individual_name0": "inv_2",
                "data0": "5593825.6000",
                "date0": "2020-03-09"
            },
            {
                "individual0": "635",
                "individual_name0": "inv_2",
                "data0": "5597114.5000",
                "date0": "2020-03-10"
            },
            {
                "individual0": "635",
                "individual_name0": "inv_2",
                "data0": "5600037.4000",
                "date0": "2020-03-11"
            },
            {
                "individual0": "636",
                "individual_name0": "inv_3",
                "data0": "5530726.2000",
                "date0": "2020-03-01"
            },
            {
                "individual0": "636",
                "individual_name0": "inv_3",
                "data0": "5534002.1000",
                "date0": "2020-03-02"
            },
            {
                "individual0": "636",
                "individual_name0": "inv_3",
                "data0": "5537489.8000",
                "date0": "2020-03-03"
            },
            {
                "individual0": "636",
                "individual_name0": "inv_3",
                "data0": "5541206.8000",
                "date0": "2020-03-04"
            },
            {
                "individual0": "636",
                "individual_name0": "inv_3",
                "data0": "5544840.3000",
                "date0": "2020-03-05"
            },
            {
                "individual0": "636",
                "individual_name0": "inv_3",
                "data0": "5548259.8000",
                "date0": "2020-03-06"
            },
            {
                "individual0": "636",
                "individual_name0": "inv_3",
                "data0": "5552289.6000",
                "date0": "2020-03-07"
            },
            {
                "individual0": "636",
                "individual_name0": "inv_3",
                "data0": "5556330.0000",
                "date0": "2020-03-08"
            },
            {
                "individual0": "636",
                "individual_name0": "inv_3",
                "data0": "5560302.3000",
                "date0": "2020-03-09"
            },
            {
                "individual0": "636",
                "individual_name0": "inv_3",
                "data0": "5563609.9000",
                "date0": "2020-03-10"
            },
            {
                "individual0": "636",
                "individual_name0": "inv_3",
                "data0": "5566544.5000",
                "date0": "2020-03-11"
            },
            {
                "individual0": "637",
                "individual_name0": "inv_4",
                "data0": "5592931.9000",
                "date0": "2020-03-01"
            },
            {
                "individual0": "637",
                "individual_name0": "inv_4",
                "data0": "5596219.3000",
                "date0": "2020-03-02"
            },
            {
                "individual0": "637",
                "individual_name0": "inv_4",
                "data0": "5599702.3000",
                "date0": "2020-03-03"
            },
            {
                "individual0": "637",
                "individual_name0": "inv_4",
                "data0": "5603412.4000",
                "date0": "2020-03-04"
            },
            {
                "individual0": "637",
                "individual_name0": "inv_4",
                "data0": "5607021.1000",
                "date0": "2020-03-05"
            },
            {
                "individual0": "637",
                "individual_name0": "inv_4",
                "data0": "5610457.3000",
                "date0": "2020-03-06"
            },
            {
                "individual0": "637",
                "individual_name0": "inv_4",
                "data0": "5614491.9000",
                "date0": "2020-03-07"
            },
            {
                "individual0": "637",
                "individual_name0": "inv_4",
                "data0": "5618531.8000",
                "date0": "2020-03-08"
            },
            {
                "individual0": "637",
                "individual_name0": "inv_4",
                "data0": "5622509.7000",
                "date0": "2020-03-09"
            },
            {
                "individual0": "637",
                "individual_name0": "inv_4",
                "data0": "5625827.7000",
                "date0": "2020-03-10"
            },
            {
                "individual0": "637",
                "individual_name0": "inv_4",
                "data0": "5628773.7000",
                "date0": "2020-03-11"
            },
            {
                "individual0": "639",
                "individual_name0": "inv_5",
                "data0": "5591483.8000",
                "date0": "2020-03-01"
            },
            {
                "individual0": "639",
                "individual_name0": "inv_5",
                "data0": "5594732.4000",
                "date0": "2020-03-02"
            },
            {
                "individual0": "639",
                "individual_name0": "inv_5",
                "data0": "5598207.4000",
                "date0": "2020-03-03"
            },
            {
                "individual0": "639",
                "individual_name0": "inv_5",
                "data0": "5601948.1000",
                "date0": "2020-03-04"
            },
            {
                "individual0": "639",
                "individual_name0": "inv_5",
                "data0": "5605566.1000",
                "date0": "2020-03-05"
            },
            {
                "individual0": "639",
                "individual_name0": "inv_5",
                "data0": "5608838.1000",
                "date0": "2020-03-06"
            },
            {
                "individual0": "639",
                "individual_name0": "inv_5",
                "data0": "5612836.3000",
                "date0": "2020-03-07"
            },
            {
                "individual0": "639",
                "individual_name0": "inv_5",
                "data0": "5616849.9000",
                "date0": "2020-03-08"
            },
            {
                "individual0": "639",
                "individual_name0": "inv_5",
                "data0": "5620799.6000",
                "date0": "2020-03-09"
            },
            {
                "individual0": "639",
                "individual_name0": "inv_5",
                "data0": "5624097.9000",
                "date0": "2020-03-10"
            },
            {
                "individual0": "639",
                "individual_name0": "inv_5",
                "data0": "5627025.9000",
                "date0": "2020-03-11"
            },
            {
                "individual0": "640",
                "individual_name0": "inv_6",
                "data0": "6108826.6000",
                "date0": "2020-03-01"
            },
            {
                "individual0": "640",
                "individual_name0": "inv_6",
                "data0": "6112813.0000",
                "date0": "2020-03-02"
            },
            {
                "individual0": "640",
                "individual_name0": "inv_6",
                "data0": "6117081.5000",
                "date0": "2020-03-03"
            },
            {
                "individual0": "640",
                "individual_name0": "inv_6",
                "data0": "6121648.2000",
                "date0": "2020-03-04"
            },
            {
                "individual0": "640",
                "individual_name0": "inv_6",
                "data0": "6126078.5000",
                "date0": "2020-03-05"
            },
            {
                "individual0": "640",
                "individual_name0": "inv_6",
                "data0": "6129979.8000",
                "date0": "2020-03-06"
            },
            {
                "individual0": "640",
                "individual_name0": "inv_6",
                "data0": "6134838.8000",
                "date0": "2020-03-07"
            },
            {
                "individual0": "640",
                "individual_name0": "inv_6",
                "data0": "6139735.8000",
                "date0": "2020-03-08"
            },
            {
                "individual0": "640",
                "individual_name0": "inv_6",
                "data0": "6144562.3000",
                "date0": "2020-03-09"
            },
            {
                "individual0": "640",
                "individual_name0": "inv_6",
                "data0": "6148559.8000",
                "date0": "2020-03-10"
            },
            {
                "individual0": "640",
                "individual_name0": "inv_6",
                "data0": "6152103.0000",
                "date0": "2020-03-11"
            },
            {
                "individual0": "641",
                "individual_name0": "inv_7",
                "data0": "5616296.3000",
                "date0": "2020-03-01"
            },
            {
                "individual0": "641",
                "individual_name0": "inv_7",
                "data0": "5619612.1000",
                "date0": "2020-03-02"
            },
            {
                "individual0": "641",
                "individual_name0": "inv_7",
                "data0": "5623161.0000",
                "date0": "2020-03-03"
            },
            {
                "individual0": "641",
                "individual_name0": "inv_7",
                "data0": "5626930.3000",
                "date0": "2020-03-04"
            },
            {
                "individual0": "641",
                "individual_name0": "inv_7",
                "data0": "5630577.7000",
                "date0": "2020-03-05"
            },
            {
                "individual0": "641",
                "individual_name0": "inv_7",
                "data0": "5633868.7000",
                "date0": "2020-03-06"
            },
            {
                "individual0": "641",
                "individual_name0": "inv_7",
                "data0": "5637879.0000",
                "date0": "2020-03-07"
            },
            {
                "individual0": "641",
                "individual_name0": "inv_7",
                "data0": "5641929.9000",
                "date0": "2020-03-08"
            },
            {
                "individual0": "641",
                "individual_name0": "inv_7",
                "data0": "5645917.2000",
                "date0": "2020-03-09"
            },
            {
                "individual0": "641",
                "individual_name0": "inv_7",
                "data0": "5649246.3000",
                "date0": "2020-03-10"
            },
            {
                "individual0": "641",
                "individual_name0": "inv_7",
                "data0": "5652197.2000",
                "date0": "2020-03-11"
            },
            {
                "individual0": "643",
                "individual_name0": "inv_8",
                "data0": "5669522.2000",
                "date0": "2020-03-01"
            },
            {
                "individual0": "643",
                "individual_name0": "inv_8",
                "data0": "5672826.5000",
                "date0": "2020-03-02"
            },
            {
                "individual0": "643",
                "individual_name0": "inv_8",
                "data0": "5676400.5000",
                "date0": "2020-03-03"
            },
            {
                "individual0": "643",
                "individual_name0": "inv_8",
                "data0": "5680109.7000",
                "date0": "2020-03-04"
            },
            {
                "individual0": "643",
                "individual_name0": "inv_8",
                "data0": "5683787.0000",
                "date0": "2020-03-05"
            },
            {
                "individual0": "643",
                "individual_name0": "inv_8",
                "data0": "5687063.2000",
                "date0": "2020-03-06"
            },
            {
                "individual0": "643",
                "individual_name0": "inv_8",
                "data0": "5691112.4000",
                "date0": "2020-03-07"
            },
            {
                "individual0": "643",
                "individual_name0": "inv_8",
                "data0": "5695184.6000",
                "date0": "2020-03-08"
            },
            {
                "individual0": "643",
                "individual_name0": "inv_8",
                "data0": "5699161.1000",
                "date0": "2020-03-09"
            },
            {
                "individual0": "643",
                "individual_name0": "inv_8",
                "data0": "5702480.9000",
                "date0": "2020-03-10"
            },
            {
                "individual0": "643",
                "individual_name0": "inv_8",
                "data0": "5705416.0000",
                "date0": "2020-03-11"
            },
            {
                "individual0": "644",
                "individual_name0": "inv_9",
                "data0": "6109977.2000",
                "date0": "2020-03-01"
            },
            {
                "individual0": "644",
                "individual_name0": "inv_9",
                "data0": "6114032.4000",
                "date0": "2020-03-02"
            },
            {
                "individual0": "644",
                "individual_name0": "inv_9",
                "data0": "6118293.9000",
                "date0": "2020-03-03"
            },
            {
                "individual0": "644",
                "individual_name0": "inv_9",
                "data0": "6122805.1000",
                "date0": "2020-03-04"
            },
            {
                "individual0": "644",
                "individual_name0": "inv_9",
                "data0": "6127055.5000",
                "date0": "2020-03-05"
            },
            {
                "individual0": "644",
                "individual_name0": "inv_9",
                "data0": "6131017.9000",
                "date0": "2020-03-06"
            },
            {
                "individual0": "644",
                "individual_name0": "inv_9",
                "data0": "6135901.6000",
                "date0": "2020-03-07"
            },
            {
                "individual0": "644",
                "individual_name0": "inv_9",
                "data0": "6140866.2000",
                "date0": "2020-03-08"
            },
            {
                "individual0": "644",
                "individual_name0": "inv_9",
                "data0": "6145753.8000",
                "date0": "2020-03-09"
            },
            {
                "individual0": "644",
                "individual_name0": "inv_9",
                "data0": "6149824.9000",
                "date0": "2020-03-10"
            },
            {
                "individual0": "644",
                "individual_name0": "inv_9",
                "data0": "6153419.7000",
                "date0": "2020-03-11"
            },
            {
                "individual0": "645",
                "individual_name0": "inv_10",
                "data0": "5654380.9000",
                "date0": "2020-03-01"
            },
            {
                "individual0": "645",
                "individual_name0": "inv_10",
                "data0": "5657667.3000",
                "date0": "2020-03-02"
            },
            {
                "individual0": "645",
                "individual_name0": "inv_10",
                "data0": "5661206.7000",
                "date0": "2020-03-03"
            },
            {
                "individual0": "645",
                "individual_name0": "inv_10",
                "data0": "5664991.6000",
                "date0": "2020-03-04"
            },
            {
                "individual0": "645",
                "individual_name0": "inv_10",
                "data0": "5668667.5000",
                "date0": "2020-03-05"
            },
            {
                "individual0": "645",
                "individual_name0": "inv_10",
                "data0": "5671964.5000",
                "date0": "2020-03-06"
            },
            {
                "individual0": "645",
                "individual_name0": "inv_10",
                "data0": "5675962.1000",
                "date0": "2020-03-07"
            },
            {
                "individual0": "645",
                "individual_name0": "inv_10",
                "data0": "5680008.2000",
                "date0": "2020-03-08"
            },
            {
                "individual0": "645",
                "individual_name0": "inv_10",
                "data0": "5683997.7000",
                "date0": "2020-03-09"
            },
            {
                "individual0": "645",
                "individual_name0": "inv_10",
                "data0": "5687345.5000",
                "date0": "2020-03-10"
            },
            {
                "individual0": "645",
                "individual_name0": "inv_10",
                "data0": "5690302.8000",
                "date0": "2020-03-11"
            },
            {
                "individual0": "647",
                "individual_name0": "inv_11",
                "data0": "5565705.7000",
                "date0": "2020-03-01"
            },
            {
                "individual0": "647",
                "individual_name0": "inv_11",
                "data0": "5569026.4000",
                "date0": "2020-03-02"
            },
            {
                "individual0": "647",
                "individual_name0": "inv_11",
                "data0": "5572545.3000",
                "date0": "2020-03-03"
            },
            {
                "individual0": "647",
                "individual_name0": "inv_11",
                "data0": "5576356.8000",
                "date0": "2020-03-04"
            },
            {
                "individual0": "647",
                "individual_name0": "inv_11",
                "data0": "5580050.8000",
                "date0": "2020-03-05"
            },
            {
                "individual0": "647",
                "individual_name0": "inv_11",
                "data0": "5583233.0000",
                "date0": "2020-03-06"
            },
            {
                "individual0": "647",
                "individual_name0": "inv_11",
                "data0": "5587230.9000",
                "date0": "2020-03-07"
            },
            {
                "individual0": "647",
                "individual_name0": "inv_11",
                "data0": "5591258.1000",
                "date0": "2020-03-08"
            },
            {
                "individual0": "647",
                "individual_name0": "inv_11",
                "data0": "5595226.6000",
                "date0": "2020-03-09"
            },
            {
                "individual0": "647",
                "individual_name0": "inv_11",
                "data0": "5598565.1000",
                "date0": "2020-03-10"
            },
            {
                "individual0": "647",
                "individual_name0": "inv_11",
                "data0": "5601542.5000",
                "date0": "2020-03-11"
            },
            {
                "individual0": "648",
                "individual_name0": "inv_12",
                "data0": "5561004.4000",
                "date0": "2020-03-01"
            },
            {
                "individual0": "648",
                "individual_name0": "inv_12",
                "data0": "5564293.7000",
                "date0": "2020-03-02"
            },
            {
                "individual0": "648",
                "individual_name0": "inv_12",
                "data0": "5567753.8000",
                "date0": "2020-03-03"
            },
            {
                "individual0": "648",
                "individual_name0": "inv_12",
                "data0": "5571517.3000",
                "date0": "2020-03-04"
            },
            {
                "individual0": "648",
                "individual_name0": "inv_12",
                "data0": "5575160.4000",
                "date0": "2020-03-05"
            },
            {
                "individual0": "648",
                "individual_name0": "inv_12",
                "data0": "5578399.0000",
                "date0": "2020-03-06"
            },
            {
                "individual0": "648",
                "individual_name0": "inv_12",
                "data0": "5582362.4000",
                "date0": "2020-03-07"
            },
            {
                "individual0": "648",
                "individual_name0": "inv_12",
                "data0": "5586362.8000",
                "date0": "2020-03-08"
            },
            {
                "individual0": "648",
                "individual_name0": "inv_12",
                "data0": "5590299.3000",
                "date0": "2020-03-09"
            },
            {
                "individual0": "648",
                "individual_name0": "inv_12",
                "data0": "5593566.1000",
                "date0": "2020-03-10"
            },
            {
                "individual0": "648",
                "individual_name0": "inv_12",
                "data0": "5596450.5000",
                "date0": "2020-03-11"
            },
            {
                "individual0": "649",
                "individual_name0": "inv_13",
                "data0": "5498072.3000",
                "date0": "2020-03-01"
            },
            {
                "individual0": "649",
                "individual_name0": "inv_13",
                "data0": "5501325.0000",
                "date0": "2020-03-02"
            },
            {
                "individual0": "649",
                "individual_name0": "inv_13",
                "data0": "5504754.0000",
                "date0": "2020-03-03"
            },
            {
                "individual0": "649",
                "individual_name0": "inv_13",
                "data0": "5508411.9000",
                "date0": "2020-03-04"
            },
            {
                "individual0": "649",
                "individual_name0": "inv_13",
                "data0": "5512009.6000",
                "date0": "2020-03-05"
            },
            {
                "individual0": "649",
                "individual_name0": "inv_13",
                "data0": "5515315.5000",
                "date0": "2020-03-06"
            },
            {
                "individual0": "649",
                "individual_name0": "inv_13",
                "data0": "5519275.6000",
                "date0": "2020-03-07"
            },
            {
                "individual0": "649",
                "individual_name0": "inv_13",
                "data0": "5523246.3000",
                "date0": "2020-03-08"
            },
            {
                "individual0": "649",
                "individual_name0": "inv_13",
                "data0": "5527153.1000",
                "date0": "2020-03-09"
            },
            {
                "individual0": "649",
                "individual_name0": "inv_13",
                "data0": "5530431.3000",
                "date0": "2020-03-10"
            },
            {
                "individual0": "649",
                "individual_name0": "inv_13",
                "data0": "5533317.1000",
                "date0": "2020-03-11"
            },
            {
                "individual0": "650",
                "individual_name0": "inv_14",
                "data0": "5395631.6000",
                "date0": "2020-03-01"
            },
            {
                "individual0": "650",
                "individual_name0": "inv_14",
                "data0": "5398996.5000",
                "date0": "2020-03-02"
            },
            {
                "individual0": "650",
                "individual_name0": "inv_14",
                "data0": "5402531.3000",
                "date0": "2020-03-03"
            },
            {
                "individual0": "650",
                "individual_name0": "inv_14",
                "data0": "5406289.6000",
                "date0": "2020-03-04"
            },
            {
                "individual0": "650",
                "individual_name0": "inv_14",
                "data0": "5409901.5000",
                "date0": "2020-03-05"
            },
            {
                "individual0": "650",
                "individual_name0": "inv_14",
                "data0": "5413259.6000",
                "date0": "2020-03-06"
            },
            {
                "individual0": "650",
                "individual_name0": "inv_14",
                "data0": "5417281.2000",
                "date0": "2020-03-07"
            },
            {
                "individual0": "650",
                "individual_name0": "inv_14",
                "data0": "5421315.8000",
                "date0": "2020-03-08"
            },
            {
                "individual0": "650",
                "individual_name0": "inv_14",
                "data0": "5425274.6000",
                "date0": "2020-03-09"
            },
            {
                "individual0": "650",
                "individual_name0": "inv_14",
                "data0": "5428589.3000",
                "date0": "2020-03-10"
            },
            {
                "individual0": "650",
                "individual_name0": "inv_14",
                "data0": "5431486.8000",
                "date0": "2020-03-11"
            },
            {
                "individual0": "651",
                "individual_name0": "inv_15",
                "data0": "6068671.4000",
                "date0": "2020-03-01"
            },
            {
                "individual0": "651",
                "individual_name0": "inv_15",
                "data0": "6072785.2000",
                "date0": "2020-03-02"
            },
            {
                "individual0": "651",
                "individual_name0": "inv_15",
                "data0": "6076954.2000",
                "date0": "2020-03-03"
            },
            {
                "individual0": "651",
                "individual_name0": "inv_15",
                "data0": "6081334.1000",
                "date0": "2020-03-04"
            },
            {
                "individual0": "651",
                "individual_name0": "inv_15",
                "data0": "6085388.0000",
                "date0": "2020-03-05"
            },
            {
                "individual0": "651",
                "individual_name0": "inv_15",
                "data0": "6089318.4000",
                "date0": "2020-03-06"
            },
            {
                "individual0": "651",
                "individual_name0": "inv_15",
                "data0": "6093996.6000",
                "date0": "2020-03-07"
            },
            {
                "individual0": "651",
                "individual_name0": "inv_15",
                "data0": "6098758.3000",
                "date0": "2020-03-08"
            },
            {
                "individual0": "651",
                "individual_name0": "inv_15",
                "data0": "6103409.2000",
                "date0": "2020-03-09"
            },
            {
                "individual0": "651",
                "individual_name0": "inv_15",
                "data0": "6107271.7000",
                "date0": "2020-03-10"
            },
            {
                "individual0": "651",
                "individual_name0": "inv_15",
                "data0": "6110708.1000",
                "date0": "2020-03-11"
            },
            {
                "individual0": "652",
                "individual_name0": "inv_16",
                "data0": "5458378.6000",
                "date0": "2020-03-01"
            },
            {
                "individual0": "652",
                "individual_name0": "inv_16",
                "data0": "5461707.3000",
                "date0": "2020-03-02"
            },
            {
                "individual0": "652",
                "individual_name0": "inv_16",
                "data0": "5465205.2000",
                "date0": "2020-03-03"
            },
            {
                "individual0": "652",
                "individual_name0": "inv_16",
                "data0": "5468931.8000",
                "date0": "2020-03-04"
            },
            {
                "individual0": "652",
                "individual_name0": "inv_16",
                "data0": "5472509.4000",
                "date0": "2020-03-05"
            },
            {
                "individual0": "652",
                "individual_name0": "inv_16",
                "data0": "5475803.7000",
                "date0": "2020-03-06"
            },
            {
                "individual0": "652",
                "individual_name0": "inv_16",
                "data0": "5479756.0000",
                "date0": "2020-03-07"
            },
            {
                "individual0": "652",
                "individual_name0": "inv_16",
                "data0": "5483747.7000",
                "date0": "2020-03-08"
            },
            {
                "individual0": "652",
                "individual_name0": "inv_16",
                "data0": "5487667.0000",
                "date0": "2020-03-09"
            },
            {
                "individual0": "652",
                "individual_name0": "inv_16",
                "data0": "5490900.8000",
                "date0": "2020-03-10"
            },
            {
                "individual0": "652",
                "individual_name0": "inv_16",
                "data0": "5493747.9000",
                "date0": "2020-03-11"
            },
            {
                "individual0": "653",
                "individual_name0": "inv_17",
                "data0": "5484225.9000",
                "date0": "2020-03-01"
            },
            {
                "individual0": "653",
                "individual_name0": "inv_17",
                "data0": "5487586.1000",
                "date0": "2020-03-02"
            },
            {
                "individual0": "653",
                "individual_name0": "inv_17",
                "data0": "5491088.6000",
                "date0": "2020-03-03"
            },
            {
                "individual0": "653",
                "individual_name0": "inv_17",
                "data0": "5494807.3000",
                "date0": "2020-03-04"
            },
            {
                "individual0": "653",
                "individual_name0": "inv_17",
                "data0": "5498380.1000",
                "date0": "2020-03-05"
            },
            {
                "individual0": "653",
                "individual_name0": "inv_17",
                "data0": "5501805.3000",
                "date0": "2020-03-06"
            },
            {
                "individual0": "653",
                "individual_name0": "inv_17",
                "data0": "5505802.5000",
                "date0": "2020-03-07"
            },
            {
                "individual0": "653",
                "individual_name0": "inv_17",
                "data0": "5509821.5000",
                "date0": "2020-03-08"
            },
            {
                "individual0": "653",
                "individual_name0": "inv_17",
                "data0": "5513771.7000",
                "date0": "2020-03-09"
            },
            {
                "individual0": "653",
                "individual_name0": "inv_17",
                "data0": "5517061.9000",
                "date0": "2020-03-10"
            },
            {
                "individual0": "653",
                "individual_name0": "inv_17",
                "data0": "5519955.6000",
                "date0": "2020-03-11"
            },
            {
                "individual0": "654",
                "individual_name0": "inv_18",
                "data0": "5860974.8000",
                "date0": "2020-03-01"
            },
            {
                "individual0": "654",
                "individual_name0": "inv_18",
                "data0": "5864956.5000",
                "date0": "2020-03-02"
            },
            {
                "individual0": "654",
                "individual_name0": "inv_18",
                "data0": "5869051.6000",
                "date0": "2020-03-03"
            },
            {
                "individual0": "654",
                "individual_name0": "inv_18",
                "data0": "5873398.8000",
                "date0": "2020-03-04"
            },
            {
                "individual0": "654",
                "individual_name0": "inv_18",
                "data0": "5877525.2000",
                "date0": "2020-03-05"
            },
            {
                "individual0": "654",
                "individual_name0": "inv_18",
                "data0": "5881481.8000",
                "date0": "2020-03-06"
            },
            {
                "individual0": "654",
                "individual_name0": "inv_18",
                "data0": "5886125.9000",
                "date0": "2020-03-07"
            },
            {
                "individual0": "654",
                "individual_name0": "inv_18",
                "data0": "5890822.5000",
                "date0": "2020-03-08"
            },
            {
                "individual0": "654",
                "individual_name0": "inv_18",
                "data0": "5895350.2000",
                "date0": "2020-03-09"
            },
            {
                "individual0": "654",
                "individual_name0": "inv_18",
                "data0": "5899137.6000",
                "date0": "2020-03-10"
            },
            {
                "individual0": "654",
                "individual_name0": "inv_18",
                "data0": "5902482.5000",
                "date0": "2020-03-11"
            },
            {
                "individual0": "655",
                "individual_name0": "inv_19",
                "data0": "5497082.2000",
                "date0": "2020-03-01"
            },
            {
                "individual0": "655",
                "individual_name0": "inv_19",
                "data0": "5500437.6000",
                "date0": "2020-03-02"
            },
            {
                "individual0": "655",
                "individual_name0": "inv_19",
                "data0": "5503874.5000",
                "date0": "2020-03-03"
            },
            {
                "individual0": "655",
                "individual_name0": "inv_19",
                "data0": "5507549.3000",
                "date0": "2020-03-04"
            },
            {
                "individual0": "655",
                "individual_name0": "inv_19",
                "data0": "5510973.8000",
                "date0": "2020-03-05"
            },
            {
                "individual0": "655",
                "individual_name0": "inv_19",
                "data0": "5514317.6000",
                "date0": "2020-03-06"
            },
            {
                "individual0": "655",
                "individual_name0": "inv_19",
                "data0": "5518213.9000",
                "date0": "2020-03-07"
            },
            {
                "individual0": "655",
                "individual_name0": "inv_19",
                "data0": "5522131.4000",
                "date0": "2020-03-08"
            },
            {
                "individual0": "655",
                "individual_name0": "inv_19",
                "data0": "5525910.7000",
                "date0": "2020-03-09"
            },
            {
                "individual0": "655",
                "individual_name0": "inv_19",
                "data0": "5529060.4000",
                "date0": "2020-03-10"
            },
            {
                "individual0": "655",
                "individual_name0": "inv_19",
                "data0": "5531897.0000",
                "date0": "2020-03-11"
            },
            {
                "individual0": "656",
                "individual_name0": "inv_20",
                "data0": "5427678.9000",
                "date0": "2020-03-01"
            },
            {
                "individual0": "656",
                "individual_name0": "inv_20",
                "data0": "5431084.2000",
                "date0": "2020-03-02"
            },
            {
                "individual0": "656",
                "individual_name0": "inv_20",
                "data0": "5434599.3000",
                "date0": "2020-03-03"
            },
            {
                "individual0": "656",
                "individual_name0": "inv_20",
                "data0": "5438391.0000",
                "date0": "2020-03-04"
            },
            {
                "individual0": "656",
                "individual_name0": "inv_20",
                "data0": "5442030.6000",
                "date0": "2020-03-05"
            },
            {
                "individual0": "656",
                "individual_name0": "inv_20",
                "data0": "5445484.8000",
                "date0": "2020-03-06"
            },
            {
                "individual0": "656",
                "individual_name0": "inv_20",
                "data0": "5449520.0000",
                "date0": "2020-03-07"
            },
            {
                "individual0": "656",
                "individual_name0": "inv_20",
                "data0": "5453581.4000",
                "date0": "2020-03-08"
            },
            {
                "individual0": "656",
                "individual_name0": "inv_20",
                "data0": "5457569.0000",
                "date0": "2020-03-09"
            },
            {
                "individual0": "656",
                "individual_name0": "inv_20",
                "data0": "5460891.5000",
                "date0": "2020-03-10"
            },
            {
                "individual0": "656",
                "individual_name0": "inv_20",
                "data0": "5463817.3000",
                "date0": "2020-03-11"
            },
            {
                "individual0": "657",
                "individual_name0": "inv_21",
                "data0": "5418242.8000",
                "date0": "2020-03-01"
            },
            {
                "individual0": "657",
                "individual_name0": "inv_21",
                "data0": "5421558.3000",
                "date0": "2020-03-02"
            },
            {
                "individual0": "657",
                "individual_name0": "inv_21",
                "data0": "5424955.0000",
                "date0": "2020-03-03"
            },
            {
                "individual0": "657",
                "individual_name0": "inv_21",
                "data0": "5428572.8000",
                "date0": "2020-03-04"
            },
            {
                "individual0": "657",
                "individual_name0": "inv_21",
                "data0": "5432046.3000",
                "date0": "2020-03-05"
            },
            {
                "individual0": "657",
                "individual_name0": "inv_21",
                "data0": "5435431.7000",
                "date0": "2020-03-06"
            },
            {
                "individual0": "657",
                "individual_name0": "inv_21",
                "data0": "5439287.0000",
                "date0": "2020-03-07"
            },
            {
                "individual0": "657",
                "individual_name0": "inv_21",
                "data0": "5443208.7000",
                "date0": "2020-03-08"
            },
            {
                "individual0": "657",
                "individual_name0": "inv_21",
                "data0": "5447054.7000",
                "date0": "2020-03-09"
            },
            {
                "individual0": "657",
                "individual_name0": "inv_21",
                "data0": "5450269.4000",
                "date0": "2020-03-10"
            },
            {
                "individual0": "657",
                "individual_name0": "inv_21",
                "data0": "5453114.0000",
                "date0": "2020-03-11"
            },
            {
                "individual0": "658",
                "individual_name0": "inv_22",
                "data0": "5448298.7000",
                "date0": "2020-03-01"
            },
            {
                "individual0": "658",
                "individual_name0": "inv_22",
                "data0": "5451655.5000",
                "date0": "2020-03-02"
            },
            {
                "individual0": "658",
                "individual_name0": "inv_22",
                "data0": "5455074.6000",
                "date0": "2020-03-03"
            },
            {
                "individual0": "658",
                "individual_name0": "inv_22",
                "data0": "5458705.9000",
                "date0": "2020-03-04"
            },
            {
                "individual0": "658",
                "individual_name0": "inv_22",
                "data0": "5462201.6000",
                "date0": "2020-03-05"
            },
            {
                "individual0": "658",
                "individual_name0": "inv_22",
                "data0": "5465583.1000",
                "date0": "2020-03-06"
            },
            {
                "individual0": "658",
                "individual_name0": "inv_22",
                "data0": "5469458.1000",
                "date0": "2020-03-07"
            },
            {
                "individual0": "658",
                "individual_name0": "inv_22",
                "data0": "5473411.7000",
                "date0": "2020-03-08"
            },
            {
                "individual0": "658",
                "individual_name0": "inv_22",
                "data0": "5477290.0000",
                "date0": "2020-03-09"
            },
            {
                "individual0": "658",
                "individual_name0": "inv_22",
                "data0": "5480528.3000",
                "date0": "2020-03-10"
            },
            {
                "individual0": "658",
                "individual_name0": "inv_22",
                "data0": "5483374.7000",
                "date0": "2020-03-11"
            },
            {
                "individual0": "659",
                "individual_name0": "inv_23",
                "data0": "5539433.0000",
                "date0": "2020-03-01"
            },
            {
                "individual0": "659",
                "individual_name0": "inv_23",
                "data0": "5542900.6000",
                "date0": "2020-03-02"
            },
            {
                "individual0": "659",
                "individual_name0": "inv_23",
                "data0": "5546433.1000",
                "date0": "2020-03-03"
            },
            {
                "individual0": "659",
                "individual_name0": "inv_23",
                "data0": "5550207.8000",
                "date0": "2020-03-04"
            },
            {
                "individual0": "659",
                "individual_name0": "inv_23",
                "data0": "5553837.5000",
                "date0": "2020-03-05"
            },
            {
                "individual0": "659",
                "individual_name0": "inv_23",
                "data0": "5557328.0000",
                "date0": "2020-03-06"
            },
            {
                "individual0": "659",
                "individual_name0": "inv_23",
                "data0": "5561289.2000",
                "date0": "2020-03-07"
            },
            {
                "individual0": "659",
                "individual_name0": "inv_23",
                "data0": "5565346.0000",
                "date0": "2020-03-08"
            },
            {
                "individual0": "659",
                "individual_name0": "inv_23",
                "data0": "5569333.3000",
                "date0": "2020-03-09"
            },
            {
                "individual0": "659",
                "individual_name0": "inv_23",
                "data0": "5572664.6000",
                "date0": "2020-03-10"
            },
            {
                "individual0": "659",
                "individual_name0": "inv_23",
                "data0": "5575615.0000",
                "date0": "2020-03-11"
            },
            {
                "individual0": "660",
                "individual_name0": "inv_24",
                "data0": "6013503.0000",
                "date0": "2020-03-01"
            },
            {
                "individual0": "660",
                "individual_name0": "inv_24",
                "data0": "6017583.7000",
                "date0": "2020-03-02"
            },
            {
                "individual0": "660",
                "individual_name0": "inv_24",
                "data0": "6021740.2000",
                "date0": "2020-03-03"
            },
            {
                "individual0": "660",
                "individual_name0": "inv_24",
                "data0": "6026190.9000",
                "date0": "2020-03-04"
            },
            {
                "individual0": "660",
                "individual_name0": "inv_24",
                "data0": "6030488.5000",
                "date0": "2020-03-05"
            },
            {
                "individual0": "660",
                "individual_name0": "inv_24",
                "data0": "6034540.4000",
                "date0": "2020-03-06"
            },
            {
                "individual0": "660",
                "individual_name0": "inv_24",
                "data0": "6039235.8000",
                "date0": "2020-03-07"
            },
            {
                "individual0": "660",
                "individual_name0": "inv_24",
                "data0": "6044034.7000",
                "date0": "2020-03-08"
            },
            {
                "individual0": "660",
                "individual_name0": "inv_24",
                "data0": "6048739.0000",
                "date0": "2020-03-09"
            },
            {
                "individual0": "660",
                "individual_name0": "inv_24",
                "data0": "6052633.3000",
                "date0": "2020-03-10"
            },
            {
                "individual0": "660",
                "individual_name0": "inv_24",
                "data0": "6056078.9000",
                "date0": "2020-03-11"
            },
            {
                "individual0": "661",
                "individual_name0": "inv_25",
                "data0": "5454649.1000",
                "date0": "2020-03-01"
            },
            {
                "individual0": "661",
                "individual_name0": "inv_25",
                "data0": "5458058.3000",
                "date0": "2020-03-02"
            },
            {
                "individual0": "661",
                "individual_name0": "inv_25",
                "data0": "5461511.2000",
                "date0": "2020-03-03"
            },
            {
                "individual0": "661",
                "individual_name0": "inv_25",
                "data0": "5465175.3000",
                "date0": "2020-03-04"
            },
            {
                "individual0": "661",
                "individual_name0": "inv_25",
                "data0": "5468737.6000",
                "date0": "2020-03-05"
            },
            {
                "individual0": "661",
                "individual_name0": "inv_25",
                "data0": "5472148.7000",
                "date0": "2020-03-06"
            },
            {
                "individual0": "661",
                "individual_name0": "inv_25",
                "data0": "5476072.2000",
                "date0": "2020-03-07"
            },
            {
                "individual0": "661",
                "individual_name0": "inv_25",
                "data0": "5480064.9000",
                "date0": "2020-03-08"
            },
            {
                "individual0": "661",
                "individual_name0": "inv_25",
                "data0": "5483979.6000",
                "date0": "2020-03-09"
            },
            {
                "individual0": "661",
                "individual_name0": "inv_25",
                "data0": "5487241.4000",
                "date0": "2020-03-10"
            },
            {
                "individual0": "661",
                "individual_name0": "inv_25",
                "data0": "5490116.8000",
                "date0": "2020-03-11"
            },
            {
                "individual0": "662",
                "individual_name0": "inv_26",
                "data0": "5550760.1000",
                "date0": "2020-03-01"
            },
            {
                "individual0": "662",
                "individual_name0": "inv_26",
                "data0": "5554198.2000",
                "date0": "2020-03-02"
            },
            {
                "individual0": "662",
                "individual_name0": "inv_26",
                "data0": "5557662.3000",
                "date0": "2020-03-03"
            },
            {
                "individual0": "662",
                "individual_name0": "inv_26",
                "data0": "5561345.1000",
                "date0": "2020-03-04"
            },
            {
                "individual0": "662",
                "individual_name0": "inv_26",
                "data0": "5564927.1000",
                "date0": "2020-03-05"
            },
            {
                "individual0": "662",
                "individual_name0": "inv_26",
                "data0": "5568231.7000",
                "date0": "2020-03-06"
            },
            {
                "individual0": "662",
                "individual_name0": "inv_26",
                "data0": "5572166.3000",
                "date0": "2020-03-07"
            },
            {
                "individual0": "662",
                "individual_name0": "inv_26",
                "data0": "5576170.7000",
                "date0": "2020-03-08"
            },
            {
                "individual0": "662",
                "individual_name0": "inv_26",
                "data0": "5580090.1000",
                "date0": "2020-03-09"
            },
            {
                "individual0": "662",
                "individual_name0": "inv_26",
                "data0": "5583366.2000",
                "date0": "2020-03-10"
            },
            {
                "individual0": "662",
                "individual_name0": "inv_26",
                "data0": "5586249.8000",
                "date0": "2020-03-11"
            },
            {
                "individual0": "663",
                "individual_name0": "inv_27",
                "data0": "5890592.6000",
                "date0": "2020-03-01"
            },
            {
                "individual0": "663",
                "individual_name0": "inv_27",
                "data0": "5894658.3000",
                "date0": "2020-03-02"
            },
            {
                "individual0": "663",
                "individual_name0": "inv_27",
                "data0": "5898770.6000",
                "date0": "2020-03-03"
            },
            {
                "individual0": "663",
                "individual_name0": "inv_27",
                "data0": "5903202.1000",
                "date0": "2020-03-04"
            },
            {
                "individual0": "663",
                "individual_name0": "inv_27",
                "data0": "5907451.8000",
                "date0": "2020-03-05"
            },
            {
                "individual0": "663",
                "individual_name0": "inv_27",
                "data0": "5911511.3000",
                "date0": "2020-03-06"
            },
            {
                "individual0": "663",
                "individual_name0": "inv_27",
                "data0": "5916156.7000",
                "date0": "2020-03-07"
            },
            {
                "individual0": "663",
                "individual_name0": "inv_27",
                "data0": "5920905.5000",
                "date0": "2020-03-08"
            },
            {
                "individual0": "663",
                "individual_name0": "inv_27",
                "data0": "5925559.1000",
                "date0": "2020-03-09"
            },
            {
                "individual0": "663",
                "individual_name0": "inv_27",
                "data0": "5929415.8000",
                "date0": "2020-03-10"
            },
            {
                "individual0": "663",
                "individual_name0": "inv_27",
                "data0": "5932827.3000",
                "date0": "2020-03-11"
            },
            {
                "individual0": "1075",
                "individual_name0": "inv_28",
                "data0": "5633652.7000",
                "date0": "2020-03-01"
            },
            {
                "individual0": "1075",
                "individual_name0": "inv_28",
                "data0": "5637120.8000",
                "date0": "2020-03-02"
            },
            {
                "individual0": "1075",
                "individual_name0": "inv_28",
                "data0": "5640634.3000",
                "date0": "2020-03-03"
            },
            {
                "individual0": "1075",
                "individual_name0": "inv_28",
                "data0": "5644411.9000",
                "date0": "2020-03-04"
            },
            {
                "individual0": "1075",
                "individual_name0": "inv_28",
                "data0": "5648054.9000",
                "date0": "2020-03-05"
            },
            {
                "individual0": "1075",
                "individual_name0": "inv_28",
                "data0": "5651533.4000",
                "date0": "2020-03-06"
            },
            {
                "individual0": "1075",
                "individual_name0": "inv_28",
                "data0": "5655505.4000",
                "date0": "2020-03-07"
            },
            {
                "individual0": "1075",
                "individual_name0": "inv_28",
                "data0": "5659561.7000",
                "date0": "2020-03-08"
            },
            {
                "individual0": "1075",
                "individual_name0": "inv_28",
                "data0": "5663550.2000",
                "date0": "2020-03-09"
            },
            {
                "individual0": "1075",
                "individual_name0": "inv_28",
                "data0": "5666880.4000",
                "date0": "2020-03-10"
            },
            {
                "individual0": "1075",
                "individual_name0": "inv_28",
                "data0": "5669835.5000",
                "date0": "2020-03-11"
            },
            {
                "individual0": "1076",
                "individual_name0": "inv_29",
                "data0": "4486007.4000",
                "date0": "2020-03-01"
            },
            {
                "individual0": "1076",
                "individual_name0": "inv_29",
                "data0": "4490016.0000",
                "date0": "2020-03-02"
            },
            {
                "individual0": "1076",
                "individual_name0": "inv_29",
                "data0": "4494324.4000",
                "date0": "2020-03-03"
            },
            {
                "individual0": "1076",
                "individual_name0": "inv_29",
                "data0": "4498888.8000",
                "date0": "2020-03-04"
            },
            {
                "individual0": "1076",
                "individual_name0": "inv_29",
                "data0": "4503295.4000",
                "date0": "2020-03-05"
            },
            {
                "individual0": "1076",
                "individual_name0": "inv_29",
                "data0": "4507419.7000",
                "date0": "2020-03-06"
            },
            {
                "individual0": "1076",
                "individual_name0": "inv_29",
                "data0": "4512139.2000",
                "date0": "2020-03-07"
            },
            {
                "individual0": "1076",
                "individual_name0": "inv_29",
                "data0": "4517036.2000",
                "date0": "2020-03-08"
            },
            {
                "individual0": "1076",
                "individual_name0": "inv_29",
                "data0": "4521848.1000",
                "date0": "2020-03-09"
            },
            {
                "individual0": "1076",
                "individual_name0": "inv_29",
                "data0": "4525824.5000",
                "date0": "2020-03-10"
            },
            {
                "individual0": "1076",
                "individual_name0": "inv_29",
                "data0": "4529323.7000",
                "date0": "2020-03-11"
            },
            {
                "individual0": "1077",
                "individual_name0": "inv_30",
                "data0": "5210843.3000",
                "date0": "2020-03-01"
            },
            {
                "individual0": "1077",
                "individual_name0": "inv_30",
                "data0": "5214851.9000",
                "date0": "2020-03-02"
            },
            {
                "individual0": "1077",
                "individual_name0": "inv_30",
                "data0": "5218892.9000",
                "date0": "2020-03-03"
            },
            {
                "individual0": "1077",
                "individual_name0": "inv_30",
                "data0": "5223146.5000",
                "date0": "2020-03-04"
            },
            {
                "individual0": "1077",
                "individual_name0": "inv_30",
                "data0": "5227078.4000",
                "date0": "2020-03-05"
            },
            {
                "individual0": "1077",
                "individual_name0": "inv_30",
                "data0": "5231179.7000",
                "date0": "2020-03-06"
            },
            {
                "individual0": "1077",
                "individual_name0": "inv_30",
                "data0": "5235681.2000",
                "date0": "2020-03-07"
            },
            {
                "individual0": "1077",
                "individual_name0": "inv_30",
                "data0": "5240256.7000",
                "date0": "2020-03-08"
            },
            {
                "individual0": "1077",
                "individual_name0": "inv_30",
                "data0": "5244625.1000",
                "date0": "2020-03-09"
            },
            {
                "individual0": "1077",
                "individual_name0": "inv_30",
                "data0": "5248332.9000",
                "date0": "2020-03-10"
            },
            {
                "individual0": "1077",
                "individual_name0": "inv_30",
                "data0": "5251889.4000",
                "date0": "2020-03-11"
            }
        ]
    ]   
    }
    else if(graphID === "407" || graphID === "408" || graphID === "409"){
        arrayResp[graphID] = [
               [
                  {
                     "individual_name0":"Import",
                     "data0":"1200",
                     "date0":"2020-03-01",
                     "tariff0":"5.45"
                  },
                  {
                     "individual_name0":"Import",
                     "data0":"1224",
                     "date0":"2020-03-02",
                     "tariff0":"5.45"
                  },
                  {
                     "individual_name0":"Import",
                     "data0":"1176",
                     "date0":"2020-03-03",
                     "tariff0":"5.45"
                  },
                  {
                     "individual_name0":"Import",
                     "data0":"1200",
                     "date0":"2020-03-04",
                     "tariff0":"5.45"
                  },
                  {
                     "individual_name0":"Import",
                     "data0":"1176",
                     "date0":"2020-03-05",
                     "tariff0":"5.45"
                  },
                  {
                     "individual_name0":"Import",
                     "data0":"1416",
                     "date0":"2020-03-06",
                     "tariff0":"5.45"
                  },
                  {
                     "individual_name0":"Import",
                     "data0":"1272",
                     "date0":"2020-03-07",
                     "tariff0":"5.45"
                  },
                  {
                     "individual_name0":"Import",
                     "data0":"1224",
                     "date0":"2020-03-08",
                     "tariff0":"5.45"
                  },
                  {
                     "individual_name0":"Import",
                     "data0":"1200",
                     "date0":"2020-03-09",
                     "tariff0":"5.45"
                  },
                  {
                     "individual_name0":"Import",
                     "data0":"1248",
                     "date0":"2020-03-10",
                     "tariff0":"5.45"
                  },
                  {
                     "individual_name0":"Import",
                     "data0":"1200",
                     "date0":"2020-03-11",
                     "tariff0":"5.45"
                  }
               ]
            ]
    }
    else if(graphID === "411" || graphID === "412" || graphID === "413"){
        arrayResp[graphID] = [
               [
                  {
                     "individual_name0":"Sensor box_40 MW OPEN",
                     "data0":"0.000000",
                     "date0":"2020-03-12",
                     "time0":"00:00:00"
                  },
                  {
                     "individual_name0":"Sensor box_40 MW OPEN",
                     "data0":"0.000000",
                     "date0":"2020-03-12",
                     "time0":"00:15:00"
                  },
                  {
                     "individual_name0":"Sensor box_40 MW OPEN",
                     "data0":"0.000000",
                     "date0":"2020-03-12",
                     "time0":"00:30:00"
                  },
                  {
                     "individual_name0":"Sensor box_40 MW OPEN",
                     "data0":"0.000000",
                     "date0":"2020-03-12",
                     "time0":"00:45:00"
                  },
                  {
                     "individual_name0":"Sensor box_40 MW OPEN",
                     "data0":"0.000000",
                     "date0":"2020-03-12",
                     "time0":"01:00:00"
                  },
                  {
                     "individual_name0":"Sensor box_40 MW OPEN",
                     "data0":"0.000000",
                     "date0":"2020-03-12",
                     "time0":"01:15:00"
                  },
                  {
                     "individual_name0":"Sensor box_40 MW OPEN",
                     "data0":"0.029126",
                     "date0":"2020-03-12",
                     "time0":"01:30:00"
                  },
                  {
                     "individual_name0":"Sensor box_40 MW OPEN",
                     "data0":"0.028846",
                     "date0":"2020-03-12",
                     "time0":"01:45:00"
                  },
                  {
                     "individual_name0":"Sensor box_40 MW OPEN",
                     "data0":"0.000000",
                     "date0":"2020-03-12",
                     "time0":"02:00:00"
                  },
                  {
                     "individual_name0":"Sensor box_40 MW OPEN",
                     "data0":"0.000000",
                     "date0":"2020-03-12",
                     "time0":"02:15:00"
                  },
                  {
                     "individual_name0":"Sensor box_40 MW OPEN",
                     "data0":"0.000000",
                     "date0":"2020-03-12",
                     "time0":"02:30:00"
                  },
                  {
                     "individual_name0":"Sensor box_40 MW OPEN",
                     "data0":"0.004831",
                     "date0":"2020-03-12",
                     "time0":"02:45:00"
                  },
                  {
                     "individual_name0":"Sensor box_40 MW OPEN",
                     "data0":"0.000000",
                     "date0":"2020-03-12",
                     "time0":"03:00:00"
                  },
                  {
                     "individual_name0":"Sensor box_40 MW OPEN",
                     "data0":"0.000000",
                     "date0":"2020-03-12",
                     "time0":"03:15:00"
                  },
                  {
                     "individual_name0":"Sensor box_40 MW OPEN",
                     "data0":"0.000000",
                     "date0":"2020-03-12",
                     "time0":"03:30:00"
                  }
               ]
            ]
    }
    else if(graphID === "564" || graphID === "429" || graphID === "430"){

        arrayResp[graphID] = [
               [
                  {
                     "individual_name0":"Net generation",
                     "data0":"6108",
                     "date0":"2020-03-01",
                     "tariff0":"5.43"
                  },
                  {
                     "individual_name0":"Net generation",
                     "data0":"4418",
                     "date0":"2020-03-02",
                     "tariff0":"5.43"
                  },
                  {
                     "individual_name0":"Net generation",
                     "data0":"6376",
                     "date0":"2020-03-03",
                     "tariff0":"5.43"
                  },
                  {
                     "individual_name0":"Net generation",
                     "data0":"5442.4",
                     "date0":"2020-03-04",
                     "tariff0":"5.43"
                  },
                  {
                     "individual_name0":"Net generation",
                     "data0":"4748.2",
                     "date0":"2020-03-05",
                     "tariff0":"5.43"
                  },
                  {
                     "individual_name0":"Net generation",
                     "data0":"7674",
                     "date0":"2020-03-07",
                     "tariff0":"5.43"
                  },
                  {
                     "individual_name0":"Net generation",
                     "data0":"7338.8",
                     "date0":"2020-03-08",
                     "tariff0":"5.43"
                  },
                  {
                     "individual_name0":"Net generation",
                     "data0":"8112",
                     "date0":"2020-03-09",
                     "tariff0":"5.43"
                  },
                  {
                     "individual_name0":"Net generation",
                     "data0":"7194.6",
                     "date0":"2020-03-10",
                     "tariff0":"5.43"
                  }
               ],
               [
                  {
                     "individual_name1":"Budget generation",
                     "data1":"4122.18870967742",
                     "date1":"2020-03-01"
                  },
                  {
                     "individual_name1":"Budget generation",
                     "data1":"4122.18870967742",
                     "date1":"2020-03-02"
                  },
                  {
                     "individual_name1":"Budget generation",
                     "data1":"4122.18870967742",
                     "date1":"2020-03-03"
                  },
                  {
                     "individual_name1":"Budget generation",
                     "data1":"4122.18870967742",
                     "date1":"2020-03-04"
                  },
                  {
                     "individual_name1":"Budget generation",
                     "data1":"4122.18870967742",
                     "date1":"2020-03-05"
                  },
                  {
                     "individual_name1":"Budget generation",
                     "data1":"4122.18870967742",
                     "date1":"2020-03-06"
                  },
                  {
                     "individual_name1":"Budget generation",
                     "data1":"4122.18870967742",
                     "date1":"2020-03-07"
                  },
                  {
                     "individual_name1":"Budget generation",
                     "data1":"4122.18870967742",
                     "date1":"2020-03-08"
                  },
                  {
                     "individual_name1":"Budget generation",
                     "data1":"4122.18870967742",
                     "date1":"2020-03-09"
                  },
                  {
                     "individual_name1":"Budget generation",
                     "data1":"4122.18870967742",
                     "date1":"2020-03-10"
                  },
                  {
                     "individual_name1":"Budget generation",
                     "data1":"4122.18870967742",
                     "date1":"2020-03-11"
                  }
               ],
               [
                  {
                     "individual_name2":"Lender Generation",
                     "data2":null,
                     "date2":"2020-03-01"
                  },
                  {
                     "individual_name2":"Lender Generation",
                     "data2":null,
                     "date2":"2020-03-02"
                  },
                  {
                     "individual_name2":"Lender Generation",
                     "data2":null,
                     "date2":"2020-03-03"
                  },
                  {
                     "individual_name2":"Lender Generation",
                     "data2":null,
                     "date2":"2020-03-04"
                  },
                  {
                     "individual_name2":"Lender Generation",
                     "data2":null,
                     "date2":"2020-03-05"
                  },
                  {
                     "individual_name2":"Lender Generation",
                     "data2":null,
                     "date2":"2020-03-06"
                  },
                  {
                     "individual_name2":"Lender Generation",
                     "data2":null,
                     "date2":"2020-03-07"
                  },
                  {
                     "individual_name2":"Lender Generation",
                     "data2":null,
                     "date2":"2020-03-08"
                  },
                  {
                     "individual_name2":"Lender Generation",
                     "data2":null,
                     "date2":"2020-03-09"
                  },
                  {
                     "individual_name2":"Lender Generation",
                     "data2":null,
                     "date2":"2020-03-10"
                  },
                  {
                     "individual_name2":"Lender Generation",
                     "data2":null,
                     "date2":"2020-03-11"
                  }
               ],
               [
                  {
                     "individual_name3":"Actual PLF on PPA Capacity",
                     "data3":"12.725",
                     "date3":"2020-03-01"
                  },
                  {
                     "individual_name3":"Actual PLF on PPA Capacity",
                     "data3":"9.204166666666667",
                     "date3":"2020-03-02"
                  },
                  {
                     "individual_name3":"Actual PLF on PPA Capacity",
                     "data3":"13.283333333333333",
                     "date3":"2020-03-03"
                  },
                  {
                     "individual_name3":"Actual PLF on PPA Capacity",
                     "data3":"11.338333333333333",
                     "date3":"2020-03-04"
                  },
                  {
                     "individual_name3":"Actual PLF on PPA Capacity",
                     "data3":"9.892083333333334",
                     "date3":"2020-03-05"
                  },
                  {
                     "individual_name3":"Actual PLF on PPA Capacity",
                     "data3":"15.9875",
                     "date3":"2020-03-07"
                  },
                  {
                     "individual_name3":"Actual PLF on PPA Capacity",
                     "data3":"15.289166666666667",
                     "date3":"2020-03-08"
                  },
                  {
                     "individual_name3":"Actual PLF on PPA Capacity",
                     "data3":"16.9",
                     "date3":"2020-03-09"
                  },
                  {
                     "individual_name3":"Actual PLF on PPA Capacity",
                     "data3":"14.98875",
                     "date3":"2020-03-10"
                  }
               ],
               [
                  {
                     "individual_name4":"Budget PLF on PPA Capacity",
                     "data4":"8.58789314516129",
                     "date4":"2020-03-01"
                  },
                  {
                     "individual_name4":"Budget PLF on PPA Capacity",
                     "data4":"8.58789314516129",
                     "date4":"2020-03-02"
                  },
                  {
                     "individual_name4":"Budget PLF on PPA Capacity",
                     "data4":"8.58789314516129",
                     "date4":"2020-03-03"
                  },
                  {
                     "individual_name4":"Budget PLF on PPA Capacity",
                     "data4":"8.58789314516129",
                     "date4":"2020-03-04"
                  },
                  {
                     "individual_name4":"Budget PLF on PPA Capacity",
                     "data4":"8.58789314516129",
                     "date4":"2020-03-05"
                  },
                  {
                     "individual_name4":"Budget PLF on PPA Capacity",
                     "data4":"8.58789314516129",
                     "date4":"2020-03-07"
                  },
                  {
                     "individual_name4":"Budget PLF on PPA Capacity",
                     "data4":"8.58789314516129",
                     "date4":"2020-03-08"
                  },
                  {
                     "individual_name4":"Budget PLF on PPA Capacity",
                     "data4":"8.58789314516129",
                     "date4":"2020-03-09"
                  },
                  {
                     "individual_name4":"Budget PLF on PPA Capacity",
                     "data4":"8.58789314516129",
                     "date4":"2020-03-10"
                  }
               ],
               [
                  {
                     "individual_name5":"LIE PLF on PPA Capacity",
                     "data5":"0",
                     "date5":"2020-03-01"
                  },
                  {
                     "individual_name5":"LIE PLF on PPA Capacity",
                     "data5":"0",
                     "date5":"2020-03-02"
                  },
                  {
                     "individual_name5":"LIE PLF on PPA Capacity",
                     "data5":"0",
                     "date5":"2020-03-03"
                  },
                  {
                     "individual_name5":"LIE PLF on PPA Capacity",
                     "data5":"0",
                     "date5":"2020-03-04"
                  },
                  {
                     "individual_name5":"LIE PLF on PPA Capacity",
                     "data5":"0",
                     "date5":"2020-03-05"
                  },
                  {
                     "individual_name5":"LIE PLF on PPA Capacity",
                     "data5":"0",
                     "date5":"2020-03-07"
                  },
                  {
                     "individual_name5":"LIE PLF on PPA Capacity",
                     "data5":"0",
                     "date5":"2020-03-08"
                  },
                  {
                     "individual_name5":"LIE PLF on PPA Capacity",
                     "data5":"0",
                     "date5":"2020-03-09"
                  },
                  {
                     "individual_name5":"LIE PLF on PPA Capacity",
                     "data5":"0",
                     "date5":"2020-03-10"
                  }
               ]
            ]
           
    }

    else if(graphID === "565" || graphID === "432" || graphID === "433"){
       
        arrayResp[graphID] = [
               [
                  {
                     "individual_name0":"Net generation",
                     "data0":"28217",
                     "date0":"2020-03-01",
                     "tariff0":"5.45"
                  },
                  {
                     "individual_name0":"Net generation",
                     "data0":"29296",
                     "date0":"2020-03-02",
                     "tariff0":"5.45"
                  },
                  {
                     "individual_name0":"Net generation",
                     "data0":"29346",
                     "date0":"2020-03-03",
                     "tariff0":"5.45"
                  },
                  {
                     "individual_name0":"Net generation",
                     "data0":"28736",
                     "date0":"2020-03-04",
                     "tariff0":"5.45"
                  },
                  {
                     "individual_name0":"Net generation",
                     "data0":"23834",
                     "date0":"2020-03-05",
                     "tariff0":"5.45"
                  },
                  {
                     "individual_name0":"Net generation",
                     "data0":"12568",
                     "date0":"2020-03-06",
                     "tariff0":"5.45"
                  },
                  {
                     "individual_name0":"Net generation",
                     "data0":"9605",
                     "date0":"2020-03-07",
                     "tariff0":"5.45"
                  },
                  {
                     "individual_name0":"Net generation",
                     "data0":"31567",
                     "date0":"2020-03-08",
                     "tariff0":"5.45"
                  },
                  {
                     "individual_name0":"Net generation",
                     "data0":"30027",
                     "date0":"2020-03-09",
                     "tariff0":"5.45"
                  },
                  {
                     "individual_name0":"Net generation",
                     "data0":"26077",
                     "date0":"2020-03-10",
                     "tariff0":"5.45"
                  }
               ],
               [
                  {
                     "individual_name1":"Budget generation",
                     "data1":"26801.246177419354",
                     "date1":"2020-03-01"
                  },
                  {
                     "individual_name1":"Budget generation",
                     "data1":"26801.246177419354",
                     "date1":"2020-03-02"
                  },
                  {
                     "individual_name1":"Budget generation",
                     "data1":"26801.246177419354",
                     "date1":"2020-03-03"
                  },
                  {
                     "individual_name1":"Budget generation",
                     "data1":"26801.246177419354",
                     "date1":"2020-03-04"
                  },
                  {
                     "individual_name1":"Budget generation",
                     "data1":"26801.246177419354",
                     "date1":"2020-03-05"
                  },
                  {
                     "individual_name1":"Budget generation",
                     "data1":"26801.246177419354",
                     "date1":"2020-03-06"
                  },
                  {
                     "individual_name1":"Budget generation",
                     "data1":"26801.246177419354",
                     "date1":"2020-03-07"
                  },
                  {
                     "individual_name1":"Budget generation",
                     "data1":"26801.246177419354",
                     "date1":"2020-03-08"
                  },
                  {
                     "individual_name1":"Budget generation",
                     "data1":"26801.246177419354",
                     "date1":"2020-03-09"
                  },
                  {
                     "individual_name1":"Budget generation",
                     "data1":"26801.246177419354",
                     "date1":"2020-03-10"
                  },
                  {
                     "individual_name1":"Budget generation",
                     "data1":"26801.246177419354",
                     "date1":"2020-03-11"
                  }
               ],
               [
                  {
                     "individual_name2":"Lender Generation",
                     "data2":null,
                     "date2":"2020-03-01"
                  },
                  {
                     "individual_name2":"Lender Generation",
                     "data2":null,
                     "date2":"2020-03-02"
                  },
                  {
                     "individual_name2":"Lender Generation",
                     "data2":null,
                     "date2":"2020-03-03"
                  },
                  {
                     "individual_name2":"Lender Generation",
                     "data2":null,
                     "date2":"2020-03-04"
                  },
                  {
                     "individual_name2":"Lender Generation",
                     "data2":null,
                     "date2":"2020-03-05"
                  },
                  {
                     "individual_name2":"Lender Generation",
                     "data2":null,
                     "date2":"2020-03-06"
                  },
                  {
                     "individual_name2":"Lender Generation",
                     "data2":null,
                     "date2":"2020-03-07"
                  },
                  {
                     "individual_name2":"Lender Generation",
                     "data2":null,
                     "date2":"2020-03-08"
                  },
                  {
                     "individual_name2":"Lender Generation",
                     "data2":null,
                     "date2":"2020-03-09"
                  },
                  {
                     "individual_name2":"Lender Generation",
                     "data2":null,
                     "date2":"2020-03-10"
                  },
                  {
                     "individual_name2":"Lender Generation",
                     "data2":null,
                     "date2":"2020-03-11"
                  }
               ],
               [
                  {
                     "individual_name3":"Actual PLF on Connected Capacity",
                     "data3":"21.299064009661837",
                     "date3":"2020-03-01"
                  },
                  {
                     "individual_name3":"Actual PLF on Connected Capacity",
                     "data3":"22.113526570048307",
                     "date3":"2020-03-02"
                  },
                  {
                     "individual_name3":"Actual PLF on Connected Capacity",
                     "data3":"22.151268115942027",
                     "date3":"2020-03-03"
                  },
                  {
                     "individual_name3":"Actual PLF on Connected Capacity",
                     "data3":"21.690821256038646",
                     "date3":"2020-03-04"
                  },
                  {
                     "individual_name3":"Actual PLF on Connected Capacity",
                     "data3":"17.990640096618357",
                     "date3":"2020-03-05"
                  },
                  {
                     "individual_name3":"Actual PLF on Connected Capacity",
                     "data3":"9.48671497584541",
                     "date3":"2020-03-06"
                  },
                  {
                     "individual_name3":"Actual PLF on Connected Capacity",
                     "data3":"7.250150966183575",
                     "date3":"2020-03-07"
                  },
                  {
                     "individual_name3":"Actual PLF on Connected Capacity",
                     "data3":"23.82774758454106",
                     "date3":"2020-03-08"
                  },
                  {
                     "individual_name3":"Actual PLF on Connected Capacity",
                     "data3":"22.665307971014492",
                     "date3":"2020-03-09"
                  },
                  {
                     "individual_name3":"Actual PLF on Connected Capacity",
                     "data3":"19.683725845410628",
                     "date3":"2020-03-10"
                  }
               ],
               [
                  {
                     "individual_name4":"Budget PLF on PPA Capacity",
                     "data4":"22.334371814516132",
                     "date4":"2020-03-01"
                  },
                  {
                     "individual_name4":"Budget PLF on PPA Capacity",
                     "data4":"22.334371814516132",
                     "date4":"2020-03-02"
                  },
                  {
                     "individual_name4":"Budget PLF on PPA Capacity",
                     "data4":"22.334371814516132",
                     "date4":"2020-03-03"
                  },
                  {
                     "individual_name4":"Budget PLF on PPA Capacity",
                     "data4":"22.334371814516132",
                     "date4":"2020-03-04"
                  },
                  {
                     "individual_name4":"Budget PLF on PPA Capacity",
                     "data4":"22.334371814516132",
                     "date4":"2020-03-05"
                  },
                  {
                     "individual_name4":"Budget PLF on PPA Capacity",
                     "data4":"22.334371814516132",
                     "date4":"2020-03-06"
                  },
                  {
                     "individual_name4":"Budget PLF on PPA Capacity",
                     "data4":"22.334371814516132",
                     "date4":"2020-03-07"
                  },
                  {
                     "individual_name4":"Budget PLF on PPA Capacity",
                     "data4":"22.334371814516132",
                     "date4":"2020-03-08"
                  },
                  {
                     "individual_name4":"Budget PLF on PPA Capacity",
                     "data4":"22.334371814516132",
                     "date4":"2020-03-09"
                  },
                  {
                     "individual_name4":"Budget PLF on PPA Capacity",
                     "data4":"22.334371814516132",
                     "date4":"2020-03-10"
                  }
               ],
               [
                  {
                     "individual_name5":"LIE PLF on PPA Capacity",
                     "data5":"0",
                     "date5":"2020-03-01"
                  },
                  {
                     "individual_name5":"LIE PLF on PPA Capacity",
                     "data5":"0",
                     "date5":"2020-03-02"
                  },
                  {
                     "individual_name5":"LIE PLF on PPA Capacity",
                     "data5":"0",
                     "date5":"2020-03-03"
                  },
                  {
                     "individual_name5":"LIE PLF on PPA Capacity",
                     "data5":"0",
                     "date5":"2020-03-04"
                  },
                  {
                     "individual_name5":"LIE PLF on PPA Capacity",
                     "data5":"0",
                     "date5":"2020-03-05"
                  },
                  {
                     "individual_name5":"LIE PLF on PPA Capacity",
                     "data5":"0",
                     "date5":"2020-03-06"
                  },
                  {
                     "individual_name5":"LIE PLF on PPA Capacity",
                     "data5":"0",
                     "date5":"2020-03-07"
                  },
                  {
                     "individual_name5":"LIE PLF on PPA Capacity",
                     "data5":"0",
                     "date5":"2020-03-08"
                  },
                  {
                     "individual_name5":"LIE PLF on PPA Capacity",
                     "data5":"0",
                     "date5":"2020-03-09"
                  },
                  {
                     "individual_name5":"LIE PLF on PPA Capacity",
                     "data5":"0",
                     "date5":"2020-03-10"
                  }
               ]
            ]
            
    }
    else if(graphID === "440" ){
        arrayResp[graphID] = [
               [
         
               ]
            ]
            
    }
    else if(graphID === "570" || graphID === "437" ){

       
        arrayResp[graphID] = [
            [
      
            ]
         ]
    }
    else if(graphID === "558" || graphID === "855" ){
        arrayResp[graphID] = [
            [
      
            ]
         ]
    }
    else if(graphID === "795" || graphID === "381" || graphID === "1001"){
        arrayResp[graphID] = [
               [
                  {
                     "individual_name0":"Actual Generation",
                     "data0":"3101113",
                     "plant0":"Punjab 1"
                  }
               ],
               [
                  {
                     "individual_name1":"Budget generation",
                     "data1":"3228814.779323083",
                     "plant1":"Punjab 1"
                  }
               ]
            ]
            
    }
        
     



    return arrayResp[graphID];
}

function doFormat(data) {

    let _yAxis = [];
    let i = 0;
    
    data && data.yAxis && data.yAxis.map(items => {
        if (!items.title.text.includes("null")) {
            _yAxis.push(items);
        }
    })
    data.yAxis = _yAxis;
    return data
}

export function getMakeGraph(data) {

    let defaultprops = {
        "allPlants":0,
        "canvas": "id",
        "dataFlag": 0,
        "externalDate": todayDate(),
        "externalParam": 0,
        "externalPlant": [
            "string"
        ],
        "fromDate":todayDate(),
        "graphId": 0,
        "plant": [],
        "toDate": todayDate()
    }


    return (dispatch) => {
        dispatch({
            type: CLEAR_GRAPH_RESPONSE
           
        })
        if (data.pageID && data.subPageID) {
            const graphIDs = graphPageList(data.pageID, data.subPageID);
            if (graphIDs) {
                graphIDs && graphIDs.length > 0 && graphIDs.map((item, index) => {
                    service.makeGraph({ ...defaultprops, graphId: item }).then(response => {
                        const resp = commonGraph.commonGraph(response.data, '', '', '', '');
                        const data = doFormat(resp);
                        dispatch({
                            type: GET_GAUGE_REPORT_RESPONSE,
                            payload: { "graphNo": "gaugeGraphs" + index, "canvas": data.graphId,"apiResponseNo":"apiResponse"+index, response: data, apiResponse:response.data}//graphFormat1(response.data, item) }
                        })
                        // }
                        // else {
                        //     dispatch({
                        //         type: GET_GAUGE_REPORT_RESPONSE,
                        //         payload: { "graphNo": "gaugeGraphs" + index, "canvas": data.graphId, response: graphFormat(response.data) }
                        //     })
                        // }

                    })

                })
            }

        }
    }
}

function graphPageList(pageID, subPageID) {
    const graphList = [
        { pageID: 1, subPage: 1, graphIDs: ["866", "867", "888"] },
        { pageID: 1, subPage: 2, graphIDs: ["407", "408", "409"] },
        { pageID: 1, subPage: 3, graphIDs: ["411", "412", "413"] },
        { pageID: 1, subPage: 4, graphIDs: ["564", "429", "430"] },
        { pageID: 1, subPage: 5, graphIDs: ["565", "432", "433"] },
        { pageID: 1, subPage: 6, graphIDs: ["440"] },
        { pageID: 1, subPage: 7, graphIDs: ["570", "437"] },
        { pageID: 1, subPage: 8, graphIDs: ["558", "855"] },
        { pageID: 1, subPage: 9, graphIDs: ["795", "381", "1001"] },
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