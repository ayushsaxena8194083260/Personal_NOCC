import React, { Component } from 'react';
import {
    Route,
    Link,
    Switch,
    Redirect
} from 'react-router-dom';
import '../../../../styles/graphComponent.scss'
class GraphComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showGrid: false,
        }
    }
    ShowGridHandler = () => {
        this.setState((prevState, props)=>{
            return {showGrid: !prevState.showGrid}
        });
    }
    render(){        
        return(
            <div>
                <section className="top-filter" style={{ height: "44px" }}>
                    <button type="button" className="btn btn-primary" style={{ width: "110px", float: "right" }}>
                        <img src="/images/icons/fugue/plus-circle.png" alt="add plant" title="Add Plant Fault" style={{ float: "left", paddingRight: "5px" }} />
                        Add Graph
                    </button>
                </section>
                <div>
                <h3 onClick={this.ShowGridHandler} className={`accordion-${this.state.showGrid?'openheader':'header'}`} role="tab" id="ui-accordion-accordion-header-0" aria-controls="ui-accordion-accordion-panel-0" aria-selected="false" tabindex="0">
                {this.state.showGrid?
                    <div>
                    <span classname='ui-icon-triangle-1-t' style={{
                        position: "absolute",
                        left: ".5em",
                        top: "50%",
                        marginTop: "-8px",
                        backgroundImage: "url(https://nocc.azurepower.com/css/ui-datepicker/images/ui-icons_ef8c08_256x240.png)",
                        backgroundPosition:" -64px -16px",
                        width: "16px",
                        height: "16px"
                    }}></span>
                    </div>
                    :
                    <div>
                    <span classname='ui-icon-triangle-1-s' style={{
                        position: "absolute",
                        left: ".5em",
                        top: "50%",
                        marginTop: "-8px",
                        backgroundImage: "url(https://nocc.azurepower.com/css/ui-datepicker/images/ui-icons_ef8c08_256x240.png)",
                        backgroundPosition:" -32px -16px",
                        width: "16px",
                        height: "16px"
                    }}></span>
                    </div>}
                    {/* <span classname={`ui-icon-triangle-1-${this.state.showGrid?'s':'t'}`}></span> */}
                    SECI GBU NOIDA
                </h3>
                    <div className="ui-widget-content"
                        id="ui-accordion-accordion-panel-0" aria-labelledby="ui-accordion-accordion-header-0" role="tabpanel"
                        style={{
                            display: this.state.showGrid ? 'block' : 'none'
                        }}
                        aria-expanded="true" aria-hidden="false">
                        <table id="t-list">
                            <tbody><tr>
                                <th className="txtSdw">Sr No.</th>
                                <th className="txtSdw">Graph Tile</th>
                                <th className="txtSdw">Action</th>
                            </tr>
                                <tr id="graph1008">
                                    <td>1</td>
                                    <td>E TOTAL _SECI GBU NOIDA</td>
                                    <td>
                                        <Link to="/" title="View Graph">
                                            <img alt="chart" src="/images/icons/fugue/chart.png"/></Link>
                                        &nbsp;
	                				<Link to="/" title="Edit Graph">
                                            <img alt="edit" src="/images/editIcon.png"/></Link>
                                        &nbsp;
	                				<Link to="/" title="Delete Graph">
                                            <img alt="delete" src="/images/cross-circle.png"/></Link>

                                    </td>
                                </tr>
                            </tbody></table>

                    </div>
                </div>
            </div>
        );
    }
}
export default GraphComponent