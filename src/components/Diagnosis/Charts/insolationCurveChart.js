import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';


class InsolutionCurveChart extends Component{
    constructor(props) {
        super(props)
       
    }
    render(){
        const InsolutionCurveConfig={
            chart:{
                type: 'line',
                height:230,
            },
            credits:{
                enabled:false,
            },
            title: {
                text: 'Date from'
            },
        
            // subtitle: {
            //     text: 'Source: thesolarfoundation.com'
            // },
            xAxis: {
                allowDecimals: false,
            },
            yAxis: {
                title: {
                    text: 'Number of Employees'
                }
            },
            legend: {
                // layout: 'horizontal',
                // align: 'bottom',
                // verticalAlign: 'middle'
                enabled: this.props.id !=="430" && this.props.id !=="433"? true : false,
                borderWidth: 1,
                borderRadius:5,
                padding:15,
            },
        
            plotOptions: {
                // series: {
                //     label: {
                //         connectorAllowed: false
                //     },
                //     // pointStart: 2010
                // }
            },
            series: [],
            // series: [{
            //     name: 'Installation',
            //     data: [43934, 12503, 37177, 19658, 27031, 11993, 13713, 15417]
            // }],
        
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }
        }
        
        const result = {...InsolutionCurveConfig, ...this.props};
     return(
        <div onDoubleClick={()=> this.props.onDoubleClickEvent && this.props.onDoubleClickEvent(this.props.index)}>
            <ReactHighcharts config={result}/>
        </div>
     );
 }
}
export default InsolutionCurveChart