import Contract from "../../types/Contract";
import {useDispatch} from "react-redux";
import {setContract} from "../../store/contractSlice";
import {useNavigate} from "react-router-dom";
import {deleteContract} from "../../services/ContractService";
import {AxiosError} from "axios";

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
            {contracts.length < 1 ? <p className={"text-lg"}>No contracts exist in this project!</p> :
                <table className={"divide-y divide-gray-200 m-5 shadow-md"}>
                    <thead className={"bg-emerald-600"}>
                    <tr>
                        <th scope={"col"}
                            className="c-table-head-item">Name
                        </th>
                        <th scope={"col"}
                            className="c-table-head-item">Id
                        </th>
                        <th scope={"col"}
                            className="c-table-head-item">Start
                            date
                        </th>
                        <th scope={"col"}
                            className="c-table-head-item">Type
                        </th>
                        <th scope={"col"}
                            className="c-table-head-item">Budget
                            Total (net)
                        </th>
                        <th scope={"col"}
                            className="c-table-head-item">Budget
                            Spent (net)
                        </th>
                        <th scope={"col"}
                            className="c-table-head-item">Budget
                            Left (net)
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Edit</span>
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Delete</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {contracts.map((contract, index) => (
                        <tr key={index}>
                            <td className="c-td-wrapper">
                                <p className="c-link cursor-pointer" onClick={() => onSelect(index)}>{contract.name}</p>
                            </td>
                            <td className={"c-td-wrapper"}>
                                <div className="c-td-inner">{contract.internalNumber}</div>
                            </td>
                            <td className={"c-td-wrapper"}>
                                <div className="c-td-inner">{contract.startDate}</div>
                            </td>
                            <td className={"c-td-wrapper"}>
                                <div className="c-td-inner">
                                    {contract.type}
                                </div>
                            </td>
                            <td className={"c-td-wrapper"}>
                                <div className="c-td-inner">
                                    {contract.budget.amount}
                                </div>
                            </td>
                            <td className={"c-td-wrapper"}>
                                <div className="c-td-inner">
                                    {contract.budgetSpent.amount}
                                </div>
                            </td>
                            <td className={"c-td-wrapper"}>
                                <div className="c-td-inner">
                                    {contract.budgetLeft.amount}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <svg onClick={() => onEdit(index)} xmlns="http://www.w3.org/2000/svg"
                                     className="h-6 w-6 c-link cursor-pointer" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                </svg>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <svg onClick={() => onDelete(index)} xmlns="http://www.w3.org/2000/svg"
                                     className="h-6 w-6 c-link cursor-pointer text-red-600 hover:text-red-900"
                                     fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                </svg>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                    <tfoot className="bg-white divide-y divide-gray-200">
                    <tr className={"font-bold"}>
                        <td className="c-td-wrapper">
                            <div className="c-td-inner">Total</div>
                        </td>
                        <td/>
                        <td/>
                        <td/>
                        <td className="c-td-wrapper">
                            <div
                                className="c-td-inner">{contracts.length > 0 && contracts.map(contract => parseInt(contract.budget.amount)).reduce((total, budget) => total + budget)}</div>
                        </td>
                        <td className="c-td-wrapper">
                            <div
                                className="c-td-inner">{contracts.length > 0 && contracts.map(contract => parseInt(contract.budgetSpent.amount)).reduce((total, budget) => total + budget)}</div>
                        </td>
                        <td className="c-td-wrapper">
                            <div
                                className="c-td-inner">{contracts.length > 0 && contracts.map(contract => parseInt(contract.budgetLeft.amount)).reduce((total, budget) => total + budget)}</div>
                        </td>
                        <td/>
                        <td/>
                    </tr>
                    </tfoot>
                </table>}
        </div>
    )
}

export default ContractListComponent