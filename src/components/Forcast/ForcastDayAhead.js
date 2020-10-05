import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';
import { viewAllTimeSlotSetting, deleteFormulaSetting } from '../../actions/action-Forecasting';
import { connect } from 'react-redux';
import {AgGridReact} from "ag-grid-react"
import { Route } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert';
import ModelPopUp from '../Common/ModelPopUp';
import TimeSlotSettingsAddEdit  from './timeSlotSettingsAddEdit';
import { Col, Form } from "react-bootstrap";
import DropDown from "../Common/DropDown";
import { getAllPlants } from "../../actions";
import { getPlantByType } from "../../actions/PlantActions";

const rowIndex = (params) => params.node.rowIndex + 1;



class ForecastDayAhead extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: this.props.input,
            modalShow: false,
            deleteModalShow: false,
            deleteID:0,
            selectedPlants:''
        }
    }
    handleChangeUser(event) {
        // const _data = this.state.postData;
        const selectedPlants = event.target.value;
        if (selectedPlants && selectedPlants.plantId !== "-1") {
            this.setState({ selectedPlants: selectedPlants});
            // _data[event.target.name] = selectedValue;
            // this.setState({ postData: _data });
        }
    }
    componentDidMount() {
        // document.title = 'Plant Fault Data';
        // this.props.clearSettingPlantMapping();
        let type="GROUNDMOUNT";
        this.props.getPlantByType(type);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ input: nextProps.input,
            displayMessage: nextProps.displayMessage
        });
    }

    // createColumnDefs() {
    //     return [
    //         {
    //             headerName: "Sr No", ockPosition: true, valueGetter: rowIndex, width:80,cellClass: 'cell-wrap',
    //             autoHeight: true, cellStyle: { 'white-space': 'normal' }
    //         },
    //         {
    //             headerName: "Slot Name", field: "timeSlotName", cellClass: 'cell-wrap',
    //             autoHeight: true, width: 300, cellStyle: { 'white-space': 'normal' }
    //         },            
    //         {
    //             headerName: "Start Time", field: "slotStartTime", cellClass: 'cell-wrap',
    //             autoHeight: true, width: 400, cellStyle: { 'white-space': 'normal' }
    //         },
    //         {
    //             headerName: "End Time", field: "slotEndTime", cellClass: 'cell-wrap',
    //             autoHeight: true, width: 300, cellStyle: { 'white-space': 'normal' }
    //         },
    //         {
    //             headerName: "Action",
    //             field: '',
    //             cellRendererFramework: ActionCellRenderer,
    //             width: 130,
    //         }
    //     ];
    // }

    editGraphGroup(data){
        this.setState({
            ...this.state,
            modalShow: true, 
            postData:data       
        })
    }

    addGraphGroup(){
        this.setState({
            ...this.state,
            modalShow: true, 
            postData:this.state.graphGroups         
        })
    }
    getRenderAlertUser(){
        this.props.getPlantByType(this.state.postData);
    }

    render() {
        return (
            <div>
            <section className="top-filter" style={{height:"44px"}}>
            <div className="row" style={{ alignItems: "center", margin: "0" }} >
                    <Col xs={2} style={{ maxWidth: "10%" }}>
                            <Form.Label>Plant Name:</Form.Label>
                        </Col>
                        <Col style={{ maxWidth: "55%",padding:"0" }}>
                            <select class="form-control" name="userId" type="dropdown" onChange={(item) => this.handleChangeUser(item)}>
                                        <option>--select plants--</option>
                                        {this.props.plantsByType && this.props.plantsByType.map((item, key) => {
                                            return <option value={item.plantId}>{item.plantName}</option>
                                        }
                                        )}
                                    </select>
                        </Col>
                        <Col></Col>
                        <Col xs={2} style={{ maxWidth: "7%" }}>
                            <button type="button" className="btn btn-orange" onClick={() => this.getRenderAlertUser()}>
                                Go
                        </button>
                        </Col>
                        <div>
                {this.props.displayMessage ? <Alert className="message success" variant="success" style={{ marginTop: "15px" }}>{this.props.displayMessage}</Alert> : null}
            </div>

                        </div>
            </section>
            <p class="message warning">Due to formulae not available,no records.</p>
                        {/* <div
                style={{
                    height: '500px',
                    maxWidth: "1222px",
                    margin: "auto"
                }}
                className="ag-theme-material">
                <AgGridReact
                    key="grid"
                    columnDefs={this.createColumnDefs()}
                    rowData={this.state.input}
                    context={{ componentParent: this }}
                    onGridReady={this.onGridReady}>                   

                </AgGridReact>
                </div> */}
                </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        plantsByType: state.plants.plantsByType,
        displayMessage: state.ForecastReducers.displayMessage,
        input: state.ForecastReducers.input,
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
		getPlantByType: (plantsByType) => dispatch(getPlantByType(plantsByType)),
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ForecastDayAhead));