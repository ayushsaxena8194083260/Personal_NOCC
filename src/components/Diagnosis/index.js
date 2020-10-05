import React, { Component } from 'react';
import '../../styles/Dashboard.scss';
import TotalInverterGeneration from './Pages/totalInverterGeneration';
import PowerImported from './Pages/powerImported';
import InsolutionCurve from './Pages/insolutionCurve';
import Iptps from './Pages/iptps';
import Jaisalmer from './Pages/Jaisalmer';
import InsolutionCurveJCBL from './Pages/insolutionCurveJCBL';
import IndosoalrNodia from './Pages/IndosoalrNodia';
import InverterToday from './Pages/inverterDaily';
import PunjabCurve from './Pages/PunjabCurve';

class DiagnosisComponent extends Component{
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
        if (this.state.currentIndex === 8) {
          index = 0;
        }
    
        this.setState({ currentIndex: index });
      }
    
      render() {
    
        return (
          <div className="slider">
         
            <div className="slider-wrapper">
            <nav className="da-arrows">
                    <span className="da-arrows-prev"  onClick={()=>this.goToPrevSlide()}></span>
                    <span className="da-arrows-next"  onClick={()=>this.goToNextSlide()}></span>
            </nav>
            <nav className="da-dots">
              <span className={(this.state.currentIndex === 0 ? 'da-dots-current' : '')}></span>
              <span className={(this.state.currentIndex === 1 ? 'da-dots-current' : '')}></span>
              <span className={(this.state.currentIndex === 2 ? 'da-dots-current' : '')}></span>
              <span className={(this.state.currentIndex === 3 ? 'da-dots-current' : '')}></span>
              <span className={(this.state.currentIndex === 4 ? 'da-dots-current' : '')}></span>
              <span className={(this.state.currentIndex === 5 ? 'da-dots-current' : '')}></span>
              <span className={(this.state.currentIndex === 6 ? 'da-dots-current' : '')}></span>
              <span className={(this.state.currentIndex === 7 ? 'da-dots-current' : '')}></span>
              <span className={(this.state.currentIndex === 8 ? 'da-dots-current' : '')}></span>
            </nav>
              {this.state.currentIndex === 0 && <TotalInverterGeneration />}
              {this.state.currentIndex === 1 && <PowerImported />}
              {this.state.currentIndex === 2 && <InsolutionCurve />}
              {this.state.currentIndex === 3 && <Iptps />}
              {this.state.currentIndex === 4 && <Jaisalmer />}
              {this.state.currentIndex === 5 && <InsolutionCurveJCBL />}
              {this.state.currentIndex === 6 && <IndosoalrNodia />}
              {this.state.currentIndex === 7 && <InverterToday />}
              {this.state.currentIndex === 8 && <PunjabCurve />}

            </div>
            
          </div>
        )
      }
    }
    export default DiagnosisComponent;