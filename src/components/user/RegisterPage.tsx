import React, {FormEvent, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

import {register} from "../../services/UserService";
import RegisterUser from "../../types/RegisterUser";

const RegisterPage = () => {
    const [user, setUser] = useState<RegisterUser>({username: "", email: "", password: ""})

    const navigate = useNavigate();

    const onRegister = (e: FormEvent): void => {
        e.preventDefault();

        if (user.username === "" || user.email === "" || user.password === "") {
            alert("Please enter username, email and password!")
        } else {
            register(user)
                .then(() => {
                    navigate("/login")
                })
                .catch(err => alert(err.message))
        }
    }

    return (
        <div className="register">
            <h3>Register</h3>
            <form onSubmit={onRegister}>
                <label htmlFor="username">Username:</label><br/>
                <input type="text" name="username" id="username"
                       onChange={e => setUser({...user, username: e.target.value})}/><br/>
                <label htmlFor="email">Mail:</label><br/>
                <input type="email" name="email" id="email"
                       onChange={e => setUser({...user, email: e.target.value})}/><br/>
                <label htmlFor="password">Password:</label><br/>
                <input type="password" name="password" id="password"
                       onChange={e => setUser({...user, password: e.target.value})}/><br/>
                <br/>
                <input type="submit" value="Register"/><br/>
                <br/>
                <Link to="/login">Login</Link>
            </form>
        </div>
    )
}

export default RegisterPage