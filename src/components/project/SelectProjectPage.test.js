import SelectProjectPage from "./SelectProjectPage";
import {getProjects} from "../../services/ProjectService";
import {MemoryRouter} from "react-router-dom";
import {render, screen} from "@testing-library/react";
import {act} from "react-dom/test-utils";

jest.mock("../../services/ProjectService", () => ({
    getProjects: jest.fn(),
    createProject: jest.fn()
}));

describe("SelectProjectPage", () => {
    test("does not render select project form when usersProjects is empty", async () => {
        getProjects.mockImplementation(() => Promise.resolve([]));

        await act(async () => {
            await render(<MemoryRouter><SelectProjectPage/></MemoryRouter>)
        })

        expect(screen.queryByTestId("select-project-form")).not.toBeInTheDocument()
    })

    test("remders select project form when usersProjects is set", async () => {
        getProjects.mockImplementation(() => Promise.resolve([
            {id: 1, name: "project1"},
            {id: 2, name: "project2"}
        ]));

        await act(async () => {
            await render(<MemoryRouter><SelectProjectPage/></MemoryRouter>)
        })

        expect(screen.queryByTestId("select-project-form")).toBeInTheDocument()
    })
})

