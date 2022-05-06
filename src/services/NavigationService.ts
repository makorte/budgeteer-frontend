export const loginLink = () => "/login"
export const registerLink = () => "/register"
export const selectProjectLink = () => '/selectProject'
export const dashboardLink = (projectId: string | number) => `/${projectId}/dashboard`
export const contractsLink = (projectId: string | number) => `/${projectId}/contracts`
export const contractDetailsLink = (projectId: string | number, contractId: string | number) => `${contractsLink(projectId)}/details/${contractId}`
export const createContractLink = (projectId: string | number) => `${contractsLink(projectId)}/create`
export const updateContractLink = (projectId: string | number, contractId: string | number) => `${contractsLink(projectId)}update/${contractId}`
export const invoiceDetailsLink = (projectId: string | number, contractId: string | number, invoiceId: string | number) => `${contractDetailsLink(projectId, contractId)}/invoices/details/${invoiceId}`
export const createInvoiceLink = (projectId: string | number, contractId: string | number) => `${contractDetailsLink(projectId, contractId)}/invoices/create`
export const updateInvoiceLink = (projectId: string | number, contractId: string | number, invoiceId: string | number) => `${contractDetailsLink(projectId, contractId)}/invoices/update/${invoiceId}`
