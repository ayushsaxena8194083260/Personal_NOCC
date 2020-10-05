import React, { Component } from 'react';
// import axios from 'axios';
import {createOrUpdatePlant} from "../../../../../actions"
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import '../../../../../styles/plant/plantAddEdit.scss';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { renderGraphDetailsByPageId, getGraphsSettings, createUpdatePage, createUpdatePageGraph, deletePageGraphId } from '../../../../../actions/action-Settings';

const rowIndex = (params) => params.node.rowIndex + 1;
class AddEditPagedetails extends Component{
    constructor(props){
        super(props);
        if(this.props.location.pageDetails!== undefined){
            this.state={
                pageDetails:this.props.location.pageDetails === undefined? 'Default':this.props.location.pageDetails,
                pageID:this.props.location.pageDetails === undefined? '':this.props.location.pageDetails.pageID,
                graphByPageId:[],
                pageGraphId:[],
                gridOptions: this.createGridOptions(),
                domLayout: "autoHeight",
                pageType:'Edit Page',
                enableStringText: false,
                enablenewStringText : false,
                selectedStringText :null,
                stringName:'',
                newGraphId:'',
                graphs:[],
                submitedFields: ["pageName", "pageFeed"]
            }
        }
        else{
            this.state={
                plantFault:this.props.location.pageDetails === undefined? 'Default':this.props.location.pageDetails,
                gridOptions: this.createGridOptions(),
                domLayout: "autoHeight",
                pageType:'Add Page'
            }
        }
        this.handleStringUpdate = this.handleStringUpdate.bind(this);
        this.updateStringName = this.updateStringName.bind(this);
        this.handleStringDelete = this.handleStringDelete.bind(this);
    }
    createGridOptions() {
        return {
            columnDefs: [
                { headerName: "S.No.",width:400, lockPosition: true, valueGetter: rowIndex, field: "make",autoHeight: true, },
                { headerName: "GroupName",width:400, field: "pageGroupName" },
                { headerName: "Action",width:400, field:''}],
			suppressHorizontalScroll:false,
        }
    }

    handleChange(event){
        let _data = this.state.pageDetails;
        _data[event.target.name] = event.target.value;
        this.setState({ pageDetails: _data});
    }

    componentDidMount(){
        this.props.renderGraphDetailsByPageId(this.state.pageDetails.pageId);
        
    }

    componentWillReceiveProps(nextProps) {
        // const { match: { params } } = this.props;
        // const { id } = params;
if(nextProps!= null){
    const stateDup = this.state;
    if(nextProps.graphByPageId!= undefined){
    
    for(var i=0;i<nextProps.graphByPageId.length;i++){
        if(i%2==0){
        stateDup.pageGraphId[stateDup.pageGraphId.length] = nextProps.graphByPageId[i];
    }
    else{
        stateDup.graphByPageId[stateDup.graphByPageId.length] = nextProps.graphByPageId[i];
    }
    }
    stateDup.graphs = nextProps.graphs;
        this.setState({ stateDup });
        if(nextProps.graphs===undefined){
        this.props.getGraphsSettings();
        }
}

}
        
    }

    handleStringUpdate(event){
        const stateDup = this.state;
        if(event.target.name === "enableStringText"){
            stateDup[event.target.name] = true;
            stateDup.selectedStringText = parseInt(event.target.id);
            stateDup.selectedpageGraphId = stateDup.pageGraphId[stateDup.selectedStringText];
        }
        else if(event.target.name === 'str_name' || event.target.name === 'new_str_name'){
            if(event.target.name === 'str_name'){
                stateDup.newGraphId = stateDup.graphs[event.target.selectedIndex-1].graphId;
            }
            else{
                stateDup.newGraphId = stateDup.graphs[event.target.selectedIndex].graphId;
            }
        }
        else if(event.target.name === 'newGraph'){
            if(stateDup.graphByPageId.length >= 4){
                alert('Only 4 Graphs can be added per page'); 
            }
            else{
                stateDup.enablenewStringText = true;
            }
            
        }
                
        this.setState({stateDup});

    }

    updateStringName(){
        const pageGraphDetails = {
            pageGraphId : this.state.selectedpageGraphId!=undefined?this.state.selectedpageGraphId:0,
            pageId: this.state.pageDetails.pageId,
            graphId : this.state.newGraphId
        }

        this.props.createUpdatePageGraph(pageGraphDetails);
        alert('Page Graph has been created/updated successfully');
        this.props.history.push('/ShowPage');
    }

    handleStringDelete(event){
        this.props.deletePageGraphId(this.state.pageGraphId[parseInt(event.target.id)]);
        alert('Page Graph has been deleted successfully');
        this.props.history.push('/ShowPage');
    }

    fieldValid() {
        let inValid = false;

        this.state.submitedFields.map((item) => {
            if (!this.state.pageDetails[item]) {
                inValid = true;
            }
        })
        return inValid;
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.pageDetails !== null &&  this.fieldValid() === false) {
            this.props.createUpdatePage(this.state.pageDetails);
            alert('Page has been updated successfully');
            this.props.history.push('/ShowPage');
        }

