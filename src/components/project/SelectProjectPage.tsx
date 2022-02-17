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
        <div className={"mt-5 mx-auto mw-350"}>
            {selectError && <Alert variant={"danger"} onClose={() => setSelectError("")}
                                   dismissible>{selectError}</Alert>}

            <h2>Select Project</h2>

            <Form onSubmit={handleSubmit(onCreateProject)} className={"bg-white px-4 py-3 shadow rounded-3"}>
                <Form.Label className={"mb-1"}>Create a new Project</Form.Label>

                <div className={"row mw-p-105"}>
                    <div className={"col"}>
                        <Form.Control {...register("name", {
                            required: "Please enter a project name!",
                            minLength: {value: 2, message: "The project name must be at least two characters long!"},
                            maxLength: {value: 30, message: "The project name must not be longer than 30 characters!"}
                        })} type={"text"} className={"mr-2"}/>
                    </div>
                    <Button type={"submit"}
                            className={"col-auto d-inline-flex justify-content-center align-items-center text-white"}>
                        <i className="bi bi-arrow-right"/>
                    </Button>
                </div>
                <p className={"text-danger"}>{errors.name?.message}</p>
            </Form>

            {usersProjects.length > 0 && <div className={"mt-3 bg-white px-4 py-3 shadow rounded-3"}>
                <p className={"mb-1"}>Select an existing project</p>
                <div className={"row mw-p-105"}>
                    <div className={"col"}>
                        <Select options={usersProjects}
                                onChange={(selected?: SelectOption | null) => selected && setSelectedProject(selected)}
                                placeholder={"Select project"} isSearchable className={"mr-2"}/>
                    </div>
                    <Button type={"submit"} onClick={onSelectProject}
                            className={"col-auto d-inline-flex justify-content-center align-items-center text-white"}>
                        <i className="bi bi-arrow-right"/>
                    </Button>
                </div>
                <p className={"text-danger"}>{selectFormError}</p>
            </div>}
        </div>
    )
}

export default SelectProjectPage