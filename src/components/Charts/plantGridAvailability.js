import React, { Component } from "react";
import Highcharts from "highcharts/highcharts.js";
import {
  HighchartsChart, withHighcharts, XAxis, YAxis, Title, Pane, Tooltip, Legend, Series, Subtitle, Charts
} from 'react-jsx-highcharts';
import { getAllPlants } from "../../actions/PlantActions";
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Picky from 'react-picky';
import 'react-picky/dist/picky.css';

require("highcharts/highcharts-more")(Highcharts);
require("highcharts/modules/exporting")(Highcharts);

class GaugeSpeedoMeter1 extends Component {
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
    // this.props.getAllPlants();
  }

  getPlantTypesDropDownOptions() {
    const options = this.state.plantTypes && this.state.plantTypes.map((plantTypes, key) => { return { id: plantTypes.plantId, name: plantTypes.plantName } });
    return options;
  }

  selectMultipleOption(value) {
    this.setState({ selectedPlantOptions: value });
  }

  render() {      
      const defaultChart = {
      chart: {
        type: 'gauge',
        //spacingTop: "1",
        spacingLeft: 15,
        height: 245,
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false
      },

      title: {
        text: "Date from: 2020-04-01 to: 2020-04-03",
        style: {
          color: "#666",
          fontWeight: "normal",
          fontSize: 13
        },
        margin: 10,
        align: "center"
      },

      pane: {
        startAngle: -150,
        endAngle: 150,
        background: {
          backgroundColor: [{
            backgroundColor: {
              linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
              stops: [
                [0, '#FFF'],
                [1, '#333']
              ]
            },
            borderWidth: 0,
            outerRadius: '109%'
          }, {
            backgroundColor: {
              linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
              stops: [
                [0, '#333'],
                [1, '#FFF']
              ]
            },
            borderWidth: 1,
            outerRadius: '107%'
          }, 
          {
            // default background
          }, {
            backgroundColor: '#DDD',
            borderWidth: 0,
            outerRadius: '105%',
            innerRadius: '103%'
        }]
    }
    },

      // the value axis
      yAxis: {
        min: 95,
        max: 100,
        minorTickInterval: "auto",
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: "inside",
        minorTickColor: "#666",
        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: "inside",
        tickLength: 10,
        tickColor: "#666",
        labels: {
          step: 2,
          rotation: 'auto'
        },
        title: {
          text: "Availability",
          y: 15,
          style: {
            color: "black",
            fontWeight: "bold"
          }
        },
        plotBands: [{
          from: 95,
          to: 98,
          color: '#DF5353' // green
        }, {
          from: 98,
          to: 99,
          color: '#ffbf00' // yellow
        }, {
          from: 99,
          to: 100,
          color: '#55BF3B' // red
        }],
      },

      series: [{
        name: '"Availability"',
        data: [100, 99.91],
        tooltip: {
          valueSuffix: "%"
        }
      }]

    }
    const result = {...defaultChart };
    const options = {
      title: {
        text: 'My stock chart'
      },
      series: [
        {
          data: [1, 2, 1, 4, 3, 6, 7, 3, 8, 6, 9]
        }
      ]
    };

    return(
      <div>
            {console.log(this.props)}
            <HighchartsChart  options={defaultChart} />
      </div>
   );
  }
}
export default withHighcharts(GaugeSpeedoMeter1, Highcharts);