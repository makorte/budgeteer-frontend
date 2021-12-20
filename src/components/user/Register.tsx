import React, {FormEvent, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate();

    const onRegister = (e:FormEvent): void => {
        e.preventDefault();

        if(username === "" || email === "" || password === "") {
            alert("Please enter username, email and password!")
        }

        axios({
            method: "POST",
            url: "/register",
            data: {
                username,
                email,
                password
            }
        })
            .then(() => {
                alert("Successfully registered! Please log in.")

                navigate("/login")
            })
            .catch(err => alert(err.message))
    }

    return (
        <div className="register">
            <h3>Register</h3>
            <form onSubmit={onRegister}>
                <label htmlFor="username">Username:</label><br/>
                <input type="text" name="username" id="username" onChange={e => setUsername(e.target.value)} value={username}/><br/>
                <label htmlFor="email">Mail:</label><br/>
                <input type="email" name="email" id="email" onChange={e => setEmail(e.target.value)} value={email}/><br/>
                <label htmlFor="password">Password:</label><br/>
                <input type="password" name="password" id="password" onChange={e => setPassword(e.target.value)} value={password}/><br/>
                <br/>
                <input type="submit" value="Register"/><br/>
                <br/>
                <Link to="/login">Login</Link>
            </form>
        </div>
    )
}

export default Register