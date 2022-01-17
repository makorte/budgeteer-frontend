import React, {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import Store from "../../types/Store";
import Header from "../ui/Header";

const Dashboard = () => {
    const project = useSelector((state: Store) => state.project)
    const navigate = useNavigate()

    useEffect(() => {
        if (project.id === undefined) {
            return navigate("/selectProject")
        }
    }, [navigate, project.id])

    return (
        <div>
            <Header/>
            <h3>Dashboard</h3>
            <p>Project: {project.name}</p>
            <Link to={"/contracts"}>Contracts</Link>
        </div>
    )
}

export default Dashboard