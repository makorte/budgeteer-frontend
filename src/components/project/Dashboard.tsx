import React, {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import Store from "../../types/Store";

const Dashboard = () => {
    const project = useSelector((state: Store) => state.project)
    const navigate = useNavigate()

    useEffect(() => {
        if (project.id === "") {
            return navigate("/selectProject")
        }
    }, [navigate, project.id])

    return (
        <div className={"dashboard"}>
            <p>Project: {project.name}</p>
            <Link to={"/logout"}>Logout</Link>
        </div>
    )
}

export default Dashboard