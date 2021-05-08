import { Link } from "react-router-dom";
// reactstrap components
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";
function UserNavbar(props){
    return (
      <Navbar
        className="navbar-horizontal navbar-light bg-white" sticky="top"
        expand="lg"
      >
        <Container>
          <NavbarBrand to="/user/index" tag={Link}>
            <img
              alt="..."
              src={require("assets/img/brand/argon-react.png").default}
            />
          </NavbarBrand>
          <button
            aria-controls="navbar-info"
            aria-expanded={false}
            aria-label="Toggle navigation"
            className="navbar-toggler"
            data-target="#navbar-info"
            data-toggle="collapse"
            id="navbar-info"
            type="button"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <UncontrolledCollapse navbar toggler="#navbar-info">
            <div className="navbar-collapse-header">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <Link to="/user/index">
                    <img
                      alt="..."
                      src={
                        require("assets/img/brand/argon-react.png")
                          .default
                      }
                    />
                  </Link>
                </Col>
                <Col className="collapse-close" xs="6">
                  <button
                    aria-controls="navbar-info"
                    aria-expanded={false}
                    aria-label="Toggle navigation"
                    className="navbar-toggler"
                    data-target="#navbar-info"
                    data-toggle="collapse"
                    id="navbar-info"
                    type="button"
                  >
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink
                  className="nav-link-icon"
                  to="/user/index"
                  tag={Link}
                >
                  <i className="ni ni-books text-info" />
                  <span className="nav-link-inner--text">Catalogue</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className="nav-link-icon"
                  to="/user/about"
                  tag={Link}
                >
                  <i className="ni ni-tag text-info" />
                  <span className="nav-link-inner--text">A propos</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className="nav-link-icon"
                  to="/user/contact"
                  tag={Link}
                >
                  <i className="ni ni-pin-3 text-info" />
                  <span className="nav-link-inner--text">Contact</span>
                </NavLink>
              </NavItem>
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    );
}

export default UserNavbar;