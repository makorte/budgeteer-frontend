export default interface Invoice {
    invoiceId: number,
    invoiceName: string,
    contractId: number,
    contractName: string,
    amountOwed: {
        currencyCode: string,
        amount: string
    },
    taxRate: number,
    internalNumber: string,
    yearMonth: string,
    paidDate: string,
    dueDate: string

    // TODO implement attributes, link and attachment
}
