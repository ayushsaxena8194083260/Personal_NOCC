import React, { Component } from "react";
import { Link, withRouter, Route } from 'react-router-dom';
import AccordionControl from '../../../Common/Accordion';
import { getGraphsSettings, getAllGraphGroupData } from '../../../../actions/action-Settings';
import { connect } from 'react-redux';
import { getAllInverters } from '../../../../actions/InverterDailyActions';
import { getAllSMU } from '../../../../actions/action-smu';
import { getAllWeatherStation } from '../../../../actions/WeatherStationDataActions';

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
                    pathname: "/setting/displayGraph/" + this.props.data.id,
                    displayGraph: this.props.data
                }}>
                <img src="/images/icons/fugue/chart.png" alt="View Graph" />
            </Link>
            <Link className="products-actions-link"
                to={{
                    pathname: "/setting/AddGraph",
                    plantFault: this.props.data
                }}>
                <img src="/images/editIcon.png" alt="Edit" />
            </Link>
            <Link to="#" onClick={this.invokeDelete} title="Delete" >
                <img src="/images/cross-circle.png" alt="Delete" />
            </Link>
        </div>);
    }
}


class GraphComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            graphs: []
        }
    }

    createColumnDefs() {
        return [
            {
                headerName: "Sr No", field: "id", cellClass: 'cell-wrap',
                autoHeight: true, width: 70, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Graph Title", field: "graphName", cellClass: 'cell-wrap',
                autoHeight: true, width: 1000, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Action",
                field: '',
                cellRendererFramework: ActionCellRenderer,
                width: 130,
            }
        ];
    }

    componentDidMount() {
        // document.title = 'Plant Fault Data';
        this.props.getGraphsSettings();
        this.props.getAllGraphGroupData();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps!=null){
            var localGraphs = [];
            var localGraphGroups = [];
            if(nextProps.graphs.length !== 0 && nextProps.graphGroups.length !== 0){
                for(var i=0;i<nextProps.graphGroups.length;i++){
                    var k=0;
                    localGraphs.push(new Array({'groupName':nextProps.graphGroups[i].graphGroupName}));
                    localGraphGroups[i] =[];
                    for(var j=0;j<nextProps.graphs.length;j++){
                        if(nextProps.graphGroups[i].graphGroupId === nextProps.graphs[j].graphGroupId){
                            k++;
                            nextProps.graphs[j]['id'] = k;
                            nextProps.graphs[j]['graphGroupName'] = nextProps.graphGroups[i].graphGroupName;
                            localGraphGroups[i].push(nextProps.graphs[j]);
                            localGraphs[i].push(nextProps.graphs[j]);
                        }
                    }
                }  
            }
            this.setState({ graphs: localGraphGroups });
        }
        
    }
    render() {
        return (
            <div>
                {this.state.graphs && this.props.graphs.length > 0 &&
                    <div>
                        <section className="top-filter">
                            <div id="filter-table">
                                <div valign="middle" style={{ textAlign: "right" }}>
                                    <Route render={({ history }) => (
                                        <button type="button" className="btn btn-primary" style={{ width: "10%" }} onClick={() => { history.push('/setting/AddGraph') }}>
                                            <img src="/images/icons/fugue/plus-circle.png" alt="Add Graph" title="Add Graph" style={{ float: "left", marginRight: "3" }} />
                                            Add Graph
                                                                        </button>)} />
                                </div>
                            </div>
                        </section>
                        <AccordionControl graphs={this.state.graphs} graphGroup={this.props.graphGroups} allSMU = {this.props.allSMU} 
                        allInv = {this.props.allInverters} allWeatherStation={this.props.allWeatherStation} columnDefs={this.createColumnDefs()} />
                    </div>
                }
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {

        graphs: state.SettingsReducer.graphs,
        graphGroups: state.SettingsReducer.graphGroups,
        allSMU: state.allSMU.allSMUs, 
        allInverters: state.inverterDailyReducer.allInverters, 
        allWeatherStation: state.weatherStationReducer.allWeatherStations
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getGraphsSettings: () => dispatch(getGraphsSettings()),
        getAllGraphGroupData: () => dispatch(getAllGraphGroupData()),
        getAllInverters: () => dispatch(getAllInverters()),
        getAllSMU:() => dispatch(getAllSMU()),
        getAllWeatherStation: () => dispatch(getAllWeatherStation())
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GraphComponent));
