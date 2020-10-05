import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
import {
    Route,
    NavLink,
    // NavLink,
    Switch,
    Redirect
} from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import GraphComponent from './Pages/Graph/index';
import GraphGroupComponentAddEdit from '../Setting/Pages/GraphGroup/GraphGroupAddEdit';
import PageGroupComponent from './Pages/PageGroup/index';
import ShowPageComponent from './Pages/Page/index';
import UserComponent from './Pages/UserManagement/index';
import HubDetailsComponent from './Pages/HUB/index';
import ProjectsComponent from './Pages/Projects/index';
import AddEditProject from './Pages/Projects/addEditProject';
import GraphUIComponent from './Pages/UISetting/index'
import AlertUserComponent from './Pages/AlertUser/index';
import MCleaningComponent from './Pages/ModuleCleaning/index';
import ModuleCleaningAlert from './Pages/ModuleCleaning/CleaningAlert';
import GraphGroupComponent from './Pages/GraphGroup/index';
import SqlCreateQryComponent from './Pages/SQLEditor/index';
import SafetyVideoComponent from './Pages/SafetyVideo/SafetyVideo';
import ErrorCodeComponent from './Pages/MasterErrorCode/index';
import AddEditErrorCode from './Pages/MasterErrorCode/AddEditErrorCode';
import AddEditForecastSetting from './Pages/ForecastSetting/AddEditForecastSetting';
import MobileSettingComponent from './Pages/MobileSetting/index';
import AddEditMobileSetting from './Pages/MobileSetting/AddEditMobileSetting';
import ForecastConfigComponent from './Pages/ForecastSetting/index';
import PRUserManagementComponent from './Pages/PRRequestAssignment/index';
import PlantComponent from '../plant/plant';
import AddGraph from './Pages/Graph/addGraph';
import DisplayGraph from './Pages/Graph/displayGraph';
import EditPageGroupdetails from './Pages/PageGroup/editPlantGroup';
import AddEditPagedetails from './Pages/Page/SubPage/addEditPage';
import DashboardPage from './Pages/Page/SubPage/dashboard';
import RoleComponent from './Pages/UserManagement/Role/RoleComponent';
import MappingHub from './Pages/HUB/mappingHub';
import HubComponent from './Pages/HUB/HubComponent';
import ProjectPage from './Pages/Projects/ProjectPlant';
import InverterConfiguration from './Pages/PlantMapping/Pages/InverterConfiguration';
import InverterConfigurationEdit from './Pages/PlantMapping/Pages/AddEdit/InverterConfigurationEdit';
import AddCombinerBox from './Pages/PlantMapping/Pages/AddEdit/AddCombinerBox';
import AddFTPCombinerBoxMapping from './Pages/PlantMapping/Pages/AddEdit/AddFTPCombinerBoxMapping';
import WeatherConfiguration from './Pages/PlantMapping/Pages/WeatherConfiguration';
import InverterCSVMappingEdit from './Pages/PlantMapping/Pages/AddEdit/InverterCSVMappingEdit';
import MFMConfiguration from './Pages/PlantMapping/Pages/MFMConfiguration';
import MFMConfigurationAdd from './Pages/PlantMapping/Pages/AddEdit/MFMConfigurationAdd';
import MFMConfigurationEdit from './Pages/PlantMapping/Pages/AddEdit/MFMConfigurationEdit';
import InverterCSVMapping from './Pages/PlantMapping/Pages/InverterCSVMapping';
import WeatherCSVMapping from './Pages/PlantMapping/Pages/WeatherCSVMapping';
import MfmCSVMapping from './Pages/PlantMapping/Pages/MfmCSVMapping';
import FTPInverterMapping from './Pages/PlantMapping/Pages/FTPInverterMapping';
import FTPWeatherMapping from './Pages/PlantMapping/Pages/FTPWeatherMapping';
import FTPMfmMapping from './Pages/PlantMapping/Pages/FtpMFMMapping';
import WeatherStationDevice from './Pages/PlantMapping/Pages/WeatherStationDevice';
import AlertMapping from './Pages/PlantMapping/Pages/AlertMapping';
import AddEdituser from '../Setting/Pages/UserManagement/User/addEditUser';
import AddEdituserRole from '../Setting/Pages/UserManagement/Role/addEdituserRole';
import AddEditHub from '../Setting/Pages/HUB/addEditHub';
import AddEditCleaningConfig from '../Setting/Pages/ModuleCleaning/AddEditCleaningConfig';
import AddEditCleaningUser from '../Setting/Pages/ModuleCleaning/AddEditCleaningUser';
import WeatherConfigurationEdit from '../Setting/Pages/PlantMapping/Pages/AddEdit/WeatherConfigurationEdit';
import WeatherConfigurationShare from '../Setting/Pages/PlantMapping/Pages/AddEdit/WeatherConfigurationShare';
import FTPInverterMappingEdit from './Pages/PlantMapping/Pages/AddEdit/FTPInverterMappingEdit';
import FTPWeatherMappingEdit from './Pages/PlantMapping/Pages/AddEdit/FTPWeatherMappingEdit';
import WeatherCSVMappingEdit from './Pages/PlantMapping/Pages/AddEdit/WeatherCSVMappingEdit';
import MFMCSVMappingEdit from './Pages/PlantMapping/Pages/AddEdit/MFMCSVMappingEdit';
import FTPMFMMappingEdit from './Pages/PlantMapping/Pages/AddEdit/FTPMFMMappingEdit';
import WeatherStationDeviceEdit from './Pages/PlantMapping/Pages/AddEdit/WeatherStationDeviceEdit';
import AlertMailGeneration from './Pages/AlertMailGeneration/AlertMailGeneration';
import AddEditAlertMailGeneration from './Pages/AlertMailGeneration/AddEditAlertMailGeneration';
import AddUser from './Pages/AlertUser/AddUser';

