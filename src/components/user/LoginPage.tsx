import React, {useEffect, useState} from "react";
import {AxiosError, AxiosResponse} from "axios";
import {Link, useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";

import {login} from "../../services/UserService";
import LoginUser from "../../types/LoginUser";
import NotificationComponent, {
    NOTIFICATION_ERROR,
    NOTIFICATION_INFO,
    NOTIFICATION_SUCCESS
} from "../ui/NotificationComponent";
import {useDispatch, useSelector} from "react-redux";
import {RootStore} from "../../store/store";
import {clearLoginInfos, REGISTERED} from "../../store/LoginInfosSlice";

const LoginPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loginInfos = useSelector((state: RootStore) => state.loginInfos.loginInfo)
    const {register, handleSubmit, formState: {errors}} = useForm<LoginUser>()
    const [loginError, setLoginError] = useState("")

    useEffect(() => {
        localStorage.removeItem("token")

        return () => {
            dispatch(clearLoginInfos())
        }
    }, [dispatch])

    const onLogin: SubmitHandler<LoginUser> = data => {
        login(data)
            .then((res: AxiosResponse) => {
                localStorage.setItem("token", `Bearer ${res.data.accessToken}`)
                navigate("/selectProject")
            })
            .catch((err: AxiosError) => setLoginError(err.response?.status === 401 ? "Wrong username or password!" : err.message))
    }

    return (
        <div className={"c-form-container m-4 mt-20 w-96"}>
            <NotificationComponent message={loginError ? loginError : loginInfos}
                                   type={loginError ? NOTIFICATION_ERROR : (loginInfos === REGISTERED ? NOTIFICATION_SUCCESS : NOTIFICATION_INFO)}/>
            <h3 className="mb-5 mx-2 c-form-heading">Sign In</h3>
            <form onSubmit={handleSubmit(onLogin)} className={"c-form-sm z-0"}>
                <div className={"c-flex-col mb-4"}>
                    <label htmlFor="username" className={"c-label"}>Username</label>
                    <input {...register("username", {
                        required: "Please enter a username!"
                    })} type="text" id="username"
                           className={"c-input w-full"}/>
                    <p className={"mt-1 c-input-error"}>{errors.username?.message}</p>
                </div>
                <div className={"c-flex-col mb-4"}>
                    <label htmlFor="password" className={"c-label"}>Password</label>
                    <input {...register("password", {
                        required: "Please enter a password!"
                    })} type="password" id="password"
                           className={"c-input w-full"}/>
                    <p className={"mt-1 c-input-error"}>{errors.password?.message}</p>
                </div>
                <input type="submit" value="Login"
                       className={"c-button w-full"}/>
                <div className={"mt-3 c-flex-middle"}>
                    <Link to="/register"
                          className={"c-link w-fit text-center"}>Register</Link>
                </div>
            </form>
        </div>
    )
}

export default LoginPage;