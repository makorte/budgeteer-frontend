import Contract from "../../types/Contract";
import {Link, useNavigate} from "react-router-dom";
import {deleteContract} from "../../services/ContractService";
import {Table} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {setContractsBackDestination} from "../../store/contractsBackSlice";

type Props = {
    projectId: string,
    contracts: Contract[],
    refetch: Function
}

const ContractListComponent = ({projectId, contracts, refetch}: Props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onDelete = (i: number) => deleteContract(contracts[i].id!, navigate, projectId, refetch)

    const onEdit = (contractId: number) => {
        dispatch(setContractsBackDestination(`/${projectId}/contracts`))
        navigate(`/${projectId}/contracts/update/${contractId}`)
    }

    return (
        <div data-testid={"contract-list"}>
            {contracts.length < 1 ? <p className={"fs-5"}>No contracts exist in this project!</p> :
                <Table className={"bg-white mx-auto my-4 shadow-sm mw-1200"} striped>
                    <thead className={"bg-primary text-white"}>
                    <tr>
                        <th>Name</th>
                        <th>Id</th>
                        <th>Start date</th>
                        <th>Type</th>
                        <th>Budget Total (net)</th>
                        <th>Budget Spent (net)</th>
                        <th>Budget Left (net)</th>
                        <th/>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {contracts.map((contract, index) => (
                        <tr key={index}>
                            <td><Link to={`/${projectId}/contracts/details/${contract.id}`} className={"link-info"}>{contract.name}</Link>
                            </td>
                            <td>{contract.internalNumber}</td>
                            <td>{contract.startDate}</td>
                            <td>{contract.type}</td>
                            <td>{contract.budget.amount}</td>
                            <td>{contract.budgetSpent.amount}</td>
                            <td>{contract.budgetLeft.amount}</td>
                            <td><i className="bi bi-pencil-square link-info cursor-pointer" onClick={() => onEdit(contract.id!)}/></td>
                            <td><i data-testid={`delete-btn-${contract.id}`} className="bi bi-trash3 link-danger cursor-pointer" onClick={() => onDelete(index)}/>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                    <tfoot>
                    <tr>
                        <td><b>Total</b></td>
                        <td/>
                        <td/>
                        <td/>
                        <td>
                            <b>{contracts.length > 0 && contracts.map(contract => parseInt(contract.budget.amount)).reduce((total, budget) => total + budget)}</b>
                        </td>
                        <td>
                            <b>{contracts.length > 0 && contracts.map(contract => parseInt(contract.budgetSpent.amount)).reduce((total, budget) => total + budget)}</b>
                        </td>
                        <td>
                            <b>{contracts.length > 0 && contracts.map(contract => parseInt(contract.budgetLeft.amount)).reduce((total, budget) => total + budget)}</b>
                        </td>
                        <td/>
                        <td/>
                    </tr>
                    </tfoot>
                </Table>}
        </div>
    )
}

export default ContractListComponent
