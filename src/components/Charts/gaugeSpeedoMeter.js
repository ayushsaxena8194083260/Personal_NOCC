import React, { Component } from "react";
import Highcharts, { Chart } from 'highcharts';
import { HighchartsChart, withHighcharts, XAxis, YAxis, Title, Pane, Tooltip, Legend, Series, Subtitle, Charts } from 'react-jsx-highcharts';
import { getAllPlants } from "../../actions/PlantActions";
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Picky from 'react-picky';
import 'react-picky/dist/picky.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
require("highcharts/highcharts-more")(Highcharts);
require("highcharts/modules/exporting")(Highcharts);

class GaugeSpeedoMeter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle: this.props.subtitle,
      value: this.props.value,
      plotBands: this.props.plotBands,
      min: this.props.min,
      max: this.props.max,
      items: this.props.items,
      selectedPlantOptions: [],
    }
    // addHighchartsMore(Highcharts);
    // HighchartsExporting(Highcharts)
    //.onCompare = this.props.handleCompare.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      subtitle: nextProps.subtitle,
      yAxis: nextProps.yAxis,
      plotBands: nextProps.plotBands,
      min: nextProps.min,
      max: nextProps.max,
      items: nextProps.items,
      plantTypes: nextProps.plantTypes,
    })
  }

  componentDidMount() {
    this.props.getAllPlants();
  }

  renderSeries() {
    const _items = this.props.series && this.props.series.length > 0 && this.props.series.map((item) => {
      return <Series
        name={item.value + " MU " + item.name}
        type="gauge"
        showInLegend={true}
        color={item.color}
        data={item.series && item.series.data ? { ...item.series.data } : null}
        dial={item.series && item.series.dial ? { ...item.series.dial } : null}
        dataLabels={item.series && item.series.dataLabels ? { ...item.series.dataLabels } : null}
      />
    })

    return _items;
  }

  statisticsOnClick(statisticsText) {

  }

  getPlantTypesDropDownOptions() {
    const options = this.state.plantTypes && this.state.plantTypes.map((plantTypes, key) => { return { id: plantTypes.plantId, name: plantTypes.plantName } });
    return options;
  }

  selectMultipleOption(graphId, value) {
    this.setState({ selectedPlantOptions: value });
    this.props.selectMultiplePlants(graphId, value)
  }

  onCompare(gIndex) {
    // if(this.props.gIndex){
    this.props.handleCompare(this.props.gIndex)
    //}
  }
  onOpen(props) {
    // window.open('/report/DeviateExcelExportEXT/QTD/2019-2', '_blank')
    let type = 'QTD'
    let quarter = ''

    // if (this.props.type == 'YTD') {
    //   type = this.props.type
    //   quarter = '2019-2020'
    // } else {
    //   quarter = props.title.split(' ')[2].split('-').reverse().join('-') + ':' + props.title.split(' ')[4].split('-').reverse().join('-')
    // }

    quarter = props.title.split(' ')[2].split('-').reverse().join('-') + ':' + props.title.split(' ')[4].split('-').reverse().join('-')

    window.open(`/report/DeviationExtendedReport/${type}/${quarter}`, '_blank')
  }

  render() {
    let subTitleString = "";
    // console.log(this.props.plotBands, 'plotBands')
    const _subtitle = this.props.plotBands && this.props.plotBands.length > 0 && this.props.plotBands.map((item) => {
      const _str = `<span style='background-color: ${item.color} ;color:#000000;font-size:9px; border-radius: 2px; padding: 1px 2px;'>${item.from} - ${item.to}</span><br>`;
      subTitleString = subTitleString.concat(_str);
    });

    let NewSubTitleString = `<span style='position: absolute; white-space: nowrap; font-family: Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif; font-size: 12px; color: rgb(77, 117, 158); margin-left: 0px; margin-top: 0px; left: -2px; top: 6px;' class='highcharts-subtitle'> ${subTitleString}  </span>`
    return (
      <div id={this.props.id} style={{ height: "240px", overflow: "hidden" }}>
        <HighchartsChart id={this.props.id} gauge spacingTop={10} height={265} marginTop={-10}>
          {/* <Chart/> */}
          {this.props.showFilter && <div className="picky_container">
            {this.props.plantsShow &&
              <Picky
                value={this.state.selectedPlantOptions}
                options={this.getPlantTypesDropDownOptions()}
                onChange={(val) => this.selectMultipleOption(this.props.graphId, val)}
                open={false}
                valueKey="id"
                labelKey="name"
                multiple={true}
                includeSelectAll={true}
                includeFilter={true}
                dropdownWidth={250}
                dropdownHeight={250}
                filterPlaceholder="Search"
                placeholder="Plant List"
              />}
            {/* {this.props.statisticsShow && <button id="statisticsBtn" onClick={evt => this.statisticsOnClick(this.props.statisticsText)}>{this.props.statisticsText}</button>} */}
            <button className="chartInButton compare" onClick={this.onCompare.bind(this)}>Compare</button>
            <button className="chartInButtondev" onClick={() => this.onOpen(this.props)}>Dev Report</button>
          </div>}
          <Pane startAngle={-150} endAngle={150} size={150} center={["50%", "30%"]} />
          {this.props.title && <Title style={{
            "color": "#666",
            "font": "normal 14px",
            "fontSize": 13,
          }} margin={10} align={'center'}>{this.props.title}</Title>}

          {this.props.subtitleShow && <Subtitle useHTML='true' style={{ left: 0, top: 0 }} align="left"> {NewSubTitleString} </Subtitle>}
          {/* <Tooltip valueSuffix={this.props.tooltipValueSuffix} hideDelay={250} shape="square" split /> */}
          <XAxis />

          {this.props.yAxis && <YAxis {...this.props.yAxis}
            minorTickInterval={'auto'}
            minorTickWidth={1}
            minorTickLength={10}
            minorTickPosition={'inside'}
            minorTickColor={'#666'}
            tickPixelInterval={30}
            tickWidth={2}
            tickPosition={'inside'}
            tickLength={10}
            tickColor={'#666'}
            labels={{
              step: 3,
              rotation: "auto"
            }}
            plotBands={this.props.plotBands}
            min={this.props.min}
            max={this.props.max}
            dataLabels={{
              enabled: true
            }}
          >
            <YAxis.Title y={20} style={{ color: "blue", width: 30, fontWeight: "normal", fontSize: "8px" }}>{this.props.yTitle}</YAxis.Title>
            {this.props.legend && <Legend
              allowDecimals={false}
              itemWidth={150}
              itemStyle={{
                cursor: "default",
                color: "black",
                font: "9pt Trebuchet MS, Verdana, sans-serif",
                fontWeight: "bold"
              }}
              verticalAlign="top"
              layout={"vertical"}
              x={375}
              align={"bottom"}
              y={30}
              useHTML={true}
              floating={true}
              borderRadius={0}
              borderWidth={0}
            />}
            {this.props.series && this.props.series.length > 0 && this.props.series.map((item, index) => {
              return <Series
                name={item.data + " MU " + item.name}
                key={item.data + " MU " + item.name + index}
                type="gauge"
                showInLegend={true}
                color={item.color}
                data={[{
                  "y": parseFloat(item.data),
                  "color": item.color
                }]}
                dial={{
                  "backgroundColor": item.color,
                  "radius": "85%",
                  "rearLength": "0%",
                  "baseWidth": 6
                }}
                dataLabels={{
                  enabled: true,
                  color: "#4141FF"
                }}
                // data={{...item.data}}
                //dial={{ ...item.dial }}
                dataLabels={{ ...item.dataLabels }}
              />
            })}
          </YAxis>}

        </HighchartsChart>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    plantTypes: state.projectTypes.plantTypes,
    plants: state.plants.plants,
    plantType: [{ displayText: "Select Plant Type", value: "-1" }, { displayText: "GROUNDMOUNT", value: "GROUNDMOUNT" }, { displayText: "ROOFTOP", value: "ROOFTOP" }]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllPlants: () => dispatch(getAllPlants()),
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withHighcharts(GaugeSpeedoMeter, Highcharts)));
