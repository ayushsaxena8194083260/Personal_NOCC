import React, { Component } from 'react';
import ReactHighcharts from "react-highcharts";
import Highcharts from 'highcharts';


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
                        text += 'Revenue:';
                    }
                    else {
                        text += this.series.name;
                    }
                    return text;
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
                }
            }
        }
        console.log(columnBar)
        return columnBar;

    }

    render() {
        const defaultChart = {
            chart:this.props.chart,
            title: this.props.title,
            legend:this.props.legend,
            yAxis: this.props.yAxis,
            animation: this.props.animation,
            plotOptions: this.props.plotOptions,
            // navigation: this.props.navigation,
            enabled: this.props.enabled,
            // index:this.props.index,
            xAxis:this.props.xAxis,
            series: this.props.series,
            credits: {
                enabled: false
            },
            tooltip: {
                useHTML: true,
                shared: false,
                formatter: function () {
                    var text = '<b>' + this.x + '</b><br/>';

                    if (this.x === 'Net Generation') {
                        text += 'Revenue:';
                    }
                    else {
                        text += this.series.name;
                    }
                    return text;
                }
            },
          }      
        return (
            <div>
                {console.log(this.props.stackLabels)}
                {/* <ReactHighcharts config={ColumnBar}/> */}
                <ReactHighcharts config={defaultChart} />
            </div>
        );
    }
}
export default ColumnBarChart;