import React, {ReactElement} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import axios from "axios";

import Header from "./components/Header";
import Register from "./components/user/Register";
import Login from "./components/user/Login";

axios.defaults.baseURL="http://localhost:8100"
axios.defaults.headers.common["Content-Type"]= "application/json; charset=utf-8"

const App = (): ReactElement => {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Header/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;