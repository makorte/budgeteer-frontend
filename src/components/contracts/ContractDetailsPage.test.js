import {act} from "react-dom/test-utils";
import {fireEvent, render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import {createTestStore} from "../../createTestStore";
import {Provider} from "react-redux";
import ContractDetailsPage from "./ContractDetailsPage";
import {FIXED_PRICE} from "../../types/Contract";
import useGet from "../../services/useGet";
import {deleteContract} from "../../services/ContractService";

jest.mock("../../services/useGet", () => {
    return jest.fn()
})

jest.mock("../../services/ContractService", () => ({
    deleteContract: jest.fn()
}))

describe("ContractDetailsPage", () => {
    const contract = {
        id: 1,
        projectId: 1,
        internalNumber: "1",
        name: "contract1",
        type: FIXED_PRICE,
        startDate: "2020-01-01",
        budget: {
            currencyCode: "EUR",
            amount: "100"
        },
        budgetSpent: {
            currencyCode: "EUR",
            amount: "50"
        },
        budgetLeft: {
            currencyCode: "EUR",
            amount: "50"
        },
        taxRate: 17.5
    }

    let store

    beforeEach(() => store = createTestStore())

    afterEach(() => store = null)

    test("renders contract if contract is set", async () => {
        useGet.mockImplementation(() => ({
            data: contract,
            loading: false,
            fetch: jest.fn()
        }))

        await act(async () => {
            await render(<Provider store={store}><MemoryRouter><ContractDetailsPage/></MemoryRouter></Provider>)
        })

        expect(screen.getByText(contract.name)).toBeInTheDocument()
        expect(screen.getByText(contract.budget.amount)).toBeInTheDocument()
    });

    test("renders only loading spinner if loading is set", async () => {
        useGet.mockImplementation(() => ({
            data: null,
            loading: true,
            fetch: jest.fn()
        }))

        await act(async () => {
            await render(<Provider store={store}><MemoryRouter><ContractDetailsPage/></MemoryRouter></Provider>)
        })

        expect(screen.getByTestId("spinner")).toBeInTheDocument()
        expect(screen.queryByTestId("contract-wrapper")).not.toBeInTheDocument()
    })

    test("renders only loading spinner if loading and contract are set", async () => {
        useGet.mockImplementation(() => ({
            data: contract,
            loading: true,
            fetch: jest.fn()
        }))

        await act(async () => {
            await render(<Provider store={store}><MemoryRouter><ContractDetailsPage/></MemoryRouter></Provider>)
        })

        expect(screen.getByTestId("spinner")).toBeInTheDocument()
        expect(screen.queryByTestId("contract-wrapper")).not.toBeInTheDocument()
    })

    test("calls deleteContract(...) when delete button clicked", async () => {
        useGet.mockImplementation(() => ({
            data: contract,
            loading: false,
            fetch: jest.fn()
        }))

        await act(async () => {
            await render(<Provider store={store}><MemoryRouter><ContractDetailsPage/></MemoryRouter></Provider>)
            fireEvent.click(screen.getByText("Delete"))
        })

        expect(deleteContract).toHaveBeenCalledWith(contract.id, expect.anything(), undefined)
    })
})
