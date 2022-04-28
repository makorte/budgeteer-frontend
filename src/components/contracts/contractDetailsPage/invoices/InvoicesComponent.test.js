import useGet from "../../../../services/useGet";
import {act} from "react-dom/test-utils";
import InvoicesComponent from "./InvoicesComponent";
import {fireEvent, render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import {deleteInvoice} from "../../../../services/InvoiceService";

jest.mock("../../../../services/useGet", () => {
    return jest.fn()
})

jest.mock("../../../../services/InvoiceService", () => ({
    updateInvoice: jest.fn(),
    deleteInvoice: jest.fn()
}))

describe("InvoicesComponent", () => {
    const invoices = [
        {
            invoiceId: 1,
            invoiceName: "invoice1",
            contractId: 1,
            contractName: "contract1",
            amountOwed: {
                currencyCode: "EUR",
                amount: "20000"
            },
            taxRate: 17.5,
            internalNumber: "i1",
            yearMonth: "2020-12",
            paidDate: "2020-12-01",
            dueDate: "2022-12-01"
        }, {
            invoiceId: 2,
            invoiceName: "invoice2",
            contractId: 1,
            contractName: "contract1",
            amountOwed: {
                currencyCode: "EUR",
                amount: "20000"
            },
            taxRate: 17.5,
            internalNumber: "i2",
            yearMonth: "2020-12",
            paidDate: "2020-12-01",
            dueDate: "2022-12-01"
        },
    ]
    const projectId = "1"
    const contractId = "2"

    test("renders only loading spinner if only loading is set", async () => {
        useGet.mockImplementation(() => ({
            data: [],
            loading: true,
            refetch: jest.fn()
        }))

        await act(async () => {
            await render(<MemoryRouter><InvoicesComponent projectId={projectId}
                                                          contractId={contractId}/></MemoryRouter>)
        })

        expect(screen.getByTestId("spinner")).toBeInTheDocument()
        expect(screen.queryByTestId("invoices-wrapper")).not.toBeInTheDocument()
    })

    test("renders only loading spinner if loading and invoices are set", async () => {
        useGet.mockImplementation(() => ({
            data: invoices,
            loading: true,
            refetch: jest.fn()
        }))

        await act(async () => {
            await render(<MemoryRouter><InvoicesComponent projectId={projectId}
                                                          contractId={contractId}></InvoicesComponent></MemoryRouter>)
        })

        expect(screen.getByTestId("spinner")).toBeInTheDocument()
        expect(screen.queryByTestId("invoices-wrapper")).not.toBeInTheDocument()
    })

    test("renders invoices list if only invoices is set and not empty", async () => {
        useGet.mockImplementation(() => ({
            data: invoices,
            loading: false,
            refetch: jest.fn()
        }))

        await act(async () => {
            await render(<MemoryRouter><InvoicesComponent projectId={projectId}
                                                          contractId={contractId}></InvoicesComponent></MemoryRouter>)
        })

        expect(screen.queryByTestId("invoices-list")).toBeInTheDocument()
        expect(screen.queryByText(invoices[0].invoiceName)).toBeInTheDocument()
        expect(screen.queryByText(invoices[1].invoiceName)).toBeInTheDocument()
    })

    test("renders message if invoices is empty", async () => {
        useGet.mockImplementation(() => ({
            data: [],
            loading: false,
            refetch: jest.fn()
        }))

        await act(async () => {
            await render(<MemoryRouter><InvoicesComponent projectId={projectId}
                                                          contractId={contractId}></InvoicesComponent></MemoryRouter>)
        })

        expect(screen.getByText("No invoices exist in this contract!")).toBeInTheDocument()
    })

    test("calls onDelete if delete button is clicked", async () => {
        useGet.mockImplementation(() => ({
            data: invoices,
            loading: false,
            refetch: jest.fn()
        }))
        const invoiceId = invoices[1].invoiceId

        await act(async () => {
            await render(<MemoryRouter><InvoicesComponent projectId={projectId}
                                                          contractId={contractId}></InvoicesComponent></MemoryRouter>)
            fireEvent.click(screen.getByTestId(`delete-btn-${invoiceId}`))
        })

        expect(deleteInvoice).toHaveBeenCalledWith(projectId, contractId, invoiceId.toString(), expect.anything(), expect.anything())
    })
})
