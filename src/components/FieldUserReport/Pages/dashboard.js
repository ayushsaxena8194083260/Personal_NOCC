import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import DropDown from "../../Common/DropDown";
import { AgGridReact } from "ag-grid-react";
import 'react-picky/dist/picky.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import '../../../styles/plant/plantFaultData.scss';
import {
    Link,
} from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import '../../../App.scss';
import { getAllPlants } from "../../../actions/PlantActions";
import { getPlantByType, getModuleCleaningByPlantId, getModuleCleaningAnalysisDataByDate, clearModuleAnalysisData, createOrUpdateModuleCleaningAnalysis } from "../../../actions/moduleCleaningAnalysisActions";
import { getSelectedHubID, getAllHub, getHubLatLongs } from "../../../actions/action-FieldUserReport";
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
//import { getUnassignedTickets } from '../../../actions/action-FieldUserReport';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

const rowIndex = (params) => params.node.rowIndex + 1;

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedHubID: this.props.selectedHubID,
            hubID: this.props.hubID,
            selectedHubName: 'Select Hub',
            lat: 28.7041,
            lng: 77.1025,
            center: new this.props.google.maps.LatLng(28.7041, 77.1025)
        }
        this.getHubsItem = this.getHubsItem.bind(this);
    }


    componentDidMount() {
        this.props.getAllHub();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== null) {
            this.setState({
                selectedHubID: nextProps.selectedHubID,
                hubID: nextProps.hubID,
                latLangDetails: nextProps.latLangDetails,
                lat: nextProps.latLangDetails!=undefined?nextProps.latLangDetails[0].latitude:28.7041,
                lng: nextProps.latLangDetails!=undefined?nextProps.latLangDetails[0].longitude:77.1025,
                center: nextProps.latLangDetails!=undefined?new this.props.google.maps.LatLng(nextProps.latLangDetails[0].latitude, nextProps.latLangDetails[0].longitude):new this.props.google.maps.LatLng(28.7041, 77.1025)
                
            })
        }
    }

    handleChangeHub(event) {
        let selectedLat = 28.7041;
        let selectedLng = 77.1025;
        const res = this.state.hubID && this.state.hubID.filter((flt) => flt.hubId.toString() == event.target.value)[0];
        if (res) {
            selectedLat = res.lat;
            selectedLng = res.lat;
        }
        this.props.getHubLatLongs(event.target.value);
        this.setState({ selectedHubName: res.hubName, lat: selectedLat, lng: selectedLng });

    }

    
    getHubsItem() {
        let hubDetails = [];
        
        hubDetails.push({displayText:'Select Hub',value:"0"});
  
        this.state.hubID && this.state.hubID.map((item) => { hubDetails.push({ displayText: item.hubName, value: item.hubId, lat: item.lat, lng: item.lng }) });
        return hubDetails;
    }

    render() {
        var bounds = new this.props.google.maps.LatLngBounds();
        bounds.extend({lat:this.state.lat!=undefined?this.state.lat:28.7041,lng:this.state.lng!=undefined?this.state.lng:77.1025});
        return (
            <div>
                <div className="animated fadeIn">
                    <div className="top-filter">
                        <div className="row" style={{ alignItems: "center", margin: "0" }} >
                            <Col xs={1}>
                                <p style={{  fontSize: "20px", textAlign: 'left', width: '500px' }} > Map Overview {this.state.selectedHubName? "> " + this.state.selectedHubName : ""}</p>
                            </Col>
                            <Col style={{ padding: "0", padding: "0px 0px 0px 910px" }}>
                                <DropDown
                                    className="top-search-input form-control"
                                    Name="hubPlant"
                                    itemSource={this.getHubsItem()}
                                    value={this.state.selectedHubName}
                                    handleChange={(item) => this.handleChangeHub(item)}
                                />
                            </Col>
                        </div>
                    </div>
                </div>
                <div style={{ width: '100%', height: '50%', float: 'left', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ height: '500px' }} className="ag-theme-material">
                        <Map
                            className="map"
                            google={this.props.google}
                            style={{ width: "84%", height: "100%", border: "1px solid #3333336e" }}
                            zoom={14}
                            zoomControl= {true}
                            zoomControlOptions = {{ position: this.props.google.maps.ControlPosition.LEFT_BOTTOM}}
                            initialCenter={{
                                lat: this.state.lat,
                                lng: this.state.lng
                            }}
                            bounds={bounds}
                        ></Map>
                        <div style={{ marginLeft: '85%' }}>
                            <div>
                                <img style={{ position: "relative", top: "5px" }} id="usersOnMoveIcon" src="/images/user.mdpi-amber.png" /> User on move
                        </div>
                            <div>
                                <img style={{ position: "relative", top: "5px" }} id="usersOnMoveIcon" src="/images/user.mdpi-green.png" />  Users working on Issue

                        </div>
                            <div>
                                <img style={{ position: "relative", top: "5px" }} id="usersOnMoveIcon" src="/images/user.mdpi-red.png" />  Stagnant users

                        </div>
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {

        hubID: state.FieldUserReportReducers.hubID,
        selectedHubID: state.FieldUserReportReducers.selectedHubID,
        latLangDetails: state.FieldUserReportReducers.latLangDetails
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        getAllHub: () => dispatch(getAllHub()),
        getSelectedHubID: () => dispatch(getSelectedHubID()),
        getHubLatLongs : (hubID) => dispatch(getHubLatLongs(hubID))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GoogleApiWrapper({
    apiKey: "AIzaSyB5AFlaCZ6yGIrF1Ji_FLluu8Ukqg7PFMQ",
    version: "3.38"
})(Dashboard)));