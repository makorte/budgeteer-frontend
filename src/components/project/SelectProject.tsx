import React, {FormEvent, useEffect, useState} from "react";
import {AxiosError, AxiosResponse} from "axios";
import {useNavigate} from "react-router-dom";

import {getProjects, getProjectById, createProject} from "../../services/ProjectService";

import Project from "../../types/Project";
import CreateProject from "../../types/CreateProject";

import {useDispatch} from "react-redux";
import {setProject} from "../../store/projectSlice";

const SelectProject = () => {
    const [usersProjects, setUsersProjects] = useState<Project[]>([])
    const [createdProject, setCreatedProject] = useState<CreateProject>({name: ""})
    const [selectedProjectId, setSelectedProjectId] = useState("");

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const fetchUsersProjects = () => {
        getProjects()
            .then((res: AxiosResponse) => setUsersProjects(res.data))
            .catch((err: AxiosError) => {
                if (err.response?.status === 401) {
                    navigate("/login")
                } else {
                    alert(err.message)
                }
            })
    }

    useEffect(fetchUsersProjects, [navigate])

    const onCreateProject = (e: FormEvent) => {
        e.preventDefault()

        createProject(createdProject)
            .then((res: AxiosResponse) => {
                dispatch(setProject(res.data))
                navigate("/dashboard")
            })
            .catch((err: AxiosError) => {
                if (err.response?.status === 401) {
                    navigate("/login")
                } else {
                    alert(err.message)
                }
            })
    }

    const onSelectProject = (e: FormEvent) => {
        e.preventDefault()

        if (selectedProjectId === "") {
            return alert("Please select a Project!")
        }

        getProjectById(selectedProjectId)
            .then((res: AxiosResponse) => {
                dispatch(setProject(res.data))
                navigate("/dashboard")
            })
            .catch((err: AxiosError) => alert(err))
    }

    return (
        <div>
            <h3>Select Project</h3>
            <form onSubmit={onCreateProject}>
                <label htmlFor={"projectName"}><h4>Create a new Project</h4></label>
                <input type={"text"} name={"projectName"} id={"projectName"}
                       onChange={e => setCreatedProject({name: e.target.value})}/>
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