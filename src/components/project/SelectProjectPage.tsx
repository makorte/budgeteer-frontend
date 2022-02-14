import React, {useEffect, useState} from "react";
import {AxiosError, AxiosResponse} from "axios";
import {useNavigate} from "react-router-dom";

import {createProject, getProjectById, getProjects} from "../../services/ProjectService";

import Project from "../../types/Project";
import CreateProject from "../../types/CreateProject";

import {useDispatch} from "react-redux";
import {setProject} from "../../store/projectSlice";
import {SubmitHandler, useForm} from "react-hook-form";
import Select from 'react-select'
import SelectOption from "../../types/SelectOption";
import NotificationComponent, {NOTIFICATION_ERROR} from "../ui/NotificationComponent";

const SelectProjectPage = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<CreateProject>()

    const [usersProjects, setUsersProjects] = useState<SelectOption[]>([])
    const [selectedProject, setSelectedProject] = useState<SelectOption>();
    const [selectFormError, setSelectFormError] = useState("")
    const [selectError, setSelectError] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        getProjects()
            .then((res: AxiosResponse) => {
                const projects: SelectOption[] = []
                res.data.map((project: Project) => projects.push({value: project.id!, label: project.name}))
                setUsersProjects(projects)
            })
            .catch((err: AxiosError) => {
                if (err.response?.status === 401) {
                    navigate("/login")
                } else {
                    alert(err.message)
                }
            })
    }, [navigate])

    const onCreateProject: SubmitHandler<CreateProject> = data => {
        createProject(data)
            .then((res: AxiosResponse) => {
                dispatch(setProject(res.data))
                navigate("/dashboard")
            })
            .catch((err: AxiosError) => {
                if (err.response?.status === 401) {
                    navigate("/login")
                } else if (err.response?.status === 400) {
                    setSelectError("This project name already exists!")
                } else {
                    alert(err.message)
                }
            })
    }

    const onSelectProject = () => {
        if (!selectedProject) return setSelectFormError("Please select a project!")

        getProjectById(selectedProject.value.toString())
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

    return (
        <div className="c-form-container m-4 mt-20 w-112">
            <NotificationComponent message={selectError} type={NOTIFICATION_ERROR}/>
            <h3 className="mb-5 mx-2 c-form-heading">Select Project</h3>
            <form onSubmit={handleSubmit(onCreateProject)} className={"c-form-sm z-0 pb-8"}>
                <label htmlFor={"projectName"} className={"c-label"}>Create a new Project</label>
                <div className={"flex flex-row space-x-2"}>
                    <input {...register("name", {
                        required: "Please enter a project name!",
                        minLength: {value: 2, message: "The project name must be at least two characters long!"},
                        maxLength: {value: 30, message: "The project name must not be longer than 30 characters!"}
                    })} type={"text"} id={"projectName"} className={"c-input"}/>
                    <button type={"submit"} value={"OK"} className={"c-button"}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                        </svg>
                    </button>
                </div>
                <p className={"mt-1 c-input-error"}>{errors.name?.message}</p>
            </form>
            {usersProjects.length > 0 && <div className={"c-form-sm z-0 mt-5 pb-8"}>
                <label className={"c-label"}>Select an existing project</label>
                <div className={"flex flex-row space-x-2"}>
                    <Select options={usersProjects}
                            onChange={(selected?: SelectOption | null) => selected && setSelectedProject(selected)}
                            className={"flex-grow"} placeholder={"Select project"}
                            isSearchable/>
                    <button type={"submit"} value={"OK"} className={"c-button"} onClick={onSelectProject}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                        </svg>
                    </button>
                </div>
                <p className={"mt-1 c-input-error"}>{selectFormError}</p>
            </div>}
        </div>
    )
}

export default SelectProjectPage