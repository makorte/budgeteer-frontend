import React, {FormEvent, ReactElement, useState} from "react";
import axios, {AxiosError, AxiosResponse} from "axios";
import {Link, useNavigate} from "react-router-dom";

const Login = (): ReactElement => {
    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const onLogin = (e: FormEvent): void => {
        e.preventDefault()

        if (username === "" || password === "") {
            return alert("Please enter a username and password!")
        }

        axios({
            method: "POST",
            url: "/authenticate",
            data: {
                username,
                password
            }
        })
            .then((res: AxiosResponse) => {
                const token = res.data.accessToken
                localStorage.setItem("token", `Bearer ${token}`)

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
                <input type="text" name="username" id="username" onChange={e => setUsername(e.target.value)}/><br/>
                <label htmlFor="password">Password:</label><br/>
                <input type="password" name="password" id="password" onChange={e => setPassword(e.target.value)}/><br/>
                <br/>
                <input type="submit" value="Login"/><br/>
                <br/>
                <Link to="/register">Register</Link>
            </form>
        </div>
    )
}

export default Login;