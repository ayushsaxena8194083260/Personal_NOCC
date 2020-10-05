import React,{ Component } from "react";
import {
    Link,
  } from 'react-router-dom';
import {AgGridReact} from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

const rowIndex = (params) => params.node.rowIndex + 1;

class ActionCellRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.invokeDelete = this.invokeDelete.bind(this);
    }

    invokeDelete() {
        this.props.context.componentParent.onDelete(this.props.node.data._id);
    }
    render() {
        return (<div className="products-actions">
            <Link className="products-actions-link"
                to={{
                    pathname: "/",
                    plantFault: this.props.data
                }}>
                <img src="/images/icons/fugue/status-offline.png" title="Inactive User" alt="status"/>

            </Link>
            <Link to="#" onClick={this.invokeDelete} title="Change Password" >
                <img src="/images/icons/fugue/password.png" title="Change Password"  alt="change password"/>
            </Link>
            <Link to="#" onClick={this.invokeDelete} title="Edit" >
                <img src="/images/editIcon.png" title="Edit User" alt="edit"/>
            </Link>
            <Link to="#" onClick={this.invokeDelete} title="Delete" >
                <img src="/images/cross-circle.png" alt="Delete" />
            </Link>

        </div>);
    }
}

class GraphGroupComponentAddEdit extends Component{
    constructor(props) {
        super(props);
        this.state = {
            graphGroups: this.props.graphGroups
        };
    }

    componentDidMount() {
        // document.title = 'Plant Fault Data';
        this.props.clearSettingPlantMapping();
        this.props.renderGraphGroupDetails();
    }

    createColumnDefs() {
        // return [
        //     {
        //         headerName: "Sr No", ockPosition: true, valueGetter: rowIndex, width:80,cellClass: 'cell-wrap',
        //         autoHeight: true, width: 200, cellStyle: { 'white-space': 'normal' }
        //     },
        //     {
        //         headerName: "Group Name", field: "graphGroupName", cellClass: 'cell-wrap',
        //         autoHeight: true, width: 800, cellStyle: { 'white-space': 'normal' }
        //     },
            
        //     {
        //         headerName: "Action",
        //         field: '',
        //         cellRendererFramework: ActionCellRenderer,
        //         width: 200,
        //     }
        // ];
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== null) {            
            this.setState({
                graphGroups: nextProps.graphGroups
            })
        }
    }

    render() {
        return(
            <div>
                <section className="top-filter" style={{height:"44px"}}>
                    <button type="button" className="btn btn-primary" style={{ float:"right" }}>
                        <img src="/images/icons/fugue/plus-circle.png" alt="add plant" title="Add Plant Fault" style={{ float: "left", paddingRight: "5px" }} />
                        Add Graph Group
                    </button>
                </section>
                <div
                    style={{
                        height: '500px',
                    }}
                    className="ag-theme-material">
                        <AgGridReact
                            columnDefs={this.createColumnDefs()}
                            rowData={this.state.graphGroups}
                            context={{ componentParent: this }}
                            onGridReady={this.onGridReady}>
                        </AgGridReact>
                </div>
            </div>
        )
    }
}
export default GraphGroupComponentAddEdit;