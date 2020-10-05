import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Picky from 'react-picky';
import 'react-picky/dist/picky.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import '../../styles/plant/plantFaultData.scss';
import DropDown from "../Common/DropDown";
import PerformanceAnalysisDeatils from './PerformanceAnalysisDeatils';
import { getAllPlants, getPlantByProjectId } from "../../actions/PlantActions";
import { getPlantByType, getModuleCleaningByPlantId, getModuleCleaningAnalysisDataByDate, clearModuleAnalysisData, createOrUpdateModuleCleaningAnalysis } from "../../actions/moduleCleaningAnalysisActions";
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getAllDataforPerformance, getAllDataforPerformance2 } from '../../actions/performanceAnalysisActions';
import XLSX from 'xlsx'
import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'

class PerformanceAnalysis extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDuration: "",
            selectPlantTypes: null,
            selectedMonth: this.props.currentMonth,
            selectedYear: null,
            fromDate: null,
            toDate: this.props.todayDate,
            newDate: this.props.newDate,
            plantTypes: this.props.plantTypes,
            performanceAnalysisData: this.props.performanceAnalysisData,
            selectedPlantOptions: [],
            showPerformnceinfo: false,
        };
        this.selectMultipleOption = this.selectMultipleOption.bind(this);
    }

    handleChangeDuration(event) {
        const selectedValue = event.target.value;
        if (selectedValue && selectedValue !== "-1") {
            this.setState({ selectedDuration: selectedValue, selectedPlantType: null, selectedPlantOptions: null })
        }
    }

    handleChangePlantType(event) {
        const selectedValue = event.target.value;
        if (selectedValue !== this.state.selectedPlantType) {
            this.props.getPlantByType(selectedValue);
            this.setState({ selectedPlantType: selectedValue, selectedPlantOptions: null });
        }
    }


    getRenderPlantFault() {
        let plantIds = [];
        this.state.selectedPlantOptions && this.state.selectedPlantOptions.length > 0 && this.state.selectedPlantOptions.map((item) => { plantIds.push(item.id) });
        plantIds.length > 0 && this.props.getPlantFaultDataByPlantId({ plantIds: plantIds, fromDate: this.state.fromDate, toDate: this.state.toDate });
    }


    handleChangeFromDate(event) {
        const selectedDate = event.target.value;
        this.setState({ fromDate: selectedDate });
    }

    handleChangeToDate(event) {
        const selectedDate = event.target.value;
        this.setState({ toDate: selectedDate });
    }

    selectMultipleOption(value) {
        this.setState({ selectedPlantOptions: value });
    }

    createColumnDefs() {
        return [
            {
                headerName: "Sr No", field: "sr_no", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Plant Name", field: "plant_name", cellClass: 'cell-wrap',
                autoHeight: true, width: 180, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Meter No", field: "meter_no", cellClass: 'cell-wrap',
                autoHeight: true, width: 150, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Date", field: "date", cellClass: 'cell-wrap',
                autoHeight: true, width: 100, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Total Export(KWH)", field: "total_export_kwh", cellClass: 'cell-wrap',
                autoHeight: true, width: 180, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Total Import(KWH)", field: "total_import_kwh", cellClass: 'cell-wrap',
                autoHeight: true, width: 180, cellStyle: { 'white-space': 'normal' }
            },
            {
                headerName: "Net Generation", field: "net_generation", cellClass: 'cell-wrap',
                autoHeight: true, width: 180, cellStyle: { 'white-space': 'normal' }
            },
            // {
            //     headerName: "Action",
            //     field: '',
            //     cellRendererFramework: ActionCellRenderer,
            //     width: 150,
            // }
        ];
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== null) {
            this.setState({
                plantTypes: nextProps.plantTypes,
                performanceAnalysisData: nextProps.performanceAnalysisData,

            })
        }
    }

    getPlantTypesDropDownOptions() {
        const options = this.state.plantTypes && this.state.plantTypes.map((plantTypes, key) => { return { id: plantTypes.plantId, name: plantTypes.plantName } });
        return options;
    }

    getDategetDaysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    downloadPerformanceAnalysisInfo() {
        const wb = new ExcelJS.Workbook()
        const ws = wb.addWorksheet()


        this.setCell(ws, 'A1', 'Plant Name - Punjab 1. Tariff (INR ₹0)', true);
        this.setCell(ws, 'A2', 'Capacity - 2MW', true);
        this.setCell(ws, 'A3', 'Month -2020-07-05', true);
        [1, 2, 3].forEach(key => {
            ws.mergeCells(`A${key}:H${key}`);
        });


        this.setCell(ws, 'A4', 'Actual PLF is');
        this.setCell(ws, 'B4', '0.201784988603015');

        this.setCell(ws, 'C4', 'Against Model Adjusted PLF of');
        this.setCell(ws, 'D4', { formula: 'IFERROR(((P2+SUM(L4:L14))/(N2*O2*24))*(1+K16)*(1+K17)*(1+K18)*(1+K19)*(1+K20)*(1+K21)*(1+K22),0)' });

        ws.mergeCells('D4:F4');

        this.setCell(ws, 'G4', 'Against Finance Budget PLF of');
        this.setCell(ws, 'H4', '14.0022404779009');


        this.setCell(ws, 'A5', 'Generation Deviation from Model PLF is');
        this.setCell(ws, 'D5', { formula: '(B4−D4)*N2*O2*24' });
        this.setCell(ws, 'E5', { formula: 'IF(IFERROR((B4/D4),0),(B4/D4)−1,0)' });
        this.setCell(ws, 'F5', { formula: 'D5*0' });

        this.setCell(ws, 'A6', 'Generation Deviation on account of Insolation Loss is');
        this.setCell(ws, 'D6', '');
        this.setCell(ws, 'E6', '');
        this.setCell(ws, 'F6', '');

        this.setCell(ws, 'A7', 'Generation Deviation on account of Technical Loss is');

        this.setCell(ws, 'A8', 'Generation Deviation on account of Grid Outage is');

        this.setCell(ws, 'A9', 'Generation Deviation on account of Soiling Loss is');

        this.setCell(ws, 'A10', 'Generation Deviation on account of Tilt Loss is');

        this.setCell(ws, 'A11', 'Generation Deviation on account of Commissioning or JMR is');

        this.setCell(ws, 'A12', 'Generation Deviation on account of DC Cable Loss is');

        this.setCell(ws, 'A13', 'Generation Deviation on account of AC Cable Loss is');

        this.setCell(ws, 'A14', 'Generation Deviation on account of Inverter Efficiency is');

        this.setCell(ws, 'A15', 'Generation Deviation on account of Auxilary Loss is');

        this.setCell(ws, 'A16', 'Generation Deviation on account of Transmission Loss is');

        [7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(col => {
            this.setCell(ws, `D${col}`, { formula: `K${col - 3}-L${col - 3}` });
            this.setCell(ws, `E${col}`, { formula: `(D${col}/(D4*24*O2*N2))` });
            this.setCell(ws, `F${col}`, { formula: `D${col}×0` });
        })

        this.setCell(ws, 'A17', 'Total Deviation in Model Losses are');
        this.setCell(ws, 'D17', { formula: 'SUM(D6:D16)' });
        this.setCell(ws, 'E17', { formula: 'SUM(E6:E16)' });
        this.setCell(ws, 'F17', { formula: 'D17*0' });

        this.setCell(ws, 'A18', 'Unforeseen Losses (Actual - Model) is');
        ['D', 'E', 'F'].map(row => {
            this.setCell(ws, `${row}18`, { formula: `(${row}5−${row}17)` });
        })

        this.setCell(ws, 'A19', 'Performance Ratio (PR)');;
        this.setCell(ws, 'D19', { formula: 'IFERROR((11480−K8)/15953.53,0)' });
        ws.mergeCells('D19:F19');

        ['5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'].forEach(key => {
            ws.mergeCells(`A${key}:C${key}`);
        });

        this.setCell(ws, 'G5', 'Generation Deviation from Budget is');
        this.setCell(ws, 'H5', '3513.81174193548');

        this.setCell(ws, 'G6', 'Generation Deviation on account of Insolation Loss is');
        this.setCell(ws, 'H6', '0');

        this.setCell(ws, 'G7', 'Generation Deviation on account of Technical Loss is');

        this.setCell(ws, 'G8', 'Generation Deviation on account of Grid Outage is');

        this.setCell(ws, 'G9', 'Generation Deviation on account of Soiling Loss is ');

        this.setCell(ws, 'G10', 'Generation Deviation on account of Tilt Loss is');

        this.setCell(ws, 'G11', 'Generation Deviation on account of Delay in Commissioning is');

        this.setCell(ws, 'G12', 'Generation Deviation on account of DC Cable Loss is');

        this.setCell(ws, 'G13', 'Generation Deviation on account of AC Cable Loss is');

        this.setCell(ws, 'G14', 'Generation Deviation on account of Inverter Efficiency is');

        this.setCell(ws, 'G15', 'Generation Deviation on account of Auxilary Loss is');

        this.setCell(ws, 'G16', 'Generation Deviation on account of Transmission Loss is');

        [7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(col => {
            this.setCell(ws, `H${col}`, { formula: `(K${col - 3}−M${col - 3})` });
        })

        this.setCell(ws, 'G17', 'Total Deviation in Budget Losses are');
        this.setCell(ws, 'H17', { formula: 'SUM(H6:H16)' });

        this.setCell(ws, 'G18', 'Unforeseen Losses (Actual - Budget) is');
        this.setCell(ws, 'H18', { formula: '(H5-H17)/(H4*O2*N2*24)-(K19-M19)' });

        this.setCell(ws, 'G19', '');
        this.setCell(ws, 'H19', '');


        this.setCell(ws, 'J1', 'Losses', true);
        this.setCell(ws, 'K1', 'Actual', true);
        this.setCell(ws, 'L1', 'Modal', true);
        this.setCell(ws, 'M1', 'Finance Budget', true);
        this.setCell(ws, 'N1', 'Connected Capacity', true);
        this.setCell(ws, 'O1', 'No of Days', true);
        this.setCell(ws, 'P1', 'Modelled', true);

        this.setCell(ws, 'J2', 'Insolation');
        this.setCell(ws, 'K2', '6.73');
        this.setCell(ws, 'L2', { formula: '(K2)' });
        this.setCell(ws, 'M2', '0');
        this.setCell(ws, 'N2', '2370.51');
        this.setCell(ws, 'O2', '1');
        this.setCell(ws, 'P2', { formula: '(N2*O2*K2)' });

        ['J', 'K', 'L', 'M', 'N', 'O', 'P'].map(row => {
            ws.mergeCells(`${row}2:${row}3`);
        })

        this.setCell(ws, 'J4', 'Downtime Loss');
        this.setCell(ws, 'K4', '0');
        this.setCell(ws, 'L4', '0');
        this.setCell(ws, 'M4', '0');

        this.setCell(ws, 'J5', 'Grid Outage Loss');
        this.setCell(ws, 'K5', '-147.92');
        this.setCell(ws, 'L5', '0');
        this.setCell(ws, 'M5', '0');

        this.setCell(ws, 'J6', 'Soiling Loss');
        this.setCell(ws, 'K6', '-234.29');
        this.setCell(ws, 'M6', '-79.6618825806452');

        this.setCell(ws, 'J7', 'Tilt Loss');
        this.setCell(ws, 'K7', '0');
        this.setCell(ws, 'M7', '0');

        this.setCell(ws, 'J8', 'Commissioning Loss/JMR Adjustment');
        this.setCell(ws, 'K8', '0');
        this.setCell(ws, 'M8', '0');

        this.setCell(ws, 'J9', 'DC Cable Loss');
        this.setCell(ws, 'K9', '-165.68');
        this.setCell(ws, 'M9', '-84.4415955354839');

        this.setCell(ws, 'J10', 'AC Loss');
        this.setCell(ws, 'K10', '-367');
        this.setCell(ws, 'M10', '-38.2377036387097');

        this.setCell(ws, 'J11', 'Inverter Efficiency');
        this.setCell(ws, 'K11', '-545.82');
        this.setCell(ws, 'M11', '-133.831962735484');

        this.setCell(ws, 'J12', 'Auxilary Loss');
        this.setCell(ws, 'K12', '-17');
        this.setCell(ws, 'M12', '-100.373972051613');

        this.setCell(ws, 'J13', 'Transmission Loss');
        this.setCell(ws, 'K13', '0');
        this.setCell(ws, 'M13', '0');

        this.setCell(ws, 'J14', 'Inverter clipping Loss');
        this.setCell(ws, 'K14', '0');
        this.setCell(ws, 'M14', '-2.38985647741936');

        [6, 7, 8, 9, 10, 11, 12, 13, 14].map(col => {
            this.setCell(ws, `L${col}`, { formula: `(M${col})` });
        })

        this.setCell(ws, 'J15', 'MODEL ADJUSTED LOSSES');
        ws.mergeCells('J15:M15');

        this.setCell(ws, 'J16', 'IAM');
        this.setCell(ws, 'K16', '-3.11%');
        ws.mergeCells('K16:M16');

        this.setCell(ws, 'J17', 'Pv loss Due to Irradiance');
        this.setCell(ws, 'K17', '-0.59%');
        ws.mergeCells('K17:M17');

        this.setCell(ws, 'J18', 'Derate');
        this.setCell(ws, 'K18', '-5.3%');
        ws.mergeCells('K18:M18');

        this.setCell(ws, 'J19', 'Temperature');
        this.setCell(ws, 'K19', '-7.78%');
        this.setCell(ws, 'L19', { formula: '(K19)' });
        this.setCell(ws, 'M19', '0%');

        this.setCell(ws, 'J20', 'Module Quality');
        this.setCell(ws, 'K20', '1.6%');
        ws.mergeCells('K20:M20');


        this.setCell(ws, 'J21', 'Array Mismatch');
        this.setCell(ws, 'K21', '-3.88%');
        ws.mergeCells('K21:M21');


        this.setCell(ws, 'J22', 'Shading');
        this.setCell(ws, 'K22', '-0.43%');
        ws.mergeCells('K22:M22');


        ws.properties.defaultColWidth = 15;
        ws.properties.defaultRowHeight = 12;

        ws.columns[2].width = 30;
        ws.columns[6].width = 50;
        ws.columns[9].width = 35;
        ws.columns[13].width = 20;

        // Set Style
        ['A1', 'A2', 'A3', 'A4', 'B1', 'C1', 'C4', 'D1', 'E1', 'F1', 'G1', 'G4', 'H1', 'I1', 'J1', "J2", "J3", "J4", "J5", "J6", "J7", "J8", "J9", "J10", "J11", "J12", "J13", "J14", "J15", "J16", "J1", "J7", "J18", "J19", "J20", "J21", "J22", 'K1', 'L1', 'M1', 'N1', 'O1', 'P1'].map(row => {
            ws.getCell(`${row}`).font = {
                color: { argb: '000000' },
                size: 11,
                bold: true
            }
        });
        ['N', 'O', 'P'].map(col => {
            ws.getCell(`${col}2`).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'f5ce12' }
            };
        });

        //Set Alignment
        [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].map(col => {
            ws.getCell(`A${col}`).alignment = { vertical: 'center', horizontal: 'left' };
            ws.getCell(`G${col}`).alignment = { vertical: 'center', horizontal: 'left' };
        });
        [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 17, 18, 19, 20, 21, 22].map(col => {
            ws.getCell(`J${col}`).alignment = { vertical: 'center', horizontal: 'left' };
            ws.getCell(`J${col}`).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'ffba7e' }
            };
        });

        //Set Number Format
        ws.getCell('B4').numFmt = '0.00%';
        ws.getCell('D4').numFmt = '0.00%';
        ws.getCell('H4').numFmt = '0.00%';
        ws.getCell('H18').numFmt = '0.00%';

        [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(col => {
            ws.getCell(`K${col}`).numFmt = '0.00';
            ws.getCell(`L${col}`).numFmt = '0.00';
            ws.getCell(`M${col}`).numFmt = '0.00';
        });

        [16, 17, 18, 19, 20, 21, 22].map(col => {
            ws.getCell(`K${col}`).numFmt = '0.00%';
        });

        [5, 18, 19].map(col => {
            ws.getCell(`D${col}`).numFmt = '0.00%';
            ws.getCell(`E${col}`).numFmt = '0.00%';
            ws.getCell(`F${col}`).numFmt = '0.00%';
        });

        [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map(col => {
            ws.getCell(`D${col}`).numFmt = '0.00';
            ws.getCell(`E${col}`).numFmt = '0.00%';
            ws.getCell(`F${col}`).numFmt = '0.00';
        });

        wb.xlsx.writeBuffer().then(res => {
            saveAs(new Blob([res]), 'Performance Analysis.xlsx')
        });
    }


    setCell(ws, cellRef, text) {
        ws.getCell(cellRef).value = Number(text) ? Number(text) : text;
        ws.getCell(cellRef).font = {
            color: { argb: '000000' },
            size: 11
        };
        ws.getCell(cellRef).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'c6e0b4' }
        };
        if (!text.toString().includes('Generation')) {
            ws.getCell(cellRef).border = {
                top: { style: 'thin', color: { argb: '000000' } },
                left: { style: 'thin', color: { argb: '000000' } },
                bottom: { style: 'thin', color: { argb: '000000' } },
                right: { style: 'thin', color: { argb: '000000' } }
            }
        };
        ws.getCell(cellRef).alignment = { vertical: 'center', horizontal: 'center' };
    }

    performanceAnalysisInfo() {
        // let plantIds = [];
        // this.state.selectedPlantOptions && this.state.selectedPlantOptions.length > 0 && this.state.selectedPlantOptions.map((item) => {return plantIds.push(item.id) });
        // plantIds.length > 0 && 
        let inputParam;
        // const defaultParam = {"dataFlag": 0,
        //     "date": "string",
        //     "fromDate": "string",
        //     "hubId": 0,
        //     "plantIds": [
        //         0
        //     ],
        //     "plant_id": 0,
        //     "time": "string",
        //     "toDate": "string",
        //     "userId": 0,
        //     "year": "string"};
        //     if (this.state.selectedDuration == "2"){
        //         const year = this.state.selectedYear;
        //         const month = this.state.selectedMonth;
        //         const lastDay = (new Date(parseInt(year), parseInt(month), 0)).getDate();
        //         const getFromDate = year + "-" + month + "-" + "01";
        //         const getToDate = (year + "-" + month + "-" + lastDay);//.toString("MM/dd/yyyy");
        //         inputParam = {plantIds: [this.state.selectedPlantOptions.id], fromDate:this.state.getFromDate, toDate:this.state.getToDate, dataFlag: this.state.selectedDuration};
        //     } else {
        //         inputParam = {plantIds: [this.state.selectedPlantOptions.id], fromDate:this.state.toDate, toDate:this.state.toDate, dataFlag: this.state.selectedDuration};
        //     }
        // this.props.getPerformanceAnalysisByPlantIdsDate({...defaultParam, ...inputParam});
        // this.setState({ showPerformnceinfo: true })
        let today = new Date();
        let year = today.getFullYear() - 1;
        let _todayDate = today.getFullYear() + '-' + (today.getMonth() + 1).toString().padStart(2, 0) + '-' + today.getDate();
        let _lastYear = year + "-04-01";
        if (!(this.state.fromDate)) {
            this.setState({ fromDate: _lastYear });
        }
        if (!(this.state.toDate)) {
            this.setState({ toDate: _lastYear });
        }
        if (this.state.selectedDuration === "1") {
            const defaultParam = {
                "dataFlag": 0,
                "date": "string",
                "fromDate": "string",
                "hubId": 0,
                "month": "string",
                "ndays": "1",
                "plantIds": [
                    0
                ],
                "plantType": "string",
                "plant_id": 0,
                "tdays": "1",
                "time": "string",
                "toDate": "string",
                "userId": 0,
                "year": "string"
            }
            let _date = this.state.toDate && (this.state.toDate).split("-");
            let _year = _date[0];
            let _month = _date[1];
            let _day = _date[2];
            let tdays = this.state.toDate && this.getDategetDaysInMonth(_month, _year);
            inputParam = { plant_id: this.state.selectedPlantOptions.id, date: this.state.toDate, fromDate: this.state.toDate, toDate: this.state.toDate, dataFlag: this.state.selectedDuration, tdays: tdays, ndays: parseInt(_day) };
            this.props.getAllDataforPerformance({ ...defaultParam, ...inputParam })
        }
        else if (this.state.selectedDuration === "2") {
            const defaultParam = {
                "dataFlag": 0,
                "date": "string",
                "fromDate": "string",
                "hubId": 0,
                "month": "string",
                "ndays": "string",
                "plantIds": [
                    0
                ],
                "plantType": "string",
                "plant_id": 0,
                "tdays": "string",
                "time": "string",
                "toDate": "string",
                "userId": 0,
                "year": "string"
            }
            let _date = null;
            if (this.state.selectedMonth === "February") {
                _date = this.state.selectedYear + "-04-01";
            } else {
                _date = this.state.selectedYear + "-" + this.state.selectedMonth + "-" + "01";
            }
            inputParam = { plant_id: this.state.selectedPlantOptions.id, date: _date, dataFlag: this.state.selectedDuration };
            this.props.getAllDataforPerformance2({ ...defaultParam, ...inputParam })
        }
        else if (this.state.selectedDuration === "3") {
            const defaultParam = {
                "dataFlag": 0,
                "date": "string",
                "fromDate": "string",
                "hubId": 0,
                "month": "string",
                "ndays": "string",
                "plantIds": [
                    0
                ],
                "plantType": "string",
                "plant_id": 0,
                "tdays": "string",
                "time": "string",
                "toDate": "string",
                "userId": 0,
                "year": "string"
            }
            const _date = this.state.selectedYear + "-" + this.state.selectedMonth + "-" + "01";
            let _date1 = _todayDate && _todayDate.split("-");
            let _year = _date1[0];
            let _month = _date1[1];
            let _day = _date1[2];
            let tdays = _todayDate && this.getDategetDaysInMonth(_month, _year);
            inputParam = { plant_id: this.state.selectedPlantOptions.id, date: _lastYear, fromDate: _lastYear, toDate: _todayDate, dataFlag: this.state.selectedDuration, ndays: parseInt(_day), tdays: tdays };
            this.props.getAllDataforPerformance({ ...defaultParam, ...inputParam })
        }
        else if (this.state.selectedDuration == "4") {
            const defaultParam = {
                "dataFlag": 0,
                "date": "string",
                "fromDate": "string",
                "hubId": 0,
                "month": "string",
                "ndays": "string",
                "plantIds": [
                    0
                ],
                "plantType": "string",
                "plant_id": 0,
                "tdays": "string",
                "time": "string",
                "toDate": "string",
                "userId": 0,
                "year": "string"
            }
            const _date = this.state.selectedYear + "-" + this.state.selectedMonth + "-" + "01";
            let _date1 = this.state.toDate && (this.state.toDate).split("-");
            let _year = _date1[0];
            let _month = _date1[1];
            let _day = _date1[2];
            let tdays = this.state.toDate && this.getDategetDaysInMonth(_month, _year);
            inputParam = { plant_id: this.state.selectedPlantOptions.id, date: this.state.fromDate, fromDate: this.state.fromDate, toDate: this.state.toDate, dataFlag: this.state.selectedDuration, ndays: parseInt(_day), tdays: tdays };
            this.props.getAllDataforPerformance({ ...defaultParam, ...inputParam })
        }

    }

    getDropDownPlants() {
        let plants = [];
        plants.push({ displayText: "Select Plant", value: "0" })
        this.state.plantTypes && this.state.plantTypes.map((item) => {
            plants.push({ displayText: item.plantName, value: item.plantId })
        });

        return plants;
    }

    handleChangePlants(event) {
        const selectedValue = event.target.value;
        this.setState({ selectedPlantOptions: selectedValue });
    }

    handleChange(event) {
        const selectedValue = event.target.value;
        if (selectedValue && selectedValue !== "-1") {
            this.setState({ selectedDuration: selectedValue })
        }
    }

    handleChangeMonth(event) {
        const selectedValue = event.target.value;
        this.setState({ selectedMonth: selectedValue })
    }

    handleChangeYear(event) {
        const selectedValue = event.target.value;
        this.setState({ selectedYear: selectedValue })
    }

    rendercSearchOption() {
        return (
            <React.Fragment>
                <Col lg={1} md={1} sm={6} className="small_percent_width">
                    <Form.Label>From:</Form.Label>
                </Col>
                <Col lg={2} md={2} sm={6} className="large_percent_width">
                    <Form.Control className="top-search-input" type="date" name="fromDate" readyOnly={false} onChange={(val) => this.handleChangeFromDate(val)} />
                </Col>
                <Col lg={1} md={1} sm={6} className="small_percent_width">
                    <Form.Label>To:</Form.Label>
                </Col>
                <Col lg={2} md={2} sm={6} className="large_percent_width">
                    <Form.Control className="top-search-input" type="date" name="toDate" readyOnly={false} onChange={(val) => this.handleChangeToDate(val)} />
                </Col>
            </React.Fragment>
        )
    }
    renderYTDCOption() {
        return (<React.Fragment>
            <Col lg={1} md={1} sm={6} className="small_percent_width">
                <Form.Label>From:</Form.Label>
            </Col>
            <Col lg={2} md={2} sm={6} className="large_percent_width">
                <Form.Control className="top-search-input" name="frmDt" type="text" readyOnly={true} value={this.props.fromYTD} />
            </Col>
            <Col lg={1} md={1} sm={6} className="small_percent_width">
                <Form.Label>To:</Form.Label>
            </Col>
            <Col lg={2} md={2} sm={6} className="large_percent_width">
                <Form.Control className="top-search-input" name="tDt" type="text" readyOnly={true} value={this.props.toYTD} />
            </Col>

        </React.Fragment>)
    }

    renderMonthOption() {
        return (
            <React.Fragment>
                <Col lg={1} md={1} sm={6} className="small_percent_width">
                    <Form.Label>Month:</Form.Label>
                </Col>
                <Col lg={2} md={2} sm={6} className="large_percent_width">
                    <DropDown
                        className="top-search-input form-control"
                        Name="month"
                        itemSource={this.props.month}
                        value={this.state.selectedMonth}
                        handleChange={(item) => this.handleChangeMonth(item)}
                    />
                </Col>
                <Col lg={1} md={1} sm={6} className="small_percent_width">
                    <Form.Label>Years:</Form.Label>
                </Col>
                <Col lg={2} md={2} sm={6} className="large_percent_width">
                    <DropDown
                        className="top-search-input form-control"
                        Name="years"
                        itemSource={this.props.years}
                        value={this.state.selectedYear}
                        handleChange={(item) => this.handleChangeYear(item)}
                    />
                </Col>
            </React.Fragment>
        )
    }

    renderDaillyOPtion() {
        let today = new Date();
        let _todayDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        return (
            <React.Fragment>
                <Col lg={1} md={1} sm={6} className="small_percent_width">
                    <Form.Label>To:</Form.Label>
                </Col>
                <Col lg={2} md={2} sm={6} className="large_percent_width">
                    <Form.Control className="top-search-input" name="toDate" type="date" value={this.state.toDate} onChange={(val) => this.handleChangeToDate(val)} />
                </Col>
            </React.Fragment>

        )
    }

    render() {
        let placeholder = "Search";
        return (
            <div>
                <div className="animated fadeIn">
                    <Card style={{ maxWidth: "1264px", margin: "auto" }}>
                        <Card.Body>
                            <Nav variant='tabs' defaultActiveKey="/">
                                <Link className="link-tab" to="/performanceAnalysis">PerformanceAnalysis</Link>
                            </Nav>
                            <div className="main-content">
                                <div class="subHead">
                                    <h5 style={{ fontSize: "16px" }}>
                                        Performance Analysis
                                    </h5>
                                </div>
                                <div className="top-filters-lender">
                                    <div className="row" style={{ alignItems: "center", margin: "0" }} >
                                        <Col lg={1} md={1} sm={6} className="small_percent_width">
                                            <Form.Label>Duration:</Form.Label>
                                        </Col>
                                        <Col lg={2} md={2} sm={6} className="large_percent_width">
                                            <DropDown
                                                onChange={(event) => this.handleChange(event)}
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
                                                Name="plantType"
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
                                                className="top-search-input"
                                                value={this.state.selectedPlantOptions}
                                                options={this.getPlantTypesDropDownOptions()}
                                                onChange={(val) => this.selectMultipleOption(val)}
                                                open={false}
                                                valueKey="id"
                                                labelKey="name"
                                                multiple={false}
                                                includeSelectAll={false}
                                                includeFilter={false}
                                                dropdownHeight={250}
                                            //filterPlaceholder={placeholder}
                                            />
                                        </Col>
                                        {this.state.selectedDuration === "" && this.renderDaillyOPtion()}
                                        {this.state.selectedDuration && (this.state.selectedDuration === "1") && this.renderDaillyOPtion()}
                                        {this.state.selectedDuration && (this.state.selectedDuration === "2") && this.renderMonthOption()}
                                        {this.state.selectedDuration && (this.state.selectedDuration === "3") && this.renderYTDCOption()}
                                        {this.state.selectedDuration && (this.state.selectedDuration === "4") && this.rendercSearchOption()}
                                    </div>
                                    <div className="row" style={{ justifyContent: "center", margin: "0" }} >
                                        <Col lg={2} md={2} sm={6} className="large_percent_width">
                                            <Route render={({ history }) => (
                                                <button type="button" className="btn btn-primary view_button" style={{ width: "80%" }} onClick={() => this.performanceAnalysisInfo()}>
                                                    View
                                                </button>)} />
                                        </Col>
                                        <Col lg={2} md={2} sm={6} className="large_percent_width">
                                            <Route render={({ history }) => (
                                                <button type="button" className="btn btn-primary view_button" style={{ width: "80%" }} onClick={() => this.downloadPerformanceAnalysisInfo()}>
                                                    Download
                                                </button>)} />
                                        </Col>
                                    </div>
                                </div>
                                {
                                    this.state.performanceAnalysisData
                                    && <PerformanceAnalysisDeatils
                                        selectedPlantOptions={this.state.selectedPlantOptions}
                                        performanceAnalysisData={this.state.performanceAnalysisData}
                                        _toDate={this.state.toDate}
                                    />
                                }
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        );
    }
}

