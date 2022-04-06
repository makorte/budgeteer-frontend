import {MemoryRouter} from "react-router-dom";
import {fireEvent, render, screen} from "@testing-library/react";
import SelectProjectForm from "./SelectProjectForm";
import {act} from "react-dom/test-utils";
import {getProjectById} from "../../services/ProjectService";

jest.mock("../../services/ProjectService", () => ({
    getProjectById: jest.fn()
}));

describe("CreateProjectForm", () => {
    const projects = [
        {
            id: 1,
            name: "Project 1"
        },
        {
            id: 2,
            name: "Project 2"
        }
    ];

    test("renders all projects into select", async () => {
        await act(async () => {
            await render(<MemoryRouter><SelectProjectForm usersProjects={projects}/></MemoryRouter>)
            fireEvent.click(screen.getByTestId("project-select"))
        })

        expect(screen.getByText(projects[0].name)).toBeInTheDocument();
        expect(screen.getByText(projects[1].name)).toBeInTheDocument();
        expect(screen.getByTestId("project-select").children.length).toBe(2);
    })

    test("calls getProjectById(...) with first project if no project selected and submit button clicked", async () => {
        await act(async () => {
            await render(<MemoryRouter><SelectProjectForm usersProjects={projects}/></MemoryRouter>)
            fireEvent.click(screen.getByTestId("submit-button"))
        })

        expect(getProjectById).toHaveBeenCalledWith(projects[0].id.toString(), expect.anything());
    })
})
