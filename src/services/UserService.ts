import LoginUser from "../types/LoginUser";
import http from "../http-common";
import RegisterUser from "../types/RegisterUser";
import {AxiosError, AxiosResponse} from "axios";
import {NavigateFunction} from "react-router-dom";
import {setRegistered} from "../store/loginInfosSlice";
import {Dispatch} from "redux";

export const login = (user: LoginUser, navigate: NavigateFunction, setLoginError: Function, destination: string | undefined) => {
    http.post("/authenticate", user)
        .then((res: AxiosResponse<{ accessToken: string }>) => {
            localStorage.setItem("token", `Bearer ${res.data.accessToken}`)

            if(destination) navigate(destination)
            else navigate("/selectProject")
        })
        .catch((err: AxiosError) => setLoginError(err.response?.status === 401 ? "Wrong username or password!" : err.message))
}

export const registerUser = (user: RegisterUser, dispatch: Dispatch, navigate: NavigateFunction, setRegisterError: Function) => {
    http.post("/register", user)
        .then(() => {
            dispatch(setRegistered())
            navigate("/login")
        })
        .catch((err: AxiosError) => {
            if (err.response?.data.usernameAlreadyInUse) {
                setRegisterError("Username already in use!")
            } else if (err.response?.data.mailAlreadyInUse) {
                setRegisterError("Mail already in use!")
            } else {
                setRegisterError(err.message)
            }
        })
}
