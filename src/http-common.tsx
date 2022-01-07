import axios from "axios";

const http = axios.create({
    baseURL: "http://localhost:8100",
    headers: {
        "Content-Type": "application/json; charset=utf-8",
    }
})

http.interceptors.request.use((config) => {
    config.headers!["Authorization"] = localStorage.getItem("token") || ""
    return config
}, config => Promise.reject(config))

export default http;