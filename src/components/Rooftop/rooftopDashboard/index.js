import React, { Component } from 'react';
import '../../../styles/Dashboard.scss';
import TotalInverterGeneration from '../../Diagnosis/Pages/totalInverterGeneration';
import PowerImported from '../../Diagnosis/Pages/powerImported';
import InsolutionCurve from '../../Diagnosis/Pages/insolutionCurve';
import AlertPorfolia from './Pages/alertPortfolio';
import PorfoliaDTD from './Pages/portfolioDTD';
import YtdAlerts from './Pages/YtdAlerts';

class RooftopDashboard extends Component{
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
            <div>
            <nav class="da-arrows">
                    <span className="da-arrows-prev"  onClick={()=>this.goToPrevSlide()}></span>
                    <span className="da-arrows-next"  onClick={()=>this.goToNextSlide()}></span>
            </nav>
            <nav className="da-dots">
              <span className={(this.state.currentIndex === 0 ? 'da-dots-current' : '')}></span>
              <span className={(this.state.currentIndex === 1 ? 'da-dots-current' : '')}></span>
              <span className={(this.state.currentIndex === 2 ? 'da-dots-current' : '')}></span>
            </nav>
              {this.state.currentIndex === 0 && <PorfoliaDTD />}
              {this.state.currentIndex === 1 && <AlertPorfolia />}
              {this.state.currentIndex === 2 && <YtdAlerts />} 
            </div>
        )
      }
    }
    export default RooftopDashboard;