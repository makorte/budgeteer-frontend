import React from 'react';
import {Route, Routes} from 'react-router-dom'
import {Provider} from "react-redux";

import RegisterPage from "./components/user/RegisterPage";
import LoginPage from "./components/user/LoginPage";
import LogoutPage from "./components/user/LogoutPage"
import SelectProjectPage from "./components/project/SelectProjectPage";
import DashboardPage from "./components/project/DashboardPage";
import ContractsPage from "./components/contracts/ContractsPage";
import CreateContractPage from "./components/contracts/CreateContractPage";

import store from "./store/store"
import ContractDetailsPage from "./components/contracts/ContractDetailsPage";

const App = () => {
    return (
        <Provider store={store}>
            <Routes>
                <Route path="/" element={<SelectProjectPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/logout" element={<LogoutPage/>}/>
                <Route path="/selectProject" element={<SelectProjectPage/>}/>
                <Route path="/dashboard" element={<DashboardPage/>}/>
                <Route path="/contracts" element={<ContractsPage/>}/>
                <Route path="/contracts/create" element={<CreateContractPage/>}/>
                <Route path="/contracts/details" element={<ContractDetailsPage/>}/>
            </Routes>
        </Provider>
    );

}

export default App;