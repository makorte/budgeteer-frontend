import {useEffect, useState} from "react";
import Contract from "../../types/Contract";
import HeaderComponent from "../ui/HeaderComponent";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {getContracts} from "../../services/ContractService";
import {AxiosError, AxiosResponse} from "axios";
import ContractListComponent from "./ContractListComponent";
import {RootStore} from "../../store/store";
import {initialState, setContract} from "../../store/contractSlice";

const ContractsPage = () => {
    const projectId = useSelector((state: RootStore) => state.project.project.id)
    const [contracts, setContracts] = useState<Contract[]>([])

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(setContract(initialState.contract))

        if (!projectId) {
            navigate("/selectProject")
        } else {
            getContracts(projectId!)
                .then((res: AxiosResponse) => setContracts(res.data))
                .catch((err: AxiosError) => {
                    if (err.response?.status === 401) {
                        navigate("/login")
                    } else {
                        alert(err.message)
                    }
                })
        }
    }, [navigate, projectId, dispatch])

    return (
        <div className={"w-full h-full"}>
            <HeaderComponent/>
            <div className={"c-header"}>
                <h3>Contracts</h3>
            </div>
            <div className={"c-flex-middle p-4"}>
                <ContractListComponent contracts={contracts} setContracts={setContracts}/>
            </div>
            <div className={"c-flex-middle"}>
                <Link to={"/contracts/create"} className={"c-button mb-5"}>Create Contract</Link>
            </div>
        </div>
    )
}

export default ContractsPage