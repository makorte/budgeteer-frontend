import {useEffect, useState} from "react";
import Contract from "../../types/Contract";
import HeaderComponent from "../ui/HeaderComponent";
import {Link, useNavigate, useParams} from "react-router-dom";
import {getContracts} from "../../services/ContractService";
import {AxiosError, AxiosResponse} from "axios";
import ContractListComponent from "./ContractListComponent";
import {Button} from "react-bootstrap";

const ContractsPage = () => {
    const {projectId} = useParams()
    const [contracts, setContracts] = useState<Contract[]>([])

    const navigate = useNavigate()

    useEffect(() => {
        if (!projectId) {
            navigate("/selectProject")
        } else {
            getContracts(parseInt(projectId))
                .then((res: AxiosResponse<Contract[]>) => setContracts(res.data))
                .catch((err: AxiosError) => {
                    if (err.response?.status === 401) {
                        navigate("/login")
                    } else if (err.response?.status === 400 || err.response?.status === 403){
                        navigate("/selectProject")
                    } else {
                        alert(err.message)
                    }
                })
        }
    }, [navigate])

    return (
        <div>
            <HeaderComponent/>
            <div className={"bg-white p-3 shadow"}>
                <h3>Contracts</h3>
            </div>
            <div className={"text-center m-4"}>
                <ContractListComponent projectId={projectId!} contracts={contracts} setContracts={setContracts}/>
            </div>
            <div className={"text-center"}>
                <Button><Link to={`/${projectId}/contracts/create`} className={"text-white td-none"}>Create
                    Contract</Link></Button>
            </div>
        </div>
    )
}

export default ContractsPage
