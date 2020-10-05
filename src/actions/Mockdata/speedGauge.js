const response = [
    {
       "chart": {
          "renderTo": "canvas5e40119eb99d6",
          "type": "gauge",
          "spacingTop": 10,
          "spacingLeft": 15,
          "height": 245
       },
       "title": {
          "text": "Date from: 01\/04\/2019 to: 30\/06\/2019",
          "style": {
             "color": "#666",
             "font": "normal 14px",
             "fontSize": 13,
             "margin": 10,
             "align": "center"
          }
       },
       "legend": {
          "allowDecimals": false,
          "itemWidth": 150,
          "itemStyle": {
             "cursor": "default",
             "color": "black",
             "font": "9pt Trebuchet MS, Verdana, sans-serif",
             "fontWeight": "bold"
          },
          "verticalAlign": "top",
          "layout": "vertical",
          "x": 375,
          "align": "left",
          "y": 30,
          "useHTML": true,
          "floating": true,
          "borderRadius": 0,
          "borderWidth": 0,
          "labelFormatter": null
       },
       "pane": {
          "startAngle": -150,
          "endAngle": 150
       },
       "background": [
          {
             "backgroundColor": {
                "linearGradient": {
                   "x1": 0,
                   "y1": 0,
                   "x2": 0,
                   "y2": 1
                },
                "stops": [
                   [
                      0,
                      "#FFF"
                   ],
                   [
                      1,
                      "#333"
                   ]
                ]
             },
             "borderWidth": 0,
             "outerRadius": "109%"
          },
          {
             "backgroundColor": {
                "linearGradient": {
                   "x1": 0,
                   "y1": 0,
                   "x2": 0,
                   "y2": 1
                },
                "stops": [
                   [
                      0,
                      "#333"
                   ],
                   [
                      1,
                      "#FFF"
                   ]
                ]
             },
             "borderWidth": 1,
             "outerRadius": "107%"
          },
          null,
          {
             "backgroundColor": "#DDD",
             "borderWidth": 0,
             "outerRadius": "105%",
             "innerRadius": "103%"
          }
       ],
       "yAxis": {          
          "minorTickInterval": "auto",
          "minorTickWidth": 1,
          "minorTickLength": 10,
          "minorTickPosition": "inside",
          "minorTickColor": "#666",
          "tickPixelInterval": 30,
          "tickWidth": 2,
          "tickPosition": "inside",
          "tickLength": 10,
          "tickColor": "#666",
          "labels": {
             "step": 3,
             "rotation": "auto"
          },
          "title": {
             "text": "Generation (Kwh)",
             "y": 20             
          },
          "min": 0,
          "max": 700.10,
          "plotBands": [
             {
                "color": "#55BF3B",
                "from": "595.216",
                "to": "700.10"
             },
             {
                "color": "#ffbf00",
                "from": "574.383",
                "to": "595.216"
             },
             {
                "color": "#DF5353",
                "from": 0,
                "to": "574.383"
             }
          ]
       },
       "subtitle": {
          "text": "595.2 - 616.8<\/span>574.4 - 595.2<\/span>0 - 574.4<\/span>",
          "useHTML": true,
          "verticalAlign": "top",
          "x": 10,
          "y": 50,
          "align": "left"
       },
       "series": [
          {
             "name": "Budget",
             "value":616.804,
             "showInLegend": true,
             "color": "#000000",
             "data": [
                {
                   "y": 616.804,
                   "color": "#000000"
                }
             ],
             "dial": {
                "backgroundColor": "#000000",
                "radius": "85%",
                "rearLength": "0%",
                "baseWidth": 3
             },
             "dataLabels": {
                "enabled": false
             }
          },
          {
             "name": "Actual",
             "value":700.1,
             "showInLegend": true,
             "color": "#4141FF",
             "data": [
                {
                   "y": 700.1,
                   "color": "#4141FF"
                }
             ],
             "dial": {
                "backgroundColor": "#4141FF",
                "radius": "85%",
                "rearLength": "0%",
                "baseWidth": 7
             },
             "dataLabels": {
                "formatter": null
             },
             "tooltip": {
                "valueSuffix": "MU "
             }
          }
       ],
       "exporting": {
          "buttons": {
             "customButton": {
                "x": -17,
                "y": -17,
                "align": "right",
                "verticalAlign": "top",
                "onclick": null,
                "text": "Dev Report"
             },
             "customButton2": {
                "x": -74,
                "y": -7,
                "align": "right",
                "verticalAlign": "top",
                "onclick": null,
                "text": "Compare"
             }
          }
       }
    },
    {
       "chart": {
          "renderTo": "canvas15e40119eb99d6",
          "type": "gauge",
          "spacingTop": 0,
          "spacingBottom": 30,
          "width": 200,
          "height": 325
       },
       "title": {
          "text": "April",
          "style": {
             "color": "#666",
             "fontWeight": "normal",
             "width": "150px",
             "fontSize": 13
          },
          "margin": 10,
          "align": "center"
       },
       "legend": {
          "allowDecimals": false,
          "itemWidth": 150,
          "itemStyle": {
             "cursor": "default",
             "color": "black"
          },
          "align": "bottom",
          "verticalAlign": "top",
          "layout": "vertical",
          "x": 0,
          "y": 220,
          "useHTML": true,
          "floating": true,
          "borderRadius": 0,
          "borderWidth": 0,
          "labelFormatter": null
       },
       "pane": {
          "startAngle": -150,
          "endAngle": 150,
          "center": [
             90,
             110
          ]
       },
       "background": [
          {
             "backgroundColor": {
                "linearGradient": {
                   "x1": 0,
                   "y1": 0,
                   "x2": 0,
                   "y2": 1
                },
                "stops": [
                   [
                      0,
                      "#FFF"
                   ],
                   [
                      1,
                      "#333"
                   ]
                ]
             },
             "borderWidth": 0,
             "outerRadius": "109%"
          },
          {
             "backgroundColor": {
                "linearGradient": {
                   "x1": 0,
                   "y1": 0,
                   "x2": 0,
                   "y2": 1
                },
                "stops": [
                   [
                      0,
                      "#333"
                   ],
                   [
                      1,
                      "#FFF"
                   ]
                ]
             },
             "borderWidth": 1,
             "outerRadius": "107%"
          },
          null,
          {
             "backgroundColor": "#DDD",
             "borderWidth": 0,
             "outerRadius": "105%",
             "innerRadius": "103%"
          }
       ],
       "yAxis": {
          "min": 0,
          "minorTickInterval": "auto",
          "minorTickWidth": 1,
          "minorTickLength": 10,
          "minorTickPosition": "inside",
          "minorTickColor": "#666",
          "tickPixelInterval": 30,
          "tickWidth": 2,
          "tickPosition": "inside",
          "tickLength": 10,
          "tickColor": "#666",
          "labels": {
             "step": 3,
             "rotation": "auto"
          },
          "title": {
             "text": "Generation (Kwh)",
             "y": 20,
             "style": {
                "color": "blue",
                "width": 30,
                "fontWeight": "normal",
                "fontSize": 8
             }
          },
          "max": "221.53",
          "plotBands": [
             {
                "color": "#55BF3B",
                "from": "170.895",
                "to": "221.53"
             },
             {
                "color": "#ffbf00",
                "from": "164.913",
                "to": "170.895"
             },
             {
                "color": "#DF5353",
                "from": 0,
                "to": "164.913"
             }
          ]
       },
       "subtitle": {
          "text": "170.9 - 177.1<\/span>164.9 - 170.9<\/span>0 - 164.9<\/span>",
          "useHTML": true,
          "verticalAlign": "top",
          "x": -5,
          "y": 40,
          "textOverflow": "none",
          "whiteSpace": "nowrap"
       },
       "series": [
          {
             "name": "Budget",
             "showInLegend": true,
             "color": "#000000",
             "data": [
                {
                   "y": 177.093,
                   "color": "#000000"
                }
             ],
             "dial": {
                "backgroundColor": "#000000",
                "radius": "85%",
                "rearLength": "0%",
                "baseWidth": 7
             },
             "dataLabels": {
                "enabled": false
             }
          },
          {
             "name": "Actual",
             "showInLegend": true,
             "color": "#4141FF",
             "data": [
                {
                   "y": 221.53,
                   "color": "#4141FF"
                }
             ],
             "dial": {
                "backgroundColor": "#4141FF",
                "radius": "85%",
                "rearLength": "0%",
                "baseWidth": 3
             },
             "dataLabels": {
                "formatter": null
             },
             "tooltip": {
                "valueSuffix": "MU "
             }
          }
       ]
    },
    {
       "chart": {
          "renderTo": "canvas25e40119eb99d6",
          "type": "gauge",
          "spacingTop": 0,
          "spacingBottom": 30,
          "width": 200,
          "height": 325
       },
       "title": {
          "text": "May",
          "style": {
             "color": "#666",
             "fontWeight": "normal",
             "width": "150px",
             "fontSize": 13
          },
          "margin": 10,
          "align": "center"
       },
       "legend": {
          "allowDecimals": false,
          "itemWidth": 150,
          "itemStyle": {
             "cursor": "default",
             "color": "black"
          },
          "align": "bottom",
          "verticalAlign": "top",
          "layout": "vertical",
          "x": 0,
          "y": 220,
          "useHTML": true,
          "floating": true,
          "borderRadius": 0,
          "borderWidth": 0,
          "labelFormatter": null
       },
       "pane": {
          "startAngle": -150,
          "endAngle": 150,
          "center": [
             90,
             110
          ]
       },
       "background": [
          {
             "backgroundColor": {
                "linearGradient": {
                   "x1": 0,
                   "y1": 0,
                   "x2": 0,
                   "y2": 1
                },
                "stops": [
                   [
                      0,
                      "#FFF"
                   ],
                   [
                      1,
                      "#333"
                   ]
                ]
             },
             "borderWidth": 0,
             "outerRadius": "109%"
          },
          {
             "backgroundColor": {
                "linearGradient": {
                   "x1": 0,
                   "y1": 0,
                   "x2": 0,
                   "y2": 1
                },
                "stops": [
                   [
                      0,
                      "#333"
                   ],
                   [
                      1,
                      "#FFF"
                   ]
                ]
             },
             "borderWidth": 1,
             "outerRadius": "107%"
          },
          null,
          {
             "backgroundColor": "#DDD",
             "borderWidth": 0,
             "outerRadius": "105%",
             "innerRadius": "103%"
          }
       ],
       "yAxis": {
          "min": 0,
          "minorTickInterval": "auto",
          "minorTickWidth": 1,
          "minorTickLength": 10,
          "minorTickPosition": "inside",
          "minorTickColor": "#666",
          "tickPixelInterval": 30,
          "tickWidth": 2,
          "tickPosition": "inside",
          "tickLength": 10,
          "tickColor": "#666",
          "labels": {
             "step": 3,
             "rotation": "auto"
          },
          "title": {
             "text": "Generation (Kwh)",
             "y": 20,
             "style": {
                "color": "blue",
                "width": 30,
                "fontWeight": "normal",
                "fontSize": 8
             }
          },
          "max": "249.20",
          "plotBands": [
             {
                "color": "#55BF3B",
                "from": "203.735",
                "to": "249.20"
             },
             {
                "color": "#ffbf00",
                "from": "196.604",
                "to": "203.735"
             },
             {
                "color": "#DF5353",
                "from": 0,
                "to": "196.604"
             }
          ]
       },
       "subtitle": {
          "text": "203.7 - 211.1<\/span>196.6 - 203.7<\/span>0 - 196.6<\/span>",
          "useHTML": true,
          "verticalAlign": "top",
          "x": -5,
          "y": 40,
          "textOverflow": "none",
          "whiteSpace": "nowrap"
       },
       "series": [
          {
             "name": "Budget",
             "showInLegend": true,
             "color": "#000000",
             "data": [
                {
                   "y": 211.124,
                   "color": "#000000"
                }
             ],
             "dial": {
                "backgroundColor": "#000000",
                "radius": "85%",
                "rearLength": "0%",
                "baseWidth": 7
             },
             "dataLabels": {
                "enabled": false
             }
          },
          {
             "name": "Actual",
             "showInLegend": true,
             "color": "#4141FF",
             "data": [
                {
                   "y": 249.2,
                   "color": "#4141FF"
                }
             ],
             "dial": {
                "backgroundColor": "#4141FF",
                "radius": "85%",
                "rearLength": "0%",
                "baseWidth": 3
             },
             "dataLabels": {
                "formatter": null
             },
             "tooltip": {
                "valueSuffix": "MU "
             }
          }
       ]
    },
    {
       "chart": {
          "renderTo": "canvas35e40119eb99d6",
          "type": "gauge",
          "spacingTop": 0,
          "spacingBottom": 30,
          "width": 200,
          "height": 325
       },
       "title": {
          "text": "June",
          "style": {
             "color": "#666",
             "fontWeight": "normal",
             "width": "150px",
             "fontSize": 13
          },
          "margin": 10,
          "align": "center"
       },
       "legend": {
          "allowDecimals": false,
          "itemWidth": 150,
          "itemStyle": {
             "cursor": "default",
             "color": "black"
          },
          "align": "bottom",
          "verticalAlign": "top",
          "layout": "vertical",
          "x": 0,
          "y": 220,
          "useHTML": true,
          "floating": true,
          "borderRadius": 0,
          "borderWidth": 0,
          "labelFormatter": null
       },
       "pane": {
          "startAngle": -150,
          "endAngle": 150,
          "center": [
             90,
             110
          ]
       },
       "background": [
          {
             "backgroundColor": {
                "linearGradient": {
                   "x1": 0,
                   "y1": 0,
                   "x2": 0,
                   "y2": 1
                },
                "stops": [
                   [
                      0,
                      "#FFF"
                   ],
                   [
                      1,
                      "#333"
                   ]
                ]
             },
             "borderWidth": 0,
             "outerRadius": "109%"
          },
          {
             "backgroundColor": {
                "linearGradient": {
                   "x1": 0,
                   "y1": 0,
                   "x2": 0,
                   "y2": 1
                },
                "stops": [
                   [
                      0,
                      "#333"
                   ],
                   [
                      1,
                      "#FFF"
                   ]
                ]
             },
             "borderWidth": 1,
             "outerRadius": "107%"
          },
          null,
          {
             "backgroundColor": "#DDD",
             "borderWidth": 0,
             "outerRadius": "105%",
             "innerRadius": "103%"
          }
       ],
       "yAxis": {
          "min": 0,
          "minorTickInterval": "auto",
          "minorTickWidth": 1,
          "minorTickLength": 10,
          "minorTickPosition": "inside",
          "minorTickColor": "#666",
          "tickPixelInterval": 30,
          "tickWidth": 2,
          "tickPosition": "inside",
          "tickLength": 10,
          "tickColor": "#666",
          "labels": {
             "step": 3,
             "rotation": "auto"
          },
          "title": {
             "text": "Generation (Kwh)",
             "y": 20,
             "style": {
                "color": "blue",
                "width": 30,
                "fontWeight": "normal",
                "fontSize": "8px"
             }
          },
          "max": "229.37",
          "plotBands": [
             {
                "color": "#55BF3B",
                "from": "220.586",
                "to": "229.37"
             },
             {
                "color": "#ffbf00",
                "from": "212.866",
                "to": "220.586"
             },
             {
                "color": "#DF5353",
                "from": 0,
                "to": "212.866"
             }
          ]
       },
       "subtitle": {
          "text": "220.6 - 228.6<\/span>212.9 - 220.6<\/span>0 - 212.9<\/span>",
          "useHTML": true,
          "verticalAlign": "top",
          "x": -5,
          "y": 40,
          "textOverflow": "none",
          "whiteSpace": "nowrap"
       },
       "series": [
          {
             "name": "Budget",
             "showInLegend": true,
             "color": "#000000",
             "data": [
                {
                   "y": 228.587,
                   "color": "#000000"
                }
             ],
             "dial": {
                "backgroundColor": "#000000",
                "radius": "85%",
                "rearLength": "0%",
                "baseWidth": 10
             },
             "dataLabels": {
                "enabled": false
             }
          },
          {
             "name": "Actual",
             "showInLegend": true,
             "color": "#4141FF",
             "data": [
                {
                   "y": 229.37,
                   "color": "#4141FF"
                }
             ],
             "dial": {
                "backgroundColor": "#4141FF",
                "radius": "85%",
                "rearLength": "0%",
                "baseWidth": 7
             },
             "dataLabels": {
                "formatter": null
             },
             "tooltip": {
                "valueSuffix": "MU "
             }
          }
       ]
    }
 ]
 
 
 export const gaugeChart = () => {
    let charts = [];
    charts.push(response);
 
    return response;
 }