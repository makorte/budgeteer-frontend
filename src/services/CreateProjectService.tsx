import http from "../http-common"
import CreateProject from "../types/CreateProject";

const createProject = (project: CreateProject) => http.post("/projects", project, {
    headers: {
        "Authorization": localStorage.getItem("token") || ""
    }
})

export default createProject;