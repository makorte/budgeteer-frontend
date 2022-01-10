import Project from "../types/Project";

export const SET_CURRENT_PROJECT = "SET_CURRENT_PROJECT"

export type ActionTypes = {
    type: typeof SET_CURRENT_PROJECT,
    payload: Project
}

export const setCurrentProject = (project: Project): ActionTypes => ({type: SET_CURRENT_PROJECT, payload: project})