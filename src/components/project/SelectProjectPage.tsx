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
import {Alert, Button, Form} from "react-bootstrap";

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
        <div className={"container mt-5 mx-auto"} style={{"maxWidth": "350px"}}>
            {selectError && <Alert variant={"danger"} onClose={() => setSelectError("")}
                                   dismissible>{selectError}</Alert>}

            <h2>Select Project</h2>

            <Form onSubmit={handleSubmit(onCreateProject)} className={"bg-white px-4 py-3 shadow rounded-3"}>
                <Form.Label className={"mb-1"}>Create a new Project</Form.Label>

                <div className={"row"} style={{"maxWidth": "105%"}}>
                    <div className={"col"}>
                        <Form.Control {...register("name", {
                            required: "Please enter a project name!",
                            minLength: {value: 2, message: "The project name must be at least two characters long!"},
                            maxLength: {value: 30, message: "The project name must not be longer than 30 characters!"}
                        })} type={"text"} className={"mr-2"}/>
                    </div>
                    <Button type={"submit"}
                            className={"col-auto d-inline-flex justify-content-center align-items-center text-white"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-arrow-right" viewBox="0 0 16 16">
                            <path
                                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                        </svg>
                    </Button>
                </div>
                <p className={"text-danger"}>{errors.name?.message}</p>
            </Form>

            {usersProjects.length > 0 && <div className={"mt-4 bg-white px-4 py-3 shadow rounded-3"}>
                <p className={"mb-1"}>Select an existing project</p>
                <div className={"row"} style={{"maxWidth": "105%"}}>
                    <div className={"col"}>
                        <Select options={usersProjects}
                                onChange={(selected?: SelectOption | null) => selected && setSelectedProject(selected)}
                                placeholder={"Select project"} isSearchable className={"mr-2"}/>
                    </div>
                    <Button type={"submit"} onClick={onSelectProject}
                            className={"col-auto d-inline-flex justify-content-center align-items-center text-white"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-arrow-right" viewBox="0 0 16 16">
                            <path
                                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                        </svg>
                    </Button>
                </div>
                <p className={"text-danger"}>{selectFormError}</p>
            </div>}
        </div>
    )
}

export default SelectProjectPage