import React, { Component } from 'react';
import axios from 'axios';
import {createOrUpdatePlant} from "../../../../actions"
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import '../../../../styles/plant/plantAddEdit.scss';
import { renderAllUserDetails, getAllHubUsers, createUpdateHubUser, renderHubMasterDetails  } from '../../../../actions/action-Settings'
import Table from 'react-bootstrap/Table';

class MappingHub extends Component{
    constructor(props) {
        super(props);
        this.state = {
            hubData : this.props.location.hubData!=undefined?this.props.location.hubData:'',
            userManagements :[],
            selectedUser: 'Select User',
            hubUsers: '',
            checkAllHub:false
        }
        this.handleCheckbox = this.handleCheckbox.bind(this);
    }

    componentDidMount() {
        this.props.renderAllUserDetails();
        this.props.getAllHubUsers();
        this.props.renderHubMasterDetails();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps!= null) {
            this.setState ({ 
                userManagements : nextProps.userManagements,
                hubUsers: nextProps.hubUsers
            });
        }
    }

    hanldeHubUser(userId, hubId) {
        const data = {
            "id" : 0,
            "hubId" : hubId,
            "userId" : userId,
            "priority": 1
        }
        this.props.createUpdateHubUser(data);
        alert('Hub is mapped to a user successfully');
        this.props.history.push('/setting/HubDetails');
    }

    handleCheckbox(event) {
        const stateDup = this.state;

        if(event.target.name === 'checkall'){
            stateDup.checkAllHub = true;
        }
        else {
            stateDup.checkAllHub = false;
        }
        this.setState({ stateDup });
    }

    handleChangeUser(event) {
        const stateDup = this.state;
        stateDup[event.target.name] = event.targe.value;
        this.setState({ stateDup });

    }

    render(){
        return(
            <div>
                <Card className="add-plant-card" style={{width:"60%"}}>
                  <Card.Header as="h5">Mapping user to hubs</Card.Header>
                  <Card.Body>
                    <Row>
                        <Col style={{maxWidth:"30%"}}>
                            <Form.Label>User<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                        <Col>
                        <select class="form-control" name="selectedUser" type="dropdown" onChange={(item) => this.handleChangeUser(item)}>
                        <option>{this.state.selectedUser}</option>    
                        {this.state.userManagements && this.state.userManagements.map((item, key) => {
                            return <option value={item.userId}>{item.name}</option>
                        }
                        )}
                        </select>  
                        </Col>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{maxWidth:"30%"}}>
                            <Form.Label>Hubs<span className="form-required">*</span></Form.Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Check label="Check All" name="checkall" checked={this.state.checkAllHub} onChange={this.handleCheckbox}/>
                        </Col>
                        <Col>
                            <Form.Check label="Uncheck All" name="uncheckall" checked={!this.state.checkAllHub} onChange={this.handleCheckbox}/>
                        </Col>
                    </Row>
                    <Row>
                    {this.props.hubs !== undefined? this.props.hubs.map(hub=>{
                        return <Form.Check style={{display:'inline-block',width:'295px',margin:"5px"}} name="plantList" checked={this.state.checkAllHub} name={hub.hubName} label={hub.hubName} />
                    }):''}
                    </Row>
                    {/* <tr>
                    {this.props.hubs!=undefined && this.props.hubs.map((hub,key) =>
                    
                    <td valign="middle" align="left"><input type="checkbox" class="check_gm" checked={this.state.checkAllHub} id="chk" name={hub.hubName} value={hub.hubName}/>{hub.hubName}
                    </td>
                    )}
                    </tr> */}
                    
                    <Row>
                        <Col>
                        </Col>
                        <Col md={2}>
                        <Button variant="primary" size="lg" block>Submit</Button>
                        </Col>
                        <Col md={2}>
                        <Button variant="primary" size="lg" block>Back</Button>
                        </Col>
                        <Col>                      
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            <Card className="add-plant-card" style={{width:"60%"}}>
                  <Card.Header as="h5">View user mapped to hubs</Card.Header>
                  <Card.Body>
                  <Table>
                <thead>
                    <tr>
                    <th>Hub Name</th>
                    <th>Name</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.hubUsers!=''?this.state.hubUsers.map((user, key) =>
                    <tr>
                    <td>{user.hubName}</td>
                    <td>{user.name}</td>
                    <td><img src="/images/editIcon.png" alt="Edit" /></td>
                    </tr>
                    ):
                    <tr></tr>}
                    
                </tbody>
                </Table>
                  </Card.Body>
                  </Card>
        </div>
        )
    }
}
const mapStateToProps = state => {
    return {

        plant: state.plant,
        plants: state.plants.allplants,
        userManagements: state.SettingsReducer.userManagements,
        hubUsers : state.SettingsReducer.hubUsers,
        hubs: state.SettingsReducer.hubs,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createOrUpdatePlant: (plant) => dispatch(createOrUpdatePlant(plant)),
        renderAllUserDetails:() => dispatch(renderAllUserDetails()),
        getAllHubUsers: () => dispatch(getAllHubUsers()),
        createUpdateHubUser : (data) => dispatch(createUpdateHubUser()),
        renderHubMasterDetails: () => dispatch(renderHubMasterDetails())
    }
}
export default  withRouter(connect(mapStateToProps,mapDispatchToProps)(MappingHub)) ;