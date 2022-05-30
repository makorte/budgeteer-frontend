import CreateBudget from "../types/CreateBudget";
import {NavigateFunction} from "react-router-dom";
import http from "../http-common";
import {handleError} from "./handleError";
import Budget from "../types/Budget"
import {contractDetailsLink} from "./NavigationService";
import {AxiosError} from "axios";

export const getBudget = (projectId: string, contractId: string, budgetId: string, navigate: NavigateFunction) => {
    return http.get<Budget>(`/budgets/${budgetId}`)
        .then(res => res.data)
        .catch((err: AxiosError) => {
            if (err.response?.status === 400 || err.response?.status === 500) navigate(contractDetailsLink(projectId, contractId))
            else handleError(err, navigate)
        })
}

export const createBudget = (projectId: string, contractId: string, budget: CreateBudget, navigate: NavigateFunction) => {
    budget.total.currencyCode = "EUR"
    budget.limit.currencyCode = "EUR"

    http.post<Budget>(`/budgets?projectId=${projectId}`, {...budget, contractId})
        .then(() => navigate(contractDetailsLink(projectId, contractId)))
        .catch(err => handleError(err, navigate))
}

export const updateBudget = (projectId: string, contractId: string, budgetId: string, budget: CreateBudget, navigate: NavigateFunction) => {
    budget.total.currencyCode = "EUR"
    budget.limit.currencyCode = "EUR"

    http.put(`/budgets/${budgetId}`, {...budget, contractId})
        .then(() => navigate(contractDetailsLink(projectId, contractId)))
        .catch(err => handleError(err, navigate))
}

export const deleteBudget = (projectId: string, contractId: string, budgetId: string, navigate: NavigateFunction, refetch?: Function) => {
    http.delete(`/budgets/${budgetId}`)
        .then(() => {
            if(refetch) refetch()
            navigate(contractDetailsLink(projectId, contractId))
        })
        .catch((err: AxiosError) => handleError(err, navigate))
}
