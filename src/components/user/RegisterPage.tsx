import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

import {registerUser} from "../../services/UserService";
import RegisterUser from "../../types/RegisterUser";
import {SubmitHandler, useForm} from "react-hook-form";
import NotificationComponent, {NOTIFICATION_ERROR} from "../ui/NotificationComponent";
import {AxiosError} from "axios";
import {useDispatch} from "react-redux";
import {setRegistered} from "../../store/LoginInfosSlice";

const RegisterPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm<RegisterUser>()
    const [registerError, setRegisterError] = useState("")

    const onRegister: SubmitHandler<RegisterUser> = data => {
        registerUser(data)
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

    return (
        <div className="c-form-container m-4 mt-20 w-96">
            <NotificationComponent message={registerError} type={NOTIFICATION_ERROR}/>
            <h3 className="mb-5 mx-2 c-form-heading">Register</h3>
            <form onSubmit={handleSubmit(onRegister)} className={"c-form-sm z-0"}>
                <div className={"c-flex-col mb-4"}>
                    <label htmlFor="username" className={"c-label"}>Username:</label>
                    <input {...register("username", {
                        required: "Please enter a username!",
                        minLength: {value: 3, message: "The username must be at least three characters long!"},
                        maxLength: {value: 30, message: "The username must not be longer than 30 characters!"},
                        pattern: {
                            value: /^[a-zA-Z0-9]*$/,
                            message: "The username must only contain letters and numbers!"
                        },
                    })} type="text" id="username" className={"c-input w-full"}/>
                    <p className={"mt-1 c-input-error"}>{errors.username?.message}</p>
                </div>
                <div className={"c-flex-col mb-4"}>
                    <label htmlFor="email" className={"c-label"}>E-Mail:</label>
                    <input {...register("email", {
                        required: "Please enter an EMail-Address!",
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Please enter a valid EMail-Address"
                        }
                    })} type="email" id="email" className={"c-input w-full"}/>
                    <p className={"mt-1 c-input-error"}>{errors.email?.message}</p>
                </div>
                <div className={"c-flex-col mb-4"}>
                    <label htmlFor="password" className={"c-label"}>Password:</label>
                    <input {...register("password", {
                        required: "Please enter a password!",
                        minLength: {value: 8, message: "The password must be at least 8 characters long!"}
                    })} type="password" id="password" className={"c-input w-full"}/>
                    <p className={"mt-1 c-input-error"}>{errors.password?.message}</p>
                </div>
                <input type="submit" value="Register" className={"c-button w-full"}/>
                <div className={"mt-3 c-flex-middle"}>
                    <Link to="/login" className={"c-link w-fit text-center"}>Login</Link>
                </div>
            </form>
        </div>
    )
}

export default RegisterPage