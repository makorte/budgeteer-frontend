import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

import {registerUser} from "../../services/UserService";
import RegisterUser from "../../types/RegisterUser";
import {SubmitHandler, useForm} from "react-hook-form";
import {AxiosError} from "axios";
import {useDispatch} from "react-redux";
import {setRegistered} from "../../store/loginInfosSlice";
import {Alert, Button, Form} from "react-bootstrap";

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
        <div className={"mt-5 mx-auto mw-350"}>
            {registerError && <Alert variant={"danger"} onClose={() => setRegisterError("")}
                                     dismissible>{registerError}</Alert>}

            <h2 className={"mb-3"}>Register</h2>

            <Form onSubmit={handleSubmit(onRegister)} className={"bg-white p-4 shadow rounded-3"}>
                <Form.Group controlId={"usernameGroup"}>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control {...register("username", {
                        required: "Please enter a username!",
                        minLength: {value: 3, message: "The username must be at least three characters long!"},
                        maxLength: {value: 30, message: "The username must not be longer than 30 characters!"},
                        pattern: {
                            value: /^[a-zA-Z0-9]*$/,
                            message: "The username must only contain letters and numbers!"
                        },
                    })} type="text"/>
                    <p className={"text-danger"}>{errors.username?.message}</p>
                </Form.Group>

                <Form.Group controlId={"emailGroup"}>
                    <Form.Label>E-Mail:</Form.Label>
                    <Form.Control {...register("email", {
                        required: "Please enter an EMail-Address!",
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Please enter a valid EMail-Address"
                        }
                    })} type="email"/>
                    <p className={"text-danger"}>{errors.email?.message}</p>
                </Form.Group>

                <Form.Group controlId={"passwordGroup"}>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control {...register("password", {
                        required: "Please enter a password!",
                        minLength: {value: 8, message: "The password must be at least 8 characters long!"}
                    })} type="password"/>
                    <p className={"text-danger"}>{errors.password?.message}</p>
                </Form.Group>

                <div className={"d-grid gap-2 text-center mt-4"}>
                    <Button type="submit" className={"text-white"}>Register</Button>
                    <div>
                        <Link className={"link-info"} to={"/login"}>Log In</Link>
                    </div>
                </div>
            </Form>
        </div>
    )
}

export default RegisterPage