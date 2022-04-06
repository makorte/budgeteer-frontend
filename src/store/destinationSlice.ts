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
        }
    }
})

export const {setDestination} = destinationSlice.actions
export default destinationSlice.reducer
