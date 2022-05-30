import React from "react";
import useGet from "../../../../services/useGet";
import Budget from "../../../../types/Budget"
import {useNavigate, useParams} from "react-router-dom";
import {budgetDetailsLink, contractDetailsLink, updateBudgetLink} from "../../../../services/NavigationService";
import {Button} from "react-bootstrap";
import HeaderComponent from "../../../ui/HeaderComponent";
import SpinnerComponent from "../../../ui/SpinnerComponent";
import {useDispatch} from "react-redux";
import {setBudgetsBackDestination} from "../../../../store/budgetsBackSlice";
import {deleteBudget} from "../../../../services/BudgetService";
import useDestination from "../../../../services/useDestination";

const BudgetDetailsPage = () => {
    useDestination()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {projectId, contractId, budgetId} = useParams()
    const {data: budget, loading} = useGet<Budget>(`/budgets/${budgetId}`, {
        id: undefined,
        name: "",
        contractId: undefined,
        contractName: "",
        description: "",
        importKey: "",
        total: {
            currencyCode: "",
            amount: ""
        },
        spent: {
            currencyCode: "",
            amount: ""
        },
        remaining: {
            currencyCode: "",
            amount: ""
        },
        avarageDailyRate: {
            currencyCode: "",
            amount: ""
        },
        unplanned: {
            currencyCode: "",
            amount: ""
        },
        limit: {
            currencyCode: "",
            amount: ""
        },
        lastUpdated: ""
    }, contractDetailsLink(projectId!, contractId!))

    const onBack = () => navigate(contractDetailsLink(projectId!, contractId!))

    const onEdit = () => {
        dispatch(setBudgetsBackDestination(budgetDetailsLink(projectId!, contractId!, budgetId!)))
        navigate(updateBudgetLink(projectId!, contractId!, budgetId!))
    }

    const onDelete = () => {
        deleteBudget(projectId!, contractId!, budgetId!, navigate)
    }

    return (<>
        <HeaderComponent/>
        <div className={"bg-white p-3 shadow d-flex justify-content-between"}>
            <h3>Budget</h3>
        </div>
        <span onClick={onBack}
              className={"back-btn m-2 d-inline-flex justify-content-center align-items-center fs-5 td-none"}>
                <i className="bi bi-arrow-left mx-2"/>
                Back
            </span>
        {loading ? <SpinnerComponent/> : <div className={"container"} data-testid={"details-wrapper"}>
            <h3>Details</h3>
            <div className="row">
                <div className="col container bg-white mb-4 p-4">
                    <div className="row">
                        <div className="col mb-2">
                            <p className={"my-0"}><b>Name:</b></p>
                            <p className={"fs-5 my-0"}>{budget.name}</p>
                        </div>
                        <div className="col mb-2">
                            <p className={"my-0"}><b>Contract:</b></p>
                            <p className={"fs-5 my-0"}>{budget.contractName}</p>
                        </div>
                        <div className="col mb-2">
                            <p className={"my-0"}><b>Description:</b></p>
                            <p className={"fs-5 my-0"}>{budget.description}</p>
                        </div>
                        <div className="col mb-2">
                            <p className={"my-0"}><b>ImportKey:</b></p>
                            <p className={"fs-5 my-0"}>{budget.importKey}</p>
                        </div>
                        {budget.lastUpdated && <div className="col mb-2">
                            <p className={"my-0"}><b>Last updated:</b></p>
                            <p className={"fs-5 my-0"}>{budget.lastUpdated}</p>
                        </div>}
                        <div className="col mb-2">
                            <p className={"my-0"}><b>Total Amount:</b></p>
                            <p className={"fs-5 my-0"}>{budget.total.amount}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col mb-2">
                            <p className={"my-0"}><b>Spent Amount:</b></p>
                            <p className={"fs-5 my-0"}>{budget.spent.amount}</p>
                        </div>
                        <div className="col mb-2">
                            <p className={"my-0"}><b>Remaining Amount:</b></p>
                            <p className={"fs-5 my-0"}>{budget.remaining.amount}</p>
                        </div>
                        {budget.avarageDailyRate && <div className="col mb-2">
                            <p className={"my-0"}><b>Avarage Daily Rate:</b></p>
                            <p className={"fs-5 my-0"}>{budget.avarageDailyRate.amount}</p>
                        </div>}
                        <div className="col mb-2">
                            <p className={"my-0"}><b>Unplannend Amount:</b></p>
                            <p className={"fs-5 my-0"}>{budget.unplanned.amount}</p>
                        </div>
                        <div className="col mb-2">
                            <p className={"my-0"}><b>Limit Amount:</b></p>
                            <p className={"fs-5 my-0"}>{budget.limit.amount}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="text-center">
                    <Button className={"m-2 text-white td-none"} onClick={onEdit}>Edit</Button>
                    <Button variant={"danger"} className={"text-white m-2"} onClick={onDelete}>Delete</Button>
                </div>
            </div>
        </div>}

    </>)
}

export default BudgetDetailsPage
