import {FIXED_PRICE, TIME_AND_MATERIAL} from "../../types/Contract";
import {useEffect} from "react";
import CreateContract from "../../types/CreateContract";
import {useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {AxiosError} from "axios";
import {RootStore} from "../../store/store";
import {createContract, updateContract} from "../../services/ContractService";
import {SubmitHandler, useForm} from "react-hook-form";

const CreateContractPage = () => {
    const currentContract = useSelector((state: RootStore) => state.contract.contract)
    const projectId = useSelector((state: RootStore) => state.project.project.id)
    const {setValue, register, handleSubmit, formState: {errors}} = useForm<CreateContract>()

    const navigate = useNavigate()

    useEffect(() => {
        if (currentContract.id) {
            setValue("budget", currentContract.budget)
            setValue("internalNumber", currentContract.internalNumber)
            setValue("name", currentContract.name)
            setValue("startDate", currentContract.startDate)
            setValue("taxRate", currentContract.taxRate!.toString())
            setValue("type", currentContract.startDate)
        }
    }, [currentContract])

    const onCreateContract: SubmitHandler<CreateContract> = data => {
        if (!projectId) {
            navigate("/selectProject")
        } else if (currentContract.id) {
            updateContract(currentContract.id, data)
                .then(() => navigate("/contracts"))
                .catch((err: AxiosError) => {
                    if (err.response?.status === 401) {
                        navigate("/login")
                    } else {
                        alert(err.message)
                    }
                })
        } else {
            createContract(projectId!, data)
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
            <form onSubmit={handleSubmit(onCreateContract)}>
                <label htmlFor={"name"}>Name</label><br/>
                <input {...register("name", {
                    required: "Please enter a name!"
                })} type={"text"} id={"name"}/><br/>
                <label htmlFor={"internalNumber"}>Id</label><br/>
                <input {...register("internalNumber", {
                    required: "Please enter an id!"
                })} type={"text"} id={"internalNumber"}/><br/>
                <label htmlFor={"startDate"}>Start date</label><br/>
                <input {...register("startDate", {
                    required: "Please select a start date!"
                })} type={"date"} id={"startDate"}/><br/>
                <label htmlFor={"type"}>Type</label><br/>
                <select {...register("type")} id={"type"}>
                    <option>{TIME_AND_MATERIAL}</option>
                    <option>{FIXED_PRICE}</option>
                </select><br/>
                <label htmlFor={"budget"}>Budget amount (net)</label><br/>
                <input {...register("budget", {
                    required: "Please enter a budget!"
                })} type={"text"} id={"budget"}/><br/>
                <label htmlFor={"taxRate"}>Tax Rate</label><br/>
                <input {...register("taxRate", {
                    required: "Please enter a tax rate!"
                })} type={"text"} id={"taxRate"}/><br/>
                <br/>
                <input type={"submit"} value={"Save"}/>
            </form>
        </div>
    )
}

export default CreateContractPage