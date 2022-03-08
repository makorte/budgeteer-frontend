import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import HeaderComponent from "../ui/HeaderComponent";
import Project from "../../types/Project";
import {getProjectById} from "../../services/ProjectService";
import {AxiosError, AxiosResponse} from "axios";

const DashboardPage = () => {
    const {projectId} = useParams()
    const [project, setProject] = useState<Project>({id: undefined, name: ''})

    const navigate = useNavigate()

    useEffect(() => {
        if (!projectId) {
            navigate("/selectProject")
        } else {
            getProjectById(projectId)
                .then((res: AxiosResponse<Project>) => setProject(res.data))
                .catch((err: AxiosError) => {
                    if (err.response?.status === 401) {
                        navigate("/login")
                    } else if (err.response?.status === 400 || err.response?.status === 403){
                        navigate("/selectProject")
                    } else {
                        alert(err.message)
                    }
                })
        }
    }, [navigate, project.id])

    return (
        <div>
            <HeaderComponent/>
            <div className={"bg-white p-3 shadow"}>
                <h3>Dashboard</h3>
            </div>
            <p className={"m-3 fs-5"}>Welcome to <b className={"font-extrabold"}>{project.name}</b>!</p>
        </div>
    )
}

export default DashboardPage
