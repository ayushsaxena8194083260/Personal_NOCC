import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
//import data from './data';
import MarkerDetails from "./markerDetails";

//http://api.openweathermap.org/data/2.5/weather?lat=40.863372&lon=-74.113181&units=imperial&APPID=e9b433f7ed306860db69ea25723a5f48
export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeMarker: {},
            selectedPlace: {},
            showingInfoWindow: false,
            plants: this.props.allPlants
        };
        console.log(this.state.plants,'dddd')
    
    
    
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ plants: nextProps.allPlants });
    }


    onMarkerClick = (props, marker) =>
        this.setState({
            activeMarker: marker,
            selectedPlace: props,
            showingInfoWindow: true
        });

    onInfoWindowClose = () =>
        this.setState({
            activeMarker: null,
            showingInfoWindow: false
        });

    onMapClicked = () => {
        if (this.state.showingInfoWindow)
            this.setState({
                activeMarker: null,
                showingInfoWindow: false
            });
    };

    getMapMarkers() {
        const _content = this.state.plants && this.state.plants.length > 0 && this.state.plants.map((plant, index) => {
            let iconurl = {};
            if (plant.plantDashboardStatus === 1) {
                iconurl = { url: "/images/pin-green.png" };
            }
            else if (plant.plantDashboardStatus === 2) {
                iconurl = { url: "/images/pin-yellow.png" };
            }
            else if (plant.plantDashboardStatus === 3) {
                iconurl = { url: "/images/pin-orange.png" };
            }
            else if (plant.plantDashboardStatus === 4) {
                iconurl = { url: "/images/pin-red.png" };
            }
            else {
                if (plant.insolation !== "0" && plant.inverterEntries === "0") {
                    iconurl = { url: "/images/pin-red.png" };
                } else {
                    if (plant.insolation !== 0) {
                        if (plant.total_model_no_inverter !== plant.totalInvt) {
                            iconurl = { url: "/images/pin-orange.png" };
                        } else {
                            if (plant.total_model_no_inverter === plant.totalInvt) {
                                iconurl = { url: "/images/pin-green.png" };
                            }
                        }
                    } else {
                        iconurl = { url: "/images/pin-yellow.png" };
                    }
                }
                // if (plant.plant_dashboard_status !== "0") {
                //     iconurl = "/images/pin-red.png";
                // }
            }





            return <Marker
                key={plant.plantId}
                title={plant.plantName}
                name={plant.plantName}
                onClick={this.onMarkerClick}
                icon={iconurl}
                position={{ lat: plant.lat, lng: plant.lon }}
                details={plant}
                pageName={this.props.pageName}
            />
        })

        return _content;
    }

    render() {
        if (!this.props.loaded) return <div>Loading...</div>;

        return (
            
       <Map
                className="map"
                google={this.props.google}
                onClick={this.onMapClicked}
                // style={{ width: "39%", height: "90%", border: "1px solid #3333336e" }}
                zoom={4}
                initialCenter={{
                    lat: 28.7041,
                    lng: 77.1025
                }}

            >
                {this.state.plants && this.state.plants.length > 0 && this.getMapMarkers()}
                {this.state.plants && this.state.plants.length > 0 && <InfoWindow
                    marker={this.state.activeMarker}
                    onClose={this.onInfoWindowClose}
                    visible={this.state.showingInfoWindow}
                >
                    {this.state.activeMarker && this.state.activeMarker.details && <MarkerDetails {...this.state.activeMarker.details} pageName={this.props.pageName}/>}
                </InfoWindow>}
            </Map>
       
        
      );
    }
}
export default GoogleApiWrapper({
    apiKey: "AIzaSyB5AFlaCZ6yGIrF1Ji_FLluu8Ukqg7PFMQ",
    version: "3.38"
})(MapContainer);
