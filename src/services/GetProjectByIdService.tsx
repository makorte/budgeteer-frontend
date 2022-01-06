import http from "../http-common"
import Project from "../types/Project";

const getProjectById = (id: string) => http.get<Project>(`projects/${id}`, {
    headers: {
        "Authorization": localStorage.getItem("token") || ""
    }
})

export default getProjectById