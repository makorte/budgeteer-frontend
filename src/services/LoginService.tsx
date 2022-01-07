import http from "../http-common"

import LoginUser from "../types/LoginUser"

const login = (user: LoginUser) => http.post("/authenticate", user)

export default login