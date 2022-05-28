import useGet from "../../../../services/useGet";
import {act} from "react-dom/test-utils";
import {fireEvent, render, screen} from "@testing-library/react";
import BudgetsComponent from "./BudgetsComponent";
import {MemoryRouter} from "react-router-dom";
import {deleteBudget} from "../../../../services/BudgetService";

jest.mock("../../../../services/useGet", () => {
    return jest.fn()
})

jest.mock("../../../../services/BudgetService", () => ({
    deleteBudget: jest.fn()
}))

describe("BudgetsComponent", () => {
    const projectId = "1"
    const contractId = "2"
    const budgets = [
        {
            id: 1,
            name: "budget1",
            contractId,
            contractName: "contract1",
            description: "this is the first budget",
            importKey: "b1",
            total: {
                currencyCode: "EUR",
                amount: "400000"
            },
            spent: {
                currencyCode: "EUR",
                amount: "20000"
            },
            remaining: {
                currencyCode: "EUR",
                amount: "380000"
            },
            avarageDailyRate: {
                currencyCode: "EUR",
                amount: "200"
            },
            unplanned: {
                currencyCode: "EUR",
                amount: "50000"
            },
            limit: {
                currencyCode: "EUR",
                amount: "350000"
            },
            lastUpdated: "2022-05-20"
        },
        {
            id: 2,
            name: "budget2",
            contractId,
            contractName: "contract1",
            description: "this is the second budget",
            importKey: "b2",
            total: {
                currencyCode: "EUR",
                amount: "100000"
            },
            spent: {
                currencyCode: "EUR",
                amount: "80000"
            },
            remaining: {
                currencyCode: "EUR",
                amount: "20000"
            },
            avarageDailyRate: {
                currencyCode: "EUR",
                amount: "600"
            },
            unplanned: {
                currencyCode: "EUR",
                amount: "20000"
            },
            limit: {
                currencyCode: "EUR",
                amount: "95000"
            },
            lastUpdated: "2020-11-03"
        }
    ]

    test("renders only loading spinner if only loading is set", async () => {
        useGet.mockImplementation(() => ({
            data: [],
            loading: true,
            refetch: jest.fn()
        }))

        await act(async () => {
            await render(<MemoryRouter><BudgetsComponent projectId={projectId} contractId={contractId}/></MemoryRouter>)
        })

        expect(screen.getByTestId("spinner")).toBeInTheDocument()
        expect(screen.queryByTestId("budgets-wrapper")).not.toBeInTheDocument()
    })

    test("renders only loading spinner if loading and budgets are set", async () => {
        useGet.mockImplementation(() => ({
            data: budgets,
            loading: true,
            refetch: jest.fn()
        }))

        await act(async () => {
            await render(<MemoryRouter><BudgetsComponent projectId={projectId} contractId={contractId}/></MemoryRouter>)
        })

        expect(screen.getByTestId("spinner")).toBeInTheDocument()
        expect(screen.queryByTestId("budgets-wrapper")).not.toBeInTheDocument()
    })

    test("renders budgets list if only budgets is set and not empty", async () => {
        useGet.mockImplementation(() => ({
            data: budgets,
            loading: false,
            refetch: jest.fn()
        }))

        await act(async () => {
            await render(<MemoryRouter><BudgetsComponent projectId={projectId} contractId={contractId}/></MemoryRouter>)
        })

        expect(screen.queryByTestId("budgets-list")).toBeInTheDocument()
        expect(screen.queryByText(budgets[0].name)).toBeInTheDocument()
        expect(screen.queryByText(budgets[1].name)).toBeInTheDocument()
    })

    test("renders message if budgets is empty", async () => {
        useGet.mockImplementation(() => ({
            data: [],
            loading: false,
            refetch: jest.fn()
        }))

        await act(async () => {
            await render(<MemoryRouter><BudgetsComponent projectId={projectId} contractId={contractId}/></MemoryRouter>)
        })

        expect(screen.getByText("No budgets exist in this contract!")).toBeInTheDocument()
    })

    test("calls deleteBudget(...) if delete button is clicked", async () => {
        useGet.mockImplementation(() => ({
            data: budgets,
            loading: false,
            refetch: jest.fn()
        }))
        const budgetId = budgets[1].id

        await act(async () => {
            await render(<MemoryRouter><BudgetsComponent projectId={projectId} contractId={contractId}/></MemoryRouter>)
            fireEvent.click(screen.getByTestId(`delete-btn-${budgetId}`))
        })

        expect(deleteBudget).toHaveBeenCalledWith(projectId, contractId, budgetId.toString(), expect.anything(), expect.anything())
    })
})
