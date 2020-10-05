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
            <Link to={{
                    pathname: "/AddEditUser",
                    plantFault: this.props.data
                }} onClick={this.invokeDelete} title="Edit" >
                <img src="/images/editIcon.png" title="Edit User" alt="edit"/>
            </Link>
            <Link to="#" onClick={this.invokeDelete} title="Delete" >
                <img src="/images/cross-circle.png" alt="Delete" />
            </Link>

        </div>);
    }
}

class UserComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
        };
        this.selectMultipleOption = this.selectMultipleOption.bind(this);
    }

    componentDidMount() {
        // document.title = 'Plant Fault Data';
        // this.props.clearPlantFaultData();
    }
    componentDidUpdate() {
    }


    onDelete(_id) {
        let isConfirm = window.confirm("Are you sure want to delete this Plant Fault?");
        if (isConfirm)
            this.props.deletePlantFaultData(_id);
    }

    createColumnDefs() {
        return [
            {
                headerName: "Sr No", ockPosition: true, valueGetter: rowIndex, width:80,cellClass: 'cell-wrap',
                autoHeight: true, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Name", field: "name", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' },filter: true
            },
            {
                headerName: "Employee ID", field: "empId", cellClass: 'cell-wrap',
                autoHeight: true, width: 150, cellStyle: { 'white-space': 'normal' }
            }, 
            {
                headerName: "Username", field: "username", cellClass: 'cell-wrap',
                autoHeight: true, width: 200, cellStyle: { 'white-space': 'normal' },filter: true
            },
            { 
                headerName: "Password", field: "textPassword", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Role", field: "role", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Email", field: "email", cellClass: 'cell-wrap',
                autoHeight: true, width: 250, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Mobile No.", field: "mobile_no", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
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
        if (nextProps !== null) {            
            this.setState({
                projectTypes: nextProps.projectTypes,
                plantTypes: nextProps.plantTypes,
                plantFault: nextProps.plantFault
            })
        }
    }

    getPlantTypesDropDownOptions() {
        const options = this.state.plantTypes && this.state.plantTypes.map((plantTypes, key) => { return { id: plantTypes.plant_id, name: plantTypes.plant_name } });
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
        return(
            <div>
                <section className="top-filter" style={{height:"44px"}}>
                    <button type="button" className="btn btn-primary" style={{ width: "105px",float:"right" }}>
                        <img src="/images/icons/fugue/plus-circle.png" alt="add user" title="Add User" style={{ float: "left", paddingRight: "5px" }} />
                        Add User
                    </button>
                </section>
                <div
                    style={{
                        height: '500px',
                    }}
                    className="ag-theme-material">
                        <AgGridReact
                            columnDefs={this.createColumnDefs()}
                            rowData={this.state.plantFault}
                            context={{ componentParent: this }}
                            onGridReady={this.onGridReady}>
                        </AgGridReact>
                        {/* <ChangePasswordModal/> */}
                </div>
            </div>
        )
    }
}
export default UserComponent;