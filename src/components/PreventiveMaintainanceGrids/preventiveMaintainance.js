import React, { Component } from 'react'

// import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
// import { Route } from 'react-router-dom'
// import {AgGridReact} from "ag-grid-react"
// import Picky from 'react-picky';
// import Dropdown from 'react-bootstrap/Dropdown'
import 'react-picky/dist/picky.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import '../../styles/plant/plantFaultData.scss';
import YearlyPmCheckList from './YearlyPmCheckList';
import DailyPdfDownload from './DailyPdfDownload'
import DailyPmCheckList from './DailyPmCheckList';
import MonthlyPmCheckList from './MonthlyPmCheckList';
import BimonthlyPmCheckList from './BimonthlyPmCheckList';
import QuarterlyPmCheckList from './QuarterlyPmCheckList';
import HalfYearlyPmCheckList from './HalfYearlyPmCheckList';
import { getPlantByType } from "../../actions/PlantActions";
import { getPmTaskByPmActivityId, getPMUserStatusDetailsByActivityDatePlantId, getPMRemarkStatusByPMUserStatusId, getPMTaskGroupByPmActivityId } from "../../actions/PMActions";
import moment from 'moment';
// import DropDown from "../Common/DropDown";


class PreventiveMaintainance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fieldName: '',
            showField: false,
            showACDCDrpDwn: false,
            date: '',
            curDate: '',
            selectedPlantType: '',
            selectedPlant: '',
            plantId: '',
            activityType: '',
            activityId: '',
            showActivity: false,
            spvName: '',
            projectCapacity: '',
            taskdetails: '',
            remarkStatusDetails: null,
            userStatusDetails: null,
            taskGroup: [],
            isNew: false
        };
        this.handleChangePlant = this.handleChangePlant.bind(this);
        this.handleChangeActivity = this.handleChangeActivity.bind(this);
        this.getRenderPM = this.getRenderPM.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        const stateDup = this.state;
        if (nextProps !== null) {
            stateDup.userStatusDetails = nextProps.pmUserStatus;
            if (nextProps.pmRemarkStatus !== null) {
                if (nextProps.pmRemarkStatus && nextProps.pmRemarkStatus[0] !== undefined && nextProps.pmUserStatus[0] !== undefined) {
                    if (nextProps.pmUserStatus && nextProps.pmUserStatus[0].pmUserStatusId === nextProps.pmRemarkStatus[0].pmUserStatusId) {
                        stateDup.remarkStatusDetails = nextProps.pmRemarkStatus;
                    }
                }
            }
            // this.setState({
            //     pmRemarkStatus: nextProps.pmRemarkStatus,
            //     pmUserStatus: nextProps.pmUserStatus
            // })

            if ((nextProps.pmUserStatus !== null || nextProps.pmUserStatus !== undefined) && stateDup.remarkStatusDetails === null) {
                if (nextProps.pmUserStatus && nextProps.pmUserStatus[0] !== undefined) {
                    this.props.getPMRemarkStatusByPMUserStatusId(nextProps.pmUserStatus[0].pmUserStatusId);
                }
            }

            this.setState({ stateDup });
        }

    }

    handleChangeActivity(event) {
        const stateDup = this.state;
        if (event.target.value === "Daily PM Check List") {
            stateDup.fieldName = 'Date:';
            stateDup.showField = true;
            stateDup.showACDCDrpDwn = false;
            stateDup.activityType = "Daily";
            stateDup.activityId = "1";
            stateDup.showActivity = false;
            stateDup.date = moment().format("YYYY-MM-DD");
            stateDup.curDate = moment().format("YYYY-MM-DD");
            stateDup.remarkStatusDetails = null;
            stateDup.userStatusDetails = null;
            this.props.getPmTaskByPmActivityId(stateDup.activityId);
        }
        else if (event.target.value === "Monthly PM Check List") {
            stateDup.fieldName = 'Month:';
            stateDup.showField = true;
            stateDup.showACDCDrpDwn = true;
            stateDup.activityType = "Monthly";
            stateDup.activityId = "2";
            stateDup.showActivity = false;
            stateDup.date = moment().startOf('month').format('YYYY-MM-DD');
            stateDup.curDate = moment().startOf('month').format('YYYY-MM-DD');
            stateDup.remarkStatusDetails = null;
            stateDup.userStatusDetails = null;
            this.props.getPmTaskByPmActivityId("2");
            this.props.getPMTaskGroupByPmActivityId(stateDup.activityId);
        }
        else if (event.target.value === "BiMonthly PM Check List") {
            stateDup.fieldName = 'Date:';
            stateDup.showField = true;
            stateDup.showACDCDrpDwn = false;
            stateDup.activityType = "Bi-Monthly";
            stateDup.activityId = "3";
            stateDup.showActivity = false;
            stateDup.date = moment().startOf('month').format('YYYY-MM-DD');
            stateDup.curDate = moment().startOf('month').format('YYYY-MM-DD');
            stateDup.remarkStatusDetails = null;
            stateDup.userStatusDetails = null;
            this.props.getPmTaskByPmActivityId("3");
            this.props.getPMTaskGroupByPmActivityId(stateDup.activityId);
        }
        else if (event.target.value === "Quarterly PM Check List") {
            stateDup.fieldName = 'Fiscal Quarter:';
            stateDup.showField = false;
            stateDup.showACDCDrpDwn = true;
            stateDup.activityType = "Quarterly";
            stateDup.activityId = "4";
            stateDup.showActivity = false;
            stateDup.remarkStatusDetails = null;
            stateDup.userStatusDetails = null;
            stateDup['quarterlyYearList'] = this.getQuarterlyYear();
            stateDup['selectedQuarterlyYear'] = stateDup.quarterlyYearList[stateDup.quarterlyYearList.length - 1];

            let month = stateDup.selectedQuarterlyYear.split(" ")[1].split('-')[0];
            let date = null;
            if (month === 'Jan') {
                date = stateDup.selectedQuarterlyYear.split(" ")[0] + "-01-01";
                stateDup.date = moment(date).format('YYYY-MM-DD');

            }
            if (month === 'Apr') {
                date = stateDup.selectedQuarterlyYear.split(" ")[0] + "-04-01";
                stateDup.date = moment(date).format('YYYY-MM-DD');

            }
            if (month === 'Jul') {
                date = stateDup.selectedQuarterlyYear.split(" ")[0] + "-07-01";
                stateDup.date = moment(date).format('YYYY-MM-DD');

            }
            if (month === 'Oct') {
                date = stateDup.selectedQuarterlyYear.split(" ")[0] + "-10-01";
                stateDup.date = moment(date).format('YYYY-MM-DD');

            }

            this.props.getPmTaskByPmActivityId(stateDup.activityId);
            this.props.getPMTaskGroupByPmActivityId(stateDup.activityId);
        }

        else if (event.target.value === "Half Yearly PM Check List") {
            stateDup.fieldName = 'Year:';
            stateDup.showField = false;
            stateDup.showACDCDrpDwn = false;
            stateDup.activityType = "HalfYearly";
            stateDup.activityId = "5";
            stateDup.showActivity = false;
            stateDup.remarkStatusDetails = null;
            stateDup.userStatusDetails = null;
            stateDup['quarterlyYearList'] = this.getHalfYearly();
            stateDup['selectedQuarterlyYear'] = stateDup.quarterlyYearList[stateDup.quarterlyYearList.length - 1];

            let month = stateDup.selectedQuarterlyYear.split(" ")[1].split('-')[0];
            let date = null;
            if (month === 'Apr') {
                date = stateDup.selectedQuarterlyYear.split(" ")[0] + "-04-01";
                stateDup.date = moment(date).format('YYYY-MM-DD');

            }
            if (month === 'Oct') {
                date = stateDup.selectedQuarterlyYear.split(" ")[0] + "-10-01";
                stateDup.date = moment(date).format('YYYY-MM-DD');

            }

            this.props.getPmTaskByPmActivityId(stateDup.activityId);
            this.props.getPMTaskGroupByPmActivityId(stateDup.activityId);
        }

        else if (event.target.value === "Yearly PM Check List") {
            stateDup.fieldName = 'Year:';
            stateDup.showField = false;
            stateDup.showACDCDrpDwn = true;
            stateDup.activityType = "Yearly";
            stateDup.activityId = "6";
            stateDup.showActivity = false;
            stateDup.remarkStatusDetails = null;
            stateDup.userStatusDetails = null;
            stateDup['quarterlyYearList'] = this.getYearly();
            stateDup['selectedQuarterlyYear'] = stateDup.quarterlyYearList[stateDup.quarterlyYearList.length - 1];

            let year = stateDup.selectedQuarterlyYear.split('-')[0];
            let date = null;
            date = year + "-04-01";
            stateDup.date = moment(date).format('YYYY-MM-DD');



            this.props.getPmTaskByPmActivityId(stateDup.activityId);
            this.props.getPMTaskGroupByPmActivityId(stateDup.activityId);
        }

        this.setState({ stateDup });
    }

    getQuarterlyYear() {
        let quarterlyYearDropDown = [];
        var date = new Date();
        var month = date.getMonth() + 1;
        var quarter = (Math.ceil(month / 3));
        let year = date.getFullYear();

        let quarters = ['Jan-Mar', 'Apr-Jun', 'Jul-Sep', 'Oct-Dec'];
        let years = [year - 3, year - 2, year - 1, year];
        var k = 0;
        for (var i = 0; i < years.length; i++) {
            for (var j = 0; j < quarters.length; j++) {
                if (year === years[i]) {
                    if (j < quarter) {
                        quarterlyYearDropDown[k] = years[i] + ' ' + quarters[j];
                        k++;
                    }
                }
                else {
                    quarterlyYearDropDown[k] = years[i] + ' ' + quarters[j];
                    k++;
                }
            }
        }

        return quarterlyYearDropDown;
    }

    getYearly() {
        let quarterlyYearDropDown = [];
        //get current date
        var today = new Date();

        //get current month
        var curMonth = today.getMonth();
        var curYear = today.getFullYear();
        let years = [curYear - 3, curYear - 2, curYear - 1, curYear];
        var fiscalYr = [];
        for (var i = 0; i < years.length; i++) {

            if (years[i] === curYear) {
                if (curMonth > 3) { //
                    var nextYr1 = (today.getFullYear() + 1).toString();
                    fiscalYr[i] = today.getFullYear().toString() + "-" + nextYr1;
                } else {
                    var nextYr2 = today.getFullYear().toString();
                    fiscalYr[i] = (today.getFullYear() - 1).toString() + "-" + nextYr2;
                }
            }
            else {
                fiscalYr[i] = years[i].toString() + "-" + (years[i] + 1);
            }
        }

        return fiscalYr;
    }

    getHalfYearly() {
        let quarterlyYearDropDown = [];
        var date = new Date();
        var month = date.getMonth() + 1;
        var halfYearly = null;
        if (month >= 4 && month <= 9) {
            halfYearly = 1;
        }
        else {
            halfYearly = 2;
        }
        let year = date.getFullYear();

        let quarters = ['Apr-Sep', 'Oct-Mar'];
        let years = [year - 3, year - 2, year - 1, year];
        var k = 0;
        for (var i = 0; i < years.length; i++) {
            for (var j = 0; j < quarters.length; j++) {
                if (year === years[i]) {
                    if (j < halfYearly) {
                        quarterlyYearDropDown[k] = years[i] + ' ' + quarters[j];
                        k++;
                    }
                }
                else {
                    quarterlyYearDropDown[k] = years[i] + ' ' + quarters[j];
                    k++;
                }
            }
        }

        return quarterlyYearDropDown;
    }

    handleChangePlant(event) {
        if (event.target.name === "plant_type") {
            const stateDup = this.state;
            stateDup.selectedPlantType = event.target.value;
            stateDup.showActivity = false;
            stateDup.userStatusDetails = null;
            stateDup.remarkStatusDetails = null;
            this.setState({ stateDup });

            this.props.getPlantByType(stateDup.selectedPlantType);
        }
        else {
            const stateDup1 = this.state;
            let plantsByType = this.props.plantsByType;
            stateDup1.selectedPlant = event.target.value;
            stateDup1.showActivity = false;
            stateDup1.remarkStatusDetails = null;
            stateDup1.userStatusDetails = null;
            for (var i = 0; i < plantsByType.length; i++) {
                if (plantsByType[i].plantName === event.target.value) {
                    stateDup1.plantId = plantsByType[i].plantId;
                    stateDup1.spvName = plantsByType[i].spv;
                    stateDup1.projectCapacity = plantsByType[i].plantCapacityDc;
                    break;
                }
            }

            this.setState({ stateDup1 });

        }
    }

    handleChange(event) {
        const stateDup = this.state;
        stateDup[event.target.name] = event.target.value;
        stateDup.showActivity = false;
        stateDup.userStatusDetails = null;
        stateDup.remarkStatusDetails = null;


        if (event.target.name === 'date') {
            const actIdDatePlantId = {
                "created_date": stateDup.date,
                "plant_id": stateDup.plantId,
                "pm_activity_id": stateDup.activityId
            };
            this.props.getPMUserStatusDetailsByActivityDatePlantId(actIdDatePlantId);


        }
        else if (event.target.name === 'quarterlyYear') {
            if (stateDup.activityId === '6') {
                let date = null;
                let year = event.target.value.split("-")[0];
                date = year + "-04-01";
                stateDup.date = moment(date).format('YYYY-MM-DD');
            }
            else {
                let year = event.target.value.split(" ")[0];
                let month = event.target.value.split(" ")[1].split('-')[0];
                let date = null;
                if (month === 'Jan') {
                    date = year + "-01-01";
                    stateDup.date = moment(date).format('YYYY-MM-DD');

                }
                if (month === 'Apr') {
                    date = year + "-04-01";
                    stateDup.date = moment(date).format('YYYY-MM-DD');

                }
                if (month === 'Jul') {
                    date = year + "-07-01";
                    stateDup.date = moment(date).format('YYYY-MM-DD');

                }
                if (month === 'Oct') {
                    date = year + "-10-01";
                    stateDup.date = moment(date).format('YYYY-MM-DD');

                }

            }
            stateDup.selectedQuarterlyYear = event.target.value;

            const actIdDatePlantId = {
                "created_date": stateDup.date,
                "plant_id": stateDup.plantId,
                "pm_activity_id": stateDup.activityId
            };
            this.props.getPMUserStatusDetailsByActivityDatePlantId(actIdDatePlantId);
        }
        this.setState({ stateDup });
    }

    handleChangeACDC(event) {
        const stateDupACDC = this.state;
        stateDupACDC[event.target.name] = event.target.value;
        stateDupACDC.showActivity = false;
        this.setState({ stateDupACDC });
    }

    handleChangeYear(event) {
        const stateDup = this.state;

        if (event.target.name === 'quarterlyYear') {
            let year = event.target.value.split(" ")[0];
            let month = event.target.value.split(" ")[1].split('-')[0];
            let date = null;
            if (month === 'Jan') {
                date = year + "-01-01";
                stateDup.date = moment(date).format('YYYY-MM-DD');

            }
            if (month === 'Apr') {
                date = year + "-04-01";
                stateDup.date = moment(date).format('YYYY-MM-DD');

            }
            if (month === 'Jul') {
                date = year + "-07-01";
                stateDup.date = moment(date).format('YYYY-MM-DD');

            }
            if (month === 'Oct') {
                date = year + "-10-01";
                stateDup.date = moment(date).format('YYYY-MM-DD');

            }
            stateDup.selectedQuarterlyYear = event.target.value;
        }

        this.setState({ stateDup });

    }


    getRenderPM() {
        // if(this.props.pmUserStatus !== undefined){
        // this.props.getPMRemarkStatusByPMUserStatusId(this.props.pmUserStatus[0].pm_user_status_id);
        // }

        // console.log('here')
        // if (this.props.pmRemarkStatus !== undefined) {
        if (this.props.pmTasksByActivityId && this.props.pmTasksByActivityId.length) {
            const stateDup = this.state;
            console.log('here', this.props)
            // if(stateDup.activityType==="Daily"){
            //    return(
            //       <DailyPmCheckList/>
            //     ); 
            // }
            stateDup.taskdetails = this.props.pmTasksByActivityId
                .map(ptb => {
                    return {
                        ...ptb,
                        pm_remark_status: {
                            pmStatus: '',
                            pmChecked: '',
                            pmRemarks: ''
                        },
                        userStatusDetails: [{
                            createdDate: '',
                            modifiedDate: '',
                            plantId: '',
                            pmActivityId: null,
                            pmUserStatusId: null,
                            showVerified: false,
                            specialRemarks: "",
                            userId: '',
                            userName: "",
                            verfierName: "",
                            verifierDate: "",
                            verifierId: ''
                        }]
                    }
                });
            //stateDup.remarkStatusDetails = this.props.pmRemarkStatus;
            //stateDup.userStatusDetails = this.props.pmUserStatus;
            let status = false;
            let completedTaksCount = 0;

            if (stateDup.remarkStatusDetails !== null) {
                for (var i = 0; i < stateDup.taskdetails.length; i++) {
                    for (var j = 0; j < stateDup.remarkStatusDetails.length; j++) {
                        status = false;
                        if (stateDup.taskdetails[i].pmTaskId === stateDup.remarkStatusDetails[j].pmTaskId) {
                            stateDup.taskdetails[i]["pm_remark_status"] = stateDup.remarkStatusDetails[j];
                            status = true;
                            if (stateDup.remarkStatusDetails[j].pmChecked === "YES") {
                                completedTaksCount++;
                            }
                            break;
                        }
                        if (status === false && j === stateDup.remarkStatusDetails.length - 1) {
                            stateDup.taskdetails.splice(i, 1);
                            i--;
                            break;
                        }
                    }
                }

                stateDup.taskdetails["completedTaskCount"] = completedTaksCount;

                if (stateDup.activityId !== '1') {
                    let k = 1;
                    let m = 0;
                    stateDup.taskGroup = [];
                    for (var i = 0; i < this.props.pmTaskGroup.length; i++) {
                        let pmTaskGroupIdLocal = this.props.pmTaskGroup[i].pmTaskGroupId;
                        let pmTaskGroupNameLocal = this.props.pmTaskGroup[i].pmTaskGroupName;
                        stateDup.taskGroup[i] = stateDup.taskdetails.filter(taskGroup => taskGroup.pmTaskGroupId === pmTaskGroupIdLocal);
                        if (stateDup.ac_dc_dropdown === 'AC' || stateDup.ac_dc_dropdown === 'DC') {
                            stateDup.taskGroup[i] = stateDup.taskGroup[i].filter(taskGroup1 => taskGroup1.miscAcDc === stateDup.ac_dc_dropdown);
                        }
                        if (stateDup.taskGroup[i].length !== 0) {
                            stateDup.taskGroup[i]["TaskGroupName"] = pmTaskGroupNameLocal;
                        }
                        else {
                            stateDup.taskGroup[i]["TaskGroupName"] = "Invalid";

                        }
                        stateDup.taskGroup = stateDup.taskGroup.filter(taskGrp => taskGrp.TaskGroupName !== "Invalid");
                    }


                    for (var l = 0; l < stateDup.taskGroup.length; l++) {
                        for (var n = 0; n < stateDup.taskGroup[l].length; n++) {
                            stateDup.taskGroup[l][n]["SNO"] = k++;
                            // if(stateDup.taskGroup[l][n].pm_remark_status.pm_checked === 'YES'){
                            //     ++m;
                            // }
                        }
                    }
                    //stateDup.taskGroup['totalNoOfTasks'] = k;
                    //stateDup.taskGroup['completedTasks'] = m;

                }

                stateDup.isNew = false
            } else {
                stateDup.isNew = true
            }

            stateDup.showActivity = true;
            this.setState({ stateDup });
        }
        else {
            console.log('else')
        }
    }

    render() {

        // const classes = makeStyles(theme => ({
        //     root: {
        //         width: '100%',
        //         marginTop: theme.spacing(3),
        //         overflowX: 'auto',
        //     },
        //     table: {
        //         minWidth: 650,
        //     },
        // }));

        return (
            <div>
                <div className="top-filter">
                    <div className="row" style={{ alignItems: "center", margin: "0" }} >
                        <Col lg={1} md={1} sm={6} className="small_percent_width">
                            <Form.Label>Activity:</Form.Label>
                        </Col>
                        <Col lg={2} md={2} sm={6} className="large_percent_width" required class="form-control" type="dropdown" name="plant_name" onChange={(item) => this.handleChangeActivity(item)}>
                            <select class="top-search-input form-control">
                                <option value="Select Activity">Select Activity</option>
                                <option value="Daily PM Check List">Daily PM Check List</option>
                                <option value="Monthly PM Check List">Monthly PM Check List</option>
                                <option value="BiMonthly PM Check List">BiMonthly PM Check List</option>
                                <option value="Quarterly PM Check List">Quarterly PM Check List</option>
                                <option value="Half Yearly PM Check List">Half Yearly PM Check List</option>
                                <option value="Yearly PM Check List">Yearly PM Check List</option>

                            </select>

                        </Col>
                        <Col lg={1} md={1} sm={6} className="small_percent_width">
                            <Form.Label>Type:</Form.Label>
                        </Col>
                        <Col lg={2} md={2} sm={6} className="large_percent_width" >
                            <select class="top-search-input form-control" name="plant_type" onChange={(item) => this.handleChangePlant(item)}>
                                <option value="Plant Type">Select Plant Type</option>
                                <option value="GROUNDMOUNT">GROUNDMOUNT</option>
                                <option value="ROOFTOP">ROOFTOP</option>

                            </select>
                        </Col>
                        <Col lg={1} md={1} sm={6} className="small_percent_width">                            <Form.Label>Plant:</Form.Label>
                        </Col>
                        <Col lg={2} md={2} sm={6} className="large_percent_width" >
                            <select required class="top-search-input form-control" type="dropdown" name="plant_name" onChange={(item) => this.handleChangePlant(item)} >
                                value={this.state.selectedPlant}
                                <option>Select Plant</option>
                                {/* <option>{this.state.plans[0].plant_name}</option> */}
                                {this.props.plantsByType === undefined ? <option>default</option> : this.props.plantsByType.map((plant, key) => <option key={plant.plantId}>{plant.plantName}</option>)}
                            </select>
                        </Col>

                        <Col lg={1} md={1} sm={6} className="small_percent_width">                            <Form.Label>{this.state.showField === true ? this.state.fieldName : null}</Form.Label>
                        </Col>
                        <Col lg={2} md={2} sm={6} className="large_percent_width" >
                            {this.state.showField === true ?
                                <input type="date" className="form-control" name="date" onChange={this.handleChange} max={this.state.curDate}
                                    value={this.state.date} />
                                :
                                ''}
                        </Col>
                        <Col lg={1} md={1} sm={6} className="small_percent_width"></Col>
                        <Col lg={2} md={2} sm={6} className="large_percent_width" ></Col>
                        <Col lg={1} md={1} sm={6} className="small_percent_width">
                            {this.state.activityId === '4' || this.state.activityId === '5' || this.state.activityId === '6' ?

                                <Form.Label>{this.state.fieldName}</Form.Label>
                                : ''
                            }
                        </Col>
                        <Col lg={2} md={2} sm={6} className="large_percent_width" >
                            {this.state.activityId === '4' || this.state.activityId === '5' || this.state.activityId === '6' ?
                                <select required class="top-search-input form-control" type="dropdown" name="quarterlyYear" onChange={(item) => this.handleChange(item)} value={this.state.selectedQuarterlyYear} >

                                    {/* <option>{this.state.plans[0].plant_name}</option> */}
                                    {this.state.quarterlyYearList.map((year, key) => <option>{year}</option>)}
                                </select> : <div></div>
                            }
                        </Col>
                        <Col lg={1} md={1} sm={6} className="small_percent_width"></Col>

                        <Col lg={2} md={2} sm={6} className="large_percent_width" >
                            {this.state.showACDCDrpDwn === true ?
                                <select required class="top-search-input form-control" type="dropdown" name="ac_dc_dropdown" onChange={(item) => this.handleChangeACDC(item)} >
                                    <option>All</option>
                                    <option>AC</option>
                                    <option>DC</option>
                                    {/* <option>{this.state.plans[0].plant_name}</option> */}
                                </select>
                                : <div></div>}
                        </Col>
                        {/* <Col lg={1} md={1} sm={6} className="small_percent_width"></Col> */}


                        {/* <Col style={{padding:"0 5px"}}>
                        </Col> */}
                        <Col lg={1} md={1} sm={6} className="small_percent_width">

                            <button type="button" className="btn btn-orange" onClick={() => this.getRenderPM()}>
                                Go
                        </button>
                        </Col>

                    </div>
                </div>
                {(this.state.activityType === 'Daily' && this.state.showActivity === true && this.state.userStatusDetails) ? <DailyPmCheckList data={this.state} /> : ''}
                {(this.state.activityType === 'Monthly' && this.state.showActivity === true) ? <MonthlyPmCheckList data={this.state} /> : ''}
                {(this.state.activityType === 'Bi-Monthly' && this.state.showActivity === true) ? <BimonthlyPmCheckList data={this.state} /> : ''}
                {(this.state.activityType === 'Quarterly' && this.state.showActivity === true) ? <QuarterlyPmCheckList data={this.state} /> : ''}
                {(this.state.activityType === 'HalfYearly' && this.state.showActivity === true) ? <HalfYearlyPmCheckList data={this.state} /> : ''}
                {(this.state.activityType === 'Yearly' && this.state.showActivity === true) ? <YearlyPmCheckList data={this.state} /> : ''}

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        plantsByType: state.plants.plantsByType,
        pmTasksByActivityId: state.pmTasksByActivityId.pmTasksByActivityId,
        pmUserStatus: state.pmUserStatus.pmUserStatus,
        pmRemarkStatus: state.pmRemarkStatus.pmRemarkStatus,
        pmTaskGroup: state.pmTaskGroup.pmTaskGroup
        //allPlantTiltSchedule:state.plantTiltSchedule.allPlantTiltSchedule
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPlantByType: (plantsByType) => dispatch(getPlantByType(plantsByType)),
        getPmTaskByPmActivityId: (pmActivityId) => dispatch(getPmTaskByPmActivityId(pmActivityId)),
        getPMUserStatusDetailsByActivityDatePlantId: (actIdDatePlantId) => dispatch(getPMUserStatusDetailsByActivityDatePlantId(actIdDatePlantId)),
        getPMRemarkStatusByPMUserStatusId: (pmUserStatusId) => dispatch(getPMRemarkStatusByPMUserStatusId(pmUserStatusId)),
        getPMTaskGroupByPmActivityId: (pmTaskActivityId) => dispatch(getPMTaskGroupByPmActivityId(pmTaskActivityId))
        //getAllPlantTiltSchedule: (plant_type,plant_name,plant_id) => dispatch(getAllPlantTiltSchedule(plant_type,plant_name,plant_id)),
        //deletePlantTiltSchdeule: (_id) => dispatch(deletePlantTiltSchdeule(_id))

    }
}

//export default ActualGenerateModal

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PreventiveMaintainance));