class SettingComponent extends Component {
    constructor(props) {
        super(props);
        console.log('initial history is: ', JSON.stringify(this.props.history, null, 2))



    }
    render() {
        const { match } = this.props;
        return (
            <div>
                <div className="animated fadeIn">
                    <Card style={{ width: "1264px", margin: "auto" }}>
                        <Card.Body>
                            <div className="main-content">

                                <Nav variant='tabs' defaultActiveKey="/">
                                    <NavLink className="link-tab" exact to={match.url}>Graph</NavLink>
                                    <NavLink className="link-tab" exact to={`${match.url}/PageGroup`}>Page Group</NavLink>
                                    {/* <NavLink className="link-tab" to={`${match.url}/rendering`}>Page</NavLink> */}
                                    <div className="subLink">
                                        <NavLink className="link-tab" to={`${match.url}/ShowPage/1`}>Page</NavLink>
                                        <div className="showsubMenu" style={{ left: "0", top: '34px' }}>
                                            <NavLink className="subLink-tab" to={`${match.url}/ShowPage/1`}>Dashboard</NavLink>
                                            <NavLink className="subLink-tab" to={`${match.url}/ShowPage/2`}>Analytical</NavLink>
                                            <NavLink className="subLink-tab" to={`${match.url}/ShowPage/3`}>NOCC Portal</NavLink>
                                            <NavLink className="subLink-tab" to={`${match.url}/ShowPage/4`}>Diagnosis</NavLink>
                                            <NavLink className="subLink-tab" to={`${match.url}/ShowPage/5`}>Per Kilowatt Inverter Wise Comparition</NavLink>
                                            <NavLink className="subLink-tab" to={`${match.url}/ShowPage/6`}>Dashboard graphs</NavLink>
                                            <NavLink className="subLink-tab" to={`${match.url}/ShowPage/7`}>Rooftop Dashboard</NavLink>
                                            <NavLink className="subLink-tab" to={`${match.url}/ShowPage/8`}>Generation Tracker</NavLink>
                                            <NavLink className="subLink-tab" to={`${match.url}/ShowPage/9`}>Plant Availability</NavLink>
                                            <NavLink className="subLink-tab" to={`${match.url}/ShowPage/10`}>RT Dashboard Page</NavLink>
                                            <NavLink className="subLink-tab" to={`${match.url}/ShowPage/13`}>Grid Availability</NavLink>
                                            <NavLink className="subLink-tab" to={`${match.url}/ShowPage/15`}>Plf Tracker</NavLink>
                                            <NavLink className="subLink-tab" to={`${match.url}/ShowPage/18`}>Generation Comparison</NavLink>
                                            <NavLink className="subLink-tab" to={`${match.url}/ShowPage/17`}>Revenue Comparison</NavLink>
                                            <NavLink className="subLink-tab" to={`${match.url}/ShowPage/19`}>Yearly Comparison</NavLink>

                                        </div>
                                        {/* */}
                                    </div>
                                    <div className="subLink">
                                        <NavLink className="link-tab" to={`${match.url}/UserManagement`}>User Management</NavLink>
                                        <div className="showsubMenu" style={{ left: "0", top: '34px' }}>
                                            <NavLink className="subLink-tab" to={`${match.url}/UserManagement/User`}>User</NavLink>
                                            <NavLink className="subLink-tab" to={`${match.url}/UserManagement/Role`}>Role</NavLink>
                                        </div>
                                    </div>
                                    <NavLink className="link-tab" exact to={`${match.url}/HubDetails`}>Hub</NavLink>
                                    <NavLink className="link-tab" exact to={`${match.url}/Projects`}>Projects</NavLink>
                                    <div className="wrapping-div">
                                        <div className="subLink">
                                            <NavLink className="link-tab" to={`${match.url}/PlantMapping`}>Plant Mapping</NavLink>
                                            <div className="showsubMenu" style={{ left: "0", top: '34px' }}>
                                                <NavLink className="subLink-tab" to={`${match.url}/InverterConfiguration`}>Inverter Configuration</NavLink>
                                                <NavLink className="subLink-tab" to={`${match.url}/WeatherConfiguration`}>Weather Configuration</NavLink>
                                                <NavLink className="subLink-tab" to={`${match.url}/MfmConfiguration`}>MFM Configuration</NavLink>
                                                <NavLink className="subLink-tab" to={`${match.url}/InverterCSVMapping`}>Inverter CSV Mapping</NavLink>
                                                <NavLink className="subLink-tab" to={`${match.url}/WeatherCSVMapping`}>Weather CSV Mapping</NavLink>
                                                <NavLink className="subLink-tab" to={`${match.url}/MfmCSVMapping`}>MFM CSV Mapping</NavLink>
                                                <NavLink className="subLink-tab" to={`${match.url}/FTPInverterMapping`}>FTP Inverter Mapping</NavLink>
                                                <NavLink className="subLink-tab" to={`${match.url}/FTPWeatherMapping`}>FTP Weather Mapping</NavLink>
                                                <NavLink className="subLink-tab" to={`${match.url}/FtpMFMMapping`}>FTP MFM Mapping</NavLink>
                                                <NavLink className="subLink-tab" to={`${match.url}/WeatherStationDevice`}>Weather Station Device</NavLink>
                                                <NavLink className="subLink-tab" to={`${match.url}/AlertMapping`}>Alert Mapping</NavLink>
                                            </div>
                                        </div>
                                    </div>
                                    <NavLink className="link-tab" exact to={`${match.url}/GraphUI`}>UI Setting</NavLink>
                                    <NavLink className="link-tab" exact to={`${match.url}/AlertUser`}>Alert User</NavLink>
                                    <div className="subLink">
                                        <NavLink className="link-tab" to={`${match.url}/MCleaning`}>Module Cleaning</NavLink>
                                        <div className="showsubMenu" style={{ left: "0", top: '34px' }}>
                                            <NavLink className="subLink-tab" to={`${match.url}/MCleaning`}>Cleaning Config</NavLink>
                                            <NavLink className="subLink-tab" to={`${match.url}/alertCleaning`}>Cleaning Alert</NavLink>
                                        </div>
                                    </div>
                                    <NavLink className="link-tab" exact to={`${match.url}/GraphGroup`}>Graph Group</NavLink>
                                    <NavLink className="link-tab" exact to={`${match.url}/SqlCreateQry`}>SQL Editor</NavLink>
                                    <NavLink className="link-tab" exact to={`${match.url}/SafetyVideo`}>Safety Video</NavLink>
                                    <NavLink className="link-tab" exact to={`${match.url}/errorCode`}>Master Error code</NavLink>
                                    <NavLink className="link-tab" exact to={`${match.url}/mobileSetting`}>Mobile Setting</NavLink>
                                    <NavLink className="link-tab" exact to={`${match.url}/forecastConfig`}>Forecast setting</NavLink>
                                    <NavLink className="link-tab" exact to={`${match.url}/AlertMailGeneration`}>Alert Mail-Generation</NavLink>
                                    <NavLink className="link-tab" exact to={`${match.url}/prUserManagement`}>PR Request Assignment</NavLink>
                                </Nav>
                                <div className="main-content">

                                    <Switch>
                                        <Route exact path={`${match.path}/PageGroup`} component={PageGroupComponent} />
                                        <Route exact path={`${match.path}/ShowPage`} component={(props) => <ShowPageComponent {...props} />} />
                                        <Route exact path={`${match.path}/DashboardPage`} component={DashboardPage} />
                                        <Route exact path={`${match.path}/UserManagement`} component={UserComponent} />
                                        <Route exact path={`${match.path}/UserManagement/User`} component={UserComponent} />
                                        <Route exact path={`${match.path}/UserManagement/Role`} component={RoleComponent} />
                                        <Route exact path={`${match.path}/HubDetails`} component={HubDetailsComponent} />
                                        <Route exact path={`${match.path}/Projects`} component={ProjectsComponent} />
                                        <Route exact path={`${match.path}/addEditProject`} component={AddEditProject} />
                                        <Route exact path={`${match.path}/PlantMapping`} component={InverterConfiguration} />
                                        <Route exact path={`${match.path}/InverterConfiguration`} component={InverterConfiguration} />
                                        <Route exact path={`${match.path}/InverterConfigurationEdit`} component={InverterConfigurationEdit} />
                                        <Route exact path={`${match.path}/AddCombinerBox`} component={AddCombinerBox} />
                                        <Route exact path={`${match.path}/AddFTPCombinerBoxMapping`} component={AddFTPCombinerBoxMapping} />
                                        <Route exact path={`${match.path}/WeatherConfiguration`} component={WeatherConfiguration} />
                                        <Route exact path={`${match.path}/WeatherConfigurationEdit`} component={WeatherConfigurationEdit} />
                                        <Route exact path={`${match.path}/WeatherConfigurationShare`} component={WeatherConfigurationShare} />
                                        <Route exact path={`${match.path}/InverterCSVMappingEdit`} component={InverterCSVMappingEdit} />
                                        <Route exact path={`${match.path}/MfmConfiguration`} component={MFMConfiguration} />
                                        <Route exact path={`${match.path}/MFMConfigurationAdd`} component={MFMConfigurationAdd} />
                                        <Route exact path={`${match.path}/MFMConfigurationEdit`} component={MFMConfigurationEdit} />
                                        <Route exact path={`${match.path}/InverterCSVMapping`} component={InverterCSVMapping} />
                                        <Route exact path={`${match.path}/InverterCSVMappingEdit`} component={InverterCSVMappingEdit} />
                                        <Route exact path={`${match.path}/WeatherCSVMapping`} component={WeatherCSVMapping} />
                                        <Route exact path={`${match.path}/WeatherCSVMappingEdit`} component={WeatherCSVMappingEdit} />
                                        <Route exact path={`${match.path}/MfmCSVMapping`} component={MfmCSVMapping} />
                                        <Route exact path={`${match.path}/MFMCSVMappingEdit`} component={MFMCSVMappingEdit} />
                                        <Route exact path={`${match.path}/FTPInverterMapping`} component={FTPInverterMapping} />
                                        <Route exact path={`${match.path}/FTPInverterMappingEdit`} component={FTPInverterMappingEdit} />
                                        <Route exact path={`${match.path}/FTPWeatherMapping`} component={FTPWeatherMapping} />
                                        <Route exact path={`${match.path}/FTPWeatherMappingEdit`} component={FTPWeatherMappingEdit} />
                                        <Route exact path={`${match.path}/FtpMFMMapping`} component={FTPMfmMapping} />
                                        <Route exact path={`${match.path}/FTPMFMMappingEdit`} component={FTPMFMMappingEdit} />
                                        <Route exact path={`${match.path}/WeatherStationDevice`} component={WeatherStationDevice} />
                                        <Route exact path={`${match.path}/WeatherStationDeviceEdit`} component={WeatherStationDeviceEdit} />
                                        <Route exact path={`${match.path}/AlertMapping`} component={AlertMapping} />
                                        <Route exact path={`${match.path}/GraphUI`} component={GraphUIComponent} />
                                        <Route exact path={`${match.path}/AlertUser`} component={AlertUserComponent} />
                                        <Route exact path={`${match.path}/MCleaning`} component={MCleaningComponent} />
                                        <Route exact path={`${match.path}/GraphGroup`} component={GraphGroupComponent} />
                                        <Route exact path={`${match.path}/GraphGroupAddEdit`} component={GraphGroupComponentAddEdit} />
                                        <Route exact path={`${match.path}/SqlCreateQry`} component={SqlCreateQryComponent} />
                                        <Route exact path={`${match.path}/SafetyVideo`} component={SafetyVideoComponent} />
                                        <Route exact path={`${match.path}/errorCode`} component={ErrorCodeComponent} />
                                        <Route exact path={`${match.path}/addErrorCode`} component={AddEditErrorCode} />
                                        <Route exact path={`${match.path}/mobileSetting`} component={MobileSettingComponent} />
                                        <Route exact path={`${match.path}/AddEditMobileSetting`} component={AddEditMobileSetting} />
                                        <Route exact path={`${match.path}/forecastConfig`} component={ForecastConfigComponent} />
                                        <Route exact path={`${match.path}/addEditforecastConfig`} component={AddEditForecastSetting} />
                                        <Route exact path={`${match.path}/addUser`} component={AddUser} />
                                        <Route exact path={`${match.path}/AlertMailGeneration`} component={AlertMailGeneration}/>
                                        <Route exact path={`${match.path}/addEditAlertMailGeneration`} component={AddEditAlertMailGeneration}/>
                                        <Route exact path={`${match.path}/prUserManagement`} component={PRUserManagementComponent} />
                                        <Route exact path={match.path} component={GraphComponent} />
                                        <Route exact path={`${match.path}/AddGraph`} component={AddGraph} />
                                        <Route exact path={`${match.path}/alertCleaning`} component={ModuleCleaningAlert} />
                                        <Route path={`${match.path}/displayGraph`} component={DisplayGraph} />
                                        <Route path={`${match.path}/addEditPageGroup`} component={EditPageGroupdetails} />
                                        <Route path={`${match.path}/addEditPage`} component={AddEditPagedetails} />
                                        <Route path={`${match.path}/ShowPage/:id`} component={(props) => <ShowPageComponent {...props} />} />
                                        <Route path={`${match.path}/AddEditCleaningConfig`} component={(props) => <AddEditCleaningConfig/>} />
                                        <Route path={`${match.path}/AddEditCleaningUser`} component={(props) => <AddEditCleaningUser/>} />
                                        <Route path={`${match.path}/AddEditUser`} component={AddEdituser} />
                                        <Route path={`${match.path}/AddEditUserRole`} component={AddEdituserRole} />
                                        <Route path={`${match.path}/addEditHub`} component={AddEditHub} />
                                        <Route path={`${match.path}/hubUsersMapping`} component={MappingHub} />
                                        <Redirect to="/setting" />
                                    </Switch>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        );
    }
}
export default SettingComponent;
