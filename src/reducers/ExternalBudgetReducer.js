import {
    GET_EXTERNAL_BUDJET,
    SEARCH_EXTERNAL_BUDJET,
    CLEAR_EXTERNAL_BUDJET,
    GET_ADD_PLANT_TYPE,
    POST_EXTERNAL_BUDGET,
    DELETE_EXTERNAL_BUDGET

} from '../actions/types'

const INITIAL_STATE = {
externalBudgetData: []
}

function ExternalBudgetReducer  (state = INITIAL_STATE, action) {
    switch (action.type) {

        case GET_EXTERNAL_BUDJET:
            {
                let newState = { ...state }
                newState.externalBudget = getExternalBudgetGridData(action.externalBudget, state);
                newState.displayMessage = null;
                return newState
            }

            case SEARCH_EXTERNAL_BUDJET:
                {
                    return {
                        ...state,
                        externalBudgetData: action.externalBudgetData,
                    }
                }
                case CLEAR_EXTERNAL_BUDJET:
                    {
                        return {
                            ...state,
                            externalBudgetData: [],
                            externalBudget: [],
                            plantTypes: [],
                            projectId: null,
                            selectedPlantType: null,
                            displayMessage: null,
                        }
                    }
                    case GET_ADD_PLANT_TYPE:
            {
                let newState = { ...state }
                newState.plantTypes = action.plantTypes;
                newState.displayMessage = null;
                return newState
            }
            case POST_EXTERNAL_BUDGET:
            return {
                ...state,
                externalBudget: action.externalBudget,
                displayMessage: action.displayMessage
            }
            case DELETE_EXTERNAL_BUDGET: {
                return {
                    ...state,
                    displayMessage: action.displayMessage
                }
            }
        default:
            return state;
    }
}

function getPlantType(plantId, state) {
    const _plantType = state.plantTypes.filter((item) => item.plantId === plantId)[0];
    return _plantType ? _plantType.plantName : "";
}

function getExternalBudgetGridData(data, state) {
    const gridData = data && data.length > 0 ? data.map((item, index) => {
        return {
            ...item,
            plantName: getPlantType(item.plantId, state),
        }
    }) : [];
    return gridData;
}

export { ExternalBudgetReducer as default, INITIAL_STATE}