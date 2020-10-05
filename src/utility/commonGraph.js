import Highcharts from 'highcharts';

export default {
    commonGraph(response, url, graph, val, graphId) {
        let canvasId1 = {};
        let ctrlr = 'graph';
        let dataString = '';
        response.result = convertToJSON(response.result);
        if (response.graphType === 'basic' || response.graphType === 'pie') {

            let time = response.timePeriod;
            let report = '';
            if (time === "fyear" || time === "halfyearly") {
                report = 'YTD';
            }
            else if (time === "quarterly") {
                report = 'QTD';
            }
            else if (time === "month" || time === "bimonthly") {
                report = 'MTD';
            }
            else {
                report = 'DTD';
            }
            // let unit = '';
            // if (graph === 225){
            //     unit = "day";//response.unit;
            // } else if (graph === 838){
            //     unit = 'month'
            // } else {
            let unit = response.timeGroup;
            // }
            let legendValue = 1;//response.legend;
            let xAxis = response.xAxisData;
            let y1Title = response.y1Title;
            let y1Unit = "mW";
            let y1BaseColor = response.y1BaseColor;
            let y1Min = response.y1Min;
            let y1Max = response.y1Max;
            let y21Title = response.y21Title;
            let y21Unit = response.y21Unit;
            let y21BaseColor = response.y21BaseColor;
            let y21Min = response.y21Min;
            let y21Max = response.y21Max;
            let y22Title = response.y22Title;
            let y22Unit = response.y22Unit;
            let y22BaseColor = response.y22BaseColor;
            let y22Min = response.y22Min;
            let y22Max = response.y22Max;
            let y23Title = response.y23Title;
            let y23Unit = response.y23Unit;
            let y23BaseColor = response.y23BaseColor;
            let y23Min = response.y23Min;
            let y23Max = response.y23Max;
            let deviceArr = response.device.split('!@#');
            let channelArr = response.channel.split(',');
            let plantArr = [];
            let graph_name = response.graphName.toLowerCase();
            let graphId = response.graphId;
            let graphName = response.graphName;
            if (response.plantId === null) {
                plantArr = [];
            } else {
                plantArr = response.plantId.toString().split(',');
            }
            let labelArr = response.label.split(',');
            let chartArr = response.chartType.split(',');
            let colorArr = response.colorCode.split(',');
            let yaxisArr = response.yAxis.toString().split(',');
            let percentArr = response.coefficient.split(',');
            let dataArr = [];
            let seriesArr = [];
            let hourUtc = null;
            let categoriesArr = [];
            let seriesNameArr = [];
            let revenueArr = [];
            let chartType = [];
            let colorType = [];
            let yAxisIndex = [];
            let dataVal;
            let cat = 0;
            let catIndex;
            let d = 0;
            response.result.map((value, i) => {
                let chkArr = ['individual', 'maxinvid'];
                let lblArr = ['Smu'];

                if ((inArray(deviceArr[i], chkArr) !== -1) || channelArr[i] === 'individual' || ((inArray(labelArr[i], lblArr) !== -1) && parseInt(plantArr[i]) > 0 && deviceArr[i] === 'cumulative')) {
                    let mainIndexIndul = 0;
                    let indexIndul = 0;
                    let indexIndulId = null;
                    let tempArr = [];
                    let seriesName = null;
                    let chartName = null;
                    let colorCode = null;
                    let yAxisVal = null;

                    if (value.length > 0) {
                        value.map((val, index) => {
console.log(val,'new value')
                            if (val['data' + i] !== null) {
                                dataVal = (val['data' + i])/1000;
                                console.log(dataVal,'dataVal')
                            } else {
                                dataVal = 0;
                            }

                            if (xAxis === 'time') {
                                if (checkQuarterTime(val['time' + i]) === true) {
                                    if (indexIndulId !== null && indexIndulId !== val['individual' + i]) {
                                        let d = dataArr.length;
                                        dataArr[d] = tempArr;
                                        seriesNameArr[d] = seriesName;
                                        chartType[d] = chartName;
                                        colorType[d] = colorCode;
                                        yAxisIndex[d] = yAxisVal;
                                        tempArr = [];
                                        indexIndul = 0;
                                    }
                                    seriesName = val['individual_name' + i];
                                    indexIndulId = val['individual' + i];
                                    chartName = chartArr[i];
                                    colorCode = colorArr[i];
                                    yAxisVal = yaxisArr[i];
                                    if (unit === 'year') {
                                        let yeildVal = (parseFloat(percentArr[i]) * parseFloat(dataVal)).toFixed(2);
                                        tempArr[indexIndul] = [Date.UTC(val['year' + i]), parseFloat(yeildVal)];
                                        indexIndul++;
                                    } else if (unit === 'month') {
                                        let yeildVal = (parseFloat(percentArr[i]) * parseFloat(dataVal)).toFixed(2);
                                        tempArr[indexIndul] = [Date.UTC(val['year' + i], val['month' + i] - 1), parseFloat(yeildVal)];
                                        indexIndul++;
                                    } else if (unit === 'day') {
                                        let daySplit = val['date' + i].split('-');
                                        if (daySplit[1].charAt(0) === '0') {
                                            daySplit[1] = daySplit[1].charAt(1);
                                        }
                                        let yeildVal = (parseFloat(percentArr[i]) * parseFloat(dataVal)).toFixed(2);
                                        tempArr[indexIndul] = [Date.UTC(daySplit[0], parseInt(daySplit[1]) - 1, daySplit[2]), parseFloat(yeildVal)];
                                        indexIndul++;
                                    } else if (unit === 'hour' && val['time' + i] !== undefined) {
                                        let daySplit = val['date' + i].split('-');
                                        let hourSplit = val['time' + i].split(':');
                                        if (daySplit[1].charAt(0) === '0') {
                                            daySplit[1] = daySplit[1].charAt(1);
                                        }
                                        let yeildVal = (parseFloat(percentArr[i]) * parseFloat(dataVal)).toFixed(2);
                                        tempArr[indexIndul] = [Date.UTC(daySplit[0], parseInt(daySplit[1]) - 1, daySplit[2], hourSplit[0], hourSplit[1]), parseFloat(yeildVal)];
                                        indexIndul++;
                                    } else if (val['time' + i] !== undefined) {
                                        let daySplit = val['date' + i].split('-');
                                        let hourSplit = val['time' + i].split(':');
                                        if (daySplit[1].charAt(0) === '0') {
                                            daySplit[1] = daySplit[1].charAt(1);
                                        }
                                        let yeildVal = (parseFloat(percentArr[i]) * parseFloat(dataVal)).toFixed(2);
                                        tempArr[indexIndul] = [Date.UTC(daySplit[0], parseInt(daySplit[1]) - 1, daySplit[2], hourSplit[0], hourSplit[1]), parseFloat(yeildVal)];
                                        indexIndul++;
                                    }
                                }
                            } else if (xAxis === '24-hours') {
                                if (checkQuarterTime(val['time' + i]) === true) {
                                    if (indexIndulId !== null && indexIndulId !== val['individual' + i]) {
                                        let d = dataArr.length;
                                        dataArr[d] = tempArr;
                                        seriesNameArr[d] = seriesName;
                                        chartType[d] = chartName;
                                        colorType[d] = colorCode;
                                        yAxisIndex[d] = yAxisVal;
                                        tempArr = [];
                                        indexIndul = 0;
                                    }
                                    seriesName = val['individual_name' + i];
                                    indexIndulId = val['individual' + i];
                                    chartName = chartArr[i];
                                    colorCode = colorArr[i];
                                    yAxisVal = yaxisArr[i];
                                    let hourSplit = val['time' + i].split(':');
                                    let yeildVal = (parseFloat(percentArr[i]) * parseFloat(dataVal)).toFixed(2);


                                    tempArr[indexIndul] = [Date.UTC('', '', '', hourSplit[0], hourSplit[1], '0'), parseFloat(yeildVal)];
                                    indexIndul++;
                                }
                            } else {
                                if (index === 0) {
                                    indexIndul = -1;
                                }
                                if (inArray(val[xAxis + i], categoriesArr) < 0) {
                                    categoriesArr[cat] = val[xAxis + i];
                                    cat++;
                                    indexIndul++;
                                    mainIndexIndul = 0;
                                }
                                if (Array.isArray(dataArr[mainIndexIndul]) === false) {
                                    dataArr[mainIndexIndul] = [];
                                }
                                let yeildVal = (parseFloat(percentArr[i]) * parseFloat(dataVal)).toFixed(4);
                                dataArr[mainIndexIndul][indexIndul] = parseFloat(yeildVal);
                                chartType[mainIndexIndul] = chartArr[i];
                                colorType[mainIndexIndul] = colorArr[i];
                                yAxisIndex[mainIndexIndul] = yaxisArr[i];
                                mainIndexIndul++;
                                seriesNameArr[index] = val['individual_name' + i];
                            }

                        })

                        if ((xAxis === 'time' || xAxis === '24-hours') && tempArr.length > 0) {
                            let d = dataArr.length;
                            dataArr[d] = tempArr;
                            seriesNameArr[d] = seriesName;
                            chartType[d] = chartName;
                            colorType[d] = colorCode;
                            yAxisIndex[d] = yAxisVal;
                        }
                    }
                }
                else if (deviceArr[i] === 'cumulative') {
                    if (value.length > 0) {
                        if (xAxis === 'time' || xAxis === '24-hours') {
                            let d = dataArr.length;
                            dataArr[d] = [];
                        }
                        let w = 0;
                        value.map((index, val) => {
                            if (val['data' + i] !== null) {
                                dataVal = val['data' + i];
                            } else {
                                dataVal = 0;
                            }

                            if (xAxis === 'time') {
                                if (checkQuarterTime(val['time' + i]) === true) {
                                    if (unit === 'year') {
                                        let yeildVal = (parseFloat(percentArr[i]) * parseFloat(dataVal)).toFixed(2);
                                        if (time === 'fyear' || time === 'rolling_year' || time === 'year' || time === "halfyearly") {
                                            dataArr[d][index] = [val['year' + i], parseFloat(yeildVal)];
                                        } else {
                                            dataArr[d][index] = [Date.UTC(val['year' + i]), parseFloat(yeildVal)];
                                        }
                                    } else if (unit === 'month' || unit === 'bimonthly') {
                                        let yeildVal = (parseFloat(percentArr[i]) * parseFloat(dataVal)).toFixed(2);
                                        dataArr[d][index] = [Date.UTC(val['year' + i], val['month' + i] - 1), parseFloat(yeildVal)];
                                    } else if (unit === 'day') {
                                        let daySplit = val['date' + i].split('-');
                                        if (daySplit[1].charAt(0) === '0') {
                                            daySplit[1] = daySplit[1].charAt(1);
                                        }
                                        let yeildVal = (parseFloat(percentArr[i]) * parseFloat(dataVal)).toFixed(2);
                                        dataArr[d][index] = [Date.UTC(daySplit[0], parseInt(daySplit[1]) - 1, daySplit[2]), parseFloat(yeildVal)];
                                    } else if (unit === 'hour' && val['time' + i] !== undefined) {
                                        let daySplit = val['date' + i].split('-');
                                        let hourSplit = val['time' + i].split(':');
                                        if (daySplit[1].charAt(0) === '0') {
                                            daySplit[1] = daySplit[1].charAt(1);
                                        }
                                        let yeildVal = (parseFloat(percentArr[i]) * parseFloat(dataVal)).toFixed(2);
                                        dataArr[d][index] = [Date.UTC(daySplit[0], parseInt(daySplit[1]) - 1, daySplit[2], hourSplit[0], hourSplit[1]), parseFloat(yeildVal)];
                                    } else if (val['time' + i] !== undefined) {
                                        let daySplit = val['date' + i].split('-');
                                        let hourSplit = val['time' + i].split(':');
                                        if (daySplit[1].charAt(0) === '0') {
                                            daySplit[1] = daySplit[1].charAt(1);
                                        }
                                        let yeildVal = (parseFloat(percentArr[i]) * parseFloat(dataVal)).toFixed(2);
                                        dataArr[d][index] = [Date.UTC(daySplit[0], parseInt(daySplit[1]) - 1, daySplit[2], hourSplit[0], hourSplit[1]), parseFloat(yeildVal)];
                                    }
                                    seriesNameArr[d] = val['individual_name' + i];
                                    chartType[d] = chartArr[i];
                                    colorType[d] = colorArr[i];
                                    yAxisIndex[d] = yaxisArr[i];
                                }
                            } else if (xAxis === '24-hours') {
                                if (checkQuarterTime(val['time' + i]) === true) {
                                    let hourSplit = val['time' + i].split(':');
                                    let yeildVal = (parseFloat(percentArr[i]) * parseFloat(dataVal)).toFixed(2);

                                    dataArr[d][w] = [Date.UTC('', '', '', hourSplit[0], hourSplit[1], '0'), parseFloat(yeildVal)];
                                    seriesNameArr[d] = val['individual_name' + i];
                                    chartType[d] = chartArr[i];
                                    colorType[d] = colorArr[i];
                                    yAxisIndex[d] = yaxisArr[i];
                                    w++;
                                }
                            }
                            else {
                                if (inArray(val[xAxis + i], categoriesArr) < 0) {
                                    categoriesArr[cat] = val[xAxis + i];
                                    catIndex = cat;
                                    cat++;
                                } else {
                                    catIndex = inArray(val[xAxis + i], categoriesArr);
                                }
                                if (inArray(val['individual_name' + i], seriesNameArr) < 0) {
                                    let seriesIndex = seriesNameArr.length;
                                    seriesNameArr[seriesIndex] = val['individual_name' + i];
                                    if (Array.isArray(dataArr[seriesIndex]) === false) {
                                        dataArr[seriesIndex] = [];
                                    }
                                    if (dataVal !== 0) {
                                        let yeildVal = (parseFloat(percentArr[i]) * parseFloat(dataVal)).toFixed(4);
                                        dataArr[seriesIndex][catIndex] = [parseFloat(yeildVal)];
                                    } else {
                                        dataArr[seriesIndex][catIndex] = null;
                                    }
                                    chartType[seriesIndex] = chartArr[i];
                                    colorType[seriesIndex] = colorArr[i];
                                    yAxisIndex[seriesIndex] = yaxisArr[i];
                                } else {
                                    let seriesIndex = inArray(val['individual_name' + i], seriesNameArr);
                                    if (Array.isArray(dataArr[seriesIndex]) === false) {
                                        dataArr[seriesIndex] = [];
                                    }
                                    if (dataVal !== 0) {
                                        let yeildVal = (parseFloat(percentArr[i]) * parseFloat(dataVal)).toFixed(4);
                                        dataArr[seriesIndex][catIndex] = [parseFloat(yeildVal)];
                                    } else {
                                        dataArr[seriesIndex][catIndex] = null;
                                    }
                                }
                            }
                        });
                    }
                }
                else {
                    if (value.length > 0) {
                        if (xAxis === 'time' || xAxis === '24-hours') {
                            let d = dataArr.length;
                            dataArr[d] = [];
                        }

                        let w = 0;
                        value.map((index, val) => {
                            if (val['data' + i] !== null) {
                                dataVal = val['data' + i];
                            } else {
                                dataVal = 0;
                            }
                            let taVal = 0;
                            if (val['tariff' + i] !== null) {
                                taVal = parseFloat(parseFloat(Math.abs(val['tariff' + i])).toFixed(2));
                            } else {
                                taVal = 0;
                            }
                            let revenueVal = (dataVal * taVal);
                            if (xAxis === 'time') {
                                if (checkQuarterTime(val['time' + i]) === true) {
                                    if (unit === 'year') {
                                        let yeildVal = (parseFloat(percentArr[i]) * parseFloat(dataVal)).toFixed(2);
                                        if (graph_name.indexOf("plant availability") !== -1 || graph_name.indexOf("alert portfolio") !== -1 || graph_name.indexOf("pm task") !== -1) {
                                            if (time === 'fyear' || time === 'rolling_year' || time === 'year' || time === "halfyearly") {
                                                dataArr[d][index] = [val['year' + i], parseFloat(yeildVal)];
                                            } else {
                                                dataArr[d][index] = [Date.UTC(val['year' + i]), parseFloat(yeildVal)];
                                            }
                                        }
                                        else {
                                            if (time === 'fyear' || time === 'rolling_year' || time === 'year' || time === 'halfyearly') {
                                                dataArr[d][index] = { x: Date.UTC(val['year' + i]), y: parseFloat(yeildVal), 'revenue': revenueVal };
                                            } else {
                                                dataArr[d][index] = { x: Date.UTC(val['year' + i]), y: parseFloat(yeildVal), 'revenue': revenueVal };
                                            }
                                        }
                                    } else if (unit === 'month') {
                                        let yeildVal = (parseFloat(percentArr[i]) * parseFloat(dataVal)).toFixed(2);
                                        dataArr[d][index] = { x: Date.UTC(val['year' + i], val['month' + i] - 1), y: parseFloat(yeildVal), 'revenue': revenueVal };
                                    } else if (unit === 'day') {
                                        let daySplit = val['date' + i].split('-');
                                        if (daySplit[1].charAt(0) === '0') {
                                            daySplit[1] = daySplit[1].charAt(1);
                                        }
                                        let yeildVal = (parseFloat(percentArr[i]) * parseFloat(dataVal)).toFixed(2);
                                        dataArr[d][index] = { x: Date.UTC(daySplit[0], parseInt(daySplit[1]) - 1, daySplit[2]), y: parseFloat(yeildVal), 'revenue': revenueVal };
                                    } else if (unit === 'hour' && val['time' + i] !== undefined) {
                                        let daySplit = val['date' + i].split('-');
                                        let hourSplit = val['time' + i].split(':');
                                        if (daySplit[1].charAt(0) === '0') {
                                            daySplit[1] = daySplit[1].charAt(1);
                                        }
                                        let yeildVal = (parseFloat(percentArr[i]) * parseFloat(dataVal)).toFixed(2);
                                        dataArr[d][index] = { x: Date.UTC(daySplit[0], parseInt(daySplit[1]) - 1, daySplit[2], hourSplit[0], hourSplit[1]), y: parseFloat(yeildVal), 'revenue': revenueVal };
                                    } else if (val['time' + i] !== undefined) {
                                        let daySplit = val['date' + i].split('-');
                                        let hourSplit = val['time' + i].split(':');
                                        if (daySplit[1].charAt(0) === '0') {
                                            daySplit[1] = daySplit[1].charAt(1);
                                        }
                                        let yeildVal = (parseFloat(percentArr[i]) * parseFloat(dataVal)).toFixed(2);
                                        dataArr[d][index] = { x: Date.UTC(daySplit[0], parseInt(daySplit[1]) - 1, daySplit[2], hourSplit[0], hourSplit[1]), y: parseFloat(yeildVal), 'revenue': revenueVal };
                                    }
                                    seriesNameArr[d] = val['individual_name' + i];
                                    chartType[d] = chartArr[i];
                                    colorType[d] = colorArr[i];
                                    yAxisIndex[d] = yaxisArr[i];
                                }
                            } else if (xAxis === '24-hours') {
                                if (checkQuarterTime(val['time' + i]) === true) {
                                    let hourSplit = val['time' + i].split(':');
                                    let yeildVal = (parseFloat(percentArr[i]) * parseFloat(dataVal)).toFixed(2);


                                    dataArr[d][w] = [Date.UTC('', '', '', hourSplit[0], hourSplit[1], '0'), parseFloat(yeildVal)];
                                    seriesNameArr[d] = val['individual_name' + i];
                                    chartType[d] = chartArr[i];
                                    colorType[d] = colorArr[i];
                                    yAxisIndex[d] = yaxisArr[i];
                                    w++;
                                }
                            }
                            else {
                                if (inArray(val[xAxis + i], categoriesArr) < 0) {
                                    categoriesArr[cat] = val[xAxis + i];
                                    catIndex = cat;
                                    cat++;
                                } else {
                                    catIndex = inArray(val[xAxis + i], categoriesArr);
                                }
                                if (inArray(val['individual_name' + i], seriesNameArr) < 0) {
                                    let seriesIndex = seriesNameArr.length;
                                    seriesNameArr[seriesIndex] = val['individual_name' + i];
                                    if (Array.isArray(dataArr[seriesIndex]) === false) {
                                        dataArr[seriesIndex] = [];
                                    }
                                    if (dataVal !== 0) {
                                        let yeildVal = (parseFloat(percentArr[i]) * parseFloat(dataVal)).toFixed(4);
                                        dataArr[seriesIndex][catIndex] = [parseFloat(yeildVal)];
                                    } else {
                                        dataArr[seriesIndex][catIndex] = null;
                                    }
                                    chartType[seriesIndex] = chartArr[i];
                                    colorType[seriesIndex] = colorArr[i];
                                    yAxisIndex[seriesIndex] = yaxisArr[i];
                                } else {
                                    let seriesIndex = inArray(val['individual_name' + i], seriesNameArr);
                                    if (Array.isArray(dataArr[seriesIndex]) === false) {
                                        dataArr[seriesIndex] = [];
                                    }
                                    if (dataVal !== 0) {
                                        let yeildVal = (parseFloat(percentArr[i]) * parseFloat(dataVal)).toFixed(4);
                                        dataArr[seriesIndex][catIndex] = [parseFloat(yeildVal)];
                                    } else {
                                        dataArr[seriesIndex][catIndex] = null;
                                    }
                                }
                            }
                        });
                    }
                }

            });

            var splitPointStart = response.pointStart !== null ? response.pointStart.split('-'):[];
            var yv = 0;
            var yv1 = 0;

            for (var p = 0; p < dataArr.length; p++) {
                var ypoint = 0.0;
                if (dataArr[p].length > 0) {
                    if (yAxisIndex[p] === '0') {
                        var toolTipUnit = y1Unit;
                        if (inArray("1", yAxisIndex) !== -1) {
                            ypoint = Number((0.1 * (yv + 1)).toPrecision(1));
                            yv++;
                        }
                    } else if (yAxisIndex[p] === '1') {
                        var toolTipUnit = y21Unit;
                        if (inArray("1", yAxisIndex) !== -1) {
                            if (yv1 === 0) {
                                ypoint = Number((-0.1 * (yv1 + 1)).toPrecision(1));
                                yv1 = yv1 + 2;
                            }
                            else {
                                ypoint = Number((0.1 * (yv1 + 1)).toPrecision(1));
                                yv1 = yv1 + 3;
                            }

                        }
                    } else if (yAxisIndex[p] === '2') {
                        var toolTipUnit = y22Unit;
                    } else {
                        var toolTipUnit = y23Unit;
                    }
                    if (toolTipUnit === 'Blank') {
                        toolTipUnit = '';
                    }
                    if (xAxis === 'time') {
                        var y1Marker = {};
                        var y1Width = 2;
                        var chartTypeSeries = chartType[p];
                        if (chartTypeSeries === 'marker') {
                            chartTypeSeries = 'line';
                            y1Marker['enabled'] = true;
                            y1Marker['symbol'] = 'circle';
                            y1Marker['radius'] = 3;
                            y1Width = 0;
                        } else if (chartTypeSeries === 'line') {
                            y1Marker['enabled'] = false;
                        }
                        if (seriesNameArr[p] === "Net generation" && response.graphName.toLowerCase().indexOf("provisional") === -1) {

                            seriesArr[p] = {
                                name: seriesNameArr[p], yAxis: parseInt(yAxisIndex[p]), color: colorType[p], type: chartTypeSeries, marker: y1Marker, lineWidth: y1Width, data: (dataArr[p]).sort(), tooltip: {
                                    useHTML: true, headerFormat: '<small>{point.key}</small><table style="!important;height:300px;display:block;overflow-y:scroll;">',
                                    pointFormat: '<br/><tr><td>Revenue: {point.revenue:.2f} INR</td></tr><br/><tr><td style="color: {series.color};">{series.name}: </td>' + '<td style="text-align: right;"><b>{point.y} ' + toolTipUnit + '</b></td></tr>', footerFormat: '</table>', valueDecimals: 2
                                }, pointStart: Date.UTC(parseInt(splitPointStart[0]), (splitPointStart[1] - 1), parseInt(splitPointStart[2])),
                                pointInterval: response.pointInterval, pointPlacement: ypoint
                            };
                        } else {
                            let isGraphInNOCCPortal = response.label === "Inverter" && (response.channel === "Energy Today" || response.channel === "Energy Total");
                            if (isGraphInNOCCPortal) {
                                let date1 = response.fromDate
                                let date2 = response.toDate
                                date1 = date1.split('/');
                                date2 = date2.split('/');
                                var oneDay = 24 * 60 * 60 * 1000;
                                var firstDate = new Date(date1[2], date1[1], date1[0]);
                                var secondDate = new Date(date2[2], date2[1], date2[0]);
                                var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
                                var expectedInverterDataCount = diffDays + 1;
                                var currentData = [];
                                var details = "";
                                var barColorCode = "";
                                var actualInverterEntryCount = 0;
                                for (let i = 0; i < dataArr[p].length; i++) {
                                    details = dataArr[p][i];
                                    currentData.push({ x: details[0], y: details[1], color: colorType[p] });
                                    if (details[1] !== 0) {
                                        actualInverterEntryCount++;
                                    }
                                }
                                if (actualInverterEntryCount < expectedInverterDataCount) {
                                    barColorCode = 'red';
                                }
                                else {
                                    barColorCode = colorType[p];
                                }
                                dataArr[p] = currentData;
                                seriesArr[p] = {
                                    name: seriesNameArr[p],
                                    yAxis: parseInt(yAxisIndex[p]),
                                    color: barColorCode,
                                    type: chartTypeSeries,
                                    marker: y1Marker,
                                    lineWidth: y1Width,
                                    data: dataArr[p],
                                    tooltip: {
                                        shared: true,
                                        useHTML: true,
                                        xDateFormat: '%b \%Y',
                                        headerFormat: '<small>{point.key}</small><table style="!important;height:300px;display:block;overflow-y:scroll;">',
                                        pointFormat: '<br/><tr><td style="color: {series.color};">{series.name}: </td>' + '<td style="text-align: right;"><b>{point.y} ' + toolTipUnit + '</b></td></tr>',
                                        footerFormat: '</table>',
                                        valueDecimals: 2
                                    },
                                    pointStart: Date.UTC(parseInt(splitPointStart[0]), (splitPointStart[1] - 1), parseInt(splitPointStart[2])),
                                    pointInterval: response.pointInterval,
                                    pointPlacement: ypoint
                                };
                            }
                            else {
                                seriesArr[p] = {
                                    name: seriesNameArr[p], yAxis: parseInt(yAxisIndex[p]), color: colorType[p], type: chartTypeSeries, marker: y1Marker, lineWidth: y1Width, data: (dataArr[p]).sort(), tooltip: {
                                        useHTML: true, headerFormat: '<small>{point.key}</small><table style="!important;height:300px;display:block;overflow-y:scroll;">',
                                        pointFormat: '<br/><tr><td style="color: {series.color};">{series.name}: </td>' + '<td style="text-align: right;"><b>{point.y} ' + toolTipUnit + '</b></td></tr>', footerFormat: '</table>', valueDecimals: 2
                                    }, pointStart: Date.UTC(parseInt(splitPointStart[0]), (splitPointStart[1] - 1), parseInt(splitPointStart[2])),
                                    pointInterval: response.pointInterval, pointPlacement: ypoint
                                };
                            }
                        }
                    } else if (xAxis === '24-hours') {
                        var y1Marker = {};
                        var y1Width = 2;
                        var chartTypeSeries = chartType[p];
                        if (chartTypeSeries === 'marker') {
                            chartTypeSeries = 'line';
                            y1Marker['enabled'] = true;
                            y1Marker['symbol'] = 'circle';
                            y1Marker['radius'] = 3;
                            y1Width = 0;
                        } else if (chartTypeSeries === 'line') {
                            y1Marker['enabled'] = false;
                        }

                        if (dataArr[p].length > 0) {

                            seriesArr[p] = { name: seriesNameArr[p], yAxis: parseInt(yAxisIndex[p]), color: colorType[p], type: chartTypeSeries, marker: y1Marker, lineWidth: y1Width, data: dataArr[p], tooltip: { shared: true, useHTML: true, xDateFormat: '%H:%M', headerFormat: '<b>Time:</b> {point.key}<br/>', pointFormat: '<b>{series.name}</b>: {point.y}<br/>', valueSuffix: ' ' + toolTipUnit }, pointInterval: 450 * 1000 };

                        }


                    } else {
                        seriesArr[p] = { name: seriesNameArr[p], yAxis: parseInt(yAxisIndex[p]), color: colorType[p], type: chartType[p], data: dataArr[p], tooltip: { valueSuffix: ' ' + toolTipUnit }, pointPadding: 0.1 };
                    }
                }
            }


            var labelObj = {};
            var monthNames = [
                "Jan", "Feb", "Mar",
                "Apr", "May", "Jun", "Jul",
                "Aug", "Sep", "Oct",
                "Nov", "Dec"
            ];
            labelObj[response.pointLabel] = response.pointValue;
            var xAxisObj = {};
            if (xAxis === 'time') {
                if ((time === 'year' || time === 'fyear' || time === 'rolling_year' || time === 'halfyearly')) {
                    xAxisObj['type'] = 'datetime';
                    xAxisObj['dateTimeLabelFormats'] = {};
                    xAxisObj['dateTimeLabelFormats']['day'] = "%Y";
                } else if (time === 'quarterly') {
                    xAxisObj['type'] = 'datetime';
                    xAxisObj['dateTimeLabelFormats'] = {};
                    var ts = Date.parse(response.pointStart);
                    var nudate = new Date(ts);
                    var day = nudate.getDate();
                    var monthIndex = nudate.getMonth();

                    xAxisObj['dateTimeLabelFormats']['day'] = ' %e. %b' + ' - ' + day + '. ' + monthNames[monthIndex];
                } else if (time === 'month' || time === "bimonthly") {
                    if (unit === 'month') {
                        xAxisObj['type'] = 'datetime';
                        xAxisObj['dateTimeLabelFormats'] = {};

                        xAxisObj['dateTimeLabelFormats']['day'] = "%b \'%y";
                    }
                    else {
                        xAxisObj['type'] = 'datetime';
                    }
                }
                else {
                    xAxisObj['type'] = 'datetime';
                }
            } else if (xAxis === '24-hours') {
                xAxisObj['type'] = 'datetime';
                xAxisObj['dateTimeLabelFormats'] = {};
                xAxisObj['dateTimeLabelFormats']['day'] = '%H:%M';
            } else {
                xAxisObj['categories'] = categoriesArr;
                xAxisObj['max'] = categoriesArr.length - 1;
            }

            var marginRightVal = 85;
            var yAxisArr = [];
            if (y1Unit === 'Blank') {
                y1Unit = '';
            }
            if (y21Unit === 'Blank') {
                y21Unit = '';
            }
            if (y22Unit === 'Blank') {
                y22Unit = '';
            }
            if (y23Unit === 'Blank') {
                y23Unit = '';
            }


            if (y1Max > 0) {
                yAxisArr[0] = {
                    labels: { format: '{value}', style: { color: y1BaseColor }, },
                    title: { text: y1Title + '(' + y1Unit + ')', style: { color: y1BaseColor } }, min: y1Min, max: y1Max, tickPosition: 'inside', alignTicks: false, tickInterval: y1Max / 2
                }
            } else {
                yAxisArr[0] = {
                    labels: { format: '{value}', style: { color: y1BaseColor }, },
                    title: { text: y1Title + '(' + y1Unit + ')', style: { color: y1BaseColor } }, min: 0, tickPosition: 'inside'
                }
            }

            if (y21BaseColor !== null) {
                if (y21Max > 0) {
                    yAxisArr[1] = {
                        labels: { format: '{value}', style: { color: y21BaseColor }, },
                        title: { text: y21Title + '(' + y21Unit + ')', style: { color: y21BaseColor } }, min: 0, max: y21Max, opposite: true, tickPosition: 'inside', alignTicks: false, tickInterval: y21Max / 2
                    }
                    marginRightVal = 85;
                } else {
                    yAxisArr[1] = {
                        labels: { format: '{value}', style: { color: y21BaseColor }, },
                        title: { text: y21Title + '(' + y21Unit + ')', style: { color: y21BaseColor } }, min: 0, opposite: true, tickPosition: 'inside'
                    }
                    marginRightVal = 85;
                }
            }

            if (y22BaseColor !== null) {
                if (y22Max > 0) {
                    yAxisArr[2] = {
                        labels: { format: '{value}', style: { color: y22BaseColor }, },
                        title: { text: y22Title + '(' + y22Unit + ')', style: { color: y22BaseColor } }, min: y22Min, max: y22Max, opposite: true, height: 245, tickPosition: 'inside', alignTicks: false, tickInterval: y21Max / 2
                    }
                    marginRightVal = 85;
                } else {
                    yAxisArr[2] = {
                        labels: { format: '{value}', style: { color: y22BaseColor }, },
                        title: { text: y22Title + '(' + y22Unit + ')', style: { color: y22BaseColor } }, min: y22Min, opposite: true, tickPosition: 'inside'
                    }
                    marginRightVal = 85;
                }
            }

            if (y23BaseColor !== null) {
                if (y23Max > 0) {
                    yAxisArr[3] = {
                        labels: { format: '{value}', style: { color: y23BaseColor }, },
                        title: { text: y23Title + '(' + y23Unit + ')', style: { color: y23BaseColor } }, min: y23Min, max: y23Max, opposite: true, height: 245, tickPosition: 'inside', alignTicks: false, tickInterval: y21Max / 2
                    }
                    marginRightVal = 85;
                } else {
                    yAxisArr[3] = {
                        labels: { format: '{value}', style: { color: y23BaseColor }, },
                        title: { text: y23Title + '(' + y23Unit + ')', style: { color: y23BaseColor } }, min: y23Min, opposite: true, tickPosition: 'inside'
                    }
                    marginRightVal = 85;
                }
            }

            let legendShow = false;
            if (legendValue === 1) {
                legendShow = true;
            } else {
                legendShow = false;
            }
            let graphHeight = 245;
            if (seriesArr && seriesArr[0] && seriesArr[0].name === "Module cleaning analysis") {
                var plantType = "";
                graphName = response.graphName;
                graphName = graphName.toLowerCase();
                if (graphName.indexOf("rooftop") !== -1) {
                    plantType = "RT";
                }
                else {
                    plantType = "GM";
                }

                canvasId1 = {
                    graphType:response.graphType,
                    fromDate:response.fromDate,
                    toDate:response.toDate,
                    xAxisData:response.xAxisData,
                    chart: {
                        spacingLeft: 0, marginRight: marginRightVal, height: graphHeight, events: {
                            click: function (event) {
                                getModel(url, graph)
                            }
                        }
                    },
                    legend: { enabled: legendShow },
                    credits:{enabled:false},
                    graphName: graphName,
                    graphId: graphId,
                    title: {
                        text: 'Date from: ' + response.fromDate + ' to: ' + response.toDate,
                        style: {
                            color: '#666',
                            fontWeight: 'normal',
                            fontSize: 13,
                        },
                        margin: 10,
                        align: 'center',
                    },
                    xAxis: xAxisObj,
                    yAxis: yAxisArr,
                    series: seriesArr,
                    animation: {
                        duration: 50,
                    },
                    plotOptions: {
                        series: {
                            marker: {
                                enabled: false
                            }
                        }
                    },
                    navigation: {
                        buttonOptions: {
                            enabled: true,
                            align: 'right',
                            verticalAlign: 'bottom'
                        }
                    },
                    exporting: {
                        buttons: {
                            customButton: {
                                y: -205,
                                x: -5,
                                onclick: function () {
                                    var formattedFromDate = response.fromDate.replace("/", "-").replace("/", "-");
                                    var formattedEndDate = response.toDate.replace("/", "-").replace("/", "-");
                                    window.open(url + 'plant/AlertStatistics/' + plantType + "/" + formattedFromDate + '/' + formattedEndDate, '_blank');
                                },
                                text: 'Alert statistics'
                            }
                        }
                    },
                }

            }
            else if (response.device === "ost_alert_plants") {
                var seriesData = [];
                response.result.map((i, value) => {
                    value.forEach((val, index) => {
                        val.y = parseInt(val.y);
                        seriesData.push(val);
                    });
                });


                canvasId1 = {
                    graphType:response.graphType,
                    fromDate:response.fromDate,
                    toDate:response.toDate,
                    xAxisData:response.xAxisData,
                    chart: {
                        type: 'pie', spacingLeft: 0, marginRight: marginRightVal, height: graphHeight, events: {
                            click: function (event) {
                                getModel(url, graph)
                            }
                        }
                    },
                    legend: { enabled: false },
                    credits:{enabled:false},
                    graphId:graphId,
                    graphName: graphName,
                    title: {
                        text: 'Date from: ' + response.fromDate + ' to: ' + response.toDate,
                        style: {
                            color: '#666',
                            fontWeight: 'normal',
                            fontSize: 13,
                        },
                        margin: 10,
                        align: 'center',
                    },
                    animation: {
                        duration: 50,
                    },
                    plotOptions: {
                        pie:
                        {
                            dial: { radius: '100%', backgroundColor: 'silver', borderColor: 'black', borderWidth: 1, baseWidth: 1, topWidth: 1, },
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels:
                            {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                style:
                                {
                                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                }
                            },
                            showInLegend: false,
                            point: {
                                events: {
                                    click: function () {
                                        var plant_id = this.plant_id;
                                        var hub_id = this.hub_id;
                                        var formattedFromDateForHub = response.fromDate.replace("/", "-").replace("/", "-");
                                        var formattedToDateForHub = response.toDate.replace("/", "-").replace("/", "-");
                                        var formattedFromDate = response.fromDate.split('/').reverse().join('/');
                                        var formattedEndDate = response.toDate.split('/').reverse().join('/');
                                        var formattedFromDate = formattedFromDate.replace("/", "-").replace("/", "-");
                                        var formattedEndDate = formattedEndDate.replace("/", "-").replace("/", "-");
                                        var graphTitle = response.graphName
                                        if (graphTitle.indexOf("Rooftop") !== -1) {
                                            window.open(url + 'plant/AlertStatisticsByHub/' + hub_id + '/' + formattedFromDateForHub + '/' + formattedToDateForHub, '_blank');
                                        }
                                        else {
                                            window.open(url + 'plant/AlertDetails/' + plant_id + '/' + formattedFromDate + '/' + formattedEndDate + "/all/open", '_blank');
                                        }
                                    }
                                }
                            }
                        }
                    },
                    series: [{
                        name: response.y1_title,
                        colorByPoint: true,
                        data: seriesData
                    }],
                    tooltip: {
                        pointFormat: '<b>{series.name} : <b>{point.y:.f}</b> </b> <br/> <br/>\
                                          <span style="color:{point.color}">Module cleaning analysis</span>: <b>{point.mca:.f}</b><br/>\
                                          <span style="color:{point.color}">Partial Plantdown</span>: <b>{point.ppd:.f}</b><br/>\
                                          <span style="color:{point.color}">Complete Plantdown</span>: <b>{point.cpd:.f}</b><br/>',
                    },
                    navigation:
                    {
                        buttonOptions:
                        {
                            enabled: false,
                        }
                    }
                }

            } else if (response.device === "pm_task_plantwise") {
                var seriesData = [];
                response.result.map((i, value) => {
                    value.forEach((val, index) => {
                        val.y = parseInt(val.y);
                        seriesData.push(val);
                    });
                });

                canvasId1 = {
                    graphType:response.graphType,
                    fromDate:response.fromDate,
                    toDate:response.toDate,
                    chart: {
                        type: 'pie', spacingLeft: 0, marginRight: marginRightVal, height: graphHeight, events: {
                            click: function (event) {
                                getModel(url, graph)
                            }
                        }
                    },
                    legend: { enabled: false },
                    credits:{enabled:false},
                    graphId:graphId,
                    graphName: graphName,
                    title: {
                        text: 'Date from: ' + response.fromDate + ' to: ' + response.toDate,
                        style: {
                            color: '#666',
                            fontWeight: 'normal',
                            fontSize: 13,
                        },
                        margin: 10,
                        align: 'center',
                    },
                    animation: {
                        duration: 50,
                    },
                    plotOptions: {
                        pie:
                        {
                            dial: { radius: '100%', backgroundColor: 'silver', borderColor: 'black', borderWidth: 1, baseWidth: 1, topWidth: 1, },
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels:
                            {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                style:
                                {
                                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                }
                            },
                            showInLegend: false
                        }
                    },
                    series: [{
                        name: response.y1_title,
                        colorByPoint: true,
                        data: seriesData
                    }],
                    tooltip: {
                        pointFormat: '<b>{series.name} : <b>{point.y:.f}</b> </b> <br/> <br/>\
                                              <span style="color:{point.color}">Daily</span>: <b>{point.daily:.f}</b><br/>\
                                              <span style="color:{point.color}">Monthly</span>: <b>{point.monthly:.f}</b><br/>\
                                              <span style="color:{point.color}">BiMonthly</span>: <b>{point.bimonthly:.f}</b><br/>\
                                              <span style="color:{point.color}">Quarterly</span>: <b>{point.quarterly:.f}</b><br/>\
                                              <span style="color:{point.color}">Half Yearly</span>: <b>{point.halfyearly:.f}</b><br/>\
                                              <span style="color:{point.color}">Yearly</span>: <b>{point.yearly}</b><br/>',
                    },
                    navigation:
                    {
                        buttonOptions:
                        {
                            enabled: false,
                        }
                    }
                }

            } else if (response.graphName === 'PM Task Portfolio Daily' || response.graphName === 'PM Task Portfolio Monthly Till Date' || response.graphName === 'PM Task Portfolio BiMonthly Till Date' || response.graphName === 'PM Task Portfolio Quarterly Till Date' || response.graphName === 'PM Task Portfolio HalfYearly Till Date' || response.graphName === 'PM Task Portfolio Yearly Till Date') {

                canvasId1 = {
                    graphType:response.graphType,
                    fromDate:response.fromDate,
                    toDate:response.toDate,
                    xAxisData:response.xAxisData,
                    chart: {
                        spacingLeft: 0, marginRight: marginRightVal, height: graphHeight, events: {
                            click: function (event) {
                                getModel(url, graph)
                            }
                        }
                    },
                    legend: { enabled: legendShow },
                    credits:{enabled:false},
                    graphId:graphId,
                    graphName: graphName,
                    title: {
                        text: 'Date from: ' + response.fromDate + ' to: ' + response.toDate,
                        style: {
                            color: '#666',
                            fontWeight: 'normal',
                            fontSize: 13,
                        },
                        margin: 10,
                        align: 'center',
                    },
                    xAxis: xAxisObj,
                    yAxis: yAxisArr,
                    series: seriesArr,
                    animation: {
                        duration: 50,
                    },
                    plotOptions: {
                        series: {
                            marker: {
                                enabled: false
                            }
                        }
                    },
                    navigation: {
                        buttonOptions: {
                            enabled: true,
                            align: 'right',
                            verticalAlign: 'bottom'
                        }
                    }, exporting: {
                        buttons: {
                            customButton: {
                                y: -205,
                                x: -5,
                                onclick: function () {
                                    var formattedFromDate = response.fromDate.replace("/", "-").replace("/", "-");
                                    var formattedEndDate = response.toDate.replace("/", "-").replace("/", "-");
                                    window.open(url + 'plant/preventivemaintenance/' + formattedFromDate + '/' + formattedEndDate, '_blank');
                                },
                                text: 'Task Statistics'
                            }
                        }
                    },
                }

            } else if (response.graphName.toLowerCase().indexOf("provisional") !== -1) {
                graphName = response.graphName;

                graphName = graphName.toLowerCase();

                var PlantType = '';

                if (graphName.indexOf('rooftop') !== -1) {
                    PlantType = 'RT';
                } else {
                    PlantType = 'GM';
                }


                canvasId1 = {
                    graphType:response.graphType,
                    fromDate:response.fromDate,
                    toDate:response.toDate,
                    xAxisData:response.xAxisData,
                    chart: {
                        spacingLeft: 0, marginRight: marginRightVal, height: graphHeight, events: {
                            click: function (event) {
                                getModel(url, graph)
                            }
                        }
                    },
                    legend: { enabled: legendShow },
                    credits:{enabled:false},
                    graphId:graphId,
                    graphName: graphName,
                    tooltip:
                    {
                        formatter: function () {
                            return Highcharts.dateFormat('%A, %b %e, %Y', new Date(this.x))
                                + '<br><tr><td style="color: ' + this.series.color + '">' + this.series.name
                                + ': </td><td style="text-align: right;"><b>' + (this.y / 1000000).toFixed(2) + " Mn kWh" + '</b></td></tr>';
                        }
                    },
                    title: {
                        text: 'Date from: ' + response.fromDate + ' to: ' + response.toDate,
                        style: {
                            color: '#666',
                            fontWeight: 'normal',
                            fontSize: 13,
                        },
                        margin: 10,
                        align: 'center',
                    },
                    xAxis: xAxisObj,
                    yAxis: yAxisArr,
                    series: seriesArr,
                    animation: {
                        duration: 50,
                    },
                    plotOptions: {
                        column: {
                            dataLabels: {
                                useHTML: true,
                                enabled: true,
                                inside: false,
                                crop: false,
                                overflow: 'none',
                                formatter: function () {
                                    return '<font color="black"><b>Total:</b>' + (this.y / 1000000).toFixed(2) + " Mn kWh" + '</font>';
                                }
                            }
                        },
                        series: {
                            marker: {
                                enabled: false
                            }
                        }
                    },
                    exporting: {
                        buttons: {
                            customButton: {
                                x: -15,
                                y: -10,
                                align: 'right',
                                verticalAlign: 'bottom',
                                onclick: function () {
                                    window.open(url + 'report/DeviateExcelExportProv/' + report + '/' + PlantType, '_blank');
                                },
                                text: 'Dev <br/>Report'
                            }
                        }
                    },
                    navigation: {
                        buttonOptions: {
                            enabled: true,
                            align: 'right',
                            verticalAlign: 'bottom'
                        }
                    }
                };

            }
            else if (response.graphName.toLowerCase().indexOf("plant availability") !== -1) {
                canvasId1 = {
                    graphType:response.graphType,
                    fromDate:response.fromDate,
                    toDate:response.toDate,
                    xAxisData:response.xAxisData,
                    chart: {
                        spacingLeft: 0, marginRight: marginRightVal, height: graphHeight, events: {
                            click: function (event) {
                                getModel(url, graph)
                            }
                        }
                    },
                    legend: { enabled: legendShow },
                    credits:{enabled:false},
                    graphId:graphId,
                    graphName: graphName,
                    title: {
                        text: 'Date from: ' + response.fromDate + ' to: ' + response.toDate,
                        style: {
                            color: '#666',
                            fontWeight: 'normal',
                            fontSize: 13,
                        },
                        margin: 10,
                        align: 'center',
                    },
                    xAxis: xAxisObj,
                    yAxis: yAxisArr,
                    series: seriesArr,
                    animation: {
                        duration: 50,
                    },
                    plotOptions: {
                        series: {
                            marker: {
                                enabled: false
                            }
                        },
                        column:
                        {
                            dataLabels:
                            {
                                useHTML: true,
                                enabled: true,
                                inside: false,
                                crop: false,
                                overflow: 'none',
                                formatter: function () {
                                    return '<font color="black">' + this.y + '%</font>';
                                }
                            }
                        }
                    },
                    exporting: {
                        buttons: {
                            customButton: {
                                x: -25,
                                y: -10,
                                align: 'right',
                                verticalAlign: 'bottom',
                                onclick: function () {
                                    var formattedFromDate = response.fromDate.split('/').reverse().join('/');
                                    var formattedEndDate = response.toDate.split('/').reverse().join('/');
                                    var formattedFromDate = formattedFromDate.replace("/", "-").replace("/", "-");
                                    var formattedEndDate = formattedEndDate.replace("/", "-").replace("/", "-");
                                    window.open(url + 'report/PlantAvailabilityStatistics/' + response.time + '/' + formattedFromDate + '/' + formattedEndDate, '_blank');
                                },
                                text: 'Plant wise'
                            }
                        }
                    },
                    navigation: {
                        buttonOptions: {
                            enabled: true,
                            align: 'right',
                            verticalAlign: 'bottom'
                        }
                    },
                };
            }
            else if (response.graphName.toLowerCase().indexOf("grid availability") !== -1) {

                canvasId1 = {
                    graphType:response.graphType,
                    fromDate:response.fromDate,
                    toDate:response.toDate,
                    xAxisData:response.xAxisData,
                    chart: {
                        spacingLeft: 0, marginRight: marginRightVal, height: graphHeight, events: {
                            click: function (event) {
                                getModel(url, graph)
                            }
                        }
                    },
                    legend: { enabled: legendShow },
                    credits:{enabled:false},
                    graphId:graphId,
                    graphName: graphName,
                    title: {
                        text: 'Date from: ' + response.fromDate + ' to: ' + response.toDate,
                        style: {
                            color: '#666',
                            fontWeight: 'normal',
                            fontSize: 13,
                        },
                        margin: 10,
                        align: 'center',
                    },
                    xAxis: xAxisObj,
                    yAxis: yAxisArr,
                    series: seriesArr,
                    animation: {
                        duration: 50,
                    },
                    plotOptions: {
                        series: {
                            marker: {
                                enabled: false
                            }
                        },
                        column:
                        {
                            dataLabels:
                            {
                                useHTML: true,
                                enabled: true,
                                inside: false,
                                crop: false,
                                overflow: 'none',
                                formatter: function () {
                                    return '<font color="black">' + this.y + '%</font>';
                                }
                            }
                        }
                    },
                    exporting: {
                        buttons: {
                            customButton: {
                                x: -25,
                                y: -10,
                                align: 'right',
                                verticalAlign: 'bottom',
                                onclick: function () {
                                    var formattedFromDate = response.fromDate.split('/').reverse().join('/');
                                    var formattedEndDate = response.toDate.split('/').reverse().join('/');
                                    var formattedFromDate = formattedFromDate.replace("/", "-").replace("/", "-");
                                    var formattedEndDate = formattedEndDate.replace("/", "-").replace("/", "-");
                                    window.open(url + 'report/GridAvailabilityStatistics/' + response.time + '/' + formattedFromDate + '/' + formattedEndDate, '_blank');
                                },
                                text: 'Plant wise'
                            }
                        }
                    },
                    navigation: {
                        buttonOptions: {
                            enabled: true,
                            align: 'right',
                            verticalAlign: 'bottom'
                        }
                    },
                };

            }
            else {
                console.log(graphId)
                canvasId1 = {
                    graphType:response.graphType,
                    fromDate:response.fromDate,
                    toDate:response.toDate,
                    xAxisData:response.xAxisData,
                    chart: {
                        spacingLeft: 0, marginRight: marginRightVal, height: graphHeight, events: {
                            click: function (event) {
                                getModel(url, graph)
                            }
                        }
                    },
                    credits:{
                        enabled:false
                    },
                    legend: { enabled: graphId === 274  || graphId === 305 ? false : true },
                    
                    graphId:graphId,
                    graphName: graphName,
                    title: {
                        text: 'Date from: ' + response.fromDate + ' to: ' + response.toDate,
                        style: {
                            color: '#666',
                            fontWeight: 'normal',
                            fontSize: 13,
                        },
                        margin: 10,
                        align: 'center',
                    },
                    xAxis: xAxisObj,
                    yAxis: yAxisArr,
                    series: seriesArr,
                    animation: {
                        duration: 50,
                    },
                    plotOptions: {
                        series: {
                            marker: {
                                enabled: false
                            }
                        }
                    },
                    navigation: {
                        buttonOptions: {
                            enabled: true,
                            align: 'right',
                            verticalAlign: 'bottom'
                        }
                    },
                };

            }
        }
        else if (response.graphType === 'stacked') {
            if (~response.label.indexOf("Forecast")) {
                var time = response.time;
                var y1Unit = response.y1_unit;
                var toolTipUnit = y1Unit;
                var report = '';
                var stackedPlantType = '';

                var graphName = response.graphName;

                graphName = graphName.toLowerCase();

                if (graphName.indexOf('rooftop') !== -1) {
                    stackedPlantType = 'RT';
                } else {
                    stackedPlantType = 'GM';
                }
                if (time === "fyear") {
                    report = 'YTD';
                }
                else if (time === "quarterly") {
                    report = 'QTD';
                }
                else if (time === "month") {
                    report = 'MTD';
                }
                else {
                    report = 'DTD';
                }

                var seriesArr = [];
                var rooftop = [];
                var groundmount = [];
                var rftotal = [];
                var gmtotal = [];
                var capacity_ac = [];
                var rflist = [];
                var gmlist = [];
                var plf = 0;
                var totDayPlf = 0;
                var no_of_days = 0;
                response.result.map((value, i) => {
                    rftotal[i] = 0;
                    gmtotal[i] = 0;
                    capacity_ac[i] = 0;
                    let increnet = 0;
                    let increbud = 0;
                    let inet = ['#2980B9', '#5499C7', '#7FB3D5 '];
                    let ibud = ['#2ECC71', '#58D68D', '#82E0AA'];
                    value.map((val, index) => {
                        if (val['data' + i] !== null) {
                            dataVal = parseFloat(parseFloat(Math.abs(val['data' + i])).toFixed(2));
                        } else {
                            dataVal = 0;
                        }
                        let taVal = 0;
                        if (val['tariff' + i] !== null) {
                            taVal = parseFloat(parseFloat(Math.abs(val['tariff' + i])).toFixed(2));
                        } else {
                            taVal = 0;
                        }
                        let pidVal = 0;
                        if (val['plant_id' + i] !== null) {
                            pidVal = parseFloat(parseFloat(val['plant_id' + i]).toFixed(2));
                        } else {
                            pidVal = 0;
                        }
                        let tyVal = 0;
                        if (val['type' + i] !== null) {
                            tyVal = val['type' + i];
                        } else {
                            tyVal = '';
                        }
                        let pnVal = 0;
                        if (val['plant_name' + i] !== null) {
                            pnVal = val['plant_name' + i];
                        } else {
                            pnVal = '';
                        }
                        let plcacVal = 0;
                        if (val['plant_capacity_ac' + i] !== null) {
                            plcacVal = parseFloat(parseFloat(Math.abs(val['plant_capacity_ac' + i])).toFixed(2));
                        } else {
                            plcacVal = 0;
                        }
                        let daysVal = 0;
                        // let plcacVal = 0;
                        if (val['days' + i] !== null) {
                            daysVal = parseFloat(parseFloat(Math.abs(val['days' + i])).toFixed(2));
                            totDayPlf += (plcacVal * daysVal)
                        } else {
                            totDayPlf += 0;
                        }
                        let revenueVal, netclr, budclr = 0;
                        if (tyVal === 'GROUNDMOUNT') {
                            gmtotal[i] += dataVal;
                            capacity_ac[i] += plcacVal;
                            let revenueVal = (dataVal * taVal);
                            let netclr, budclr = 0;
                            if (i === 0) {
                                netclr = parseInt(increnet) % 3;
                                increnet++;
                                seriesArr.push({ 'id': pidVal, 'name': pnVal, 'data': [{ 'y': dataVal, 'revenue': revenueVal, 'color': inet[netclr] }] });
                            }
                            else {
                                seriesArr.map((e, i) => {
                                    if (e.id === pidVal) {
                                        budclr = parseInt(increbud) % 3;
                                        increbud++;
                                        e.data.push({ 'y': dataVal, 'revenue': revenueVal, 'color': ibud[budclr] });

                                    }
                                });
                            }
                        } else {
                            gmtotal[i] += dataVal;
                            capacity_ac[i] += plcacVal;
                            revenueVal = (dataVal * taVal);
                            if (i === 0) {
                                netclr = parseInt(increnet) % 3;
                                increnet++;
                                seriesArr.push({ 'id': pidVal, 'name': pnVal, 'data': [{ 'y': dataVal, 'revenue': revenueVal, color: inet[netclr] }] });
                            }
                            else {
                                seriesArr.map((e, i) => {
                                    if (e.id === pidVal) {
                                        budclr = parseInt(increbud) % 3;
                                        increbud++;
                                        e.data.push({ 'y': dataVal, 'revenue': revenueVal, color: ibud[budclr] });

                                    }
                                });
                            }

                        }
                    });
                });
                var graphHeight = 245;

                marginRightVal = 85;
                canvasId1 = {};

                var revenueInUSD;
                canvasId1 = {
                    graphType:response.graphType,
                    fromDate:response.fromDate,
                    toDate:response.toDate,
                    xAxisData:response.xAxisData,
                    chart: {
                        type: 'column', spacingLeft: 0, marginRight: marginRightVal, height: graphHeight, events: {
                            click: function (event) {
                                getModel(url, graph)
                            }
                        }
                    },
                    graphId:graphId,
                    graphName: graphName,
                    title: {
                        text: 'Date from: ' + response.fromDate + ' to: ' + response.toDate,
                        style: {
                            color: '#666',
                            fontWeight: 'normal',
                            fontSize: 13,
                        },
                        margin: 30,
                        align: 'center',
                    },
                    xAxis: {
                        categories: ['Net Generation', 'Budget Generation']
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Generation (Kwh)',
                            style: { color: '#003AFA' }
                        },
                        labels: {
                            style: { color: '#003AFA' },
                            formatter: function () {
                                return this.value;
                            }
                        },
                        stackLabels: {
                            enabled: true,
                            useHTML: true,
                            y: [-15, -25],
                            //verticalAlign: 'middle',
                            style: {
                                color: 'gray',
                                position: 'absolute'
                            },
                            formatter: function () {
                                var sx = this.x;
                                var str = '';
                                if (sx === 0) {
                                    var allSeries = this.axis.series;
                                    var totalAmount = 0;
                                    for (var s in allSeries) {
                                        totalAmount += allSeries[s].userOptions.data[sx].revenue;
                                    }
                                    revenueInUSD = (totalAmount / 1000000) / (response.doller);
                                    str += "<font color='blue'>Revenue(in Mn):</font><font color='black'>" + (totalAmount / 1000000).toFixed(2) + " INR " + "/ " + revenueInUSD.toFixed(2) + " USD</font><br />";
                                }
                                if (capacity_ac[0] === 0) {
                                    plf = 0;
                                }
                                else {

                                    //console.log(totDayPlf,capacity_ac[0],no_of_days);
                                    let levelised_day = (totDayPlf / capacity_ac[0]).toFixed(2);
                                    plf = (((this.total) / (24 * capacity_ac[0] * levelised_day)) * 100).toFixed(2);

                                }
                                str += "<font color='blue'>Total:</font><font color='black'>" + (this.total / 1000000).toFixed(2) + " Mn Units</font><br/>" + "<font color='blue'>PLF:</font><font color='black'>" + plf + "%</font>";
                                return str;
                            }
                        }
                    },
                    tooltip: {
                        useHTML: true,
                        shared: false,
                        formatter: function () {
                            var text = '<b>' + this.x + '</b><br/>';

                            if (this.x === 'Net Generation') {
                                text += 'Revenue:' + Highcharts.numberFormat(this.point['revenue'], 2, '.', '') + ' INR / ' + revenueInUSD.toFixed(2) + ' USD<br/>' + this.series.name + ':' + Highcharts.numberFormat(this.y, 2, '.', '') + ' ' + toolTipUnit + '<br/><font color="blue">Portfolio ' + report + '</font>:' + Highcharts.numberFormat(this.point.stackTotal, 2, '.', '') + ' ' + toolTipUnit;

                            }
                            else {
                                text += this.series.name + ':' + Highcharts.numberFormat(this.y, 2, '.', '') + ' ' + toolTipUnit + '<br/><font color="blue">Portfolio ' + report + '</font>:' + Highcharts.numberFormat(this.point.stackTotal, 2, '.', '') + ' ' + toolTipUnit;


                            }
                            return text;
                        }
                    },
                    series: seriesArr,
                    animation: {
                        duration: 50,
                    },
                    plotOptions: {
                        series: {
                            stacking: 'normal'
                        },
                        column: {
                            colorByPoint: true,
                            borderWidth: 0
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    credits:{enabled:false},
                    exporting: {
                        buttons: {
                            customButton: {
                                x: 5,
                                y: -40,
                                align: 'right',
                                verticalAlign: 'bottom',
                                onclick: function () {
                                    window.open(url + 'report/DeviateExcelExport/' + report + '/' + stackedPlantType, '_blank');
                                },
                                text: 'Dev <br/>Report'
                            }
                        }
                    },
                    navigation: {
                        buttonOptions: {
                            enabled: true,
                            align: 'right',
                            verticalAlign: 'bottom'
                        }
                    }
                };
            };
            if (~response.label.indexOf("HUB")) {
                var time = response.time;
                var hubPlant = response.hub;
                var toolTipUnit = y1Unit;
                var report = '';
                if (time === "fyear") {
                    report = 'YTD';
                }
                else if (time === "quarterly") {
                    report = 'QTD';
                }
                else if (time === "month") {
                    report = 'MTD';
                }
                else {
                    report = 'DTD';
                }
                var ex;
                if (hubPlant !== '') {
                    ex = {
                        buttons: {
                            customButton: {
                                x: 5,
                                y: -40,
                                align: 'right',
                                verticalAlign: 'bottom',
                                onclick: function () {
                                    window.open(url + 'report/DeviateExcelExport/' + report + '/HB/' + hubPlant, '_blank');
                                },
                                text: 'Dev <br/>Report'
                            }
                        }
                    }
                }
                else {
                    ctrlr = 'hub';
                    ex = {
                        'enabled': false
                    }
                }
                var y1Unit = response.y1_unit;
                var toolTipUnit = y1Unit;
                var seriesArr = [];
                var capacity_ac = [];
                var ndaysGen = [];
                response.result.map((value, i) => {
                    let increnet = 0;
                    let increbud = 0;
                    let totplcacVal = 0;
                    let totDayPlf = 0;
                    capacity_ac[i] = 0;
                    ndaysGen[i] = 0;
                    let inet = ['#2980B9', '#5499C7', '#7FB3D5 '];
                    let ibud = ['#2ECC71', '#58D68D', '#82E0AA'];
                    let revVal, hidVal, hbnVal = 0;
                    value.map((val, index) => {
                        if (val['data' + i] !== null) {
                            dataVal = parseFloat(parseFloat(Math.abs(val['data' + i])).toFixed(2));
                        } else {
                            dataVal = 0;
                        }
                        if (val['revenue' + i] !== null) {
                            revVal = parseFloat(parseFloat(Math.abs(val['revenue' + i])).toFixed(2));
                        } else {
                            revVal = 0;
                        }
                        if (val['hub_id' + i] !== null) {
                            hidVal = parseFloat(parseFloat(val['hub_id' + i]).toFixed(2));
                        } else {
                            hidVal = 0;
                        }
                        if (val['hub_name' + i] !== null) {
                            hbnVal = val['hub_name' + i];
                        } else {
                            hbnVal = '';
                        }
                        if (val['plant_capacity_ac' + i] !== null) {
                            let plcacVal = parseFloat(parseFloat(Math.abs(val['plant_capacity_ac' + i])).toFixed(2));
                            totplcacVal += plcacVal;
                        } else {
                            totplcacVal += 0;
                        }
                        if (val['ndays' + i] !== null) {
                            let daysVal = parseFloat(parseFloat(Math.abs(val['ndays' + i])).toFixed(2));
                            totDayPlf += daysVal;
                        } else {
                            totDayPlf += 0;
                        }
                        if (i === 0) {
                            capacity_ac[i] = totplcacVal;
                            ndaysGen[i] = totDayPlf;
                            let netclr = parseInt(increnet) % 3;
                            increnet++;
                            seriesArr.push({
                                'id': hidVal, 'name': hbnVal, 'data': [{ 'y': dataVal, 'revenue': revVal, 'color': inet[netclr] }],
                                events: {
                                    click: function (event) {
                                        var sid = this.userOptions.id;
                                        var win = window.open('/' + ctrlr + '/index/' + sid, '_blank');
                                        if (win) {
                                            //Browser has allowed it to be opened
                                            win.focus();
                                        } else {
                                            //Browser has blocked it
                                            alert('Please allow popups for this website');
                                        }
                                    }
                                }
                            });
                        }
                        else {
                            seriesArr.map((e, i) => {
                                if (e.id === hidVal) {
                                    let budclr = parseInt(increbud) % 3;
                                    increbud++;
                                    e.data.push({ 'y': dataVal, 'revenue': revVal, 'color': ibud[budclr] });

                                }
                            });
                        }
                    });
                });
                var graphHeight = 245;

                marginRightVal = 85;

                canvasId1 = {
                    graphType:response.graphType,
                    fromDate:response.fromDate,
                    toDate:response.toDate,
                    xAxisData:response.xAxisData,
                    chart: {
                        type: 'column', spacingLeft: 0, marginRight: marginRightVal, height: graphHeight, events: {
                            click: function (event) {
                                getModel(url, graph)
                            }
                        }
                    },
                    graphId:graphId,
                    graphName: graphName,
                    title: {
                        text: 'Date from: ' + response.fromDate + ' to: ' + response.toDate,
                        style: {
                            color: '#666',
                            fontWeight: 'normal',
                            fontSize: 13,
                        },
                        margin: 10,
                        align: 'center',
                    },
                    xAxis: {
                        categories: ['Net Generation', 'Budget Generation']
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Generation (Kwh)',
                            style: { color: '#003AFA' }
                        },
                        labels: {
                            style: { color: '#003AFA' },
                            formatter: function () {
                                return this.value;
                            }
                        },
                        stackLabels: {
                            enabled: true,
                            useHTML: true,
                            y: -15,
                            //verticalAlign: 'middle',
                            style: {
                                color: 'gray',
                                position: 'absolute'
                            },
                            formatter: function () {
                                var sx = this.x;
                                var str = '';
                                if (sx === 0) {
                                    var allSeries = this.axis.series;
                                    var totalAmount = 0;
                                    for (var s in allSeries) {
                                        totalAmount += allSeries[s].userOptions.data[sx].revenue;
                                    }
                                    str += "<font color='blue'>Revenue:</font><font color='black'>" + (totalAmount / 1000000).toFixed(4) + " Mn INR</font><br />"
                                }
                                if (capacity_ac[0] === 0 || ndaysGen[0] === 0) {
                                    plf = 0;
                                }
                                else {

                                    //console.log(totDayPlf,capacity_ac[0],no_of_days);
                                    let levelised_day = (ndaysGen[0] / capacity_ac[0]).toFixed(2);
                                    plf = (((this.total) / (24 * capacity_ac[0] * levelised_day)) * 100).toFixed(2);

                                }
                                str += "<font color='blue'>Total:</font><font color='black'>" + (this.total / 1000000).toFixed(2) + " Mn Units</font><br/>" + "<font color='blue'>PLF:</font><font color='black'>" + plf + "%</font>";
                                return str;

                            }
                        }
                    },
                    tooltip: {
                        useHTML: true,
                        shared: false,
                        formatter: function () {
                            var text = '<b>' + this.x + '</b><br/>';
                            if (this.x === 'Net Generation') {
                                text += 'Revenue:' + Highcharts.numberFormat(this.point['revenue'], 2, '.', '') + ' INR <br/>' + this.series.name + ':' + Highcharts.numberFormat(this.y, 2, '.', '') + ' ' + toolTipUnit + '<br/><font color="blue">Portfolio ' + report + '</font>:' + Highcharts.numberFormat(this.point.stackTotal, 2, '.', '') + ' ' + toolTipUnit;
                            }
                            else {
                                text += this.series.name + ':' + Highcharts.numberFormat(this.y, 2, '.', '') + ' ' + toolTipUnit + '<br/><font color="blue">Portfolio ' + report + '</font>:' + Highcharts.numberFormat(this.point.stackTotal, 2, '.', '') + ' ' + toolTipUnit;
                            }
                            return text;
                        }
                    },
                    series: seriesArr,
                    animation: {
                        duration: 50,
                    },
                    plotOptions: {
                        series: {
                            stacking: 'normal'
                        },
                        column: {
                            colorByPoint: true,
                            borderWidth: 0
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    credits:{enabled:false},
                    exporting: ex,
                    navigation: {
                        buttonOptions: {
                            enabled: true,
                            align: 'right',
                            verticalAlign: 'bottom'
                        }
                    }
                }
            }
        }
        else if (response.graphType === 'meter') {
            var meterTitle = response.meterTitle;
            var meterUnit = response.meterUnit;
            var meterMin = parseFloat(parseFloat(response.meterMin).toFixed(2));
            var meterMax = parseFloat(parseFloat(response.meterMax).toFixed(2));
            var redStart = parseFloat(parseFloat(response.redStartValue).toFixed(2));
            var redEnd = parseFloat(parseFloat(response.redEndValue).toFixed(2));
            var yellowStart = parseFloat(parseFloat(response.yellowStartValue).toFixed(2));
            var yellowEnd = parseFloat(parseFloat(response.yellowEndValue).toFixed(2));
            var greenStart = parseFloat(parseFloat(response.greenStartValue).toFixed(2));
            var greenEnd = parseFloat(parseFloat(response.greenEndValue).toFixed(2));
            var graphName = response.graphName.toLowerCase();
            if (graphName.indexOf("plant availability") !== -1) {
                /* Meter chart - new code to work with Grid availability and Plant availability */
                var seriesData = [];
                response.result.map((value, i) => {
                    value.forEach((val, index) => {
                        //if(response.time === 'fyear'){ val.data = 98.98; }else{ val.data = parseFloat(parseFloat(val.data).toFixed(2)); }
                        val.data = parseFloat(parseFloat(val.data).toFixed(2));
                        seriesData.push(val.data);
                    });
                });


                canvasId1 = {
                    graphType:response.graphType,
                    fromDate:response.fromDate,
                    toDate:response.toDate,
                    xAxisData:response.xAxisData,
                    chart: {
                        type: 'gauge',
                        spacingTop: 10,
                        spacingLeft: 15,
                        height: 245,
                        events: {
                            click: function (event) {
                                getModel(url, graph)
                            }
                        }
                    },
                    graphId: graphId,
                    graphName: graphName,
                    statisticsURL: 'report/PlantAvailabilityStatistics/day/' + response.fromDate + "/" + response.toDate,
                    title: {
                        text: 'Date from: ' + response.fromDate + " to: " + response.toDate,
                        style: {
                            color: '#666',
                            fontWeight: 'normal',
                            fontSize: 13,
                        },
                        margin: 10,
                        align: 'center',
                    },
                    credits:{enabled:false},
                    pane: {
                        startAngle: -150,
                        endAngle: 150,
                        background: [{
                            backgroundColor: {
                                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                                stops: [
                                    [0, '#FFF'],
                                    [1, '#333']
                                ]
                            },
                            borderWidth: 0,
                            outerRadius: '109%'
                        }, {
                            backgroundColor: {
                                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                                stops: [
                                    [0, '#333'],
                                    [1, '#FFF']
                                ]
                            },
                            borderWidth: 1,
                            outerRadius: '107%'
                        }, {
                            // default background
                        }, {
                            backgroundColor: '#DDDr',
                            borderWidth: 0,
                            outerRadius: '105%',
                            innerRadius: '103%'
                        }]
                    },
                    yAxis: {
                        min: meterMin,
                        max: meterMax,
                        minorTickInterval: 'auto',
                        minorTickWidth: 1,
                        minorTickLength: 10,
                        minorTickPosition: 'inside',
                        minorTickColor: '#666',
                        tickPixelInterval: 30,
                        tickWidth: 2,
                        tickPosition: 'inside',
                        tickLength: 10,
                        tickColor: '#666',
                        labels: {
                            step: 2,
                            rotation: 'auto'
                        },
                        title: {
                            text: meterTitle,
                            y: 15,
                            style: {
                                color: 'black',
                                fontWeight: 'bold'
                            }
                        },
                        plotBands: [{
                            from: redStart,
                            to: redEnd,
                            color: '#DF5353' // red
                        }, {
                            from: yellowStart,
                            to: yellowEnd,
                            color: '#ffbf00' // amber
                        }, {
                            from: greenStart,
                            to: greenEnd,
                            color: '#55BF3B' // green
                        }]
                    },
                    exporting: {
                        buttons: {
                            customButton: {
                                x: -28,
                                y: -200,
                                align: 'right',
                                verticalAlign: 'bottom',
                                symbolFill: 'red',
                                onclick: function () {
                                    var formattedFromDate = response.fromDate.split('/').reverse().join('/');
                                    var formattedEndDate = response.toDate.split('/').reverse().join('/');
                                    var formattedFromDate = formattedFromDate.replace("/", "-").replace("/", "-");
                                    var formattedEndDate = formattedEndDate.replace("/", "-").replace("/", "-");
                                    window.open(url + 'report/PlantAvailabilityStatistics/' + response.time + '/' + formattedFromDate + '/' + formattedEndDate, '_blank');
                                },
                                text: 'Plant statistics'
                            }
                        }
                    },
                    navigation: {
                        buttonOptions: {
                            theme: {
                                //fill: '#e5e5ff'
                            },
                            verticalAlign: 'top'
                        }
                    },
                    series: [{
                        name: meterTitle,
                        data: seriesData,
                        tooltip: {
                            valueSuffix: meterUnit
                        },
                        dataLabels: { format: '<div style="text-align:center"><span >{point.y}' + meterUnit + '</span></div>' },
                    }],
                }
            }
            else if (graphName.indexOf("grid availability") !== -1) {
                /* Meter chart - new code to work with Grid availability and Plant availability */
                var seriesData = [];
                response.result.map((value, i) => {
                    value.forEach((val, index) => {
                        //if(response.time === 'fyear'){ val.data = 99.15; }else{ val.data = parseFloat(parseFloat(val.data).toFixed(2)); }
                        val.data = parseFloat(parseFloat(val.data).toFixed(2));
                        seriesData.push(val.data);
                    });
                });
                //seriesData = [98]; // Need to be changed later, use only for Debugging purpose.
                canvasId1 = {
                    graphType:response.graphType,
                    fromDate:response.fromDate,
                    toDate:response.toDate,
                    xAxisData:response.xAxisData,
                    chart: {
                        type: 'gauge',
                        spacingTop: 10,
                        spacingLeft: 15,
                        height: 245,
                        events: {
                            click: function (event) {
                                getModel(url, graph)
                            }
                        }
                    },
                    graphId: graphId,
                    graphName: graphName,
                    statisticsURL: 'report/GridAvailabilityStatistics/day/' + response.fromDate + "/" + response.toDate,
                    title: {
                        text: 'Date from: ' + response.fromDate + " to: " + response.toDate,
                        style: {
                            color: '#666',
                            fontWeight: 'normal',
                            fontSize: 13,
                        },
                        margin: 10,
                        align: 'center',
                    },
                    pane: {
                        startAngle: -150,
                        endAngle: 150,
                        background: [{
                            backgroundColor: {
                                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                                stops: [
                                    [0, '#FFF'],
                                    [1, '#333']
                                ]
                            },
                            borderWidth: 0,
                            outerRadius: '109%'
                        }, {
                            backgroundColor: {
                                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                                stops: [
                                    [0, '#333'],
                                    [1, '#FFF']
                                ]
                            },
                            borderWidth: 1,
                            outerRadius: '107%'
                        }, {
                            // default background
                        }, {
                            backgroundColor: '#DDDr',
                            borderWidth: 0,
                            outerRadius: '105%',
                            innerRadius: '103%'
                        }]
                    },
                    yAxis: {
                        min: meterMin,
                        max: meterMax,
                        minorTickInterval: 'auto',
                        minorTickWidth: 1,
                        minorTickLength: 10,
                        minorTickPosition: 'inside',
                        minorTickColor: '#666',
                        tickPixelInterval: 30,
                        tickWidth: 2,
                        tickPosition: 'inside',
                        tickLength: 10,
                        tickColor: '#666',
                        labels: {
                            step: 2,
                            rotation: 'auto'
                        },
                        title: {
                            text: meterTitle,
                            y: 15,
                            style: {
                                color: 'black',
                                fontWeight: 'bold'
                            }
                        },
                        plotBands: [{
                            from: redStart,
                            to: redEnd,
                            color: '#DF5353' // red
                        }, {
                            from: yellowStart,
                            to: yellowEnd,
                            color: '#ffbf00' // amber
                        }, {
                            from: greenStart,
                            to: greenEnd,
                            color: '#55BF3B' // green
                        }]
                    },
                    exporting: {
                        buttons: {
                            customButton: {
                                x: -28,
                                y: -200,
                                align: 'right',
                                verticalAlign: 'bottom',
                                symbolFill: 'red',
                                onclick: function () {
                                    var formattedFromDate = response.fromDate.split('/').reverse().join('/');
                                    var formattedEndDate = response.toDate.split('/').reverse().join('/');
                                    var formattedFromDate = formattedFromDate.replace("/", "-").replace("/", "-");
                                    var formattedEndDate = formattedEndDate.replace("/", "-").replace("/", "-");
                                    window.open(url + 'report/GridAvailabilityStatistics/' + response.time + '/' + formattedFromDate + '/' + formattedEndDate, '_blank');
                                },
                                text: 'Grid statistics'
                            }
                        }
                    },
                    navigation: {
                        buttonOptions: {
                            theme: {
                                //fill: '#e5e5ff'
                            },
                            verticalAlign: 'top'
                        }
                    },
                    series: [{
                        name: meterTitle,
                        data: seriesData,
                        tooltip: {
                            valueSuffix: meterUnit
                        },
                        dataLabels: { format: '<div style="text-align:center"><span >{point.y}' + meterUnit + '</span></div>' },
                    }],
                }
            }
            else {
                var seriesArr = [];
                var paneArr = [];
                var yAxisArr = [];
                var p = null;
                var inc = 1;
                var xVal = 0;
                var splitTime;
                var displayTime;
                var dataVal;
                var pacVal;
                response.result.map((value, i) => {
                    value.forEach((val, index) => {
                        if (val['data' + i] !== null) {
                            dataVal = val['data' + i];
                        } else {
                            dataVal = 0;
                        }
                        if (val['pac' + i] !== null) {
                            pacVal = val['pac' + i];
                        } else {
                            pacVal = 0;
                        }
                        var yeildVal = parseFloat(parseFloat(dataVal).toFixed(2));
                        var pac = parseFloat(parseFloat(pacVal).toFixed(2));
                        var capacity = meterMax / 100;
                        p = seriesArr.length;
                        if (meterUnit === 'Blank') {
                            meterUnit = '';
                        }
                        seriesArr[p] = { data: [yeildVal], yAxis: parseInt(p) };
                        if (p % 8 === 0 && p > 0) {
                            inc = inc + 1.7;
                            xVal = 0;
                        }
                        splitTime = val['time' + i] ? val['time' + i].split(':') : [];
                        displayTime = splitTime[0] + ':' + splitTime[1];

                        paneArr[p] = { center: [(xVal * 10 + xVal * 2.5 + 2) + '%', (inc * 30) + '%'], startAngle: 0, endAngle: 90, background: null, size: 90 };

                        yAxisArr[p] = {
                            min: meterMin, max: meterMax, minorTickPosition: 'outside', minorTickWidth: 2, minorTickColor: '#000', tickPosition: 'outside',
                            lineWidth: 1, minorTickLength: 15, labels: { rotation: 'auto', distance: -10 },
                            plotBands: [{ from: redStart * capacity, to: redEnd * capacity, color: '#C02316', innerRadius: '100%', outerRadius: '120%', },
                            { from: yellowStart * capacity, to: yellowEnd * capacity, color: '#F7FC58', innerRadius: '100%', outerRadius: '120%', },
                            { from: greenStart * capacity, to: greenEnd * capacity, color: '#7CDA34', innerRadius: '100%', outerRadius: '120%', },],
                            pane: p,
                            title: {
                                text: val['individual_name' + i] + '(' + displayTime + ')' + '<br/>' + pac + ' ' + meterUnit,
                                y: 40, x: 20,
                                style: {
                                    font: '9px Verdana'
                                }
                            },
                        };
                        xVal++;
                    });
                });

                canvasId1 = {
                    graphType:response.graphType,
                    fromDate:response.fromDate,
                    toDate:response.toDate,
                    xAxisData:response.xAxisData,
                    chart: {
                        type: 'gauge', spacingTop: 10, spacingLeft: 15, height: 245, events: {
                            click: function (event) {
                                getModel(url, graph)
                            }
                        }
                    },
                    graphId: graphId,
                    graphName: graphName,
                    title: {
                        text: 'Date: ' + response.date,
                        style: {
                            color: '#666',
                            fontWeight: 'normal',
                            fontSize: 13,
                        },
                        margin: 10,
                        align: 'left',
                        x: 150,
                    },
                    
                    pane: paneArr,
                    yAxis: yAxisArr,
                    plotOptions: {
                        gauge: {
                            dataLabels: { enabled: false, style: { fontSize: 8 } },
                            dial: { radius: '100%', backgroundColor: 'silver', borderColor: 'black', borderWidth: 1, baseWidth: 1, topWidth: 1 }
                        }
                    }, series: seriesArr
                }
            }
        }
        else {
            var x = 0;
              if(response && response.result &&   response.result.length){

              
                    var len = response && response.result &&   response.result.length;
            if (len > 1) {
                if (len % 2) {
                    var height = 150 * 2 / (len + 1);
                    var padCanvas = 20 / (1 + len);
                    var width = height + 25 * (1 + len);
                } else {
                    var height = 150 * 2 / len;
                    var padCanvas = 20 / len;
                    var width = height + 25 * len;
                }
            } else {
                var height = 190;
                var width = 240;
            }
            response.result.map((value, i) => {
                value.forEach((val, index) => {
                    x = parseFloat(parseFloat(val['data' + i]).toFixed(2));
                    var canvas = document.createElement('canvas');
                    if (len > 1) {
                        canvas.setAttribute('style', 'float:left;padding:' + padCanvas + 'px;text-align:center;');
                    } else {
                        canvas.setAttribute('style', 'margin: 0 auto;padding-bottom:10px');
                    }

                    if (len > 1) {
                        canvas.setAttribute('height', height + 120 / len);
                        canvas.setAttribute('width', 275);
                    } else {
                        canvas.setAttribute('height', height + 45);
                        canvas.setAttribute('width', width);
                    }
                    canvas.setAttribute('id', 'canvas_tilt' + i);
                    canvasId1.append(canvas);
                    // $('#canvas' + canvasId).attr('onclick', 'getModel(' + "'" + url + "','" + graph + "'" + ')');
                    var ctx = canvas.getContext("2d");
                    var x1 = 275 - width;
                    var y1 = height;
                    var x2 = width;
                    var y2 = height;
                    var x3 = x1;
                    var y3 = height - width * Math.tan(x / 180 * Math.PI);
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    //ctx.rotate(x);
                    ctx.lineTo(x3, y3);
                    var linWid = 9 - parseInt(len / 2);
                    if (linWid < 5) {
                        linWid = 4;
                    }
                    ctx.lineWidth = linWid;
                    ctx.strokeStyle = '#135C8A';
                    ctx.lineCap = "square";
                    ctx.font = (16 - len / 2) + "px Verdana";
                    if (len > 1) {
                        if (len % 2) {
                            ctx.fillText(x + "°", width - width / 2, height - 2 * x / len);
                        } else {
                            ctx.fillText(x + "°", width - width / 2, height - 2 * x / len);
                        }
                    } else {
                        if (x > 10) {
                            ctx.fillText(x + "°", width - width / 2, height - x);
                        } else if (x === 0) {
                            ctx.fillText(x + "°", width - width / 2, height - x - 10);
                        } else {
                            ctx.fillText(x + "°", width - width / 2 - 30, height - x);
                        }
                    }
                    ctx.font = (15 - len / 2) + "px Verdana";
                    if (len > 1) {
                        ctx.font = "11px Verdana";
                        ctx.fillText("Cleaning Cycles for " + val['month_name' + i].substring(0, 3) + ": " + val['cleaning' + i], 50, height + 80 / len);
                        ctx.font = "9px Verdana";
                        ctx.fillText(val['plant_name' + i], 60, height + 120 / len);
                    } else {
                        ctx.fillText("Cleaning Cycles for " + val['month_name' + i].substring(0, 3) + ": " + val['cleaning' + i], 40, height + 20);
                        ctx.font = "11px Verdana";
                        ctx.fillText(val['plant_name' + i], 50, height + 35);
                    }
                    ctx.stroke();
                    ctx.fillStyle = "#135C8A";
                    ctx.beginPath();
                    if (len > 1) {
                        ctx.arc(x2, y2, 25, Math.PI, Math.PI + x * Math.PI / (90 + x));
                    } else {
                        ctx.arc(x2, y2, 75, Math.PI, Math.PI + x * Math.PI / 180);
                    }
                    ctx.closePath();
                    ctx.fill();
                });
            });
        }
        }
        // if (graph_name == undefined || graph_name == null){
        //     graph_name = response.graphName
        // }
        return doFormat(canvasId1);
    },
    exportCsv(response) {
        var headerArray = [];
        var str = null;
        var dataArray = [];
        var d = 0;
        var tempArr = [];
        var indexIndul = 0;
        let dataString = '';
        if (response.graphType === "stacked") {
            if (~response.label.indexOf("Forecast")) {
                headerArray[0] = 'Plant Name';
                headerArray[1] = 'Net Generation';
                headerArray[2] = 'Revenue INR';
                headerArray[3] = 'Budget Generation';
                var plantArray = [];
                var netArray = [];
                var budArray = [];
                var revArray = [];

                response.csv.map((value, i) => {
                    plantArray.push(value.name);
                    revArray.push(value.revenue);
                    netArray.push(value.data[0].toFixed(2));
                    budArray.push(value.data[1] ? value.data[1].toFixed(2) : '0.00');
                });

                var csvContent = '';
                headerArray.forEach((infoArray, index) => {
                    dataString = infoArray + ',';
                    csvContent += dataString;
                });
                csvContent += '\n';
                var newStr;
                for (var t = 0; t < plantArray.length; t++) {
                    newStr = plantArray[t].replace(/,/g, " ");
                    newStr = newStr + ',' + netArray[t];
                    newStr = newStr + ',' + revArray[t];
                    newStr = newStr + ',' + budArray[t];

                    csvContent += newStr + '\n';
                }
            }
            if (~response.label.indexOf("HUB")) {

                headerArray[0] = 'Name';
                headerArray[1] = 'Net Generation';
                headerArray[3] = 'Budget Generation';
                var plantArray = [];
                var netArray = [];
                var budArray = [];


                response.csv.map((value, i) => {
                    plantArray.push(value.name);
                    netArray.push(value.data[0].toFixed(2));
                    budArray.push(value.data[1] ? value.data[1].toFixed(2) : '0.00');
                });

                var csvContent = '';
                headerArray.forEach((infoArray, index) => {
                    dataString = infoArray + ',';
                    csvContent += dataString;
                });
                csvContent += '\n';
                var newStr;
                for (var t = 0; t < plantArray.length; t++) {
                    newStr = plantArray[t].replace(/,/g, " ");
                    newStr = newStr + ',' + netArray[t];
                    newStr = newStr + ',' + budArray[t];

                    csvContent += newStr + '\n';
                }
            }
        }
        if (response.graphType === "pie") {
            if (response.device === "pm_task_plantwise") {
                headerArray[0] = 'Plant Name';
                headerArray[1] = 'Total';
                headerArray[2] = 'Daily';
                headerArray[3] = 'Monthly';
                headerArray[4] = 'BiMonthly';
                headerArray[5] = 'Quarterly';
                headerArray[6] = 'HalfYearly';
                headerArray[7] = 'Yearly';
                var plantArray = [];
                var totalArray = [];
                var dailyArray = [];
                var monthlyArray = [];
                var biMonthlyArray = [];
                var quarterlyArray = [];
                var halfYearlyArray = [];
                var yearlyArray = [];
                var seriesData = [];
                var data = response.result[0];
                data = data.reverse();
                response.result[0] = data;
                response.result.map((value, i) => {
                    value.forEach((val, index) => {
                        val.y = parseInt(val.y);
                        seriesData.push(val);
                    });
                });
                seriesData.map((value, i) => {
                    plantArray.push(value.name);
                    totalArray.push(value.y);
                    dailyArray.push(value.daily);
                    monthlyArray.push(value.monthly);
                    biMonthlyArray.push(value.bimonthly);
                    quarterlyArray.push(value.quarterly);
                    halfYearlyArray.push(value.halfyearly);
                    yearlyArray.push(value.yearly);
                });
                var csvContent = '';
                headerArray.forEach((infoArray, index) => {
                    dataString = infoArray + ',';
                    csvContent += dataString;
                });
                csvContent += '\n';
                var newStr;
                for (var t = 0; t < plantArray.length; t++) {
                    newStr = plantArray[t].replace(/,/g, " ");
                    newStr = newStr + ',' + totalArray[t];
                    newStr = newStr + ',' + dailyArray[t];
                    newStr = newStr + ',' + monthlyArray[t];
                    newStr = newStr + ',' + biMonthlyArray[t];
                    newStr = newStr + ',' + quarterlyArray[t];
                    newStr = newStr + ',' + halfYearlyArray[t];
                    newStr = newStr + ',' + yearlyArray[t];
                    csvContent += newStr + '\n';
                }
            }
            else {
                headerArray[0] = 'Name';
                headerArray[1] = 'Total';
                headerArray[2] = 'Module Cleaning Anlysis';
                headerArray[3] = 'Partial Plantdown';
                headerArray[4] = 'Complete Plantdown';
                var plantArray = [];
                var totalArray = [];
                var mcaArray = [];
                var ppdArray = [];
                var cpdArray = [];
                var seriesData = [];
                var data = response.result[0];
                data = data.reverse();
                response.result[0] = data;
                response.result.map((value, i) => {
                    value.map((val, index) => {
                        val.y = parseInt(val.y);
                        seriesData.push(val);
                    });
                });
                seriesData.map((value, i) => {
                    plantArray.push(value.name);
                    totalArray.push(value.y);
                    mcaArray.push(value.mca);
                    ppdArray.push(value.ppd);
                    cpdArray.push(value.cpd);
                });
                var csvContent = '';
                headerArray.forEach((infoArray, index) => {
                    dataString = infoArray + ',';
                    csvContent += dataString;
                });
                csvContent += '\n';
                var newStr;
                for (var t = 0; t < plantArray.length; t++) {
                    newStr = plantArray[t].replace(/,/g, " ");
                    newStr = newStr + ',' + totalArray[t];
                    newStr = newStr + ',' + mcaArray[t];
                    newStr = newStr + ',' + ppdArray[t];
                    newStr = newStr + ',' + cpdArray[t];
                    csvContent += newStr + '\n';
                }
            }
        }
        if (response.graphType === "basic" && (response.x_axis === 'time' || response.x_axis === '24-hours')) {
            var unit = response.unit;
            var time;
            //var headerArray = [];
            headerArray[0] = 'Date';
            if (response.graphName.indexOf("PM Task") === -1) {
                headerArray[1] = 'Time';
            }
            //var str = null;
            //var dataArray  = [];
            var timeArray = [];
            var xAxis = response.x_axis;
            var timeCnt = 0;
            var percentArr = response.coefficient.split(',');
            var dataVal;
            var yeildVal;
            response.result.map((value, i) => {
                value.forEach((val, index) => {
                    if (checkQuarterTime(val['time' + i]) === true) {
                        if (str !== null && str !== val['individual_name' + i]) {
                            dataArray[d] = tempArr;
                            d++;
                            indexIndul = 0;
                            tempArr = [];

                        }
                        str = val['individual_name' + i];
                        if (inArray(str, headerArray) < 0) {
                            headerArray[headerArray.length] = str;
                            if (str === 'Net generation' && response.graphName.toLowerCase().indexOf("provisional") === -1) {
                                headerArray[headerArray.length] = 'Revenue INR';
                            }
                        }
                        if (response.time === "quarterly" || response.time === "halfyearly") {
                            time = response.fromDate + " to " + response.toDate;
                        } else if (unit === 'year') {
                            time = val['year' + i];
                        } else if (unit === 'month') {
                            time = val['year' + i] + ' ' + val['month' + i];
                        } else if (unit === 'day') {
                            time = val['date' + i];
                        } else if (unit === 'hour') {
                            time = val['date' + i] + '!@#' + val['time' + i];
                        } else {
                            time = val['date' + i] + '!@#' + val['time' + i];
                        }
                        if (inArray(time.trim(), timeArray) < 0) {
                            timeArray[timeCnt] = time.trim();
                            timeCnt++;
                        }

                        if (val['data' + i] !== null) {
                            dataVal = val['data' + i];
                        } else {
                            dataVal = 0;
                        }
                        let taVal = 0;
                        if (val['tariff' + i] !== null) {
                            taVal = val['data' + i];
                        } else {
                            taVal = 0;
                        }
                        yeildVal = (parseFloat(percentArr[i]) * parseFloat(dataVal)).toFixed(2);
                        if (str === 'Net generation' && response.graphName.toLowerCase().indexOf("provisional") === -1) {
                            tempArr[indexIndul] = [time, yeildVal, yeildVal * taVal];
                            indexIndul++;
                        }
                        else {
                            tempArr[indexIndul] = [time, yeildVal];
                            indexIndul++;
                        }
                    }
                });
            });
            dataArray[d] = tempArr;
            timeArray = timeArray.sort();
            var csvContent = '';
            headerArray.forEach((infoArray, index) => {
                dataString = infoArray + ',';
                csvContent += dataString;
            });
            csvContent += '\n';
            var newStr;
            for (var t = 0; t < timeArray.length; t++) {
                newStr = timeArray[t];
                let newStrSplit = newStr.split('!@#');
                if (newStrSplit.length > 1) {
                    newStr = newStrSplit[0] + ',' + newStrSplit[1];
                } else {
                    newStr = newStr + ', ';
                }
                for (d = 0; d < dataArray.length; d++) {
                    let flag = 1;
                    for (var t2 = 0; t2 < dataArray[d].length; t2++) {
                        if (timeArray[t] === dataArray[d][t2][0]) {
                            if (dataArray[d][0].length === 3) {
                                newStr = newStr + ',' + dataArray[d][t2][1] + ',' + dataArray[d][t2][2];
                            }
                            else {
                                newStr = newStr + ',' + dataArray[d][t2][1];
                            }
                            flag = 0;
                        }
                    }
                    if (flag === 1) {
                        if (dataArray[d][0].length === 3) {
                            newStr = newStr + ',0.00' + ',0.00';
                        }
                        else {
                            newStr = newStr + ',0.00';
                        }
                    }

                }
                if (response.graphName.indexOf("PM Task") !== -1) {
                    newStr = newStr.replace(", ,", ",");
                }
                var sp = newStr.split(',');
                csvContent += newStr + '\n';
            }

        } else if (response.graphType === "basic" && response.x_axis === 'plant') {
            var plantArray = [];
            var plant;
            headerArray[0] = response.x_axis;
            response.result.map((value, i, ) => {
                value.forEach((val, index) => {
                    //console.log(index);
                    if (str !== null && str !== val['individual_name' + i]) {
                        dataArray[d] = tempArr;
                        d++;
                        indexIndul = 0;
                        tempArr = [];

                    }
                    str = val['individual_name' + i];
                    if (inArray(str, headerArray) < 0) {
                        headerArray[headerArray.length] = str;
                        if (val['actual_generation' + i] !== null) {
                            headerArray[2] = 'Net Generation';

                        }
                    }
                    plant = val['plant' + i];
                    if (inArray(plant, plantArray) < 0) {
                        plantArray[plantArray.length] = plant;
                    }
                    if (val['actual_generation' + i] !== null) {
                        tempArr[indexIndul] = [plant, parseFloat(val['data' + i]).toFixed(4), val['actual_generation' + i]];
                    }
                    else {
                        tempArr[indexIndul] = [plant, parseFloat(val['data' + i]).toFixed(2)];
                    }

                    indexIndul++;
                });
                //alert(tempArr);
            });
            dataArray[d] = tempArr;
            //	console.log(dataArray);
            //	console.log(headerArray.length);
            var csvContent = '';
            headerArray.forEach((infoArray, index) => {
                dataString = infoArray + ',';
                csvContent += dataString;
            });
            csvContent += '\n';
            var newStr;
            for (var t = 0; t < plantArray.length; t++) {
                newStr = plantArray[t].replace(/,/g, " ");
                for (d = 0; d < dataArray.length; d++) {
                    let flag = 1;
                    for (var t2 = 0; t2 < dataArray[d].length; t2++) {
                        if (plantArray[t] === dataArray[d][t2][0]) {
                            newStr = newStr + ',' + dataArray[d][t2][1];
                            if (dataArray[d][t2][2] !== null) {
                                newStr = newStr + ',' + dataArray[d][t2][2];
                            }
                            flag = 0;
                        }
                    }
                    if (flag === 1) {
                        newStr = newStr + ',0.00';
                    }
                }
                var sp = newStr.split(',');
                csvContent += newStr + '\n';
            }
        }
        else if (response.graphType === "basic" && response.x_axis === 'inverter') {
            var plantArray = [];
            var plant;
            headerArray[0] = response.x_axis;
            response.result.map((value, i, ) => {
                value.forEach((val, index) => {
                    //console.log(index);
                    if (str !== null && str !== val['inverter' + i]) {
                        dataArray[d] = tempArr;
                        d++;
                        indexIndul = 0;
                        tempArr = [];

                    }
                    str = val['inverter' + i];
                    if (inArray(str, headerArray) < 0) {
                        headerArray[headerArray.length] = str;
                    }
                    plant = val['plant' + i];
                    if (inArray(plant, plantArray) < 0) {
                        plantArray[plantArray.length] = plant;
                    }

                    tempArr[indexIndul] = [plant, parseFloat(val['data' + i]).toFixed(4)];


                    indexIndul++;
                });
                //alert(tempArr);
            });
            dataArray[d] = tempArr;
            //console.log(dataArray);
            //console.log(headerArray.length);
            var csvContent = '';
            headerArray.forEach((infoArray, index) => {
                dataString = infoArray + ',';
                csvContent += dataString;
            });
            csvContent += '\n';
            var newStr;
            for (var t = 0; t < plantArray.length; t++) {
                newStr = "(AVG( id.pac_kw ) / i.dc_loading)*100";
                for (d = 0; d < dataArray.length; d++) {
                    let flag = 1;
                    for (var t2 = 0; t2 < dataArray[d].length; t2++) {
                        if (plantArray[t] === dataArray[d][t2][0]) {
                            newStr = newStr + ',' + dataArray[d][t2][1];
                            if (dataArray[d][t2][2] !== null) {
                                newStr = newStr + ',' + dataArray[d][t2][2];
                            }
                            flag = 0;
                        }
                    }
                    if (flag === 1) {
                        newStr = newStr + ',0.00';
                    }
                }
                var sp = newStr.split(',');
                csvContent += newStr + '\n';
            }
        }
        let csvName = '';
        if (csvContent !== null && csvContent !== '') {
            var encodedUri = "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent);
            if (encodedUri !== null && encodedUri !== '') {
                if (response.graphName !== null && response.graphName !== '') {
                    if (response.plant_name !== null && response.plant_name !== '') {
                        csvName = response.graphName.replace(/,\s+/g, "_") + '_' + response.plant_name.replace(/,\s+/g, "_") + '_' + response.fromDate.replace(/,\s+/g, "_") + '_TO_' + response.toDate.replace(/,\s+/g, "_");
                        csvName = csvName + '.csv';
                    }
                    else {
                        csvName = response.graphName;
                        csvName = csvName + '.csv';
                    }
                }
                ('#csv_export').attr('href', encodedUri);
                ('#csv_export').attr('download', csvName);
                //console.log(csvContent);
            }
        }
    }
}

function sin(x) {
    return Math.sin(x / 180 * Math.PI);
}
function cos(x) {
    return Math.cos(x / 180 * Math.PI);
}
function inArray(needle, haystack) {
    let length = haystack.length;
    for (let i = 0; i < length; i++) {
        if (haystack[i] === needle) return true;
    }
    return false;
}

function checkQuarterTime(timeVal) {
    if (timeVal !== undefined) {
        let splitTime = timeVal.split(':');
        if (splitTime[1].substring(0, 1) === '0') {
            splitTime[1] = splitTime[1].substring(1, 2);
        }
        if (parseInt(splitTime[1]) % 15 === 0) {
            return true;
        } else {
            return false;
        }
    } else {
        return true;
    }
}

function getModel() { }

function convertToJSON(data) {
    return JSON.parse(data);
}


function doFormat(data) {
    if (data && data.chart && data.chart.type && data.chart.type !== "gauge") {
        let _yAxis = [];
        let i = 0;
        data.yAxis && data.yAxis.length > 0 && data.yAxis.map(items => {
            if (!items.title.text.includes("null")) {
                _yAxis.push(items);
            }
        })
        data.yAxis = _yAxis;
    }
    return data
}
