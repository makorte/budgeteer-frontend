import {Button, Form} from "react-bootstrap";
import React from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import CreateProject from "../../types/CreateProject";
import {createProject} from "../../services/ProjectService";
import {useNavigate} from "react-router-dom";

type Props = {
    setSelectError: Function
}

const CreateProjectForm = ({setSelectError}: Props) => {
    const navigate = useNavigate()

    const {register, handleSubmit, formState: {errors}} = useForm<CreateProject>()

    const onCreateProject: SubmitHandler<CreateProject> = data => createProject(data, navigate, setSelectError)

    return (
        <Form onSubmit={handleSubmit(onCreateProject)} className={"bg-white px-4 py-3 shadow rounded-3"}>
            <label htmlFor={"projectName"} className={"mb-1"}>Create a new Project</label>

            <div className={"row mw-p-105"}>
                <div className={"col"}>
                    <input {...register("name", {
                        required: "Please enter a project name!"
                    })} type={"text"} className={"form-control mr-2"} id={"projectName"} autoFocus/>
                </div>
                <Button data-testid={"submit-button"} type={"submit"}
                        className={"col-auto d-inline-flex justify-content-center align-items-center text-white"}>
                    <i className="bi bi-arrow-right"/>
                </Button>
            </div>
            <p className={"text-danger"}>{errors.name?.message}</p>
        </Form>
    )
}

export default CreateProjectForm
