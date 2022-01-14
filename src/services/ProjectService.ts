import CreateProject from "../types/CreateProject";
import http from "../http-common";
import Project from "../types/Project";

export const createProject = (project: CreateProject) => http.post("/projects", project)

export const getProjectById = (id: string) => http.get<Project>(`projects/${id}`)

export const getProjects = () => http.get<Project[]>("/projects")