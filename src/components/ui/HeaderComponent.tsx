import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setLoggedOut} from "../../store/loginInfosSlice";
import {Container, Nav, Navbar} from "react-bootstrap";

const HeaderComponent = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSignOut = () => {
        dispatch(setLoggedOut())
        navigate("/login")
    }

    return (
        <Navbar collapseOnSelect expand={"lg"} bg={"primary"} variant={"dark"} className={"shadow"}>
            <Container>
                <Navbar.Brand as={Link} to={"/dashboard"}>Budgeteer</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className={"me-auto"}>
                        <Nav.Link as={Link} to={"/contracts"}
                                  className={"d-inline-flex justify-content-center align-items-center"}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-file-earmark-text mx-1" viewBox="0 0 16 16">
                                <path
                                    d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/>
                                <path
                                    d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
                            </svg>
                            Contracts
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link as={Link} to={"/selectProject"}
                                  className={"d-inline-flex justify-content-center align-items-center"}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-shuffle mx-1" viewBox="0 0 16 16">
                                <path
                                    d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z"/>
                                <path
                                    d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z"/>
                            </svg>
                            Switch project
                        </Nav.Link>
                        <Nav.Link href={"#"} onClick={onSignOut}
                                  className={"d-inline-flex justify-content-center align-items-center"}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-box-arrow-right mx-1" viewBox="0 0 16 16">
                                <path
                                    d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                                <path
                                    d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                            </svg>
                            Sign out
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default HeaderComponent