import React, {ReactElement, useState} from 'react';
import {Route, Routes} from 'react-router-dom'

import Register from "./components/user/Register";
import Login from "./components/user/Login";
import Logout from "./components/user/Logout"
import SelectProject from "./components/project/SelectProject";
import Dashboard from "./components/project/Dashboard";

const App = (): ReactElement => {
    const [currentProjectId, setCurrentProjectId] = useState("")

    return (
        <Routes>
            <Route path="/" element={<SelectProject setCurrentProjectId={setCurrentProjectId}/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/logout" element={<Logout/>}/>
            <Route path="/selectProject" element={<SelectProject setCurrentProjectId={setCurrentProjectId}/>}/>
            <Route path="/dashboard" element={<Dashboard projectId={currentProjectId}/>}/>
        </Routes>
    );

}

export default App;