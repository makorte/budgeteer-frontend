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

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<SelectProjectPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/selectProject" element={<SelectProjectPage/>}/>
                    <Route path="/:projectId" element={<DashboardPage/>}/>
                    <Route path="/:projectId/dashboard" element={<DashboardPage/>}/>
                    <Route path="/:projectId/contracts" element={<ContractsPage/>}/>
                    <Route path="/:projectId/contracts/create" element={<CreateContractPage updateMode={false}/>}/>
                    <Route path="/:projectId/contracts/update/:contractId" element={<CreateContractPage updateMode={true}/>}/>
                    <Route path="/:projectId/contracts/details/:contractId" element={<ContractDetailsPage/>}/>
                    <Route path="/:projectId/contracts/details/:contractId/createInvoice" element={<CreateInvoicePage updateMode={false}/>}/>
                    <Route path="/:projectId/contracts/details/:contractId/updateInvoice/:invoiceId" element={<CreateInvoicePage updateMode={true}/>}/>
                    <Route path="/*" element={<NotFoundPage/>}/>
                </Routes>
            </Router>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
