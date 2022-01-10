import Store from "../types/Store";
import {ActionTypes, SET_CURRENT_PROJECT} from "./actions";
import {createStore} from "redux";
import Project from "../types/Project";

export const setProject = (project: Project) => project

const initialState = {
    project: {
        id: "",
        name: ""
    }
} as Store

function projectReducer(state: Store = initialState, action: ActionTypes) {
    switch(action.type) {
        case SET_CURRENT_PROJECT:
            return {
                project: action.payload
            }
        default:
            return state
    }
}

const store = createStore(
    projectReducer,
    //@ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )

export default store