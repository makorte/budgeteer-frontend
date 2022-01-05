import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios, {AxiosError, AxiosResponse} from "axios";

import Project from "../../types/Project";

type DashboardProps = {
    projectId: String
}

const Dashboard = ({projectId}: DashboardProps) => {
    const navigate = useNavigate()

    const initialState: Project = {
        id: "",
        name: ""
    }

    const [project, setProject] = useState<Project>(initialState)

    useEffect(() => {
        if(projectId === "") {
            return navigate("/selectProject")
        }

        axios({
            method: "GET",
            url: `/projects/${projectId}`,
            headers: {
                ["Authorization"]: localStorage.getItem("token") || ""
            }
        })
            .then((res: AxiosResponse) => setProject(res.data))
            .catch((err: AxiosError) => {
                if(err.response?.status === 401) {
                    navigate("/login")
                } else {
                    alert(err.message)
                }
            })
    }, [navigate, projectId])

    return (
        <div className={"dashboard"}>
            <p>Project: {project.name}</p>
        </div>
    )
}

export default Dashboard