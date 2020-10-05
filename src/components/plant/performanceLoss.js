import React, { Component } from 'react'
    ;
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Picky from 'react-picky';
import 'react-picky/dist/picky.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import '../../styles/plant/plantFaultData.scss';
import DropDown from "../Common/DropDown";
import { AgGridReact } from "ag-grid-react"

const rowIndex = (params) => params.node.rowIndex + 1;

class CustomPinnedRowRenderer extends Component {
    render() {
        return (
            <span>{this.props.value}</span>
        );
    }
}
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
                    pathname: "/performanceLossEdit",
                    performanceLossRowData: this.props.data
                }}>
                <img src="https://nocc.azurepower.com/images/editIcon.png" alt="Edit" />
            </Link>
        </div>);
    }
}

class PerformanceLoss extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDuration: null,
            plantTypes: this.props.plantTypes,
            selectedPlantType: '',
            plant_id: '',
            plants: [],
            selectedPlant: "",
            selectedPlantOptions: [],
            plantIds: [],
            plantNames: [],
            showRow: false,
            fromDate: this.getMonthStartDate(),
            toDate: this.getCurrentDate(),
            perfLossResult: null
        };
        this.selectMultipleOption = this.selectMultipleOption.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChangeToDate = this.handleChangeToDate.bind(this);
    }
    getCurrentDate() {
        var today = new Date();
        var d = today.getDate();
        var m = today.getMonth() + 1;
        var y = today.getFullYear();
        var data;

        if (d < 10) {
            d = "0" + d;
        };
        if (m < 10) {
            m = "0" + m;
        };

        data = y + "-" + m + "-" + d;
        return data;
    }
    getMonthStartDate() {
        var today = new Date();
        var d = 1;
        var m = today.getMonth() + 1;
        var y = today.getFullYear();
        var data;

        if (d < 10) {
            d = "0" + d;
        };
        if (m < 10) {
            m = "0" + m;
        };

        data = y + "-" + m + "-" + d;
        return data;
    }

    handleChangeDuration(event) {
        const selectedValue = event.target.value;
        this.setState({ selectedDuration: selectedValue, showRow: false, fromDate: '', toDate: '', selectedPlantOptions: [], selectedPlantType: '' })

    }

    handleChangePlant(event) {
        if (event.target.name === "plant_type") {
            const stateDup = this.state;
            stateDup.selectedPlantType = event.target.value;
            this.setState({ stateDup });

            this.props.getPlantByType(stateDup.selectedPlantType);
        }
        else {
            const stateDup1 = this.state;
            let plantsByType = this.props.plantsByType;
            stateDup1.selectedPlant = event.target.value;
            for (var i = 0; i < plantsByType.length; i++) {
                if (plantsByType[i].plantName === event.target.value) {
                    stateDup1.plant_id = plantsByType[i].plantId;
                    break;
                }
            }

            this.setState({ stateDup1 });

            //this.props.getPlantTiltByPlantId(stateDup1.plant_id,stateDup1.selectedPlant,stateDup1.selectedPlantType);
        }
    }

    handleChangePlantType(event) {
        const selectedValue = event.target.value;
        if (selectedValue !== this.state.selectedPlantType) {
            this.props.getPlantByType(selectedValue);

            this.setState({ selectedPlantType: selectedValue, showRow: false, fromDate: '', toDate: '', selectedPlantOptions: [] });
        }

    }


    getRenderPlantFault() {
        let plantIds = [];
        let plantNames = [];
        this.state.selectedPlantOptions && this.state.selectedPlantOptions.length > 0 && this.state.selectedPlantOptions.map((item) => { plantIds.push(item.id) });
        this.state.selectedPlantOptions && this.state.selectedPlantOptions.length > 0 && this.state.selectedPlantOptions.map((item) => { plantNames.push(item.name) });

    }


    handleChangeFromDate(event) {
        const selectedDate = event.target.value;
        this.setState({ fromDate: selectedDate, showRow: false, toDate: '' });
    }

    handleChangeToDate(event) {

        const stateDup = this.state;
        stateDup.plantIds = [];
        stateDup.plantNames = [];
        stateDup.selectedPlantOptions && stateDup.selectedPlantOptions.length > 0 && stateDup.selectedPlantOptions.map((item) => { stateDup.plantIds.push(item.id) });
        stateDup.selectedPlantOptions && stateDup.selectedPlantOptions.length > 0 && stateDup.selectedPlantOptions.map((item) => { stateDup.plantNames.push(item.name) });
        stateDup.toDate = event.target.value;
        this.setState({ stateDup });
        let data = null;

        if (this.state.selectedDuration === 'DAILY') {
            data = {
                "dataFlag": 1,
                "fromDate": stateDup.toDate,
                "plantIds": stateDup.plantIds,
                "plant_id": 0,
                "toDate": stateDup.toDate,
                "year": ""

            }
        }
        else {
            data = {
                "dataFlag": 2,
                "fromDate": stateDup.fromDate,
                "plantIds": stateDup.plantIds,
                "plant_id": 0,
                "toDate": stateDup.toDate,
                "year": ""

            }
        }
        this.props.getPerformanceLossByPlantIdsPeriod(data);
    }

    getPlantTypesDropDownOptions() {
        const options = this.state.plantTypes && this.state.plantTypes.map((plantTypes, key) => { return { id: plantTypes.plantId, name: plantTypes.plantName } });
        return options;
    }


    selectMultipleOption(value) {
        this.setState({ selectedPlantOptions: value, showRow: false, fromDate: '', toDate: '' });
    }

    // onDelete(_id) {
    //     let isConfirm = window.confirm("Are you sure want to delete this Plant Fault?");
    //     if (isConfirm)
    //         this.props.deletePlantFaultData(_id);
    // }

    createColumnDefs() {
        return [
            {
                headerName: "Action",
                field: 'action',
                cellRendererFramework: ActionCellRenderer,
                // pinnedRowCellRenderer: CustomPinnedRowRenderer,
                width: 50,
                // pinned: "left"
            },
            {
                headerName: "Plant", field: "plant_name", cellClass: 'cell-wrap',
                autoHeight: true, width: 60, cellStyle: { 'white-space': 'normal' },
                // cellStyle: cellStyle,
                // pinned: "left"
            },
            {
                headerName: "Date", field: "date", cellClass: 'cell-wrap',
                autoHeight: true, width: 60, cellStyle: { 'white-space': 'normal' },
                // pinned: "left"
                // cellStyle: cellStyle,
            },
            {
                headerName: "Insolation", field: "insolation", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' },
                // cellClassRules: ragCellClassRules,
                // cellRenderer: ragRenderer,
                cellStyle: cellStyle,


            },
            {
                headerName: "Downtime Loss", field: "downtimeLoss", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' },
                cellStyle: cellStyle10,
            },
            {
                headerName: "Grid Outage Loss", field: "gridOutageLoss", cellClass: 'cell-wrap',
                autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' },
                cellStyle: cellStyle6,
            },
            {
                headerName: "Soiling Loss", field: "soilingLoss", cellClass: 'cell-wrap',
                autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' },
                cellStyle: cellStyle18,
            },
            {
                headerName: "Tilt Loss", field: "tiltLoss", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' },
                cellStyle: cellStyle19,
            },
            {
                headerName: "Commissioning Loss", field: "commissioningLoss", cellClass: 'cell-wrap',
                autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' },
                cellStyle: cellStyle7,
            },
            {
                headerName: "DC Cable Loss", field: "dcCableLoss", cellClass: 'cell-wrap',
                autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' },
                cellStyle: cellStyle8,
            },
            {
                headerName: "AC Loss", field: "acCableLoss", cellClass: 'cell-wrap',
                autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' },
                cellStyle: cellStyle2,
            },
            {
                headerName: "Inverter Efficiency", field: "inverterEfficiency", cellClass: 'cell-wrap',
                autoHeight: true, width: 140, cellStyle: { 'white-space': 'normal' },
                cellStyle: cellStyle13,
            },
            {
                headerName: "Auxilary Loss", field: "auxilaryLoss", cellClass: 'cell-wrap',
                autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' },
                cellStyle: cellStyle5,
            },
            {
                headerName: "Transmission Loss", field: "transmissionLoss", cellClass: 'cell-wrap',
                autoHeight: true, width: 140, cellStyle: { 'white-space': 'normal' },
                cellStyle: cellStyle20,
            },
            {
                headerName: "Inveter clipping Loss", field: "inverterClippingLoss", cellClass: 'cell-wrap',
                autoHeight: true, width: 140, cellStyle: { 'white-space': 'normal' },
                cellStyle: cellStyle12,
            },
            {
                headerName: "Generation", field: "actualGeneration", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' },
                cellStyle: cellStyle3,
            },
            {
                headerName: "Model Generation", field: "modelGeneration", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' },
                cellStyle: cellStyle14,
            },
            {
                headerName: "Actual Temperature Loss", field: "actualTempLoss", cellClass: 'cell-wrap',
                autoHeight: true, width: 140, cellStyle: { 'white-space': 'normal' },
                cellStyle: cellStyle4,
            },
            {
                headerName: "IAM Loss", field: "iamLoss", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' },
                cellStyle: cellStyle11,
            },
            {
                headerName: "PV Loss", field: "pvLoss", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' },
                cellStyle: cellStyle16,
            },
            {
                headerName: "De-Rate", field: "derate", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' },
                cellStyle: cellStyle9,
            },
            {
                headerName: "Module Quality", field: "moduleQuality", cellClass: 'cell-wrap',
                autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' },
                cellStyle: cellStyle15,
            },
            {
                headerName: "Array Mismatch", field: "arrayMismatch", cellClass: 'cell-wrap',
                autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' },
                // cellStyle: cellStyle,
            },
            {
                headerName: "Shading Loss", field: "shadingLoss", cellClass: 'cell-wrap',
                autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' },
                cellStyle: cellStyle17,

            },
            {
                headerName: "Budget Insolation", field: "budgetInsolationLoss", cellClass: 'cell-wrap',
                autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' },
                // cellStyle: cellStyle,
            },
            {
                headerName: "Budget Downtime", field: "budgetDowntimeLoss", cellClass: 'cell-wrap',
                autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' },
                // cellStyle: cellStyle,
            },
            {
                headerName: "Budget Grid Outage", field: "budgetGridFailureLoss", cellClass: 'cell-wrap',
                autoHeight: true, width: 140, cellStyle: { 'white-space': 'normal' },
                // cellStyle: cellStyle,
            },
            {
                headerName: "Budget Temperature", field: "budgetTemperatureLoss", cellClass: 'cell-wrap',
                autoHeight: true, width: 120, cellStyle: { 'white-space': 'normal' },
                // cellStyle: cellStyle,
            },

        ];
    }
    pinnedTopRowData() {
        let totalInsolation = 0;
        let totalDowntimeLoss = 0;
        let totalGridOutageLoss = 0;
        let totalSoilingLoss = 0;
        let totalTiltLoss = 0;
        let totalCommissioningLoss = 0;
        let totalDcCableLoss = 0;
        let totalAcCableLoss = 0;
        let totalInverterEfficiency = 0;
        let totalAuxilaryLoss = 0;
        let totalTransmissionLoss = 0;
        let totalInverterClippingLoss = 0;
        let totalActualGeneration = 0;
        let totalModelGeneration = 0;
        let totalActualTempLoss = 0;
        let totalIamLoss = 0;
        let totalPvLoss = 0;
        let totalDerate = 0;
        let totalModuleQuality = 0;
        let totalArrayMismatch = 0;
        let totalShadingLoss = 0;
        let totalBudgetInsolationLoss = 0;
        let totalBudgetDowntimeLoss = 0;
        let totalBudgetGridFailureLoss = 0;
        let totalBudgetTemperatureLoss = 0;

        let data = this.props.perfLossByPlantIdsDate !== undefined ? this.props.perfLossByPlantIdsDate : null

        data && data.length > 0 && data.map((item) => {
            totalInsolation += parseFloat(item.insolation)
            totalDowntimeLoss += parseFloat(item.downtimeLoss)
            totalGridOutageLoss += parseFloat(item.gridOutageLoss)
            totalSoilingLoss += parseFloat(item.soilingLoss)
            totalTiltLoss += parseFloat(item.tiltLoss)
            totalCommissioningLoss += parseFloat(item.commissioningLoss)
            totalDcCableLoss += parseFloat(item.dcCableLoss)
            totalAcCableLoss += parseFloat(item.acCableLoss)
            totalInverterEfficiency += parseFloat(item.inverterEfficiency)
            totalAuxilaryLoss += parseFloat(item.auxilaryLoss)
            totalTransmissionLoss += parseFloat(item.transmissionLoss)
            totalInverterClippingLoss += parseFloat(item.inverterClippingLoss)
            totalActualGeneration += parseFloat(item.actualGeneration)
            totalModelGeneration += parseFloat(item.modelGeneration)
            totalActualTempLoss += parseFloat(item.actualTempLoss)
            totalIamLoss += parseFloat(item.iamLoss)
            totalPvLoss += parseFloat(item.pvLoss)
            totalDerate += parseFloat(item.derate)
            totalModuleQuality += parseFloat(item.moduleQuality)
            totalArrayMismatch += parseFloat(item.arrayMismatch)
            totalShadingLoss += parseFloat(item.shadingLoss)
            totalBudgetInsolationLoss += parseFloat(item.budgetInsolationLoss)
            totalBudgetDowntimeLoss += parseFloat(item.budgetDowntimeLoss)
            totalBudgetGridFailureLoss += parseFloat(item.budgetGridFailureLoss)
            totalBudgetTemperatureLoss += parseFloat(item.budgetTemperatureLoss)
        })

        return [
            {
                plantId: '',
                plantCapacityDc: "",
                date: "",
                importData: "",
                actualGeneration: totalActualGeneration,
                noOfDays: "",
                temperatureCoefficientPower: -0.0044,
                tariff: "15",
                connectedCapacity: "10214.400000000001",
                id: 116910,
                plant_Id: 2,
                period: "2019-01-01",
                dataFlag: 2,
                insolation: totalInsolation.toFixed(2),
                downtimeLoss: totalDowntimeLoss.toFixed(2),
                gridOutageLoss: totalGridOutageLoss.toFixed(2),
                soilingLoss: totalSoilingLoss.toFixed(2),
                tiltLoss: totalTiltLoss,
                commissioningLoss: totalCommissioningLoss,
                dcCableLoss: totalDcCableLoss.toFixed(2),
                acCableLoss: totalAcCableLoss.toFixed(2),
                inverterEfficiency: totalInverterEfficiency,
                auxilaryLoss: totalAuxilaryLoss,
                transmissionLoss: totalTransmissionLoss,
                inverterClippingLoss: totalInverterClippingLoss,
                modelGeneration: totalModelGeneration.toFixed(2),
                actualTempLoss: totalActualTempLoss.toFixed(2),
                iamLoss: totalIamLoss.toFixed(2),
                pvLoss: totalPvLoss,
                derate: totalDerate.toFixed(2),
                moduleQuality: totalModuleQuality.toFixed(2),
                arrayMismatch: totalArrayMismatch.toFixed(2),
                shadingLoss: totalShadingLoss.toFixed(2),
                budgetInsolationLoss: totalBudgetInsolationLoss,
                budgetDowntimeLoss: totalBudgetDowntimeLoss,
                budgetGridFailureLoss: totalBudgetGridFailureLoss,
                budgetTemperatureLoss: totalBudgetTemperatureLoss,
                bitFlag: 0,
                plant_name: "Total",
                action: "Total"
            }
        ]
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps !== null) {
            this.setState({
                plantTypes: nextProps.plantsByType
            })
        }
    }

    onSubmit() {
        const stateDup = this.state;
        stateDup.showRow = true;
        stateDup.performanceLossData = this.props.perfLossByPlantIdsDate !== undefined ? this.props.perfLossByPlantIdsDate : '';
        for (var i = 0; i < stateDup.performanceLossData.length; i++) {
            for (var j = 0; j < stateDup.plantNames.length; j++) {
                if (stateDup.performanceLossData[i].plantId === stateDup.plantIds[j]) {
                    stateDup.performanceLossData[i]['plant_name'] = stateDup.plantNames[j];
                }
            }
        }

        this.setState({ stateDup });
    }
    // cellClass(params) {
    //     return params.data.id == 405242 ? 'rag-green' : 0;
    //   }

    getRowStyle = (params) => {
        //    console.log(params.node,'params')  
        return { background: '#008000', fontWeight: 'bold' }
    }

    render() {

        return (
            <div>
                {/* <div class="subHead">
                    <h5 style={{ fontSize: "16px" }}>
                        Performance Loss
                </h5>
                </div> */}
                <div className="top-filter">
                    <div className="row" style={{ alignItems: "center", margin: "0" }} >
                        <Col lg={1} md={1} sm={6} className="small_percent_width">
                            <Form.Label>Duration:</Form.Label>
                        </Col>
                        <Col lg={2} md={2} sm={6} className="large_percent_width">
                            <DropDown
                                className="top-search-input form-control"
                                Name="Duration"
                                itemSource={this.props.duration}
                                value={this.state.selectedDuration}
                                handleChange={(item) => this.handleChangeDuration(item)}
                            />
                        </Col>
                        <Col lg={1} md={1} sm={6} className="small_percent_width">
                            <Form.Label>Type:</Form.Label>
                        </Col>
                        <Col lg={2} md={2} sm={6} className="large_percent_width">
                            <DropDown
                                className="top-search-input form-control"
                                Name="plant_type"
                                itemSource={this.props.plantType}
                                value={this.state.selectedPlantType}
                                handleChange={(item) => this.handleChangePlantType(item)}
                            />
                        </Col>
                        <Col lg={1} md={1} sm={6} className="small_percent_width">
                            <Form.Label>Plant:</Form.Label>
                        </Col>
                        <Col lg={2} md={2} sm={6} className="large_percent_width">
                            <Picky
                                value={this.state.selectedPlantOptions}
                                options={this.getPlantTypesDropDownOptions()}
                                onChange={(val) => this.selectMultipleOption(val)}
                                open={false}
                                valueKey="id"
                                labelKey="name"
                                multiple={true}
                                includeSelectAll={true}
                                includeFilter={true}
                                dropdownHeight={250}
                                filterPlaceholder="Search"
                            />
                        </Col>
                        {this.state.selectedDuration && (this.state.selectedDuration === "MONTHLY" || this.state.selectedDuration === "YTDC")
                            && <Col lg={1} md={1} sm={6} className="small_percent_width">
                                <Form.Label>From:</Form.Label>
                            </Col>}
                        {this.state.selectedDuration && (this.state.selectedDuration === "MONTHLY" || this.state.selectedDuration === "YTDC")
                            && <Col lg={2} md={2} sm={6} className="large_percent_width">
                                <Form.Control type="date" name="fromDate" onChange={(val) => this.handleChangeFromDate(val)} value={this.state.fromDate} />
                            </Col>}
                        <Col lg={1} md={1} sm={6} className="small_percent_width">
                            <Form.Label>To:</Form.Label>
                        </Col>
                        <Col lg={2} md={2} sm={6} className="large_percent_width">
                            <Form.Control className="top-search-input" type="date" name="toDate" onChange={(val) => this.handleChangeToDate(val)} value={this.state.toDate} />
                        </Col>

                        <Col lg={2} md={2} sm={6} className="large_percent_width">
                            <Route render={({ history }) => (
                                <button type="button" className="btn btn-primary view_button" style={{ width: "100%" }} onClick={this.onSubmit}>
                                    {/* <img src="https://nocc.azurepower.com/images/icons/fugue/plus-circle.png" alt="add plant" title="Add Plant Fault" style={{ float: "left", marginRight: "3" }} /> */}
                                    View
                                </button>)} />
                        </Col>

                    </div>
                </div>
                <div
                    style={{
                        height: '500px',
                    }}
                    className="ag-theme-material taskStatistics-grid">
                    {/* {console.log(this.state.performanceLossData)} */}
                    <AgGridReact
                        columnDefs={this.createColumnDefs()}
                        getRowStyle={(params) => this.getRowStyle(params)}
                        rowData={this.state.showRow === true ? this.state.performanceLossData : ''}
                        context={{ componentParent: this }}
                        pinnedTopRowData={this.state.performanceLossData && this.state.performanceLossData.length > 0 ? this.pinnedTopRowData() : null}
                        onGridReady={this.onGridReady}>
                    </AgGridReact>
                </div>
            </div>
        );
    }
}
// var ragCellClassRules = {
//     'rag-green-outer': function (params) {
//       return params.data.iseditedinsolation == true;     

