import {FIXED_PRICE, TIME_AND_MATERIAL} from "../../types/Contract";
import {FormEvent, useEffect, useState} from "react";
import CreateContract from "../../types/CreateContract";
import {useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {AxiosError} from "axios";
import {RootStore} from "../../store/store";
import {createContract, updateContract} from "../../services/ContractService";

const CreateContractPage = () => {
    const currentContract = useSelector((state: RootStore) => state.contract.contract)
    const projectId = useSelector((state: RootStore) => state.project.project.id)
    const [createdContract, setCreatedContract] = useState<CreateContract>({
        budget: {amount: "0", currencyCode: "EUR"},
        internalNumber: "",
        name: "",
        startDate: "",
        taxRate: "0",
        type: TIME_AND_MATERIAL
    })

    const navigate = useNavigate()

    useEffect(() => {
        if (currentContract.id) {
            setCreatedContract({
                budget: currentContract.budget,
                internalNumber: currentContract.internalNumber,
                name: currentContract.name,
                startDate: currentContract.startDate,
                taxRate: currentContract.taxRate!.toString(),
                type: currentContract.type
            })
        }
    }, [currentContract])

    const onCreateContract = (e: FormEvent) => {
        e.preventDefault()

        if (!projectId) {
            navigate("/selectProject")
        } else if (createdContract.type === "" || createdContract.type === undefined) {
            alert("Please select type!")
        } else if (currentContract.id) {
            updateContract(currentContract.id, createdContract)
                .then(() => navigate("/contracts"))
                .catch((err: AxiosError) => {
                    if (err.response?.status === 401) {
                        navigate("/login")
                    } else {
                        alert(err.message)
                    }
                })
        } else {
            createContract(projectId!, createdContract)
                .then(() => navigate("/contracts"))
                .catch((err: AxiosError) => {
                    if (err.response?.status === 401) {
                        navigate("/login")
                    } else {
                        alert(err.message)
                    }
                })
        }
    }

    return (
        <div>
            <Link to={"/contracts"}>Back</Link>
            <h3>Create Contract</h3>
            <form onSubmit={onCreateContract}>
                <label htmlFor={"name"}>Name</label><br/>
                <input type={"text"} id={"name"}
                       onChange={e => setCreatedContract({...createdContract, name: e.target.value})} value={createdContract.name}/><br/>
                <label htmlFor={"internalNumber"}>Id</label><br/>
                <input type={"text"} id={"internalNumber"}
                       onChange={e => setCreatedContract({...createdContract, internalNumber: e.target.value})} value={createdContract.internalNumber}/><br/>
                <label htmlFor={"startDate"}>Start date</label><br/>
                <input type={"date"} id={"startDate"}
                       onChange={e => setCreatedContract({...createdContract, startDate: e.target.value})} value={createdContract.startDate}/><br/>
                <label htmlFor={"type"}>Type</label><br/>
                <select id={"type"} onChange={e => setCreatedContract({...createdContract, type: e.target.value})} value={createdContract.type}>
                    <option>{TIME_AND_MATERIAL}</option>
                    <option>{FIXED_PRICE}</option>
                </select><br/>
                <label htmlFor={"budget"}>Budget amount (net)</label><br/>
                <input type={"text"} id={"budget"} onChange={e => setCreatedContract({
                    ...createdContract,
                    budget: {amount: e.target.value, currencyCode: "EUR"}
                })} value={createdContract.budget.amount}/><br/>
                <label htmlFor={"taxRate"}>Tax Rate</label><br/>
                <input type={"text"} id={"taxRate"}
                       onChange={e => setCreatedContract({...createdContract, taxRate: e.target.value})} value={createdContract.taxRate}/><br/>
                <br/>
                <input type={"submit"} value={"Save"}/>
            </form>
        </div>
    )
}

export default CreateContractPage