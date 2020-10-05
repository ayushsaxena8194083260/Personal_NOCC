import React, { Component } from 'react';
import '../../../styles/Dashboard.scss';
import InverterToday from './Pages/PageOne';
import PageTwo from './Pages/PageTwo';
import PageThree from './Pages/PageThree';
import PageFour from './Pages/PageFour';
import PageFive from './Pages/PageFive';
import PageSix from './Pages/PageSix';
import PageSeven from './Pages/PageSeven';
import PageEight from './Pages/PageEight';
import PageNine from './Pages/PageNine';
import PageTen from './Pages/PageTen';
import PageEleven from './Pages/PageEleven';
import PageTwelve from './Pages/PageTwelve';
import PageThirteen from './Pages/PageThirteen';
import PageFourteen from './Pages/PageFourteen';
import PageFifteen from './Pages/PageFifteen';
import PageSixteen from './Pages/PageSixteen';
import PageSeventeen from './Pages/PageSeventeen';
import PageEighteen from './Pages/PageEighteen';
import PageNinteen from './Pages/PageNinteen';

class RooftopSubComponent extends Component{
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
        if (this.state.currentIndex === 18) {
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
              <span className={(this.state.currentIndex === 9 ? 'da-dots-current' : '')}></span>
              <span className={(this.state.currentIndex === 10 ? 'da-dots-current' : '')}></span>
              <span className={(this.state.currentIndex === 11 ? 'da-dots-current' : '')}></span>
              <span className={(this.state.currentIndex === 12 ? 'da-dots-current' : '')}></span>
              <span className={(this.state.currentIndex === 13 ? 'da-dots-current' : '')}></span>
              <span className={(this.state.currentIndex === 14 ? 'da-dots-current' : '')}></span>
              <span className={(this.state.currentIndex === 15 ? 'da-dots-current' : '')}></span>
              <span className={(this.state.currentIndex === 16 ? 'da-dots-current' : '')}></span>
              <span className={(this.state.currentIndex === 17 ? 'da-dots-current' : '')}></span>
            </nav>
              {this.state.currentIndex === 0  && <InverterToday/>}
              {this.state.currentIndex === 1  && <PageTwo/>}
              {this.state.currentIndex === 2  && <PageThree/>} 
              {this.state.currentIndex === 3  && <PageFour/>}
              {this.state.currentIndex === 4  && <PageFive/>}
              {this.state.currentIndex === 5  && <PageSix/>}
              {this.state.currentIndex === 6  && <PageSeven/>}
              {this.state.currentIndex === 7  && <PageEight/>} 
              {this.state.currentIndex === 8  && <PageNine/>}
              {this.state.currentIndex === 9  && <PageTen/>}
              {this.state.currentIndex === 10 && <PageEleven/>}
              {this.state.currentIndex === 11 && <PageTwelve/>}
              {this.state.currentIndex === 12 && <PageThirteen/>}
              {this.state.currentIndex === 13 && <PageFourteen/>}
              {this.state.currentIndex === 14 && <PageFifteen/>}
              {this.state.currentIndex === 15 && <PageSixteen/>}
              {this.state.currentIndex === 16 && <PageSeventeen/>}
              {this.state.currentIndex === 17 && <PageEighteen/>}
            </div>         
          </div>
        )
      }
    }
    export default RooftopSubComponent;