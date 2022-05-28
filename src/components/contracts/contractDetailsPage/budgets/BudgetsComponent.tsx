import useGet from "../../../../services/useGet";
import Budget from "../../../../types/Budget";
import SpinnerComponent from "../../../ui/SpinnerComponent";
import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {budgetDetailsLink, createBudgetLink, updateBudgetLink} from "../../../../services/NavigationService";
import {Button, Table} from "react-bootstrap";
import {deleteBudget} from "../../../../services/BudgetService";

type Props = {
    projectId: string,
    contractId: string
}

const BudgetsComponent = ({projectId, contractId}: Props) => {
    const {
        data: budgets,
        loading,
        refetch
    } = useGet<Budget[]>(`/budgets/byContract?contractId=${contractId}`, [], "/selectProject");
    const navigate = useNavigate()

    const onEdit = (budgetId: number) => navigate(updateBudgetLink(projectId, contractId, budgetId))

    const onDelete = (budgetId: number) => deleteBudget(projectId, contractId, budgetId.toString(), navigate, refetch)

    return (<div className="col container bg-white m-4 p-4">
        <h2>Budgets</h2>
        {loading ? <SpinnerComponent/> : <div className={"text-center"} data-testid={"budgets-wrapper"}>
            {budgets.length < 1 ? <p className={"fs-5"}>No budgets exist in this contract!</p> :
                <Table className={"bg-white mx-auto my-4 shadow-sm mw-1200"} striped data-testid={"budgets-list"}>
                    <thead className={"bg-primary text-white"}>
                    <tr>
                        <th>Name</th>
                        <th>Total</th>
                        <th>Remaining</th>
                        <th/>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {budgets.map((budget, index) => (
                        <tr key={index}>
                            <td><Link to={budgetDetailsLink(projectId, contractId, budget.id!)}>{budget.name}</Link>
                            </td>
                            <td>{budget.total.amount}</td>
                            <td>{budget.remaining.amount}</td>
                            <td><i onClick={() => onEdit(budget.id!)}
                                   className="bi bi-pencil-square link-info cursor-pointer"/></td>
                            <td><i data-testid={`delete-btn-${budget.id}`} onClick={() => onDelete(budget.id!)}
                                   className="bi bi-trash3 link-danger cursor-pointer"/></td>
                        </tr>
                    ))}
                    </tbody>
                </Table>}

            <Button variant={"primary"} className={"text-white m-2"}><Link
                to={createBudgetLink(projectId, contractId)}
                className={"text-white td-none"}>Create
                Budget</Link></Button>
        </div>}
    </div>)
}

export default BudgetsComponent
