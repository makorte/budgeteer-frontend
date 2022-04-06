import {createStore} from "redux";
import {rootReducer} from "./store/store";

export const createTestStore = () => createStore(rootReducer)
