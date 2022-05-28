import {combineReducers, createStore} from "redux";
import loginInfosSlice from "./loginInfosSlice";
import destinationSlice from "./destinationSlice";
import contractsBackSlice from "./contractsBackSlice";
import invoiceBackSlice from "./invoiceBackSlice";
import budgetsBackSlice from "./budgetsBackSlice";

export const rootReducer = combineReducers({
    loginInfos: loginInfosSlice,
    destintaion: destinationSlice,
    contractsBack: contractsBackSlice,
    invoiceBack: invoiceBackSlice,
    budgetsBack: budgetsBackSlice
})

const store = createStore(
    rootReducer,
    //@ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store

export type RootStore = ReturnType<typeof store.getState>

