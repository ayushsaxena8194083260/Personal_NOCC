import React, { Component } from 'react';
import Highcharts from 'highcharts';
import ReactHighcharts from 'react-highcharts';
import {
  HighchartsChart, Chart, SplineSeries, withHighcharts, XAxis, YAxis, Title, Pane, Tooltip, Legend, Series, Subtitle,
} from 'react-jsx-highcharts';

class LineBasicChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle: this.props.subtitle,
      value: this.props.value,
      plotBands: this.props.plotBands,
      min: this.props.min,
      max: this.props.max,
      items: this.props.items,
      title: this.props.title,
      gaugeGraphs0: this.props.gaugeGraphs0
    }
  }

  componentDidMount() {
    console.log(this.props);
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.yAxis,'first Try');
    this.setState({
      subtitle: nextProps.subtitle,
      yAxis: nextProps.yAxis,
      plotBands: nextProps.plotBands,
      min: nextProps.min,
      max: nextProps.max,
      items: nextProps.items
    })
  }

  render() {
    const defaultChart = {
      chart:this.props.chart,
      title: this.props.title,
      legend:this.props.legend,
      yAxis: this.props.yAxis,
      animation: this.props.animation,
      plotOptions: this.props.plotOptions,
      navigation: this.props.navigation,
      enabled: this.props.enabled,
      index:this.props.index,
      xAxis:this.props.xAxis,
      series: this.props.series,
    }
const result = {...defaultChart };
    return(
      <div onDoubleClick={()=> this.props.onDoubleClickEvent && this.props.onDoubleClickEvent(this.props.index)}>
            {console.log({...result, credits:{enbaled:false}})}
          <ReactHighcharts config={result}/>
      </div>
   ); 
  }
}
export default withHighcharts(LineBasicChart, Highcharts);