import React from "react";
import {useParams} from "react-router-dom";
import HeaderComponent from "../ui/HeaderComponent";
import Project from "../../types/Project";
import useGet from "../../services/useGet";
import SpinnerComponent from "../ui/SpinnerComponent";
import useDestination from "../../services/useDestination";

const DashboardPage = () => {
    const {projectId} = useParams()
    const {data: project, loading} = useGet<Project>(`/projects/${projectId}`, {
        id: undefined,
        name: ''
    }, "/selectProject")

    useDestination()

    return (
        <div>
            <HeaderComponent/>
            <div className={"bg-white p-3 shadow"}>
                <h3>Dashboard</h3>
            </div>
            {loading ? <SpinnerComponent/> :
                <p className={"m-3 fs-5"}>Welcome to <b className={"font-extrabold"}>{project.name}</b>!</p>}
        </div>
    )
}

export default DashboardPage
