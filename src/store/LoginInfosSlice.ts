import {createSlice} from "@reduxjs/toolkit";

export const LOGGED_OUT = "loggedOut"
export const REGISTERED = "registered"

interface LoginInfosState {
    loginInfo: typeof LOGGED_OUT | typeof REGISTERED | undefined
}

export const initialState: LoginInfosState = {
    loginInfo: undefined
}

const loginInfosSlice = createSlice({
    name: "loginInfos",
    initialState,
    reducers: {
        setRegistered: state => {
            state.loginInfo = REGISTERED
        },
        setLoggedOut: state => {
            state.loginInfo = LOGGED_OUT
        },
        clearLoginInfos: state => {
            state.loginInfo = undefined
        }
    }
})

export const {setRegistered, setLoggedOut, clearLoginInfos} = loginInfosSlice.actions
export default loginInfosSlice.reducer