export default interface CreateInvoice {
    name: string,
    contractId?: string,
    amountOwed: {
        currencyCode: string,
        amount: string
    },
    taxRate: string,
    internalNumber: string,
    yearMonth: string,
    paidDate?: string,
    dueDate?: string,
    attributes?: any

    // TODO implement attributes, link, file
}
