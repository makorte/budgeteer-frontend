import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setLoggedOut} from "../../store/loginInfosSlice";
import {Container, Nav, Navbar} from "react-bootstrap";

const HeaderComponent = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {projectId} = useParams()

    const onSignOut = () => {
        dispatch(setLoggedOut())
        navigate("/login")
    }

    return (
        <Navbar collapseOnSelect expand={"lg"} bg={"primary"} variant={"dark"} className={"shadow"}>
            <Container>
                <Navbar.Brand as={Link} to={`/${projectId}/dashboard`}>Budgeteer</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className={"me-auto"}>
                        <Nav.Link as={Link} to={`/${projectId}/contracts`}
                                  className={"d-inline-flex justify-content-center align-items-center"}>
                            <i className="bi bi-file-earmark-text mx-2"/>
                            Contracts
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link as={Link} to={"/selectProject"}
                                  className={"d-inline-flex justify-content-center align-items-center"}>
                            <i className="bi bi-shuffle mx-2"/>
                            Switch project
                        </Nav.Link>
                        <Nav.Link href={"#"} onClick={onSignOut}
                                  className={"d-inline-flex justify-content-center align-items-center"}>
                            <i className="bi bi-box-arrow-right mx-2"/>
                            Sign out
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default HeaderComponent
