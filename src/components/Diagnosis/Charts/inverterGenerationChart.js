import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';
var HighchartsExporting = require('highcharts-exporting');
HighchartsExporting(ReactHighcharts.Highcharts);


class InverterGenerationBar extends Component{
    constructor(props) {
        super(props)
    }
    render(){
        const InverterGenerationConfig={
    //         chart:this.props.chart,
    //         title: this.props.title,
            // legend:this.props.legend,
    //         yAxis: this.props.yAxis,
    //   animation: this.props.animation,
    //   plotOptions: this.props.plotOptions,
    //   navigation: this.props.navigation,
    //   enabled: this.props.enabled,
    //   index:this.props.index,
    //   xAxis:this.props.xAxis,
    //   series: this.props.series,
            chart: {
                type: 'column',
                height:300
            },
            title: {
                text: ''
            },
            xAxis: {
                
                categories: []
            },
            yAxis:{
                title: {
                    text: 'Energy',
                    style:{
                        "font-family":"Lucida Grande",
                        "font-size":"12px",
                        "color":"#003AFA",
                        "font-weight":"bold",
                        "fill":"#003AFA"
                    }
                },
                
            },
            credits: {
                enabled: false
            },
            legend: {   
                enabled: this.props.id !== "564" && this.props.id !==  "565" ? true : false,    
                borderWidth: 1,
                borderRadius:5,
                // padding:15,
            },
            series: [],
            exporting: {
                enabled: true
            },
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
        
        const result = {...InverterGenerationConfig, ...this.props};
        console.log(this.props)
        return(
            <div onDoubleClick={()=> this.props.onDoubleClickEvent && this.props.onDoubleClickEvent(this.props.index)}>
                <ReactHighcharts config={result}/>
            </div>
        );
    }
}
export default InverterGenerationBar;