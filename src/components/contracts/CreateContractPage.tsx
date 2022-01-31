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
        taxRate: 0,
        type: TIME_AND_MATERIAL
    })

    const navigate = useNavigate()

    useEffect(() => {
        if (!projectId) {
            navigate("/selectProject")
        } else if (currentContract.id) {
            setCreatedContract(currentContract)
        }
    }, [currentContract, navigate, projectId])

    const onCreateContract = (e: FormEvent) => {
        e.preventDefault()

        if (!projectId) {
            navigate("/selectProject")
        } else if (createdContract.type === "" || createdContract.type === undefined) {
            alert("Please select type!")
        } else if (currentContract.id) {
            updateContract(currentContract.id, createdContract)
                .then(() => navigate("/contracts"))
                .catch((err: AxiosError) => alert(err.message))
        } else {
            createContract(projectId!, createdContract)
                .then(() => navigate("/contracts"))
                .catch((err: AxiosError) => alert(err.message))
        }
    }

    return (
        <div>
            <Link to={"/contracts"}>Back</Link>
            <h3>Create Contract</h3>
            <form onSubmit={onCreateContract}>
                <label htmlFor={"name"}>Name</label><br/>
                <input type={"text"} name={"name"} id={"name"}
                       onChange={e => setCreatedContract({...createdContract, name: e.target.value})}
                       value={createdContract.name}/><br/>
                <label htmlFor={"internalNumber"}>Id</label><br/>
                <input type={"text"} name={"internalNumber"} id={"internalNumber"}
                       onChange={e => setCreatedContract({...createdContract, internalNumber: e.target.value})}
                       value={createdContract.internalNumber}/><br/>
                <label htmlFor={"startDate"}>Start date</label><br/>
                <input type={"date"} name={"startDate"} id={"startDate"}
                       onChange={e => setCreatedContract({...createdContract, startDate: e.target.value})}
                       value={createdContract.startDate}/><br/>
                <label htmlFor={"type"}>Type</label><br/>
                <select name={"type"} id={"type"}
                        onChange={e => setCreatedContract({...createdContract, type: e.target.value})}
                        value={createdContract.type}>
                    <option value={TIME_AND_MATERIAL}>Time and material</option>
                    <option value={FIXED_PRICE}>Fixed price</option>
                </select><br/>
                <label htmlFor={"budget"}>Budget amount (net)</label><br/>
                <input type={"number"} name={"budget"} id={"budget"} onChange={e => {
                    setCreatedContract({
                        ...createdContract,
                        budget: {...createdContract.budget, amount: e.target.value}
                    })
                }} value={createdContract.budget.amount}/><br/>
                <label htmlFor={"taxRate"}>Tax Rate</label><br/>
                <input type={"number"} name={"taxRate"} id={"taxRate"}
                       onChange={e => setCreatedContract({...createdContract, taxRate: parseInt(e.target.value)})}
                       value={createdContract.taxRate}/><br/>
                <br/>
                <input type={"submit"} value={"Save"}/>
            </form>
        </div>
    )
}

export default CreateContractPage