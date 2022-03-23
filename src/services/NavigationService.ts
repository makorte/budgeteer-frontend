import {NavigateFunction} from "react-router-dom";

export const toLogin = (navigate: NavigateFunction) => navigate("/login")

export const toSelectProject = (navigate: NavigateFunction) => navigate("/selectProject")

export const toDashboard = (navigate: NavigateFunction, projectId: string | number) => navigate(`/${projectId}/dashboard`)

export const toContract = (navigate: NavigateFunction, projectId: string | number, contractId: string | number) => navigate(`/${projectId}/contracts/details/${contractId}`)

export const toContracts = (navigate: NavigateFunction, projectId: string | number) => navigate(`/${projectId}/contracts`)

