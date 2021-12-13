import React, {FormEvent, ReactElement, useState} from "react";
import axios, {AxiosError} from "axios";

const Login = (): ReactElement => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const clearForm = (): void => {
        setUsername("")
        setPassword("")
    }

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
            .then(res => {
                localStorage.setItem("api-key", `Bearer ${res.data.accessToken}`)
                clearForm()
            })
            .catch((err: AxiosError) => {
                if (err.response?.status === 401) {
                    clearForm()
                    alert("Wrong username or password!")
                } else {
                    clearForm()
                    alert(err)
                }
            });
    }

    return (
        <div className="Login">
            <h3>Login</h3>
            <form onSubmit={onLogin}>
                <label htmlFor="username">Username:</label><br/>
                <input type="text" name="username" id="username" onChange={e => setUsername(e.target.value)}
                       value={username}/><br/>
                <label htmlFor="password">Password:</label><br/>
                <input type="password" name="password" id="password" onChange={e => setPassword(e.target.value)}
                       value={password}/><br/>
                <br/>
                <input type="submit" value="Login"/>
            </form>
        </div>
    )
}

export default Login;