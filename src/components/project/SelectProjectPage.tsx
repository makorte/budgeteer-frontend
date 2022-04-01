import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import {getProjects} from "../../services/ProjectService";
import {Alert} from "react-bootstrap";
import Project from "../../types/Project";
import CreateProjectForm from "./CreateProjectForm";
import SelectProjectForm from "./SelectProjectForm";

const SelectProjectPage = () => {
    const [usersProjects, setUsersProjects] = useState<Project[]>([])
    const [selectError, setSelectError] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        getProjects(navigate)
            .then(res => res && setUsersProjects(res))
    }, [navigate])

    return (
        <div className={"mt-5 mx-auto mw-350"}>
            {selectError && <Alert variant={"danger"} onClose={() => setSelectError("")}
                                   dismissible>{selectError}</Alert>}

            <h2>Select Project</h2>
            <CreateProjectForm setSelectError={setSelectError}/>
            {usersProjects.length > 0 && <SelectProjectForm usersProjects={usersProjects}/>}
        </div>
    )
}

export default SelectProjectPage
