import {combineReducers, createStore} from "redux";
import projectSlice from "./projectSlice";
import contractSlice from "./contractSlice";

const rootReducer = combineReducers({
    project: projectSlice,
    contract: contractSlice
})

const store = createStore(
    rootReducer,
    //@ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store

export type RootStore = ReturnType<typeof store.getState>

