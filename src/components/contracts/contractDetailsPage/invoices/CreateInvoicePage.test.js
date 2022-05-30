import CreateInvoicePage from "./CreateInvoicePage";
import {fireEvent, render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {createTestStore} from "../../../../createTestStore";
import {act} from "react-dom/test-utils";
import {createInvoice, getInvoice, updateInvoice} from "../../../../services/InvoiceService";
import {useParams} from "react-router-dom";

jest.mock("../../../../services/InvoiceService", () => ({
    createInvoice: jest.fn(),
    updateInvoice: jest.fn(),
    getInvoice: jest.fn()
}))

jest.mock("react-router-dom", () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn()
}))

describe("CreateInvoicePage", () => {
    let store

    beforeEach(() => store = createTestStore())

    afterEach(() => store = null)

    const projectId = "1"
    const contractId = "1"
    const invoiceId = "1"

    useParams.mockImplementation(() => ({
        projectId,
        contractId,
        invoiceId
    }))

    describe("createMode (updateMode=false)", () => {
        test("renders error messages if input fields are empty", async () => {
            await act(async () => {
                await render(<Provider store={store}><MemoryRouter><CreateInvoicePage
                    updateMode={false}/></MemoryRouter></Provider>)
                fireEvent.click(screen.getByText(/save/i))
            })

            expect(screen.queryByText("Please enter a name!")).toBeInTheDocument();
            expect(screen.queryByText("Please enter an id!")).toBeInTheDocument();
            expect(screen.queryByText("Please enter a correct value!")).toBeInTheDocument();
            expect(screen.queryByText("Please enter an amount!")).toBeInTheDocument();
            expect(screen.queryByText("Please enter a tax rate!")).toBeInTheDocument();
        })

        test("does not call createInvoice(...) when input fields are empty", async () => {
            await act(async () => {
                await render(<Provider store={store}><MemoryRouter><CreateInvoicePage
                    updateMode={false}/></MemoryRouter></Provider>)
                fireEvent.click(screen.getByText(/save/i))
            })

            expect(createInvoice).not.toHaveBeenCalled()
        })

        test("calls createInvoice(...) if required values are entered", async () => {
            const invoice = {
                name: "invoice",
                amountOwed: {
                    amount: "150000"
                },
                taxRate: "17.5",
                internalNumber: "i1",
                yearMonth: "2022-05",
                dueDate: "",
                paidDate: ""
            }

            await act(async () => {
                await render(<Provider store={store}><MemoryRouter><CreateInvoicePage
                    updateMode={false}/></MemoryRouter></Provider>)
                fireEvent.change(screen.getByLabelText(/name/i), {target: {value: invoice.name}})
                fireEvent.change(screen.getByLabelText(/id\*/i), {target: {value: invoice.internalNumber}})
                fireEvent.change(screen.getByLabelText(/year and month/i), {target: {value: invoice.yearMonth}})
                fireEvent.change(screen.getByLabelText(/amount/i), {target: {value: invoice.amountOwed.amount}})
                fireEvent.change(screen.getByLabelText(/tax rate/i), {target: {value: invoice.taxRate}})
                fireEvent.click(screen.getByText(/save/i));
            })

            expect(createInvoice).toHaveBeenCalledWith(projectId, contractId, invoice, expect.anything())
        })
    })

    describe("updateMode (updateMode=true)", () => {
        const invoice = {
            invoiceId: 1,
            invoiceName: "invoice1",
            contractId: 1,
            contractName: "contract1",
            amountOwed: {
                currencyCode: "EUR",
                amount: "20000"
            },
            taxRate: "17.5",
            internalNumber: "i1",
            yearMonth: "2022-05",
            paidDate: "2022-05-06",
            dueDate: "2022-05-07"
        }

        getInvoice.mockImplementation(() => Promise.resolve(invoice))

        test("renders values of loaded invoice into input fields", async () => {
            await act(async () => {
                await render(<Provider store={store}><MemoryRouter><CreateInvoicePage updateMode={true}/></MemoryRouter></Provider>)
            })

            expect(screen.getByLabelText(/name/i).value).toBe(invoice.invoiceName)
            expect(screen.getByLabelText(/id\*/i).value).toBe(invoice.internalNumber)
            expect(screen.getByLabelText(/year and month/i).value).toBe(invoice.yearMonth)
            expect(screen.getByLabelText(/amount/i).value).toBe(invoice.amountOwed.amount)
            expect(screen.getByLabelText(/tax rate/i).value).toBe(invoice.taxRate)
            expect(screen.getByLabelText(/paid date/i).value).toBe(invoice.paidDate)
            expect(screen.getByLabelText(/due date/i).value).toBe(invoice.dueDate)
        })

        test("does not call updateInvoice(...) when input fields are empty", async () => {
            await act(async () => {
                await render(<Provider store={store}><MemoryRouter><CreateInvoicePage updateMode={true}/></MemoryRouter></Provider>)
                fireEvent.change(screen.getByLabelText(/name/i), {target: {value: ""}})
                fireEvent.change(screen.getByLabelText(/id\*/i), {target: {value: ""}})
                fireEvent.change(screen.getByLabelText(/year and month/i), {target: {value: ""}})
                fireEvent.change(screen.getByLabelText(/amount/i), {target: {value: ""}})
                fireEvent.change(screen.getByLabelText(/tax rate/i), {target: {value: ""}})
                fireEvent.click(screen.getByText(/save/i));
            })

            expect(updateInvoice).not.toHaveBeenCalled()
        })

        test("calls updateInvoice(...) if values are entered", async () => {
            const updatedInvoice = {
                name: "invoice",
                amountOwed: {
                    amount: "150000"
                },
                taxRate: "17.5",
                internalNumber: "i1",
                yearMonth: "2022-05",
                dueDate: "",
                paidDate: ""
            }

            await act(async () => {
                await render(<Provider store={store}><MemoryRouter><CreateInvoicePage updateMode={true}/></MemoryRouter></Provider>)
                fireEvent.change(screen.getByLabelText(/name/i), {target: {value: updatedInvoice.name}})
                fireEvent.change(screen.getByLabelText(/id\*/i), {target: {value: updatedInvoice.internalNumber}})
                fireEvent.change(screen.getByLabelText(/year and month/i), {target: {value: updatedInvoice.yearMonth}})
                fireEvent.change(screen.getByLabelText(/amount/i), {target: {value: updatedInvoice.amountOwed.amount}})
                fireEvent.change(screen.getByLabelText(/tax rate/i), {target: {value: updatedInvoice.taxRate}})
                fireEvent.click(screen.getByText(/save/i));
            })

            expect(updateInvoice).toHaveBeenCalledWith(projectId, contractId, invoiceId, {...updatedInvoice, amountOwed: {amount: "20000"}}, expect.anything())
        })
    })
})
