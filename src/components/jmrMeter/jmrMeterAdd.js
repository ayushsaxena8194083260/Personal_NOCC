import React, { Component } from 'react';
import axios from 'axios';
import {createOrUpdatePlant} from "../../actions"
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import '../../styles/plant/plantAddEdit.scss';
import { Route } from 'react-router-dom';
import { createOrUpdatePlantJmrData } from '../../actions/jmrMeterActions';
import { getPlantByType } from "../../actions/PlantActions";
// import axios from 'axios';
const userDetails = JSON.parse(localStorage.getItem('isAuthenticated'));


class AddEditJmrComponent extends Component{

    constructor(props) {
        super(props);

        this.state = {
            selectedFile: null,             
            plant_types:["GROUNDMOUNT", "ROOFTOP"],
            pageName: "Add JMR",
            plant_jmr: {
                month: '',
                plantId:'',
                userId: "",
                uploadDate:'',
                fileName: null
            }
            // plants: this.props.plants,
            // postData: this.props.jmrMeter,
            // selectedPlantType:'',
            // month: '',
            // pageName: "Add JMR",
            // plants: [],
            // isSubmited: false
        }
        this.handleChangePlant = this.handleChangePlant.bind(this);

        this.handleChange = this.handleChange.bind(this)
        // this.hanldChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        // document.title = 'Plant Fault Data';
    }
    onChangeHandler=event=>{
        console.log(event.target.files[0])
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
          })
        const input = event.target.files[0];
        const stateDup = this.state.plant_jmr;
        const data = new FormData()
        data.append('file', input)
        axios.post("http://noccwebstaging-env.eba-sutf6wep.us-east-1.elasticbeanstalk.com/fileUpload", data, { 
       })
     .then(res => { 
         console.log(res.data)
         stateDup["fileName"]= res.data;
         this.setState({ stateDup });
      })
      }
      onClickHandler = () => {
      
       
     
    }
    async uploadFile(e){
        console.log(e.target.files[0])
        // const config = {
        //   onUploadProgress: (progressEvent) => {
        //     const percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
        //     this.refs.progress.value = percentCompleted;
        //   }
        // };
    
        // const formData = new FormData();
        // const input = this.refs.file.files[0];
        // const image = this.refs.image;
        // formData.append('image', input);
        // const response = await axios.post('https://untitled-gsgo3la9v5ig.runkit.sh', formData, config);
        // if(!response.data.error){
        //   this.refs.file.value = null;
        //   image.src = response.data.url;
        //   this.refs.progress.value = 0;
        //   this.setState({
        //     link: `/view/${response.data.id}${response.data.ext}`
        //   });
        // }
      }
    // handleChangePlant(event) {
    //     debugger
    //     const stateDup = this.state.plant_jmr;
    //     stateDup[event.target.name]= event.target.value;
    //     this.setState({ stateDup });
      
    //     if(event.target.name === "plant_type" ){
    //     this.props.getPlantByType(stateDup.plant_type);
    //     }
    // }

    handleChange(event) {
     
        const stateDup = this.state.plant_jmr;
        stateDup["month"]=event.target.value;
        let today = new Date();
        
        let hour = today.getHours();
        let minute = today.getMinutes();
        let Seconds = today.getSeconds();
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
        if (Seconds < 10) {
            Seconds = "0" + Seconds;
        };
        if (minute < 10) {
            minute = "0" + minute;
        };
        if (hour < 10) {
            hour = "0" + hour;
        };
        data = y + "-" + m + "-" + d;

       let newValue = data+ "T" + hour + ":" + minute + ":" + Seconds + "Z"
       console.log(newValue);
        stateDup["uploadDate"]= newValue;
        const userDetails = JSON.parse(localStorage.getItem('isAuthenticated'));
console.log(userDetails)
        if(userDetails){
            stateDup["userId"]=userDetails.userId;

        }
        this.setState({stateDup});

    }
    handleChangePlant(event) {
        
        if(event.target.name === "plant_type" ){
            const stateDup = this.state;
            stateDup.selectedPlantType = event.target.value;
            // this.setState({ stateDup });          
            this.props.getPlantByType(stateDup.selectedPlantType);
        }
        else{
            
                const stateDup1 = this.state.plant_jmr;  
            let plantsByType = this.props.plantsByType; 
            // stateDup1.selectedPlant = event.target.value;
            for(var i=0;i<plantsByType.length;i++){
                if(plantsByType[i].plantName === event.target.value){
                    stateDup1.plantId = plantsByType[i].plantId;
                    break;
                }
            }
            
            this.setState({stateDup1});

            //this.props.getPlantTiltByPlantId(stateDup1.plant_id,stateDup1.selectedPlant,stateDup1.selectedPlantType);
        }
    }
    onSubmit = (e) => {
        e.preventDefault();
        // if (this.state.postData !== null && this.fieldValid() === false) {
            this.props.createOrUpdatePlantJmrData(this.state.plant_jmr);
            alert('Add JMR Meter has been created successfully');
            // this.props.createOrUpdatePlantJmrData(this.state.jmrMeter);
            this.props.history.push('/jmrMeter');
        // }

        this.setState({ isSubmited: true });
    }

    // renderErrortext(fieldID, msg) {
    //     return (
    //         this.state.isSubmited === true && !this.state.postData[fieldID] && <p className="errorText" style={{ color: "#CC0000", display: "block", fontSize: "11px", marginTopop: "0.5em" }}>{msg}</p>
    //     )
    // }

    render(){
        return(
            <div>
                <Card className="add-plant-card">
                  <Card.Header as="h5">{this.state.pageName}</Card.Header>
                  <Card.Body>
                  <Row>
                    <Col></Col>
                        <Col>
                            <Form.Label>Plant Type<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col >
                        <select className="top-search-input form-control" name="plant_type" width='300px' onChange={(item) => this.handleChangePlant(item)}>
                        <option>Select Plant Type</option>
                        {this.state.plant_types.map((plantType, key) => <option key={plantType}>{plantType}</option>)}
                        </select>
                        </Col>
                    <Col></Col>
                    </Row>
                    <Row>
                    <Col></Col>
                        <Col>
                            <Form.Label>Plant<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                        <select required class="form-control" name="plant_id" type="dropdown" name="plant_name" onChange={(item) => this.handleChangePlant(item)} >
                            value={this.state.selectedPlant} plant_name={this.state.selectedPlant}
                            <option>Select Plant</option>
                            {/* <option>{this.state.plans[0].plant_name}</option> */}
                            {this.props.plantsByType === undefined?<option>default</option>:this.props.plantsByType.map((plant, key) => <option key={plant.plantId}>{plant.plantName}</option>)}
                        </select>
                        </Col>
                    <Col></Col>
                    </Row>
                    <Row>
                    <Col></Col>
                        <Col>
                            <Form.Label>Month And Year<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                            <Form.Control type="date" name="month" onChange={this.handleChange}/>
                            {/* <Form.Control name="date" type="date" onChange={(item) => this.handleChange(item)} value={this.state.postData && this.state.postData.date} /> */}
                            {/* {this.renderErrortext("date", "The Month and Year Field Is Required.")} */}
                        </Col>
                    <Col></Col>
                    </Row>
                    <Row>
                    <Col></Col>
                        <Col>
                            <Form.Label>Upload File<span className="form-required">*</span></Form.Label>
                        </Col>
                        <Col>
                        <Form.Control type="file" accept=".pdf , .jpg" onChange={this.onChangeHandler} />
                        </Col>
                    <Col></Col>
                    </Row>
                    <Row>
                        <Col>
                        </Col>
                        <Col md={2}>
                            <Button variant="primary" size="md" onClick={this.onSubmit} block>Submit</Button>
                        </Col>
                        <Route render={({ history }) => (
                            <Col md={2}>
                                <Button variant="primary"  size="md" onClick={() => { history.push('/jmrMeter') }} block>Back</Button>
                            </Col>
                            )}/>
                        <Col>                      
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        plant_Jmr: state.plant_Jmr,
        plantsByType: state.plants.plantsByType
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createOrUpdatePlantJmrData: (jmrMeter) => dispatch(createOrUpdatePlantJmrData(jmrMeter)),
        getPlantByType: (plantType) => dispatch(getPlantByType(plantType))
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AddEditJmrComponent)) ;
