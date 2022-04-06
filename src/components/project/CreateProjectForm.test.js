import {act} from "react-dom/test-utils";
import {fireEvent, render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import {createProject} from "../../services/ProjectService";
import CreateProjectForm from "./CreateProjectForm";

jest.mock("../../services/ProjectService", () => ({
    createProject: jest.fn()
}));

describe("CreateProjectForm", () => {
    test("renders error message when input field is empty and submit button is clicked", async () => {
        await act(async () => {
            await render(<MemoryRouter><CreateProjectForm setSelectError={jest.fn}/></MemoryRouter>)
            fireEvent.click(screen.getByTestId("submit-button"));
        })

        expect(screen.getByText("Please enter a project name!")).toBeInTheDocument()
    })

    test("does not call createProject(...) when input field is empty and submit button is clicked", async () => {
        await act(async () => {
            await render(<MemoryRouter><CreateProjectForm setSelectError={jest.fn}/></MemoryRouter>)
            fireEvent.click(screen.getByTestId("submit-button"));
        })

        expect(createProject).not.toHaveBeenCalled();
    })

    test("calls createProject(...) when input field is not empty an submit button is clicked", async () => {
        const project = {
            name: "project1"
        }

        await act(async () => {
            await render(<MemoryRouter><CreateProjectForm setSelectError={jest.fn}/></MemoryRouter>)
            fireEvent.change(screen.getByLabelText(/create a new project/i), {target: {value: project.name}});
            fireEvent.click(screen.getByTestId("submit-button"));
        })

        expect(createProject).toHaveBeenCalledWith(project, expect.anything(), expect.anything())
    })
})
