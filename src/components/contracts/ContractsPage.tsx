import {useEffect, useState} from "react";
import Contract from "../../types/Contract";
import HeaderComponent from "../ui/HeaderComponent";
import {useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {getContracts} from "../../services/ContractService";
import {AxiosError, AxiosResponse} from "axios";
import ContractListComponent from "./ContractListComponent";
import {RootStore} from "../../store/store";
import {Button} from "react-bootstrap";

const ContractsPage = () => {
    const projectId = useSelector((state: RootStore) => state.project.project.id)
    const [contracts, setContracts] = useState<Contract[]>([])

    const navigate = useNavigate()

    useEffect(() => {
        if (!projectId) {
            navigate("/selectProject")
        } else {
            getContracts(projectId!)
                .then((res: AxiosResponse<Contract[]>) => setContracts(res.data))
                .catch((err: AxiosError) => {
                    if (err.response?.status === 401) {
                        navigate("/login")
                    } else {
                        alert(err.message)
                    }
                })
        }
    }, [navigate, projectId])

    return (
        <div>
            <HeaderComponent/>
            <div className={"bg-white p-3 shadow"}>
                <h3>Contracts</h3>
            </div>
            <div className={"text-center m-4"}>
                <ContractListComponent contracts={contracts} setContracts={setContracts}/>
            </div>
            <div className={"text-center"}>
                <Button><Link to={"/contracts/create/" /* TODO navigation wont because it parses "create" as the URL param */} className={"text-white td-none"}>Create
                    Contract</Link></Button>
            </div>
        </div>
    )
}

export default ContractsPage