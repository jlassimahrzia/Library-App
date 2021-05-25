import React , {useState} from "react";
import { useHistory } from 'react-router-dom'
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
} from "reactstrap";
import { useFormik } from 'formik'
import AuthService from 'services/AuthService'
import * as Yup from 'yup'
import { Toaster } from 'react-hot-toast';
const Register = () => {
  let history = useHistory();
  const validationSchema = Yup.object({
    name: Yup.string().required('Il faut indiquer votre nom et prénom'),
    password: Yup.string().required('Il faut indiquer votre mot de passe'),
    email: Yup.string().email().required('Il faut indiquer votre email')
  })
  const RegisterForm = useFormik({
    initialValues : {
      name: '',
      password: '',
      email:'',
      type : '2'
    },
    onSubmit: async (values)  => {
      AuthService.Register(values);
      history.push('/');
    },
    validationSchema
  })

  return (
    <>
    <Toaster />
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          {/* <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-4">
              <small>Sign up with</small>
            </div>
            <div className="text-center">
              <Button
                className="btn-neutral btn-icon mr-4"
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
              {/* <small>Or sign up with credentials</small> */}
              <small>Inscrivez-vous avec vos identifiants</small>
            </div>
            <Form onSubmit={RegisterForm.handleSubmit}>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Nom et Prénom" type="text" 
                  name="name" {...RegisterForm.getFieldProps('name')}/>
                </InputGroup>
                {RegisterForm.errors.name && RegisterForm.touched.name ? 
                      <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                        <i className="ni ni-fat-remove" /> {RegisterForm.errors.name }
                  </span></p> : null}
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    name="email" {...RegisterForm.getFieldProps('email')}/>
                    </InputGroup>
                    {RegisterForm.errors.email && RegisterForm.touched.email ? 
                          <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                            <i className="ni ni-fat-remove" /> {RegisterForm.errors.email }
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
                    name="password"  {...RegisterForm.getFieldProps('password')}/>
                    </InputGroup>
                    {RegisterForm.errors.password && RegisterForm.touched.password ? 
                          <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                            <i className="ni ni-fat-remove" /> {RegisterForm.errors.password }
                      </span></p> : null}
              </FormGroup>
              {/* <div className="text-muted font-italic">
                <small>
                  password strength:{" "}
                  <span className="text-success font-weight-700">strong</span>
                </small>
              </div>
              <Row className="my-4">
                <Col xs="12">
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="customCheckRegister"
                      type="checkbox"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheckRegister"
                    >
                      <span className="text-muted">
                        I agree with the{" "}
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>
                </Col>
              </Row> */}
              <div className="text-center">
                <Button className="mt-4" color="primary" type="submit">
                  Créer un compte
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Register;
