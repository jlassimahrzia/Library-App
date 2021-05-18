import PageHeader from "components/Headers/PageHeader.jsx" 
import { useState , useEffect} from 'react'
// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col,
  } from "reactstrap";
import LocalStorageService from "services/LocalStorageService" 
import { useFormik } from 'formik'
function Profile (){
    const [user,setUser] = useState('');
    useEffect(() => {
      const user = LocalStorageService.getObject('user');
      setUser(user);
    }, [])
    // Add Form 
    const AddForm = useFormik({
        initialValues : {
            name: '',
            email: '',
            cin:'',
            DateNaissance:'',
            telephone:'',
            adresse:'',
            appartement:'',
            ville:'',
            codePostal:'',
            profession:''
        },
        onSubmit: (values,submitProps)  => {
           
        },
    })
    return (
        <>
        <PageHeader />
        <Container className="mt--7" fluid>
            <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
                <Card className="card-profile shadow">
                <Row className="justify-content-center">
                    <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                            alt="..."
                            className="rounded-circle"
                            src={`http://localhost:8000/api/images/${user.photo}`}
                        />
                        </a>
                    </div>
                    </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                    
                </CardHeader>
                <CardBody className="pt-0 pt-md-4">
                    <Row>
                    <div className="col">
                        <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                        
                        </div>
                    </div>
                    </Row>
                    <div className="text-center">
                    <h3>
                        {user.name}
                        <span className="font-weight-light">, {user.numCarte}</span>
                    </h3>
                    <div className="pt-md-0">
                        <hr className="my-4" />
                        <div className="h5 font-weight-300">
                            <i className="ni business_briefcase-24 mr-2" />
                            <b>Num CIN</b> {user.cin}
                        </div>
                        <div className="h5 font-weight-300">
                            <i className="ni business_briefcase-24 mr-2" />
                            <b>Date de Naissance</b> {user.DateNaissance}
                        </div>
                        <div className="h5 font-weight-300">
                            <i className="ni business_briefcase-24 mr-2" />
                            <b>Adresse</b> {user.adresse}
                        </div>
                        <div className="h5 font-weight-300">
                            <i className="ni business_briefcase-24 mr-2" />
                            {user.ville},{user.appartement},{user.codePostal}
                        </div>
                        <div className="h5 font-weight-300">
                            <i className="ni business_briefcase-24 mr-2" />
                            <b>Profession</b> {user.profession}
                        </div>
                        </div>
                    </div>
                </CardBody>
                </Card>
            </Col>
            <Col className="order-xl-1" xl="8">
                <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                    <Col xs="8">
                        <h3 className="mb-0">Changer vos données</h3>
                    </Col>
                    </Row>
                </CardHeader>
                <CardBody>
                <Form onSubmit={AddForm.handleSubmit}>
              <div className="modal-body">
                    <h6 className="heading-small text-muted mb-4">
                        Informations Générales
                    </h6>
                    <div className="pl-lg-4">
                    <Row>
                        <Col md="6">
                        <FormGroup>
                            <label className="form-control-label">Nom et Prenom</label>
                            <Input
                                className="form-control-alternative"
                                placeholder="Nom et Prenom" type="text" 
                                name="name" id="name"
                                {...AddForm.getFieldProps('name')}
                            />
                            {AddForm.errors.name && AddForm.touched.name ? 
                            <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                                <i className="ni ni-fat-remove" /> {AddForm.errors.name }
                            </span></p> : null}
                        </FormGroup>
                        </Col>
                        <Col md="6">
                        <FormGroup>
                            <label className="form-control-label">Email</label>
                            <Input
                                className="form-control-alternative"
                                placeholder="Email" type="email"
                                name="email" id="email"
                                {...AddForm.getFieldProps('email')}
                            /> 
                            {AddForm.errors.email && AddForm.touched.email ? 
                            <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                                <i className="ni ni-fat-remove" /> {AddForm.errors.email }
                            </span></p> : null}
                        </FormGroup>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col md="6">
                        <FormGroup>
                            <label className="form-control-label">Date de Naissance</label>
                            <Input
                                className="form-control-alternative"
                                placeholder="Date de Naissance" type="date"
                                name="DateNaissance" id="DateNaissance"
                                {...AddForm.getFieldProps('DateNaissance')}
                            />
                            {AddForm.errors.DateNaissance && AddForm.touched.DateNaissance ? 
                            <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                                <i className="ni ni-fat-remove" /> {AddForm.errors.DateNaissance }
                            </span></p> : null}
                        </FormGroup>
                        </Col>
                        <Col md="6">
                        <FormGroup>
                            <label className="form-control-label">Télèphone</label>
                            <Input
                                className="form-control-alternative"
                                placeholder="Telephone" type="number"
                                name="telephone" id="telephone"
                                {...AddForm.getFieldProps('telephone')}
                            /> 
                            {AddForm.errors.telephone && AddForm.touched.telephone ? 
                            <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                                <i className="ni ni-fat-remove" /> {AddForm.errors.telephone }
                            </span></p> : null}
                        </FormGroup>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col md="6">
                        <FormGroup>
                            <label className="form-control-label">Photo</label>
                            <Input
                                className="form-control-alternative"
                                type="file"
                                name="photo" id="photo"
                                //onChange={ (e) => handleImage(e)}
                            />
                           {/* { FileError != null ? 
                            <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                                <i className="ni ni-fat-remove" /> { FileError }
                           </span></p> : null}*/}
                        </FormGroup>
                        </Col>
                        <Col md="6">
                        <FormGroup>
                            <label className="form-control-label">CIN</label>
                            <Input
                                className="form-control-alternative"
                                placeholder="CIN" type="number"
                                name="cin" id="cin"
                                {...AddForm.getFieldProps('cin')}
                            />
                            {AddForm.errors.cin && AddForm.touched.cin ? 
                            <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                                <i className="ni ni-fat-remove" /> {AddForm.errors.cin }
                            </span></p> : null}
                        </FormGroup>
                        </Col>
                    </Row>
                    </div>
                    <h6 className="heading-small text-muted mb-4">
                        Profession
                    </h6>
                    <div className="pl-lg-4">
                    <Row>
                        <Col md="12">
                        <FormGroup>
                            <label className="form-control-label">profession</label>
                            <Input type="text" name="profession" id="profession" {...AddForm.getFieldProps('profession')}
                            placeholder="profession">
                            </Input>
                            {AddForm.errors.profession && AddForm.touched.profession ? 
                            <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                                <i className="ni ni-fat-remove" /> {AddForm.errors.profession }
                            </span></p> : null}
                        </FormGroup>
                        </Col>
                    </Row> 
                    </div>
                    <h6 className="heading-small text-muted mb-4">
                        Adresses
                    </h6>
                    <div className="pl-lg-4">
                    <Row>
                        <Col md="6">
                        <FormGroup>
                            <label className="form-control-label">Adresse</label>
                            <Input
                                className="form-control-alternative"
                                placeholder="Adresse" type="text"
                                name="adresse" id="adresse"
                                {...AddForm.getFieldProps('adresse')}
                            />
                            {AddForm.errors.adresse && AddForm.touched.adresse ? 
                            <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                                <i className="ni ni-fat-remove" /> {AddForm.errors.adresse }
                            </span></p> : null}
                        </FormGroup>
                        </Col>
                        <Col md="6">
                        <FormGroup>
                            <label className="form-control-label">Appartement</label>
                            <Input
                                className="form-control-alternative"
                                placeholder="Appartement" type="text"
                                name="appartement" id="appartement"
                                {...AddForm.getFieldProps('appartement')}
                            />
                            {AddForm.errors.appartement && AddForm.touched.appartement ? 
                            <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                                <i className="ni ni-fat-remove" /> {AddForm.errors.appartement }
                            </span></p> : null}
                        </FormGroup>
                        </Col>
                    </Row> 
                    <br/>
                    <Row>
                        <Col md="6">
                        <FormGroup>
                            <label className="form-control-label">Ville</label>
                            <Input
                                className="form-control-alternative"
                                placeholder="Ville" type="text"
                                name="ville" id="ville"
                                {...AddForm.getFieldProps('ville')}
                            />
                            {AddForm.errors.ville && AddForm.touched.ville ? 
                            <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                                <i className="ni ni-fat-remove" /> {AddForm.errors.ville }
                            </span></p> : null}
                        </FormGroup>
                        </Col>
                        <Col md="6">
                        <FormGroup>
                            <label className="form-control-label">Code Postal</label>
                            <Input
                                className="form-control-alternative"
                                placeholder="Code Postal" type="number"
                                name="codePostal" id="codePostal"
                                {...AddForm.getFieldProps('codePostal')}
                            />
                            {AddForm.errors.codePostal && AddForm.touched.codePostal ? 
                            <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                                <i className="ni ni-fat-remove" /> {AddForm.errors.codePostal }
                            </span></p> : null}
                        </FormGroup>
                        </Col>
                    </Row>
                   </div>
                   <h6 className="heading-small text-muted mb-4">
                        Changer Mot de passe
                    </h6>
                    <div className="pl-lg-4">
                    <Row>
                        <Col md="6">
                        <FormGroup>
                            <label className="form-control-label">Ancien Mot de passe</label>
                            <Input
                                className="form-control-alternative"
                                placeholder="Ancien Mot de passe" type="text"
                                name="adresse" id="adresse"
                                {...AddForm.getFieldProps('adresse')}
                            />
                            {AddForm.errors.adresse && AddForm.touched.adresse ? 
                            <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                                <i className="ni ni-fat-remove" /> {AddForm.errors.adresse }
                            </span></p> : null}
                        </FormGroup>
                        </Col>
                        <Col md="6">
                        <FormGroup>
                            <label className="form-control-label">Nouveau Mot de passe</label>
                            <Input
                                className="form-control-alternative"
                                placeholder="Nouveau Mot de passe" type="text"
                                name="appartement" id="appartement"
                                {...AddForm.getFieldProps('appartement')}
                            />
                            {AddForm.errors.appartement && AddForm.touched.appartement ? 
                            <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                                <i className="ni ni-fat-remove" /> {AddForm.errors.appartement }
                            </span></p> : null}
                        </FormGroup>
                        </Col>
                    </Row>
                    </div>
                   </div>
                </Form>
                </CardBody>
                </Card>
            </Col>
            </Row>
        </Container>
        </>
    )
}
export default Profile;