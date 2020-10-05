import React, { Component } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { Link, withRouter, Route } from 'react-router-dom';
import {AgGridReact} from "ag-grid-react";
// import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

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
                    plantFault: this.props.data
                }}>
                <img src="/images/icons/fugue/chart.png" alt="View Graph" />
            </Link>
            <Link className="products-actions-link"
                to={{
                    pathname: "/setting/AddGraph",
                    graphData: this.props.data
                }}>
                <img src="/images/editIcon.png" alt="Edit" />
            </Link>
            <Link to="#" onClick={this.invokeDelete} title="Delete" >
                <img src="/images/cross-circle.png" alt="Delete" />
            </Link>
        </div>);
    }
}

class AccordionControl extends Component {
    constructor(props) {
        super(props);
        // this.handleChange = this.props.handleChange.bind(this);
        this.state = {
            groupHeaderHeight: 50,
            headerHeight: 50,
            floatingFiltersHeight: 50,
            pivotGroupHeaderHeight: 50,
            pivotHeaderHeight: 100,
            showIcon:false
        }
    }

    columnDefs() {
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
                width: 100,
            }
        ];
    }

    onGridReady = (params) => {
        params.api.setHeaderHeight(50);
    }

    render() {
        // var inst=0;
        return (
            <Accordion key="" defaultActiveKey="0">
                {
                    this.props.graphs && this.props.graphs.length > 0 && this.props.graphs.map((item, index) => {
                        return <Card key={index} style={{
                                                        display: "block",
                                                        cursor: "pointer",
                                                        position: "relative",
                                                        marginTop: "2px",
                                                        minHeight: 0,
                                                        marginBottom: "4px",
                                                        border: "1px solid #e2e0e0"
                                }}>
                            <Accordion.Toggle style={{textAlign: "left",
                                                    fontSize: "80%",
                                                    color: "#333",
                                                    padding: ".5em",
                                                    paddingLeft: "2.2em",
                                                    position:"relative"}}  as={Card.Header} eventKey={index} onClick={()=>{this.setState({showIcon:!this.state.showIcon});}}>
                                <div>
                                {/* { inst = ++index } */}
                                <span className={`ui-accordion-header-icon ui-icon ui-icon-triangle-1-${this.state.showIcon && index ?"s":"t"}`} />
                                {this.props.graphGroup[index].graphGroupName}
                                </div>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey={index}>
                 
                                 <Card.Body style={{padding:"1.25em 10px"}}>
                                 
                                      <div key={index} style={{ height: '166px' }} className="ag-theme-material">
                                      
                                            <AgGridReact
                                                key={index+1}
                                                columnDefs={this.columnDefs()}
                                                rowData={item}
                                                graphGroup = {this.props.graphGroup}
                                                allSMU = {this.props.allSMU}
                                                allInv = {this.props.allInverters}
                                                allWeatherStation={this.props.allWeatherStation}
                                                //context={{ componentParent: this }}
                                                //onGridReady={this.onGridReady}
                                                groupHeaderHeight={this.state.groupHeaderHeight}
                                                headerHeight={this.state.headerHeight}
                                                floatingFiltersHeight={this.state.floatingFiltersHeight}
                                                pivotGroupHeaderHeight={this.state.pivotGroupHeaderHeight}
                                                pivotHeaderHeight={this.state.pivotHeaderHeight}
                                                sideBar={true}

                                            />
                                          
                                        </div>
                                </Card.Body>
                                     
                            </Accordion.Collapse>
                        </Card>
                    })
                }

            </Accordion>
        )
    }

}

export default AccordionControl;