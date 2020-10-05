import React, { Component } from "react";
import ForecastComp from "./ForecastComponent"
import { Card, Nav, } from "react-bootstrap";
import { Switch, Route, NavLink } from "react-router-dom";
import TimeSlotSettings from './timeSlotSettings';
import ForecastSettings from './formulaeSettings';
import ForecastDayAhead from './ForcastDayAhead'
import AddEditTimeSlotSettings from "./addEditTimeSlotSettings";
import FormulaeSettingsAddEdit from "./addEditformulaeSettings";
class ForecastComponent extends Component{
    render(){
        const { match } = this.props;
        return(
            <>
            <div className="animated fadeIn">
                                <Card style={{ width: "1264px", margin: "auto" }}>
                                    <Card.Body>
                                        <div className="main-content">
                                            <Nav variant='tabs' defaultActiveKey="/">
                                                <NavLink className="link-tab" exact to={match.url}>Forecast</NavLink>
                                                <NavLink className="link-tab" exact to={`${match.url}/ForecastDayAhead`}>Forecast Day Ahead</NavLink>
                                                <div className="wrapping-div">
                                                <div className="subLink">
                                                <NavLink className="link-tab" exact to={`${match.url}/ForecastDayAheadSetting`}>Forecast Day Ahead Setting</NavLink>
                                                <div className="showsubMenu" style={{ left: "0", top: '34px' }}>
                                                    <NavLink className="subLink-tab" style={{width:"198px"}} to={`${match.url}/timeSlotSettings`}>Time Slot Settings</NavLink>
                                                    <NavLink className="subLink-tab" style={{width:"198px"}} to={`${match.url}/formulaeSettings`}>Formulae settings</NavLink>
                                                </div>
                                                </div>
                                                </div>
                                            </Nav>
                                            <div className="main-content">
                                                <Switch>
                                                    <Route exact path={`${match.path}`} component={ForecastComp} />
                                                    <Route exact path={`${match.path}/Forecast`} component={ForecastComp} />
                                                    <Route exact path={`${match.path}/ForecastDayAhead`} component={ForecastDayAhead} />
                                                    <Route exact path={`${match.path}/ForecastDayAheadSetting`} component={TimeSlotSettings} />
                                                    <Route exact path={`${match.path}/timeSlotSettings`} component={TimeSlotSettings} />
                                                    <Route exact path={`${match.path}/addEditTimeSlotSettings`} component={AddEditTimeSlotSettings} />
                                                    <Route exact path={`${match.path}/formulaeSettings`} component={ForecastSettings} />
                                                    <Route exact path={`${match.path}/addEditformulaeSettings`} component={FormulaeSettingsAddEdit} />
                                                    <Route to="/Forecast" />
                                                </Switch>
                                        </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                                </div>
            </>
        )
    }
}
export default ForecastComponent;