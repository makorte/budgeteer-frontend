import LoginUser from "../types/LoginUser";
import http from "../http-common";
import RegisterUser from "../types/RegisterUser";

export const login = (user: LoginUser) => http.post("/authenticate", user)

export const register = (user: RegisterUser) => http.post("/register", user)