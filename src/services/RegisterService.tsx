import http from "../http-common"
import Register from "../types/Register";

const register = (user: Register) => http.post("/register", user)

export default register