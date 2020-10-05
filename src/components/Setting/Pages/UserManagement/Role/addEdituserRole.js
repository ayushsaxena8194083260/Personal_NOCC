import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { getUserRolessSettings, getPageGroupSettings, getMenuPermissionByRoleId } from '../../../../../actions/action-Settings';
import { connect } from 'react-redux';
import { Card, Row, Col, Form, Button } from 'react-bootstrap';

import { getAllPlants, deletePlant } from '../../../../../actions';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { createUpdateRole } from '../../../../../actions/action-Settings';
import { RoleComponent } from './RoleComponent'
import { createBrowserHistory } from 'history';

const history = createBrowserHistory({ forceRefresh: true })

const rowIndex = (params) => params.node.rowIndex + 1;

class ActionCellRenderer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            menuByRoleId: this.props.data['pageGroupPermission']
        }

        this.invokeCheckboxHandle = this.invokeCheckboxHandle.bind(this);
    }

    invokeCheckboxHandle() {
        // debugger
        console.log(this.props)
        let data = this.props.node.data;
        data['pageGroupPermission'] = !this.state.menuByRoleId;

        this.setState({
            menuByRoleId: !this.state.menuByRoleId
        });

        this.props.context.componentParent.handleChange(data);
        console.log(this.state.menuByRoleId, 'this.state.menuByRoleId')
    }

    render() {
        return (
            <div className="products-actions">
                <Form.Check
                    className='menu_permission'
                    style={{ display: "inline-block", marginLeft: "calc(50% - 50px)" }}
                    type="checkbox"
                    value={this.state.menuByRoleId}
                    checked={this.state.menuByRoleId}
                    onChange={this.invokeCheckboxHandle} />
            </div>
        );
    }
}
class ActionRadioRenderer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLandingPage: this.props.data['isLandingPage']
        }

        this.invokeHandleRadio = this.invokeHandleRadio.bind(this);
    }

    invokeHandleRadio() {
        let data = this.props.node.data;
        data['isLandingPage'] = !this.state.isLandingPage;

        this.setState({
            isLandingPage: !this.state.isLandingPage
        });

        this.props.context.componentParent.handleChange(data);
    }

    render() {
        return (
            <div className="products-actions">
                <Form.Check
                    type="radio"
                    style={{ display: "inline-block", marginLeft: "calc(50% - 50px)" }}
                    name="isLandingPage"
                    checked={this.state.isLandingPage}
                    onChange={this.invokeHandleRadio}
                />
            </div>
        );
    }
}
class AddEdituserRole extends Component {
    constructor(props) {
        super(props);
        if (this.props.location.plantFault === undefined) {
            this.state = {
                userRolesInfo: [],
                pageName: "Add User Role",
                roleDetails: {
                    roleName: '',
                    addPermission: '',
                    editPermisson: '',
                    deletePermisson: ''
                },
                menuByRoleId: [],
                gridOptions: this.createGridOptions(),
                userRoles: this.props.userRoles,
                domLayout: "autoHeight",
            }

        }
        else {
            this.state = {
                userRolesInfo: [],
                roleDetails: this.props.location.plantFault,
                pageName: 'Edit User Role',
                gridOptions: this.createGridOptions(),
                userRoles: this.props.userRoles,
                domLayout: "autoHeight",
            }
        }
        this.handleChangeRole = this.handleChangeRole.bind(this);
    }
    createGridOptions() {
        // debugger
        return {
            columnDefs: [
                { headerName: "S.No.", lockPosition: true, valueGetter: rowIndex, field: "make", width: 60, autoHeight: true, },
                { headerName: "Menu", field: "menuTitle" },
                {
                    headerName: "Menu Permission", field: 'pageGroupPermission',
                    cellRendererFramework: ActionCellRenderer
                },
                {
                    headerName: "Default Landing Page", field: "isLandingPage",
                    cellRendererFramework: ActionRadioRenderer
                }],
            suppressHorizontalScroll: false,
        }
    }
    componentDidMount() {
        // document.title = 'Plant Fault Data';
        this.props.getPageGroupSettings();
        this.props.getMenuPermissionByRoleId(this.state.roleDetails.roleId);
        // console.log("ZZZZZZZZZZZZZZZZZZZZZZZZ",this.props)
    }

    componentWillReceiveProps(nextProps) {
        let { userRoles, menuByRoleId } = nextProps

        if (userRoles && menuByRoleId) {
            // debugger
            userRoles = userRoles.map(ur => {
                return {
                    ...ur,
                    pageGroupPermission: menuByRoleId.findIndex(mbr => ur['menuId'] == mbr['menuId']) > -1,
                    isLandingPage: this.state.roleDetails.defaultLanding == ur['menuTitle']
                    
                }
               
            })
      
            // debugger
        };

        this.setState({
            userRolesInfo: nextProps.userRolesInfo,
            userRoles: userRoles,
            menuByRoleId: menuByRoleId
        });
    }

    selectAll = (e) => {
        let stateDup = this.state.userRoles
        stateDup = stateDup.map(fruite => {
            fruite['pageGroupPermission'] = true
            return fruite
        })
        this.setState({ userRoles: stateDup })

        let menuPermissionCheckbox = document.getElementsByClassName('menu_permission')

        for (let checkboxDiv of menuPermissionCheckbox) {
            if (!checkboxDiv.children[0].checked) {
                checkboxDiv.children[0].click()
            }
        }

        // console.log(stateDup);
        // this.state.menuByRoleId = this.state.userRoles
    }

