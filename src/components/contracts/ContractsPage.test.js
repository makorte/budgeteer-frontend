import {createTestStore} from "../../createTestStore";
import useGet from "../../services/useGet";
import {act} from "react-dom/test-utils";
import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {MemoryRouter} from "react-router-dom";
import {FIXED_PRICE} from "../../types/Contract";
import ContractsPage from "./ContractsPage";

jest.mock("../../services/useGet", () => {
    return jest.fn()
})

describe("ContractsPage", () => {
    const contracts = [
        {
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
        },
        {
            id: 2,
            projectId: 1,
            internalNumber: "2",
            name: "contract2",
            type: FIXED_PRICE,
            startDate: "2017-6-11",
            budget: {
                currencyCode: "EUR",
                amount: "500000"
            },
            budgetSpent: {
                currencyCode: "EUR",
                amount: "150000"
            },
            budgetLeft: {
                currencyCode: "EUR",
                amount: "350000"
            },
            taxRate: 5
        }
    ]

    let store

    beforeEach(() => store = createTestStore())

    afterEach(() => store = null)

    test("renders only loading spinner if loading is set", async () => {
        useGet.mockImplementation(() => ({
            data: [],
            loading: true,
            refetch: jest.fn()
        }))

        await act(async () => {
            await render(<Provider store={store}><MemoryRouter><ContractsPage/></MemoryRouter></Provider>)
        })

        expect(screen.getByTestId("spinner")).toBeInTheDocument()
        expect(screen.queryByTestId("contracts-wrapper")).not.toBeInTheDocument()
    })

    test("renders contracts list name if contracts is set", async () => {
        useGet.mockImplementation(() => ({
            data: contracts,
            loading: false,
            refetch: jest.fn()
        }))

        await act(async () => {
            await render(<Provider store={store}><MemoryRouter><ContractsPage/></MemoryRouter></Provider>)
        })

        expect(screen.getByTestId("contract-list")).toBeInTheDocument()
    })

    test("renders only loading spinner if loading and project are set", async () => {
        useGet.mockImplementation(() => ({
            data: contracts,
            loading: true,
            refetch: jest.fn()
        }))

        await act(async () => {
            await render(<Provider store={store}><MemoryRouter><ContractsPage/></MemoryRouter></Provider>)
        })

        expect(screen.getByTestId("spinner")).toBeInTheDocument()
        expect(screen.queryByTestId("contracts-wrapper")).not.toBeInTheDocument()
    })
})
