import useGet from "../../../../services/useGet";
import {act} from "react-dom/test-utils";
import {fireEvent, render, screen} from "@testing-library/react";
import BudgetDetailsPage from "./BudgetDetailsPage";
import {createTestStore} from "../../../../createTestStore";
import {Provider} from "react-redux";
import {MemoryRouter, useParams} from "react-router-dom";
import {deleteBudget} from "../../../../services/BudgetService";

jest.mock("../../../../services/useGet", () => {
    return jest.fn()
})

jest.mock("react-router-dom", () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn()
}))

jest.mock("../../../../services/BudgetService", () => ({
    deleteBudget: jest.fn()
}))

describe("BudgetDetailsPage", () => {
    let store

    beforeEach(() => store = createTestStore())

    afterEach(() => store = null)

    const projectId = 1
    const contractId = 1
    const budget = {
        id: 1,
        name: "budget",
        contractId: contractId,
        contractName: "contract",
        description: "this is a budget",
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

    useParams.mockImplementation(() => ({
        projectId: projectId.toString(),
        contractId: contractId.toString(),
        budgetId: budget.id.toString()
    }))

    test("renders only loading spinner if loading is set", async () => {
        useGet.mockImplementation(() => ({
            data: null,
            loading: true,
            refetch: jest.fn()
        }))

        await act(async () => {
            await render(<Provider store={store}><MemoryRouter><BudgetDetailsPage/></MemoryRouter></Provider>)
        })

        expect(screen.getByTestId("spinner")).toBeInTheDocument()
        expect(screen.queryByTestId("details-wrapper")).not.toBeInTheDocument()
    })

    test("renders only loading spinner if loading and budget are set", async () => {
        useGet.mockImplementation(() => ({
            data: budget,
            loading: true,
            refetch: jest.fn()
        }))

        await act(async () => {
            await render(<Provider store={store}><MemoryRouter><BudgetDetailsPage/></MemoryRouter></Provider>)
        })

        expect(screen.getByTestId("spinner")).toBeInTheDocument()
        expect(screen.queryByTestId("details-wrapper")).not.toBeInTheDocument()
    })

    test("renders budget if budget is set", async () => {
        useGet.mockImplementation(() => ({
            data: budget,
            loading: false,
            refetch: jest.fn()
        }))

        await act(async () => {
            await render(<Provider store={store}><MemoryRouter><BudgetDetailsPage/></MemoryRouter></Provider>)
        })

        expect(screen.queryByTestId("spinner")).not.toBeInTheDocument()
        expect(screen.queryByTestId("details-wrapper")).toBeInTheDocument()
        expect(screen.getByText(budget.name)).toBeInTheDocument()
    })

    test("calls deleteBudget(...) when delete button clicked", async () => {
        useGet.mockImplementation(() => ({
            data: budget,
            loading: false,
            refetch: jest.fn()
        }))

        await act(async () => {
            await render(<Provider store={store}><MemoryRouter><BudgetDetailsPage/></MemoryRouter></Provider>)
            fireEvent.click(screen.getByText(/delete/i))
        })

        expect(deleteBudget).toHaveBeenCalledWith(projectId.toString(), contractId.toString(), budget.id.toString(), expect.anything())
    })
})
