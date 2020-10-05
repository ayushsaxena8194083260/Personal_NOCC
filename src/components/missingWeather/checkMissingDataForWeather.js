import React, { Component } from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom'
import {AgGridReact} from "ag-grid-react"
import Picky from 'react-picky';
import 'react-picky/dist/picky.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import '../../styles/plant/plantFaultData.scss';
import DropDown from "../Common/DropDown";
import Alert from 'react-bootstrap/Alert';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { HttpClient } from "../../services/httpClient";
let httpClient = new HttpClient();

class ActionCellRenderer extends React.Component { 
    constructor(props) {
        super(props);
    }
    onClickMissingWeatherDetails(event,_data){
        event.preventDefault(); 
        const data = this.props.context.componentParent.state;
        window.open("/missingWeatherDetails?plantId="+_data.plantId+"&weatherStationIds="+_data.weatherStationId+"&fromDate="+_data.date+"&toDate="+_data.date);
        // window.open("/missingWeatherDetails?fromDate="+_data.date+"&plantId="+_data.plantId+"&toDate="+_data.date+"&weatherStationIds="+_data.weatherStationId);
    }
    render() {
        return (<div className="products-actions" style={{transform:" translateY(50%)"}}>
         <Link
          to={{
            pathname: "/missingWeatherDetails",
            missingWeatherDetailsData: this.props.data
        }}
            // to="route" 
            // target="_blank" 
            // state={this.props.state} 
            // onClick={(event) => {this.onClickMissingWeatherDetails(event,this.props.data)}} 
            // className='missing-weather-action'   
            >       
                Details
        </Link>
        <Link
            to={"/missingWethUpload"}
            className='missing-weather-action'>
                Upload
        </Link>
        </div>);
    }
}

class ActionEditCellRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.invokeEdit = this.invokeEdit.bind(this);
    }

    invokeEdit(){
        this.props.context.componentParent.editMissingWeather(true, this.props.node.data);
    }

    render() {
        return (<div className="products-actions" style={{}}>
            <Link to="#" onClick={this.invokeEdit} title="Edit" >
                <img src="/images/editIcon.png" alt="Edit" />
            </Link>
        </div>);
    }
}

class CheckMissingDataForWeather extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedPlanType: null,
            selectedProjectTypes: null,
            selectedFromDate: this.getMonthStartDate(),
            selectedToDate: this.getCurrentDate(),
            projectTypes: this.props.projectTypes,
            plantTypes: this.props.plantTypes,
            plants:this.props.plants,
            weatherStationName: this.props.weatherStationName,
            weatherStation: this.props.weatherStation,
            selectedPlantOptions: null,
            selectedWeatherOption:[],
            deleteID: null,
            showPopUp: false,
            selectedWeatherId:[],
            postData:{}, 
            plantid:'',
            weboxid:'',
        };
       
    }
    getCurrentDate(){
        var today= new Date();
        var d = today.getDate();
        var m = today.getMonth()+1;
        var y = today.getFullYear();
        var data;

        if(d < 10){
            d = "0"+d;
        };
        if(m < 10){
            m = "0"+m;
        };

        data = y+"-"+m+"-"+d;
        return data;
    }
    getMonthStartDate(){
        var today= new Date();
        var d = 1;
        var m = today.getMonth()+1;
        var y = today.getFullYear();
        var data;

        if(d < 10){
            d = "0"+d;
        };
        if(m < 10){
            m = "0"+m;
        };

        data = y+"-"+m+"-"+d;
        return data;
    }
    componentDidMount() {
       
        this.props.clearMissingWeatherStationData();
    }
    componentDidUpdate() {
      
    }

    ModalClose() {
        this.setState({ commGF: false });
        this.getRenderWeatherStation()
    }

    editMissingWeather(gfShowValue, data) {
        this.setState({
            ...this.state,
            commGF: gfShowValue,
            postData: data
        })
    }

    handleChange(data, field) {
        let postDataDup = this.state.postData;
        postDataDup[field] = data.target.value;
        this.setState({postData: postDataDup});
    }

    onSubmit = () => {
        if (this.state.postData !== null) {
            this.props.createOrUpdateWeatherStationDailyData({weatherStation: this.state.postData, type: "Edit Weather Station"});
            this.ModalClose();
            this.props.getWeatherDailyDetails({ fromDate: this.state.selectedFromDate, plantId: this.state.selectedPlantOptions,toDate: this.state.selectedToDate,weatherStationIds:this.state.selectedWeatherId });
        }
    }


    handleChangeFromDate(event) {
        let fromDate = event.target.value;
        this.setState({ selectedFromDate: fromDate});
    }

    handleChangeToDate(event) {
        let toDate = event.target.value;
        this.setState({ selectedToDate: toDate});
    }

    handleChangePlantType(event) {
        const selectedValue = event.target.value;
        if (selectedValue !== this.state.selectedPlantType) {
            this.props.getPlantByType(selectedValue);
            this.setState({ selectedPlantType: selectedValue, selectedPlantOptions: null,selectedWeatherOption:[] });
        }
    }

    handleChangePlants(event) {
        const selectedValue = event.target.value;
        this.props.getWeatherStationByPlantId(selectedValue);
        this.setState({ selectedPlantOptions: selectedValue });
    }

    onGridReady = (params) => {
        params.api.setHeaderHeight(70);
      }
