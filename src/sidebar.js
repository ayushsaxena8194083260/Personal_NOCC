import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import SideNav, {Toggle, NavItem, NavIcon, NavText, } from '@trendmicro/react-sidenav';
// import ClickOutside from '@trendmicro/react-sidenav'
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import './App.scss';
import ClickOutside from './ClickOutSide'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from './actions/login';
import { getMenuPermissionByRoleId } from '../src/actions/action-Settings';
const mainIcon = require('./logo.png');
const userIcon = require('./icons8-user-100.png')
const userDetails = JSON.parse(localStorage.getItem('isAuthenticated'));

class Sidebar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userRoleDetails: '',
            dashboard: false,
            hubdashboard: false,
            performance: false,
            analytics: false,
            diagnosis: false,
            forecasting: false,
            rooftop: false,
            report: false,
            plant: false,
            prrequest: false,
            settings: false,
            fieldUserReport: false,
            plantalerts: false,
            isToggleExpended: false
        };
    }

    componentDidMount() {
        if (userDetails && userDetails['roleId']) {
            this.props.getMenuPermissionByRoleId(userDetails.roleId);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.menuByRoleId != undefined) {
            const stateDup = this.state;
            stateDup.userRoleDetails = nextProps.menuByRoleId;
            for (var i = 0; i < nextProps.menuByRoleId.length; i++) {
                if (nextProps.menuByRoleId[i].menuTitle === 'Dashboard') {
                    stateDup.dashboard = true;
                } else if (nextProps.menuByRoleId[i].menuTitle === 'HUB Dashboard') {
                    stateDup.hubdashboard = true;
                } else if (nextProps.menuByRoleId[i].menuTitle === 'Performance') {
                    stateDup.performance = true;
                } else if (nextProps.menuByRoleId[i].menuTitle === 'Analytics') {
                    stateDup.analytics = true;
                } else if (nextProps.menuByRoleId[i].menuTitle === 'Diagnosis') {
                    stateDup.diagnosis = true;
                } else if (nextProps.menuByRoleId[i].menuTitle === 'Forecasting') {
                    stateDup.forecasting = true;
                } else if (nextProps.menuByRoleId[i].menuTitle === 'Rooftop') {
                    stateDup.rooftop = true;
                } else if (nextProps.menuByRoleId[i].menuTitle === 'Report') {
                    stateDup.report = true;
                } else if (nextProps.menuByRoleId[i].menuTitle === 'Plant') {
                    stateDup.plant = true;
                } else if (nextProps.menuByRoleId[i].menuTitle === 'PR Request') {
                    stateDup.prrequest = true;
                } else if (nextProps.menuByRoleId[i].menuTitle === 'Settings') {
                    stateDup.settings = true;
                } else if (nextProps.menuByRoleId[i].menuTitle === 'Field user report') {
                    stateDup.fieldUserReport = true;
                } else if (nextProps.menuByRoleId[i].menuTitle === 'Plant alerts') {
                    stateDup.plantalerts = true;
                }
            }
            this.setState({ stateDup });
        }
    }

    render() {
        const username = localStorage.getItem('username')
        return (
            <div className="App">
                {this.props.isAuth ? <>
                    <Navbar className='navbar-custom'>
                        <Navbar.Brand href="/"><img src={mainIcon} width="200px" alt="icon" className="topnavImgLeft" /></Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-end">
                            <div className="navbar_info">
                                <div className="energyTicker" id="energy_today">
                                    <div className="enrgyTick">Energy Generate Till Date</div>
                                    <div className="tickerText">5,833.83 Gwh</div>
                                </div>
                                {/* <div className="energyTicker" id="carbon_today" style={{ display: "none" }}>
                                    <div className="enrgyTick2">Carbon Mitigation </div>
                                    <div className="tickerText">5,250.45 Mn Tonnes</div>
                                </div> */}
                                <a href="https://nocc.azurepower.com/uploads/safety_video/1484834272safety_video.mp4" className="fancy_video" data-width="340" data-height="260" data-caption="Azure Power Safety Video" data-poster=""><div className="marquee marquee-demo">Safety Video NOCC</div></a>
                            </div>
                        </Navbar.Collapse>
                    </Navbar>
                    <ClickOutside
                        onClickOutside={() => {
                            this.setState({ expanded: false });
                        }}
                    >

                        <SideNav
                            onToggle={(expanded) => {
                                this.setState({ isToggleExpended: expanded });
                            }}
                            className={`sidebar-custom ${this.state.isToggleExpended ? '' : 'toggle_closed'}`}
                        >
                            <SideNav.Toggle />
                            <SideNav.Nav>
                                {/* defaultSelected="home" */}
                                <NavItem className="sidebarNavItems" eventKey="charts">
                                    <NavIcon title="User">
                                        <p><img src={userIcon} alt="icon" className="topnavImgLeft" style={{ width: '3em' }} /></p>
                                        {/* <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em',color:'#000' }} /> */}
                                    </NavIcon>
                                    <NavText style={{ color: '#000' }}>
                                        <a className="sidebar-link">{username}</a>
                                    </NavText>
                                    <NavItem eventKey="charts/linechart">
                                        <NavText style={{ color: '#000' }}>
                                            <p className="sidebar-link">Change Password</p>
                                        </NavText>
                                    </NavItem>
                                    <NavItem eventKey="charts/barchart">
                                        <NavText style={{ color: '#000' }}>
                                            <Link to="/login" style={{ marginLeft: "-120px" }} className="sidebar-link" onClick={() => { this.props.logout(); console.log("logged Out"); this.props.history.push('/login') }}>Log out</Link>
                                        </NavText>
                                    </NavItem>
                                </NavItem>
                                {this.state.dashboard === true ?
                                    <NavItem eventKey="dashboard">
                                        <NavIcon title="Dashboard">
                                            <Link to="/dashboard"><img src="/images/menu/Loading.png" alt="Dashboard" style={{ width: '1.75em' }} /></Link>
                                            {/* <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' ,color:'#000'}} /> */}
                                        </NavIcon>
                                        <NavText style={{ color: '#000' }}>
                                            <Link to="/dashboard" className="sidebar-link">Dashboard</Link>
                                        </NavText>
                                    </NavItem> : ''}

                                {this.state.hubdashboard === true ?
                                    <NavItem eventKey="hub-dashboard">
                                        <NavIcon title="HUB Dashboard">
                                            <Link to="/hubdashboard"><img src="/images/menu/Loading.png" alt="HUB Dashboard" style={{ width: '1.75em' }} /></Link>
                                        </NavIcon>
                                        <NavText style={{ color: '#000' }}>
                                            <Link to="/hubdashboard" className="sidebar-link">HUB Dashboard</Link>
                                        </NavText>
                                    </NavItem> : ''}

                                {this.state.performance === true ?
                                    <NavItem eventKey="performance">
                                        <NavIcon title="Performance">
                                            <Link to="/performanceAnalysis"> <img src="/images/menu/report-b.png" alt="Performance" style={{ width: '1.75em' }} /></Link>
                                            {/* <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' ,color:'#000'}} /> */}
                                        </NavIcon>
                                        <NavText style={{ color: '#000' }}>
                                            <Link to="/performanceAnalysis" className="sidebar-link">Performance</Link>
                                        </NavText>
                                    </NavItem> : ''}

                                {this.state.analytics === true ?
                                    <NavItem eventKey="analytics">
                                        <NavIcon title="Analytics">
                                            <Link to="/analytics"><img src="/images/menu/Line-Chart.png" alt="Analytics" style={{ width: '1.75em' }} /></Link>
                                            {/* <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' ,color:'#000'}} /> */}
                                        </NavIcon>
                                        <NavText style={{ color: '#000' }}>
                                            <Link to="/analytics" className="sidebar-link">Analytics</Link>
                                        </NavText>
                                    </NavItem> : ''}

                                {this.state.diagnosis === true ?
                                    <NavItem eventKey="diagnosis">
                                        <NavIcon title="Diagnosis">
                                            <Link to="/diagnosis"><img src="/images/menu/diagnosis.png" alt="Diagnosis" style={{ width: '1.75em' }} /></Link>
                                            {/* <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' ,color:'#000'}} /> */}
                                        </NavIcon>
                                        <NavText style={{ color: '#000' }}>
                                            <Link to="/diagnosis" className="sidebar-link">Diagnosis</Link>
                                        </NavText>
                                    </NavItem> : ''}

                                {this.state.forecasting === true ?
                                    <NavItem eventKey="forecast">
                                        <NavIcon title="Forecasting">
                                            <Link to="/forecast"><img src="/images/menu/forecast.png" alt="Diagnosis" style={{ width: '1.75em' }} /></Link>
                                            {/* <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' ,color:'#000'}} /> */}
                                        </NavIcon>
                                        <NavText style={{ color: '#000' }}>
                                            <Link to="/forecast" className="sidebar-link">Forecasting</Link>
                                        </NavText>
                                    </NavItem> : ''}

                                {this.state.rooftop === true ?
                                    <NavItem eventKey="rooftop">
                                        <NavIcon title="Rooftop">
                                            <Link to="/rooftop" ><img src="/images/menu/portal.png" alt="Rooftop" style={{ width: '1.75em' }} /></Link>
                                            {/* <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' ,color:'#000'}} /> */}
                                        </NavIcon>
                                        <NavText style={{ color: '#000' }}>
                                            <Link to="/rooftop" className="sidebar-link">Rooftop</Link>
                                        </NavText>
                                    </NavItem> : ''}

                                {this.state.report === true ?
                                    <NavItem eventKey="report">
                                        <NavIcon title="Report">
                                            <Link to="/report"><img src="/images/menu/report.png" alt="Report" style={{ width: '1.75em' }} /></Link>
                                            {/* <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' ,color:'#000'}} /> */}
                                        </NavIcon>
                                        <NavText style={{ color: '#000' }}>
                                            <Link to="/report" className="sidebar-link">Report</Link>
                                        </NavText>
                                    </NavItem> : ''}

                                {this.state.plant === true ?
                                    <NavItem eventKey="plant">
                                        <NavIcon title="Plant">
                                            <Link to="/"><img src="/images/menu/Plant.png" alt="Plant" style={{ width: '1.75em' }} /></Link>
                                            {/* <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' ,color:'#000'}} /> */}
                                        </NavIcon>
                                        <NavText style={{ color: '#000' }}>
                                            <Link to="/" className="sidebar-link">Plant</Link>
                                        </NavText>
                                    </NavItem> : ''}

                                {this.state.prrequest === true ?
                                    <NavItem eventKey="pr-request">
                                        <NavIcon title="PR Request">
                                            <Link to="/prRequest"><img src="/images/menu/pr_request.png" alt="PR Request" style={{ width: '1.75em' }} /></Link>
                                            {/* <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' ,color:'#000'}} /> */}
                                        </NavIcon>
                                        <NavText style={{ color: '#000' }}>
                                            <Link to="/prRequest" className="sidebar-link">PR Request</Link>
                                        </NavText>
                                    </NavItem> : ''}

                                {this.state.plantalerts === true ?
                                    <NavItem eventKey="plant-alerts">
                                        <NavIcon title="Plant Alerts">
                                            <img src="/images/menu/ticket.png" alt="Plant Alerts" style={{ width: '1.75em' }} />
                                            {/* <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' ,color:'#000'}} /> */}
                                        </NavIcon>
                                        <NavText style={{ color: '#000' }}>
                                            <a href="http://alerts.azurepower.com/scp/auth.php?username=&passwd=" className="sidebar-link">Plant Alerts</a>
                                        </NavText>
                                    </NavItem> : ''}

                                {this.state.settings === true ?
                                    <NavItem eventKey="settings">
                                        <NavIcon title="Settings">
                                            <Link to="/setting"><img src="/images/menu/Control-Panel.png" alt="Settings" style={{ width: '1.75em' }} /></Link>
                                            {/* <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' ,color:'#000'}} /> */}
                                        </NavIcon>
                                        <NavText style={{ color: '#000' }}>
                                            <Link to="/setting" className="sidebar-link">Settings</Link>
                                        </NavText>
                                    </NavItem> : ''}

                                {this.state.fieldUserReport === true ?
                                    <NavItem eventKey="field-user-report">
                                        <NavIcon title="Field user report">
                                            <Link to="/fieldUserReport"><img src="/images/menu/diagnosis.png" alt="Field user report" style={{ width: '1.75em' }} /></Link>
                                            {/* <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' ,color:'#000'}} /> */}
                                        </NavIcon>
                                        <NavText style={{ color: '#000' }}>
                                            <Link to="/fieldUserReport" className="sidebar-link">Field user report</Link>
                                        </NavText>
                                    </NavItem> : ''}

                                {/* <NavItem eventKey="projects">
                            <NavIcon title="Projects">
                                <img src="/images/menu/user.png" alt="Projects" style={{ width: '1.75em' }} />
                            </NavIcon>
                            <NavText style={{ color: '#000' }}>
                                <h6 className="sidebar-link">Projects</h6>
                            </NavText>
                        </NavItem> */}
                            </SideNav.Nav>
                        </SideNav>

                    </ClickOutside>                     </> : <></>}


            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        menuByRoleId: state.SettingsReducer.menuByRoleId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout()),
        getMenuPermissionByRoleId: (roleId) => dispatch(getMenuPermissionByRoleId(roleId))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);