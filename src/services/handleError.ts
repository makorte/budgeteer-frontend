import {AxiosError} from "axios";
import {NavigateFunction} from "react-router-dom";
import {loginLink, selectProjectLink} from "./NavigationService";

export const handleError = (err: AxiosError, navigate: NavigateFunction) => {
    if (err.response?.status === 401) {
        navigate(loginLink())
    } else if(err.response?.status === 403) {
        navigate(selectProjectLink())
    } else {
        alert(err.message)
    }
}
