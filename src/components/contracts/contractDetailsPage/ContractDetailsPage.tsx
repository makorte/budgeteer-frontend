import HeaderComponent from "../../ui/HeaderComponent";
import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import {deleteContract} from "../../../services/ContractService";
import {Button} from "react-bootstrap";
import useGet from "../../../services/useGet";
import SpinnerComponent from "../../ui/SpinnerComponent";
import Contract from "../../../types/Contract";
import useDestination from "../../../services/useDestination";
import {useDispatch} from "react-redux";
import {setContractsBackDestination} from "../../../store/contractsBackSlice";
import ContractDetailsComponent from "./ContractDetailsComponent";
import InvoicesComponent from "./invoices/InvoicesComponent";
import {contractDetailsLink, updateContractLink} from "../../../services/NavigationService";

const ContractDetailsPage = () => {
    const dispatch = useDispatch()
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

    const onEdit = () => {
        dispatch(setContractsBackDestination(contractDetailsLink(projectId!, contractId!)))
        navigate(updateContractLink(projectId!, contractId!))
    }

    return (
        <>
            <HeaderComponent/>
            <div className={"bg-white p-3 shadow d-flex justify-content-between"}>
                <h3>Contract</h3>
            </div>
            {loading ? <SpinnerComponent/> : <div data-testid={"contract-wrapper"}>
                <div className={"d-flex justify-content-around"}>
                    <ContractDetailsComponent contract={contract}/>
                    <InvoicesComponent projectId={projectId!} contractId={contractId!.toString()}/>
                </div>
                <div className={"text-center"}>
                    <Button className={"m-2 text-white td-none"} onClick={onEdit}>Edit</Button>
                    <Button variant={"danger"} className={"text-white m-2"} onClick={onDelete}>Delete</Button>
                </div>
            </div>}
        </>
    );
}

export default ContractDetailsPage
