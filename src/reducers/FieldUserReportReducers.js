import {
    CLEAR_FIELDUSER_REPORT,
    GET_UNASSIGNED_TASKS,
    GET_UNASSIGNED_TASKS_PLANT,
    GET_HUB_TICKETS,
    SEARCH_HUB_TICKETS,
    GET_HUB_TICKETS_DATE, 
    GET_USER_TICKETS_DATE,
    SEARCH_USER_TICKETS,
    SEARCH_HUB_PLANT,
    GET_HUB_PLANT_DATE,
    GET_HUB_PLANT_ID,
    GET_ALL_USER_TICKETS,
    GET_USER_TICKETS_DATE_USER_ID,
    GET_HUB_PLANTID_DATE,
    GET_ALL_HUB,
    GET_SELECTED_HUB,
    GET_UNASSIGNED_TICKET,
    GET_USER_INFO_QUARTERLY,
    GET_USER_INFO_HALF_YEARLY,
    GET_USER_INFO_YEARLY,
    GET_USER_TICKET_DATE_USER_ID,
    GET_LAT_LANG
    
} from '../actions/types'
//import { GET_UNASSIGNED_TICKET } from '../actions/types'

const INITIAL_STATE = {
    displayMessage: ""
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CLEAR_FIELDUSER_REPORT:
            {
                return {
                    input: [],
                    viewTicketsByUser:[],
                    hubTickets:[],
                    hubTicketsDate:[],
                    userTicketsDate:[],
                    hubTicketsPlant: [],
                    displayMessage: null,
                    hubPlantID:[]
                }    
            }
        case GET_UNASSIGNED_TASKS_PLANT:
            return {
                ...state,
                input: action.input
            }
        case GET_UNASSIGNED_TASKS:
            return {
                ...state,
                input: action.input
            }
        case GET_LAT_LANG:
            return {
                ...state,
                latLangDetails: action.latLangDetails
            }
            // case GET_GRAPHS_SETTINGS:
        // case GET_UNASSIGNED_TICKET:
        //     return {
        //         ...state,
        //         unassignedTicket:action.input
        //     }
        case GET_HUB_TICKETS:
            return {
                ...state,
                hubTicketsDate: action.hubTicketsDate
            }
        // case GET_HUB_PLANTID_DATE:
        //             return {
        //                 ...state,
        //                 hubTicketsDate: action.hubTicketsDate
        //     }
        case SEARCH_HUB_TICKETS:
                return {
                    ...state,
                    hubTicketsSearch: action.hubTicketsSearch
            }
        case GET_USER_TICKETS_DATE:
            return {
                ...state,
                userTicketsDate: action.userTicketsDate
            }
            case GET_USER_TICKETS_DATE_USER_ID:
                return {
                    ...state,
                    userTicketsDate:action.userTicketsDate
                }
            case GET_USER_TICKET_DATE_USER_ID:
                return {
                    ...state,
                    userTicketsDateUserId: action.userTicketsDateUserId
                }    
            case SEARCH_HUB_PLANT:
                return {
                    ...state,
                    hubSearchPlant: action.hubSearchPlant
                }
            case GET_HUB_PLANT_DATE: 
                return {
                    ...state,
                    hubPlantDate: action.hubPlantDate
                }
            case GET_HUB_PLANT_ID:
                return {
                    ...state,
                    hubPlantID: action.hubPlantID
                }
                case GET_HUB_PLANTID_DATE:
                    return {
                        ...state,
                        hubPlantIdDate: action.hubPlantIdDate
                    }
                    case SEARCH_USER_TICKETS:
                    return {
                        ...state,
                        userTicketsSearch: action.userTicketsSearch
            }
            case GET_ALL_USER_TICKETS:
                    return {
                        ...state,
                        userTicketsDate: action.userTicketsDate
                    }
            case GET_SELECTED_HUB:
                {
                    return {
                        ...state,
                        selectedHubID: action.data
                    }
                }
                // case GET_PLA
                case GET_ALL_HUB:{
                    return {
                        ...state,
                        hubID: action.data
                    }
                }
                case GET_UNASSIGNED_TICKET:{
                    return {
                        ...state,
                        unassignedTicket: action.data
                    }
                }
                case GET_USER_INFO_QUARTERLY:{
                    return {
                        ...state,
                        userInfo:pmTaskQuarterly(action.userInfo,action.fromDate,action.toDate)
                    }
                }
                case GET_USER_INFO_HALF_YEARLY:{
                    return {
                        ...state,
                        userInfo:pmTaskHalfYearly(action.userInfo,action.fromDate,action.toDate)
                    }
                }
                case GET_USER_INFO_YEARLY:{
                    return {
                        ...state,
                        userInfo:pmTaskYearly(action.userInfo,action.fromDate,action.toDate)
                    }
                }
        // case GET_GRAPHS_SETTINGS:
        //     return {
        //         ...state,
        //         graphs: action.graphs
        //     }
        // case GET_ADD_PLANT_TYPE:
        //     {
        //         let newState = { ...state }
        //         newState.plantTypes = action.plantTypes;
        //         newState.displayMessage = null;
        //         return newState
        //     }
        // case CLEAR_PLANT_MAPPING:
        //     {
        //         return {
        //             ...state,
        //             inverterConfiguration: [],
        //             data: [],
        //             alertUser: [],
        //             cleaningConfig: [],
        //             ftpInvMap: [],
        //             cleaningConfigAlert: [],
        //             displayMessage: null,
        //         }
        //     }
        default:
            return state;
    }
}
function pmTaskQuarterly(data,fDate,tDate){
    // console.log("data:",data)
    let newArray=[];
    let fromYear=(fDate.split('-'))[0];
    let toYear=(tDate.split('-'))[0];
    // console.log(plants)
    data.forEach((list)=>{
        let quarterly1=0;
        let quarterly2=0;
        let quarterly3=0;
        let quarterly4=0;

        if((Date.parse(fromYear+'-04-01') <= Date.parse(list.createdDate)) && (Date.parse(list.createdDate) <= Date.parse(fromYear+'-06-30')) ){
            if(list.pmActivityId ===4) {
              quarterly1++;
              
            }
        }
        if((Date.parse(fromYear+'-07-01') <= Date.parse(list.createdDate)) && (Date.parse(list.createdDate) <= Date.parse(fromYear+'-09-30')) ){
          if(list.pmActivityId ===4) {
              quarterly2++;
          }
        }
        if((Date.parse(fromYear+'-10-01') <= Date.parse(list.createdDate)) && (Date.parse(list.createdDate) <= Date.parse(fromYear+'-12-31')) ){
           if(list.pmActivityId ===4) {
              quarterly3++; 
            }
        }
        if((Date.parse(fromYear+'-01-01') <= Date.parse(list.createdDate)) && (Date.parse(list.createdDate) <= Date.parse(fromYear+'-03-31')) ){
         if(list.pmActivityId ===4) {
              quarterly4++; 
            }
        }
        let newData= {...list,quarterly1:`${quarterly1}/16`,quarterly2:`${quarterly2}/16`,quarterly3:`${quarterly3}/16`,quarterly4:`${quarterly4}/16`};
        newArray.push(newData)
    })
    return newArray;
    // return { ...data,quarterly1,quarterly2,quarterly3,quarterly4 }
    // data.forEach(list=>{ 
        
    // }
    // )
}
function pmTaskHalfYearly(data,fDate,tDate){
    let newArray=[];
    let fromYear=((fDate.split('-'))[0]) - 1;
    // let toYear=((tDate.split('-'))[0]);
    data.forEach((list)=>{
        let halfYearly1=0;
        let halfYearly2=0;

        if((Date.parse(fromYear+'-04-01') <= Date.parse(list.createdDate)) && (Date.parse(list.createdDate) <= Date.parse(fromYear+'-09-30')) ){
            if(list.pmActivityId ===5) {
                halfYearly1++;
            }
        }
        if((Date.parse(fromYear+'-10-01') <= Date.parse(list.createdDate)) && (Date.parse(list.createdDate) <= Date.parse(fromYear+'-03-31')) ){
          if(list.pmActivityId ===5) {
            halfYearly2++;
          }
        }
        let newData= {...list,halfYearly1:`${halfYearly1}/5`,halfYearly2:`${halfYearly2}/5`};
        newArray.push(newData)
    })
    return newArray;
}
function pmTaskYearly(data,fDate,tDate){
    let newArray=[];
    let fromYear=((fDate.split('-'))[0]) - 1;
    // let toYear=((tDate.split('-'))[0]);
    data.forEach((list)=>{
        let yearly=0;
        if((Date.parse(fromYear+'-04-01') <= Date.parse(list.createdDate)) && (Date.parse(list.createdDate) <= Date.parse(fromYear+'-09-30'))){
            if( (Date.parse(list.createdDate) <= Date.parse(fromYear+'-03-31'))){
                yearly++;
            }
        }
        let newData= {...list,yearly:`${yearly}/79`};
        newArray.push(newData)
    })
    return newArray;
}
