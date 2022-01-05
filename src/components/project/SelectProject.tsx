import React, {FormEvent, useEffect, useState} from "react";
import axios, {AxiosError, AxiosResponse} from "axios";
import {useNavigate} from "react-router-dom";
import Project from "../../types/Project";

type SelectProjectProps = {
    setCurrentProjectId: Function
}

const SelectProject = ({setCurrentProjectId}: SelectProjectProps) => {
    const [projectName, setProjectName] = useState("")
    const [selectedProjectId, setSelectedProjectId] = useState("");
    const [usersProjects, setUsersProjects] = useState<Project[]>([])

    const navigate = useNavigate();

    const fetchUsersProjects = () => {
        axios({
            method: "GET",
            url: "projects",
            headers: {
                ["Authorization"]: localStorage.getItem("token") || ""
            }
        })
            .then((res: AxiosResponse) => setUsersProjects(res.data))
            .catch((err: AxiosError) => {
                if(err.response?.status === 401) {
                    navigate("/login")
                } else {
                    alert(err.message)
                }
            })
    }

    useEffect(fetchUsersProjects, [navigate])

    const onCreateProject = (e: FormEvent) => {
        e.preventDefault()

        axios({
            method: "POST",
            url: "/projects",
            headers: {
                ["Authorization"]: localStorage.getItem("token") || ""
            },
            data: {
                name: projectName
            }
        })
            .then((res: AxiosResponse) => {
                setCurrentProjectId(res.data.id)
                navigate("/dashboard")
            })
            .catch((err: AxiosError) => {
                if(err.response?.status === 401) {
                    navigate("/login")
                } else {
                    alert(err.message)
                }
            })
    }

    const onSelectProject = (e: FormEvent) => {
        e.preventDefault()

        if(selectedProjectId === "") {
            return alert("Please select a Project!")
        }

        setCurrentProjectId(selectedProjectId)
        navigate("/dashboard")
    }

    return (
        <div>
            <h3>Select Project</h3>
            <form onSubmit={onCreateProject}>
                <label htmlFor={"projectName"}><h4>Create a new Project</h4></label>
                <input type={"text"} name={"projectName"} id={"projectName"}
                       onChange={e => setProjectName(e.target.value)}/>
                <input type={"submit"}/>
            </form>
            <form id={"selectProjectForm"} onSubmit={onSelectProject}>
                <label htmlFor={"selectProject"}><h4>Select existing Project</h4></label>
                <select name={"selectProject"} id={"selectProject"} form={"selectProjectForm"} value={selectedProjectId}
                        onChange={e => setSelectedProjectId(e.target.value)}>
                    <option value={""}/>
                    {usersProjects.map(project => <option key={project.id} value={project.id}>{project.name}</option>)}
                </select>
                <input type={"submit"}/>
            </form>
        </div>
    )
}

export default SelectProject