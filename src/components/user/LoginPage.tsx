import React, {FormEvent, ReactElement, useState} from "react";
import {AxiosError, AxiosResponse} from "axios";
import {Link, useNavigate} from "react-router-dom";

import {login} from "../../services/UserService";

import LoginUser from "../../types/LoginUser";

const LoginPage = (): ReactElement => {
    const [user, setUser] = useState<LoginUser>({username: "", password: ""})

    const navigate = useNavigate()

    useEffect(() => localStorage.removeItem("token"), [])

        if (user.username === "" || user.password === "") {
            alert("Please enter a username and password!")
        } else {
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
    }

    return (
        <div className={"m-4 mt-20 p-5 flex flex-col align-middle justify-center w-96"}>
            <h3 className={"mb-5 mx-2 font-bold text-3xl"}>Sign in</h3>
            <form onSubmit={onLogin} className={"flex flex-col align-middle justify-center bg-white py-6 px-10 rounded-lg drop-shadow-md"}>
                <div className={"flex flex-col mb-5"}>
                    <label htmlFor="username" className={"text-sm font-medium text-gray-700"}>Username</label>
                    <input type="text" name="username" id="username"
                           onChange={e => setUser({...user, username: e.target.value})}
                           className={"focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md"}/>
                </div>
                <div className={"flex flex-col mb-5"}>
                    <label htmlFor="password" className={"text-sm font-medium text-gray-700"}>Password</label>
                    <input type="password" name="password" id="password"
                           onChange={e => setUser({...user, password: e.target.value})}
                           className={"focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md"}/>
                </div>
                <input type="submit" value="Login"
                       className={"w-full text-sm my-2 py-2 px-4 font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:bg-gray-800 cursor-pointer"}/>
                <div className={"mt-2 flex align-middle justify-center"}>
                    <Link to="/register"
                          className={"w-fit text-sm font-medium text-indigo-800 text-center"}>Register</Link>
                </div>
            </form>
        </div>
    )
}

export default LoginPage;