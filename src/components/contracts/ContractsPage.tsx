import HeaderComponent from "../ui/HeaderComponent";
import {Link, useParams} from "react-router-dom";
import ContractListComponent from "./ContractListComponent";
import {Button} from "react-bootstrap";
import useGet from "../../services/useGet";
import SpinnerComponent from "../ui/SpinnerComponent";
import Contract from "../../types/Contract";
import useDestination from "../../services/useDestination";

const ContractsPage = () => {
    const {projectId} = useParams()
    const {data: contracts, loading, refetch} = useGet<Contract[]>(`/contracts?projectId=${projectId}`, [], "/selectProject")

    useDestination()

    return (
        <div>
            <HeaderComponent/>
            <div className={"bg-white p-3 shadow"}>
                <h3>Contracts</h3>
            </div>
            {loading ? <SpinnerComponent/> : <>
                <div className={"text-center m-4"}>
                    <ContractListComponent projectId={projectId!} contracts={contracts} refetch={refetch}/>
                </div>
                <div className={"text-center"}>
                    <Button><Link to={`/${projectId}/contracts/create`} className={"text-white td-none"}>Create
                        Contract</Link></Button>
                </div>
            </>}
        </div>
    )
}

export default ContractsPage
