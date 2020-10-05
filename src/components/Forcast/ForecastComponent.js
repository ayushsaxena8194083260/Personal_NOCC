import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import DropDown from "../Common/DropDown";
import { AgGridReact } from "ag-grid-react";
import 'react-picky/dist/picky.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import '../../styles/plant/plantFaultData.scss';
import '../../App.scss';
import { getPlantByType } from "../../actions/moduleCleaningAnalysisActions";
import { getAllPlants } from "../../actions/PlantActions";
import { getForecastReport } from '../../actions/action-Report';
import { clearForecast, getForecastDashboard, CreateorupdateForecastcalculation } from '../../actions/action-Forecasting';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

class ActionCellRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.involkeEdit = this.involkeEdit.bind(this);
    }
    involkeEdit(){
        const commGF = true;
        this.props.context.componentParent.editForecast(commGF, this.props.node.data, this.props.context.componentParent.state, this.props.context.componentParent.state.reportData[0].plantName);
    }
    render() {
        return (<div className="products-actions">
            <Link className="products-actions-link"
                to="#" onClick={this.involkeEdit} title="Edit" >
                <img src="/images/editIcon.png" alt="Edit" />
            </Link>
        </div>);
    }
}

class ForecastComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toDate: this.props.todayDate,
            selectedDays: null,
            selectedWeightage: null,
            reportData: this.props.reportData,
            reportData1: this.props.reportData1,
            forecastDataPlus: this.props.forecastDataPlus,
            selectedPlanType: null,
            plantTypes: this.props.plantTypes,
            selectedPlantOptions: [],
            overlayLoadingTemplate: '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>',
            overlayNoRowsTemplate: "<p class='message warning'>No Record found.</p>",
            showPlantDetails: false,
            displayTime: null,
            postData:[],
            showPopUp: false,
            searchData: [],
            plantName: ''
        };
        this.selectMultipleOption = this.selectMultipleOption.bind(this);
    }

    componentDidMount() {
        // document.title = 'Plant Fault Data';
        this.props.clearForecast();
    }
    componentDidUpdate() {
        //this.props.getProjectNames(this.state.selectedValue);
    }

    handleChangeDays(event) {
        const selectedValue = event.target.value;
        this.setState({ selectedDays: selectedValue });
    }

    handleChange(event) {
        const selectedValue = event.target.value;
        this.setState({ selectedWeightage: selectedValue });
    }

    handleChangePlantType(event) {
        const selectedValue = event.target.value;
        if (selectedValue !== this.state.selectedPlantType) {
            this.props.getPlantByType(selectedValue);
            this.setState({ selectedPlantType: selectedValue, selectedPlantOptions: null });
        }
    }

    handleChangePlants(event) {
        const selectedValue = event.target.value;
        this.setState({ selectedPlantOptions: selectedValue });
    }

    dateAdd(date, interval, units) {
        if(!(date instanceof Date))
          return undefined;
        var ret = new Date(date); //don't change original date
        var checkRollover = function() { if(ret.getDate() != date.getDate()) ret.setDate(0);};
        switch(String(interval).toLowerCase()) {
          case 'year'   :  ret.setFullYear(ret.getFullYear() + units); checkRollover();  break;
          case 'quarter':  ret.setMonth(ret.getMonth() + 3*units); checkRollover();  break;
          case 'month'  :  ret.setMonth(ret.getMonth() + units); checkRollover();  break;
          case 'week'   :  ret.setDate(ret.getDate() + 7*units);  break;
          case 'day'    :  ret.setDate(ret.getDate() + units);  break;
          case 'hour'   :  ret.setTime(ret.getTime() + units*3600000);  break;
          case 'minute' :  ret.setTime(ret.getTime() + units*60000);  break;
          case 'second' :  ret.setTime(ret.getTime() + units*1000);  break;
          default       :  ret = undefined;  break;
        }
        return ret;
      }

      getCurrentTime() {
        let currentDate = new Date();

        let seconds = Math.floor(currentDate / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        let days = Math.floor(hours / 24);

        hours = hours - (days * 24);
        minutes = minutes - (days * 24 * 60) - (hours * 60);
        minutes = minutes - 30;
        seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);

        this.setState({ displayTime: hours + ":" + minutes + ":" + seconds })
    }

    getDate(cDate) {
        const today = new Date(cDate);
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
    }

    getrenderForecast() {
        let today = new Date();
        let _todayDate = this.getDate(today);
        let inputParams = {
            "date": "2019-01-01",
            "fromDate": null,
            "insolationDate": "",
            "insolationDates": [
              ""
            ],
            "insolationTime": [
              {}
            ],
            "insolationValue1": 0,
            "insolationValue2": 0,
            "pageName":"Forecasting",
            "plantId": 6,
            "tempMdule1": 0,
            "tempMdule2": 0,
            "time": "",
            "timeSlotId": "",
            "timeSlotName": "",
            "toDate": null,
            "variableId": 0,
            "weatherStationId": 0,
            "weightage": 1,
            "tDays":1
          }
    let selectParams = { plantId: parseInt(this.state.selectedPlantOptions), date: this.state.toDate, tdays: this.state.selectedDays ? parseInt(this.state.selectedDays):0, weightage:this.state.selectedWeightage ? parseInt(this.state.selectedWeightage):0}
        let _todayDate1 = new Date();
        let displayTm = this.dateAdd(_todayDate1, "minute", -30);
        let _hours = displayTm.getHours();
        let _minutes = displayTm.getMinutes();
        let _seconds = displayTm.getSeconds();
        this.setState({displayTime: _hours+":"+_minutes+":"+_seconds});
        this.setState({ showPlantDetails: true })
        this.props.getForecastDashboard({ ...inputParams, ...selectParams });
    }

    selectOption(value) {
        console.log("Vals", value);
        this.setState({ value });
    }

    selectMultipleOption(value) {
        this.setState({ selectedPlantOptions: value });
    }

    createColumnDefs() {
        return [
            {
                headerName: "Time Slot", field: "timeSlot", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Available Capacity", field: "availableCapacity", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Actual(KW)", field: "actualkw", cellClass: 'cell-wrap',
                autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Forecast(KW)", field: "forecastkw", cellClass: 'cell-wrap',
                autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Forecast 2(KW)", field: "forecast2kw", cellClass: 'cell-wrap',
                autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Weighted Average Forecast", field: "weightedAverageForecast", cellClass: 'cell-wrap',
                autoHeight: true, width: 150, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Deviation Respect To Schedule", field: "deviationRespectToSchedule", cellClass: 'cell-wrap',
                autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Absolute Error", field: "absoluteError", cellClass: 'cell-wrap',
                autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Actual Irradiance(W/M2)", field: "actualIrradianceW", cellClass: 'cell-wrap',
                autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Forecasted Irradiance(W/M2)", field: "forecastedIrradiance", cellClass: 'cell-wrap',
                autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Actual Module Temperature Loss", field: "actualModuleTemperatureLoss", cellClass: 'cell-wrap',
                autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Forecasted Module Temperature Losses", field: "forecastedModuleTempLosses", cellClass: 'cell-wrap',
                autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Actual System Losses", field: "actualSystemLosses", cellClass: 'cell-wrap',
                autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Forecasted System Losses", field: "forecastedSystemLosses", cellClass: 'cell-wrap',
                autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' }
            },
        ];
    }

    createColumnDefsTwo() {
        return [
            {
                headerName: "Time Slot", field: "timeSlot", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Available Capacity", field: "plantCapacityAc", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Irradiance (W/M2)", field: "irradiance", cellClass: 'cell-wrap',
                autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Forecasted Module Temperature Loss", field: "module_temperature_forecast", cellClass: 'cell-wrap',
                autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "System Losses", field: "system_losses", cellClass: 'cell-wrap',
                autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Generation Forecast(KW)", field: "generation_forecast", cellClass: 'cell-wrap',
                autoHeight: true, width: 150, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Adjusted Irradiance (W/M2)", field: "adjusted_irradiance", cellClass: 'cell-wrap',
                autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Adjusted Forecasted Module Temperature Loss", field: "adjusted_module_temperature_forecast", cellClass: 'cell-wrap',
                autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Adjusted System Losses", field: "adjusted_system_losses", cellClass: 'cell-wrap',
                autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Adjusted Generation Forecast(KW)", field: "adjusted_generation_forecast", cellClass: 'cell-wrap',
                autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Action",
                field: '',
                cellRendererFramework: ActionCellRenderer,
                width: 100,
            }
        ];
    }

    ModalClose() {
        this.setState({ commGF: false });
    }

    editForecast(gfShowValue, data, data1, pName) {
        this.setState({
            ...this.state,
            commGF: gfShowValue,
            postData: data,
            searchData: data1,
            plantName: pName
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== null) {
            this.setState({
                projectTypes: nextProps.projectTypes,
                plantTypes: nextProps.plantTypes,
                days: nextProps.days,
                reportData: nextProps.reportData,
                reportData1: nextProps.reportData1,
                forecastDataPlus: nextProps.forecastDataPlus
            })
        }
    }

    getDropDownDays() {
        return this.props.days && this.props.days.map((item) => { return { displayText: item, value: item } });
    }

    getDropDownPlants() {
        let plants = [];
        plants.push({ displayText: "Select Plant", value: "0" })
        this.state.plantTypes && this.state.plantTypes.map((item) => {
            plants.push({ displayText: item.plantName, value: item.plantId })
        });
        return plants;
    }

    // sendEmail() {
    //     let formated_current_rounder_hr_plus_two = this.state.reportData.plusTwo;
    //     let actual_email_data = this.input.post('Actual_Accept_Send');
    //     let forecasted_email_data = this.input.post('Adjust_Accept_Send');
        // let only_rounded_hour = formated_current_rounder_hr_plus_two.split(":");//explode(':', formated_current_rounder_hr_plus_two);

        // // Send email based on actual data
        // if (actual_email_data) {
        //     this.actual_email_content(plantData, formated_current_rounded_hour, res_next_hour_array);
        // }
        // // Send email based on forecasted data
        // if (forecasted_email_data) {
        //     this.forecasted_email_content(plantData, formated_current_rounded_hour, only_rounded_hour[0], res_next_hour_array);
        // }
    // }

    // # Actual Forecasted email sheet
    // actual_email_content($plantData, $formated_current_rounded_hour, $res_next_hour_array) {
        // $subject = '';
        // $body = '';
        // $emailDetails = $this->alm->getEmailTemplateDetailsByID(46);
        // if(count($emailDetails) > 0) {
        //     if($emailDetails->subject) {
        //         $email_subject = str_replace("{plant_name}", $plantData->plant_name, $emailDetails->subject);
        //     }
        //     if ($emailDetails->body) {
        //         $body = $emailDetails->body;
        //         $email_body = "Please find the Next hour forecast for the plant " . $plantData->plant_name . "</br></br></br>";
        //         $email_body .= '<table width="25%">
        //                             <tbody><tr>
        //                                 <td width="10%">Plant Name</td>
        //                                 <td width="20%">'. $plantData->plant_name .'</td>
        //                             </tr>
        //                             <tr>
        //                                 <td width="10%">Plant Capacity AC</td>
        //                                 <td width="20%">'. $plantData->plant_capacity_ac .'</td>
        //                             </tr>
        //                             <tr>
        //                                 <td width="10%">Date</td>
        //                                 <td width="20%">'. date('Y-m-d') .'</td>
        //                             </tr>
        //                             <tr>
        //                                 <td width="10%">Time</td>
        //                                 <td width="20%">
        //                                 '. $formated_current_rounded_hour .'
        //                                 </td>
        //                             </tr>
        //                             </tbody>
        //                     </table>';

        //         $makeDataGM = '';
        //         if (count($res_next_hour_array) > 0) {
        //             $partOfRow = '  <tr>
        //                                 <td align="right">##Time_Slot##</td>
        //                                 <td align="right">##Available_Capacity##</td>
        //                                 <td>##Irradiance##</td>
        //                                 <td>##Forecasted_Module_Temperature##</td>
        //                                 <td>##System_Losses##</td>
        //                                 <td align="right">##Generation_Forecast##</td>
        //                             </tr>';
        //             foreach ($res_next_hour_array as $time_solt => $forecasted_data) {
        //                 if(isset($forecasted_data['irradiance'])) {
        //                     $makeDataGM .= str_replace(
        //                                 array('##Time_Slot##', 
        //                                     "##Available_Capacity##", 
        //                                     '##Irradiance##', 
        //                                     '##Forecasted_Module_Temperature##', 
        //                                     '##System_Losses##', 
        //                                     '##Generation_Forecast##'), 
        //                                 array($time_solt, 
        //                                     $plantData->plant_capacity_ac, 
        //                                     $forecasted_data['irradiance'], 
        //                                     $forecasted_data['module_temperature_forecast'], 
        //                                     $forecasted_data['system_losses'], 
        //                                     $forecasted_data["generation_forecast"]), 
        //                             $partOfRow);
        //                 }
        //             }
        //         }
        //         $body = str_replace('##msg_data##', $email_body, $body);
        //         $body = str_replace('##row_data##', $makeDataGM, $body);
        //         #echo $body; exit;
        //         $this->um->sendEMail($email_subject, $body, 'c.kumanan@compassitesinc.com');
        //     }
        // }
    // }
    
    // # Adjusted Forecasted email sheet
    // forecasted_email_content($plantData, $formated_current_rounded_hour, $only_rounded_hour, $res_next_hour_array) {
        // $subject = '';
        // $body = '';
        // $emailDetails = $this->alm->getEmailTemplateDetailsByID(45);
        // if(count($emailDetails) > 0) {
        //     if($emailDetails->subject) {
        //         $email_subject = str_replace("{plant_name}", $plantData->plant_name, $emailDetails->subject);
        //     }
        //     if ($emailDetails->body) {
        //         $body = $emailDetails->body;
        //         $email_body = "Please find the Next hour forecast for the plant " . $plantData->plant_name . "</br></br></br>";
        //         $email_body .= '<table width="25%">
        //                             <tbody><tr>
        //                                 <td width="10%">Plant Name</td>
        //                                 <td width="20%">'. $plantData->plant_name .'</td>
        //                             </tr>
        //                             <tr>
        //                                 <td width="10%">Plant Capacity AC</td>
        //                                 <td width="20%">'. $plantData->plant_capacity_ac .'</td>
        //                             </tr>
        //                             <tr>
        //                                 <td width="10%">Date</td>
        //                                 <td width="20%">'. date('Y-m-d') .'</td>
        //                             </tr>
        //                             <tr>
        //                                 <td width="10%">Time</td>
        //                                 <td width="20%">
        //                                 '. $formated_current_rounded_hour .'
        //                                 </td>
        //                             </tr>
        //                             </tbody>
        //                     </table>';

        //         $makeDataGM = '';
        //         if (count($res_next_hour_array) > 0) {
        //             $partOfRow = '  <tr>
        //                                 <td align="right">##Time_Slot##</td>
        //                                 <td align="right">##Available_Capacity##</td>
        //                                 <td>##Irradiance##</td>
        //                                 <td>##Forecasted_Module_Temperature##</td>
        //                                 <td>##System_Losses##</td>
        //                                 <td align="right">##Generation_Forecast##</td>
        //                                 <td align="right">##Adjusted_Irradiance##</td>
        //                                 <td align="right">##Adjusted_Forecasted_Module_Temperature##</td>
        //                                 <td align="right">##Adjusted_System_Losses##</td>
        //                                 <td align="right">##Adjusted_Generation_Forecast##</td>
        //                             </tr>';
        //             foreach ($res_next_hour_array as $time_solt => $forecasted_data) {
        //                 $only_time_slot_minutes = explode(':', $time_solt);
        //                 if($only_rounded_hour == $only_time_slot_minutes[0]) {
        //                     $makeDataGM .= str_replace(
        //                                 array('##Time_Slot##', 
        //                                     "##Available_Capacity##", 
        //                                     '##Irradiance##', 
        //                                     '##Forecasted_Module_Temperature##', 
        //                                     '##System_Losses##', 
        //                                     '##Generation_Forecast##', 
        //                                     '##Adjusted_Irradiance##', 
        //                                     '##Adjusted_Forecasted_Module_Temperature##', 
        //                                     '##Adjusted_System_Losses##', 
        //                                     '##Adjusted_Generation_Forecast##'), 
        //                                 array($time_solt, 
        //                                     $plantData->plant_capacity_ac, 
        //                                     $forecasted_data['irradiance'], 
        //                                     $forecasted_data['module_temperature_forecast'], 
        //                                     $forecasted_data['system_losses'], 
        //                                     $forecasted_data["generation_forecast"], 
        //                                     $forecasted_data["adjusted_irradiance"], 
        //                                     $forecasted_data["adjusted_module_temperature_forecast"], 
        //                                     $forecasted_data["adjusted_system_losses"], 
        //                                     $forecasted_data["adjusted_generation_forecast"]), 
        //                             $partOfRow);
        //                 }
        //             }
        //         }
        //         $body = str_replace('##msg_data##', $email_body, $body);
        //         $body = str_replace('##row_data##', $makeDataGM, $body);
        //         #echo $body; exit;
        //         $this->um->sendEMail($email_subject, $body, 'c.kumanan@compassitesinc.com');
        //     }
        // }
    // }

    handleChange(data, field) {
        let postDataDup = this.state.postData;
        postDataDup[field] = data.target.value;
        this.setState({postData: postDataDup});
        // if (field === "cleaned_energy"){
        //     postDataDup["cleaned_energy": data.target.value]
        //     //this.setState({postDataDup: data.target.value})
        // }else if (field === "Uncleaned_energy"){
        //     this.setState({UncleanedEnergy: data.target.value})
        // }
    }

    onSubmit = () => {
        if (this.state.postData !== null) {
            let today = new Date();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            const inputParams = {
                    "absoluteError": 0,
                    "adjustedForModTempLoss": 0,
                    "adjustedGenerationForecast": 0,
                    "adjustedIrradiance": 0,
                    "adjustedSystemLosses": 0,
                    "date": this.state.searchData.toDate,
                    "forecastCalculationId": 0,
                    "generationForecast": 0,
                    "generationForecast2": 0,
                    "generationSystemLosses": 0,
                    "insolationForecast": 0,
                    "insolationForecastCount": 0,
                    "insolationForecastDeviation": 0,
                    "moduleTemperatureDeviation": 0,
                    "moduleTemperatureForecast": 0,
                    "moduleTemperatureForecastCount": 0,
                    "multiplyFactorData": 0,
                    "penaltyActualData": 0,
                    "penaltyCalculatedData": 0,
                    "penaltyDifferenceData": 0,
                    "plantId": this.state.searchData.selectedPlantOptions,
                    "plantName": this.state.plantName,
                    "time": time
                  }
            const _data = {...inputParams,...this.state.postData}
            // const searchData = {time: time,plantId: this.state.searchData.selectedPlantOptions, date:this.state.searchData.toDate};
            this.props.CreateorupdateForecastcalculation(_data);
            this.ModalClose();
            // this.props.getModuleCleaningAnalysisDataByDate({ plant_id: this.state.selectedPlantOptions, fromDate: this.state.selectedFromDate, toDate: this.state.selectedToDate });
        }
    }

    handleChangeToDate(event) {
        const selectedDate = event.target.value;
        this.setState({ toDate: selectedDate });
    }

    render() {
        const ModalClose = () => {
            this.setState({ commGF: false });
        }
        return (
            <>
                <div>
                    <div className="main-content">
                        <div className="top-filter">
                            <div className="row" style={{ alignItems: "center", margin: "0" }} >
                                <Col xs={1} style={{ maxWidth: "6%" }}>
                                    <Form.Label>Type:</Form.Label>
                                </Col>
                                <Col style={{ maxWidth: "16%", padding: "0" }}>
                                    <DropDown
                                        className="top-search-input form-control"
                                        Name="plantType"
                                        itemSource={this.props.plantType}
                                        value={this.state.selectedPlantType}
                                        handleChange={(item) => this.handleChangePlantType(item)}
                                    />

                                </Col>
                                <Col xs={1} style={{ maxWidth: "6%" }}>
                                    <Form.Label>Plant:</Form.Label>
                                </Col>
                                <Col style={{ maxWidth: "13%", padding: "0" }}>
                                    <DropDown
                                        className="top-search-input form-control"
                                        Name="plants"
                                        itemSource={this.getDropDownPlants()}
                                        value={this.state.selectedPlantOptions}
                                        handleChange={(item) => this.handleChangePlants(item)}
                                    />
                                </Col>
                                <Col xs={1} style={{ maxWidth: "6%" }}>
                                    <Form.Label>Days:</Form.Label>
                                </Col>
                                <Col style={{ maxWidth: "15%", padding: "0" }}>
                                    <DropDown
                                        className="top-search-input form-control"
                                        Name="days"
                                        itemSource={this.getDropDownDays()}
                                        value={this.state.selectedDays}
                                        handleChange={(item) => this.handleChangeDays(item)}
                                    />
                                </Col>
                                <Col xs={1} style={{ maxWidth: "8%" }}>
                                    <Form.Label>Weightage:</Form.Label>
                                </Col>
                                <Col style={{ maxWidth: "15%", padding: "0" }}>
                                    <Form.Control name="weightage" type="text" onChange={(item) => this.handleChange(item)} value={this.state.selectedWeightage} />
                                </Col>
                                <Col xs={1} style={{ maxWidth: "5%" }}>
                                    <Form.Label>Date</Form.Label>
                                </Col>
                                <Col xs={2} style={{ maxWidth: "16%" }} >
                                    <Form.Control type="date" name="toDate" readyOnly={false} onChange={(val) => this.handleChangeToDate(val)} />
                                </Col>
                                <Col xs={2} style={{ maxWidth: "10%", padding: "0" }}>
                                    <Route render={({ history }) => (
                                        <button type="button" className="btn btn-primary" style={{ width: "90%" }} onClick={() => this.getrenderForecast()}>
                                            GO
                                                </button>)} />
                                </Col>
                            </div>
                            {/* <div>
                    <p className="message success" style={{ marginTop: "15px" }}>{this.props.displayMessage}</p>
                    </div> */}
                        </div>
                        {this.state.showPlantDetails && this.state.reportData ?
                            <div>
                                <Row style={{margin: '0'}}>
                                    <Col>
                                        <Form.Label>Plant Name<span className="form-required">*</span></Form.Label>
                                    </Col>
                                    <Col>
                                        <span name="plantName">{this.state.reportData && this.state.reportData.length > 0 ? this.state.reportData[0].plantName: null}</span>
                                    </Col>
                                    <Col></Col>
                                    <Col></Col>
                                    <Col></Col>
                                    <Col></Col>
                                    <Col></Col>
                                </Row>
                                <Row style={{margin: '0'}}>
                                    <Col>
                                        <Form.Label>Plant Capacity AC<span className="form-required">*</span></Form.Label>
                                    </Col>
                                    <Col>
                                        <span name="plantCapacityAc">{this.state.reportData && this.state.reportData.length > 0 ? this.state.reportData[0].plantCapacityAc : null}</span>
                                    </Col>
                                    <Col></Col>
                                    <Col></Col>
                                    <Col></Col>
                                    <Col></Col>
                                    <Col></Col>
                                </Row>
                                <Row style={{margin: '0'}}>
                                    <Col>
                                        <Form.Label>Date<span className="form-required">*</span></Form.Label>
                                    </Col>
                                    <Col>
                                        <span name="date">{this.state.reportData && this.state.reportData.length > 0 ? this.state.reportData[0].date : null}</span>
                                    </Col>
                                    <Col></Col>
                                    <Col></Col>
                                    <Col></Col>
                                    <Col></Col>
                                    <Col></Col>
                                </Row>
                                <Row style={{margin: '0'}}>
                                    <Col>
                                        <Form.Label>Time<span className="form-required">*</span></Form.Label>
                                    </Col>
                                    <Col>
                                        <span name="time">{this.state.displayTime}</span>
                                    </Col>
                                    <Col></Col>
                                    <Col></Col>
                                    <Col></Col>
                                    <Col></Col>
                                    <Col></Col>
                                </Row>
                            </div> : null}
                            <div>
                            {this.props.displayMessage ? <Alert className="message success" variant="success" style={{ marginTop: "15px" }}>{this.props.displayMessage}</Alert> : null}
                        </div>
                        <div
                            style={{
                                height: '500px',
                            }}
                            className="ag-theme-material">
                            <AgGridReact
                                columnDefs={this.createColumnDefs()}
                                rowData={this.state.reportData}
                                context={{ componentParent: this }}
                                onGridReady={this.onGridReady}>
                            </AgGridReact>
                        </div>
                        <div
                            style={{
                                height: '500px',
                            }}
                            className="ag-theme-material">
                            <AgGridReact
                                columnDefs={this.createColumnDefsTwo()}
                                rowData={this.state.reportData1}
                                context={{ componentParent: this }}
                                onGridReady={this.onGridReady}>
                            </AgGridReact>
                            <Modal id="forecast" show={this.state.commGF} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                                {/* <Modal.Header closeButton> */}
                                    <Modal.Title>Forecast</Modal.Title>
                                {/* </Modal.Header> */}
                                <Modal.Body>
                                <Row>
                                    <Col>
                                    <Form.Label>Adjusted Irradiance (W/M2)</Form.Label>
                                    {/* </Col>
                                    <Col> */}
                                    <Form.Control name="actualIrradianceW" type="text" onChange={(item) => this.handleChange(item, "actualIrradianceW")} value={this.state.postData.actualIrradianceW} pattern="^-?[0-9]\d*\.?\d*$" />
                                    </Col>
                                    <Col>
                                    <Form.Label>Adjusted Forecasted Module Temperature Loss</Form.Label>
                                    {/* </Col>
                                    <Col> */}
                                    <Form.Control name="adjusted_module_temperature_forecast" type="text" onChange={(item) => this.handleChange(item,"adjusted_module_temperature_forecast")} value={this.state.postData.adjusted_module_temperature_forecast} pattern="^-?[0-9]\d*\.?\d*$" />
                                    </Col>
                                    <Col>
                                    <Form.Label>Adjusted System Losses</Form.Label>
                                    {/* </Col>
                                    <Col> */}
                                    <Form.Control name="adjusted_system_losses" type="text" onChange={(item) => this.handleChange(item,"adjusted_system_losses")} value={this.state.postData.adjusted_system_losses} pattern="^-?[0-9]\d*\.?\d*$" />
                                    </Col>
                                    </Row>
                                </Modal.Body>
                                <Modal.Footer>
                                <Button variant="primary" onClick={() => this.onSubmit()}>
                                        Save
                                    </Button>
                                    <Button variant="danger" onClick={() => this.ModalClose()}>
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </Modal>

                        </div>
                    </div>
                    <Row>
                        <Col></Col>
                        <Col></Col>
                        <Col xs={2} style={{ maxWidth: "15%" }}>
                            <Route render={({ history }) => (
                                <button type="button" class="btn btn-primary" style={{ width: "100%" }} onClick={() => { this.sendEmail() }}>
                                    Accept Send
                </button>)} />
                        </Col>
                        <Col></Col>
                        <Col></Col>
                        <Col xs={2} style={{ maxWidth: "15%" }}>
                            <Route render={({ history }) => (
                                <button type="button" class="btn btn-primary" style={{ width: "100%" }} onClick={() => { this.sendEmail() }}>
                                    Accept Send
                </button>)} />
                        </Col>
                        <Col></Col>
                    </Row>
                </div>
            </>
        );
    }
}

