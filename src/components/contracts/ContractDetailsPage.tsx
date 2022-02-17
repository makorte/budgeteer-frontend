import HeaderComponent from "../ui/HeaderComponent";
import {useSelector} from "react-redux";
import {RootStore} from "../../store/store";
import React, {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {deleteContract} from "../../services/ContractService";
import {AxiosError} from "axios";
import {Button} from "react-bootstrap";

const ContractDetailsPage = () => {
    const contract = useSelector((state: RootStore) => state.contract.contract)
    const navigate = useNavigate()

    useEffect(() => {
        if (!contract.id) {
            navigate("/selectProject")
        }
    }, [navigate, contract.id])

    const onDelete = () => {
        deleteContract(contract.id!)
            .then(() => navigate("/contracts"))
            .catch((err: AxiosError) => {
                if (err.response?.status === 401) {
                    navigate("/login")
                } else {
                    alert(err.message)
                }
            })
    }

    return (
        <div>
            <HeaderComponent/>
            <div className={"bg-white p-3 shadow"}>
                <h3>Contract Details</h3>
            </div>
            <div className={"m-4 container mx-auto mw-600"}>
                <div>
                    <div className={"m-3 bg-primary text-white shadow-sm p-2 px-5 text-center"}>
                        <p className={"my-0"}><b>Name:</b></p>
                        <p className={"fs-4 my-0"}>{contract.name}</p>
                    </div>
                </div>
                <div>
                    <div className={"m-3 bg-primary text-white shadow-sm p-2 px-5 text-center"}>
                        <p className={"my-0"}><b>Id:</b></p>
                        <p className={"fs-4 my-0"}>{contract.internalNumber}</p>
                    </div>
                </div>
                <div>
                    <div className={"m-3 bg-primary text-white shadow-sm p-2 px-5 text-center"}>
                        <p className={"my-0"}><b>Type:</b></p>
                        <p className={"fs-4 my-0"}>{contract.type}</p>
                    </div>
                </div>
                <div>
                    <div className={"m-3 bg-primary text-white shadow-sm p-2 px-5 text-center"}>
                        <p className={"my-0"}><b>Start date:</b></p>
                        <p className={"fs-4 my-0"}>{contract.startDate}</p>
                    </div>
                </div>
                <div>
                    <div className={"m-3 bg-primary text-white shadow-sm p-2 px-5 text-center"}>
                        <p className={"my-0"}><b>Budget:</b></p>
                        <p className={"fs-4 my-0"}>{contract.budget.amount}</p>
                    </div>
                </div>
            </div>
            <div className={"text-center"}>
                <Button className={"m-2"}><Link to={"/contracts/create"} className={"text-white td-none"}>Edit</Link></Button>
                <Button variant={"danger"} className={"text-white m-2"} onClick={onDelete}>Delete</Button>
            </div>
        </div>
    );
}

export default ContractDetailsPage