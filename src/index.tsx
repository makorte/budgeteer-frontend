import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {Provider} from "react-redux";

import RegisterPage from "./components/user/RegisterPage";
import LoginPage from "./components/user/LoginPage";
import SelectProjectPage from "./components/project/SelectProjectPage";
import DashboardPage from "./components/project/DashboardPage";
import ContractsPage from "./components/contracts/ContractsPage";
import CreateContractPage from "./components/contracts/CreateContractPage";

import store from "./store/store"
import ContractDetailsPage from "./components/contracts/contractDetailsPage/ContractDetailsPage";
import ReactDOM from "react-dom";

import "./custom.scss"
import NotFoundPage from "./components/ui/NotFoundPage";
import CreateInvoicePage from "./components/contracts/contractDetailsPage/invoices/CreateInvoicePage";
import InvoiceDetailsPage from "./components/contracts/contractDetailsPage/invoices/InvoiceDetailsPage";
import {
    budgetDetailsLink,
    contractDetailsLink,
    contractsLink, createBudgetLink,
    createContractLink, createInvoiceLink,
    dashboardLink, invoiceDetailsLink,
    loginLink,
    registerLink,
    selectProjectLink, updateBudgetLink, updateContractLink, updateInvoiceLink
} from "./services/NavigationService";
import CreateBudgetPage from "./components/contracts/contractDetailsPage/budgets/CreateBudgetPage";
import BudgetDetailsPage from "./components/contracts/contractDetailsPage/budgets/BudgetDetailsPage";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<SelectProjectPage/>}/>
                    <Route path={loginLink()} element={<LoginPage/>}/>
                    <Route path={registerLink()} element={<RegisterPage/>}/>
                    <Route path={selectProjectLink()} element={<SelectProjectPage/>}/>
                    <Route path="/:projectId" element={<DashboardPage/>}/>
                    <Route path={dashboardLink(":projectId")} element={<DashboardPage/>}/>
                    <Route path={contractsLink(":projectId")} element={<ContractsPage/>}/>
                    <Route path={createContractLink(":projectId")} element={<CreateContractPage updateMode={false}/>}/>
                    <Route path={updateContractLink(":projectId", ":contractId")} element={<CreateContractPage updateMode={true}/>}/>
                    <Route path={contractDetailsLink(":projectId", ":contractId")} element={<ContractDetailsPage/>}/>
                    <Route path={createInvoiceLink(":projectId", ":contractId")} element={<CreateInvoicePage updateMode={false}/>}/>
                    <Route path={updateInvoiceLink(":projectId", ":contractId", ":invoiceId")} element={<CreateInvoicePage updateMode={true}/>}/>
                    <Route path={invoiceDetailsLink(":projectId", ":contractId", ":invoiceId")} element={<InvoiceDetailsPage/>}/>
                    <Route path={createBudgetLink(":projectId", ":contractId")} element={<CreateBudgetPage updateMode={false}/>}></Route>
                    <Route path={updateBudgetLink(":projectId", ":contractId", ":budgetId")} element={<CreateBudgetPage updateMode={true}/>}></Route>
                    <Route path={budgetDetailsLink(":projectId", ":contractId", ":budgetId")} element={<BudgetDetailsPage/>}/>
                    <Route path="/*" element={<NotFoundPage/>}/>
                </Routes>
            </Router>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
