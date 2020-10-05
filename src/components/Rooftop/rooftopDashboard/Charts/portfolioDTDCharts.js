import React, {Component} from 'react';
import ReactHighcharts from 'react-highcharts';


class PortfolioDTDCharts extends Component{
  constructor(props) {
    super(props);
    
}
    render(){
      const PortfolioDTDConfig={
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null, 
            plotShadow: false,
            type: 'pie',
            height:'300px'
          },
          title: {
            text: ''
          },
          credits:{
            enabled:false
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
              }
            }
          },
          series:[]
          // series: [{
          //   name: 'Brands',
          //   colorByPoint: true,
          //   data: [{
          //     name: 'Delhi',
          //     y: 61.41,
          //     // sliced: true,
          //     selected: true
          //   }, {
          //     name: 'Hyderabad',
          //     y: 11.84
          //   }, {
          //     name: 'Chennai',
          //     y: 10.85
          //   }, {
          //     name: 'Calcutta & Siliguri',
          //     y: 4.67
          //   }, {
          //     name: 'Bhubaneswar',
          //     y: 4.18
          //   }, {
          //     name: 'Ajmer',
          //     y: 1.64
          //   }, {
          //     name: 'Gandhinagar',
          //     y: 1.6
          //   }, {
          //     name: 'Kanpur',
          //     y: 3.81
          //   }]
          // }]
    }

    const result = {...PortfolioDTDConfig, ...this.props} 
        return(
            <div>
                <ReactHighcharts config={result}/>
            </div>
        )
    }
}
export default PortfolioDTDCharts;