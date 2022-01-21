import http from "../http-common";
import Contract from "../types/Contract";
import CreateContractType from "../types/CreateContractType";

export const getContracts = (projectId: number) => http.get<Contract[]>(`/contracts?projectId=${projectId}`)

export const createContract = (projectId: number, contract: CreateContractType) => http.post<Contract>(`/contracts?projectId=${projectId}`, contract)

export const updateContract = (contractId: number, contract: CreateContractType) => http.put<Contract>(`/contracts/${contractId}`, contract)