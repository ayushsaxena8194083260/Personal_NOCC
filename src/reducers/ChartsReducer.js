import {
   GET_DIAGNOSIS_CHARTS_DATA,
   GET_GAUGE_REPORT_RESPONSE,
   GET_GRAPH_ANALYTICS,
   GET_PAGENAME_LIST,
   GET_GAUGE_MONTHLY_REPORT_RESPONSE,
   GET_COMPMODL_GAUGE_MONTHLY_REPORT_RESPONSE,
   GET_GRAPH_ROOFTOP_RT,
   GET_GRAPH_ROOFTOP_RoofTop,
   GET_ROOFTOP_DASHBOARD_REPORT_RESPONSE,
   GET_ROOFTOP_REPORT_RESPONSE,
   GET_INVENTER_COMPARISON_REPORT_RESPONSE,
   CLEAR_GRAPH_RESPONSE,
   GET_GAUGE_REPORT_RESPONSE_RTDASHBOARD
} from '../actions/types'

const INITIAL_STATE = {
   gaugeGraphs: [],
   allGraphNames: [],
   gaugeGraphs0: {},
   gaugeGraphs1: {},
   gaugeGraphs2: {},
   gaugeGraphs3: {},

   compareGaugeGraphs0: {},
   compareGaugeGraphs1: {},
   compareGaugeGraphs2: {},
   compareGaugeGraphs3: {},



   graphs0: {},
   graphs1: {},
   graphs2: {},
   graphs2: {},

   categories0: {},
   categories1: {},
   categories2: {},
   categories3: {},

   apiResponse0: {},
   apiResponse1: {},
   apiResponse2: {},
   apiResponse3: {},
}

function ChartsReducer(state = INITIAL_STATE, action) {
   switch (action.type) {
      case GET_GAUGE_REPORT_RESPONSE: {
         let newState = { ...state }
         newState[action.payload.graphNo] = action.payload.response;
         newState[action.payload.apiResponseNo] = action.payload.apiResponse;
         return newState
      }
      case GET_GRAPH_ROOFTOP_RoofTop:
         {
            let newState = { ...state }
            newState[action.payload.graphNo] = action.payload.response;
            newState[action.payload.apiResponseNo] = action.payload.apiResponse;
            return newState
         }
      case GET_GAUGE_REPORT_RESPONSE:
         {
            let newState = { ...state }
            newState[action.payload.graphNo] = action.payload.response;
            newState[action.payload.apiResponseNo] = action.payload.apiResponse;
            return newState
         }
      case GET_GRAPH_ROOFTOP_RT:
         {
            let newState = { ...state }
            newState[action.payload.graphNo] = action.payload.response;
            newState[action.payload.categoriesNo] = action.payload.categories;
            newState[action.payload.apiResponseNo] = action.payload.apiResponse;
            return newState
         }

      case GET_GRAPH_ANALYTICS:
         {
            let newState = { ...state }
            newState[action.payload.graphNo] = action.payload.response;
            newState[action.payload.graphNo]['apiResponse'] = action.payload.apiResponse
            newState[action.payload.categoriesNo] = action.payload.categories;
            newState[action.payload.apiResponseNo] = action.payload.apiResponse;
            return newState
         }
      case GET_GAUGE_MONTHLY_REPORT_RESPONSE:
         {
            let newState = { ...state }
            newState[action.payload.graphNo] = action.payload.response;
            return newState
         }
      case GET_COMPMODL_GAUGE_MONTHLY_REPORT_RESPONSE:
         {
            let newState = { ...state }
            newState[action.payload.graphNo] = action.payload.response;
            return newState
         }
      case GET_PAGENAME_LIST:
         return {
            ...state,
            allGraphNames: action.data

         }
      case CLEAR_GRAPH_RESPONSE:
         return {
            ...state,
            gaugeGraphs0: {},
            gaugeGraphs00: {},
            gaugeGraphs01: {},
            gaugeGraphs02: {},
            gaugeGraphs1: {},
            gaugeGraphs10: {},
            gaugeGraphs11: {},
            gaugeGraphs12: {},
            gaugeGraphs2: {},
            gaugeGraphs20: {},
            gaugeGraphs21: {},
            gaugeGraphs22: {},
            gaugeGraphs3: {},
            gaugeGraphs30: {},
            gaugeGraphs31: {},
            gaugeGraphs32: {},
            graphs0: {},
            graphs1: {},
            graphs2: {},
            graphs2: {},
            categories0: {},
            categories1: {},
            categories2: {},
            categories3: {},
         }
      default:
         return state;
   }
}

function chartInfo(data) {
   const _default = {
      "renderTo": "canvas5e40119eb99d6",
      "type": "gauge",
      "spacingTop": 10,
      "spacingLeft": 15,
      "height": 245
   }

   return { ..._default, renderTo: "canvas" + data.graphId };
}


function titleInfo(data) {
   const _default = {
      "text": "Date from: 01\/04\/2019 to: 30\/06\/2019",
      "style": {
         "color": "#666",
         "font": "normal 14px",
         "fontSize": 13,
         "margin": 10,
         "align": "center"
      }
   }

   return { ..._default };
}

function legendInfo(data) {
   const _default = {
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
   }

   return { ..._default };
}

function findMaxNum(data) {
   let bigNum = 0;
   data && data.seriesMap && data.seriesMap.length > 0 && data.seriesMap.forEach((item) => {
      bigNum = Math.max(bigNum, parseFloat(item.data));
   })
   return bigNum;
}

function yAxisInfo(data) {
   const _default = {
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
      "plotBands": []
   }

   return { ..._default, plotBands: data.plotBands, max: findMaxNum(data) };
}

function seriesInfo(data) {
   const _default =
   {
      "name": "",
      "value": 0,
      "showInLegend": true,
      "color": "",
      "data": [
         {
            "y": 0,
            "color": ""
         }
      ],
      "dial": {
         "backgroundColor": "",
         "radius": "85%",
         "rearLength": "0%",
         "baseWidth": 3
      },
      "dataLabels": {
         "enabled": false
      }
   }
   let series = [];

   series = data && data.seriesMap && data.seriesMap.length > 0 && data.seriesMap.map((item) => {
      return { ..._default, "name": item.name, "value": parseFloat(item.data), "color": item.color, "showInLegend": item.showInLegend, "data": [{ "y": 0, "color": item.color }] };
   })


   return series;
}
function gaugeFormat(data) {
   const _default = {
      "chart": {},
      "title": {},
      "legend": {},
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
      "yAxis": {},
      "subtitle": {
         "text": "595.2 - 616.8<\/span>574.4 - 595.2<\/span>0 - 574.4<\/span>",
         "useHTML": true,
         "verticalAlign": "top",
         "x": 10,
         "y": 50,
         "align": "left"
      },
      "series": [6, 10],

   }

   return { ..._default, chart: chartInfo(data.response), title: titleInfo(data.response), legend: legendInfo(data.response), series: seriesInfo(data.response), yAxis: yAxisInfo(data.response) }
}

export { ChartsReducer as default, INITIAL_STATE }