import React from "react";
import Contract from "../../../types/Contract";

type Props = {
    contract: Contract;
};

const ContractDetailsComponent = ({contract}: Props) => {
    return (
        <div className={"col container bg-white m-4 p-4"}>
            <h3>Details</h3>
            <div className="row">
                <div className={"col mb-2"}>
                    <p className={"my-0"}><b>Name:</b></p>
                    <p className={"fs-5 my-0"}>{contract.name}</p>
                </div>
                <div className={"col mb-2"}>
                    <p className={"my-0"}><b>Id:</b></p>
                    <p className={"fs-5 my-0"}>{contract.internalNumber}</p>
                </div>
                <div className={"col mb-2"}>
                    <p className={"my-0"}><b>Type:</b></p>
                    <p className={"fs-5 my-0"}>{contract.type}</p>
                </div>
                <div className={"col mb-2"} style={{minWidth: "130px"}}>
                    <p className={"my-0"}><b>Start date:</b></p>
                    <p className={"fs-5 my-0"}>{contract.startDate}</p>
                </div>
                <div className={"col mb-2"}>
                    <p className={"my-0"}><b>Budget:</b></p>
                    <p className={"fs-5 my-0"}>{contract.budget.amount}</p>
                </div>
            </div>
        </div>
    )
}

export default ContractDetailsComponent