// Store plant id and web box id Gaurav
    getRenderWeatherStation() {
      
        localStorage.setItem('weather',JSON.stringify(this.state));
       
       localStorage.setItem('weatherid',this.state.selectedPlantOptions);
       localStorage.setItem('weatherID',this.state.selectedInverterId);
       localStorage.setItem('wID',this.state.selectedWeatherId);
   
       this.setState({plantid:this.state.selectedPlantOptions, weboxid:this.state.selectedWeatherId });
       console.log(this.state.selectedWeatherId, 'this.state.selectedWeatherId');
        this.props.getWeatherDailyDetails({ fromDate: this.state.selectedFromDate, plantId: this.state.selectedPlantOptions,toDate: this.state.selectedToDate,weatherStationIds:this.state.selectedWeatherId });
    }

  

    handleChangeYear(event) {
        const selectedYear = event.target.value;
        this.setState({ selectedYear });
    }

    selectOption(value) {
        console.log("Vals", value);
        this.setState({ value });
    }

    getDropDownPlants() {
        let plants = [];
        plants.push({ displayText: "Select Plant", value: "0" })
        this.state.plantTypes && this.state.plantTypes.map((item) => {
            plants.push({ displayText: item.plantName, value: item.plantId })
        });

        return plants;
    }

    selectWeatherTypeOptios(value) {
        const weatherIds = value && value.map((item) => item.id);
        this.setState({ selectedWeatherId: weatherIds});
       this.setState({ selectedWeatherOption: value });
       
   }

    createColumnDefs() {
        return [
            {
                headerName: "Sr No.", field: "sr_no", cellClass: 'cell-wrap',
                autoHeight: true, width: 50, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Date", field: "date", cellClass: 'cell-wrap',
                autoHeight: true, width: 80, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Weather Station", field: "weatherStationName", cellClass: 'cell-wrap',
                autoHeight: true, width: 85, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Total", field: "total", cellClass: 'cell-wrap',
                autoHeight: true, width: 70, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Available", field: "available", cellClass: 'cell-wrap',
                autoHeight: true, width: 83, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Missing", field: "missing", cellClass: 'cell-wrap',
                autoHeight: true, width: 76, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Action",
                field: '',
                cellRendererFramework: ActionCellRenderer,
                width: 270,
            },
            {
                headerName: "Remarks", field: "remarks", cellClass: 'cell-wrap',
                autoHeight: true, width: 300, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Edit",
                field: '',
                cellRendererFramework: ActionEditCellRenderer,
                width: 200,
                editable: true,
            },           
        ];
    }

    onEdit(){

    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps !== null) {
            console.log(nextProps,'nextProps')
            this.setState({
                plantTypes: nextProps.plantTypes,
                weatherStationName:nextProps.weatherStationName,
                weatherStation: nextProps.weatherStation
            })
        }
    }

    getWeatherStationDropDownOptions() {
        const options = this.state.weatherStationName && this.state.weatherStationName.map((weatherStationName, key) => { return { id: weatherStationName.weatherStationId, name: weatherStationName.weatherStationName } });
        return options;
    }
    
    getDropDownYear() {
        return this.props.years && this.props.years.map((item) => { return { displayText: item, value: item } });
    }

    render() {

        const ModalClose = () => {
            this.setState({ commGF: false });
        }
        return (
            <div>
            <div>
                <div className="top-filter">
                    <div className="row" style={{ alignItems: "center", margin: "0" }} >
                        <Col xs={1} style={{ maxWidth: "5%" }}>
                            <Form.Label>Type:</Form.Label>
                        </Col>
                        <Col style={{ maxWidth: "12%",padding:"0" }}>
                            <DropDown
                                className="top-search-input form-control"
                                Name="plantType"
                                itemSource={this.props.plantType}
                                value={this.state.selectedPlantType}
                                handleChange={(item) => this.handleChangePlantType(item)}
                            />
                        </Col>
                        <Col xs={1} style={{ maxWidth: "5%" }}>
                            <Form.Label>Plant:</Form.Label>
                        </Col>
                        <Col style={{ maxWidth: "12%" ,padding:"0"}}>
                        <DropDown
                                className="top-search-input form-control"
                                Name="plants"
                                itemSource={this.getDropDownPlants()}
                                value={this.state.selectedPlantOptions}
                                handleChange={(item) => this.handleChangePlants(item)}
                            />
                            {/* <Picky
                                value={this.state.selectedPlantOptions}
                                options={this.selectMultipleOption()}
                                onChange={(val) => this.selectMultipleOption(val)}
                                open={false}
                                valueKey="id"
                                labelKey="name"
                                multiple={true}
                                includeSelectAll={true}
                                includeFilter={true}
                                dropdownHeight={250}
                                    filterPlaceholder="Search"
                                filterPlaceholder="Search"
                            /> */}
                        </Col>
                        <Col xs={1} style={{ maxWidth: "7%" }}>
                            <Form.Label>Weather:</Form.Label>
                        </Col>
                        <Col style={{ maxWidth: "13%" ,padding:"0"}}>
                            <Picky
                                value={this.state.selectedWeatherOption}
                                options={this.getWeatherStationDropDownOptions()}
                                onChange={(val) => this.selectWeatherTypeOptios(val)}
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

                        <Col xs={1} style={{ maxWidth: "5%" }}>
                            <Form.Label>From:</Form.Label>
                        </Col>
                        <Col xs={1} style={{ maxWidth: "13%",padding:"0" }}>
                            <Form.Control name="fromDate" type="date" onChange={(item) => this.handleChangeFromDate(item)} value={this.state.selectedFromDate} />
                        </Col>
                        <Col xs={1} style={{ maxWidth: "5%" }}>
                            <Form.Label>To:</Form.Label>
                        </Col>
                        <Col xs={1} style={{ maxWidth: "13%",padding:"0" }}>
                            <Form.Control name="toDate" type="date" onChange={(item) => this.handleChangeToDate(item)} value={this.state.selectedToDate} />
                        </Col>
                        <Col xs={2} style={{ maxWidth: "6%" }}>
                            <button type="button" className="btn btn-orange" style={{width:"100%"}} onClick={() => this.getRenderWeatherStation()}>
                                Go
                        </button>
                        </Col>
                        {/* <Col xs={2} style={{ maxWidth: "8%" }}>

                            <Route render={({ history }) => (
                                <button type="button" class="btn btn-primary" style={{ width: "100%" }} onClick={() => { history.push('/WeatherStationAddEdit') }}>
                                    <img src="/images/icons/fugue/plus-circle.png" alt="add Grid Failure" title="Add Grid Failure" style={{ float: "left", marginRight: "3" }} />
                                    Add
                        </button>)} />
                        </Col> */}
                    </div>
                </div>
                <div>
                    {this.props.displayMessage ? <Alert className="message success"  variant="success" style={{ marginTop: "15px" }}>{this.props.displayMessage}</Alert> : null} 
                </div>
                <div
                     style={{
                            height: '500px',
                            maxWidth:"1222px",
		                    margin:"auto"
                        }}
                    className="ag-theme-material">
                    <AgGridReact
                        columnDefs={this.createColumnDefs()}
                        rowData={this.state.weatherStation}
                        context={{ componentParent: this }}
                        onGridReady={this.onGridReady}>
                    </AgGridReact>
                    <Modal id="editMissingWeather" show={this.state.commGF} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                        <Modal.Title>Check For Missing Weather</Modal.Title>
                                <Modal.Body>
                                    <Col>
                                    <Form.Label>Remarks<span className="form-required">*</span></Form.Label>
                                    </Col>
                                    <Col>
                                    <Form.Control name="remarks" type="text" onChange={(item) => this.handleChange(item, "remarks")} value={this.state.postData.remarks} pattern="^-?[0-9]\d*\.?\d*$" />
                                    </Col>
                                </Modal.Body>
                                <Modal.Footer>
                                <Button variant="primary" onClick={() => this.onSubmit()}>
                                        Save
                                    </Button>
                                    <Button variant="danger" onClick={() => this.ModalClose()}>
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                </div>
                </div>
            </div>
        );
    }
}

export default CheckMissingDataForWeather;