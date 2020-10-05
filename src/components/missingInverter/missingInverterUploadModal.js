import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form, } from 'react-bootstrap';
import Loader from 'react-loader-spinner'
import '../../App.scss'
import Card from 'react-bootstrap/Card';
import { Route } from 'react-router-dom';
import { HttpClient } from "../../services/httpClient";
let httpClient = new HttpClient();


// Transfer file(XML?zip/.sv) through FTP  along with plant and inverter details
class MissingInverterUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            srcpath: '',
            file: [],
            plantId: '',
            srcFile: [],
            type: '',
            check: '',
            invid: '',
            // file: '',
            status: false,
            flag: 0,
            loader: 0
        }
        this.filepath();

        this.handleRadioChange = this.handleRadioChange.bind(this);
    }
    filepath() {
        // console.log('check file path');
        // console.log(this.state, 'filepath');
        let data1 = {
            "plantId": this.state.plantId,
        }
        //   console.log(data1, 'data1');

        httpClient.post('http://noccwebstaging-env.eba-sutf6wep.us-east-1.elasticbeanstalk.com/plant/get-adapter-plant', data1)
            .then(res => {
                if (res.code == 200) {
                    this.state.flag = 1;
                    let path = [];
                    let data = res.content;
                    for (var i = 0; i < data.length; i++) {

                        path.push({
                            srcFile: data[i].filePath
                        })
                    }
                    this.setState({
                        srcFile: path
                    })
                    //     console.log(path, 'path inverter');
                }
                //    console.log(this.state);
                //     console.log(res)

            })
            .catch(console.log)
    }
    getBase64 = async (e) => {
        e.preventDefault();
        var file = e.target.files
        
        if (this.state.type == '.csv') {
            if (file == '.csv') {
                //  alert('csv file');
            } else {
                alert('this.is not csv file');
            }
        } else if (this.state.type == '.xml') {
            if (file == '.xml' || file == '.zip') {
                // alert('xml file');
            } else {
                alert('this.is not xml/zip file');
            }
        } else if (this.state.type == '') {
            alert('select type ');
        }
        if (file)

            this.state.file = file;
        console.log(this.state.file, 'file')

    }
    check() {
        console.log(this.state, 'check() 1');
        if (this.state.srcpath != '') {
            if (this.state.type != '') {
                if (this.state.file != '') {
                    this.state.status = true;
                    console.log(this.state, 'check()');
                } else {
                    alert('Please select File First!!');
                }
            } else {
                alert('Type mis match!!');
            }

        } else {
            alert('Please select File Path First!!');
        }

    }
    onSubmit = async (evt) => {
        this.check();
        if (this.state.status == true) {
            this.setState({ srcpath: "select file Location" });
            evt.preventDefault();
            this.setState({ gender: 'non' });
            if (this.state.file.length < 11) {
                console.log(this.state.file, 'schvcs alert');
                for (var i = 0; i < this.state.file.length; i++) {
                    let file = this.state.file[i];
                    console.log(file)
                    const formData = new FormData();
                    formData.append('file', file);
                    formData.append('plantId', this.state.plantId);
                    formData.append('type', this.state.type);
                    formData.append('filePath', this.state.srcpath);
                    formData.append('invName', this.state.invid);

                    httpClient.post('http://noccwebstaging-env.eba-sutf6wep.us-east-1.elasticbeanstalk.com/file/uploading', formData)
                        .then(res => {
                            if (res.code == 200) {
                              if(i == this.state.file.length){
                                alert('data saved');
                                this.props.onHide()

                              }
                                this.setState({ srcpath: '', status: false, type: '', plantId: '', file: '' })
                                this.state.flag = 0;

                            }

                        })
                        .catch(console.log);
                }
            } else {
                alert('Please Upload Maximum 15 Files at a Time ')
            }



        } else {
            if (this.state.srcpath == '') {
                alert('Select Source Path First');
            } else if (this.state.type = !this.state.file) {
                alert('type Mis match');

            }
            alert('Select accordingly');
        }


    }


    handleRadioChange = async (e) => {
        e.preventDefault();

        // set the new value of checked radion button to state using setState function which is async funtion
        this.setState({
            type: e.target.value
        });

        // if (e.target.value == 'CSV') {
        //     this.state.type = '.csv';
        // } else if (e.target.value == 'XML') {
        //     this.state.type = '.xml'
        // }
        //     alert(this.state.type);
    }

    loder() {
        return (
            <>
                <div className="spinner-grow text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </>
        );

    }
    render() {

        if (this.state.loader == 0) {
            this.loder();
        }

        if (typeof this.props.invID === 'undefined' && typeof this.props.plantid === 'undefined') {
            console.log('undefinded pant ')
        } else {
            this.state.plantId = parseInt(this.props.plantid);
            this.state.invid = parseInt(this.props.invID);
            if (this.state.flag == 0) {
                this.filepath();
            }

        }

        //console.log(this.state, 'check plant invid');
        return (
            <div className="modal-main">
                <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Title>Upload Missing Inverter</Modal.Title>
                    <Modal.Body>
                        <Row>

                            <Col>
                                <Form.Label>Select File Location<span className="form-required">*</span></Form.Label>
                            </Col>
                            <Col>
                                <select className="top-search-input form-control" name="selectPath" width='300px' value={this.state.srcpath} onChange={(evt) => {
                                    this.setState({ srcpath: evt.target.value });
                                }} >
                                    <option value="">Select Path</option>
                                    {this.state.srcFile.map((obj) =>
                                        <option key={obj.srcFile}>{obj.srcFile}</option>
                                    )}
                                    {/* <option value="/var/www/NOCC/gujarat/inverter/Inv13-14-15-16" myid="144" myval="5&amp;&amp;&amp;12">/var/www/NOCC/gujarat/inverter/Inv13-14-15-16</option>
                                    <option value="/var/www/NOCC/gujarat/inverter/Inv5-6-7-8" myid="142" myval="5&amp;&amp;&amp;12">/var/www/NOCC/gujarat/inverter/Inv5-6-7-8</option>
                                    <option value="/var/www/NOCC/gujarat/inverter/Inv9" myid="1465" myval="9&amp;&amp;&amp;0">/var/www/NOCC/gujarat/inverter/Inv9</option>
                                    <option value="/var/www/NOCC/gujarat/inverter/Inv9-10-11-12" myid="143" myval="5&amp;&amp;&amp;12">/var/www/NOCC/gujarat/inverter/Inv9-10-11-12</option>
                                    <option value="/var/www/NOCC/gujarat/inverter/inverter1-2-3-4" myid="141" myval="5&amp;&amp;&amp;12">/var/www/NOCC/gujarat/inverter/inverter1-2-3-4</option>   */}
                                </select>

                            </Col>
                        </Row>
                        <Row>

                            <Col>
                                <Form.Label>File Type<span className="form-required">*</span></Form.Label>
                            </Col>
                            <Col>
                                {/* <input type="radio" value="XML" checked={this.state.type === "XML"}
                                    onChange={this.handleRadioChange} /> XML/ZIP [DEFAULT] <br></br> */}

                                <input type="radio" value="CSV" checked={this.state.type === "CSV"}
                                    onChange={this.handleRadioChange} /> CSV [ALTERNATE]
                                    {/* <Form.Check name="fileType" type="radio" label="XML/ZIP [DEFAULT]" />
                                    <Form.Check name="fileType" type="radio" label="CSV [ALTERNATE]" /> */}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Upload File<span className="form-required">*</span></Form.Label>
                            </Col>
                            <Col>
                                <Form.Control type="file" accept=".csv , .zip"   multiple onChange={this.getBase64} />

                                {
                                    //   this.state.error==t
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col>


                            </Col>
                            <Col md={2}>
                                <Button variant="primary" size="md" block onClick={this.onSubmit}>Submit</Button>
                            </Col>
                            <Col md={2}>
                                <Button variant="primary" size="md" onClick={this.props.onHide} block>Back</Button>
                            </Col>
                            <Col>
                            </Col>
                        </Row>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}
export default MissingInverterUpload