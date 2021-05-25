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
import * as Yup from 'yup'
function Profile (){
    const [user,setUser] = useState('');
    const [FileError , setFileError] = useState(null)
    const [photo , setPhoto] = useState('')
    useEffect(() => {
      const user = LocalStorageService.getObject('user');
      setUser(user);
    }, [])
    const handleImage = (e) => {
        setFileError(null);
        let files = e.target.files || e.dataTransfer.files;
        console.log(files[0])
        if (!files.length){
            return;
        }
        else if ((files[0].type !== "image/jpeg") && (files[0].type !== "image/png")){
                console.log(files[0].type)
                setFileError('Que les images .png , .jpeg ou .jpg sont acceptées');
                console.log(FileError)
                return;
        }
        else if (files[0].size > 20e6) {
                setFileError('Image de très grande taille');
                console.log("handleImage error 2")
                return;
        }
        console.log("ok")
        createImage(files[0]);
    }
    const createImage = (photo) => {
        let reader = new FileReader();
        reader.onload = (e) => {
            setPhoto(e.target.result)
        };
        reader.readAsDataURL(photo);
    }
    const validationSchema = Yup.object({
        cin: Yup.number().required("Il faut remplir le champ CIN").test('len', 'Le num de CIN doit étre de 8 chiffres', (val) =>  { if(val) return val.toString().length === 8; }),
        DateNaissance: Yup.date().required('Il faut remplir le champ Date de Naissance'),
        telephone: Yup.number().required("Il faut remplir le champ num de télèphone").test('len', 'Le num de télèphone doit étre de 8 chiffres', (val) => { if(val) return val.toString().length === 8; } ),
        adresse: Yup.string().required('Il faut remplir le champ adresse'),
        appartement: Yup.string().required('Il faut remplir le champ appartement'),
        ville: Yup.string().required('Il faut remplir le champ ville'),
        codePostal: Yup.number().required("Il faut remplir le champ Code Postal").test('len', 'Le num de CIN doit étre de 4 chiffres',(val) => { if(val) return val.toString().length === 4; }  ),
        profession: Yup.string().required('Il faut selectionner le profession')
    })
    // Add Form 
    const ProfilForm = useFormik({
        initialValues : {
            name: user ? user.name : "",
            email: user ? user.email : "",
            cin: user ? user.cin : "",
            numCarte: user ? user.numCarte : "",
            DateNaissance: user ? user.DateNaissance : "",
            telephone: user ? user.telephone : "",
            adresse: user ? user.adresse : "",
            appartement: user ? user.appartement : "",
            ville: user ? user.ville : "",
            codePostal: user ? user.codePostal : "",
            profession: user ? user.profession : "",
            newpassword : '',
            oldpassword : ''
        },
        onSubmit: (values,submitProps)  => {
           
        },
        validationSchema,
        enableReinitialize:true
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
                <Form onSubmit={ProfilForm.handleSubmit}>
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
                                {...ProfilForm.getFieldProps('name')}
                            />
                            {ProfilForm.errors.name && ProfilForm.touched.name ? 
                            <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                                <i className="ni ni-fat-remove" /> {ProfilForm.errors.name }
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
                                {...ProfilForm.getFieldProps('email')}
                            /> 
                            {ProfilForm.errors.email && ProfilForm.touched.email ? 
                            <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                                <i className="ni ni-fat-remove" /> {ProfilForm.errors.email }
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
                                {...ProfilForm.getFieldProps('DateNaissance')}
                            />
                            {ProfilForm.errors.DateNaissance && ProfilForm.touched.DateNaissance ? 
                            <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                                <i className="ni ni-fat-remove" /> {ProfilForm.errors.DateNaissance }
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
                                {...ProfilForm.getFieldProps('telephone')}
                            /> 
                            {ProfilForm.errors.telephone && ProfilForm.touched.telephone ? 
                            <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                                <i className="ni ni-fat-remove" /> {ProfilForm.errors.telephone }
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
                                onChange={ (e) => handleImage(e)}
                            />
                           {user !== null ? <a href={`http://localhost:8000/images/${user.photo}`} target="_blank" rel="noreferrer">{user.photo}</a> : null}
                            { FileError != null ? 
                            <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                                <i className="ni ni-fat-remove" /> { FileError }
                            </span></p> : null}
                        </FormGroup>
                        </Col>
                        <Col md="6">
                        <FormGroup>
                            <label className="form-control-label">CIN</label>
                            <Input
                                className="form-control-alternative"
                                placeholder="CIN" type="number"
                                name="cin" id="cin"
                                {...ProfilForm.getFieldProps('cin')}
                            />
                            {ProfilForm.errors.cin && ProfilForm.touched.cin ? 
                            <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                                <i className="ni ni-fat-remove" /> {ProfilForm.errors.cin }
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
                            <Input type="text" name="profession" id="profession" {...ProfilForm.getFieldProps('profession')}
                            placeholder="profession">
                            </Input>
                            {ProfilForm.errors.profession && ProfilForm.touched.profession ? 
                            <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                                <i className="ni ni-fat-remove" /> {ProfilForm.errors.profession }
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
                                {...ProfilForm.getFieldProps('adresse')}
                            />
                            {ProfilForm.errors.adresse && ProfilForm.touched.adresse ? 
                            <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                                <i className="ni ni-fat-remove" /> {ProfilForm.errors.adresse }
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
                                {...ProfilForm.getFieldProps('appartement')}
                            />
                            {ProfilForm.errors.appartement && ProfilForm.touched.appartement ? 
                            <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                                <i className="ni ni-fat-remove" /> {ProfilForm.errors.appartement }
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
                                {...ProfilForm.getFieldProps('ville')}
                            />
                            {ProfilForm.errors.ville && ProfilForm.touched.ville ? 
                            <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                                <i className="ni ni-fat-remove" /> {ProfilForm.errors.ville }
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
                                {...ProfilForm.getFieldProps('codePostal')}
                            />
                            {ProfilForm.errors.codePostal && ProfilForm.touched.codePostal ? 
                            <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                                <i className="ni ni-fat-remove" /> {ProfilForm.errors.codePostal }
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
                                name="oldpassword" id="oldpassword"
                                {...ProfilForm.getFieldProps('oldpassword')}
                            />
                            {ProfilForm.errors.oldpassword && ProfilForm.touched.oldpassword ? 
                            <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                                <i className="ni ni-fat-remove" /> {ProfilForm.errors.oldpassword }
                            </span></p> : null}
                        </FormGroup>
                        </Col>
                        <Col md="6">
                        <FormGroup>
                            <label className="form-control-label">Nouveau Mot de passe</label>
                            <Input
                                className="form-control-alternative"
                                placeholder="Nouveau Mot de passe" type="text"
                                name="newpassword" id="newpassword"
                                {...ProfilForm.getFieldProps('newpassword')}
                            />
                            {ProfilForm.errors.newpassword && ProfilForm.touched.newpassword ? 
                            <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                                <i className="ni ni-fat-remove" /> {ProfilForm.errors.newpassword }
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