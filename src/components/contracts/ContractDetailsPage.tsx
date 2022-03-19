import HeaderComponent from "../ui/HeaderComponent";
import React from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {deleteContract} from "../../services/ContractService";
import {Button} from "react-bootstrap";
import useGet from "../../services/useGet";
import SpinnerComponent from "../ui/SpinnerComponent";
import Contract from "../../types/Contract";
import useDestination from "../../services/useDestination";

const ContractDetailsPage = () => {
    const {projectId, contractId} = useParams()
    const navigate = useNavigate()
    const {data: contract, loading} = useGet<Contract>(`/contracts/${contractId}`, {
        id: undefined,
        projectId: undefined,
        internalNumber: "",
        name: "",
        type: undefined,
        startDate: "",
        budget: {
            currencyCode: "EUR",
            amount: ""
        },
        budgetSpent: {
            currencyCode: "EUR",
            amount: ""
        },
        budgetLeft: {
            currencyCode: "EUR",
            amount: ""
        },
        taxRate: undefined
    }, `/${projectId}/contracts`)

    useDestination()

    const onDelete = () => deleteContract(contract.id!, navigate, projectId!)

    return (
        <>
            <HeaderComponent/>
            <div className={"bg-white p-3 shadow"}>
                <h3>Contract Details</h3>
            </div>
            {loading ? <SpinnerComponent/> : <>
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
                    <Button className={"m-2"}><Link to={`/${projectId}/contracts/update/${contractId}`}
                                                    className={"text-white td-none"}>Edit</Link></Button>
                    <Button variant={"danger"} className={"text-white m-2"} onClick={onDelete}>Delete</Button>
                </div>
            </>}
        </>
    );
}

export default ContractDetailsPage
