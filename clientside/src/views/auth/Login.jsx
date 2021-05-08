import React , {useState} from "react"
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
import { useFormik } from 'formik'
import AuthService from 'services/AuthService'
import * as Yup from 'yup'
import { Toaster } from 'react-hot-toast';

import { useHistory } from 'react-router-dom'
function Login(){
  const [isChecked, setisChecked] = useState(false);
  const handleChange = ({target}) => {
    setisChecked(target.value);
  }

  const handleChecked = () => {
    setisChecked(!isChecked);
  }
  let history = useHistory();
  // Add Form
  const validationSchema = Yup.object({
    username: Yup.string().email().required('Il faut indiquer votre email'),
    password: Yup.string().required('Il faut indiquer votre mot de passe')
  })
  const LoginForm = useFormik({
    initialValues : {
      username: '',
      password: ''
    },
    onSubmit: async (values)  => {
      const type = await AuthService.login(values,isChecked);
      console.log("type"+type);
      if(type ==='0'){
        history.push('/admin/index');
      }
      else if ((type==='1')||(type==='2')) {
        history.push('/user/index');
      }
    },
    validationSchema
  })
  return (
    <>
    <Toaster />
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
              <small>Connectez-vous avec vos identifiants</small>
            </div>
            <Form onSubmit={LoginForm.handleSubmit}>
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
                    name="username" id="username"
                    {...LoginForm.getFieldProps('username')}
                  />
                </InputGroup>
                  {LoginForm.errors.username && LoginForm.touched.username ? 
                      <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                        <i className="ni ni-fat-remove" /> {LoginForm.errors.username }
                  </span></p> : null}
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Mot de passe"
                    type="password"
                    name="password" id="password"
                    {...LoginForm.getFieldProps('password')}
                  />
                </InputGroup>
                  {LoginForm.errors.password && LoginForm.touched.password ? 
                      <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                        <i className="ni ni-fat-remove" /> {LoginForm.errors.password }
                  </span></p> : null}
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
               <input type="checkbox" className="custom-control-input" 
               name="isChecked" onChange={handleChange} checked={isChecked} />
                <label className="custom-control-label" htmlFor="customCheck1"
                onClick={handleChecked}>Se souvenir de moi</label>               
              </div>
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                 Connexion
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Nav className="mt-3">
          <NavItem className="text-left" xs="6"  style={{paddingRight : '100px'}}>
            <NavLink
              className="text-light"
              href="#pablo"
            >
              <small>Mot de passe oublié?</small>
            </NavLink> 
          </NavItem>
          <NavItem className="text-right" xs="6">
            <NavLink
              className="text-light"
              href="/auth/register"
            >
              <small>Créer un nouveau compte</small>
            </NavLink>
          </NavItem>
        </Nav>
      </Col>
    </>
  );
};

export default Login;
