import http from "../http-common"
import Project from "../types/Project"

const getProjects = () => http.get<Project[]>("/projects", {
    headers: {
        "Authorization": localStorage.getItem("token") || ""
    }
})


export default getProjects