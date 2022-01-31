export const TIME_AND_MATERIAL = "TIME_AND_MATERIAL"
export const FIXED_PRICE = "FIXED_PRICE"

export default interface Contract {
    id: number | undefined
    projectId: number | undefined
    internalNumber: string
    name: string
    type: string | typeof TIME_AND_MATERIAL | typeof FIXED_PRICE | undefined
    startDate: string
    budget: {
        currencyCode: string
        amount: string
    }
    budgetSpent: {
        currencyCode: string
        amount: string
    }
    budgetLeft: {
        currencyCode: string
        amount: string
    }
    taxRate: number | undefined

    // TODO include attributes and attachment
}