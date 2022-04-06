import {fireEvent, render, screen} from "@testing-library/react";
import CreateContractPage from "./CreateContractPage";
import {act} from "react-dom/test-utils";
import {Provider} from "react-redux";
import {MemoryRouter} from "react-router-dom";
import {createTestStore} from "../../createTestStore";
import {FIXED_PRICE} from "../../types/Contract";
import {createContract, getContract, updateContract} from "../../services/ContractService";
import {useParams} from "react-router-dom";

jest.mock("../../services/ContractService", () => ({
    createContract: jest.fn(),
    updateContract: jest.fn(),
    getContract: jest.fn()
}))

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: jest.fn()
}))

describe("CreateContractPage", () => {
    let store

    beforeEach(() => store = createTestStore())

    afterEach(() => store = null)

    describe("create mode (updateMode=false)", () => {
        test("renders error messages if input fields are empty", async () => {
            await act(async () => {
                await render(<Provider store={store}><MemoryRouter><CreateContractPage
                    updateMode={false}/></MemoryRouter></Provider>)
                fireEvent.click(screen.getByText(/save/i))
            })

            expect(screen.queryByText(/please enter a name!/i)).toBeInTheDocument()
            expect(screen.queryByText(/please enter an id!/i)).toBeInTheDocument()
            expect(screen.queryByText(/please select a start date!/i)).toBeInTheDocument()
            expect(screen.queryByText(/please enter a budget!/i)).toBeInTheDocument()
            expect(screen.queryByText(/please enter a tax rate!/i)).toBeInTheDocument()
        })

        test("does not call createContract(...) when input fields are empty", async () => {
            await act(async () => {
                await render(<Provider store={store}><MemoryRouter><CreateContractPage
                    updateMode={false}/></MemoryRouter></Provider>)
                fireEvent.click(screen.getByText(/save/i))
            })

            expect(createContract).not.toHaveBeenCalled()
        })

        test("calls createContract(...) if values are entered", async () => {
            const contract = {
                internalNumber: "c1",
                name: "contract 1",
                startDate: "2020-01-01",
                type: FIXED_PRICE,
                budget: {amount: "150000"},
                taxRate: "17.5"
            }

            await act(async () => {
                await render(<Provider store={store}><MemoryRouter><CreateContractPage
                    updateMode={false}/></MemoryRouter></Provider>)
                fireEvent.change(screen.getByLabelText(/name/i), {target: {value: contract.name}})
                fireEvent.change(screen.getByLabelText(/id/i), {target: {value: contract.internalNumber}})
                fireEvent.change(screen.getByLabelText(/start date/i), {target: {value: contract.startDate}})
                fireEvent.change(screen.getByLabelText(/type/i), {target: {value: contract.type}})
                fireEvent.change(screen.getByLabelText("Budget amount (net)"), {target: {value: contract.budget.amount}})
                fireEvent.change(screen.getByLabelText(/tax rate/i), {target: {value: contract.taxRate}})
                fireEvent.click(screen.getByText(/save/i))
            })

            expect(createContract).toHaveBeenCalledWith(undefined, contract, expect.anything())
        })
    })

    describe("update mode (updateMode=true)", () => {
        const contract = {
            id: 1,
            internalNumber: "c1",
            name: "contract 1",
            startDate: "2020-01-01",
            type: FIXED_PRICE,
            budget: {currencyCode: "EUR", amount: "150000"},
            taxRate: "17.5"
        }

        useParams.mockReturnValue({contractId: contract.id})
        getContract.mockImplementation(() => Promise.resolve(contract))

        test("renders values of loaded contract into input fields", async () => {
            await act(async () => {
                await render(<Provider store={store}><MemoryRouter><CreateContractPage
                    updateMode={true}/></MemoryRouter></Provider>)
            })

            expect(screen.getByLabelText(/name/i).value).toBe(contract.name)
            expect(screen.getByLabelText(/id/i).value).toBe(contract.internalNumber)
            expect(screen.getByLabelText(/start date/i).value).toBe(contract.startDate)
            expect(screen.getByLabelText(/type/i).value).toBe(contract.type)
            expect(screen.getByLabelText("Budget amount (net)").value).toBe(contract.budget.amount)
            expect(screen.getByLabelText(/tax rate/i).value).toBe(contract.taxRate)
        })

        test("does not call updateContract(...) when input fields are empty", async () => {
            await act(async () => {
                await render(<Provider store={store}><MemoryRouter><CreateContractPage
                    updateMode={true}/></MemoryRouter></Provider>)
                fireEvent.change(screen.getByLabelText(/name/i), {target: {value: ""}})
                fireEvent.change(screen.getByLabelText(/id/i), {target: {value: ""}})
                fireEvent.change(screen.getByLabelText(/start date/i), {target: {value: ""}})
                fireEvent.change(screen.getByLabelText("Budget amount (net)"), {target: {value: ""}})
                fireEvent.change(screen.getByLabelText(/tax rate/i), {target: {value: ""}})
                fireEvent.click(screen.getByText(/save/i))
            })

            expect(updateContract).not.toHaveBeenCalled()
        })

        test("calls updateContract(...) if values are entered", async () => {
            const updatedContract = {
                internalNumber: "contract1",
                name: "contract 1",
                startDate: "2020-12-01",
                type: FIXED_PRICE,
                budget: {amount: "500000"},
                taxRate: "10"
            }

            await act(async () => {
                await render(<Provider store={store}><MemoryRouter><CreateContractPage
                    updateMode={true}/></MemoryRouter></Provider>)
                fireEvent.change(screen.getByLabelText(/name/i), {target: {value: updatedContract.name}})
                fireEvent.change(screen.getByLabelText(/id/i), {target: {value: updatedContract.internalNumber}})
                fireEvent.change(screen.getByLabelText(/start date/i), {target: {value: updatedContract.startDate}})
                fireEvent.change(screen.getByLabelText(/type/i), {target: {value: updatedContract.type}})
                fireEvent.change(screen.getByLabelText("Budget amount (net)"), {target: {value: updatedContract.budget.amount}})
                fireEvent.change(screen.getByLabelText(/tax rate/i), {target: {value: updatedContract.taxRate}})
                fireEvent.click(screen.getByText(/save/i))
            })

            expect(updateContract).toHaveBeenCalledWith(contract.id, updatedContract, expect.anything(), undefined)
        })
    })
})
