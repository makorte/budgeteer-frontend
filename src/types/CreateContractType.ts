import {FIXED_PRICE, TIME_AND_MATERIAL} from "./Contract";

export default interface CreateContractType {
    internalNumber: string
    name: string
    type: string | typeof TIME_AND_MATERIAL | typeof FIXED_PRICE | undefined
    startDate: string
    budget: {
        currencyCode: string
        amount: string
    }
    taxRate: number | undefined

    // TODO include attributes and attachment
}