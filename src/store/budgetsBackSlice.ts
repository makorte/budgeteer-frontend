import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface BudgetsBackSlice {
    destination: string | undefined
}

const initialState: BudgetsBackSlice = {
    destination: undefined
}

const budgetsBackSlice = createSlice({
    name: "bdugetsBackSlice",
    initialState,
    reducers: {
        setBudgetsBackDestination: (state, action: PayloadAction<string | undefined>) => {
            state.destination = action.payload
        }
    }
})

export const {setBudgetsBackDestination} = budgetsBackSlice.actions
export default budgetsBackSlice.reducer