//     },
//     'rag-green-outer': function (params) {
//         return params.data.iseditedAcCableLoss == true;

//       },
//       'rag-green-outer': function (params) {

//         return params.data.iseditedActualGeneration == true;

//       },
//       'rag-green-outer': function (params) {

//         return params.data.iseditedActualTempLoss == true;

//       },
//       'rag-green-outer': function (params) {

//         return params.data.iseditedArrayMismatch == true;

//       },
//       'rag-green-outer': function (params) {

//         return params.data.iseditedAuxilaryLoss == true;

//       },
//       'rag-green-outer': function (params) {

//         return params.data.iseditedBudgetDowntimeLoss == true;

//       },
//       'rag-green-outer': function (params) {


//         return params.data.iseditedBudgetInsolationLoss == true;

//       },
//       'rag-green-outer': function (params) {


//         return params.data.iseditedBudgetTemperatureLoss == true;

//       },
//       'rag-green-outer': function (params) {


//         return params.data.iseditedCommissioningLoss == true;

//       },
//       'rag-green-outer': function (params) {


//         return params.data.iseditedDcCableLoss == true;

//       },
//       'rag-green-outer': function (params) {


//         return params.data.iseditedDerate == true;

//       },
//       'rag-green-outer': function (params) {


//         return params.data.iseditedGridOutageLoss == true;

