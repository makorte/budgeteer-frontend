import {AxiosError} from "axios";
import {NavigateFunction} from "react-router-dom";

export const handleError = (err: AxiosError, navigate: NavigateFunction) => {
    if (err.response?.status === 401) {
        navigate("/login")
    } else if(err.response?.status === 403) {
        navigate("/selectProject")
    } else {
        alert(err.message)
    }
}
