import HeaderComponent from "../../../ui/HeaderComponent";
import SpinnerComponent from "../../../ui/SpinnerComponent";
import React from "react";
import useGet from "../../../../services/useGet";
import Invoice from "../../../../types/Invoice";
import {useNavigate, useParams} from "react-router-dom";
import {Button} from "react-bootstrap";
import {deleteInvoice} from "../../../../services/InvoiceService";
import {useDispatch} from "react-redux";
import {setInvoiceBackDestination} from "../../../../store/invoiceBackSlice";

const InvoiceDetailsPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {projectId, contractId, invoiceId} = useParams()
    const {data: invoice, loading, refetch} = useGet<Invoice>(`/invoices/${invoiceId}`, {
        invoiceId: undefined,
        invoiceName: "",
        contractId: undefined,
        contractName: "",
        amountOwed: {
            currencyCode: "EUR",
            amount: ""
        },
        taxRate: undefined,
        internalNumber: "",
        yearMonth: "",
        paidDate: "",
        dueDate: ""
    }, `/${projectId}/contracts/details/${contractId}`)

    const onBack = () => {
        navigate(`/${projectId}/contracts/details/${contractId}`)
    }

    const onEdit = () => {
        dispatch(setInvoiceBackDestination(`/${projectId}/contracts/details/${contractId}/invoices/details/${invoiceId}`))
        navigate(`/${projectId}/contracts/details/${contractId}/invoices/update/${invoiceId}`)
    }

    const onDelete = () => {
        deleteInvoice(projectId!, contractId!, invoiceId!, navigate, refetch)
    }

    return (
        <>
            <HeaderComponent/>
            <div className={"bg-white p-3 shadow d-flex justify-content-between"}>
                <h3>Invoice</h3>
            </div>
            <span onClick={onBack}
                  className={"back-btn m-2 d-inline-flex justify-content-center align-items-center fs-5 td-none"}>
                <i className="bi bi-arrow-left mx-2"/>
                Back
            </span>
            {loading ? <SpinnerComponent/> : <div>
                <div data-testid={"details-wrapper"} className={"bg-white m-3 p-4"}>
                    <h3>Details</h3>
                    <div className={"mb-2"}>
                        <p className={"my-0"}><b>Name:</b></p>
                        <p className={"fs-5 my-0"}>{invoice.invoiceName}</p>
                    </div>
                    <div className={"mb-2"}>
                        <p className={"my-0"}><b>Id:</b></p>
                        <p className={"fs-5 my-0"}>{invoice.internalNumber}</p>
                    </div>
                    <div className={"mb-2"}>
                        <p className={"my-0"}><b>Contract:</b></p>
                        <p className={"fs-5 my-0"}>{invoice.contractName}</p>
                    </div>
                    <div className={"mb-2"}>
                        <p className={"my-0"}><b>Amount:</b></p>
                        <p className={"fs-5 my-0"}>{invoice.amountOwed.amount}</p>
                    </div>
                    <div className={"mb-2"}>
                        <p className={"my-0"}><b>Year, Month:</b></p>
                        <p className={"fs-5 my-0"}>{invoice.yearMonth}</p>
                    </div>
                    <div className={"mb-2"}>
                        <p className={"my-0"}><b>paid Date:</b></p>
                        <p className={"fs-5 my-0"}>{invoice.paidDate}</p>
                    </div>
                    <div className={"mb-2"}>
                        <p className={"my-0"}><b>due Date:</b></p>
                        <p className={"fs-5 my-0"}>{invoice.dueDate}</p>
                    </div>
                </div>
                <div className={"text-center"}>
                    <Button className={"m-2 text-white td-none"} onClick={onEdit}>Edit</Button>
                    <Button variant={"danger"} className={"text-white m-2"} onClick={onDelete}>Delete</Button>
                </div>
            </div>}
        </>
    );
}

export default InvoiceDetailsPage;
