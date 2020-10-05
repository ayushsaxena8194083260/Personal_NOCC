import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';
import { getForecastConfigsSettings } from '../../../../actions/action-Settings';
import { connect } from 'react-redux';
import {AgGridReact} from "ag-grid-react";
import { Route } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

const rowIndex = (params) => params.node.rowIndex + 1;

class ActionCellRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.invokeDelete = this.invokeDelete.bind(this);
    }

    invokeDelete() {
        this.props.context.componentParent.onDelete(this.props.node.data._id);
    }
    render() {
        return (<div className="products-actions">           
            <Link className="products-actions-link"
                to={{
                    pathname: "addEditforecastConfig",
                    forecastSetting: this.props.data
                }}>
                <img src="/images/editIcon.png" alt="Edit" />
            </Link>
        </div>);
    }
}

class ForecastConfigComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            forecastSettings: []
        }
    }
    componentDidMount() {
        // document.title = 'Plant Fault Data';
        this.props.getForecastConfigsSettings();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ forecastSettings: nextProps.forecastSettings });
    }

    createColumnDefs() {
        return [
            {
                headerName: "Sr No", lockPosition: true, valueGetter: rowIndex, width:100,cellClass: 'cell-wrap',
                autoHeight: true,cellStyle: { 'white-space': 'normal' },sortable: true
            },
            {
                headerName: "Forecast Mechanism", field: "forecastModelName", cellClass: 'cell-wrap',
                autoHeight: true, width: 300, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Minimum Historic Result", field: "minHistoricResult", cellClass: 'cell-wrap',
                autoHeight: true, width: 300, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Maximum Deviation", field: "maxDeviationResult", cellClass: 'cell-wrap',
                autoHeight: true, width: 300, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Action",
                field: '',
                cellRendererFramework: ActionCellRenderer,
                width: 100,
            }
        ];
    }

    render() {
        return (
            <div>
                 <div className="top-filter">
                    <div className="row" style={{ flexDirection: "row-reverse", margin: "0" }} >
                    <Col xs={2} style={{ maxWidth: "20%" }}>
                            <Route render={({ history }) => (
                                <button type="button" className="btn btn-primary" style={{ width: "100%" }} onClick={() => { history.push('addEditforecastConfig') }}>
                                    <img src="/images/icons/fugue/plus-circle.png" alt="add plant" title="Add Forecast Setting" style={{ float: "left", marginRight: "3" }} />
                                    Add Forecast Setting
                        </button>)} />
                        </Col>
                        
                    </div>
                </div>
                <div>
                            {this.props.displayMessage ? <Alert className="message success" variant="success" style={{ marginTop: "15px" }}>{this.props.displayMessage}</Alert> : null}
                        </div>

            <div
                style={{
                    height: '500px',
                    maxWidth: "1222px",
                    margin: "auto"
                }}
                className="ag-theme-material">
                <AgGridReact
                    key="grid"
                    columnDefs={this.createColumnDefs()}
                    rowData={this.state.forecastSettings}
                    context={{ componentParent: this }}
                    onGridReady={this.onGridReady}>                   

                </AgGridReact></div>
                </div>
        )
    }
}
const mapStateToProps = state => {
    return {

        forecastSettings: state.SettingsReducer.forecastSettings,
        displayMessage: state.SettingsReducer.displayMessage,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getForecastConfigsSettings: () => dispatch(getForecastConfigsSettings())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ForecastConfigComponent);



