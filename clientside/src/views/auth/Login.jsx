import React , {useState} from "react"
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import CookieService from "../../services/CookieService"
// reactstrap components
import {
  Button,
  Card,
  //CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  //Row,
  Col,
  NavItem, NavLink, Nav
} from "reactstrap";

function Login(){

  const [state, setState] = useState({
    username : "",
    password : "",
    isChecked : false,
  })
  
  let history = useHistory();

  const expiresAt = 60 * 24;

  const handleChange = ({target}) => {
    setState({ ...state, [target.name]: target.value })
  }

  const handleChecked = () => {
      setState({ ...state, isChecked: ! state.isChecked });
  }

  const handleLoginSuccess = (response, remember) => {
      if (!remember) {
        const options = { path: "/" };
        CookieService.set("access_token", response.data.access_token, options);
        return true;
      }

      let date = new Date();
      date.setTime(date.getTime() + expiresAt * 60 * 1000);
      const options = { path: "/", expires: date };
      CookieService.set("access_token", response.data.access_token, options);
      return true;
  }

  const onSubmit = e => {
      e.preventDefault();
      let Credentials = { username : state.username , password : state.password} ;
      console.log(Credentials);
      axios.post("http://localhost:8000/api/login", Credentials)
        .then(res =>{
              console.log(res);
              console.log("success");
              handleLoginSuccess(res, state.isChecked);
              history.push('/admin/index');
          })
        .catch(error => {
          console.log(error);
          console.log("fail");
          alert("Please check your credentials and try agian");
        });
  }
  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
         {/*  <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <small>Sign in with</small>
            </div>
            <div className="btn-wrapper text-center">
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/github.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Github</span>
              </Button>
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/google.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Google</span>
              </Button>
            </div>
          </CardHeader> */}
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              {/* <small>Or sign in with credentials</small> */}
              <small>Sign in with credentials</small>
            </div>
            <Form role="form" onSubmit={onSubmit}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    name="username" value={state.email} onChange={handleChange}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    name="password" value={state.password} onChange={handleChange}
                  />
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
               <input type="checkbox" className="custom-control-input" 
                     name="isChecked" onChange={handleChecked} checked={state.isChecked} />
                <label className="custom-control-label" htmlFor="customCheck1"
                      onClick={handleChecked}>Remember me</label>               
              </div>
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Nav className="mt-3">
          <NavItem className="text-left" xs="6"  style={{paddingRight : '170px'}}>
            <NavLink
              className="text-light"
              href="#pablo"
            >
              <small>Forgot password?</small>
            </NavLink> 
          </NavItem>
          <NavItem className="text-right" xs="6">
            <NavLink
              className="text-light"
              href="/auth/register"
            >
              <small>Create new account</small>
            </NavLink>
          </NavItem>
        </Nav>
      </Col>
    </>
  );
};

export default Login;
