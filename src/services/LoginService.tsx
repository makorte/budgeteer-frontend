import http from "../http-common"

import Login from "../types/Login"

const login = (user: Login) => http.post("/authenticate", user)

export default login