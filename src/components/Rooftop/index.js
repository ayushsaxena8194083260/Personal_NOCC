import React,{Component} from 'react';
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
import {
    Route,
    Link,
    Switch,
    Redirect,
    useRouteMatch
  } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import RooftopDashboard from './rooftopDashboard';
import InverterComparison from './InverterComparison/inverterComparison';
import RooftopSubComponent from './Rooftop';

class RooftopComponent extends Component{
    
    render(){
        // let { path, url } = useRouteMatch();
        console.log(this.props);
        const { match } = this.props
        return(
            <div className="animated fadeIn">
                        <Nav variant='tabs' defaultActiveKey="/" style={{borderBottom:"none",width:'1264px',margin:"auto"}}>
                            <Link activeClassName="activeRoute" className="link-tab" to={`${match.url}/rendering`}>Rooftop Dashboard</Link>
                            <Link className="link-tab" to={`${match.url}/RooftopSubComponent`}>Rooftop</Link>
                            <Link className="link-tab" to={`${match.url}/inverterComparison`}>Inverter Comparison</Link>
                        </Nav>
                        <div style={{marginTop:"0"}}>
                            {/* <InverterComparison/> */}
                            {/* <RooftopSubComponent/> */}
                            <Switch>
                                <Route exact path={`${match.path}/inverterComparison`} component={InverterComparison}/>
                                <Route exact path={`${match.path}/RooftopSubComponent`} component={RooftopSubComponent}/>
                                <Route path={match.path} component={RooftopDashboard}/>
                            </Switch>
                        </div>
            </div>
        );
    }
}
export default RooftopComponent