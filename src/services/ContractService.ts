import http from "../http-common";
import Contract from "../types/Contract";
import CreateContract from "../types/CreateContract";
import {AxiosError, AxiosResponse} from "axios";
import {NavigateFunction} from "react-router-dom";
import {handleError} from "./handleError";

export const getContract = (contractId: string, navigate: NavigateFunction, projectId: string): Promise<Contract | void> => {
    return http.get<Contract>(`/contracts/${contractId}`)
        .then((res: AxiosResponse<Contract>) => {
            return res.data
        })
        .catch((err: AxiosError) => {
            if (err.response?.status === 400 || err.response?.status === 500) navigate(`/${projectId}/contracts`)
            else handleError(err, navigate)
        })
}

export const createContract = (projectId: string, contract: CreateContract, navigate: NavigateFunction) => {
    contract.budget.currencyCode = "EUR"

    http.post<Contract>(`/contracts?projectId=${projectId}`, contract)
        .then((res: AxiosResponse<Contract>) => navigate(`/${projectId}/contracts/details/${res.data.id}`))
        .catch((err: AxiosError) => handleError(err, navigate))
}

export const updateContract = (contractId: string, contract: CreateContract, navigate: NavigateFunction, projectId: string) => {
    contract.budget.currencyCode = "EUR"

    http.put<Contract>(`/contracts/${contractId}`, contract)
        .then(() => navigate(`/${projectId}/contracts/details/${contractId}`))
        .catch((err: AxiosError) => handleError(err, navigate))
}

export const deleteContract = (contractId: number, navigate: NavigateFunction, projectId: string, refetch?: Function) => {
    http.delete(`/contracts/${contractId}`)
        .then(() => {
            if (refetch) refetch()
            navigate(`/${projectId}/contracts`)
        })
        .catch((err: AxiosError) => handleError(err, navigate))
}

