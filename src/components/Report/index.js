import React, { Component } from 'react';
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
import GenerateGraph from './Pages/generateGraph';
import ProvisionalNumberReport from './Pages/provisionalNumberReport';
import WeeklyReport from './Pages/weeklyReport';
import MergedReports from './Pages/mergedReports';
import ModuleCleaningReport from './Pages/moduleCleaningReport';
import LenderReport from './Pages/lenderReport';
import BudgetReport from './Pages/budgetReport';
import DeviationReport from './Pages/deviationReport';
import DeviationExtendedReport from './Pages/deviationExtendedReport';
import SoilingAnalysisReport from './Pages/soilingAnalysis';
import ForecastReport from './Pages/forecastReport';
import WeeklyReportGeneratePdf from './Pages/weeklyReportGeneratePdf';

class ReportComponent extends Component {
    render() {
        const { match } = this.props;
        return (
            <>
                <div className="animated fadeIn">
                    <Card style={{ maxWidth: "1264px", margin: "auto" }}>
                        <Card.Body>
                            <div className="main-content ">
                                <Nav className="small-main-content" variant='tabs' defaultActiveKey="/">
                                    <NavLink className="link-tab" exact to={`${match.url}/generateGraph`}>Generate Graph PDF</NavLink>
                                    <NavLink className="link-tab" exact to={`${match.url}/provisionalNumberReport`}>Provisional Number Report</NavLink>
                                    <NavLink className="link-tab" exact to={`${match.url}/WeeklyReport`}>Weekly Report</NavLink>
                                    <NavLink className="link-tab" exact to={`${match.url}/MergedReports`}>Merged Reports</NavLink>
                                    <NavLink className="link-tab" exact to={`${match.url}/ModuleCleaningReport`}>Module Cleaning Report</NavLink>
                                    <NavLink className="link-tab" exact to={`${match.url}/LenderReport`}>Lender Report</NavLink>
                                    <NavLink className="link-tab" exact to={`${match.url}/BudgetReport`}>Budget Report</NavLink>
                                    <NavLink className="link-tab" exact to={`${match.url}/DeviationReport`}>Deviation Report</NavLink>
                                    <NavLink className="link-tab" to={`${match.url}/DeviationExtendedReport`}>Deviation Extended Report</NavLink>
                                    <NavLink className="link-tab" exact to={`${match.url}/SoilingAnalysisReport`}>Soiling Analysis</NavLink>
                                    <NavLink className="link-tab" exact to={`${match.url}/ForecastReport`}>Forecast Report</NavLink>
                                </Nav>
                                <div className="main-content small-main-content" >
                                    <Switch className="small-main-content">
                                        <Route exact path={`${match.path}/provisionalNumberReport`} component={ProvisionalNumberReport} />
                                        <Route exact path={`${match.path}/WeeklyReport`} component={WeeklyReport} />
                                        <Route exact path={`${match.path}/MergedReports`} component={MergedReports} />
                                        <Route exact path={`${match.path}/ModuleCleaningReport`} component={ModuleCleaningReport} />
                                        <Route exact path={`${match.path}/LenderReport`} component={LenderReport} />
                                        <Route exact path={`${match.path}/BudgetReport`} component={BudgetReport} />
                                        <Route exact path={`${match.path}/DeviationReport`} component={DeviationReport} />
                                        <Route exact path={`${match.path}/DeviationExtendedReport`} component={DeviationExtendedReport} />
                                        <Route path={`${match.path}/DeviationExtendedReport/:type/:quarter`} component={DeviationExtendedReport} />
                                        <Route exact path={`${match.path}/SoilingAnalysisReport`} component={SoilingAnalysisReport} />
                                        <Route exact path={`${match.path}/ForecastReport`} component={ForecastReport} />
                                        <Route exact path={`${match.path}/weeklyReportGeneratePdf`} component={WeeklyReportGeneratePdf} />
                                        <Route path={match.path} component={GenerateGraph} />
                                        <Redirect to="/report" />
                                    </Switch>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </>
        );
    }
}
export default ReportComponent;