function getDatefunc(action, option = null) {
    if (action === 'year') {
        let years = [];
        const todayDate = new Date();
        const strYear = todayDate.getFullYear();
        // {
        if (strYear) {
            let year = parseInt(strYear) - 7;
            const endYear = parseInt(strYear);
            let i;

            years.push({ displayText: "Select Year", value: 0 });
            for (i = parseInt(year); i < endYear; i++) {
                // let addoneYear = parseInt(i) + 1;
                years.push({ displayText: i, value: i });
            }

        }
        // }
        return years;
    }
    else if (action === 'date') {
        let todayDate = new Date();
        console.log(todayDate);
        const _date = new Date((todayDate.getMonth()+1) + "/" + (todayDate.getDate()) + "/" + (todayDate.getFullYear()))
        return formatDate(_date);
    }
    else if (action === 'month') {
        var month = new Array();
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";
        const todayDate = new Date();
        return month[todayDate.getMonth()];
    }
    else if (action === 'toYTD') {
        const todayDate = new Date();
        return formatDate(todayDate);
    }
    else if (action === 'fromYTD') {
        const fromdayDate = new Date();
        if (fromdayDate.getMonth() < 3) {
            return fromdayDate.getFullYear() - 1 + "-04-01";
        }
        else {
            return fromdayDate.getFullYear().toString() + "-04-01";
        }

    }
}

