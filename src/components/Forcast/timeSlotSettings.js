import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';
import { viewAllTimeSlotSetting, deleteFormulaSetting, deleteTimeSlotSetting } from '../../actions/action-Forecasting';
import { connect } from 'react-redux';
import {AgGridReact} from "ag-grid-react"
import { Route } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert';
import ModelPopUp from '../Common/ModelPopUp';
import TimeSlotSettingsAddEdit  from './timeSlotSettingsAddEdit';

const rowIndex = (params) => params.node.rowIndex + 1;

class ActionCellRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.invokeDelete = this.invokeDelete.bind(this);
    }
    invokeDelete() {
        this.props.context.componentParent.onDelete(this.props.node.data.timeSlotId);
    }
    render() {
        const isActive = this.props.data &&this.props.data.isActive === "true"? true : false; 
        return (<div className="products-actions">           
            <Link className="products-actions-link"
                to={{
                    pathname: "addEditTimeSlotSettings",
                    input: this.props.data
                }}>
                <img src="/images/editIcon.png" alt="Edit" />
            </Link>
            <Link className="products-actions-link"
                to="#" onClick = {()=> this.invokeDelete()} title="Delete">
                <img src="/images/cross-circle.png" alt="Delete Time Slot" />
            </Link>
           
        </div>);
    }
}

class TimeSlotSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: this.props.input,
            modalShow: false,
            deleteModalShow: false,
            deleteID:0
        }
    }
    componentDidMount() {
        // document.title = 'Plant Fault Data';
        // this.props.clearSettingPlantMapping();
        this.props.viewAllTimeSlotSetting();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ input: nextProps.input,
            displayMessage: nextProps.displayMessage
        });
    }

    onDelete(_id) {
        this.setState({ deleteModalShow: true, deleteID: _id });

    }

    onHide() {
        this.setState({ deleteModalShow: false, deleteID: null });
    }

    deleteRecord() {
        if (this.state.deleteID !== null) {
            this.props.deleteTimeSlotSetting(this.state.deleteID);
            this.onHide();
            this.props.viewAllTimeSlotSetting();
        }
    }

    ModalClose(){
        this.setState({ modalShow: false, deleteModalShow: false});
    }
    createColumnDefs() {
        return [
            {
                headerName: "Sr No", ockPosition: true, valueGetter: rowIndex, width:80,cellClass: 'cell-wrap',
                autoHeight: true, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Slot Name", field: "timeSlotName", cellClass: 'cell-wrap',
                autoHeight: true, width: 300, cellStyle: { 'white-space': 'normal' }
            },            
            {
                headerName: "Start Time", field: "slotStartTime", cellClass: 'cell-wrap',
                autoHeight: true, width: 400, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "End Time", field: "slotEndTime", cellClass: 'cell-wrap',
                autoHeight: true, width: 300, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Action",
                field: '',
                cellRendererFramework: ActionCellRenderer,
                width: 130,
            }
        ];
    }

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
    
    render() {
        const ModalClose = () => {
            this.setState({modalShow: false, deleteModalShow: false})
        }
        return (
            <div>
            <section className="top-filter" style={{height:"44px"}}>
            <Route render={({ history }) => (

                <button type="button" className="btn btn-primary" style={{ float:"right" }} onClick={() => { history.push('addEditTimeSlotSettings') }}>
                    <img src="/images/icons/fugue/plus-circle.png" alt="add plant" title="Add Plant Fault" style={{ float: "left", paddingRight: "5px" }} />
                    Add Time Slot Setting
                </button>)} />
            </section>
            <div>
                {this.props.displayMessage ? <Alert className="message success" variant="success" style={{ marginTop: "15px" }}>{this.props.displayMessage}</Alert> : null}
                
            </div>
            <div
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
                {/* {this.state.modalShow && <GraphGroupComponentAddEdit                        
                            show={this.state.modalShow}
                            onHide={ModalClose}
                            data={this.state.postData}
                        />} */}
                        <div>
                        <ModelPopUp title="Delete"
                            id={"timeSlotTiming"}
                            bodyContent="Are you sure want to delete this time slot?"
                            showPopUp={this.state.deleteModalShow}
                            secondaryBtnName="No"
                            onSecondaryAction={this.onHide.bind(this)}
                            primaryBtnName="Delete"
                            onPrimaryAction={this.deleteRecord.bind(this)}
                        />
                        </div>
                </div></div>
        )
    }
}
const mapStateToProps = state => {
    return {
        displayMessage: state.ForecastReducers.displayMessage,
        input: state.ForecastReducers.input,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        viewAllTimeSlotSetting: () => dispatch(viewAllTimeSlotSetting()),
        deleteTimeSlotSetting:(id) => dispatch(deleteTimeSlotSetting(id))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TimeSlotSettings));