import React, {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import HeaderComponent from "../ui/HeaderComponent";
import {RootStore} from "../../store/store";

const DashboardPage = () => {
    const project = useSelector((state: RootStore) => state.project.project)

    const navigate = useNavigate()

    useEffect(() => {
        if (project.id === undefined) {
            return navigate("/selectProject")
        }
    }, [navigate, project.id])

    return (
        <div>
            <HeaderComponent/>
            <h3>Dashboard</h3>
            <p>Project: {project.name}</p>
            <div>
                <Link to={"/contracts"}>Contracts</Link>
            </div>
        </div>
    )
}

export default DashboardPage