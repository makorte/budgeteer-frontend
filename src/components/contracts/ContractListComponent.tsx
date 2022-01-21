import Contract from "../../types/Contract";
import {useDispatch} from "react-redux";
import {setContract} from "../../store/contractSlice";
import {useNavigate} from "react-router-dom";

type ContractListProps = {
    contracts: Contract[]
}

const ContractListComponent = ({contracts}: ContractListProps) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onEdit = (i: number) => {
        dispatch(setContract(contracts[i]))
        navigate("/contracts/create")
    }

    const onSelect = (i: number) => {
        dispatch(setContract(contracts[i]))
        navigate("/contracts/details")
    }

    return (
        <div>
            <h4>Contract List</h4>
            <table>
                <thead>
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
                        <td>
                            <button onClick={() => onSelect(index)}>{contract.name}</button>
                        </td>
                        <td>{contract.internalNumber}</td>
                        <td>{contract.startDate}</td>
                        <td>{contract.type}</td>
                        <td>{contract.budget.amount}</td>
                        <td>{contract.budgetSpent.amount}</td>
                        <td>{contract.budgetLeft.amount}</td>
                        <td>
                            <button onClick={() => onEdit(index)}>Edit</button>
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
                </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default ContractListComponent