import http from "../http-common"
import RegisterUser from "../types/RegisterUser";

const register = (user: RegisterUser) => http.post("/register", user)

export default register