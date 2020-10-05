import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import '../../styles/Dashboard.scss';
import WeatherGeneration from "../../containers/dashboard/weatherGenerationContainer";
import QuarterGeneration from "../../containers/dashboard/QuarterGenerationContainer";
import INRRevenue from "./Pages/inrRevenue";
import USDRevenue from "./Pages/usdRevenue";
import YearlyGeneration from "./Pages/yearlyGeneration";
import PlantAvailability from "./Pages/plantAvailability";
import GridAvailability from "./Pages/gridAvailability";
import Quarter from "./Pages/quarter";
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { getAllGraphNameByPageID } from '../../actions/action-diagnosis';
import { getPlantByProjectId } from "../../actions/PlantFaultDataActions";
import { getAllPlants } from "../../actions/PlantActions";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      allGraphNames: this.props.allGraphNames
    }
  }

  componentDidMount() {
    this.props.getAllGraphNameByPageID();
    this.props.getPlantByProjectId();
    this.props.getAllPlants();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== null) {
      this.setState({
        allGraphNames: nextProps.allGraphNames,
      })
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
    if (this.state.currentIndex === 7) {
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
          {this.state.currentIndex === 1 && <QuarterGeneration pageContent={{graphIDs: [],  graphNames: this.state.allGraphNames }}  />}
          {this.state.currentIndex === 2 && <INRRevenue pageContent={{graphIDs: [],  graphNames: this.state.allGraphNames}} />}
          {this.state.currentIndex === 3 && <USDRevenue pageContent={{graphIDs: [],  graphNames: this.state.allGraphNames}} />}
          {this.state.currentIndex === 4 && <YearlyGeneration pageContent={{graphIDs: [],  graphNames: this.state.allGraphNames}} />}
          {this.state.currentIndex === 5 && <Quarter pageContent={{graphIDs: [],  graphNames: this.state.allGraphNames}} />} 
          {this.state.currentIndex === 6 && <PlantAvailability pageContent={{graphIDs: [],  graphNames: this.state.allGraphNames}} />}
          {this.state.currentIndex === 7 && <GridAvailability pageContent={{graphIDs: [],  graphNames: this.state.allGraphNames}} />}         
        </div>
      </div> 
    )
  }
}
// export default GoogleApiWrapper({
//   apiKey: "AIzaSyB5AFlaCZ6yGIrF1Ji_FLluu8Ukqg7PFMQ"
// })(Dashboard)

//export default Dashboard;
const mapStateToProps = state => {
  return {
    allGraphNames: state.diagnosisReducer.allGraphNames
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllGraphNameByPageID: () => dispatch(getAllGraphNameByPageID(1)),
    getPlantByProjectId: () => dispatch(getPlantByProjectId(15)),
    getAllPlants: () => dispatch(getAllPlants())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));