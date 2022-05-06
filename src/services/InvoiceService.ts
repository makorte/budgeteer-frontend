import CreateInvoice from "../types/CreateInvoice";
import {NavigateFunction} from "react-router-dom";
import http from "../http-common";
import Invoice from "../types/Invoice";
import {AxiosError, AxiosResponse} from "axios";
import {toContract} from "./NavigationService";
import {handleError} from "./handleError";

export const getInvoice = (projectId: string, contractId: string, invoiceId: string, navigate: NavigateFunction) => {
    return http.get<Invoice>(`/invoices/${invoiceId}`)
        .then((res: AxiosResponse<Invoice>) => res.data)
        .catch((err: AxiosError) => {
            if (err.response?.status === 400 || err.response?.status === 500) toContract(navigate, projectId, contractId)
            else handleError(err, navigate)
        });
};

export const createInvoice = (projectId: string, contractId: string, invoice: CreateInvoice, navigate: NavigateFunction) => {
    invoice.amountOwed.currencyCode = "EUR"

    http.post<Invoice>(`/invoices?contractId=${contractId}`, {...invoice, attributes: {}})
        .then(() => toContract(navigate, projectId, contractId))
        .catch((err: AxiosError) => handleError(err, navigate))
}

export const updateInvoice = (projectId: string, contractId: string, invoiceId: string, invoice: CreateInvoice, navigate: NavigateFunction) => {
    invoice.amountOwed.currencyCode = "EUR"

    http.put<Invoice>(`/invoices/${invoiceId}`, {...invoice, contractId, attributes: {}})
        .then(() => toContract(navigate, projectId, contractId))
        .catch((err: AxiosError) => handleError(err, navigate))
}

export const deleteInvoice = (projectId: string, contractId: string, invoiceId: string, navigate: NavigateFunction, refetch?: Function) => {
    http.delete(`/invoices/${invoiceId}`)
        .then(() => {
            if (refetch) refetch()
            toContract(navigate, projectId, contractId)
        })
        .catch((err: AxiosError) => handleError(err, navigate))
}
