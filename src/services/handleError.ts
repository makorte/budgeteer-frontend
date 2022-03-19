import {AxiosError} from "axios";
import {NavigateFunction} from "react-router-dom";

export const handleError = (err: AxiosError, navigate: NavigateFunction) => {
    if (err.response?.status === 401) {
        navigate("/login")
    } else {
        alert(err.message)
    }
}
