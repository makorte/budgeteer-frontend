import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import Project from "../types/Project";

interface ProjectState {
    project: Project
}

const initialState: ProjectState = {
    project: {
        id: undefined,
        name: ""
    }
}

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        setProject: (state, action: PayloadAction<Project>) => {
            state.project = action.payload
        }
    }
})

export const {setProject} = projectSlice.actions
export default projectSlice.reducer