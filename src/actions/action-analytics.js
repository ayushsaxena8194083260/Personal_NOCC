import service from "../services/analyticsServices";
import { SHOW_SPINNER, GET_PAGE_DETAIL_AND_GRAPH_DETAIL, HIDE_SPINNER } from "./types";
import { showErrorAlert } from "./AlertActions";


export const getPageDetailAndGraphDetail=(pageID)=>{
    return (dispatch) => {
        dispatch({type: SHOW_SPINNER})

        service.getPageDetailAndGraphDetail(pageID).then(response =>{
            if (response.data) {
            dispatch({
                type:GET_PAGE_DETAIL_AND_GRAPH_DETAIL,
                graphDetails:response.data
            })
            }else {
                dispatch({ type: HIDE_SPINNER })
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({ type: HIDE_SPINNER })
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        }
        )
}
}