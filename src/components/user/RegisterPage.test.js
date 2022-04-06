import {act, fireEvent, render, screen} from "@testing-library/react";
import {createTestStore} from "../../createTestStore";
import {MemoryRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {registerUser} from "../../services/UserService";
import RegisterPage from "./RegisterPage";

jest.mock("../../services/UserService", () => ({
    registerUser: jest.fn()
}))

describe("RegisterPage", () => {
    let store

    beforeEach(() => store = createTestStore())

    afterEach(() => store = null)

    test("renders error message and does not call registerUser(...) username field is empty", async () => {
        await act(async () => {
            await render(<MemoryRouter><Provider store={store}><RegisterPage/></Provider></MemoryRouter>)
            fireEvent.change(screen.getByLabelText("E-Mail"), {target: {value: "mail@mail.de"}})
            fireEvent.change(screen.getByLabelText("Password"), {target: {value: "password"}})
            fireEvent.click(screen.getByTestId("register-btn"))
        })

        expect(screen.getByText("Please enter a username!")).toBeInTheDocument()
        expect(registerUser).not.toHaveBeenCalled()
    })

    test("renders error message and does not call registerUser(...) email field is empty", async () => {
        await act(async () => {
            await render(<MemoryRouter><Provider store={store}><RegisterPage/></Provider></MemoryRouter>)
            fireEvent.change(screen.getByLabelText("Username"), {target: {value: "username"}})
            fireEvent.change(screen.getByLabelText("Password"), {target: {value: "password"}})
            fireEvent.click(screen.getByTestId("register-btn"))
        })

        expect(screen.getByText("Please enter an EMail-Address!")).toBeInTheDocument()
        expect(registerUser).not.toHaveBeenCalled()
    })

    test("renders error message and does not call registerUser(...) password field is empty", async () => {
        await act(async () => {
            await render(<MemoryRouter><Provider store={store}><RegisterPage/></Provider></MemoryRouter>)
            fireEvent.change(screen.getByLabelText("E-Mail"), {target: {value: "mail@mail.de"}})
            fireEvent.change(screen.getByLabelText("Username"), {target: {value: "username"}})
            fireEvent.click(screen.getByTestId("register-btn"))
        })

        expect(screen.getByText("Please enter a password!")).toBeInTheDocument()
        expect(registerUser).not.toHaveBeenCalled()
    })

    test("calls registerUser(...) when fields are entered correctly", async () => {
        const user = {
            email: "mail@mail.de",
            username: "username",
            password: "password"
        }

        await act(async () => {
            await render(<MemoryRouter><Provider store={store}><RegisterPage/></Provider></MemoryRouter>)
            fireEvent.change(screen.getByLabelText("E-Mail"), {target: {value: user.email}})
            fireEvent.change(screen.getByLabelText("Username"), {target: {value: user.username}})
            fireEvent.change(screen.getByLabelText("Password"), {target: {value: user.password}})
            fireEvent.click(screen.getByTestId("register-btn"))
        })

        expect(registerUser).toHaveBeenCalledWith(user, expect.anything(), expect.anything(), expect.anything())
    })
})
