import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface InvoiceBackSlice {
    destination: string | undefined;
}

const initialState: InvoiceBackSlice = {
    destination: undefined,
}

const invoiceBackSlice = createSlice({
    name: 'invoiceBackSlice',
    initialState,
    reducers: {
        setInvoiceBackDestination: (state, action: PayloadAction<string | undefined>) => {
            state.destination = action.payload;
        },
    },
})

export const {setInvoiceBackDestination} = invoiceBackSlice.actions
export default invoiceBackSlice.reducer
