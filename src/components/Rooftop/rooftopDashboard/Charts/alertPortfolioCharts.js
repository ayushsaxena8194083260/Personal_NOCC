import React, {Component} from 'react';
import ReactHighcharts from 'react-highcharts';
// import {dateFormat} './../../utility/commonFunctions.js'

class AlertPortfolioCharts extends Component{
  constructor(props) {
    super(props);
    
}
    render(){
      const AlertPortfolioConfig={
        chart: {
            type: 'column',
            height:'300px'
          },
          title: {
            text: ''
          },
          xAxis: {
            // type: 'category',
            // title:{
            //   text:"20-nov"
            // }
          },
          // yAxis: {
          //   title: {
          //     text: 'Ticket number()'
          //   }
        
          // },
          
          credits:{
              enabled:false
          },
          // plotOptions: {
          //   series: {
          //     borderWidth: 0,
          //     dataLabels: {
          //       enabled: true,
          //       format: '{point.y:.1f}%'
          //     }
          //   }
          // },
        
          // tooltip: {
          //   headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          //   pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%'
          // },
          series: []
          
    }
    
    const result ={...AlertPortfolioConfig, ...this.props}
        return(
            <div onDoubleClick={()=> this.props.onDoubleClickEvent && this.props.onDoubleClickEvent(this.props.index)}>
                <ReactHighcharts config={result}/> 
            </div>
        )
    }
}
export default AlertPortfolioCharts;