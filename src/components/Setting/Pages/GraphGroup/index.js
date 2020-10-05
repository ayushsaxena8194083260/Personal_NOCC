
import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';
import { renderGraphGroupDetails, clearSettingPlantMapping, deleteGraphGroup } from '../../../../actions/action-Settings';
import { connect } from 'react-redux';
import {AgGridReact} from "ag-grid-react"
import { Route } from 'react-router-dom'
import GraphGroupComponentAddEdit from './GraphGroupAddEdit';
import Alert from 'react-bootstrap/Alert';
import ModelPopUp from '../../../Common/ModelPopUp';

const rowIndex = (params) => params.node.rowIndex + 1;

class ActionCellRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.invokeDelete = this.invokeDelete.bind(this);
        this.invokeEdit = this.invokeEdit.bind(this);
    }
    invokeEdit(){
        this.props.context.componentParent.editGraphGroup(this.props.node.data);
    }

    invokeDelete() {
        this.props.context.componentParent.onDelete(this.props.node.data.graphGroupId);
    }
    render() {
        const isActive = this.props.data &&this.props.data.isActive === "true"? true : false; 
        return (<div className="products-actions">           
                       
            <Link className="products-actions-link"
                to="#" onClick = {()=> this.invokeEdit()} title="Edit">
                <img src="/images/editIcon.png" alt="Edit" />
            </Link>
            <Link className="products-actions-link"
                to="#" onClick = {()=> this.invokeDelete()} title="Delete">
                <img src="/images/cross-circle.png" alt="Delete Graph Group" />
            </Link>
           
        </div>);
    }
}

class GraphGroupComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            graphGroups: this.props.graphGroups,
            modalShow: false,
            deleteModalShow: false,
            deleteID:0
        }
    }
    componentDidMount() {
        // document.title = 'Plant Fault Data';
        // this.props.clearSettingPlantMapping();
        this.props.renderGraphGroupDetails();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ graphGroups: nextProps.graphGroups,
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
            this.props.deleteGraphGroup(this.state.deleteID);
            this.onHide();
        }
    }

    ModalClose(){
        this.setState({ modalShow: false, deleteModalShow: false});
    }
    createColumnDefs() {
        return [
            {
                headerName: "Sr No", ockPosition: true, valueGetter: rowIndex, width:80,cellClass: 'cell-wrap',
                autoHeight: true, width: 70, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Group Name", field: "graphGroupName", cellClass: 'cell-wrap',
                autoHeight: true, width: 1000, cellStyle: { 'white-space': 'normal' }
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

                <button type="button" className="btn btn-primary" style={{ float:"right" }} onClick={() => { this.addGraphGroup()}}>
                    <img src="/images/icons/fugue/plus-circle.png" alt="add plant" title="Add Plant Fault" style={{ float: "left", paddingRight: "5px" }} />
                    Add Graph Group
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
                    rowData={this.state.graphGroups}
                    context={{ componentParent: this }}
                    onGridReady={this.onGridReady}>                   

                </AgGridReact>
                {this.state.modalShow && <GraphGroupComponentAddEdit                        
                            show={this.state.modalShow}
                            onHide={ModalClose}
                            data={this.state.postData}
                        />}
                        <div>
                        <ModelPopUp title="Delete"
                            id={"graphGroupDelete"}
                            bodyContent="Are you sure want to delete this Graph Group?"
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
        displayMessage: state.SettingsReducer.displayMessage,
        graphGroups: state.SettingsReducer.graphGroup,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        renderGraphGroupDetails: () => dispatch(renderGraphGroupDetails()),
        clearSettingPlantMapping: () => dispatch(clearSettingPlantMapping()),
        deleteGraphGroup: (id) => dispatch(deleteGraphGroup(id))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GraphGroupComponent));