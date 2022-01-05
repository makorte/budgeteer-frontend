import React, {ReactElement, useState} from 'react';
import {Routes, Route} from 'react-router-dom'
import axios from "axios";

import Home from "./components/Home";
import Register from "./components/user/Register";
import Login from "./components/user/Login";
import SelectProject from "./components/project/SelectProject";
import Dashboard from "./components/project/Dashboard";

axios.defaults.baseURL = "http://localhost:8100"
axios.defaults.headers.common["Content-Type"] = "application/json; charset=utf-8"

const App = (): ReactElement => {
    const [currentProjectId, setCurrentProjectId] = useState("")

    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/selectProject" element={<SelectProject setCurrentProjectId={setCurrentProjectId}/>}/>
            <Route path="/dashboard" element={<Dashboard projectId={currentProjectId}/>}/>
        </Routes>
    );

}

export default App;