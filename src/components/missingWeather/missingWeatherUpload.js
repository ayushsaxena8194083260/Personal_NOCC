import React, { Component } from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Route } from 'react-router-dom';
import 'react-picky/dist/picky.css';
import '../../styles/plant/plantFaultData.scss';
import {uploadWeatherMissingFile} from "../../actions/action-alluploadfile";
import Picky from 'react-picky';
import { BrowserRouter, withRouter } from 'react-router-dom';
import LineBasicChart from '../Charts/lineBasic';
import ColumnBarChart from '../Charts/columnBar';
import DataDefinedBar from '../Charts/DataDefinedBar';
import { connect } from 'react-redux';
import { getPageDetailAndGraphDetail } from '../../actions/action-analytics';
import { getMakeGraphGauge } from '../../actions/action-MakeGraphAnalytics';
import ColumnCombinedBarChart from '../Charts/columnCombinedBar';
import { HttpClient } from "../../services/httpClient";
let httpClient = new HttpClient();


// Transfer file based on Plant Details and webox details Gaurav
class MissingWeatherUpload extends Component {
   
 
    constructor(props) {
        super(props);
        
        this.state = {
            srcpath: '',
            file: '',
            plantId: '',
            srcFile :[],
            gender: "SV",
            check: '',
            invName: '',
            status: false,
            type: '',
        }
console.log('check weather state');
       
          let data=localStorage.getItem('weatherid');
          let data1=parseInt(data);
          this.state.plantId=data1;
       
          let wID=localStorage.getItem('wID');
          let wid1=parseInt(wID);
          this.state.invName=wid1;
      

          this.filepath();
          this.handleRadioChange = this.handleRadioChange.bind(this);
    }

   


    filepath() {
     
        let data1= {
            "plantId": this.state.plantId,
        }
        console.log(data1, 'data1');
        httpClient.post('http://noccwebstaging-env.eba-sutf6wep.us-east-1.elasticbeanstalk.com/plant/get-adapter-plant', data1)
        .then(res => {
            if(res.code==200){
                let path =[];
                let data = res.content;
                for(var i=0;i<data.length;i++){
                  
                    path.push({
                      srcFile:  data[i].filePath
                    })
                 }
                 this.setState({
                     srcFile: path
                 })
                
            }
       
            
        })
         .catch(console.log)
    }
    checkstatus(){
if(this.state.srcpath!=''){
    if(this.state.type!=''){
        if(this.state.file!=''){
      //  this.setState({status:true});
           
            this.state.status=true;
          
        }
    }

}
    }
    onSubmit=async(evt) => {
        this.checkstatus();
        if(this.state.status==true){
        
            evt.preventDefault();
            this.setState({gender:'non'});
           
            const formData = new FormData();
            formData.append('file', this.state.file);
            formData.append('plantId', this.state.plantId);
            formData.append('type', this.state.check);
            formData.append('filePath', this.state.srcpath);
            formData.append('invName', this.state.invName);
          
            httpClient.post('http://noccwebstaging-env.eba-sutf6wep.us-east-1.elasticbeanstalk.com/file/uploading', formData)
        .then(res => {
            if(res.code==200){
               alert('data Sucessfully saved!!');
                this.setState({srcpath: '', status: false, type: '', plantId:'' , file: ''})
            }
            
        })
         .catch(console.log);
        }else if(this.state.srcpath==''){
            alert('Select File Path');
        }else if(this.state.file==''){
            alert('Upload CSV FIle');
        }else if(this.state.type==''){
            alert('Select Type');
        }
   
       
      }
      handleChangePlantType=async(e)=> {
        e.preventDefault();
        const selectedValue = e.target.value;
        this.setState({
            srcpath: selectedValue
          })
         console.log(selectedValue,'check');   
    }
    getBase64=async(e)=> {
        e.preventDefault();
        var file = e.target.files[0]
     this.setState({file:file});
     
      
      }  

      handleRadioChange=async(e)=> {
        e.preventDefault();
        this.setState({
            type: e.target.value
          });
    
    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div>
                    <Card className="add-fault-card">
                        <Card.Header as="h5">File Upload For Weather</Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                </Col>
                                <Col>
                                    <Form.Label>Select File Location<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <select className="top-search-input form-control" name="selectPath" width='300px' value={this.state.srcpath} onChange={(evt) => {
                                    this.setState({srcpath:evt.target.value});}}   >
                                        <option value="">select file Location</option>
                                        {/* <option value="/var/www/NOCC/gujarat/weather_1/webbox_1">/var/www/NOCC/gujarat/weather_1/webbox_1</option> */}

                                       { this.state.srcFile.map((obj) => 
                                     <option key={obj.srcFile}>{obj.srcFile}</option>
                                             )}
                                    </select>
                                </Col>
                                <Col></Col>
                            </Row>
                            <Row>
                                <Col>
                                </Col>
                                <Col>
                                    <Form.Label>File Type<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    {/* <Form.Check name="fileType" type="radio" label="CSV [DAFAULT]" /> */}
                                    <input type="radio" value="CSV" checked={this.state.type === "CSV"}  
                                                     onChange={this.handleRadioChange} /> CSV [DAFAULT]
                                </Col>
                                <Col></Col>
                            </Row>
                            <Row>
                                <Col>
                                </Col>
                                <Col>
                                    <Form.Label>Send File<span className="form-required">*</span></Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control type="file" accept=".csv" onChange={this.getBase64} />
                                </Col>
                                <Col>
                                
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                </Col>
                                <Col md={2}>
                                    <Button variant="primary" size="md" block onClick={this.onSubmit}>Submit</Button>
                                </Col>
                                <Route render={({ history }) => (
                                    <Col md={2}>
                                        <Button variant="primary" size="md" onClick={() => { history.push('/checkMissingDataForWeather') }} block>Back</Button>
                                    </Col>
                                )} />
                                <Col>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </div>
            </form>

        )
    }
}

export default MissingWeatherUpload;



