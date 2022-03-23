import {AxiosError} from "axios";
import {NavigateFunction} from "react-router-dom";
import {toLogin, toSelectProject} from "./NavigationService";

export const handleError = (err: AxiosError, navigate: NavigateFunction) => {
    if (err.response?.status === 401) {
        toLogin(navigate)
    } else if(err.response?.status === 403) {
        toSelectProject(navigate)
    } else {
        alert(err.message)
    }
}
