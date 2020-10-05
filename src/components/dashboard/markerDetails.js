import React, { Component } from "react";
// import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
// import data from './data'

class MarkerDetails extends Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <div>
                {console.log(this.props)}

                {this.props.pageName !== "HubDashboard" && <div className="gm-style-iw-d" style={{ overflow: 'scroll', width: '342px', height: '292px' }}>
                    <div>
                        <div className="mapDetailBox">
                            <div className="mapDetThumb">
                                <img src={this.props.photoUrl? this.props.photoUrl:<img alt="no_image" src="https://nocc.azurepower.com/images/noImage.jpg"/>} alt="img" />
                            </div>
                            <table cellSpacing="3" cellPadding="0" className="mapAddSec">
                                <tbody>
                                    <tr>
                                        <td><b>Name :</b></td>
                                        <td>&nbsp;{this.props.plantName}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Location:</b></td>
                                        <td>&nbsp;{this.props.location}</td>
                                    </tr>
                                    <tr>
                                        <td><b>PPA Tariff (INR) :</b></td>
                                        <td>&nbsp;{this.props.Tariff}</td>
                                    </tr>
                                    <tr>
                                        <td><b>COD :</b></td>
                                        <td>&nbsp;{this.props.commissioningDate}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Project Life (Year) :</b></td>
                                        <td>&nbsp;{this.props.projectLife}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Capacity (kW) :</b></td>
                                        <td>&nbsp;{this.props.inverterCapacity}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Plant Area (Acres) :</b></td>
                                        <td>&nbsp;{this.props.areaPlantAcres}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Lat/Long :</b></td>
                                        <td>&nbsp;{this.props.lat}, {this.props.lon}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="3">
                                            {/* <a href="/analytics">Detail</a> */}
                                            
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>}
                <div className="gm-style-iw-d" style={{ overflow: 'scroll', width: '200px', height: '50px' }}>
                    {this.props.pageName === "HubDashboard" && <div className="mapDetailBox">
                        <div className="mapDetThumb">
                            <div> Name : {this.props.plantName}</div> 
                        </div>
                    </div>}
                </div>
            </div>

        )
    }
}

export default MarkerDetails;