    onSubmit = (e) => {
        e.preventDefault();
        // debugger
        let data = {
            roleId: this.state.roleDetails.roleId,
            roleName: this.state.roleDetails.roleName,
            defaultLanding: this.state.userRoles.find(ur => ur['isLandingPage']).menuTitle,
            addFlag: this.state.roleDetails.addFlag,
            editFlag: this.state.roleDetails.editFlag,
            deleteFlag: this.state.roleDetails.deleteFlag,
            isPublished: this.state.roleDetails.isPublished,
            permissions: this.state.userRoles.filter(ur => ur['pageGroupPermission']).map(d => d['menuId'])
        }
        console.log(data, 'list')

        this.props.createUpdateRole(data);

        history.push('/setting/UserManagement/Role');
    }

    handleChange(data) {
        // debugger
        const stateDup = this.state;
        if (data['isLandingPage']) {
            stateDup.userRoles = stateDup.userRoles.map(ur => {
                return {
                    ...ur,
                    isLandingPage: ur['pageGroupName'] == data['pageGroupName']
                }
            })
        }
        this.setState({ stateDup });
    }

    handleChangeRole(event) {
        const stateDup = this.state;
        if (event.target.name === 'addFlag' || event.target.name === 'editFlag' || event.target.name === 'deleteFlag') {
            stateDup.roleDetails[event.target.name] = event.target.value === 'Yes' ? 1 : 0
        }
        else {
            stateDup.roleDetails[event.target.name] = event.target.value;
        }

        this.setState({ stateDup });
    }

    render() {
        return (
            <div>
                <Card className="add-plant-card" style={{ width: '60%', height: '100%' }}>
                    <Card.Header as="h5">Edit Role</Card.Header>
                    <Card.Body>
                        <Row>
                            <Col>
                                <Form.Label>Role Name<span className="form-required">*</span></Form.Label>
                            </Col>
                            <Col>
                                <Form.Control type="text" name="roleName" value={this.state.roleDetails.roleName} onChange={this.handleChangeRole} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Add Permission<span className="form-required">*</span></Form.Label>
                            </Col>
                            <Col>
                                {/* <Form.Control disabled type="text" value={this.state.roleDetails.addFlag !== 1 ? 'yes':'no'}/> */}
                                <select required className="form-control" type="dropdown" name="addFlag" onChange={(item) => this.handleChangeRole(item)} >
                                    {/* value={this.state.roleDetails.addFlag === 1 ? 'Yes':'No'} */}
                                    <option>{this.state.roleDetails.addFlag === 1 ? 'Yes' : 'No'}</option>
                                    <option>Yes</option>
                                    <option>No</option>
                                </select>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Edit Permission<span className="form-required">*</span></Form.Label>
                            </Col>
                            <Col>
                                {/* <Form.Control disabled type="text" value={this.state.roleDetails.editFlag !== 1 ? 'yes':'no'}/> */}
                                <select required className="form-control" type="dropdown" name="editFlag" onChange={(item) => this.handleChangeRole(item)} >
                                    {/* value={this.state.roleDetails.editFlag === 1 ? 'Yes':'No'} */}
                                    <option>{this.state.roleDetails.editFlag === 1 ? 'Yes' : 'No'}</option>
                                    <option>Yes</option>
                                    <option>No</option>
                                </select>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Delete Permission<span className="form-required">*</span></Form.Label>
                            </Col>
                            <Col>
                                {/* <Form.Control disabled type="text" value={this.state.roleDetails.deleteFlag !== 1 ? 'yes':'no'}/> */}
                                <select required className="form-control" type="dropdown" name="deleteFlag" onChange={(item) => this.handleChangeRole(item)} >
                                    {/* value={this.state.roleDetails.deleteFlag === 1 ? 'Yes':'No'} */}
                                    <option>{this.state.roleDetails.deleteFlag === 1 ? 'Yes' : 'No'}</option>
                                    <option>Yes</option>
                                    <option>No</option>
                                </select>
                            </Col>
                        </Row>
                        <div className="ag-theme-material" >
                            <AgGridReact
                                gridOptions={this.state.gridOptions}
                                rowData={this.state.userRoles}
                                domLayout={this.state.domLayout}
                                context={{ componentParent: this }}
                            >
                            </AgGridReact>
                        </div>
                        <Row>
                            <Col></Col>
                            <Col>
                                <Button variant="primary" size="md" onClick={this.selectAll} block>Select All</Button>
                            </Col>
                            <Col>
                                <Button variant="primary" size="md" onClick={this.onSubmit} block>Submit</Button>
                            </Col>
                            <Col></Col>
                        </Row>
                    </Card.Body>
                </Card>

            </div>

        )
    }
}
const mapStateToProps = state => {
    return {
        plants: state.plants.allplants,
        userRolesInfo: state.SettingsReducer.userRolesInfo,
        userRoles: state.SettingsReducer.pageGroup,
        menuByRoleId: state.SettingsReducer.menuByRoleId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserRolessSettings: () => dispatch(getUserRolessSettings()),
        getAllPlants: () => dispatch(getAllPlants()),
        getPageGroupSettings: () => dispatch(getPageGroupSettings()),
        deletePlant: (_id) => dispatch(deletePlant(_id)),
        createUpdateRole: (roleDetails) => dispatch(createUpdateRole(roleDetails)),
        getMenuPermissionByRoleId: (roleId) => dispatch(getMenuPermissionByRoleId(roleId))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddEdituserRole));


