import React, { Component } from 'react';
// import axios from 'axios';
import { createOrUpdatePlant, getAllPlants , getAllPlants2 } from "../../../../../actions"
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import CheckBox from './CheckBox'
import '../../../../../styles/plant/plantAddEdit.scss';
import { createUpdateUser, renderAllRoleDetails, getUserPlantByUserId } from '../../../../../actions/action-Settings';
import DropDown from "../../../../Common/DropDown";
import { MaxDivHeightScaler } from 'ag-grid-community/dist/lib/rendering/maxDivHeightScaler';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory({ forceRefresh: true })

class AddEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showMe: false,
            allCheckbox: false,
            allGroundMountCheckbox: false,
            allRoofTopCheckbox: false,
            user: this.props.location.plantFault === undefined ? '' : this.props.location.plantFault,
            userRole: '',
            userRoles: this.props.userRoles,
            selectAll: false,
            selectAllGM: false,
            selectAllRT: false,
            plantsByUser: [],
            isSubmited: false,
            groundMoundList: [],
            roofTopList: [],
            checkedItems: new Map(),
            postData: {
                creationDate: this.props.location.plantFault === undefined ? '' : this.props.location.plantFault.creationDate,
                userId: this.props.location.plantFault === undefined ? '' : this.props.location.plantFault.userId,
                name: this.props.location.plantFault === undefined ? '' : this.props.location.plantFault.name,
                email: this.props.location.plantFault === undefined ? '' : this.props.location.plantFault.email,
                mobileNo: this.props.location.plantFault === undefined ? '' : this.props.location.plantFault.mobileNo,
                roleId: this.props.location.plantFault === undefined ? '' : this.props.location.plantFault.roleId,
                empId: this.props.location.plantFault === undefined ? '' : this.props.location.plantFault.empId,
                signature: this.props.location.plantFault === undefined ? '' : this.props.location.plantFault.signature,
                username: this.props.location.plantFault === undefined ? '' : this.props.location.plantFault.username,
                state: this.props.location.plantFault === undefined ? '' : this.props.location.plantFault.ostIsActive,
                textPassword: this.props.location.plantFault === undefined ? '' : this.props.location.plantFault.textPassword,
                confirmPassword: this.props.location.plantFault === undefined ? '' : this.props.location.plantFault.textPassword

            }
        }
        const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'));
        console.log(isAuthenticated)
        this.handleChangeCheckBox = this.handleChangeCheckBox.bind(this);
        this.handleChangeBox = this.handleChangeBox.bind(this);
    }
    componentDidMount() {
        // if(this.props.getUserPlantByUserId){
        //     this.setState({
        //         showMe: false
        //     })
        // }
        // else{
        //     this.setState({
        //         showMe: true
        //     })
        // }
        
        this.props.getAllPlants2();
        this.props.renderAllRoleDetails();
        this.props.getUserPlantByUserId(this.state.user.userId);
        console.log(this.props)
    }

    handleChange(event) {
        console.log(event.target.value)
        let _data = this.state.postData;
        _data[event.target.name] = event.target.value;

        let today = new Date();
        _data["creationDate"] = today;

        this.setState({ postData: _data })

    }
    // handleChangeForDecimal(event) {

    //     let _data = this.state.postData;
    //     const re = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    //     if (event.target.value === '' || re.test(event.target.value)) {
    //         _data[event.target.name] = event.target.value;

    //     }

    //     this.setState({ postData: _data });

    // }
    onSubmit = (e) => {

        e.preventDefault();

        let selectedPlantIds = [
            ...this.state.roofTopList.filter(l => l.status),
            ...this.state.groundMoundList.filter(l => l.status)
        ].map(item => item.plantId)
        if (this.state.postData.roleId == '') {
            this.state.postData.roleId = 3;
        }
        if (this.state.postData.textPassword == this.state.postData.confirmPassword) {
            let data = {
                creationDate: this.state.postData.creationDate,
                email: this.state.postData.email,
                empId: this.state.postData.empId,
                graphUi: this.state.postData.graphUi,
                mobileNo: this.state.postData.mobileNo,
                name: this.state.postData.name,
                isPublished: "",
                graphUi: "",
                ostIsActive: 1,
                password: this.state.postData.textPassword,
                roleId: this.state.postData.roleId,
                username: this.state.postData.username,
                textPassword: this.state.postData.confirmPassword,
                plantIds: selectedPlantIds,
                userId: this.state.user.userId
            }

            this.props.createUpdateUser(data);
            this.props.history.push('/setting/UserManagement/User');
            alert('User has been created/Updated');

        } else {
            alert("Password Does not Match")
        }
        this.setState({ isSubmited: true });
    }
