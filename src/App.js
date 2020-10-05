import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import './App.scss';
import Layout from "./layout";
import PlantPower from './components/Forecasting/Plant-power';
import PlantsComponent from './components/plant/plants';
import Dashboard from "./components/dashboard";
import {Route,Switch,Redirect,HashRouter} from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import ReportComponent from './components/Report';
import PerformanceAnalysisContainer from './containers/performanceAnalysisContainer';
import AnalyticsComponent from './components/Analytics';
import DiagnosisComponent from './components/Diagnosis';
import RooftopComponent from './components/Rooftop';
import PrRequestComponent from './components/PrRequest/prRequest';
import FieldUserReportComponent from './components/FieldUserReport';
import SettingComponent from './components/Setting';
import HubDashboard from "./components/HubDashboard";
import AlertStatisticsByHub from './components/HubDashboard/AlertStatisticsByHub';
import MissingWeatherDetails from './components/missingWeather/missingWeatherDetails';
import MissingInverterDetails from './components/missingInverter/missingInverterDetails';
import HubPlantDetails from './components/HubDashboard/hubDisplayPlant'
import ForecastComponent from './components/Forcast';
import LoginComponent from './containers/login';
import { connect } from 'react-redux';
import { authCheckState } from './actions/login';
import Graph from "./components/dashboard/Pages/graph";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      showSubmenu:false,
      showmenu:''
    }
  }
  componentDidMount(){
    this.props.onTryAutoSignup();
  }
render() {
  let routes = (
    <Switch>
      <Route exact path="/login" component={LoginComponent}/>
      <Redirect from="/" to="/login"/>
      <Redirect to="/" />
    </Switch>
  );
  if ( this.props.isAuthenticated ) {
    routes=""
    routes = (
      <Switch>
                <Redirect from="/login" to="/"/>
                <Route exact path = "/"  component={PlantsComponent}/>
                <Route exact path="/plantPower"  component={PlantPower} />
                <Route exact path="/dashboard"  component={Dashboard} />
                <Route exact path="/hubdashboard"  component={HubDashboard} />
                <Route exact path="/report" component={ReportComponent}/>
                <Route exact path="/performanceAnalysis" component={PerformanceAnalysisContainer}/>
                <Route exact path="/analytics" component={AnalyticsComponent}/>
                <Route exact path="/diagnosis" component={DiagnosisComponent}/>
                <Route path="/rooftop" component={RooftopComponent}/>
                {/* <Route exact path="/login" component={LoginComponent}/> */}
                <Route exact path="/forecast" component={ForecastComponent}/>
                <Route exact path="/prRequest" component={PrRequestComponent}/>
                <Route exact path="/setting" component={SettingComponent}/>
                <Route exact path="/fieldUserReport" component={FieldUserReportComponent}/>
                {/* <Route exact path="/missingInverterDetails" component={MissingInverterDetails} />   */}
                <Route path="/hubDisplayPlant" component={HubPlantDetails} /> 
                <Route exact path="/missingUpload" component={PlantsComponent} />                         
                {/* <Route exact path="/missingWeatherDetails" component={MissingWeatherDetails} /> */}
                <Route exact path="/alertStatisticsByHub" component={AlertStatisticsByHub} />        
                <Route path="/setting" component={SettingComponent}/>   
                <Route path="/fieldUserReport" component={FieldUserReportComponent}/>
                <Route path="/report" component={ReportComponent}/>
                <Route path="/forecast" component={ForecastComponent}/>
                <Route path = "/plants/"  component={PlantsComponent}/>
                <Route path = "/graph/"  component={Graph}/>
                <Route path = "/"  component={PlantsComponent}/>
                {/* <Route component={PlantsComponent}/> */}
                <Redirect to = "/"/>    
        </Switch>
    )
  }
  // const handleSelect = eventKey => alert(`selected ${eventKey}`);
  return (
	<BrowserRouter basename="/">
                
    <Layout isAuth={this.props.isAuthenticated}>
        <div className="animated fadeIn">
          {routes}
        </div>
    </Layout>
   
  </BrowserRouter>

    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated:state.loginReducer.isAuthenticated,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(authCheckState() )
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(App);
