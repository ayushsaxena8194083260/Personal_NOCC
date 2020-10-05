import React, { Component } from "react";
import Card from 'react-bootstrap/Card';
import MapContainer from "../../../components/dashboard/googleMap";
import GirdDisplayContainer from "../../../containers/HubDashboard/girdDisplayContainer";


class WeatherGeneration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allPlants: this.props.allPlants

        }
    }

    componentDidMount() {
        this.props.getHubDashboardInfo();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ allPlants: nextProps.allPlants });
    }

    render() {
        return (
            <div>
                <Card style={{ height: "621px", maxWidth: "1264px", margin: "auto" }}>
                    <Card.Body style={{ padding: "0" }}>
                        <div style={{ width: "40%", height: "100%", display: "inline-block", padding: "0.5%", borderRight: "1px dashed #3333336e" }}>
                            <MapContainer {...this.state} pageName="HubDashboard" />
                        </div>
                        <div style={{ width: "60%", height: "100%", display: "inline-block", padding: "0.5%", float: "right" }}>
                            <GirdDisplayContainer pageName="HubDashboard" />
                        </div>
                    </Card.Body>
                    <footer className="darkBlueGradient">
                        <span>AFFORDABLE SOLAR POWER FOR GENERATIONS!</span>
                    </footer>
                </Card>
            </div>
        )
    }
}

export default WeatherGeneration;