import React, {Component} from 'react';
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
import {
    Route,
    NavLink,
    Switch,
    Redirect
  } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import UnassignedTickets from './Pages/unassignedTickets';
import ViewTicketsByHub from './Pages/viewTicketsByHub';
import ViewTicketsByUser from './Pages/viewTicketsByUser';
import viewTicketDetails from './Pages/viewTicketDetails';
import UserPerformance from './Pages/userPerformance';
import Dashboard from './Pages/dashboard';
import ViewTicketsByHubPlantTickets from './Pages/viewTicketsByHubPlantTickets';
import viewTicketsByHubPlant from './Pages/viewTicketsByHubPlant';
import assignFieldUser from './Pages/assignFieldUser';
import ViewTaskCount from './Pages/viewTaskCount';

class FieldUserReportComponent extends Component{
    constructor(props) {
        super(props);
        console.log('initial history is: ', JSON.stringify(this.props.history, null, 2))
    }

    render (){
        const { match } = this.props;
        return(
            <BrowserRouter>
                <div className="animated fadeIn">
                <Card style={{width:"1264px", margin:"auto"}}>
                    <Card.Body>
                        <div className="main-content">
                            <Nav variant='tabs' defaultActiveKey="/">
                                <NavLink className="link-tab" exact to={`${match.url}/dashboard`}>Dashboard</NavLink>
                                <NavLink className="link-tab" exact to={`${match.url}/unassignedTickets`}>Unassigned tickets</NavLink>
                                <NavLink className="link-tab" exact to={`${match.url}/viewTicketsByHub`}>View tickets by hub</NavLink>
                                <NavLink className="link-tab" exact to={`${match.url}/viewTicketsByUser`}>View tickets by User</NavLink>                                
                                <NavLink className="link-tab" exact to={`${match.url}/userPerformance`}>User Performance</NavLink>                                
                            </Nav>
                            <div className="main-content">
                            <Switch>
                                <Route exact path={`${match.path}`} component={UnassignedTickets} />
                                <Route exact path={`${match.path}/viewTicketsByHub`} component={ViewTicketsByHub} />
                                <Route  path={`${match.path}/viewTicketsByUser`} component={ViewTicketsByUser} />
                                <Route exact path={`${match.path}/userPerformance`} component={UserPerformance} />
                                <Route exact path={`${match.path}/ViewTaskCount`} component={ViewTaskCount} />
                                <Route  path={`${match.path}/viewTicketsByHubPlantTickets`} component={ViewTicketsByHubPlantTickets} />
                                <Route  path={`${match.path}/viewTicketsByHubPlant`} component={viewTicketsByHubPlant} />
                                <Route path={`${match.path}/viewTicketDetails`} component={viewTicketDetails} />
                                {/* ViewTaskCount */}
                                <Route path={`${match.path}/assignFieldUser`} component={assignFieldUser}/>
                                <Route path={`${match.path}/dashboard`} component={Dashboard}/>
                                <Redirect to="/fieldUserReport"/>
                            </Switch>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
                </div>
            </BrowserRouter>
        );
    }
}
export default FieldUserReportComponent;