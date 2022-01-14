import Store from "../types/Store";
import {SET_CURRENT_PROJECT} from "./actions";
import {createStore} from "redux";
import Project from "../types/Project";
import {createAction, createReducer} from "@reduxjs/toolkit";

const setProject = createAction<Project>(SET_CURRENT_PROJECT)

const initialState: Store = {
    project: {
        id: undefined,
        name: ""
    }
}

const projectReducer = createReducer(initialState, builder => {
    builder
        .addCase(setProject, (state, action) => {
            state.project = action.payload
        })
})


const store = createStore(
    projectReducer,
    //@ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )

export default store