import React, {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import Header from "../ui/Header";
import {RootStore} from "../../store/store";

const Dashboard = () => {
    const project = useSelector((state: RootStore) => state.project.project)
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