import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {AxiosError, AxiosResponse} from "axios";

import getProjectById from "../../services/GetProjectByIdService";

import Project from "../../types/Project";

const Dashboard = ({projectId}: { projectId: string }) => {
    const navigate = useNavigate()

    const [project, setProject] = useState<Project>({id: "", name: ""})

    useEffect(() => {
        if (projectId === "") {
            return navigate("/selectProject")
        }

        getProjectById(projectId)
            .then((res: AxiosResponse) => setProject(res.data))
            .catch((err: AxiosError) => {
                if (err.response?.status === 401) {
                    navigate("/login")
                } else {
                    alert(err.message)
                }
            })
    }, [navigate, projectId])

    return (
        <div className={"dashboard"}>
            <p>Project: {project.name}</p>
            <Link to={"/logout"}>Logout</Link>
        </div>
    )
}

export default Dashboard