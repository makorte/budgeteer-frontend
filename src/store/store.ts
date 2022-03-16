import {combineReducers, createStore} from "redux";
import loginInfosSlice from "./loginInfosSlice";
import destinationSlice from "./destinationSlice";

const rootReducer = combineReducers({
    loginInfos: loginInfosSlice,
    destintaion: destinationSlice
})

const store = createStore(
    rootReducer,
    //@ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store

export type RootStore = ReturnType<typeof store.getState>

