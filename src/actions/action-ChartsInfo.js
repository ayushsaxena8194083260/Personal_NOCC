import {
    GET_CHARTS_INFO
} from './types'
import service from "../services/forcastWeatherService";
import { diagnosisChart } from "./Mockdata/diagnosisCharts";
import { gaugeChart } from "./Mockdata/speedGauge";

export function getChartsInfo(pageName) {
    return (dispatch) => {
      const response =  getAPiCallByPageName(pageName, dispatch);
        dispatch({
            type: GET_CHARTS_INFO,
            data: response
        })
    }
}

function getAPiCallByPageName(pageName, dispatch) {
    let response = null;

    switch (pageName) {
        case "QuarterGeneration":
            response = gaugeChart();
            break;
        case "null":
            service.getDashbaordInfo().then(res => {
                if (res.data) {
                    response = res.data
                }
            }, error => {

            })
            break;
        default:
            response = [];
            break;
    }

    return response;
}

