import React, {useEffect} from "react";
import useGet from "../../../../services/useGet";
import Invoice from "../../../../types/Invoice";
import {Button, Table} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {deleteInvoice} from "../../../../services/InvoiceService";

type Props = {
    projectId: string;
    contractId: string;
    refetch: Function;
}

const InvoicesComponent = ({projectId, contractId, refetch}: Props) => {
    const {data: invoices, loading} = useGet<Invoice[]>(`/invoices/byContract/${contractId}`, [], "/selectProject");
    const navigate = useNavigate()

    useEffect(() => {
        if (!loading) console.log(invoices)
    })

    const onEdit = (invoiceId: number) => navigate(`/${projectId}/contracts/details/${contractId}/updateInvoice/${invoiceId}`)

    const onDelete = (invoiceId: number) => deleteInvoice(projectId, contractId, invoiceId.toString(), navigate, refetch)

    return (
        <div className="container bg-white contract-invoices m-3 p-4">
            <h2>Invoices</h2>
            <div className="text-center">
                <Table className={"bg-white mx-auto my-4 shadow-sm mw-1200"} striped>
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
                            <td><Link to={"#"} className={"link-info"}>{invoice.internalNumber}</Link></td>
                            <td>{invoice.invoiceName}</td>
                            <td>{invoice.amountOwed.amount}</td>
                            <td>{invoice.yearMonth}</td>
                            <td><i onClick={() => onEdit(invoice.invoiceId)} className="bi bi-pencil-square link-info cursor-pointer"/></td>
                            <td><i onClick={() => onDelete(invoice.invoiceId)} className="bi bi-trash3 link-danger cursor-pointer"/></td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                <Button variant={"primary"} className={"text-white m-2"}><Link
                    to={`/${projectId}/contracts/details/${contractId}/createInvoice`} className={"text-white td-none"}>Create
                    Invoice</Link></Button>
            </div>
        </div>
    )
}

export default InvoicesComponent
