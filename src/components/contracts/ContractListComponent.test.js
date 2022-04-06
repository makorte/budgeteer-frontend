import {act} from "react-dom/test-utils";
import {fireEvent, render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import ContractsListComponent from "./ContractListComponent";
import {FIXED_PRICE} from "../../types/Contract";
import {deleteContract} from "../../services/ContractService";

jest.mock("../../services/ContractService", () => ({
    deleteContract: jest.fn()
}))

describe("ContractListComponent", () => {
    const projectId = "1"
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
    const refetch = jest.fn()

    test("renders contracts table if contracts is not empty", async () => {
        await act(async () => {
            await render(<MemoryRouter><ContractsListComponent projectId={projectId} contracts={contracts}
                                                               refetch={refetch}/></MemoryRouter>)
        })

        expect(screen.getByText(contracts[0].name)).toBeInTheDocument()
        expect(screen.getByText(contracts[0].budget.amount)).toBeInTheDocument()
        expect(screen.getByText(contracts[1].name)).toBeInTheDocument()
        expect(screen.getByText(contracts[1].budget.amount)).toBeInTheDocument()
    });

    test("renders message if contracts is empty", async () => {
        await act(async () => {
            await render(<MemoryRouter><ContractsListComponent projectId={projectId} contracts={[]} refetch={refetch}/></MemoryRouter>)
        })

        expect(screen.getByText("No contracts exist in this project!")).toBeInTheDocument()
    })

    test("calls onDelete(...) when delete button clicked", async () => {
        await act(async () => {
            await render(<MemoryRouter><ContractsListComponent projectId={projectId} contracts={contracts}
                                                               refetch={refetch}/></MemoryRouter>)
            fireEvent.click(screen.getByTestId(`delete-btn-${contracts[0].id}`))
        })

        expect(deleteContract).toHaveBeenCalledWith(contracts[0].id, expect.anything(), projectId, expect.anything())
    })
})