//       },
//       'rag-green-outer': function (params) {


//         return params.data.iseditedIamLoss == true;

//       },
//       'rag-green-outer': function (params) {

//         return params.data.iseditedInverterClippingLoss == true;

//       },
//       'rag-green-outer': function (params) {

//         return params.data.iseditedInverterEfficiency == true;

//       },
//       'rag-green-outer': function (params) {


//         return params.data.iseditedModelGeneration == true;

//       },
//       'rag-green-outer': function (params) {


//         return params.data.iseditedModuleQuality == true;

//       },
//       'rag-green-outer': function (params) {


//         return params.data.iseditedPvLoss == true;

//       },
//       'rag-green-outer': function (params) {


//         return params.data.iseditedShadingLoss == true;

//       },
//       'rag-green-outer': function (params) {


//         return params.data.iseditedSoilingLoss == true;

//       },
//       'rag-green-outer': function (params) {   


//         return params.data.iseditedTiltLoss == true;
//       },
//       'rag-green-outer': function (params) {

//         return params.data.iseditedTransmissionLoss == true;
//       },
//     // 'rag-green-outer': function (params) {
//     //     return params.data.insolation >= 5.42;
//     //   },
//     // 'rag-amber-outer': function (params) {
//     //   return params.data.insolation == 6.4;
//     // },
//     // 'rag-red-outer': function (params) {
//     //   return params.data.insolation == 6.04;
//     // },
//   };
//   function ragRenderer(params) {
//     return '<span class="rag-element">' + params.value + '</span>';
//   }
function cellStyle(params) {

    if (params.data.iseditedinsolation) {
        // var color = numberToColor( params.data.iseditedinsolation);
        return { backgroundColor: "#FFA500" };

    }
}
function cellStyle2(params) {

    var color = numberToColor(params.data.iseditedAcCableLoss);
    return { backgroundColor: color };

} function cellStyle3(params) {

    var color = numberToColor(params.data.iseditedActualGeneration);
    return { backgroundColor: color };

}
function cellStyle4(params) {
    var color = numberToColor(params.data.iseditedActualTempLoss);
    return { backgroundColor: color };

}
function cellStyle5(params) {
    var color = numberToColor(params.data.iseditedAuxilaryLoss);
    return { backgroundColor: color };
}
function cellStyle6(params) {
    var color = numberToColor(params.data.iseditedGridOutageLoss);
    return { backgroundColor: color };
}
function cellStyle7(params) {
    var color = numberToColor(params.data.iseditedCommissioningLoss);
    return { backgroundColor: color };

}
function cellStyle8(params) {

    var color = numberToColor(params.data.iseditedDcCableLoss);
    return { backgroundColor: color };

}
function cellStyle9(params) {

    var color = numberToColor(params.data.iseditedDerate);
    return { backgroundColor: color };

}
function cellStyle10(params) {

    var color = numberToColor(params.data.iseditedDowntimeLoss);
    return { backgroundColor: color };

}
function cellStyle11(params) {

    var color = numberToColor(params.data.iseditedIamLoss);
    return { backgroundColor: color };

}
function cellStyle12(params) {

    var color = numberToColor(params.data.iseditedInverterClippingLoss);
    return { backgroundColor: color };

}
function cellStyle13(params) {

    var color = numberToColor(params.data.iseditedInverterEfficiency);
    return { backgroundColor: color };

}
function cellStyle14(params) {

    var color = numberToColor(params.data.iseditedModelGeneration);
    return { backgroundColor: color };

}
function cellStyle15(params) {

    var color = numberToColor(params.data.iseditedModuleQuality);
    return { backgroundColor: color };

}
function cellStyle16(params) {

    var color = numberToColor(params.data.iseditedPvLoss);
    return { backgroundColor: color };

}
function cellStyle17(params) {

    var color = numberToColor(params.data.iseditedShadingLoss);
    return { backgroundColor: color };

}
function cellStyle18(params) {

    var color = numberToColor(params.data.iseditedSoilingLoss);
    return { backgroundColor: color };

}
function cellStyle19(params) {

    var color = numberToColor(params.data.iseditedTiltLoss);
    return { backgroundColor: color };
    
}
function cellStyle20(params) {

    var color = numberToColor(params.data.iseditedTransmissionLoss);
    return { backgroundColor: color };
    
}
function numberToColor(val) {
    console.log(val)
    if (val == true) {
        return '#FFA500';
    }
}
export default PerformanceLoss; 