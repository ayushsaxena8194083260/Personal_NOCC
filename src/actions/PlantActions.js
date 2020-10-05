import {
    GET_ALL_PLANTS,
    SHOW_SPINNER,
    HIDE_SPINNER,
    POST_PLANT,
    DELETE_PLANT,
    GET_PLANTS_BY_TYPE,
    GET_PROJECT_TYPE
} from './types'
import service from "../services/plantService";

import { showSuccessAlert, showErrorAlert } from "./AlertActions";
/**
 * get article
 */
export const getAllPlants = () => {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.getAllPlants().then(response => {
            if (response.data) {

                dispatch({
                    type: GET_ALL_PLANTS,
                    plants: response.data
                })

            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}
export const getAllPlants2 = () => {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.getAllPlants2().then(response => {
            if (response.data) {

                dispatch({
                    type: GET_ALL_PLANTS,
                    plants: response.data
                })

            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}
/**
 * post article
 */
export const createOrUpdatePlant = (plant) => {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })
        //     let createPlant = {
        //         "plantId": 0,
        // "plantName": plant.plantName,
        // "siteAddress": plant.siteAddress,
        // "commissioningDate": plant.commissioningDate,
        // "registeredOfficeAddress": plant.registeredOfficeAddress,
        // "location": plant.location,
        // "tehsil": plant.tehsil,
        // "district": plant.district,
        // "state": plant.state,
        // "country": plant.country,
        // "plantCapacityDc": plant.plantCapacityDc,
        // "plantCapacityAc": plant.plantCapacityAc,
        // "lat": plant.lat,
        // "lon": '',
        // "elevation": plant.elevation,
        // "avgInsolation": plant.avgInsolation,
        // "avgTemperature": plant.avgTemperature,
        // "avgWindSpeed": plant.avgWindSpeed,
        // "moduleMismatch": plant.moduleMismatch,
        // "diodesInterConnections": plant.diodesInterConnections,
        // "dcWiring": plant.dcWiring,
        // "soiling": plant.soiling,
        // "inverterDerate": plant.inverterDerate,
        // "systemDerate": plant.systemDerate,
        // "acWiring": plant.acWiring,
        // "mediumVoltageTransformer": plant.mediumVoltageTransformer,
        // "totalPostInverterDerate": plant.totalPostInverterDerate,
        // "totalSystemDerate": plant.totalSystemDerate,
        // "moduleRating": plant.moduleRating,
        // "typePvModule": plant.typePvModule,
        // "moduleManufacturer": plant.moduleManufacturer,
        // "moduleRatedDegradationFactor": plant.moduleRatedDegradationFactor,
        // "temperatureCoefficientPower": plant.temperatureCoefficientPower,
        // "totalNoPvModules": plant.totalNoPvModules,
        // "maxArrayBusVoltage": plant.maxArrayBusVoltage,
        // "noModulesSeries": plant.noModulesSeries,
        // "noParallelStrings": plant.noParallelStrings,
        // "pvModuleMounting": plant.pvModuleMounting,
        // "tiltingProvision": plant.tiltingProvision,
        // "moduleMountingStructure": plant.moduleMountingStructure,
        // "inverterCapacity": plant.inverterCapacity,
        // "noInverters": plant.noInverters,
        // "mpptVoltageRange": plant.mpptVoltageRange,
        // "inverterOutputVoltage": plant.inverterOutputVoltage,
        // "gridInterfacingVoltage": plant.gridInterfacingVoltage,
        // "estimatedSystemEfficiency": plant.estimatedSystemEfficiency,
        // "annualPvGeneration": plant.annualPvGeneration,
        // "areaInverterPad": plant.areaInverterPad,
        // "areaPlantAcres": plant.areaPlantAcres,
        // "projectLife": plant.projectLife,
        // "tariff": plant.tariff,
        // "minPlf": plant.minPlf,
        // "maxPlf": plant.maxPlf,
        // "ftpUrl": plant.ftpUrl,
        // "ftpUserId": plant.ftpUserId,
        // "ftpPassword": plant.ftpPassword,
        // "photoUrl": plant.photoUrl,
        // "powerDivision": plant.powerDivision,
        // "multipleAdaptorUsed": plant.multipleAdaptorUsed,
        // "spv": plant.spv,
        // "plantDashboardStatus": plant.plantDashboardStatus,
        // "type": plant.type,
        // "ticketHelpTopicId": plant.ticketHelpTopicId,
        // "todayicon": plant.todayicon,
        // "tmwicon": plant.tmwicon
        //     }
        service.createOrUpdatePlant(plant).then(response => {
            if (response.data) {

                dispatch({
                    type: POST_PLANT
                })

            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * delete article
 */
export const deletePlant = (id) => {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.deletePlant(id).then(response => {
            if (response.data) {
                console.log(response);
                let resObj = { status: response.data, id: id };
                dispatch({
                    type: DELETE_PLANT,
                    response: resObj
                })

            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * get article by plant type
 */
export const getPlantByType = (plantType) => {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.getPlantByType(plantType).then(response => {
            if (response.data) {

                dispatch({
                    type: GET_PLANTS_BY_TYPE,
                    plantsByType: response.data
                })

            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

export function getProjectNames(plantType) {
    return (dispatch) => {
        dispatch({ type: SHOW_SPINNER })

        service.getProjectNames(plantType).then(response => {
            if (response.data) {
                console.log(response.data);
                dispatch({
                    type: GET_PROJECT_TYPE,
                    plantType: plantType,
                    projectTypes: response.data
                })

                dispatch(getPlantByType(plantType))

            } else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}
