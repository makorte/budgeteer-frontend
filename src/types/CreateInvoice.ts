export default interface CreateInvoice {
    name: string,
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

    // TODO #37 implement attributes, link, file
}
