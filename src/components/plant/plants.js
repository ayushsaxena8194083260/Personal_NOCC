import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Navbar from 'react-bootstrap/Navbar';
// import Nav from 'react-bootstrap/Nav'
// import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
// import logo from './logo.png';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import '../../App.scss';
// import Layout from "../../layout";
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
import {
  Route,
  NavLink,
  Switch,
  Redirect,
  HashRouter
} from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import PlantComponent from "./plant";
import PlantAddEditComponent from "./plantAddEdit";
import PenaltyEdit from "./penaltyEdit";
import PlantDetailsComponent from "./plantDetails";
import PlantHistoryComponent from "./plantHistory";
import PlantFaultDataContainer from "../../containers/PlantFaultDataContainer";
import taskStatisticsContainer from "../../containers/taskStatisticsContainer";
import PlantFaultDataAddEditContainer from "../../containers/PlantFaultDataAddEditContainer";
import GridFailureContainer from "../../containers/GridFailureContainer";
import GridFailureAddEditContainer from "../../containers/GridFailureAddEditContainer";
import WeatherStationContainer from "../../containers/WeatherStationContainer";
import WeatherStationAddEditContainer from "../../containers/WeatherStationAddEditContainer";
import InverterDailyContainer from '../../containers/InverterDailyContainer';
import InverterDailyAddEditContainer from '../../containers/InverterDailyAddEditContainer';
import ModuleCleaningContainer from '../../containers/ModuleCleaningContainer';
import ModuleCleaningAddEditContainer from '../../containers/ModuleCleaningAddEditContainer';
import VendorComponent from "../vendor/vendor";
import VendorAddEditComponent from "../vendor/vendorAddEdit";
import LenderDetailsContainer from "../../containers/LenderDetailsContainer";
import PlantFaultIncidentComponent from "./plantFaultIncident";
import JmrMeterContainer from '../../containers/jmrMeterContainer';
import AddEditJmrComponent from '../jmrMeter/jmrMeterAdd';
import AddEditTiltComponent from './addEditTilt';
import ModuleCleaningAnalysis from '../moduleCleaningAnalysis/moduleCleaningAnalysis';
import TiltSchedule from './tiltSchedule';
import PenaltyData from '../../containers/penaltyContainer';
import addEditPenaltyColour from './addEditPenaltyColour';
import PenaltyDataUpload from './penaltyDataUpload';
import AddPenaltyData from './addPenaltyData';
import MfmReadingContainer from '../../containers/mfmReadingContainer';
import uploadAzureLossCSV from '../azureLoss/uploadAzureLossCSV';
import AddEditAzureLossComponent from '../azureLoss/addAzureLoss';
import CheckMissingDataForInverter from '../../containers/checkMissingDataForInverterContainer';
import CheckMissingDataForWeather from '../../containers/checkMissingDataForWeatherContainer';
import PerformanceLoss from '../../containers/PerformanceLossContainer';
import ExternalBudget from '../../containers/ExternalBudgetContainer';
import ExternalBudgetEdit from '../ExternalBudget/editExternalBudget';
import uploadExternalBudget from '../ExternalBudget/uploadExternalBudget';
import WaterConsumption from '../../containers/WaterConsumptionContainer';
// import InventerDaily from '../InverterDaily/inverterDaily';
import StringMonitoring from '../StringMonitoring/stringMonitoring';
import AddEditSMUComponent from '../StringMonitoring/stringMonitoringAddEdit';
import PlantTiltScheduleData from './plantTiltScheduleData';
import PlantTiltScheduleAddEdit from './plantTiltScheduleDataAddEdit';
import AzureLoss from '../../containers/AzureLossContainer';
import amrMeter from '../../containers/amrMeterContainers'
import AopBudgetDetailsContainer from '../../containers/AOPBudgetDetailsContainer';
import UploadAopBudgetDetail from '../AopBudgetDetail/UploadAopBudgetDetail';
import addEditAopBudgetDetail from '../AopBudgetDetail/addEditAopBudgetDetail';
import BudgetDetailsContainer from '../../containers/budgetDetailsContainer';
import UploadBudgetDetails from '../BudgetDetails/UploadBudgetDetails';
import AddEditBudgetDetail from '../BudgetDetails/AddEditBudgetDetails';
import PreventiveMaintainance from '../PreventiveMaintainanceGrids/preventiveMaintainance';
import DeletePlant from './deletePlant';
//import MissingInverterDetails from '../missingInverter/missingInverterDetails';
import MissingInverterDetails from '../../containers/missingInverterDetails';
import MissingInverterUpload from '../missingInverter/missingInverterUpload';
import MissingWeatherDetails from '../../containers/missingWeatherContainer';
import missingWeatherDetails from '../../components/missingWeather/missingWeatherDetails';
import missingInverterDetails from '../../components/missingInverter/missingInverterDetails';
import MissingWeatherUpload from '../missingWeather/missingWeatherUpload';
import addEditlenderdetails from '../lenderDetails/addEditlenderdetails';
import ModuleCleaningUpload from '../moduleCleaningAnalysis/moduleCleaningUpload';
// import PlantGeneration from '../../containers/plantgenerationContainer';
import MonthlyGeneration from '../PlantActualGeneration/MonthlyGeneration';
import MfmDailyReport from '../PlantActualGeneration/MFMDailyReport';
import AmrDailyGeneration from '../PlantActualGeneration/AmrDailyGeneration';
import PlantGenerationContainer from '../../containers/plantgenerationContainer';
import Graph from '../Setting/Pages/Graph/index';
import SinglePage from './DownloadPdf';
import DailyPdfDownload from '../PreventiveMaintainanceGrids/DailyPdfDownload'
import performanceLossEdit from './performanceLossEdit';
class PlantsComponent extends Component {
  constructor() {
    super();
    this.state = {
      showsubMenu: false,
    }
  }
  actualSubmenuShowHandler = () => {
    this.setState({
      showSubmenu: true
    });
    console.log(this.state.showSubmenu);
  }
  actualSubmenuHideHandler = () => {
    this.setState({
      showSubmenu: false
    });
    console.log(this.state.showSubmenu);

  }
  componentDidMount() {
    // console.log(this.props.match)
  }
  render() {
    const { match } = this.props;
    return (
      // <HashRouter>
      <div>
        <div className="animated fadeIn head-design">
          <Card>
            <Card.Body>
              <div className="main-content">
                <Nav variant='tabs' defaultActiveKey="/">
                  <div className="subLink">
                    <NavLink className="link-tab" exact onMouseEnter={this.actualSubmenuShowHandler}
                      onMouseLeave={this.actualSubmenuHideHandler} to={`${match.url}PlantGeneration`}>Plant Actual Generation</NavLink>
                    <div className="showsubMenu" style={{ left: "0", top: '34px' }}>
                      {console.log(match.url)}
                      <NavLink className="subLink-tab" exact to={`${match.url}PlantGeneration`}>Daily Generation</NavLink>
                      <NavLink className="subLink-tab" exact to={`${match.url}MonthlyGeneration`}>Monthly Generation</NavLink>
                      <NavLink className="subLink-tab" exact to={`${match.url}MfmDailyReport`}>MFM Daily Generation</NavLink>
                      <NavLink className="subLink-tab" exact to={`${match.url}AmrDailyGeneration`}>AMR Daily Generation</NavLink>

                    </div>
                  </div>
                  <NavLink className="link-tab" exact to={`${match.url}PlantFaultData`} activeClassName="active" >Plant Fault Data</NavLink>
                  <NavLink className="link-tab" exact to={`${match.url}gridFailure`}>Grid Failure</NavLink>
                  <NavLink className="link-tab" exact to={`${match.url}weatherStationDailyData`}>Weather Station Daily Data</NavLink>
                  <NavLink className="link-tab" exact to={`${match.url}inverterDaily`}>Inverter Daily Data</NavLink>
                  <NavLink className="link-tab" exact to={`${match.url}moduleCleaning`}>Module Cleaning Data</NavLink>
                  <NavLink className="link-tab" exact to={`${match.url}jmrMeter`}>JMR Meter</NavLink>
                  <NavLink className="link-tab" exact to={`${match.url}moduleCleaningAnalysis`}>Module Cleaning Analysis</NavLink>
                  <NavLink className="link-tab" exact to={`${match.url}combinedData`}>Combiner Data</NavLink>
                  <NavLink className="link-tab" exact to={`${match.url}plant`}>Plant</NavLink>
                  <NavLink className="link-tab" exact to={`${match.url}stringMonitoring`}>String Monitoring</NavLink>
                  <NavLink className="link-tab" exact to={`${match.url}vendor`}>Vendor List</NavLink>
                  <NavLink className="link-tab" exact to={`${match.url}azureLoss`}>Azure Loss</NavLink>
                  <NavLink className="link-tab" exact to={`${match.url}checkMissingDataForWeather`}>Check Missing Data For Weather</NavLink>
                  <NavLink className="link-tab" exact to={`${match.url}checkMissingDataForInverter`}>Check Missing Data For Inverter</NavLink>
                  <NavLink className="link-tab" exact to={`${match.url}lenderDetails`}>Lender Details</NavLink>
                  <NavLink className="link-tab" exact to={`${match.url}AopBudgetDetail`}>AOP Budget Details</NavLink>
                  <NavLink className="link-tab" exact to={`${match.url}budgetDetail`}>Budget Details</NavLink>
                  <NavLink className="link-tab" exact to={`${match.url}tiltSchedule`}>Tilt Schedule</NavLink>
                  <NavLink className="link-tab" exact to={`${match.url}plantTiltScheduleData`}>Tilt Schedule Data</NavLink>
                  <NavLink className="link-tab" exact to={`${match.url}PreventiveMaintainance`}>Preventive Maintenance</NavLink>
                  <NavLink className="link-tab" exact to={`${match.url}AlertStatistics`}>Alert Statistics</NavLink>
                  <NavLink className="link-tab" exact to={`${match.url}TaskStatistics`}>Task Statistics</NavLink>
                  <NavLink className="link-tab" exact to={`${match.url}AlertDetails`}>Alert Details</NavLink>
                  <NavLink className="link-tab" exact to={`${match.url}waterConsumption`}>Water Consumption</NavLink>
                  <NavLink className="link-tab" exact to={`${match.url}performanceLoss`}>Performance Loss</NavLink>
                  <NavLink className="link-tab" exact to={`${match.url}externalBudget`}>External Budget</NavLink>
                  <NavLink className="link-tab" exact to={`${match.url}penaltyData`}>Penelty</NavLink>
                  <NavLink className="link-tab" exact to={`${match.url}amrMeter`}>AMR Meter</NavLink>
                  <NavLink className="link-tab" exact to={`${match.url}mfmReading`}>MFM Reading</NavLink>
                </Nav>
                <div className="main-content">
                  <Switch>
                    <Route exact path={`${match.path}`} component={PlantComponent} />
                    <Route exact path={`${match.path}plant`} component={PlantComponent} />
                    <Route exact path={`${match.path}PlantGeneration`} component={PlantGenerationContainer} />
                    <Route exact path={`${match.path}plantFaultData`} component={PlantFaultDataContainer} />
                    <Route exact path={`${match.path}TaskStatistics`} component={taskStatisticsContainer} />
                    <Route exact path={`${match.path}plantAddEdit`} component={PlantAddEditComponent} />
                    <Route exact path={`${match.path}plantDetails`} component={PlantDetailsComponent} />
                    <Route exact path={`${match.path}plantHistory`} component={PlantHistoryComponent} />
                    <Route exact path={`${match.path}plantFaultDataAddEdit`} component={PlantFaultDataAddEditContainer} />
                    <Route exact path={`${match.path}vendor`} component={VendorComponent} />
                    <Route exact path={`${match.path}vendorAddEdit`} component={VendorAddEditComponent} />
                    <Route exact path={`${match.path}plantFaultIncident`} component={PlantFaultIncidentComponent} />
                    <Route exact path={`${match.path}gridFailure`} component={GridFailureContainer} />
                    <Route exact path={`${match.path}gridFailureAddEdit`} component={GridFailureAddEditContainer} />
                    <Route exact path={`${match.path}jmrMeter`} component={JmrMeterContainer} />
                    <Route exact path={`${match.path}jmrMeterAdd`} component={AddEditJmrComponent} />
                    <Route exact path={`${match.path}moduleCleaningAnalysis`} component={ModuleCleaningAnalysis} />
                    <Route exact path={`${match.path}addEditTilt`} component={AddEditTiltComponent} />
                    <Route exact path={`${match.path}penaltyDataUpload`} component={PenaltyDataUpload} />
                    <Route exact path={`${match.path}addEditPenaltyColour`} component={addEditPenaltyColour} />
                    <Route exact path={`${match.path}penaltyData`} component={PenaltyData} />
                    <Route exact path={`${match.path}addPenaltyData`} component={AddPenaltyData} />
                    <Route exact path={`${match.path}penaltyEdit`} component={PenaltyEdit} />
                    <Route exact path={`${match.path}tiltSchedule`} component={TiltSchedule} />
                    <Route exact path={`${match.path}plantTiltScheduleDataAddEdit`} component={PlantTiltScheduleAddEdit} />
                    <Route exact path={`${match.path}plantTiltScheduleData`} component={PlantTiltScheduleData} />
                    <Route exact path={`${match.path}azureLoss`} component={AzureLoss} />
                    <Route exact path={`${match.path}MonthlyGeneration`} component={MonthlyGeneration} />
                    <Route exact path={`${match.path}mfmReading`} component={MfmReadingContainer} />
                    <Route exact path={`${match.path}uploadAzureLossCSV`} component={uploadAzureLossCSV} />
                    <Route exact path={`${match.path}addAzureLoss`} component={AddEditAzureLossComponent} />
                    <Route exact path={`${match.path}checkMissingDataForInverter`} component={CheckMissingDataForInverter} />
                    <Route exact path={`${match.path}checkMissingDataForWeather`} component={CheckMissingDataForWeather} />
                    <Route exact path={`${match.path}performanceLoss`} component={PerformanceLoss} />
                    <Route exact path={`${match.path}waterConsumption`} component={WaterConsumption} />
                    <Route exact path={`${match.path}amrMeter`} component={amrMeter} />
                    <Route exact path={`${match.path}externalBudget`} component={ExternalBudget} />
                    <Route exact path={`${match.path}uploadExternalBudget`} component={uploadExternalBudget} />
                    <Route exact path={`${match.path}weatherStationDailyData`} component={WeatherStationContainer} />
                    <Route exact path={`${match.path}WeatherStationAddEdit`} component={WeatherStationAddEditContainer} />
                    <Route exact path={`${match.path}inverterDaily`} component={InverterDailyContainer} />
                    <Route exact path={`${match.path}inverterDailyAddEdit`} component={InverterDailyAddEditContainer} />
                    <Route exact path={`${match.path}moduleCleaning`} component={ModuleCleaningContainer} />
                    <Route exact path={`${match.path}moduleCleaningAddEdit`} component={ModuleCleaningAddEditContainer} />
                    <Route exact path={`${match.path}stringMonitoring`} component={StringMonitoring} />
                    <Route exact path={`${match.path}addEditSMUComponent`} component={AddEditSMUComponent} />
                    <Route exact path={`${match.path}AopBudgetDetail`} component={AopBudgetDetailsContainer} />
                    <Route exact path={`${match.path}UploadAopBudgetDetail`} component={UploadAopBudgetDetail} />
                    <Route exact path={`${match.path}addEditAopBudgetDetail`} component={addEditAopBudgetDetail} />
                    <Route exact path={`${match.path}budgetDetail`} component={BudgetDetailsContainer} />
                    <Route exact path={`${match.path}UploadBudgetDetail`} component={UploadBudgetDetails} />
                    <Route exact path={`${match.path}AddEditBudgetDetail`} component={AddEditBudgetDetail} />
                    <Route exact path={`${match.path}PreventiveMaintainance`} component={PreventiveMaintainance} />
                    <Route exact path={`${match.path}deletePlant`} component={DeletePlant} />
                    <Route exact path={`${match.path}missingInverterDetails`} component={MissingInverterDetails} />
                    <Route exact path={`${match.path}missingUpload`} component={MissingInverterUpload} />
                    <Route exact path={`${match.path}missingWeatherDetails`} component={MissingWeatherDetails} />
                    <Route exact path={`${match.path}missingWethUpload`} component={MissingWeatherUpload} />
                    <Route exact path={`${match.path}lenderDetails`} component={LenderDetailsContainer} />
                    <Route exact path={`${match.path}addEditlenderdetails`} component={addEditlenderdetails} />
                    <Route exact path={`${match.path}moduleCleaningUpload`} component={ModuleCleaningUpload} />
                    <Route exact path={`${match.path}editExternalBudget`} component={ExternalBudgetEdit} />
                    <Route exact path={`${match.path}MfmDailyReport`} component={MfmDailyReport} />
                    <Route exact path={`${match.path}AmrDailyGeneration`} component={AmrDailyGeneration} />
                    <Route exact path={`${match.path}pdfDownload`} component={SinglePage} />
                    <Route exact path={`${match.path}dailyPdfDownload`} component={DailyPdfDownload} />
                    <Route exact path={`${match.path}setting`} component={Graph} />
                    <Route exact path={`${match.path}performanceLossEdit`} component={performanceLossEdit} />
                    <Route exact path={`${match.path}missingWeatherDetails`} component={missingWeatherDetails} />
                    <Route exact path={`${match.path}missingInverterDetails`} component={missingInverterDetails} />
                    <Route component={PlantComponent} />
                    <Redirect to="/" />
                  </Switch>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
      // </HashRouter>

    );
  }
}
export default PlantsComponent;