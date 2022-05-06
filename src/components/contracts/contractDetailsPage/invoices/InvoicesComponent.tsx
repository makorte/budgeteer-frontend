import React from "react";
import useGet from "../../../../services/useGet";
import Invoice from "../../../../types/Invoice";
import {Button, Table} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {deleteInvoice} from "../../../../services/InvoiceService";
import SpinnerComponent from "../../../ui/SpinnerComponent";
import {createInvoiceLink, invoiceDetailsLink, updateInvoiceLink} from "../../../../services/NavigationService";

type Props = {
    projectId: string;
    contractId: string;
}

const InvoicesComponent = ({projectId, contractId}: Props) => {
    const {data: invoices, loading, refetch} = useGet<Invoice[]>(`/invoices/byContract/${contractId}`, [], "/selectProject");
    const navigate = useNavigate()

    const onEdit = (invoiceId: number) => navigate(updateInvoiceLink(projectId, contractId, invoiceId))

    const onDelete = (invoiceId: number) => deleteInvoice(projectId, contractId, invoiceId.toString(), navigate, refetch)

    return (
        <div className="container bg-white contract-invoices m-3 p-4">
            <h2>Invoices</h2>
            {loading ? <SpinnerComponent/> : <div data-testid={"invoices-wrapper"} className="text-center">
                {invoices.length < 1 ? <p className={"fs-5"}>No invoices exist in this contract!</p> :
                    <Table data-testid={"invoices-list"} className={"bg-white mx-auto my-4 shadow-sm mw-1200"} striped>
                        <thead className={"bg-primary text-white"}>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Year, Month</th>
                            <th/>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        {invoices.map((invoice, index) => (
                            <tr key={index}>
                                <td><Link
                                    to={invoiceDetailsLink(projectId, contractId, invoice.invoiceId!)}
                                    className={"link-info"}>{invoice.internalNumber}</Link></td>
                                <td>{invoice.invoiceName}</td>
                                <td>{invoice.amountOwed.amount}</td>
                                <td>{invoice.yearMonth}</td>
                                <td><i onClick={() => onEdit(invoice.invoiceId!)}
                                       className="bi bi-pencil-square link-info cursor-pointer" data-testid={`edit-btn-${invoice.invoiceId}`}/></td>
                                <td><i onClick={() => onDelete(invoice.invoiceId!)}
                                       className="bi bi-trash3 link-danger cursor-pointer" data-testid={`delete-btn-${invoice.invoiceId}`}/></td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>}

                <Button variant={"primary"} className={"text-white m-2"}><Link
                    to={createInvoiceLink(projectId, contractId)}
                    className={"text-white td-none"}>Create
                    Invoice</Link></Button>
            </div>}

        </div>
    )
}

export default InvoicesComponent