        this.setState({ isSubmited: true });
    }

    render(){
        return(
            <div>
                <Card className="add-plant-card" style={{width:"60%"}}>
                  <Card.Header as="h5">{this.state.pageType}</Card.Header>
                  <Card.Body>
                    <Row>
                        <Col>
                            <Form.Label>Page Name<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                            <Form.Control type="text" name="pageName" value={this.state.pageDetails.pageName} onChange={item=>this.handleChange(item)}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Page Feed<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                            <Form.Control as="textarea" name="pageFeed" value={this.state.pageDetails.pageFeed} rows="2" onChange={item=>this.handleChange(item)}/>
                        </Col>
                    </Row>
                    
                    
                    <Row>
                        <Col>
                        </Col>
                        <Col md={2}>
                        <Button variant="primary" size="md" onClick={this.onSubmit} block>Submit</Button>
                        </Col>
                        <Col>                      
                        </Col>
                    </Row>
                    
                </Card.Body>
                
            </Card>
            {this.state.pageType === 'Edit Page'?
                <div>
                    <Row style={{margin:0}}>
                    <Col></Col>
                    <Col xs={2} style={{ maxWidth: "15%" }}>
                                <button type="button" className="btn btn-primary" style={{ width: "100%" }} name="newGraph" onClick={this.handleStringUpdate}>
                                    <img src="/images/icons/fugue/plus-circle.png" alt="add plant" title="Add String" style={{ float: "left", marginRight: "3" }} />
                                    Add Graph
                                </button>
                        </Col>
                    </Row>
                    <table id="t-list">
                    <tr>
                        <th>S.NO.</th>
                        <th>Graph Name</th>
                        <th>Action</th>
                    </tr>
                    {this.props.graphByPageId === undefined?'':this.state.graphByPageId.map((graph,key) => 
                    <tr>
                        <td>{key+1}</td>
                            {this.state.enableStringText===true && this.state.selectedStringText===key?
                            <td>
                            <select required class="form-control" type="dropdown" name="str_name" onChange={(item) => this.handleStringUpdate(item)} >
                                    {/* value={this.state.selectedPlant} plant_name={this.state.selectedPlant} */}
                                    <option>{graph}</option>
                                    {/* <option>{this.state.plans[0].plant_name}</option> */}
                                    {this.props.graphs === undefined?<option>default</option>:this.props.graphs.map((graph, key) => <option graphId={graph.graphId}>{graph.graphName}</option>)}
                                </select>    
                            {/* <input type="text" name="str_name" onChange={this.handleStringUpdate} /> */}
                            </td>:
                            <td>{graph}</td>
                            }
                            {this.state.enableStringText===true && this.state.selectedStringText===key? 
                            <td>
                            <a name="enableStringText" onClick={this.updateStringName}>
                                <img name="enableStringText" id={key} alt='' src="/images/icons/fugue/control.png"/>
                            </a>
                            </td>:
                            <td>
                                <a name="enableStringText" onClick={this.handleStringUpdate}>
                                    <img name="enableStringText" id={key} alt=''  src="/images/editIcon.png"/>
                                </a>
                                <a onClick={this.handleStringDelete}>
                                    <img id={key} alt=''  src="/images/cross-circle.png"/>
                                </a>
                            </td>
                        }
                    </tr>
                    )}
                    {this.state.enablenewStringText===true?
                        <tr>
                        <td>{this.props.graphByPageId.length+1}</td>
                        <td>
                        <select required class="form-control" type="dropdown" name="new_str_name" onChange={(item) => this.handleStringUpdate(item)} >
                                    {/* value={this.state.selectedPlant} plant_name={this.state.selectedPlant} */}
                                    {/* <option>{this.state.plans[0].plant_name}</option> */}
                                    {this.props.graphs === undefined?<option>default</option>:this.props.graphs.map((graph, key) => <option graphId={graph.graphId}>{graph.graphName}</option>)}
                                </select> 
                        </td>
                        <td>
                                <a name="enableStringText" onClick={this.updateStringName}>
                                    <img name="enableStringText" src="/images/icons/fugue/control.png"/>
                                </a>
                                </td>
                                </tr>
                                :''}

                    </table>
                    </div>
            :""}
           
        </div>
        )
    }
}
const mapStateToProps = state => {
    return {

        plant: state.plant,
        plants: state.plants.allplants,
        graphByPageId : state.SettingsReducer.graphByPageId,
        graphs: state.SettingsReducer.graphs
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createOrUpdatePlant: (plant) => dispatch(createOrUpdatePlant(plant)),
        renderGraphDetailsByPageId : (pageId) => dispatch(renderGraphDetailsByPageId(pageId)),
        getGraphsSettings : () => dispatch(getGraphsSettings()),
        createUpdatePage : (pageDetails) => dispatch(createUpdatePage(pageDetails)),
        createUpdatePageGraph : (pageGraphDetais) => dispatch(createUpdatePageGraph(pageGraphDetais)),
        deletePageGraphId : (pageGraphId) => dispatch(deletePageGraphId(pageGraphId))
    }
}
export default  withRouter(connect(mapStateToProps,mapDispatchToProps)(AddEditPagedetails)) ;