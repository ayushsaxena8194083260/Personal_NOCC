import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form,} from 'react-bootstrap';

import '../../App.scss'
import mfmReading from './mfmReading';
import { HttpClient } from "../../services/httpClient";
let httpClient = new HttpClient();


// Upload File based on Plant id and meter id with .CSV file
class UploadPlantMfmModal extends Component{

    constructor(props) {
        super(props);
        this.state= {
            plantypes: [],
            pid:'',
            meterDetail : [],
           meterid:'',
           file: '',
           plantid:'',
           lgshow: true,

        }
     
    }


    // Get Meter Details based on Plant ID Gaurav
    onChnagePlant=async(e)=> {
        e.preventDefault();
        this.setState({plantid : e.target.value})

     
       let dt = {
           "plantId" : this.state.plantid
       }
       httpClient.post('http://noccwebstaging-env.eba-sutf6wep.us-east-1.elasticbeanstalk.com/mfmdata/meter-detail', dt)
       .then(res => {
           if(res.code==200){
     let met=res.content; 
          this.state.meterDetail= [
              {
                  "meterNumber": res.content.meterNumber,
                  "meterTypeId": res.content.meterTypeId
              }
          ];
            
           }else if(res.code==300){
               alert('No Meter Found');
           }
       })
        .catch(console.log)
    }


    onChangeMeter(evt){

this.setState({meterid:evt.target.value});
//this.state.meterid=evt.target.value;

    }
    getBase64=async(e)=> {
        e.preventDefault();
        var file = e.target.files[0]
       // this.state.file=file;
       this.setState({file: file});
    }

    // Send File with Plant nad meter Details
onSubmit(){
if(this.state.plantid!=''){
    if(this.state.meterid!=''){
        if(this.state.file!=''){
            const formData = new FormData();
            formData.append('file', this.state.file);
            formData.append('meterid', this.state.meterid);
            formData.append('plantId', this.state.plantid);
            httpClient.post('http://noccwebstaging-env.eba-sutf6wep.us-east-1.elasticbeanstalk.com/mfmdata/uploading-mfmfile', formData)
            .then(res => {
                if(res.code==200){
              //      this.props.onHide;
                   
             alert('Data Saved Sucessfully!! ')
             this.setState({file: '', meterid: '', plantid: ''})
        //   this.state.file='';
        //   this.state.meterid='';
        //   this.state.plantid='';
                }else if(res.code==300){
                    alert('No Meter Found');

                }
            })
             .catch(console.log)
        }else{
            alert('Upload CSV File First !!');
        }
    }else{
        alert('Select Meter First !!');
    }
}else {
    alert('Select Plant First !!');

}
    }
    render(){
      
        if( typeof  this.props.plantypes=== 'undefined' ){
        }else{
            console.log(this.props.plantypes, 'this.props.plantypes')
        //    this.setState({'plantypes': [this.props.plantypes] })
        let plants = [];
        this.props.plantypes && this.props.plantypes.map((item) => {
            this.state.plantypes.push({  plantId: item.plantId, plantName: item.plantName })
        });
    //    console.log(plants, 'check plants');
   //   this.setState({plantypes : plants });
      console.log(this.state, 'check  state plants');

        }

        return (
            <div className="modal-main">
                <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                  <Modal.Title>Upload MFM Data</Modal.Title>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <Form.Label>Plant:</Form.Label>
                                <select className="top-search-input form-control" width='300px' value={this.state.srcpath} onChange={(evt) => {this.onChnagePlant(evt)}}>
                                    <option >Select Plant</option>

                                    {   this.state.plantypes.map((obj) => 
                                     <option value={obj.plantId}>{obj.plantName}</option>
                                             )}
                                </select>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Meter:</Form.Label>
                                <select className="top-search-input form-control" width='300px' onChange={(item) => this.onChangeMeter(item)}>
                                    <option >Select Meter</option>
                                    {   this.state.meterDetail.map((obj) => 
                                     <option value={obj.meterTypeId}>{obj.meterNumber}</option>
                                             )}
                                </select>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>File (.csv):</Form.Label>
                                <Form.Control type="file" accept=".csv" onChange={this.getBase64}/>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="danger" onClick={this.props.onHide} >
                        Close
                      </Button>
                      <Button variant="primary" onClick={() => { this.onSubmit()}}>
                        Upload
                      </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default UploadPlantMfmModal;