function getDays() {
    let i = 0;
    let days = [];
    days.push("Select Days");
    for (i = 1; i <= 60; i++) {
        days.push(i);
    }
    return days;
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

const mapStateToProps = state => {
    return {
        plantsByType: state.plants.plantsByType,
        plantTypes: state.projectTypes.plantTypes,
        plants: state.plants.plants,
        reportData: state.ForecastReducers.grid1Display,
        reportData1: state.ForecastReducers.grid2Display,
        // forecastDataPlus: state.ForecastReducers.forecastData,
        plantType: [{ displayText: "Select Plant Type", value: "-1" }, { displayText: "GROUNDMOUNT", value: "GROUNDMOUNT" }, { displayText: "ROOFTOP", value: "ROOFTOP" }],
        days: getDays(),
        todayDate: getDatefunc("date"),
        displayMessage: state.ForecastReducers.displayMessage,
        // [{displayText: "No of Days", value: "-1" },{displayText: "1", value: "1"},{displayText: "2", value: "2"},{displayText: "3", value: "3"},
        // {displayText: "4", value: "4"},{displayText: "5", value: "5"},{displayText: "6", value: "6"},{displayText: "7", value: "7"},
        // {displayText: "8", value: "8"},{displayText: "9", value: "9"},{displayText: "10", value: "10"},{displayText: "11", value: "11"}
        //  ]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPlantByType: (plantsByType) => dispatch(getPlantByType(plantsByType)),
        getAllPlants: () => dispatch(getAllPlants()),
        getForecastReport: (data) => dispatch(getForecastReport(data)),
        clearForecast: () => dispatch(clearForecast()),
        getForecastDashboard: (data) => dispatch(getForecastDashboard(data)),
        CreateorupdateForecastcalculation: (data) => dispatch(CreateorupdateForecastcalculation(data))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ForecastComp));