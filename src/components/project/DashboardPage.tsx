import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import HeaderComponent from "../ui/HeaderComponent";
import {RootStore} from "../../store/store";

const DashboardPage = () => {
    const project = useSelector((state: RootStore) => state.project.project)

    const navigate = useNavigate()

    useEffect(() => {
        if (project.id === undefined) {
            return navigate("/selectProject")
        }
    }, [navigate, project.id])

    return (
        <div className={"w-full"}>
            <HeaderComponent/>
            <div className={"c-header"}>
                <h3>Dashboard</h3>
            </div>
            <p className={"m-4 text-lg font-semibold"}>Welcome to <b className={"font-extrabold"}>{project.name}</b>!</p>
        </div>
    )
}

export default DashboardPage