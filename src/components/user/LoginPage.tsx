import React, {useEffect, useState} from "react";
import {AxiosError, AxiosResponse} from "axios";
import {Link, useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";

import {login} from "../../services/UserService";
import LoginUser from "../../types/LoginUser";
import {useDispatch, useSelector} from "react-redux";
import {RootStore} from "../../store/store";
import {clearLoginInfos, LOGGED_OUT, REGISTERED} from "../../store/loginInfosSlice";
import {Alert, Button, Form} from "react-bootstrap";

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
        <div className={"container mt-5 mx-auto"} style={{"maxWidth": "350px"}}>
            {loginError && <Alert variant={"danger"} onClose={() => setLoginError("")}
                                  dismissible>{loginError}</Alert>}
            {loginInfos &&
                <Alert variant={"primary"} onClose={() => dispatch(clearLoginInfos())}
                       dismissible>{loginInfos === REGISTERED ? "Successfully registered!" : loginInfos === LOGGED_OUT ? "Logged out!" : ""}</Alert>}
            <h2 className={"mb-3"}>Sign In</h2>
            <Form onSubmit={handleSubmit(onLogin)} className={"bg-white p-4 shadow rounded-3"}>
                <Form.Group controlId={"usernameGroup"}>
                    <Form.Label>Username</Form.Label>
                    <Form.Control {...register("username", {
                        required: "Please enter a username!"
                    })} type="text"/>
                    <p className={"text-danger"}>{errors.username?.message}</p>
                </Form.Group>
                <Form.Group controlId={"passwordGroup"}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control {...register("password", {
                        required: "Please enter a password!"
                    })} type="password"/>
                    <p className={"text-danger"}>{errors.password?.message}</p>
                </Form.Group>
                <div className={"d-grid gap-2 text-center mt-4"}>
                    <Button type="submit" className={"text-white"}>Log In</Button>
                    <div>
                        <Link className={"link-info"} to={"/register"}>Register</Link>
                    </div>
                </div>

            </Form>
        </div>
    )
}

export default LoginPage;