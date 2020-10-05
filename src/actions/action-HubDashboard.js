import {
    GET_HUB_DASHBOARD_ALL_PLANTS
} from './types'
import service from "../services/forcastWeatherService";


function rearrangeResponse(data) {
    const hubDOList = data.map((item) => {

        return {
            ...item,
            plantId: item.hubId,
            plantName: item.hubName,
            plantDashboardStatus: 1,
            ppa_capacity_mw: item.ppaCapacity,
            insolation_wm2: 0,
            previous_day_kwh: item.previousDayGen,
            day_ahead_kwh: 0
        }
    })

    return { "hubDOList": hubDOList }
}

export function getHubDashboardInfo() {
    return (dispatch) => {

        service.getHubDashbaordInfo().then(response => {
            if (response.data) {
                dispatch({
                    type: GET_HUB_DASHBOARD_ALL_PLANTS,
                    data: response.data && response.data.hubDOList && response.data.hubDOList.length > 0 ? rearrangeResponse(response.data.hubDOList) : []
                })
            }
        }, error => {

        })
    }
}

