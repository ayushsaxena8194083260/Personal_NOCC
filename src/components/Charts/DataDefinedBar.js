import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';

class DataDefinedBar extends Component{
    constructor(props) {
        super(props)
    }
    render(){
        const DataDefinedConfig={
            chart: {
                type: 'column',
                height:230
            },
            title: {
                text: ''
            },
            legend:{
                borderWidth: 1,
                borderRadius:5,
                padding:15,

            },
            xAxis: {
                //categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
                categories: []
            },
            credits: {
                enabled: false
            },
            series: []
            
        }
        const result = {...DataDefinedConfig, ...this.props}; 
        return(
            <div onDoubleClick={()=> this.props.onDoubleClickEvent && this.props.onDoubleClickEvent(this.props.index)}>
                {console.log(this.props)}
                <ReactHighcharts config={result}/>
            </div>
        );
    }
}
export default DataDefinedBar;