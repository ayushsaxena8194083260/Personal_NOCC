import React, {Component} from 'react';
import ReactHighcharts from 'react-highcharts';
import Highcharts from 'highcharts';



class YtsAlertsCharts extends Component{
    
    constructor(props) {
        super(props)
        
    }


    render(){
        const YtsAlertsConfig={
            chart: {
                type: 'column',
                height:'260px'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: []
            },
            yAxis: {
                min: 0,
                title: {
                    text: ''
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: ( // theme
                            Highcharts.defaultOptions.title.style &&
                            Highcharts.defaultOptions.title.style.color
                        ) || 'gray'
                    }
                }
            },
            legend: {
                enabled:false
                // align: 'right',
                // x: -30,
                // verticalAlign: 'top',
                // y: 25,
                // floating: true,
                // backgroundColor:
                //     Highcharts.defaultOptions.legend.backgroundColor || 'white',
                // borderColor: '#CCC',
                // borderWidth: 1,
                // shadow: false
            },
            credits:{
                enabled:false
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
            },
            // plotOptions: {
            //     column: {
            //         stacking: 'normal',
            //         dataLabels: {
            //             enabled: false
            //         }
            //     }
            // },
            series: []
            
        }

        const result={...YtsAlertsConfig, ...this.props}

        return(
            <div onDoubleClick={()=> this.props.onDoubleClickEvent && this.props.onDoubleClickEvent(this.props.index)}>
            {console.log(result)}
                <ReactHighcharts config={result}/>
            </div>
        )
    }
}

export default YtsAlertsCharts;
