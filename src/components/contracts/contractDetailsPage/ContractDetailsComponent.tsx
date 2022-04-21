import React from "react";
import Contract from "../../../types/Contract";

type Props = {
    contract: Contract;
};

const ContractDetailsComponent = ({contract}: Props) => {
    return (
        <div className={"container bg-white contract-invoices m-3 p-4"}>
            <h3>Details</h3>
            <div className={"mb-2"}>
                <p className={"my-0"}><b>Name:</b></p>
                <p className={"fs-5 my-0"}>{contract.name}</p>
            </div>
            <div className={"mb-2"}>
                <p className={"my-0"}><b>Id:</b></p>
                <p className={"fs-5 my-0"}>{contract.internalNumber}</p>
            </div>
            <div className={"mb-2"}>
                <p className={"my-0"}><b>Type:</b></p>
                <p className={"fs-5 my-0"}>{contract.type}</p>
            </div>
            <div className={"mb-2"}>
                <p className={"my-0"}><b>Start date:</b></p>
                <p className={"fs-5 my-0"}>{contract.startDate}</p>
            </div>
            <div className={"mb-2"}>
                <p className={"my-0"}><b>Budget:</b></p>
                <p className={"fs-5 my-0"}>{contract.budget.amount}</p>
            </div>
        </div>
    )
}

export default ContractDetailsComponent
