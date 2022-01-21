import React from 'react';
import {Route, Routes} from 'react-router-dom'
import {Provider} from "react-redux";

import Register from "./components/user/Register";
import Login from "./components/user/Login";
import Logout from "./components/user/Logout"
import SelectProject from "./components/project/SelectProject";
import Dashboard from "./components/project/Dashboard";
import Contracts from "./components/contracts/Contracts";
import CreateContract from "./components/contracts/CreateContract";

import store from "./store/store"

const App = () => {
    return (
        <Provider store={store}>
            <Routes>
                <Route path="/" element={<SelectProject/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/logout" element={<Logout/>}/>
                <Route path="/selectProject" element={<SelectProject/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/contracts" element={<Contracts/>}/>
                <Route path="/contracts/create" element={<CreateContract/>}/>
            </Routes>
        </Provider>
    );

}

export default App;