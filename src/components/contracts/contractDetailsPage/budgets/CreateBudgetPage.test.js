import CreateBudgetPage from "./CreateBudgetPage";
import {fireEvent, render, screen} from "@testing-library/react";
import {act} from "react-dom/test-utils";
import {MemoryRouter, useParams} from "react-router-dom";
import {createTestStore} from "../../../../createTestStore";
import {Provider} from "react-redux";
import {createBudget, getBudget, updateBudget} from "../../../../services/BudgetService";

jest.mock("../../../../services/BudgetService", () => ({
    createBudget: jest.fn(),
    getBudget: jest.fn(),
    updateBudget: jest.fn()
}))

jest.mock("react-router-dom", () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn()
}))

describe('CreateBudgetPage', function () {
    let store

    beforeEach(() => store = createTestStore())

    afterEach(() => store = null)

    const projectId = "1"
    const contractId = "1"
    const budgetId = "1"

    useParams.mockImplementation(() => ({
        projectId,
        contractId,
        budgetId
    }))

    describe("createMode (updateMode=false)", () => {
        test("renders error messages if required input fields are empty", async () => {
            await act(async () => {
                await render(<Provider store={store}><MemoryRouter><CreateBudgetPage updateMode={false}/></MemoryRouter></Provider>)
                fireEvent.click(screen.getByText(/save/i))
            })

            expect(screen.getByText("Please enter a name!")).toBeInTheDocument()
            expect(screen.getByText("Please enter an import key!")).toBeInTheDocument()
            expect(screen.getByText("Please enter a total amount!")).toBeInTheDocument()
            expect(screen.getByText("Please enter an amount limit!")).toBeInTheDocument()
        })

        test("does not call createBudget(...) wehen required input fields are empty", async () => {
            await act(async () => {
                await render(<Provider store={store}><MemoryRouter><CreateBudgetPage updateMode={false}/></MemoryRouter></Provider>)
                fireEvent.click(screen.getByText(/save/i))
                fireEvent.change(screen.getByLabelText(/description/i), {target: {value: "Description"}})
            })

            expect(createBudget).not.toHaveBeenCalled()
        })

        test("calls createBudget(...) if required values are entered", async () => {
            const budget = {
                name: "budget1",
                description: "",
                importKey: "b1",
                total: {
                    amount: "100000"
                },
                limit: {
                    amount: "90000"
                }
            }

            await act(async () => {
                await render(<Provider store={store}><MemoryRouter><CreateBudgetPage updateMode={false}/></MemoryRouter></Provider>)
                fireEvent.change(screen.getByLabelText(/name/i), {target: {value: budget.name}})
                fireEvent.change(screen.getByLabelText(/import key/i), {target: {value: budget.importKey}})
                fireEvent.change(screen.getByLabelText(/total amount/i), {target: {value: budget.total.amount}})
                fireEvent.change(screen.getByLabelText(/amount limit/i), {target: {value: budget.limit.amount}})
                fireEvent.click(screen.getByText(/save/i))
            })

            expect(createBudget).toHaveBeenCalledWith(projectId, contractId, budget, expect.anything())
        })
    })

    describe("updateMode (updateMode=true)", () => {
        const budget = {
            id: 1,
            name: "budget1",
            contractId: 1,
            contractName: "contract1",
            description: "this is the first budget",
            importKey: "b1",
            total: {
                currencyCode: "EUR",
                amount: "20000"
            },
            spent: {
                currencyCode: "EUR",
                amount: "20000"
            },
            remaining: {
                currencyCode: "EUR",
                amount: "20000"
            },
            avarageDailyRate: {
                currencyCode: "EUR",
                amount: "20000"
            },
            unplanned: {
                currencyCode: "EUR",
                amount: "20000"
            },
            limit: {
                currencyCode: "EUR",
                amount: "20000"
            },
            lastUpdated: "2022-05-23"
        }

        getBudget.mockImplementation(() => Promise.resolve(budget))

        test("renders values of loaded budget into input fields", async () => {
            await act(async () => {
                await render(<Provider store={store}><MemoryRouter><CreateBudgetPage updateMode={true}/></MemoryRouter></Provider>)
            })

            expect(screen.getByLabelText(/name/i).value).toBe(budget.name)
            expect(screen.getByLabelText(/description/i).value).toBe(budget.description)
            expect(screen.getByLabelText(/import key/i).value).toBe(budget.importKey)
            expect(screen.getByLabelText(/total amount/i).value).toBe(budget.total.amount)
            expect(screen.getByLabelText(/amount limit/i).value).toBe(budget.limit.amount)
        })

        test("does not call updateBudget(...) when required input fields are empty", async () => {
            await act(async () => {
                await render(<Provider store={store}><MemoryRouter><CreateBudgetPage updateMode={true}/></MemoryRouter></Provider>)
                fireEvent.change(screen.getByLabelText(/name/i), {target: {value: ""}})
                fireEvent.change(screen.getByLabelText(/import key/i), {target: {value: ""}})
                fireEvent.change(screen.getByLabelText(/total amount/i), {target: {value: ""}})
                fireEvent.change(screen.getByLabelText(/amount limit/i), {target: {value: ""}})
                fireEvent.click(screen.getByText(/save/i));
            })

            expect(updateBudget).not.toHaveBeenCalled()
        })

        test("calls updateBudget(...) if required values are entered", async () => {
            const newBudget = {
                name: "update budget",
                description: "",
                importKey: "b2",
                total: {
                    amount: "99999"
                },
                limit: {
                    amount: "66666"
                }
            }

            await act(async () => {
                await render(<Provider store={store}><MemoryRouter><CreateBudgetPage updateMode={true}/></MemoryRouter></Provider>)
                fireEvent.change(screen.getByLabelText(/name/i), {target: {value: newBudget.name}})
                fireEvent.change(screen.getByLabelText(/description/i), {target: {value: ""}})
                fireEvent.change(screen.getByLabelText(/import key/i), {target: {value: newBudget.importKey}})
                fireEvent.change(screen.getByLabelText(/total amount/i), {target: {value: "99999"}})
                fireEvent.change(screen.getByLabelText(/amount limit/i), {target: {value: "66666"}})
                fireEvent.click(screen.getByText(/save/i));
            })

            expect(updateBudget).toHaveBeenCalledWith(projectId, contractId, budgetId, {...newBudget, limit: {amount: "20000"}, total: {amount: "20000"}}, expect.anything())
        })
    })
});
