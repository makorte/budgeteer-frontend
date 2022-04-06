import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ContractsBackSlice {
    destination: string | undefined
}

const initialState: ContractsBackSlice = {
    destination: undefined,
}

const constractsBackSlice = createSlice({
    name: 'contractsBackSlice',
    initialState,
    reducers: {
        setContractsBackDestination: (state, action: PayloadAction<string>) => {
            state.destination = action.payload
        }
    },
})

export const {setContractsBackDestination} = constractsBackSlice.actions
export default constractsBackSlice.reducer
