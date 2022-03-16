import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface DestinationSlice {
    destination: string | undefined
}

const initalDestination: DestinationSlice = {
    destination: undefined
}

const destinationSlice = createSlice({
    name: 'destination',
    initialState: initalDestination,
    reducers: {
        setDestination: (state, action: PayloadAction<string>) => {
            state.destination = action.payload
        },
        clearDestination: state => {
            state.destination = undefined
        }
    }
})

export const {setDestination, clearDestination} = destinationSlice.actions
export default destinationSlice.reducer
