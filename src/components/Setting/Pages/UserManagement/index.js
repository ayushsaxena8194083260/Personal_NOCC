import React, { Component } from "react";
import { Link, withRouter, Route } from 'react-router-dom';
import { renderAllUserDetails, createUpdateUser,deleteUser } from '../../../../actions/action-Settings';
import { connect } from 'react-redux';
import {AgGridReact} from "ag-grid-react";
import ModelPopUp from '../../../Common/ModelPopUp';
// import Col from 'react-bootstrap/Col';
import ChangePasswordModal from './User/changePasswordModal';
import ModelPopUpUserManagement from "../../../Common/ModelPopUpUserManagement";

const rowIndex = (params) => params.node.rowIndex + 1;
var modelData= '';
class ActionCellRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.invokeDelete = this.invokeDelete.bind(this);
        this.invokeChangePsw = this.invokeChangePsw.bind(this);
        this.invokeUserStatus = this.invokeUserStatus.bind(this);

    }

    invokeUserStatus() {
        this.props.context.componentParent.onUserStatusChange(this.props.node.data);
    }

    invokeDelete() {
        this.props.context.componentParent.onDelete(this.props.node.data.userId);
    }
    invokeChangePsw() {
        this.props.context.componentParent.OnChangePsw(this.props.node.data);
    }
    render() {
        const isActive = this.props.data && this.props.data.ostIsActive === 1 ? true : false;
        return (<div className="products-actions">
            <Link className="products-actions-link" to="#" onClick={this.invokeUserStatus} title="Status">
                {/* // to={{
                //     pathname: "/activeuser",
                //     plantFault: this.props.data
                // }}> */}
                <img src={isActive ? "/images/icons/fugue/status.png" : "/images/icons/fugue/status-offline.png"} alt={isActive ? "Active User" : "Inactive User"} />
            </Link>

            <Link to="#" onClick={this.invokeChangePsw} title="Change Password" >
                <img src="/images/icons/fugue/password.png" alt="Change Password" />
            </Link>
            <Link className="products-actions-link"
                to={{
                    pathname: "/setting/AddEditUser",
                    plantFault: this.props.data
                }}>
                <img src="/images/editIcon.png" alt="Edit" />
            </Link>
            <Link to="#" onClick={this.invokeDelete} title="Delete" >
                <img src="/images/cross-circle.png" alt="Delete" />
            </Link>
        </div>);
    }
}

class UserManagementComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userManagements: this.props.userManagements,
            selectedRowId: null,
            showPopUp: false,
            popUpName: null,
            messageErrors:{
                passwordWrongMessage: '',
                passwordMismatchMessage:'',
            },
            postData:{
                currentPassword:'',
                newPassword:'',
                confirmPassword:'',
              }
        }
    }
    componentDidMount() {
        // document.title = 'Plant Fault Data';
        this.props.renderAllUserDetails();
    }

    // componentWillReceiveProps(nextProps) {
    //     console.log(nextProps.userManagements)
    //     this.setState({ userManagements: nextProps.userManagements });
    // }

    createColumnDefs() {
        return [
            {
                headerName: "Sr No", ockPosition: true, valueGetter: rowIndex, width:80,cellClass: 'cell-wrap',
                autoHeight: true, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Name", field: "name", cellClass: 'cell-wrap',
                autoHeight: true, width: 300, cellStyle: { 'white-space': 'normal' },filter: true
            },
            {
                headerName: "Employee ID", field: "empId", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Username", field: "username", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' },filter: true
            },
            {
                headerName: "Password", field: "textPassword", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Role", field: "roleId", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Email", field: "email", cellClass: 'cell-wrap',
                autoHeight: true, width: 200, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Mobile No.", field: "mobileNo", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Action",
                field: '',
                cellRendererFramework: ActionCellRenderer,
                width: 130,
            }
        ];
    }
    OnChangePsw(id) {
        this.setState({ showPopUp: true, selectedRowId: id, popUpName: "psw" });
    }
    onDelete(id) {
        this.setState({ showPopUp: true, selectedRowId: id, popUpName: "del" });

    }

    onUserStatusChange(id) {
        if(id!=null){
        id.ostIsActive === 1?id.ostIsActive=null:id.ostIsActive=1;
        //id.ostIsActive = 1;
        this.props.createUpdateUser(id);
        }
    }

    onHide() {
        this.setState({ showPopUp: false, selectedRowId: null, popUpName: null });
     
        this.componentDidMount() ;
    }

    deleteRecord() {
        if (this.state.selectedRowId !== null) {
            console.log(this.state.selectedRowId)
            this.props.deleteUser(this.state.selectedRowId);

            this.onHide();
        }
    }

    changePsw() {
        let selectedRowId= this.state.selectedRowId
        if (selectedRowId !== null) {
            if(this.state.postData.currentPassword === selectedRowId.textPassword){
                if(this.state.postData.newPassword === this.state.postData.confirmPassword){
                    const updatedUserData = {
                        ...selectedRowId,
                        textPassword:this.state.postData.newPassword
                    }
                    this.props.createUpdateUser(updatedUserData)
                    this.onHide();
                    this.setState({postData:{
                        currentPassword:'',
                        newPassword:'',
                        confirmPassword:'',
                      }})
                }
                else{
                let data=this.state.postData;
                    this.setState({messageErrors:{passwordMismatchMessage:"Current password is not correct",passwordWrongMessage:''}})
                      this.setState({postData:{
                        ...data,
                        confirmPassword:'',
                      }})
                }
            }
            else{
                this.setState({messageErrors:{passwordMismatchMessage:'',passwordWrongMessage:"confirm password is not matched"}})
                this.setState({postData:{
                    currentPassword:'',
                    newPassword:'',
                    confirmPassword:'',
                  }})
            }
            
            
        }
    }

    toProcess() {
        if (this.state.popUpName === 'psw') {
            this.changePsw();
            this.componentDidMount() ;

            
        }
        else if (this.state.popUpName === 'del') {
            this.deleteRecord();
            this.componentDidMount() ;
        }
    }

    handleChanges(event){
    
        let _data = this.state.postData;
            _data[event.target.name] = event.target.value;
            this.setState({ postData: _data });
      }

    renderPopup() {
        if (this.state.popUpName === 'psw') {
            return (

                <ChangePasswordModal messageErrors={this.state.messageErrors} postData={this.state.postData} handleChanges={(data)=>this.handleChanges(data)}/> 
            )
        }
        else if (this.state.popUpName === 'del') {
            return (
                <div>Are you sure want to delete this user?</div>
            )
        }
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps)
        if(nextProps.userManagements!=null) {
            this.setState({ userManagements: nextProps.userManagements});
        }
    }

    render() {
        return (
            <div>
                <section className="top-filter">
                    <div id="filter-table">
                        <div valign="middle" style={{ textAlign: "right" }}>
                            <Route render={({ history }) => (
                                <button type="button" className="btn btn-primary" style={{ width: "10%" }} onClick={() => { history.push('/setting/AddEditUser') }}>
                                    <img src="/images/icons/fugue/plus-circle.png" alt="Add User" title="Add User" style={{ float: "left", marginRight: "3" }} />
                                    Add User
                                                                        </button>)} />
                        </div>
                    </div>
                </section>

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
                        rowData={this.state.userManagements}
                        context={{ componentParent: this }}
                        onGridReady={this.onGridReady}>

                    </AgGridReact>
                    <ModelPopUpUserManagement style={{width:"60%"}} title={this.state.popUpName === 'psw' ? "Change  Password" : "Delete"}
                        id={"popUp"}
                        bodyContent={this.renderPopup()}
                        showPopUp={this.state.showPopUp}
                        secondaryBtnName={this.state.popUpName === 'psw' ? "Close" : "No"}
                        onSecondaryAction={this.onHide.bind(this)}
                        primaryBtnName={this.state.popUpName === 'psw' ? "Reset" : "Yes"}
                        onPrimaryAction={this.toProcess.bind(this)}
                    />
                </div>


            </div>
        )
    }
}
const mapStateToProps = state => {
    return {

        userManagements: state.SettingsReducer.userManagements,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        renderAllUserDetails: () => dispatch(renderAllUserDetails()),
        createUpdateUser: (data) => dispatch(createUpdateUser(data)),
        deleteUser: (data) => dispatch(deleteUser(data)),
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserManagementComponent)); 