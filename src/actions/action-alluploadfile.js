import service from "../services/alluploadFileMissing";
import { SHOW_SPINNER, GET_PAGE_DETAIL_AND_GRAPH_DETAIL, HIDE_SPINNER } from "./types";
import { showErrorAlert } from "./AlertActions";


export const uploadWeatherMissingFile=(data)=>{
    console.log("call API");
    return (dispatch) => {
        dispatch({type: SHOW_SPINNER})

        service.uploadWeatherMissingFile(data).then(response =>{
            if (response.data) {
                console.log("check upload file");
            // dispatch({
            //     type:GET_PAGE_DETAIL_AND_GRAPH_DETAIL,
            //     graphDetails:response.data
            // })
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