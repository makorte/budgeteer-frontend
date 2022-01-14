import React, {FormEvent, ReactElement, useState} from "react";
import {AxiosError, AxiosResponse} from "axios";
import {Link, useNavigate} from "react-router-dom";

import {login} from "../../services/UserService";

import LoginUser from "../../types/LoginUser";

const Login = (): ReactElement => {
    const navigate = useNavigate()

    const [user, setUser] = useState<LoginUser>({username: "", password: ""})

    const onLogin = (e: FormEvent): void => {
        e.preventDefault()

        if (user.username === "" || user.password === "") {
            return alert("Please enter a username and password!")
        }

        login(user)
            .then((res: AxiosResponse) => {
                localStorage.setItem("token", `Bearer ${res.data.accessToken}`)

                navigate("/selectProject")
            })
            .catch((err: AxiosError) => {
                if (err.response?.status === 401) {
                    alert("Wrong username or password!")
                } else {
                    alert(err.message)
                }
            });
    }

    return (
        <div className="login">
            <h3>Login</h3>
            <form onSubmit={onLogin}>
                <label htmlFor="username">Username:</label><br/>
                <input type="text" name="username" id="username"
                       onChange={e => setUser({...user, username: e.target.value})}/><br/>
                <label htmlFor="password">Password:</label><br/>
                <input type="password" name="password" id="password"
                       onChange={e => setUser({...user, password: e.target.value})}/><br/>
                <br/>
                <input type="submit" value="Login"/><br/>
                <br/>
                <Link to="/register">Register</Link>
            </form>
        </div>
    )
}

export default Login;