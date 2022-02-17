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
                            <td><a href={"#"} className={"link-info"}
                                   onClick={() => onSelect(index)}>{contract.name}</a></td>
                            <td>{contract.internalNumber}</td>
                            <td>{contract.startDate}</td>
                            <td>{contract.type}</td>
                            <td>{contract.budget.amount}</td>
                            <td>{contract.budgetSpent.amount}</td>
                            <td>{contract.budgetLeft.amount}</td>
                            <td><i className="bi bi-pencil-square link-info cursor-pointer" onClick={() => onEdit(index)}/></td>
                            <td><i className="bi bi-trash3 link-danger cursor-pointer" onClick={() => onDelete(index)}/></td>
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