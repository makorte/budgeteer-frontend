import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    useEffect(() => navigate("/selectProject"), [navigate])

    return (
        <header>
            <h2>Budgeteer</h2>
        </header>
    );
}

export default Home;