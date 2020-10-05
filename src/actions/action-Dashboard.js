import {
    GET_DASHBOARD_ALL_PLANTS,
    GET_HUB_DASHBOARD_ALL_PLANTS
} from './types'
import service from "../services/forcastWeatherService";


export function getDashboardInfo() {
    return (dispatch) => {
            service.getDashbaordInfo().then(response => {
                if (response.data) {
                    dispatch({
                        type: GET_DASHBOARD_ALL_PLANTS,
                        data: response.data
                    })
                } 
            }, error => { 
            })                
    }
}

