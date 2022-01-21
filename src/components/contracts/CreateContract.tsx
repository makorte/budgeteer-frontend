import {TIME_AND_MATERIAL, FIXED_PRICE} from "../../types/Contract";
import {FormEvent, useEffect, useState} from "react";
import CreateContractType from "../../types/CreateContractType";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {AxiosError} from "axios";
import {RootStore} from "../../store/store";
import {setContract} from "../../store/contractSlice";
import {initialState} from "../../store/contractSlice";
import {createContract, updateContract} from "../../services/ContractService";

const CreateContract = () => {
    const currentContract = useSelector((state: RootStore) => state.contract.contract)
    const projectId = useSelector((state: RootStore) => state.project.project.id)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [createdContract, setCreatedContract] = useState<CreateContractType>({
        budget: {amount: "", currencyCode: "EUR"},
        internalNumber: "",
        name: "",
        startDate: "",
        taxRate: undefined,
        type: undefined
    })

    useEffect(() => {
        if(!projectId) {
            navigate("/selectProject")
        }

        if (currentContract.id) {
            setCreatedContract(currentContract)
        }

        return () => {
            dispatch(setContract(initialState.contract))
        }
    }, [currentContract, dispatch, navigate, projectId])

    const onCreateContract = (e: FormEvent) => {
        e.preventDefault()

        if (!projectId) {
            navigate("/selectProject")
        }

        if (createdContract.type === "" || createdContract.type === undefined) {
            return alert("Please select type!")
        }

        if(currentContract.id) {
            return updateContract(currentContract.id, createdContract)
                .then(() => navigate("/contracts"))
                .catch((err: AxiosError) => alert(err.message))
        }

        createContract(projectId!, createdContract)
            .then(() => navigate("/contracts"))
            .catch((err: AxiosError) => alert(err.message))
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
                    <option value={""}/>
                    <option value={TIME_AND_MATERIAL}>Time and material</option>
                    <option value={FIXED_PRICE}>Fixed price</option>
                </select><br/>
                <label htmlFor={"budget"}>Budget amount (net)</label><br/>
                <input type={"number"} name={"budget"} id={"budget"} onChange={e => {
                    setCreatedContract({...createdContract, budget: {...createdContract.budget, amount: e.target.value}})
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

export default CreateContract