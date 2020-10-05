import React, { Component } from 'react';
import {getAllPlants, deletePlant} from "../../actions"
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom';
import {Route} from 'react-router-dom';
import {AgGridReact} from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import '../../App.scss';

import ActualGenerateModal from './actualGenerateModal';
const rowIndex = (params) => params.node.rowIndex + 1;
	

class ActionCellRenderer extends Component {
	constructor(props) {
		super(props);
		this.invokeDelete = this.invokeDelete.bind(this);
		this.invokeActualGeneration = this.invokeActualGeneration.bind(this);
	}

	invokeDelete() {
		this.props.context.componentParent.onDelete(this.props.node.data.plantId,this.props.node.data.plantName);
		
	}

	invokeActualGeneration(){
		const lgshow = true;
		this.props.context.componentParent.faultGeneration(lgshow);
	}
	render() {
	return (<div className="products-actions">
	    <Link to={{
			pathname: "/plantAddEdit",
			plant: this.props.data
		}} title="Edit">
		<img src="https://nocc.azurepower.com/images/editIcon.png" alt="Edit"/>
		</Link>
		<Link
			to={{
				pathname: "/plantDetails",
				plant: this.props.data
			}} title="Details">
			<img src="https://nocc.azurepower.com/images/icons/fugue/magnifier.png" alt="Detail"/>
		</Link>
		{/* ()=>{this.setState({lgShow:true})} */}
		<Link  to="#" onClick={this.invokeActualGeneration} title="Actual Generation">
		<img src="https://nocc.azurepower.com/images/icons/fugue/plus-circle.png" alt="Actual Generation"/>
		</Link>
		<Link to="/" title="Forecast">
		<img src="https://nocc.azurepower.com/images/icons/fugue/plus-circle-blue.png" alt="Forecast"/>
		</Link>
		<Link to={{
				pathname: "/plantHistory",
				plant: this.props.data
			}} title="History">
		<img src="https://nocc.azurepower.com/images/icons/fugue/database.png" alt="History"/>
		</Link>
		<Link
			to="#" onClick={this.invokeDelete} title="Delete" >
		<img src="https://nocc.azurepower.com/images/cross-circle.png" alt="Delete"/>
		</Link>
		</div>);
	    }
	}

	
class PlantComponent extends Component {
		
	constructor(props) {
		super(props);
		this.state = {
		// modules: AllModules,
		gridOptions: this.createGridOptions(),
		domLayout: "autoHeight",
		defaultColDef: {
			sortable: false,
			filter: false
		  },
		  rowSelection: "multiple",
		  excelStyles: [
			{
			  id: "booleanType",
			  dataType: "boolean"
			},
			{
			  id: "stringType",
			  dataType: "string"
			},
			{
			  id: "dateType",
			  dataType: "dateTime"
			}
		  ],
		suppressHorizontalScroll:true,
		lgShow: false,
		deleteShow:false,
		context: { componentParent: this },
		overlayLoadingTemplate: '<span class="ag-overlay-loading-center"><div class="loader"></div><div style="text-align:center">Loading!</div></span>',
		overlayNoRowsTemplate: "<span style=\"padding: 10px; border: 2px solid #444; background: lightgoldenrodyellow;\">This is a custom 'no rows' overlay</span>"
		
	}
	}
	onGridReady = params => {
		this.gridApi = params.api;
		this.gridColumnApi = params.columnApi;
		
	  };
	
	onBtExport() {
		var params = {
		  fileName: document.querySelector("#myGrid").value,
		  sheetName: document.querySelector("#myGrid").value
		};
		this.gridApi.exportDataAsCsv(params);
	}

	onDelete(_id,plantName) {
		let isConfirm = window.confirm("Are you sure want to delete this plant?");
		if (isConfirm)
			this.props.deletePlant(_id,plantName);
	}

	faultGeneration(lgShowValue){
		this.setState({
			...this.state,
			lgShow:lgShowValue
		})
	}

