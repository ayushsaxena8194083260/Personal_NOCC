import React, { Component } from "react";
import ReactHighcharts from "react-highcharts";


class ThreeDpie extends Component {
    constructor(props) {
        super(props)
        
    }
    
    render() {
        const threedpieview={
            chart: {
                type: 'pie',
                height:530,
                options3d: {
                    enabled: true,
                    alpha: 45,
                    beta: 0
                }
            },
            title: {
                text: this.props.title
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 35,
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}'
                    }
                }
            },
            series: [{
                type: 'pie',
                name: 'Browser share',
                data: this.props.resultData && this.props.resultData.length >0 && this.props.resultData.map((item)=>{ return [item.name, parseFloat(item.y)] }) 
                // [
                //     ['Firefox', 45.0],
                //     ['IE', 26.8],
                //     {
                //         name: 'Chrome',
                //         y: 12.8,
                //         sliced: true,
                //         selected: true
                //     },
                //     ['Safari', 8.5],
                //     ['Opera', 6.2],
                //     ['Others', 0.7]
                // ]
            }]
        }
        return (
            <ReactHighcharts config={{...this.props}} />
            // <ReactHighcharts config={GSpeedoMeter} />
        )
    }
}

export default ThreeDpie;