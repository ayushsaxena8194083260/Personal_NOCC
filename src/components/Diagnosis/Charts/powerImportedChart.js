import React, {Component} from 'react';
import ReactHighcharts from 'react-highcharts';

const PowerImportedBar={
    chart: {
        type: 'column',
        height:230
    },
    title: {
        text: ''
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '11px',
                fontFamily: 'Verdana, sans-serif'
            }
        },
        categories: []

    },
    yAxis: {
        min: 0,
        title: {
            text: 'o'
        }
    },
    credits:{
        enabled:false
    },
    legend: {
        enabled: true,  
        borderWidth: 1,
        borderRadius:5,
        padding:15,
    },
    tooltip: {
        pointFormat: '{point.x:.1f}: <b>{point.y:.1f}</b>'
    },
    series: [],
    exporting: {
        enabled: true
    }
}

class PowerImportedCharts extends Component{
    constructor(props) {
        super(props)
       
    }
    render(){
        const result = {...PowerImportedBar, ...this.props};
        return(
            <div onDoubleClick={()=> this.props.onDoubleClickEvent && this.props.onDoubleClickEvent(this.props.index)}>
            {console.log(result)}
                {/* <ReactHighcharts config={ColumnBar}/> */}
                <ReactHighcharts config={result} />
            </div>
        );
    }
}
export default PowerImportedCharts;