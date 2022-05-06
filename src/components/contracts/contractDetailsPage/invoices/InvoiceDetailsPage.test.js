import useGet from "../../../../services/useGet";
import {fireEvent, render, screen} from "@testing-library/react";
import InvoiceDetailsPage from "./InvoiceDetailsPage";
import {act} from "react-dom/test-utils";
import {MemoryRouter, useParams} from "react-router-dom";
import {createTestStore} from "../../../../createTestStore";
import {Provider} from "react-redux";
import {deleteInvoice} from "../../../../services/InvoiceService";

jest.mock("../../../../services/useGet", () => {
    return jest.fn()
})

jest.mock("../../../../services/InvoiceService", () => ({
    deleteInvoice: jest.fn()
}))

jest.mock("react-router-dom", () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn()
}))

describe("InvoiceDetailsPage", () => {
    const invoice = {
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
    }
    const projectId = "1"
    const contractId = "2"

    let store

    beforeEach(() => store = createTestStore())

    afterEach(() => store = null)

    test("renders only loading spinner if only loading is set", async () => {
        useGet.mockImplementation(() => ({
            data: null,
            loading: true,
            refetch: jest.fn()
        }))

        await act(async () => {
            await render(<Provider store={store}><MemoryRouter><InvoiceDetailsPage/></MemoryRouter></Provider>);
        })

        expect(screen.getByTestId("spinner")).toBeInTheDocument()
        expect(screen.queryByTestId("details-wrapper")).not.toBeInTheDocument()
    })

    test("renders only loading spinner if loading and invoice are set", async () => {
        useGet.mockImplementation(() => ({
            data: invoice,
            loading: true,
            refetch: jest.fn()
        }))

        await act(async () => {
            await render(<Provider store={store}><MemoryRouter><InvoiceDetailsPage/></MemoryRouter></Provider>);
        })

        expect(screen.getByTestId("spinner")).toBeInTheDocument()
        expect(screen.queryByTestId("details-wrapper")).not.toBeInTheDocument()
    })

    test("renders invoice if invoice is set", async () => {
        useGet.mockImplementation(() => ({
            data: invoice,
            loading: false,
            refetch: jest.fn()
        }))

        await act(async () => {
            await render(<Provider store={store}><MemoryRouter><InvoiceDetailsPage/></MemoryRouter></Provider>);
        })

        expect(screen.queryByTestId("spinner")).not.toBeInTheDocument()
        expect(screen.queryByTestId("details-wrapper")).toBeInTheDocument()
        expect(screen.getByText(invoice.invoiceName)).toBeInTheDocument()
    })

    test("calls deleteContract(...) when delete button clicked", async () => {
        useGet.mockImplementation(() => ({
            data: invoice,
            loading: false,
            refetch: jest.fn()
        }))
        useParams.mockImplementation(() => ({
            projectId,
            contractId,
            invoiceId: invoice.invoiceId.toString()
        }))

        await act(async () => {
            await render(<Provider store={store}><MemoryRouter><InvoiceDetailsPage/></MemoryRouter></Provider>);
            fireEvent.click(screen.getByText(/delete/i))
        })

        expect(deleteInvoice).toBeCalledWith(projectId, contractId, invoice.invoiceId.toString(), expect.anything(), expect.anything())
    })
})
