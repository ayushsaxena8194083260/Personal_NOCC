import React, { Component } from 'react';
import ReactHighcharts from "react-highcharts";
import Highcharts from 'highcharts';
import {
    HighchartsChart, Chart, ColumnSeries, ScatterSeries, SplineSeries, withHighcharts, XAxis, YAxis, Title, Pane, Tooltip, Legend, Series, Subtitle,
} from 'react-jsx-highcharts';


class ColumnCombinedBarChart extends Component {
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
            xAxis: {                
                categories: []
            },
            yAxis: {
                min: 0,
                title: {
                    text: this.props.yTitle,
                    style: { color: '#003AFA' }
                },
                labels: {
                    style: { color: '#003AFA' },
                    formatter: function () {
                        return this.value;
                    }
                },
                stackLabels: {
                    enabled: true,
                    useHTML: true,
                    y: -15,
                    style: {
                        color: 'gray',
                        position: 'absolute'
                    },
                    formatter: function () {                        
                        return "<font color='blue'>stackLabels -> formatter</font>";
                    }

                }
            },
            credits:{
                enabled:false
            },
            legend: {
                enabled: true
            },
            tooltip: {
                useHTML: true,
                shared: false,
                // formatter: function () {
                //     var text = '<b>' + this.x + '</b><br/>';

                //     if (this.x === 'Net Generation') {
                //         //text += 'Revenue:' + Highcharts.numberFormat(this.point['revenue'], 2, '.', '') + ' INR <br/>' + this.series.name + ':' + Highcharts.numberFormat(this.y, 2, '.', '') + ' ' + toolTipUnit + '<br/><font color="blue">Portfolio ' + report + '</font>:' + Highcharts.numberFormat(this.point.stackTotal, 2, '.', '') + ' ' + toolTipUnit;
                //         text += 'Revenue:';
                //     }
                //     else {
                //         // text += this.series.name + ':' + Highcharts.numberFormat(this.y, 2, '.', '') + ' ' + toolTipUnit + '<br/><font color="blue">Portfolio ' + report + '</font>:' + Highcharts.numberFormat(this.point.stackTotal, 2, '.', '') + ' ' + toolTipUnit;

                //         text += this.series.name;
                //     }
                //     return text;
                // }
                // headerFormat: '<b>{point.x}</b><br/>',
                // pointFormat: '{point.y}: {point.y:.1f}'
            },
            // plotOptions: {
            //     column: {
            //         stacking: 'normal',
            //         dataLabels: {
            //             enabled: true
            //         }
            //     }
            // },
            series: this.props.series,
            animation: {
                duration: 50,
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                },
                column: {
                    colorByPoint: true,
                    borderWidth: 0
                }
            }
        }

        return columnBar;

    }
    render() {
        const series = [this.props && this.props.series !== undefined ? this.props.series : []]
        const colData1 = series[0];
        const categories = [this.props && this.props.xAxis !== undefined ? this.props.xAxis.categories : []]
        return (
            <div>
                {console.log("CBAR DATAs", ...categories)}
                {/* <ReactHighcharts config={ColumnBar}/> */}
                {/* <ReactHighcharts config={this.getChartFormat()} /> */}
                <HighchartsChart height={230}>
                    <Chart height={230} />
                    <Title>{this.props.title ? this.props.title.text : ''}</Title>
                    <Legend enabled={true} />
                    <XAxis {...categories} />
                    <YAxis>
                        <Tooltip enabled={true} formatter={function () {
                            return '<b>' + Highcharts.numberFormat(this.x, 0) + '</b><br/>' +
                                'Energy: ' + this.y;

                        }} />
                        <YAxis.Title>Energy(KWh)</YAxis.Title>
                        <ColumnSeries {...colData1[0]} />
                        <SplineSeries {...colData1[1]} />
                    </YAxis>
                    <YAxis opposite>
                        <YAxis.Title>PLF(%)</YAxis.Title>
                        <ScatterSeries {...colData1[2]} />
                    </YAxis>
                </HighchartsChart>
            </div>
        );
    }
}
export default withHighcharts(ColumnCombinedBarChart, Highcharts);