back(){
    // this.setState({
    //     showMe: true
    // })
    history.push('/setting/UserManagement/User');

   
}
    handleChangeCheckBox(event) {

        const stateDup = this.state;
        if (stateDup[event.target.name] === true) {
            stateDup[event.target.name] = false;
        }
        else {
            stateDup[event.target.name] = true;
        }
        this.setState({ stateDup });


    }

    handleChangePlant(event) {
        const _data = this.state.postData;
        const selectedValue = event.target.value;
        if (selectedValue && selectedValue.roleId !== "-1") {
            _data[event.target.name] = selectedValue;
            this.setState({ postData: _data });
        }
    }
    componentWillReceiveProps(nextProps) {
             if(nextProps.userPlantByUserId){
            this.setState({
                showMe: false
            })
        }
        else{
            this.setState({
                showMe: true
            })
        }
        console.log(nextProps)
        let { userPlantByUserId, plants } = nextProps
        if (userPlantByUserId && plants) {
            plants = plants.map(ur => {
                return {
                    ...ur,
                    pageGroupPermission: userPlantByUserId.findIndex(mbr => ur['plantId'] == mbr['plantId']) > -1,
                }
            })
        };
        if (nextProps.plants) {
            // this.setState({
            //     showMe: true

            // })
            let plantsList = nextProps.plants
                .map(pl => {
                    return {
                        type: pl.type,
                        plantId: pl.plantId,
                        plantName: pl.plantName,
                        status: false
                    }
                });

            let groundMoundList = plantsList.filter(a => a.type == "GROUNDMOUNT");
            let roofTopList = plantsList.filter(a => a.type != "GROUNDMOUNT");

            this.setState({
                groundMoundList: groundMoundList,
                roofTopList: roofTopList
            })
        }

        if (nextProps.plants && nextProps.userPlantByUserId) {
            // this.setState({
            //     showMe: false

            // })
            let plantsList = nextProps.plants
                .map(pl => {
                    return {
                        type: pl.type,
                        plantId: pl.plantId,
                        plantName: pl.plantName,
                        // userId: nextProps.userPlantByUserId.filter(word => word.userId)? userId : 0,
                        status: nextProps.userPlantByUserId.find(upl => upl.plantId == pl.plantId) ? true : false
                    }

                });

            let groundMoundList = plantsList.filter(a => a.type == "GROUNDMOUNT");
            let roofTopList = plantsList.filter(a => a.type != "GROUNDMOUNT");

            this.setState({
                groundMoundList: groundMoundList,
                roofTopList: roofTopList
            })
        }

        console.log(nextProps)
        if (nextProps != null) {
            if (nextProps.userRoles != undefined) {
                var userRole = null;
                for (var i = 0; i < nextProps.userRoles.length; i++) {
                    if (this.state.user.roleId === nextProps.userRoles[i].roleId) {
                        userRole = nextProps.userRoles[i].roleName;
                        console.log(userRole, 'userRole')
                        break;
                    }
                }
                this.setState({ userRoles: nextProps.userRoles, userRole: userRole });
            }
            if (nextProps.userPlantByUserId != undefined) {
                let plantsByUser = [];
                for (var i = 0; i < nextProps.userPlantByUserId.length; i++) {
                    plantsByUser.push(nextProps.userPlantByUserId[i].plantId);
                }
                this.setState({ plantsByUser: plantsByUser })
            }
        }
        this.setState({
            userPlantByUserId: userPlantByUserId,
            plants: nextProps.plants
        })
    }


    handleAllGroundMountRoopTopChecked = (event) => {
        this.setState({
            allCheckbox: true
        })

        this.handleAllGroundMountChecked(event)
        this.handleAllRoopTopChecked(event)
    }

    handleAllGroundMountChecked = (event) => {

        let value = event.target.checked

        this.setState({
            allGroundMountCheckbox: value
        })

        let menuPermissionCheckbox = document.getElementsByClassName('ground_mound_list')
        for (let checkboxDiv of menuPermissionCheckbox) {
            if (value) {
                if (!checkboxDiv.checked) {
                    checkboxDiv.click()
                }
            } else {
                if (checkboxDiv.checked) {
                    checkboxDiv.click()
                }
            }
        }
    }

    handleAllRoopTopChecked = (event) => {
        let value = event.target.checked

        this.setState({
            allRoofTopCheckbox: value
        })

        let menuPermissionCheckbox = document.getElementsByClassName('roof_top_list')
        for (let checkboxDiv of menuPermissionCheckbox) {
            if (value) {
                if (!checkboxDiv.checked) {
                    checkboxDiv.click()
                }
            } else {
                if (checkboxDiv.checked) {
                    checkboxDiv.click()
                }
            }
        }
    }

    handleChangeBox(event) {

        let isChecked = event.target.checked;
        let plantId = event.target.value;
        let itemClass = event.target.classList[0]

        if (itemClass == 'ground_mound_list') {
            let tempState = this.state.groundMoundList
            let itemIndex = tempState.findIndex(i => i.plantId == plantId)

            tempState[itemIndex].status = isChecked

            this.setState({
                groundMoundList: tempState
            })
        }
        else if (itemClass == 'roof_top_list') {
            let tempState = this.state.roofTopList
            let itemIndex = tempState.findIndex(i => i.plantId == plantId)

            tempState[itemIndex].status = isChecked

            this.setState({
                roofTopList: tempState
            })
        }

        if (!event.target.checked) {
            if (this.state.allCheckbox) {
                this.setState({
                    allCheckbox: false
                })
            }
            if (
                event.target.classList.contains('ground_mound_list')
            ) {
                if (this.state.allGroundMountCheckbox) {
                    this.setState({
                        allGroundMountCheckbox: false
                    })
                }
            }
            if (
                event.target.classList.contains('roof_top_list')
            ) {
                if (this.state.allRoofTopCheckbox) {
                    this.setState({
                        allRoofTopCheckbox: false
                    })
                }
            }
        }
    }
    renderErrortext(fieldID, msg) {
        return (
            this.state.isSubmited === true && !this.state.postData[fieldID] && <p className="errorText" style={{ color: "#CC0000", display: "block", fontSize: "11px", marginTopop: "0.5em" }}>{msg}</p>
        )
    }
    handleCheckChieldElement = (event) => {
        let fruites = this.state.plants
        console.log(event.target.value)
        fruites.forEach(fruite => {
            if (fruite.plantId === event.target.value)
                fruite.isChecked = event.target.checked
        })
        this.setState({ plants: fruites })
        console.log(this.state.plants)
    }

    render() {
        return (
            <form onSubmit={this.onSubmit} >
                <div>
                <section className="top-filter">
                    <div id="filter-table">
                        <div valign="middle" style={{ textAlign: "right" }}>
                        <button type="button" className="btn btn-primary" style={{ width: "10%" }}  onClick={() => { history.push('/setting/UserManagement/User')}}>
                                    <img src="/images/icons/fugue/left-arrow.png" alt="Back" title="Back" style={{ float: "left", marginRight: "3" }} />
                                    Back </button>

                        </div>
                    </div>
                </section>
                    <Card className="add-plant-card">
                  
                        <Card.Header as="h5">User                   
                      
                              
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Form.Label>Name<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control name="name" type="text" onChange={(event) => this.handleChange(event)} value={this.state.postData.name} />
                                    {this.renderErrortext("name", "The Date Field Is Required.")}

                                </Col>
                                <Col>
                                    <Form.Label>Email<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control type="email" name="email" onChange={(event) => this.handleChange(event)} value={this.state.postData.email} />
                                    {this.renderErrortext("email", "The Date Field Is Required.")}

                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Mobile No.<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control type="text" name="mobileNo" onChange={(event) => this.handleChange(event)} value={this.state.postData.mobileNo}
                                        maxLength="10" pattern="^(\d{1,3}[- ]?)?\d{10}$" />
                                    {this.renderErrortext("mobileNo", "The Date Field Is Required.")}

                                </Col>

                                <Col>
                                    <Form.Label>Role<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    {/* <Form.Control type="dropdown" value={this.state.user.role}/> */}
                                    {/* <select required class="form-control" name="roleId" type="dropdown" name="roleId" onChange={(item) => this.handleChange(item)} >
                                       
                                        {this.state.userRoles === '' ? <option>default</option> : this.state.userRoles.map((role, key) => <option key={role.roleId} value={role.roleId} selected={role.roleId}>{role.roleName}</option>)}
                                    </select> */}
                                    <select class="form-control" name="roleId" type="dropdown" onChange={(item) => this.handleChangePlant(item)}>
                                        {this.state.userRoles && this.state.userRoles.map((item, key) => {
                                            if (this.state.postData["roleId"] === item.roleId) {
                                                return <option value={item.roleId} selected>{item.roleName}</option>
                                            }
                                            else {
                                                return <option value={item.roleId}>{item.roleName}</option>
                                            }
                                        }

                                        )}
                                    </select>
                                </Col>
                            </Row>
                            <Row>

                                <Col>
                                    <Form.Label>UserName<span className="form-required">*</span></Form.Label>

                                </Col>

                                <Col>
                                    <Form.Control type="text" name="username" onChange={(event) => this.handleChange(event)} value={this.state.postData.username} />
                                    {this.renderErrortext("username", "The Date Field Is Required.")}

                                </Col>
                                <Col>
                                    <Form.Label>Employee ID<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control type="text" name="empId" onChange={(event) => this.handleChange(event)} value={this.state.postData.empId} />
                                    {this.renderErrortext("empId", "The Date Field Is Required.")}

                                </Col>

                            </Row>
                            <Row>
                                <Col>
                                    {this.state.showMe  ?
                                        <Form.Label>Password<span className="form-required">*</span></Form.Label>
                                        : null

                                    }
                                </Col>
                                <Col>
                                    {this.state.showMe ?
                                        <Form.Control type="text" name="textPassword" onChange={(event) => this.handleChange(event)} value={this.state.postData.textPassword} />



                                        : null

                                    }
                                    {this.renderErrortext("password", "The Date Field Is Required.")}
                                </Col>
                                <Col>
                                    {this.state.showMe  ?
                                        <Form.Label>Confirm-Password<span className="form-required">*</span>
                                        </Form.Label>
                                        : null

                                    }
                                </Col>
                                <Col>
                                    {this.state.showMe ?
                                        <Form.Control type="text" name="confirmPassword" onChange={(event) => this.handleChange(event)} value={this.state.postData.confirmPassword} />
                                        : null
                                    }
                                </Col>

                                {/* <Col>
                                    <Form.Label>Signature<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control type="file" value={this.state.user.signature} />
                                </Col> */}
                            </Row>

                            <Row style={{ marginTop: "40px" }}>
                                <Col lg={4} sm={4} md={4}>
                                    <Form.Check style={{ display: "inline-block", paddingRight: "10px", fontSize: "16px", fontWeight: "700" }} onClick={this.handleAllGroundMountRoopTopChecked} checked={this.state.allCheckbox} name="selectAll" label="Select All Checkbox" />

                                </Col>
                                <Col lg={4} sm={4} md={4}>
                                    <Form.Check style={{ display: "inline-block", paddingRight: "10px", fontSize: "16px", fontWeight: "700" }} onClick={this.handleAllGroundMountChecked} checked={this.state.allGroundMountCheckbox} label="Select All GroundMount" />
                                    {/* <input type="checkbox"  value="true" />
                                        <label style={{ display: "inline-block", paddingRight: "10px" }} >Select All GroundMount</label> */}
                                </Col>
                                <Col lg={4} sm={4} md={4}>
                                    <Form.Check style={{ display: "inline-block", paddingRight: "10px", fontSize: "16px", fontWeight: "700" }} onClick={this.handleAllRoopTopChecked} checked={this.state.allRoofTopCheckbox} label="Select All RoofTop" />
                                    {/* <input type="checkbox" onClick={this.handleAllRoopTopChecked} value="" />
                                        <label style={{ display: "inline-block", paddingRight: "10px" }}> Select All RoofTop</label> */}
                                </Col>
                            </Row>
                            {
                            }
                            {/* <Row>
                                <Col lg={4} sm={4} md={4}></Col>

                                <Col lg={6} sm={6} md={6}>
                                    <input type="checkbox" onClick={this.handleAllRoopTopChecked} value="" />
                                    <label style={{ fontWeight: "700", fontSize: "18px", paddingLeft: "14px" }}>Check / Uncheck All RoofTop</label>

                                </Col>
                            </Row>
                            <Row>
                                <Col lg={4} sm={4} md={4}></Col>
                                <Col lg={6} sm={6} md={6}>
                                    <input type="checkbox" onClick={this.handleAllGroundMountChecked} value="true" />
                                     <label style={{ fontWeight: "700", fontSize: "18px", paddingLeft: "14px" }}>Check / Uncheck All GroundMount</label>

                                </Col>
                            </Row> */}
                            <Row>
                                {
                                    this.state.groundMoundList.map(item => (

                                        <label style={{ display: 'inline-block', width: '295px', margin: "5px" }}>
                                            <input className='ground_mound_list' type="checkbox" value={item.plantId} onChange={this.handleChangeBox} checked={item.status} /> {item.plantName}
                                        </label>

                                    ))
                                }
                            </Row>


                            <Row>
                                {
                                    this.state.roofTopList.map(item => (

                                        <label style={{ display: 'inline-block', width: '295px', margin: "5px" }}>
                                            <input className="roof_top_list" type="checkbox" value={item.plantId} onChange={this.handleChangeBox} checked={item.status} /> {item.plantName}
                                        </label>

                                    ))
                                }
                                {/* <ul style={{ display: 'inline-block', width: '295px', margin: "5px" }}>
                                        {
                                            this.state.roofTopList.map((roof) => {
                                                return (<CheckBox handleCheckChieldElement={this.handleCheckChieldElement}  {...roof} />)
                                            })
                                        }
                                    </ul> */}

                                {/* {this.props.plants !== undefined ? this.props.plants.map(plant => {
                                    return <Form.Check style={{ display: 'inline-block', width: '295px', margin: "5px" }} checked={this.state.selectAll || 
                                        (this.state.selectAllGM && plant.type === 'GROUNDMOUNT') || 
                                        (this.state.selectAllRT && plant.type === 'ROOFTOP') || this.state.plantsByUser.includes(plant.plantId)}
                                         name="plantList" label={plant.plantName} value={plant.plantId} onChange={this.handleChangeCheckBox2} />
                                }) : ''} */}

                            </Row>
                            <Row>
                                <Col>
                                </Col>
                               
                                <Col md={2}>
                                    <Button type="submit" variant="primary" size="lg" block>Submit</Button>
                                </Col>
                                <Col>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </div>
            </form>
        )
    }
}

const mapStateToProps = state => {
    return {
        plants: state.plants.allplants,
        userRoles: state.SettingsReducer.userRoles,
        userPlantByUserId: state.SettingsReducer.userPlantByUserId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllPlants2: () => dispatch(getAllPlants2()),
        createUpdateUser: (user) => dispatch(createUpdateUser(user)),
        renderAllRoleDetails: () => dispatch(renderAllRoleDetails()),
        getUserPlantByUserId: (userId) => dispatch(getUserPlantByUserId(userId))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddEditUser));