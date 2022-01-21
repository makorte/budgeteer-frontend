import Contract from "../types/Contract";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ContractState {
    contract: Contract
}

export const initialState: ContractState = {
    contract: {
        id: undefined,
        projectId: undefined,
        internalNumber: "",
        name: "",
        type: undefined,
        startDate: "",
        budget: {
            currencyCode: "EUR",
            amount: ""
        },
        budgetSpent: {
            currencyCode: "EUR",
            amount: ""
        },
        budgetLeft: {
            currencyCode: "EUR",
            amount: ""
        },
        taxRate: undefined
    }
}

const contractSlice = createSlice({
    name: 'contract',
    initialState,
    reducers: {
        setContract: (state, action: PayloadAction<Contract>) => {
            state.contract = action.payload
        }
    }
})

export const {setContract} = contractSlice.actions
export default contractSlice.reducer