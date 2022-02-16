import Contract from "../../types/Contract";
import {useDispatch} from "react-redux";
import {setContract} from "../../store/contractSlice";
import {useNavigate} from "react-router-dom";
import {deleteContract} from "../../services/ContractService";
import {AxiosError} from "axios";
import {Table} from "react-bootstrap";

type ContractListProps = {
    contracts: Contract[],
    setContracts: Function
}

const ContractListComponent = ({contracts, setContracts}: ContractListProps) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSelect = (i: number) => {
        dispatch(setContract(contracts[i]))
        navigate("/contracts/details")
    }

    const onEdit = (i: number) => {
        dispatch(setContract(contracts[i]))
        navigate("/contracts/create")
    }

    const onDelete = (i: number) => {
        deleteContract(contracts[i].id!)
            .then(() => setContracts(contracts.filter((_, index) => i !== index)))
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
            {contracts.length < 1 ? <p className={"fs-5"}>No contracts exist in this project!</p> :
                <Table className={"bg-white mx-auto my-4 shadow-sm"} striped style={{"maxWidth": "1200px"}}>
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
                            <td><a href={"#"} className={"link-info"}
                                   onClick={() => onSelect(index)}>{contract.name}</a></td>
                            <td>{contract.internalNumber}</td>
                            <td>{contract.startDate}</td>
                            <td>{contract.type}</td>
                            <td>{contract.budget.amount}</td>
                            <td>{contract.budgetSpent.amount}</td>
                            <td>{contract.budgetLeft.amount}</td>
                            <td><a href={"#"} className={"link-info"} onClick={() => onEdit(index)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path
                                        d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path
                                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                </svg>
                            </a></td>
                            <td><a href={"#"} className={"link-danger"} onClick={() => onDelete(index)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-trash3" viewBox="0 0 16 16">
                                    <path
                                        d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                                </svg>
                            </a></td>
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