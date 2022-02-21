import http from "../http-common";
import Contract from "../types/Contract";
import CreateContract from "../types/CreateContract";

export const getContracts = (projectId: number) => http.get<Contract[]>(`/contracts?projectId=${projectId}`)

export const getContract = (contractId: number) => http.get<Contract>(`/contracts/${contractId}`)

export const createContract = (projectId: number, contract: CreateContract) => http.post<Contract>(`/contracts?projectId=${projectId}`, contract)

export const updateContract = (contractId: number, contract: CreateContract) => http.put<Contract>(`/contracts/${contractId}`, contract)

export const deleteContract = (contractId: number) => http.delete(`/contracts/${contractId}`)