import CreateProject from "../types/CreateProject";
import http from "../http-common";
import Project from "../types/Project";
import {AxiosError, AxiosResponse} from "axios";
import SelectOption from "../types/SelectOption";
import {NavigateFunction} from "react-router-dom";
import {handleError} from "./handleError";
import {toDashboard} from "./NavigationService";

export const createProject = (project: CreateProject, navigate: NavigateFunction, setSelectError: Function) => {
    http.post("/projects", project)
        .then((res: AxiosResponse<Project>) => {
            toDashboard(navigate, res.data.id!)
        })
        .catch((err: AxiosError) => {
            if (err.response?.status === 400) setSelectError("This project name already exists!")
            else handleError(err, navigate)
        })
}

export const getProjectById = (id: string, navigate: NavigateFunction) => {
    http.get<Project>(`/projects/${id}`)
        .then((res: AxiosResponse<Project>) => {
            toDashboard(navigate, res.data.id!)
        })
        .catch((err: AxiosError) => handleError(err, navigate))
}

export const getProjects = (navigate: NavigateFunction): Promise<SelectOption[] | void> => {
    return http.get<Project[]>("/projects")
        .then((res: AxiosResponse<Project[]>) => {
            const projects: SelectOption[] = []
            res.data.forEach((project: Project) => projects.push({value: project.id!, label: project.name}))
            return projects
        })
        .catch((err: AxiosError) => {
            handleError(err, navigate)
        })
}
