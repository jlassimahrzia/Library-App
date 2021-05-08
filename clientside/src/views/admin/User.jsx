import { Fragment , useState , useEffect } from 'react'
import PageHeader from "components/Headers/PageHeader.jsx";
import {
    DropdownMenu,DropdownItem, UncontrolledDropdown, DropdownToggle,
    Pagination,PaginationItem,PaginationLink,
    Table,Container,Modal,
    Row,Col,
    Button,
    FormGroup,InputGroup,InputGroupAddon,InputGroupText,Form,Input
} from "reactstrap";
import { useFormik } from 'formik'
import UserService from 'services/UserService'
import * as Yup from 'yup'
import { Toaster } from 'react-hot-toast';
function User(){
    const [addModal , setAddModal] = useState(false)
    const [updateModal , setUpdateModal] = useState(false)
    const [deleteModal , setDeleteModal] = useState(false)
    const [userUpdate, setUserUpdate] = useState(null)
    const [id_delete , setDeleteId] = useState(null)
    const [photo , setPhoto] = useState('')
    const [FileError , setFileError] = useState(null)
    // tabs
    const [isActive, setActive] = useState(false)
    const [internUsers, setInternUsers] = useState([])
    const [externUsers, setExternUsers] = useState([])
    // Pagination intern users 
    const [pageSize] = useState(2)
    const [currentPage,setCurrentPage] = useState(0)
    const [pagesCount,setPagesCount] = useState(0)
    // Pagination extern users 
    const [pageSize1] = useState(2)
    const [currentPage1,setCurrentPage1] = useState(0)
    const [pagesCount1,setPagesCount1] = useState(0)
    // Search
    const [search, setSearch] = useState("");
    // load list of categories
    const retrieveInternUsers = async () => {
        const data = await UserService.getInternUser();
        setInternUsers([...data])
    }
    const retrieveExternUsers = async () => {
        const tab = await UserService.getExternUser();
        setExternUsers([...tab])
    }
    // Did Mount
    useEffect(() => {
        retrieveInternUsers();
        retrieveExternUsers();
    }, [])
    // Tabs
    const toggleClass = () => {
        setActive(!isActive);
    };
    // DidUpdate
    useEffect(() => {

    }, [addModal , updateModal , deleteModal , userUpdate , id_delete , photo,FileError,
        internUsers,externUsers,isActive,pageSize , currentPage ,
    photo, pagesCount,search]);
    // Pagination
    const handleClick = (e, index) => {
        e.preventDefault();
        setCurrentPage(index);
    }
    const handleClick1 = (e, index) => {
        e.preventDefault();
        setCurrentPage1(index);
    }
    useEffect(() => {
      let pages_number = Math.ceil(internUsers.length / pageSize) ;
      setPagesCount(pages_number);
      let pages_number1 = Math.ceil(externUsers.length / pageSize1) ;
      setPagesCount1(pages_number1);
    }, [internUsers , pagesCount , pageSize, externUsers , pagesCount1 , pageSize1])
    // Add Modal
    const toggleAddModal = () => {
        setAddModal(!addModal);
    };
    // Update Modal
    const OpenUpdateModal = (item) => {
        setUpdateModal(true)
        setUserUpdate(item)
    };
    const CloseUpdateModal = () => {
        setUpdateModal(false)
    };
    // Delete Modal
    const OpenDeleteModal = (id) => {
        setDeleteId(id)
        setDeleteModal(true)
    };
    const CloseDeleteModal = () => {
        setDeleteModal(false)
    };
    const delete_user = () => {
        UserService.delete(id_delete);
        CloseDeleteModal();
        retrieveInternUsers();
      };
    // Random Number of Cart Numbe
    const generateNumber = () => {
        const min = 10000000 ;
        const max = 99999999;
        return Math.floor(Math.random()*(max-min+1)+min)
    }
    // Add Form 
    const createImage = (photo) => {
        let reader = new FileReader();
        reader.onload = (e) => {
            setPhoto(e.target.result)
        };
        reader.readAsDataURL(photo);
    }
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
    const validationSchema = Yup.object({
        cin: Yup.number().required("Il faut remplir le champ CIN").test('len', 'Le num de CIN doit étre de 8 chiffres', (val) =>  { if(val) return val.toString().length === 8; }),
        numInscription: Yup.string().required('Il faut remplir le champ num d\'nscription'),
        DateNaissance: Yup.date().required('Il faut remplir le champ Date de Naissance'),
        telephone: Yup.number().required("Il faut remplir le champ num de télèphone").test('len', 'Le num de télèphone doit étre de 8 chiffres', (val) => { if(val) return val.toString().length === 8; } ),
        adresse: Yup.string().required('Il faut remplir le champ adresse'),
        appartement: Yup.string().required('Il faut remplir le champ appartement'),
        ville: Yup.string().required('Il faut remplir le champ ville'),
        codePostal: Yup.number().required("Il faut remplir le champ Code Postal").test('len', 'Le num de CIN doit étre de 4 chiffres',(val) => { if(val) return val.toString().length === 4; }  ),
        niveau: Yup.string().required('Il faut selectionner le niveau'),
        classe: Yup.string().required('Il faut selectionner la classe'),    
    })
    // Add Form 
    const AddForm = useFormik({
        initialValues : {
            name: '',
            email: '',
            cin:'',
            numCarte: generateNumber(),
            numInscription:'',
            DateNaissance:'',
            telephone:'',
            adresse:'',
            appartement:'',
            ville:'',
            codePostal:'',
            niveau:'',
            classe:''
        },
        onSubmit: (values,submitProps)  => {
            UserService.add(values,photo,submitProps)
            toggleAddModal()
            retrieveInternUsers();
        },
        validationSchema
    })
    // Update Form 
    const UpdateForm = useFormik({
        initialValues : {
            name: userUpdate ? userUpdate.name : "",
            email: userUpdate ? userUpdate.email : "",
            cin: userUpdate ? userUpdate.cin : "",
            numCarte: userUpdate ? userUpdate.numCarte : "",
            numInscription: userUpdate ? userUpdate.numInscription : "",
            DateNaissance: userUpdate ? userUpdate.DateNaissance : "",
            telephone: userUpdate ? userUpdate.telephone : "",
            adresse: userUpdate ? userUpdate.adresse : "",
            appartement: userUpdate ? userUpdate.appartement : "",
            ville: userUpdate ? userUpdate.ville : "",
            codePostal: userUpdate ? userUpdate.codePostal : "",
            niveau: userUpdate ? userUpdate.niveau : "",
            classe: userUpdate ? userUpdate.classe : ""
        },
        onSubmit: (values,submitProps)  => {
            UserService.update(userUpdate.id ,values,photo,submitProps)
            CloseUpdateModal()
            retrieveInternUsers();
        },
        validationSchema,
        enableReinitialize:true
    })
    // Search
    const handleInput = async(value) =>{
        setSearch(value)
        const data = await UserService.search({"search" : search });
        setInternUsers([...data])
        if(value === "")
            retrieveInternUsers();
    }
    return (
        <Fragment>
            <PageHeader />
            <Toaster />
            <Container className="mt--7" fluid>
            <div>
                <Row>
                    <Col xs="4">
                        <Button className="btn-icon btn-3" color="primary" type="button"
                            onClick={toggleAddModal}>
                                <span className="btn-inner--icon">
                                    <i className="ni ni-fat-add" />
                                </span>
                                <span className="btn-inner--text">Ajouter</span>
                        </Button>
                    </Col>
                    <Col className="text-right" xs="8">
                        <FormGroup>
                        <InputGroup className="input-group-alternative mb-4">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                            <i className="ni ni-zoom-split-in" />
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input
                            className="form-control-alternative"
                            placeholder="Chercher par Nom ou email ou CIN ou Num de carte ou Num d'inscription ou nivieau ou classe ...."
                            type="text"
                            value={search}
                            onChange={e => handleInput(e.target.value)}
                        />
                        </InputGroup>
                        </FormGroup> 
                    </Col> 
                </Row>
            </div>
            <Row>
            <div className="col">    
                    <div className="nav-wrapper">
                        <ul className="nav nav-pills nav-fill flex-column flex-md-row" id="tabs-icons-text" role="tablist">
                            <li className="nav-item" onClick={toggleClass} >
                                <a className={!isActive ? "nav-link mb-sm-3 mb-md-0 active": "nav-link mb-sm-3 mb-md-0"} id="intern-users-tab" data-toggle="tab" 
                                href="#intern-users-1"
                                role="tab" aria-controls="intern-users-1" aria-selected="true">
                                    <i className="ni ni-bold-down mr-2"></i>Emprunteurs</a>
                            </li>
                            <li className="nav-item" onClick={toggleClass} >
                                <a className={isActive ? "nav-link mb-sm-3 mb-md-0 active": "nav-link mb-sm-3 mb-md-0"} id="extern-users-tab" data-toggle="tab"
                                href="#extern-users-1" 
                                role="tab" aria-controls="extern-users-1" aria-selected="false">
                                    <i className="ni ni-bold-down mr-2"></i>Utilisateurs Externes</a>
                            </li>

                        </ul>
                    </div> 
                <div class="card shadow">
                    <div class="card-body">
                        <div className="tab-content" id="myTabContent">
                            <div className={!isActive ? "tab-pane fade show active": "tab-pane fade "}  id="intern-users-1" role="tabpanel"aria-labelledby="intern-users-tab">
                            <div className="card-header">
                                <h3 className="mb-0">Liste Des Emprunteurs</h3>
                            </div>
                            <div className="Card-body">
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                <tr>
                                    <th scope="col">Photo</th>
                                    <th scope="col">Nom et Prenom </th>
                                    <th scope="col">Email</th>
                                    <th scope="col">CIN</th>  
                                    <th scope="col">Num Carte</th>
                                    <th scope="col">Num Inscription</th>
                                    <th scope="col">Date de Naissance</th>
                                    <th scope="col">Telephone</th>
                                    <th scope="col">Adresse</th>
                                    <th scope="col">Appartement</th>
                                    <th scope="col">Ville</th>
                                    <th scope="col">Code Postal</th>
                                    <th scope="col">Niveau</th>
                                    <th scope="col">Classe</th>
                                    <th scope="col" />
                                </tr>
                                </thead>
                                <tbody>
                                { internUsers.slice(currentPage * pageSize,(currentPage + 1) * pageSize).map((item,index) => (
                                <tr  key={index}>
                                    <td>
                                        <img style={{width:"100%"}}
                                            alt="..."
                                            src={`http://localhost:8000/api/images/${item.photo}`}
                                        />
                                    </td>
                                    <td>
                                        {item.name}
                                    </td>
                                    <td>
                                        {item.email}
                                    </td>
                                    <td>
                                        {item.cin}
                                    </td>  
                                    <td>
                                        {item.numCarte}
                                    </td>
                                    <td>
                                        {item.numInscription}
                                    </td>
                                    <td>
                                        {item.DateNaissance}
                                    </td>
                                    <td>
                                        {item.telephone} 
                                    </td> 
                                    <td>
                                        {item.adresse}
                                    </td> 
                                    <td>
                                        {item.appartement}
                                    </td> 
                                    <td>
                                        {item.ville}
                                    </td>    
                                    <td>
                                        {item.codePostal}
                                    </td> 
                                    <td>
                                        {item.niveau}
                                    </td>  
                                    <td>
                                        {item.classe}
                                    </td>        
                                    <td className="text-right">
                                    <UncontrolledDropdown>
                                        <DropdownToggle
                                        className="btn-icon-only text-light"
                                        role="button"
                                        size="sm"
                                        color=""
                                        onClick={(e) => e.preventDefault()}
                                        >
                                        <i className="fas fa-ellipsis-v" />
                                        </DropdownToggle>
                                        <DropdownMenu className="dropdown-menu-arrow" right>
                                        <DropdownItem
                                            onClick={() => OpenUpdateModal(item)}
                                        >
                                            Modifier
                                        </DropdownItem>
                                        <DropdownItem
                                        onClick={() => OpenDeleteModal(item.id)}
                                        >
                                            Supprimer
                                        </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                    </td>
                                </tr>
                                ))}
                                </tbody>
                            </Table>
                            </div>
                            {/* Pagination */}
                            <div className="Card-footer">
                            <nav aria-label="...">
                                <br/>
                                <Pagination aria-label="Page navigation example">
                                <PaginationItem disabled={currentPage <= 0}>
                                <PaginationLink
                                    onClick={e => handleClick(e, currentPage - 1)}
                                    previous
                                />
                                </PaginationItem>
                                {[...Array(pagesCount)].map((page, i) => 
                                <PaginationItem active={i === currentPage} key={i}>
                                    <PaginationLink onClick={e => handleClick(e, i)}>
                                    {i + 1}
                                    </PaginationLink>
                                </PaginationItem>
                                )}
                                <PaginationItem disabled={currentPage >= pagesCount - 1}>
                                <PaginationLink
                                    onClick={e => handleClick(e, currentPage + 1)}
                                    next
                                />
                                </PaginationItem>
                                </Pagination> 
                            </nav> 
                            </div>
                            </div>
                            <div className={isActive ? "tab-pane fade show active": "tab-pane fade "}  id="extern-users-1" role="tabpanel" aria-labelledby="extern-users-tab">
                            <div className="card-header">
                                <h3 className="mb-0">Liste Des Utlisateurs Externes</h3>
                            </div>
                            <div className="Card-body">
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                <tr>
                                    <th scope="col">Nom et Prenom </th>
                                    <th scope="col">Email</th>
                                </tr>
                                </thead>
                                <tbody>
                                { externUsers.slice(currentPage1 * pageSize1,(currentPage1 + 1) * pageSize1).map((item,index) => (
                                <tr  key={index}>
                                    <td>
                                        {item.name}
                                    </td>
                                    <td>
                                        {item.email}
                                    </td>
                                </tr>
                                ))}
                                </tbody>
                            </Table>
                            </div>
                            <div className="Card-footer">
                            <nav aria-label="...">
                                <br/>
                                <Pagination aria-label="Page navigation example ">
                                <PaginationItem disabled={currentPage1 <= 0}>
                                <PaginationLink
                                    onClick={e => handleClick1(e, currentPage1 - 1)}
                                    previous
                                />
                                </PaginationItem>
                                {[...Array(pagesCount1)].map((page, i) => 
                                <PaginationItem active={i === currentPage1} key={i}>
                                    <PaginationLink onClick={e => handleClick1(e, i)}>
                                    {i + 1}
                                    </PaginationLink>
                                </PaginationItem>
                                )}
                                <PaginationItem disabled={currentPage1 >= pagesCount1 - 1}>
                                <PaginationLink
                                    onClick={e => handleClick1(e, currentPage1 + 1)}
                                    next
                                />
                                </PaginationItem>
                                </Pagination>
                            </nav> 
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Add user */}
            <Modal className="modal-dialog-centered"
            size="lg" isOpen={addModal} toggle={toggleAddModal} >
              <div className="modal-header">
                <h4 className="modal-title" id="modal-title-default">
                  Ajouter un nouveau emprunteur
                </h4>
                <button
                  aria-label="Close"
                  className="close"
                  data-dismiss="modal"
                  type="button"
                  onClick={toggleAddModal}
                >
                  <span aria-hidden={true}>×</span>
                </button>
              </div>
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
                                onChange={ (e) => handleImage(e)}
                            />
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
                        Informations Carte
                    </h6>
                    <div className="pl-lg-4">
                    <Row>
                        <Col md="6">
                        <FormGroup>
                            <label className="form-control-label">NUM Inscription</label>
                            <Input
                                className="form-control-alternative"
                                placeholder="NUM Inscription" type="text"
                                name="numInscription" id="numInscription"
                                {...AddForm.getFieldProps('numInscription')}
                            />
                            {AddForm.errors.numInscription && AddForm.touched.numInscription ? 
                            <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                                <i className="ni ni-fat-remove" /> {AddForm.errors.numInscription }
                            </span></p> : null}
                        </FormGroup>
                        </Col>
                        <Col md="6">
                        <FormGroup>
                            <label className="form-control-label">NUM Carte</label>
                            <Input
                                className="form-control-alternative"
                                placeholder="NUM Carte" type="number"
                                name="numCarte" id="numCarte"
                                {...AddForm.getFieldProps('numCarte')}
                            /> 
                        </FormGroup>
                        </Col>
                    </Row>
                    </div>
                    <h6 className="heading-small text-muted mb-4">
                        Classes
                    </h6>
                    <div className="pl-lg-4">
                    <Row>
                        <Col md="6">
                        <FormGroup>
                            <label className="form-control-label">Niveau</label>
                            <Input type="select" name="niveau" id="niveau" {...AddForm.getFieldProps('niveau')}>
                                <option hidden>Selectionner ...</option> 
                                <option value="II1">II1</option>
                                <option value="II2">II2</option>
                                <option value="II3">II3</option>
                            </Input>
                            {AddForm.errors.niveau && AddForm.touched.niveau ? 
                            <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                                <i className="ni ni-fat-remove" /> {AddForm.errors.niveau }
                            </span></p> : null}
                        </FormGroup>
                        </Col>
                        <Col md="6">
                        <FormGroup>
                            <label className="form-control-label">Classe</label>
                            <Input type="select" name="classe" id="classe" {...AddForm.getFieldProps('classe')}>
                                <option hidden>Selectionner ...</option> 
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                                <option value="E">E</option>
                                <option value="F">F</option>
                            </Input>
                            {AddForm.errors.classe && AddForm.touched.classe ? 
                            <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                                <i className="ni ni-fat-remove" /> {AddForm.errors.classe }
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
              </div>
              <div className="modal-footer">
                <Button color="primary" type="submit" >{/*disabled={!(AddForm.dirty && AddForm.isValid)} */}
                  Ajouter
                </Button>
                <Button className="ml-auto" color="link" data-dismiss="modal" type="button" onClick={toggleAddModal}  >
                  Annuler
                </Button>
              </div>
            </Form>
            </Modal>
            <Modal className="modal-dialog-centered"
            size="lg" isOpen={updateModal} toggle={CloseUpdateModal} >
              <div className="modal-header">
                <h4 className="modal-title" id="modal-title-default">
                  Modifier un emprunteur
                </h4>
                <button
                  aria-label="Close"
                  className="close"
                  data-dismiss="modal"
                  type="button"
                  onClick={CloseUpdateModal}
                >
                  <span aria-hidden={true}>×</span>
                </button>
              </div>
              <Form onSubmit={UpdateForm.handleSubmit}>
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
                                {...UpdateForm.getFieldProps('name')}
                            />
                            {UpdateForm.errors.name && UpdateForm.touched.name ? 
                            <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                                <i className="ni ni-fat-remove" /> {UpdateForm.errors.name }
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
                                {...UpdateForm.getFieldProps('email')}
                            /> 
                            {UpdateForm.errors.email && UpdateForm.touched.email ? 
                            <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                                <i className="ni ni-fat-remove" /> {UpdateForm.errors.email }
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
                                {...UpdateForm.getFieldProps('DateNaissance')}
                            />
                            {UpdateForm.errors.DateNaissance && UpdateForm.touched.DateNaissance ? 
                            <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                                <i className="ni ni-fat-remove" /> {UpdateForm.errors.DateNaissance }
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
                                {...UpdateForm.getFieldProps('telephone')}
                            /> 
                            {UpdateForm.errors.telephone && UpdateForm.touched.telephone ? 
                            <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                                <i className="ni ni-fat-remove" /> {UpdateForm.errors.telephone }
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
                            {userUpdate !== null ? <a href={`http://localhost:8000/images/${userUpdate.photo}`} target="_blank" rel="noreferrer">{userUpdate.photo}</a> : null}
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
                                {...UpdateForm.getFieldProps('cin')}
                            />
                            {UpdateForm.errors.cin && UpdateForm.touched.cin ? 
                            <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                                <i className="ni ni-fat-remove" /> {UpdateForm.errors.cin }
                            </span></p> : null}
                        </FormGroup>
                        </Col>
                    </Row>
                    </div>
                    <h6 className="heading-small text-muted mb-4">
                        Informations Carte
                    </h6>
                    <div className="pl-lg-4">
                    <Row>
                        <Col md="6">
                        <FormGroup>
                            <label className="form-control-label">NUM Inscription</label>
                            <Input
                                className="form-control-alternative"
                                placeholder="NUM Inscription" type="text"
                                name="numInscription" id="numInscription"
                                {...UpdateForm.getFieldProps('numInscription')}
                            />
                            {UpdateForm.errors.numInscription && UpdateForm.touched.numInscription ? 
                            <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                                <i className="ni ni-fat-remove" /> {UpdateForm.errors.numInscription }
                            </span></p> : null}
                        </FormGroup>
                        </Col>
                        <Col md="6">
                        <FormGroup>
                            <label className="form-control-label">NUM Carte</label>
                            <Input
                                className="form-control-alternative"
                                placeholder="NUM Carte" type="number"
                                name="numCarte" id="numCarte"
                                {...UpdateForm.getFieldProps('numCarte')}
                                disabled
                            /> 
                            <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                                 Vous avez pas le droit de modifier la num de carte
                            </span></p>
                        </FormGroup>
                        </Col>
                    </Row>
                    </div>
                    <h6 className="heading-small text-muted mb-4">
                        Classes
                    </h6>
                    <div className="pl-lg-4">
                    <Row>
                        <Col md="6">
                        <FormGroup>
                            <label className="form-control-label">Niveau</label>
                            <Input type="select" name="niveau" id="niveau" {...UpdateForm.getFieldProps('niveau')}>
                                <option hidden>Selectionner ...</option> 
                                <option value="II1">II1</option>
                                <option value="II2">II2</option>
                                <option value="II3">II3</option>
                            </Input>
                            {UpdateForm.errors.niveau && UpdateForm.touched.niveau ? 
                            <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                                <i className="ni ni-fat-remove" /> {UpdateForm.errors.niveau }
                            </span></p> : null}
                        </FormGroup>
                        </Col>
                        <Col md="6">
                        <FormGroup>
                            <label className="form-control-label">Classe</label>
                            <Input type="select" name="classe" id="classe" {...UpdateForm.getFieldProps('classe')}>
                                <option hidden>Selectionner ...</option> 
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                                <option value="E">E</option>
                                <option value="F">F</option>
                            </Input>
                            {UpdateForm.errors.classe && UpdateForm.touched.classe ? 
                            <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                                <i className="ni ni-fat-remove" /> {UpdateForm.errors.classe }
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
                                {...UpdateForm.getFieldProps('adresse')}
                            />
                            {UpdateForm.errors.adresse && UpdateForm.touched.adresse ? 
                            <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                                <i className="ni ni-fat-remove" /> {UpdateForm.errors.adresse }
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
                                {...UpdateForm.getFieldProps('appartement')}
                            />
                            {UpdateForm.errors.appartement && UpdateForm.touched.appartement ? 
                            <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                                <i className="ni ni-fat-remove" /> {UpdateForm.errors.appartement }
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
                                {...UpdateForm.getFieldProps('ville')}
                            />
                            {UpdateForm.errors.ville && UpdateForm.touched.ville ? 
                            <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                                <i className="ni ni-fat-remove" /> {UpdateForm.errors.ville }
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
                                {...UpdateForm.getFieldProps('codePostal')}
                            />
                            {UpdateForm.errors.codePostal && UpdateForm.touched.codePostal ? 
                            <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                                <i className="ni ni-fat-remove" /> {UpdateForm.errors.codePostal }
                            </span></p> : null}
                        </FormGroup>
                        </Col>
                    </Row>   
                    </div>  
              </div>
              <div className="modal-footer">
                <Button color="primary" type="submit" >{/*disabled={!(AddForm.dirty && AddForm.isValid)} */}
                  Modifier
                </Button>
                <Button className="ml-auto" color="link" data-dismiss="modal" type="button" onClick={CloseUpdateModal}  >
                  Annuler
                </Button>
              </div>
            </Form>
            </Modal>
            {/* Delete Modal*/} 
            <Modal
              className="modal-dialog-centered modal-danger"
              contentClassName="bg-gradient-danger"
              isOpen={deleteModal}
              toggle={CloseDeleteModal}
            >
              <div className="modal-header">
                <h6 className="modal-title" id="modal-title-notification">
                  Supprimer un emprunteur
                </h6>
                <button
                  aria-label="Close"
                  className="close"
                  data-dismiss="modal"
                  type="button"
                  onClick={CloseDeleteModal}
                >
                  <span aria-hidden={true}>×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="py-3 text-center">
                  <i className="ni ni-fat-remove ni-4x" />
                  <h4 className="heading mt-4">êtes-vous sûr!</h4>
                  <p>
                    Vous ne pourrez pas récupérer cet emprunteur
                  </p>
                </div>
              </div>
              <div className="modal-footer">
                <Button className="btn-white" color="default" type="button"
                onClick={delete_user}>
                  Supprimer
                </Button>
                <Button
                  className="text-white ml-auto"
                  color="link"
                  data-dismiss="modal"
                  type="button"
                  onClick={CloseDeleteModal}
                >
                  Annuler
                </Button>
              </div>
            </Modal>
            </Row>
            </Container>
        </Fragment>
    );
}
export default User ;