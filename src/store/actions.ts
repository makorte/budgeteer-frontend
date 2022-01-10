export const SET_CURRENT_PROJECT_ID = "SET_CURRENT_PROJECT_ID"

export type ActionTypes = {
    type: typeof SET_CURRENT_PROJECT_ID,
    payload: string
}

export const setCurrentProjectId = (id: string): ActionTypes => ({type: SET_CURRENT_PROJECT_ID, payload: id})