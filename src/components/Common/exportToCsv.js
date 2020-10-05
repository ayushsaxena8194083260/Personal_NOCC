import Highcharts from 'highcharts';

export default {
    exportCsv(response) {
        // let fstArray = [];
        // if (response.graphId == 305){
        //     let firstArray = response.result[0];
        //     let secondArray = response.result[1];
        //     let obj = {};
        //     let columnName1 = firstArray[0].individual_name0;
        //     let columnName2 = secondArray[0].individual_name1;
        //     for (let i = 0; i < firstArray.length - 1; i++){
        //         const inso = secondArray && secondArray.filter((flt)=>flt.time1 ==firstArray[i].time0)[0];
        //         let insolation ="0.00"
        //         if(inso){
        //             insolation = inso.data1;
        //         }
    
        //         let obj ={
        //             "Date":firstArray[i].date0,
        //             "Time":firstArray[i].time0
        //         }
        //         obj[columnName1] =firstArray[i].data0;
        //         obj[columnName2] =insolation;
        //         fstArray.push({...obj}) 
        //     }    
        // } else if (response.graphId == 274){
        //     let firstArrayData = [];
        //     let firstArray = response.result[0];
        //     let secondArray = response.result[1];
        //     let thirdArray = response.result[2];
        //     let columnName1 = firstArray[0].individual_name0;
        //     let columnName2 = secondArray[0].individual_name1;
        //     let columnName3 = thirdArray[0].individual_name2;
        //     let dataArray = [];
        //     let str = null;
        //     let tempArr = [];
        //     let headerArray = [];
        //     let d = 0;
        //     let indexIndul = 0;
        //     let dataString = '';
        //     let timeArray = '';
        //     let timeCnt = 0;
        //     let unit = response.timeGroup;
        //     let time;
        //     let percentArr = response.coefficient.split(',');
        //     let dataVal;
        //     let yeildVal;
        //     for (let i = 0; i < firstArray.length - 1; i++){
        //         const inso = secondArray && secondArray.filter((flt)=>flt.time1 ==firstArray[i].time0)[0];
        //         const webbox = thirdArray && thirdArray.filter((flt1)=>flt1.time2 ==firstArray[i].time0)[0];
        //         let insolation ="0.00"
        //         let webbox_2 = "0.00"
        //         if(inso){
        //             insolation = inso.data1;
        //         }
        //         if(webbox){
        //             webbox_2 = webbox.data2;
        //         }
    
        //         let obj ={
        //             "Date":firstArray[i].date0,
        //             "Time":firstArray[i].time0
        //         }
        //         obj[columnName1] =firstArray[i].data0;
        //         obj[columnName2] =insolation;
        //         obj[columnName3] =webbox_2;
        //         fstArray.push({...obj}) 
        //     }
        // } else if (response.graphId == 225){
        //     let firstArray = response.result[0];
        //     let secondArray = response.result[1];
        //     let thirdArray = response.result[2];
        //     let columnName1 = firstArray[0].individual_name0;
        //     let columnName2 = secondArray[0].individual_name1;
        //     let columnName3 = thirdArray[0].individual_name2;
        //     for (let i = 0; i < firstArray.length; i++){
        //         const budget = secondArray && secondArray.filter((flt)=>flt.date1 ==firstArray[i].date0)[0];
        //         const actualPlf = thirdArray && thirdArray.filter((flt)=>flt.date2 ==firstArray[i].date0)[0];
        //         let budgetGeneration ="0.00"
        //         let plfGeneration = "0.00"
        //         if(budget){
        //             budgetGeneration = budget.data1;
        //         }
        //         if(actualPlf){
        //             plfGeneration = actualPlf.data2;
        //         }
    
        //         let obj ={
        //             "Date":firstArray[i].date0,
        //         }
        //         obj[columnName1] =firstArray[i].data0;
        //         obj[columnName2] =budgetGeneration;
        //         obj[columnName3] =plfGeneration;
        //         fstArray.push({...obj}) 
        //     }
        // } else if (response.graphId == 838){
        //     let firstArray = response.result[0];
        //     let secondArray = response.result[1];
        //     let columnName1 = firstArray[0].individual_name0;
        //     let columnName2 = secondArray[0].individual_name1;
        //     for (let i = 0; i < firstArray.length; i++){
        //         const budget = secondArray && secondArray.filter((flt)=>flt.year1 ==firstArray[i].year0)[0];
        //         let budgetGeneration ="0.00"
        //         if(budget){
        //             budgetGeneration = budget.data1;
        //         }    
        //         let obj ={
        //             "Date":firstArray[i].year0+" "+firstArray[i].month0,
        //         }
        //         obj[columnName1] =firstArray[i].data0;
        //         obj[columnName2] =budgetGeneration;
        //         fstArray.push({...obj}) 
        //     }
        // }
        // console.log(fstArray)
        // return fstArray;
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
        function isJson(str) {
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
        }
        if (response.graphType === "basic" && (response.xAxisData === 'time' || response.xAxisData === '24-hours')) {
            var unit = response.timeGroup;
            var time;
            //var headerArray = [];
            headerArray[0] = 'Date';
            if (response.graphName.indexOf("PM Task") === -1) {
                headerArray[1] = 'Time';
            }
            //var str = null;
            //var dataArray  = [];
            var timeArray = [];
            var xAxis = response.xAxisData;
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
                        if (!(headerArray.includes(str)))  {
                            headerArray[headerArray.length] = str;
                            if (str === 'Net generation' && response.graphName.toLowerCase().indexOf("provisional") === -1) {
                                headerArray[headerArray.length] = 'Revenue INR';
                            }
                        }
                        if (response.timePeriod === "quarterly" || response.timePeriod === "halfyearly") {
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
                        if (!(timeArray.includes(time))) {
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

        } else if (response.graphType === "basic" && response.xAxisData === 'plant') {
            var plantArray = [];
            var plant;
            headerArray[0] = response.xAxisData;
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
        
        else if (response.graphType === "basic" && response.xAxisData === 'inverter') {
            var plantArray = [];
            var plant;
            headerArray[0] = response.xAxisData;
            
            let resultArr= isJson(response.result)?JSON.parse(response.result):response.result
            resultArr.map((value, i, ) => {
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
                        csvName = response.graphName.replace(/,\s+/g, "_")+ '_' + response.fromDate.replace(/,\s+/g, "_") + '_TO_' + response.toDate.replace(/,\s+/g, "_");//// + '_' + response.plant_name.replace(/,\s+/g, "_")
                        csvName = csvName + '.csv';
                    }
                    else {
                        csvName = response.graphName;
                        csvName = csvName + '.csv';
                    }
                }
                download(csvName,csvContent)
            }
        }
    }
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
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

// function checkQuarterTime(timeVal) {
//     if (timeVal !== undefined) {
//         let splitTime = timeVal.split(':');
//         if (splitTime[1].substring(0, 1) === '0') {
//             splitTime[1] = splitTime[1].substring(1, 2);
//         }
//         if (parseInt(splitTime[1]) % 15 === 0) {
//             return true;
//         } else {
//             return false;
//         }
//     } else {
//         return true;
//     }
// }
