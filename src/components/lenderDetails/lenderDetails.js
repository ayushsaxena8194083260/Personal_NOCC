import React, { Component } from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import {AgGridReact} from "ag-grid-react"
import Picky from 'react-picky';
import 'react-picky/dist/picky.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import '../../styles/plant/plantFaultData.scss';
import DropDown from "../Common/DropDown";


class ActionCellRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.invokeDelete = this.invokeDelete.bind(this);
    }

    invokeDelete() {
        this.props.context.componentParent.onDelete(this.props.node.data.lenderDetailId);
    }
    render() {
        return (<div className="products-actions">
            <Link className="products-actions-link"
                to={{
                    pathname: "/addEditlenderdetails",
                    LenderDetailRowData: this.props.data
                }}>
                <img src="/images/editIcon.png" alt="Edit" />
            </Link>
            {/* <Link className="products-actions-link"
                to={{
                    pathname: "/plantFaultIncident",
                    plantFault: this.props.data
                }}>
                <img src="/images/icons/fugue/plus-circle.png" alt="Add Incident" />
            </Link> */}
            <Link to="#" onClick={this.invokeDelete} title="Delete" >
                <img src="/images/cross-circle.png" alt="Delete" />
            </Link>
        </div>);
    }
}

class LenderDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lenderData: this.props.lenderData,
            selectedPlantType: null,
            selectedProjectTypes: null,
            selectedYear: null,
            projectTypes: this.props.projectTypes,
            plantTypes: this.props.plantTypes,
            plantFault: this.props.plantFault,
            lenderDetails : this.props.allLenderDetailsByYearPlantIds,
            lenderDetailsByYearPlantIds : this.props.allLenderDetailsByYearPlantIds!=undefined?this.props.allLenderDetailsByYearPlantIds:'',
            lenderDetailsFiltered : null,
            selectedPlantOptions: [],
            showRow : false
        };
        this.selectMultipleOption = this.selectMultipleOption.bind(this);
    }

    componentDidMount() {
        // this.props.clearPlantFaultData();
        // document.title = 'Plant Fault Data';
    }
    componentDidUpdate() {
        //this.props.getProjectNames(this.state.selectedValue);
    }

    handleChangePlantType(event) {
        const selectedValue = event.target.value;
        if(selectedValue !== this.state.selectedPlantType){
        this.props.getProjectsByPlantType(selectedValue);
        this.setState({ selectedPlantType: selectedValue,selectedProjectTypes:null,selectedPlantOptions:[], showRow: false, selectedYear : null  });
        // //this.props.getAllLenderDetailsData();

        // this.setState({ selectedPlantType: selectedValue,selectedProjectTypes:null,selectedPlantOptions:[], showRow: false  });
        }
        //console.log(selectedValue)
    }

    handleChangePlantFault(event) {
        const plantId = event.target.value;
        this.setState({ plantId });
        //console.log(plantId)
    }

    insolationAvg(tilt,days){
        let _insoAvg = (tilt/days);
        return _insoAvg.toFixed(2);
    }
    dcplf(days,dcCapacity,gen){
        let _dcplf = null;
        if (dcCapacity === 0){
            _dcplf = 0;
        } else {
            if ((days) && (dcCapacity)){
                _dcplf= gen/(days*dcCapacity*24);
            } else {
                _dcplf = 0;
            }
            _dcplf = _dcplf*100;
        }
        return _dcplf.toFixed(2)+"%";
    }
    acplf(days,dcCapacity,gen){
        let _acplf = null;
        if (dcCapacity === 0){
            _acplf = 0;
        } else {
        if ((days) && (dcCapacity)){
            _acplf= gen/(days*dcCapacity*24);
        } else {
            _acplf = 0;
        }
        _acplf = _acplf*100;
    }
        return _acplf.toFixed(2)+"%";
    }

    ppaplf(days,dcCapacity,gen){
        let _acplf = null;
        if (dcCapacity === 0){
            _acplf = 0;
        } else {
        if ((days) && (dcCapacity)){
            _acplf= gen/(days*dcCapacity*24);
        } else {
            _acplf = 0;
        }
        _acplf = _acplf*100;
    }
        return _acplf.toFixed(2)+"%";
    }
    derateVal(derateValue){
        let _derate = derateValue*100;
        return _derate.toFixed(2)+"%";
    }
    derateGen(gen,derateValues){
        let _gen = parseFloat(gen);
        let _derateValues = parseFloat(derateValues);
        let _a = (_derateValues/100)
        let _derateGen = (_gen*_a)+_gen;
        return _derateGen.toFixed(2);
    }
    derateDC(dc,derateValues){
        let _dc = parseFloat(dc);
        let _derateValues = parseFloat(derateValues);
        let _derateDC = _dc+(_dc*(_derateValues)/100);
        if (dc === 0){
            _derateDC = 0;
        }
        return _derateDC.toFixed(2)+"%";
    }
    derateAC(ac,derateValues){
        let _ac = parseFloat(ac);
        let _derateValues = parseFloat(derateValues);
        let _derateAC = _ac+(_ac*(_derateValues)/100);
        if (ac === 0){
            _derateAC = 0;
        }
        return _derateAC.toFixed(2)+"%";
    }
    deratePPA(PPA,derateValues){
        let _PPA = parseFloat(PPA);
        let _derateValues = parseFloat(derateValues);
        let _deratePPA = (_PPA/100)+((_PPA/100)*(_derateValues/100));
        if (PPA === 0){
            _deratePPA = 0;
        } else {
            _deratePPA = _deratePPA*100;
        }
        return _deratePPA.toFixed(2)+"%";
    }

    // insolationAvg(tilt,days){
    //     let _insoAvg = (tilt/days);
    //     return _insoAvg.toFixed(2);
    // }
    // dcplf(days,dcCapacity,gen){
    //     let _dcplf = null;
    //     if ((days) && (dcCapacity)){
    //         _dcplf= gen/(days*dcCapacity*24);
    //     } else {
    //         _dcplf = 0;
    //     }
    //     _dcplf = _dcplf*100;
    //     return _dcplf.toFixed(2)+"%";
    // }
    // acplf(days,dcCapacity,gen){
    //     let _acplf = null;
    //     if ((days) && (dcCapacity)){
    //         _acplf= gen/(days*dcCapacity*24);
    //     } else {
    //         _acplf = 0;
    //     }
    //     _acplf = _acplf*100;
    //     return _acplf.toFixed(2)+"%";
    // }
    // derateVal(derateValue){
    //     let _derate = derateValue*100;
    //     return _derate.toFixed(2)+"%";
    // }
    // derateGen(gen,derateValues){
    //     let _gen = parseFloat(gen);
    //     let _derateValues = parseFloat(derateValues);
    //     let _derateGen = (_gen*_derateValues)+_gen;
    //     return _derateGen.toFixed(2);
    // }
    // derateDC(dc,derateValues){
    //     let _dc = parseFloat(dc);
    //     let _derateValues = parseFloat(derateValues);
    //     let _derateDC = _dc+(_dc*_derateValues);
    //     _derateDC = _derateDC*100;
    //     return _derateDC.toFixed(2)+"%";
    // }
    // derateAC(ac,derateValues){
    //     let _ac = parseFloat(ac);
    //     let _derateValues = parseFloat(derateValues);
    //     let _derateAC = _ac+(_ac*_derateValues);
    //     _derateAC = _derateAC*100;
    //     return _derateAC.toFixed(2)+"%";
    // }
    // deratePPA(PPA,derateValues){
    //     let _PPA = parseFloat(PPA);
    //     let _derateValues = parseFloat(derateValues);
    //     let _deratePPA = _PPA+(_PPA*_derateValues);
    //     _deratePPA = _deratePPA*100;
    //     return _deratePPA.toFixed(2)+"%";
    // }

    daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    getRenderPlantFault() {
        let plantIds = [];
        this.state.selectedPlantOptions && this.state.selectedPlantOptions.length > 0 && this.state.selectedPlantOptions.map((item) => { plantIds.push(item.id) });
        plantIds.length > 0 && this.props.getLenderDataByYearPlantIds({ plantIds: plantIds, year: this.state.selectedYear });
        this.setState({ showRow: true});

        // let plantIds = [];
        // let plantNames = [];
        // let monthNames = [
        //     'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        // ];

        // this.state.selectedPlantOptions && this.state.selectedPlantOptions.length > 0 && this.state.selectedPlantOptions.map((item) => { plantIds.push(item.id) });
        // this.state.selectedPlantOptions && this.state.selectedPlantOptions.length > 0 && this.state.selectedPlantOptions.map((item) => { plantNames.push(item.name) });
        // if(this.state.lenderDetailsByYearPlantIds !== undefined){
        //     const stateDup = this.state;
        //     //let yearRange = stateDup.selectedYear.split('-');
        //     stateDup.lenderDetails = stateDup.lenderDetailsByYearPlantIds.filter(details => details.type == 'Lender');
        //     for(var i=0;i<stateDup.lenderDetails.length;i++){
        //         // for(var j=0;j<plantIds.length;j++){
        //         // if(stateDup.lenderDetails[i].plantId === plantIds[j]){
        //             stateDup.lenderDetailsByYearPlantIds[i]["plant_name"]=plantNames[i];
        //             stateDup.lenderDetailsByYearPlantIds[i]["no_of_days"]= this.daysInMonth(stateDup.lenderDetailsByYearPlantIds[i].month,stateDup.lenderDetailsByYearPlantIds[i].year);//new Date(stateDup.lenderDetailsByYearPlantIds[i].month,stateDup.lenderDetailsByYearPlantIds[i].year,0).getDate();
        //             stateDup.lenderDetailsByYearPlantIds[i]["monthYearFormat"]=monthNames[stateDup.lenderDetailsByYearPlantIds[i].month-1]+"'"+stateDup.lenderDetailsByYearPlantIds[i].year;
        //             stateDup.lenderDetailsByYearPlantIds[i]["plant_type"]=stateDup.selectedPlantType;
        //             stateDup.lenderDetailsByYearPlantIds[i]["insolation_avg"]=this.insolationAvg(stateDup.lenderDetailsByYearPlantIds[i].insolationOnTilt,stateDup.lenderDetailsByYearPlantIds[i].no_of_days);
        //             stateDup.lenderDetailsByYearPlantIds[i]["dc_plf"]=this.dcplf(stateDup.lenderDetailsByYearPlantIds[i].dcCapacity,stateDup.lenderDetailsByYearPlantIds[i].no_of_days,stateDup.lenderDetailsByYearPlantIds[i].generation);
        //             stateDup.lenderDetailsByYearPlantIds[i]["ac_plf"]=this.acplf(stateDup.lenderDetailsByYearPlantIds[i].acCapacity,stateDup.lenderDetailsByYearPlantIds[i].no_of_days,stateDup.lenderDetailsByYearPlantIds[i].generation);
        //             stateDup.lenderDetailsByYearPlantIds[i]["plant_capacity_ac"]=(stateDup.lenderDetailsByYearPlantIds[i].acCapacity);//"10000"//this.ppaplf(stateDup.lenderDetailsByYearPlantIds[i].plant_capacity_ac,stateDup.lenderDetailsByYearPlantIds[i].no_of_days,stateDup.lenderDetailsByYearPlantIds[i].generation);
        //             stateDup.lenderDetailsByYearPlantIds[i]["ppa_plf"]=this.ppaplf(stateDup.lenderDetailsByYearPlantIds[i].plant_capacity_ac,stateDup.lenderDetailsByYearPlantIds[i].no_of_days,stateDup.lenderDetailsByYearPlantIds[i].generation);
        //             stateDup.lenderDetailsByYearPlantIds[i]["derate"]=this.derateVal(stateDup.lenderDetailsByYearPlantIds[i].derate);
        //             stateDup.lenderDetailsByYearPlantIds[i]["derate_generation"]=this.derateGen(stateDup.lenderDetailsByYearPlantIds[i].generation,stateDup.lenderDetailsByYearPlantIds[i].derate);
        //             stateDup.lenderDetailsByYearPlantIds[i]["derate_dc"]=this.derateDC(stateDup.lenderDetailsByYearPlantIds[i].dc_plf,stateDup.lenderDetailsByYearPlantIds[i].derate);
        //             stateDup.lenderDetailsByYearPlantIds[i]["derate_ac"]=this.derateAC(stateDup.lenderDetailsByYearPlantIds[i].ac_plf,stateDup.lenderDetailsByYearPlantIds[i].derate);
        //             stateDup.lenderDetailsByYearPlantIds[i]["derate_ppa"]=this.deratePPA(stateDup.lenderDetailsByYearPlantIds[i].ppa_plf ,stateDup.lenderDetailsByYearPlantIds[i].derate);
        //             stateDup.lenderDetailsByYearPlantIds[i]["temperature"]=(stateDup.lenderDetailsByYearPlantIds[i].temperature*100).toFixed(2)+"%";
        //             stateDup.lenderDetailsByYearPlantIds[i]["gridOutageTime"]=(stateDup.lenderDetailsByYearPlantIds[i].gridOutageTime*100).toFixed(2)+"%";
        //             stateDup.lenderDetailsByYearPlantIds[i]["plantDownTime"]=(stateDup.lenderDetailsByYearPlantIds[i].plantDownTime*100).toFixed(2)+"%";
        //             stateDup.lenderDetailsByYearPlantIds[i]["iam"]=(stateDup.lenderDetailsByYearPlantIds[i].iam*100).toFixed(2)+"%";
        //             stateDup.lenderDetailsByYearPlantIds[i]["pvIrradiance"]=(stateDup.lenderDetailsByYearPlantIds[i].pvIrradiance*100).toFixed(2)+"%";
        //             stateDup.lenderDetailsByYearPlantIds[i]["soiling"]=(stateDup.lenderDetailsByYearPlantIds[i].soiling*100).toFixed(2)+"%";
        //             stateDup.lenderDetailsByYearPlantIds[i]["arrayMissmatch"]=(stateDup.lenderDetailsByYearPlantIds[i].arrayMissmatch*100).toFixed(2)+"%";
        //             stateDup.lenderDetailsByYearPlantIds[i]["moduleQuality"]=(stateDup.lenderDetailsByYearPlantIds[i].moduleQuality*100).toFixed(2)+"%";
        //             stateDup.lenderDetailsByYearPlantIds[i]["acOhmic"]=(stateDup.lenderDetailsByYearPlantIds[i].acOhmic*100).toFixed(2)+"%";
        //             stateDup.lenderDetailsByYearPlantIds[i]["ohmic"]=(stateDup.lenderDetailsByYearPlantIds[i].ohmic*100).toFixed(2)+"%";
        //             stateDup.lenderDetailsByYearPlantIds[i]["invEfficiency"]=(stateDup.lenderDetailsByYearPlantIds[i].invEfficiency*100).toFixed(2)+"%";
        //             stateDup.lenderDetailsByYearPlantIds[i]["transformer"]=(stateDup.lenderDetailsByYearPlantIds[i].transformer*100).toFixed(2)+"%";
        //             stateDup.lenderDetailsByYearPlantIds[i]["transmission"]=(stateDup.lenderDetailsByYearPlantIds[i].transmission*100).toFixed(2)+"%";
        //             stateDup.lenderDetailsByYearPlantIds[i]["auxiliary"]=(stateDup.lenderDetailsByYearPlantIds[i].auxiliary*100).toFixed(2)+"%";
        //             stateDup.lenderDetailsByYearPlantIds[i]["shading"]=(stateDup.lenderDetailsByYearPlantIds[i].shading*100).toFixed(2)+"%";
        //         // }
        //         // }
        //     }
        //     stateDup.lenderDetailsFiltered = stateDup.lenderDetailsByYearPlantIds;
        //     stateDup.showRow = true;
        //     // stateDup.allAOPBudgetDetails.map((detail)=>{
        //     //     if(detail.plant_id)
        //     //     detail[plant_name] =
        //     // })
        //     this.setState({ stateDup });
        // }
    }

    handleChangeProjectTypes(event) {
        const selectedValue = event.target.value;
        this.props.getPlantByProjectId(selectedValue);
        //this.props.getAllLenderDetailsData();
        this.setState({ selectedProjectTypes: selectedValue, showRow : false });
    }

    handleChangeYear(event) {
        const _selectedYear = event.target.value;
        this.setState({ selectedYear: _selectedYear});
        // let plantIds = [];
        // //this.props.getAllLenderDetailsData();
        // this.state.selectedPlantOptions && this.state.selectedPlantOptions.length > 0 && this.state.selectedPlantOptions.map((item) => { plantIds.push(item.id) });
        // let yearPlantIds = {
        //     "plantIds" : plantIds,
        //     "year" : event.target.value
        // }
        // this.props.getLenderDataByYearPlantIds(yearPlantIds);
        // this.setState({ selectedYear, showRow : false, lenderDetailsByYearPlantIds : this.props.allLenderDetailsByYearPlantIds });
    }

    selectOption(value) {
        console.log("Vals", value);
        this.setState({ value });
    }

    selectMultipleOption(value) {
        this.setState({ selectedPlantOptions: value, showRow : false });
    }

    onDelete(lenderDetailid) {
        let isConfirm = window.confirm("Are you sure want to delete this Lender detail?");
        if (isConfirm)
            this.props.deleteLenderDetailData(lenderDetailid);
            alert('Lender detail has been deleted successfully');
    }

    createColumnDefs() {
        return [
            {
                headerName: "Plant Name", field: "plant_name", cellClass: 'cell-wrap',
                autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Month", field: "monthYearFormat", cellClass: 'cell-wrap',
                autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Year", field: "year", sortable: true, cellClass: 'cell-wrap',
                autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "No of Days", field: "no_of_days", cellClass: 'cell-wrap',
                autoHeight: true, width: 61, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "DC Capacity", field: "dcCapacity", cellClass: 'cell-wrap',
                autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "AC Capacity", field: "acCapacity", cellClass: 'cell-wrap',
                autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "PPA Capacity", field: "plant_capacity_ac", cellClass: 'cell-wrap',
                autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Insolation", field: "insolationOnTilt", cellClass: 'cell-wrap',
                autoHeight: true, width:80, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Insolation Avg", field: "insolation_avg", cellClass: 'cell-wrap',
                autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Generation", field: "generation", cellClass: 'cell-wrap',
                autoHeight: true, width: 84, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "DC PLF", field: "dc_plf", cellClass: 'cell-wrap',
                autoHeight: true, width: 74, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "AC PLF", field: "ac_plf", cellClass: 'cell-wrap',
                autoHeight: true, width: 74, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "PPA PLF", field: "ppa_plf", cellClass: 'cell-wrap',
                autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
            },

            {
                headerName: "Derate", field: "derate", cellClass: 'cell-wrap',
                autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Derate Generation", field: "derate_generation", cellClass: 'cell-wrap',
                autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
            },

            {
                headerName: "Derate PLF(DC)", field: "derate_dc", cellClass: 'cell-wrap',
                autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Derate PLF(AC)", field: "derate_ac", cellClass: 'cell-wrap',
                autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Derate PLF(PPA)", field: "derate_ppa", cellClass: 'cell-wrap',
                autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Temp", field: "temperature", cellClass: 'cell-wrap',
                autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Grid Outage Time", field: "gridOutageTime", cellClass: 'cell-wrap',
                autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Plant Down Time", field: "plantDownTime", cellClass: 'cell-wrap',
                autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "IAM", field: "iam", cellClass: 'cell-wrap',
                autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "PV Irradiance", field: "pvIrradiance", cellClass: 'cell-wrap',
                autoHeight: true, width: 88, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Soiling", field: "soiling", cellClass: 'cell-wrap',
                autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Array Missmatch", field: "arrayMissmatch", cellClass: 'cell-wrap',
                autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Module Quality", field: "moduleQuality", cellClass: 'cell-wrap',
                autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Ohmic", field: "ohmic", cellClass: 'cell-wrap',
                autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Inv Effi", field: "invEfficiency", cellClass: 'cell-wrap',
                autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Inv Clipping", field: "invClipping", cellClass: 'cell-wrap',
                autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "AC Ohmic", field: "acOhmic", cellClass: 'cell-wrap',
                autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Transformer", field: "transformer", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Transmission", field: "transmission", cellClass: 'cell-wrap',
                autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Auxiliary", field: "auxiliary", cellClass: 'cell-wrap',
                autoHeight: true, width: 90, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Shading", field: "shading", cellClass: 'cell-wrap',
                autoHeight: true, width: 90, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Action",
                field: '',
                cellRendererFramework: ActionCellRenderer,
                width: 100,
            }
        ];
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.lenderData != undefined){
            for(var i=0;i<nextProps.lenderData.length;i++) {
                nextProps.lenderData[i]['plant_type'] = this.state.selectedPlantType; 
            }
        }

        if (nextProps !== null) {
            this.setState({
                projectTypes: nextProps.projectTypes,
                plantTypes: nextProps.plantTypes,
                plantFault: nextProps.plantFault,
                lenderDetails : nextProps.lenderDetails,
                lenderData: nextProps.lenderData,
                // lenderDetails : nextProps.allLenderDetails,
                lenderDetailsByYearPlantIds : nextProps.allLenderDetailsByYearPlantIds
            })
          }
    }

    getPlantTypesDropDownOptions() {
        const options = this.state.plantTypes && this.state.plantTypes.map((plantTypes, key) => { return { id: plantTypes.plantId, name: plantTypes.plantName } });
        return options;
    }

    getDropDownProjectTypes() {
        let projectName = [];
        projectName.push({ displayText: "Select Project", value: "0" })
        this.state.projectTypes && this.state.projectTypes.map((item) => {
            projectName.push({ displayText: item.project_name, value: item.project_id })
        });

        return projectName;
    }

    getDropDownYear() {
        return this.props.years && this.props.years.map((item) => { return { displayText: item, value: item } });
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
                        <Col xs={1} style={{ maxWidth: "5%" }}>
                            <Form.Label>Type:</Form.Label>
                        </Col>
                        <Col style={{ maxWidth: "15%" }}>
                            <DropDown
                                className="top-search-input form-control"
                                Name="plantType"
                                itemSource={this.props.plantType}
                                value={this.state.selectedPlantType}
                                handleChange={(item) => this.handleChangePlantType(item)}
                            />
                        </Col>
                        <Col xs={1} style={{ maxWidth: "5%" }}>
                            <Form.Label>Project:</Form.Label>
                        </Col>
                        <Col style={{ maxWidth: "15%" }}>
                        <select required class="form-control" type="dropdown" Name="plantName" onChange={(item) => this.handleChangeProjectTypes(item)} >
                        value={this.state.selectedProjectTypes}
                        <option>Select Project Type</option>
                        {/* <option>{this.state.plans[0].plant_name}</option> */}
                        {this.props.projectTypes === undefined?<option>default</option>:this.props.projectTypes.map((project, key) => <option key={project.projectId}>{project.projectName}</option>)}
                        </select>
                        </Col>
                        <Col xs={1} style={{ maxWidth: "5%" }}>
                            <Form.Label>Plant:</Form.Label>
                        </Col>
                        <Col style={{ maxWidth: "15%" }}>
                        <Picky
                                value={this.state.selectedPlantOptions}
                                options={this.getPlantTypesDropDownOptions()}
                                onChange={(val) => this.selectMultipleOption(val)}
                                open={false}
                                valueKey="id"
                                labelKey="name"
                                multiple={true}
                                includeSelectAll={true}
                                includeFilter={true}
                                dropdownHeight={250}
                                    filterPlaceholder="Search"
                            />
                        </Col>
                        <Col xs={1} style={{ maxWidth: "5%" }}>
                            <Form.Label>Year:</Form.Label>
                        </Col>
                        <Col style={{ maxWidth: "15%" }} >
                            <DropDown
                                className="top-search-input form-control"
                                Name="year"
                                itemSource={this.getDropDownYear()}
                                value={this.state.selectedYear}
                                handleChange={(item) => this.handleChangeYear(item)}
                            />
                        </Col>
                        <Col xs={2} style={{ maxWidth: "6%" }}>
                            <button type="button" className="btn btn-orange"  style={{ width: "100%" ,minWidth:"50px"}} onClick={() => this.getRenderPlantFault()}>
                                Go
                        </button>
                        </Col>
                        {/* UploadAopBudgetDetail */}
                        <Col xs={2} style={{ maxWidth: "10%" }}>
                            <Route render={({ history }) => (
                                <button type="button" className="btn btn-primary" style={{minWidth:"90px" }} onClick={() => { history.push('/UploadAopBudgetDetail') }}>
                                    <img src="/images/icons/fugue/plus-circle.png" alt="Upload" title="Upload" style={{ float: "left", marginRight: "3" }} />
                                    Upload
                                </button>)} />
                        </Col>
                        <Col xs={2} style={{ maxWidth: "15%" }}>
                            <Route render={({ history }) => (
                                <button type="button" className="btn btn-primary" style={{minWidth:"90px"  }} onClick={() => { history.push('/addEditlenderdetails') }}>
                                    <img src="/images/icons/fugue/plus-circle.png" alt="add AOD details" title="Add Plant Fault" style={{ float: "left", marginRight: "3" }} />
                                    Add Lender Details
                                </button>)} />
                        </Col>
                    </div>
                </div>
                <div>
                    <p className="message success" style={{ marginTop: "15px" }}>{this.props.displayMessage}</p>
                </div>
                <div
                    style={{
                        height: '500px',
                    }}
                    className="ag-theme-material">
                        <AgGridReact
                            columnDefs={this.createColumnDefs()}
                            rowData={this.state.showRow === false?'':this.state.lenderData}//{this.state.showRow === false?'':this.state.lenderDetailsByYearPlantIds}
                            context={{ componentParent: this }}
                            onGridReady={this.onGridReady}>
                        </AgGridReact>
                </div>
                {/* <Route render={({ history}) => (
		        <div onClick={() => { history.push('/addEditJmrComponent')}} className="float" title="Add Plant">
		        <i className="fa fa-plus my-float"></i>
		        </div>
		        )} /> */}
            </div>
        );
    }
}
export default LenderDetail; 
