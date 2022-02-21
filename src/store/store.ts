import {combineReducers, createStore} from "redux";
import projectSlice from "./projectSlice";
import loginInfosSlice from "./loginInfosSlice";

const rootReducer = combineReducers({
    project: projectSlice,
    loginInfos: loginInfosSlice
})

const store = createStore(
    rootReducer,
    //@ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store

export type RootStore = ReturnType<typeof store.getState>

