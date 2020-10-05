import React, { Component } from "react";
import Card from 'react-bootstrap/Card';
import MapContainer from "./../googleMap";
import Col from 'react-bootstrap/Col';

import GirdDisplayContainer from "../../../containers/dashboard/girdDisplayContainer";
import exportFromJSON from 'export-from-json';
import Button from 'react-bootstrap/Button';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
class WeatherGeneration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allPlants: this.props.allPlants
        }
    }

    componentDidMount() {
        this.props.getDashboardInfo();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ allPlants: nextProps.allPlants });
    }

    getData(_data) {
        let value = []
        _data.map(item => {
            if (!(item.plantName == "Gross Portfolio") && !(item.plantName == "Ground mount Portfolio") && !(item.plantName == "Roof top Portfolio"))
                value.push({ "Plant Name": item.plantName, "Color": item.status, "Remarks": "" });
        })
        return value
    }

    // exportToCSV(csvData, fName, e) {
    //     e.preventDefault();
    //     const data = this.getData(csvData);
    //     const fileName = fName
    //     const exportType = 'xls'
    //     data.length > 0 ? exportFromJSON({ data, fileName, exportType }) : alert('No data to download')
    // }
    exportToCSV (csvData, fName,e) {
        e.preventDefault();
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fName + fileExtension);
    }
    render() {
        return (
            <div>
               

                <Card style={{ height: "621px", margin: "auto" }}>
                <button style={{padding: "0.5%", 
                                position:"absolute",
                                zIndex:"100",
                                right:0,
                                top:'-1px',
                                border: 'none',
                                background: 'none'}}>
                    <img src="https://nocc.azurepower.com/images/csvIcon.png" onClick={(e) => { this.exportToCSV(this.props.allPlants, "color", e) }} />
                </button>
                    <Card.Body style={{ padding: "0" }}>
                        <div style={{ width: "40%", height: "100%", display: "inline-block", padding: "0.5%", borderRight: "1px dashed #3333336e" }}>
                            <MapContainer {...this.state} />
                        </div>
                        <div className="card1" style={{ width: "60%", height: "100%", display: "inline-block", padding: "0.5%", float: "right" }}>
                            <GirdDisplayContainer /> 
                        </div> 
                    </Card.Body>
                   
                   
     
                   
                </Card>
                <footer className="darkBlueGradient display">
                        <span>AFFORDABLE SOLAR POWER FOR GENERATIONS!</span>
                    </footer>
            </div>
        )
    }
}

export default WeatherGeneration;