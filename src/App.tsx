import React, {ReactElement} from 'react';
import {Route, Routes} from 'react-router-dom'
import {Provider} from "react-redux";

import Register from "./components/user/Register";
import Login from "./components/user/Login";
import Logout from "./components/user/Logout"
import SelectProject from "./components/project/SelectProject";
import Dashboard from "./components/project/Dashboard";

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
            </Routes>
        </Provider>
    );

}

export default App;