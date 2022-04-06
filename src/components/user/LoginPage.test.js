import {createTestStore} from "../../createTestStore";
import {act, fireEvent, render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import {Provider} from "react-redux";
import LoginPage from "./LoginPage";
import {login} from "../../services/UserService";

jest.mock("../../services/UserService", () => ({
    login: jest.fn()
}))

describe("LoginPage", () => {
    let store

    beforeEach(() => store = createTestStore())

    afterEach(() => store = null)

    test("renders error message and does not call login(...) when username field is empty", async () => {
        await act(async () => {
            await render(<MemoryRouter><Provider store={store}><LoginPage/></Provider></MemoryRouter>)
            fireEvent.change(screen.getByLabelText(/password/i), {target: {value: "password"}})
            fireEvent.click(screen.getByText(/log in/i))
        })

        expect(screen.getByText(/please enter a username!/i)).toBeInTheDocument()
        expect(login).not.toHaveBeenCalled()
    })

    test("render error message and does not call login(...) when password field is empty", async () => {
        await act(async () => {
            await render(<MemoryRouter><Provider store={store}><LoginPage/></Provider></MemoryRouter>)
            fireEvent.change(screen.getByLabelText(/username/i), {target: {value: "username"}})
            fireEvent.click(screen.getByText(/log in/i))
        })

        expect(screen.getByText(/please enter a password!/i)).toBeInTheDocument()
        expect(login).not.toHaveBeenCalled()
    })

    test("calls login(...) when username and password fields are filled", async () => {
        const user = {
            username: "username",
            password: "password"
        }

        await act(async () => {
            await render(<MemoryRouter><Provider store={store}><LoginPage/></Provider></MemoryRouter>)
            fireEvent.change(screen.getByLabelText(/username/i), {target: {value: user.username}})
            fireEvent.change(screen.getByLabelText(/password/i), {target: {value: user.password}})
            fireEvent.click(screen.getByText(/log in/i))
        })

        expect(login).toHaveBeenCalledWith(user, expect.anything(), expect.anything(), undefined)
    })

    test("should remove token from local storage", async () => {
        localStorage.setItem("token", "token")

        await act(async () => {
            await render(<MemoryRouter><Provider store={store}><LoginPage/></Provider></MemoryRouter>)
        })

        expect(localStorage.getItem("token")).toBeNull()
    })
})
