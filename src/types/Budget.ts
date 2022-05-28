export default interface Contract {
    id: number | undefined,
    name: string,
    contractId: number | undefined,
    contractName: string,
    description: string,
    importKey: string,
    total: {
        currencyCode: string,
        amount: string
    },
    spent: {
        currencyCode: string,
        amount: string
    },
    remaining: {
        currencyCode: string,
        amount: string
    },
    avarageDailyRate?: {
        currencyCode: string,
        amount: string
    },
    unplanned: {
        currencyCode: string,
        amount: string
    },
    limit: {
        currencyCode: string,
        amount: string
    },
    lastUpdated: string

    // TODO #39 implement tags
}