function getDateCurrentfunc() {
    let todayDate = new Date();
    const _date = new Date((todayDate.getMonth() - 1) + "/" + (todayDate.getDate()) + "/" + (todayDate.getFullYear()))
    return formatDate(_date);
}

function getDatefunc(action, option = null) {
    if (action === 'year') {
        let years = [];
        const todayDate = new Date();
        const strYear = todayDate.getFullYear();
        // {
        if (strYear) {
            let year = parseInt(strYear) - 7;
            const endYear = parseInt(strYear);
            let i;

            years.push({ displayText: "Select Year", value: 0 });
            for (i = parseInt(year); i <= endYear; i++) {
                // let addoneYear = parseInt(i) + 1;
                years.push({ displayText: i, value: i });
            }

        }
        // }
        return years;
    }
    else if (action === 'date') {
        let todayDate = new Date();
        console.log(todayDate);
        const _date = new Date((todayDate.getMonth() + 1) + "/" + (todayDate.getDate()) + "/" + (todayDate.getFullYear()))
        return formatDate(_date);
    }
    else if (action === 'month') {
        var month = new Array();
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";
        const todayDate = new Date();
        return month[todayDate.getMonth()];
    }
    else if (action === 'toYTD') {
        const todayDate = new Date();
        return formatDate(todayDate);
    }
    else if (action === 'fromYTD') {
        const fromdayDate = new Date();
        if (fromdayDate.getMonth() < 3) {
            return fromdayDate.getFullYear() - 1 + "-04-01";
        }
        else {
            return fromdayDate.getFullYear().toString() + "-04-01";
        }

    }
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

const mapStateToProps = (state, props) => {
    return {
        duration: [{ displayText: "Select Duration", value: "-1" }, { displayText: "Daily", value: "1" }, { displayText: "Monthly", value: "2" }, { displayText: "Daily with YTD", value: "3" }, { displayText: "Custom Search", value: "4" }],
        month: [{ displayText: "April", value: "04" }, { displayText: "May", value: "05" }, { displayText: "June", value: "06" }, { displayText: "July", value: "07" }, { displayText: "August", value: "08" }, { displayText: "September", value: "09" }, { displayText: "October", value: "10" },
        { displayText: "November", value: "11" }, { displayText: "December", value: "12" }, { displayText: "January", value: "01" }, { displayText: "February", value: "02" }, { displayText: "March", value: "03" }],
        years: getDatefunc("year"),
        plantType: [{ displayText: "Select Plant Type", value: "-1" }, { displayText: "GROUNDMOUNT", value: "GROUNDMOUNT" }, { displayText: "ROOFTOP", value: "ROOFTOP" }],
        todayDate: getDatefunc("date"),
        newDate: getDateCurrentfunc(),
        currentMonth: getDatefunc("month"),
        plantsByType: state.plants.plantsByType,
        plantTypes: state.projectTypes.plantTypes,
        plants: state.plants.plants,
        moduleAnalysisCleaningPlantID: state.plants.moduleAnalysisCleaningPlantID,
        moduleCleaningAnalysis: state.mcAnalysisReducer.moduleCleaningAnalysis,
        displayMessage: state.moduleCleaningReducer.displayMessage,
        fromYTD: getDatefunc("fromYTD"),
        toYTD: getDatefunc("toYTD"),
        performanceAnalysisData: state.PerformanceAnalysisReducers.performanceAnalysisData

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllDataforPerformance: (data) => dispatch(getAllDataforPerformance(data)),
        getAllDataforPerformance2: (data) => dispatch(getAllDataforPerformance2(data)),
        getPlantByType: (plantsByType) => dispatch(getPlantByType(plantsByType)),
        // getPerformanceAnalysisByPlantIdsDate: (data) => dispatch(getPerformanceAnalysisByPlantIdsDate(data)),
        getAllPlants: () => dispatch(getAllPlants()),
        getModuleCleaningByPlantId: (moduleAnalysisCleaningPlantID, plantName, plant_type) => dispatch(getModuleCleaningByPlantId(moduleAnalysisCleaningPlantID, plantName, plant_type)),
        getModuleCleaningAnalysisDataByDate: (plantId) => dispatch(getModuleCleaningAnalysisDataByDate(plantId)),
        clearModuleAnalysisData: () => dispatch(clearModuleAnalysisData()),
        createOrUpdateModuleCleaningAnalysis: (data) => dispatch(createOrUpdateModuleCleaningAnalysis(data))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PerformanceAnalysis));