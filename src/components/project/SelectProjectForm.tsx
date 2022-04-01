import {Button, Form} from "react-bootstrap";
import React from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import Project from "../../types/Project";
import {getProjectById} from "../../services/ProjectService";
import {useNavigate} from "react-router-dom";

type Props = {
    usersProjects: Project[];
}

const SelectProjectForm = ({usersProjects}: Props) => {
    const navigate = useNavigate()

    const {register, handleSubmit} = useForm<Project>()

    const onSelectProject: SubmitHandler<Project> = data => getProjectById(data.id!.toString(), navigate)

    return (
        <div data-testid={"select-project-form"} className={"mt-3 bg-white px-4 py-3 shadow rounded-3"}>
            <Form onSubmit={handleSubmit(onSelectProject)}>
                <label htmlFor={"selectProject"} className={"mb-1"}>Select an existing project</label>
                <div className={"row mw-p-105 mb-2"}>
                    <div className={"col"}>
                        <select className={"form-control"} id={"selectProject"} data-testid={"project-select"} {...register("id")}>
                            {usersProjects.map(project => <option key={project.id}
                                                                  value={project.id}>{project.name}</option>)}
                        </select>
                    </div>
                    <Button type={"submit"} data-testid={"submit-button"}
                            className={"col-auto d-inline-flex justify-content-center align-items-center text-white"}>
                        <i className="bi bi-arrow-right"/>
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default SelectProjectForm
