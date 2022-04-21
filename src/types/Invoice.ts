export default interface Invoice {
    invoiceId: number | undefined;
    invoiceName: string,
    contractId: number | undefined,
    contractName: string,
    amountOwed: {
        currencyCode: string,
        amount: string
    },
    taxRate: number | undefined,
    internalNumber: string,
    yearMonth: string,
    paidDate: string,
    dueDate: string

    // TODO implement attributes, link and attachment
}
