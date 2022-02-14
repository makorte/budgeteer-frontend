import {FIXED_PRICE, TIME_AND_MATERIAL} from "./Contract";

export default interface CreateContract {
    internalNumber: string
    name: string
    type: string | typeof TIME_AND_MATERIAL | typeof FIXED_PRICE | undefined
    startDate: string
    budget: {
        currencyCode: string
        amount: string
    }
    taxRate: string

    // TODO include attributes and attachment
}