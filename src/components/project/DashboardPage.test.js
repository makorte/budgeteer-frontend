import {MemoryRouter} from "react-router-dom";
import {act} from "react-dom/test-utils";
import {render, screen} from "@testing-library/react";
import DashboardPage from "./DashboardPage";
import {Provider} from "react-redux";
import useGet from "../../services/useGet";
import {createTestStore} from "../../createTestStore";

jest.mock("../../services/useGet", () => {
    return jest.fn()
})

describe("DashboardPage", () => {
    let store

    beforeEach(() => store = createTestStore())

    afterEach(() => store = null)

    test("renders only loading spinner if loading is set", async () => {
        useGet.mockImplementation(() => ({
            data: {id: undefined, name: ''},
            loading: true,
            refetch: jest.fn()
        }))

        await act(async () => {
            await render(<Provider store={store}><MemoryRouter><DashboardPage/></MemoryRouter></Provider>)
        })

        expect(screen.getByTestId("spinner")).toBeInTheDocument()
        expect(screen.queryByTestId("project")).not.toBeInTheDocument()
    })

    test("renders project name if project is set", async () => {
        const projectName = 'Test Project'

        useGet.mockImplementation(() => ({
            data: {id: 1, name: projectName},
            loading: false,
            refetch: jest.fn()
        }))

        await act(async () => {
            await render(<Provider store={store}><MemoryRouter><DashboardPage/></MemoryRouter></Provider>)
        })

        expect(screen.getByText(projectName)).toBeInTheDocument()
    })

    test("renders only loading spinner if loading and project are set", async () => {
        useGet.mockImplementation(() => ({
            data: {id: 1, name: 'Test Project'},
            loading: true,
            refetch: jest.fn()
        }))

        await act(async () => {
            await render(<Provider store={store}><MemoryRouter><DashboardPage/></MemoryRouter></Provider>)
        })

        expect(screen.getByTestId("spinner")).toBeInTheDocument()
        expect(screen.queryByTestId("project")).not.toBeInTheDocument()
    })
})
