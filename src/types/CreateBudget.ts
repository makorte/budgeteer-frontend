export default interface CreateBudget {
    name: string,
    description?: string,
    importKey: string,
    total: {
        currencyCode: string,
        amount: string
    },
    limit: {
        currencyCode: string,
        amount: string
    }

    // TODO #39 implement tags
}
