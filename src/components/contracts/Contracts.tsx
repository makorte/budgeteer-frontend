import {useEffect, useState} from "react";
import Contract from "../../types/Contract";
import Header from "../ui/Header";
import {useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {getContracts} from "../../services/ContractService";
import {AxiosError, AxiosResponse} from "axios";
import ContractList from "./ContractList";
import {RootStore} from "../../store/store";

const Contracts = () => {
    const projectId = useSelector((state: RootStore) => state.project.project.id)

    const navigate = useNavigate()

    const [contracts, setContracts] = useState<Contract[]>([])

    useEffect(() => {
        if(!projectId) navigate("/selectProject")

        getContracts(projectId!)
            .then((res: AxiosResponse) => setContracts(res.data))
            .catch((err: AxiosError) => {
                if(err.response?.status === 401){
                    return navigate("/login")
                }

                alert(err.message)
            })
    }, [navigate, projectId])

    return (
        <div>
            <Header/>
            <h3>Contracts</h3>
            <ContractList contracts={contracts}/>
            <div>
                <h4>Options</h4>
                <Link to={"/contracts/create"}>Create Contract</Link>
            </div>
        </div>
    )
}

export default Contracts