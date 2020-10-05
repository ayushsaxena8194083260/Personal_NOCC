import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import '../../styles/Dashboard.scss'
//import WeatherGeneration from "../dashboard/Pages/weatherGeneration";

// import WeatherGeneration from "../../containers/dashboard/weatherGenerationContainer";
import WeatherGeneration from "../../containers/HubDashboard/weatherGenerationContainer";
import PortfolioHUB from "./Pages/PortfolioHUB";
import YTDAlertsHubwiseRooftop from "./Pages/YTDAlertsHubwiseRooftop";


 
class HubDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0
        }
    }

    goToPrevSlide() {
        if (this.state.currentIndex === 0) {
            return;
        }
        this.setState({ currentIndex: this.state.currentIndex - 1 });
    }

    goToNextSlide() {
        let index = this.state.currentIndex + 1;
        if (this.state.currentIndex === 2) {
            index = 0;
        }

        this.setState({ currentIndex: index });
    }

    render() {

        return (
            <div className="slider">
                <div className="slider-wrapper">
                    <nav class="da-arrows">
                        <span className="da-arrows-prev" onClick={() => this.goToPrevSlide()}></span>
                        <span className="da-arrows-next" onClick={() => this.goToNextSlide()}></span>
                    </nav>
                    {this.state.currentIndex === 0 && <WeatherGeneration />}                   
                    {this.state.currentIndex === 1 && <PortfolioHUB />}
                    {this.state.currentIndex === 2 && <YTDAlertsHubwiseRooftop />}                    
                </div>
            </div>
        )
    }
}
export default GoogleApiWrapper({
    apiKey: "AIzaSyB5AFlaCZ6yGIrF1Ji_FLluu8Ukqg7PFMQ"
})(HubDashboard)
