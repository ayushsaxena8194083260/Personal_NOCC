import React, { Component } from 'react';
import ReactHighcharts from "react-highcharts";
import Highcharts from 'highcharts';
import GraphHub from "../HubDashboard/Pages/graphFirstPage";

class ColumnBarChart extends Component {
    constructor(props) {
        super(props)

    }
    getChartFormat() {
        const columnBar = {
            chart: {
                type: 'column',
                height: 230

            },
            title: {
                text: this.props.title,
                style: {
                    color: '#666',
                    fontWeight: 'normal',
                    fontSize: 13,
                },
                margin: 10,
                align: 'center'
            },
            credits: {
                enabled: false
            },
            xAxis: {
                //type: 'category',
                // labels: {
                //     rotation: -45,
                //     style: {
                //         fontSize: '11px',
                //         fontFamily: 'Verdana, sans-serif'
                //     }
                // },
                categories: this.props.categories


            },
            yAxis: {
                min: 0,
                title: {
                    text: this.props.yTitle,
                    style: { color: '#003AFA',fontWeight:"bold" }
                },
                labels: {
                    style: { color: '#003AFA' },
                    formatter: function () {
                        return this.value;
                    }
                },
                
            },
            // credits:{
            //     enabled:false
            // },
            stackLabels:this.props.stackLabels,
            legend: {
                enabled: false
            },
            tooltip: {
                useHTML: true,
                shared: false,
                formatter: function () {
                    var text = '<b>' + this.x + '</b><br/>';

                    if (this.x === 'Net Generation') {
                        //text += 'Revenue:' + Highcharts.numberFormat(this.point['revenue'], 2, '.', '') + ' INR <br/>' + this.series.name + ':' + Highcharts.numberFormat(this.y, 2, '.', '') + ' ' + toolTipUnit + '<br/><font color="blue">Portfolio ' + report + '</font>:' + Highcharts.numberFormat(this.point.stackTotal, 2, '.', '') + ' ' + toolTipUnit;
                        text += 'Revenue:';
                    }
                    else {
                        // text += this.series.name + ':' + Highcharts.numberFormat(this.y, 2, '.', '') + ' ' + toolTipUnit + '<br/><font color="blue">Portfolio ' + report + '</font>:' + Highcharts.numberFormat(this.point.stackTotal, 2, '.', '') + ' ' + toolTipUnit;

                        text += this.series.name;
                    }
                    return text;
                }
                // headerFormat: '<b>{point.x}</b><br/>',
                // pointFormat: '{point.y}: {point.y:.1f}'
            },
            plotOptions: {
            //     column: {
            //         stacking: 'normal',
            //         dataLabels: {
            //             enabled: true
            //         }
            //     }
                // {
                    series: {
                        cursor: 'pointer',
                        point: {
                            events: {
                                click: function () {
                                    return(
                                        <GraphHub />
                                    )
                                }
                            }
                        }
                    }
            },
            series: this.props.series,
            animation: {
                duration: 50,
            },

            plotOptions: {
                column: {
                    stacking: 'normal',
                    colorByPoint: true,
                    borderWidth: 2,
                    // dataLabels: {
                    //     enabled: true
                    // }
                }
            }

            // series: [{
            //     name: 'Net Generation',
            //     data: [5, 3, 4, 7, 2, 21.5, 25.2, 26.5, 23.3, 18.3, 26.5, 23.3, 18.3],
            //     // dataLabels: {
            //     //     enabled: false,
            //     //     rotation: -90,
            //     //     color: '#FFFFFF',
            //     //     align: 'right',
            //     //     format: '{point.y:.1f}', // one decimal
            //     //     y: 10, // 10 pixels down from the top
            //     //     style: {
            //     //         fontSize: '13px',
            //     //         fontFamily: 'Verdana, sans-serif'
            //     //     }
            //     // }
            // },{
            //     name: 'Budget Generation',
            //     //type: 'scatter',
            //     data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 26.5, 23.3, 18.3],
            //     // tooltip: {
            //     //     pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f}°C</b> '
            //     // }
            // }    

            // ]
        }
        console.log(columnBar)
        return columnBar;

    }

    render() {
        return (
            <div onDoubleClick={()=> this.props.onDoubleClickEvent && this.props.onDoubleClickEvent(this.props.index)}>
                {console.log(this.props.stackLabels)}
                {/* <ReactHighcharts config={ColumnBar}/> */}
                <ReactHighcharts config={this.getChartFormat()} />
            </div>
        );
    }
}
export default ColumnBarChart;