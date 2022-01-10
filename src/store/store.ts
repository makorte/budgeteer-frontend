import Store from "../types/Store";
import {ActionTypes, SET_CURRENT_PROJECT_ID} from "./actions";
import {createStore} from "redux";

export const setProjectId = (projectId: string) => projectId

function projectIdReducer(state: Store = {projectId: ""}, action: ActionTypes) {
    switch(action.type) {
        case SET_CURRENT_PROJECT_ID:
            return {
                projectId: action.payload
            }
        default:
            return state
    }
}

const store = createStore(projectIdReducer)

export default store