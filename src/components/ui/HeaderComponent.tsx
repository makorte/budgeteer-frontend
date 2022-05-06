import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setLoggedOut} from "../../store/loginInfosSlice";
import {Container, Nav, Navbar} from "react-bootstrap";
import {contractsLink, dashboardLink, loginLink, selectProjectLink} from "../../services/NavigationService";

const HeaderComponent = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {projectId} = useParams()

    const onSignOut = () => {
        dispatch(setLoggedOut())
        navigate(loginLink())
    }

    return (
        <Navbar collapseOnSelect expand={"lg"} bg={"primary"} variant={"dark"} className={"shadow"}>
            <Container>
                <Navbar.Brand as={Link} to={dashboardLink(projectId!)}>Budgeteer</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className={"me-auto"}>
                        <Nav.Link as={Link} to={contractsLink(projectId!)}
                                  className={"d-inline-flex justify-content-center align-items-center"}>
                            <i className="bi bi-file-earmark-text mx-2"/>
                            Contracts
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link as={Link} to={selectProjectLink()}
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
