import HeaderComponent from "../ui/HeaderComponent";
import {useSelector} from "react-redux";
import {RootStore} from "../../store/store";
import {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {deleteContract} from "../../services/ContractService";
import {AxiosError} from "axios";

const ContractDetailsPage = () => {
    const contract = useSelector((state: RootStore) => state.contract.contract)
    const navigate = useNavigate()

    useEffect(() => {
        if (!contract.id) {
            navigate("/selectProject")
        }
    }, [navigate, contract.id])

    const onDelete = () => {
        deleteContract(contract.id!)
            .then(() => navigate("/contracts"))
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
            <HeaderComponent/>
            <Link to={"/contracts"}>Back</Link>
            <h3>Contract Details</h3>
            <div>
                <h4>Basic information</h4>
                <p><b>Name:</b></p>
                <p>{contract.name}</p>
                <p><b>Id:</b></p>
                <p>{contract.internalNumber}</p>
                <p><b>Type:</b></p>
                <p>{contract.type}</p>
                <p><b>Start date:</b></p>
                <p>{contract.startDate}</p>
                <p><b>Budget:</b></p>
                <p>{contract.budget.amount}</p>
            </div>
            <div>
                <h4>Options</h4>
                <Link to={"/contracts/create"}>Edit</Link><br/>
                <button onClick={onDelete}>Delete</button>
            </div>
        </div>
    );
}

export default ContractDetailsPage