import {
    GET_PLANT_HISTORY_BY_ID
} from '../actions/types'
import { arrowFunctionExpression } from '@babel/types';

const INITIAL_STATE = {
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case GET_PLANT_HISTORY_BY_ID:
            console.log(action);
             
            let plantHistoryDetailsHdr =[];
            let plantHistoryDetails = [];
            plantHistoryDetailsHdr.push('Plant Details');
            for(let plant of action.plantHistByID){
                plantHistoryDetailsHdr.push(plant.dateTime)
            }
            // plantHistoryDetailsHdr.sort(function(a, b) {
            //     a = new Date(a.date_time);
            //     b = new Date(b.date_time);
            //     return a>b ? -1 : a<b ? 1 : 0;
            // });

            var plantDetailsCol = ["Plant Name","Site Address","Commissioning Date","Registered Office Address","Location",
            "Tehsil","District","State","Country","Plant Capacity Dc","Plant Capacity Ac","Lat","Long","Elevation","Avg Insolation",
        "Avg Temperature","Avg Wind Speed","Dc Installed Capacity","Ac Installed Capacity","Module Mismatch","Diodes Inter Connections",
    "Dc Wiring","Soiling","Inverter Derate","System Derate","Ac Wiring","Medium Voltage Transformer","Total Post Inverter Derate",
"Total System Derate","Module Rating","Type Pv Module","Module Manufacturer","Module Rated Degradation Factor",
"Temperature Coefficient Power","Total No Pv Modules","Max Array Bus Voltage","No Modules Series","No Parallel Strings",
"Pv Module Mounting","Tilting Provision","Module Mounting Structure","Inverter Capacity"];
            plantHistoryDetails['plantDetails'] =plantDetailsCol;
            for(let plant of action.plantHistByID){
                //plantHistoryDetails.push(plantDetailsCol[i],plant.plantName,plant.siteAddress,plant.commissioningDate,plant.dateTime);
                plantHistoryDetails[plant.dateTime] = plant;
            }

            // plantHistoryDetails.sort(function(a,b){
            //     a = new Date(a.date_time);
            //     b= new Date(b.date_time);
            //     return a>b ? -1 : a<b ? 1 : 0;
            // });

        return{
                ...state,
                plantHistByID: action.plantHistByID,
                plantHistoryDetailsHdr : plantHistoryDetailsHdr,
                plantHistoryDetails: plantHistoryDetails           
            }    

        default:
            return state;
    }
}