	createGridOptions() {
        return {
			columnDefs :[
        	{headerName: 'Sr No.', lockPosition: true, valueGetter: rowIndex, width:100,cellClass: 'cell-wrap',
			autoHeight: true,cellStyle: { 'white-space': 'normal' },sortable: true,},
            {headerName: "Plant Name", field: "plantName",width:220,cellClass: 'cell-wrap',
			autoHeight: true,cellStyle: { 'white-space': 'normal' },sortable: true, lockPosition: true},
            {headerName: "Plant Type", field: "type",width:165,cellClass: 'cell-wrap',
			autoHeight: true,sort:"asc", lockPosition: true},
			{headerName: "Location", field: "location",width:200,cellClass: 'cell-wrap',
			autoHeight: true,cellStyle: { 'white-space': 'normal' },sortable: true, lockPosition: true},
			{headerName: "Tariff", field: "tariff",width:85,cellClass: 'cell-wrap',
			autoHeight: true,cellStyle: { 'white-space': 'normal' },sortable: true, lockPosition: true},
			{headerName: "Date Of Commissioning", field: "commissioningDate",width:190,cellStyle: { 'white-space': 'normal'},cellClass: 'cell-wrap',
			autoHeight: true,sort: "asc", lockPosition: true},
			{headerName: "Capacity", field: "plantCapacityAc",width:110,cellClass: 'cell-wrap',
			autoHeight: true,cellStyle: { 'white-space': 'normal' },sortable: true, lockPosition: true},
			{
				headerName: 'Action',
				field: '',
				width: 150,
				cellRendererFramework: ActionCellRenderer,
				cellRendererParams:{
					lgShow:this.lgShow
				}
			}
			],
			suppressHorizontalScroll:false,
		};
	    }
		componentDidMount() {
			// document.title = 'Plant Fault Data';
			this.props.getAllPlants();
		}

		render() {
			// const classes = makeStyles(theme => ({
			// 	root: {
			// 		width: '100%',
			// 		marginTop: theme.spacing(3),
			// 		overflowX: 'auto',
			// 	},
			// 	table: {
			// 		minWidth: 650,
			// 	},
			// }));
			const ModalClose = () => {
				this.setState({lgShow:false});
				this.setState({deleteShow:false});
				}
			// const [lgShow, setLgShow] = useState(false);		

			return (
				<div>
					<div>
    					<button type="submit" className="download-button-plant" name="submit" onClick={this.onBtExport.bind(this)} value="submit" title="Download"></button>
        			</div>
							<div id="myGrid"
							style={{ 
        			// height: '500px',
					maxWidth:"1222px",
					margin:"auto" 
        			}}
					className="ag-theme-material">
					<AgGridReact
						// properties
						// modules={this.state.modules}
						gridOptions={this.state.gridOptions}
						rowData={this.props.plants}
						defaultColDef={this.state.defaultColDef}
						rowSelection={this.state.rowSelection}
						excelStyles={this.state.excelStyles}
						context={this.state.context}
        			    domLayout={this.state.domLayout}
						suppressDragLeaveHidesColumns="true"
						enableCellTextSelection="true"
						// groupMultiAutoColumn={true}
						// events
						overlayLoadingTemplate={this.state.overlayLoadingTemplate}
        			    overlayNoRowsTemplate={this.state.overlayNoRowsTemplate}
						onGridReady={this.onGridReady}>
					</AgGridReact>
					{/* <div className="modal-main"> */}

					<ActualGenerateModal
						show={this.state.lgShow}
						onHide={ModalClose}
					/>
					{/* </div> */}
					{/* <DeletePlantModal
						show={this.state.deleteShow}
						onHide={ModalClose}
					/> */}
					<Route render={({ history}) => (
					<div onClick={() => { history.push('/plantAddEdit')}} className="float" title="Add Plant">
					<i className="fa fa-plus my-float"></i>
					</div>
					)} />

					</div>
		</div>
			);
		}
	}

const mapStateToProps = state => {
    return {
        plants: state.plants.allplants,
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
		getAllPlants: () => dispatch(getAllPlants()),
		deletePlant: (_id) => dispatch(deletePlant(_id)),
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PlantComponent))
