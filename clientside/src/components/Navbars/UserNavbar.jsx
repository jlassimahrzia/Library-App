import { Link } from "react-router-dom"
import { useState , useEffect} from 'react'
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
  Col,UncontrolledDropdown,DropdownToggle,Media,DropdownMenu,DropdownItem,
  Form,FormGroup,InputGroup,InputGroupAddon,InputGroupText,Input
} from "reactstrap"
import AuthService from "services/AuthService"
import { useHistory } from 'react-router-dom'
import LocalStorageService from "services/LocalStorageService" 
function UserNavbar(props){
    let history = useHistory();
    const [user,setUser] = useState('');
    useEffect(() => {
      const user = LocalStorageService.getObject('user');
      setUser(user);
    }, [])
    const logout = async () => {
      await AuthService.logout();
      history.push("/auth/login");
    }

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
              {/* <NavItem>
                <Form className="navbar-search navbar-search-light  form-inline mr-3 d-none d-md-flex ml-lg-auto">
                    <FormGroup className="mb-0">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fas fa-search" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Chercher" type="text" />
                      </InputGroup>
                    </FormGroup>
                </Form>
              </NavItem> */}
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
          <UncontrolledDropdown nav >
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <img
                        alt="..."
                        src={`http://localhost:8000/api/images/${user.photo}`}
                      />
                    </span>
                    <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm font-weight-bold">
                        {user.name}
                      </span>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem className="noti-title" header tag="div">
                    <h6 className="text-overflow m-0">Bienvenu!</h6>
                  </DropdownItem>
                  <DropdownItem to="/user/profile" tag={Link}>
                    <i className="ni ni-single-02" />
                    <span>Profile</span>
                  </DropdownItem>
                  <DropdownItem to="/user/mesEmprunts" tag={Link}>
                    <i className="ni ni-calendar-grid-58" />
                    <span>Mes Emprunts</span>
                  </DropdownItem>
                  {/*<DropdownItem to="/admin/user-profile" tag={Link}>
                    <i className="ni ni-calendar-grid-58" />
                    <span>Activity</span>
                  </DropdownItem>
                  <DropdownItem to="/admin/user-profile" tag={Link}>
                    <i className="ni ni-support-16" />
                    <span>Support</span>
                  </DropdownItem> */}
                  <DropdownItem divider />
                  <DropdownItem onClick={logout}>
                    <i className="ni ni-user-run" />
                    <span>Déconnecter</span>
                  </DropdownItem>
                </DropdownMenu>
                </UncontrolledDropdown>
        </Container>
      </Navbar>
    );
}

export default UserNavbar;