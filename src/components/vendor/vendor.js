import React, { Component } from 'react';
import { getAllVendors, deleteVendor } from "../../actions"
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import {AgGridReact} from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
// import '../../styles/plant/vendor.scss';
import '../../styles/plant/plantFaultData.scss';
// import { AllModules } from '@ag-grid-enterprise/all-modules';
const rowIndex = (params) => params.node.rowIndex + 1;

class ActionCellRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.invokeDelete = this.invokeDelete.bind(this);
    }

    invokeDelete() {
        this.props.context.componentParent.onDelete(this.props.node.data.vendorId);
    }
    render() {
        return (<div className="products-actions">
            <Link className="products-actions-link"
                to={{
                    pathname: "/vendorAddEdit",
                    vendor: this.props.data
                }}>
                <img src="/images/editIcon.png" alt="Edit" />
            </Link>
            <Link to="#" onClick={this.invokeDelete} title="Delete" >
                <img src="/images/cross-circle.png" alt="Delete" />
            </Link>
        </div>);
    }
}

class VendorComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // modules: AllModules,
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
            columnDefs: this.createColumnDefs(),
            lgShow: false,
            context: { componentParent: this },

        }

    }
    onGridReady = params => {
		this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        // params.api.setHeaderHeight(70);
	  };

	onBtExport() {
		var params = {
		  fileName: document.querySelector("#myGrid").value,
		  sheetName: document.querySelector("#myGrid").value
		};
		this.gridApi.exportDataAsCsv(params);
	}
    onDelete(_id) {
        let isConfirm = window.confirm("Are you sure want to delete this vendor?");
        if (isConfirm)
            this.props.deleteVendor(_id);
    }

    createColumnDefs() {
        return [
            { headerName: "Sr. No.", valueGetter: rowIndex, width: 120 },
            { headerName: "Company Name", field: "companyName", width: 220,cellClass: 'cell-wrap',
                autoHeight: true, cellStyle: { 'white-space': 'normal' },sortable:false,sort: "asc" }, 
            { headerName: "Description", field: "description", width: 220 },
            { headerName: "Contact Name", field: "contactName", width: 220,cellClass: 'cell-wrap',autoHeight: true, cellStyle: { 'white-space': 'normal' } },
            { headerName: "Address", field: "address", width: 310,cellClass: 'cell-wrap',autoHeight: true, cellStyle: { 'white-space': 'normal' } },
            { headerName: "Contact Number", field: "contactNo", width: 150,cellClass: 'cell-wrap',autoHeight: true, cellStyle: { 'white-space': 'normal' } },
            {
                headerName: "Action",
                field: '',
                cellRendererFramework: ActionCellRenderer,
                width: 100,
            }
        ];
    }
    componentDidMount() {
        // document.title = 'Plant Fault Data';
        this.props.getAllVendors();
    }

    render() {
        // const classes = makeStyles(theme => ({
        //     root: {
        //         width: '100%',
        //         marginTop: theme.spacing(3),
        //         overflowX: 'auto',
        //     },
        //     table: {
        //         minWidth: 650,
        //     },
        // }));

        return (
            <div>
                <div>
    	            <button type="submit" class="download-button-plant" name="submit" onClick={this.onBtExport.bind(this)} value="submit" title="Download"></button>
                </div>
                <div id="myGrid"
                    style={{
                        height: '500px',
                    }}
                    className="ag-theme-material">
                    <AgGridReact
                        // modules={this.state.modules}
                        defaultColDef={this.state.defaultColDef}
			            rowSelection={this.state.rowSelection}
			            excelStyles={this.state.excelStyles}
                        columnDefs={this.state.columnDefs}
                        rowData={this.props.vendors}
                        context={this.state.context}
                        enableSorting
                        animateRows={true}
                        onGridReady={this.onGridReady}>
                    </AgGridReact>




                </div>
                <Route render={({ history }) => (
                        <div onClick={() => { history.push('/vendorAddEdit') }} className="float" title="Vendor">
                            <i className="fa fa-plus my-float"></i>
                        </div>
                    )} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {

        vendors: state.vendors.allvendors,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllVendors: () => dispatch(getAllVendors()),
        deleteVendor: (_id) => dispatch(deleteVendor(_id)),
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VendorComponent));
