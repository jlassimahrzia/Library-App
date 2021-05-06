import { Fragment , useState , useEffect} from 'react'
import PageHeader from "components/Headers/PageHeader.jsx"
// reactstrap components
import {
    Badge,Card, CardHeader, CardFooter,
    DropdownMenu,DropdownItem, UncontrolledDropdown, DropdownToggle,
    Pagination,PaginationItem,PaginationLink,
    Table,Container,Row,FormGroup,InputGroup,InputGroupAddon,InputGroupText,
    Button,Col,Modal,Form,Input,CardBody,CardImg
  } from "reactstrap"
// Forms
import { useFormik } from 'formik'
import EmpruntService from 'services/EmpruntService'
import UserService from 'services/UserService'
import OuvrageService from 'services/OuvrageService'
import * as Yup from 'yup'
import { Toaster } from 'react-hot-toast';
function EmpruntsEnCours(){
    // Modal
    const [addModal, setAddModal] = useState(false);
    const [RenduModal, setRenduModal] = useState(false);
    const [OuvrageModal, setOuvrageModal] = useState(false);
    const [EmprunteurModal, setEmprunteurModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    // Autres
    const [search, setSearch] = useState("");
    const [currentDay,setCurrentDay] = useState('');
    const [users,setUsers] = useState([]);
    const [ouvrages,setOuvrages] = useState([]);
    const [empruntsList,setEmpruntsList] = useState([]);
    const [ouvrage,setOuvrage] = useState('');
    const [user,setUser] = useState('');
    const [id_emprunt,setIdEmprunt] = useState('');
    const [emprunt,setEmprunt] = useState('');
    // Pagination
    const [pageSize] = useState(2)
    const [currentPage,setCurrentPage] = useState(0)
    const [pagesCount,setPagesCount] = useState(0)
  
    // load list of users and ouvrages
    const retrieveUsers = async () => {
      const data = await UserService.getInternUser();
      setUsers([...data])
    }
    const retrieveOuvrages = async () => {
      const data = await OuvrageService.getAll();
      setOuvrages([...data])
    }

    const retrieveEmpruntsList = async () => {
      const data = await EmpruntService.getEmpruntsEnCours();
      setEmpruntsList([...data])
    }

    // Did Mount
    useEffect(() => {
      retrieveUsers();
      retrieveOuvrages();
      retrieveEmpruntsList();
      setCurrentDay(getCurrentDay())
    }, [])

    // DidUpdate
    useEffect(() => {

    }, [updateModal ,addModal , deleteModal , users , ouvrages , empruntsList , ouvrage 
      , search,pageSize , currentPage , pagesCount])
    useEffect(() => {
      let pages_number = Math.ceil(empruntsList.length / pageSize) ;
      setPagesCount(pages_number);
    }, [empruntsList , pagesCount , pageSize])
    // Current Day
    const getCurrentDay = () => {
      let newDate = new Date()
      let date = newDate.getDate();
      let month = newDate.getMonth() + 1;
      let year = newDate.getFullYear();
      const separator = '-';
      return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date<10?`0${date}`:`${date}`}`
    }

    // Add Modal
    const toggleAddModal = () => {
      setAddModal(!addModal)
    };
    // Update Modal
    const OpenUpdateModal = (item) => {
      setEmprunt(item)
      setUpdateModal(true)
    };
    const CloseUpdateModal = () => {
      setEmprunt('')
      setUpdateModal(false)
    }
    // Rendu Modal
    const OpenRenduModal = (id) => {
        setIdEmprunt(id)
        setRenduModal(true)
    };
    const CloseRenduModal = () => {
        setIdEmprunt('')
        setRenduModal(false)
    }
    const setAsRendu = ()=> {
      EmpruntService.setRendu(id_emprunt);
      retrieveEmpruntsList();
      CloseRenduModal();
    }
    // delete Modal
    const OpenDeleteModal = (id) => {
      setIdEmprunt(id)
      setDeleteModal(true)
    };
    const CloseDeleteModal = () => {
      setIdEmprunt('')
      setDeleteModal(false)
    };
    const delete_emprunt = () => {
      EmpruntService.delete(id_emprunt)
      setIdEmprunt('')
      retrieveEmpruntsList();
      setDeleteModal(false)
    }
    // Ouvrage Modal
    const OpenOuvrageModal = (ouvrage) => {
      setOuvrage(ouvrage)
      setOuvrageModal(true)
    };
    const CloseOuvrageModal = () => {
        setOuvrage('')
        setOuvrageModal(false)
    };
    // Emprunteur Modal
    const OpenEmprunteurModal = (user) => {
        setUser(user)
        setEmprunteurModal(true)
    };
    const CloseEmprunteurModal = () => {
        setUser('')
        setEmprunteurModal(false)
    };
    // Add Form
    const validationSchema = Yup.object({
      user_id : Yup.number().required('Il faut sélèctionner l\'emprunteur'),
      ouvrage_id : Yup.number().required('Il faut sélèctionner l\'ouvrage'),
      dateDebut: Yup.string().required('Il faut indiquer la date début'),
      dateFin : Yup.string().required('Il faut indiquer la date début'),
    })
    const AddForm = useFormik({
      initialValues : {
        user_id : '',
        ouvrage_id : '',
        dateDebut: '',
        dateFin : ''
      },
      onSubmit: (values, submitProps)  => {
        EmpruntService.add(values,submitProps);
        retrieveEmpruntsList();
        toggleAddModal();
      },
      validationSchema,
    })
    const UpdateForm = useFormik({
      initialValues : {
        user_id : emprunt ? emprunt.user_id : "",
        ouvrage_id : emprunt ? emprunt.ouvrage_id : "",
        dateDebut: emprunt ? emprunt.dateDebut : "",
        dateFin : emprunt ? emprunt.dateFin : ""
      },
      onSubmit: (values, submitProps)  => {
        EmpruntService.update(emprunt.id,values,submitProps);
        retrieveEmpruntsList();
        CloseUpdateModal();
      },
      validationSchema,
      enableReinitialize:true
    })
    // Search
    const handleInput = async(value) =>{
      setSearch(value)
      //const data = await CategoryService.search({"search" : search });
      //setCategories([...data])
      //if(value === "")
        //retrieveCategories();
    }
    // Pagination
    const handleClick = (e, index) => {
      e.preventDefault();
      setCurrentPage(index);
    }
    return (
        <>
        <PageHeader />
        <Toaster />
        <Container className="mt--7" fluid>  
        <div>
                <Row>
                    <Col xs="8">
                        <Button className="btn-icon btn-3" color="primary" type="button"
                            onClick={toggleAddModal}>
                                <span className="btn-inner--icon">
                                    <i className="ni ni-fat-add" />
                                </span>
                                <span className="btn-inner--text">Ajouter</span>
                        </Button>
                    </Col>
                    <Col className="text-right" xs="4">
                        <FormGroup>
                        <InputGroup className="input-group-alternative mb-4">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                            <i className="ni ni-zoom-split-in" />
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input
                            className="form-control-alternative"
                            placeholder="Chercher"
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
                <Card className="shadow">
                {/* Header */}
                <CardHeader className="border-0">
                    <Row className="align-items-center">
                        <Col xs="8">
                            <h3 className="mb-0">Liste des emprunts en cours</h3>
                        </Col>
                    </Row>               
                </CardHeader>
                {/* List */}
                <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                    <tr>
                        <th scope="col"># </th>  
                        <th scope="col">Ouvrage </th>
                        <th scope="col">Emprunteur</th>
                        <th scope="col">Date Début</th>
                        <th scope="col">Date Fin</th>
                        <th scope="col">Rendu</th>
                        <th scope="col" />
                    </tr>
                    </thead>
                    <tbody>
                    { empruntsList.slice(currentPage * pageSize,(currentPage + 1) * pageSize).map((item,index) => ( 
                        <tr key={index}>
                            <td>{currentPage==0 ? index+1 : index+3}</td>
                            <td>
                                {item.ouvrage.titre}
                            </td>
                            <td>
                                {item.user.name}
                            </td>
                            <td>
                                {item.dateDebut}
                            </td>  
                            <td>
                                {item.dateFin}
                            </td> 
                            <td>
                                <button type="button" className="btn btn-success btn-sm" onClick={()=>OpenRenduModal(item.id)}>
                                    <i className="ni ni-check-bold"></i>
                                    Rendu !!
                                </button>
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
                                    onClick={ () => OpenUpdateModal(item)}
                                >
                                  Modifier
                                </DropdownItem>
                                <DropdownItem
                                    onClick={() => OpenDeleteModal(item.id)}
                                >
                                  Annuler
                                </DropdownItem>
                                <DropdownItem
                                    onClick={() => OpenOuvrageModal(item.ouvrage)}
                                >
                                  Ouvrage Info
                                </DropdownItem>
                                <DropdownItem
                                    onClick={() => OpenEmprunteurModal(item.user)}
                                >
                                  Emprunteur Info
                                </DropdownItem>
                              </DropdownMenu>
                          </UncontrolledDropdown>
                          </td>
                        </tr>
                        ))} 
                    </tbody>
                </Table>
                {/* Pagination */}
                <CardFooter className="py-4">
                    <nav aria-label="...">
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
                </CardFooter>
                </Card>
            </div>  
            {/* Add Emprunt */}
            <Modal className="modal-dialog-centered" isOpen={addModal} toggle={toggleAddModal} >
              <div className="modal-header">
                <h4 className="modal-title" id="modal-title-default">
                  Ajouter un nouveau emprunts
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
                    <Row>
                        <Col>
                        <label className="form-control-label">Emprunteur</label>
                        <Input type="select" name="user_id" id="user_id"
                            {...AddForm.getFieldProps('user_id')}>
                            <option hidden>Selectionner ...</option>
                            {users.map((item, index) => (
                            <option key={index} value={item.id}>{item.name}</option>
                            ))}
                        </Input>
                        {AddForm.errors.user_id && AddForm.touched.user_id ?
                        <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                        <i className="ni ni-fat-remove" /> {AddForm.errors.user_id}
                        </span></p> : null}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <label className="form-control-label">Ouvrage</label>
                        <Input type="select" name="ouvrage_id" id="ouvrage_id"
                            {...AddForm.getFieldProps('ouvrage_id')}>
                            <option hidden>Selectionner ...</option>
                            {ouvrages.map((item, index) => (
                            <option key={index} value={item.id}>
                              {item.titre}
                            </option>
                            ))}
                        </Input>
                        {AddForm.errors.ouvrage_id && AddForm.touched.ouvrage_id ?
                        <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                        <i className="ni ni-fat-remove" /> {AddForm.errors.ouvrage_id}
                        </span></p> : null}
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                            <label className="form-control-label">Date Début</label>
                            <Input className="form-control" placeholder="Date Début" type="date" min={currentDay}
                            name="dateDebut" id="dateDebut"
                            {...AddForm.getFieldProps('dateDebut')}>
                            </Input>
                            {AddForm.errors.dateDebut && AddForm.touched.dateDebut ?
                          <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                          <i className="ni ni-fat-remove" /> {AddForm.errors.dateDebut}
                          </span></p> : null}
                        </Col>
                        <Col md="6">
                            <label className="form-control-label">Date Fin</label>
                            <Input className="form-control" placeholder="Date Fin" type="date" min={currentDay}
                            name="dateFin" id="dateFin"
                            {...AddForm.getFieldProps('dateFin')}>
                            </Input>
                            {AddForm.errors.dateFin && AddForm.touched.dateFin ?
                          <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                          <i className="ni ni-fat-remove" /> {AddForm.errors.dateFin}
                          </span></p> : null}
                        </Col>
                    </Row>        
                </div>
                <div className="modal-footer">
                  <Button color="primary" type="submit">
                    Ajouter
                  </Button>
                  <Button className="ml-auto" color="link" data-dismiss="modal" type="button" onClick={toggleAddModal}  >
                    Annuler
                  </Button>
                </div>
              </Form>
            </Modal>
            {/* Update Emprunt */}
            <Modal className="modal-dialog-centered" isOpen={updateModal} toggle={CloseUpdateModal} >
              <div className="modal-header">
                <h4 className="modal-title" id="modal-title-default">
                  Modifier Emprunt
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
                    <Row>
                        <Col>
                        <label className="form-control-label">Emprunteur</label>
                        <Input type="select" name="user_id" id="user_id"
                            {...UpdateForm.getFieldProps('user_id')}>
                            <option hidden>Selectionner ...</option>
                            {users.map((item, index) => (
                            <option key={index} value={item.id}>{item.name}</option>
                            ))}
                        </Input>
                        {UpdateForm.errors.user_id && UpdateForm.touched.user_id ?
                        <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                        <i className="ni ni-fat-remove" /> {UpdateForm.errors.user_id}
                        </span></p> : null}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <label className="form-control-label">Ouvrage</label>
                        <Input type="select" name="ouvrage_id" id="ouvrage_id"
                            {...UpdateForm.getFieldProps('ouvrage_id')}>
                            <option hidden>Selectionner ...</option>
                            {ouvrages.map((item, index) => (
                            <option key={index} value={item.id}>
                              {item.titre}
                            </option>
                            ))}
                        </Input>
                        {UpdateForm.errors.ouvrage_id && UpdateForm.touched.ouvrage_id ?
                        <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                        <i className="ni ni-fat-remove" /> {UpdateForm.errors.ouvrage_id}
                        </span></p> : null}
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                            <label className="form-control-label">Date Début</label>
                            <Input className="form-control" placeholder="Date Début" type="date" min={currentDay}
                            name="dateDebut" id="dateDebut"
                            {...UpdateForm.getFieldProps('dateDebut')}>
                            </Input>
                            {UpdateForm.errors.dateDebut && UpdateForm.touched.dateDebut ?
                          <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                          <i className="ni ni-fat-remove" /> {UpdateForm.errors.dateDebut}
                          </span></p> : null}
                        </Col>
                        <Col md="6">
                            <label className="form-control-label">Date Fin</label>
                            <Input className="form-control" placeholder="Date Fin" type="date" min={currentDay}
                            name="dateFin" id="dateFin"
                            {...UpdateForm.getFieldProps('dateFin')}>
                            </Input>
                            {UpdateForm.errors.dateFin && UpdateForm.touched.dateFin ?
                          <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                          <i className="ni ni-fat-remove" /> {UpdateForm.errors.dateFin}
                          </span></p> : null}
                        </Col>
                    </Row>        
                </div>
                <div className="modal-footer">
                  <Button color="primary" type="submit">
                    Modifier
                  </Button>
                  <Button className="ml-auto" color="link" data-dismiss="modal" type="button" onClick={toggleAddModal}  >
                    Annuler
                  </Button>
                </div>
              </Form>
            </Modal>
            {/* Annuler Emprunt */}
            <Modal
              className="modal-dialog-centered modal-danger"
              contentClassName="bg-gradient-danger"
              isOpen={deleteModal}
              toggle={CloseDeleteModal}
            >
              <div className="modal-header">
                <h6 className="modal-title" id="modal-title-notification">
                  Annuler Emprunts
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
                    Vous ne pourrez pas récupérer cet emprunt
                  </p>
                </div>
              </div>
              <div className="modal-footer">
                <Button className="btn-white" color="default" type="button" onClick={delete_emprunt}>
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
            {/* Marque comme rendu */}
            <Modal
              className="modal-dialog-centered modal-danger"
              contentClassName="bg-gradient-success"
              isOpen={RenduModal}
              toggle={CloseRenduModal}
            >
              <div className="modal-header">
                <h6 className="modal-title" id="modal-title-notification">
                  Ouvrage Rendu 
                </h6>
                <button
                  aria-label="Close"
                  className="close"
                  data-dismiss="modal"
                  type="button"
                  onClick={CloseRenduModal}
                >
                  <span aria-hidden={true}>×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="py-3 text-center">
                  <i className="ni ni-check-bold ni-4x" />
                  <h4 className="heading mt-4">êtes-vous sûr!</h4>
                  <p>
                    Vous ne pourrez pas refaire cette opération
                  </p>
                </div>
              </div>
              <div className="modal-footer">
                <Button className="btn-white" color="default" type="button" onClick={()=>setAsRendu()}>
                  Rendu
                </Button>
                <Button
                  className="text-white ml-auto"
                  color="link"
                  data-dismiss="modal"
                  type="button"
                  onClick={CloseRenduModal}
                >
                  Annuler
                </Button>
              </div>
            </Modal>
            {/* Ouvrage Info */}
            <Modal
              className="modal-dialog-centered"
              isOpen={OuvrageModal}
              toggle={CloseOuvrageModal}
            >
              <div className="modal-header">
                <h6 className="modal-title" id="modal-title-notification">
                  Description Ouvrage  
                </h6>
                <button
                  aria-label="Close"
                  className="close"
                  data-dismiss="modal"
                  type="button"
                  onClick={CloseOuvrageModal}
                >
                  <span aria-hidden={true}>×</span>
                </button>
              </div>
              <div className="modal-body">
                <Card className="card-profile border-0 pt-md-0">
                <CardHeader className="text-center border-0 pt-md-2">
                    <div className="justify-content-center">
                    <img 
                        alt="..."
                        src={`http://localhost:8000/api/photos_couverture/${ouvrage.photoCouverture}`}
                        style={{ width: "20%" }}
                    />
                    </div>
                </CardHeader>
                <CardBody>
                    <div className="text-center">
                    <h3>
                        {ouvrage.titre}
                        <span className="font-weight-light">- {ouvrage.codeIsbn}</span>
                    </h3>
                    <div className="h5 font-weight-300">
                        <i className="ni location_pin mr-2" />
                        {ouvrage.auteur}
                    </div>
                    <div className="h5 mt-4">
                        <i className="ni business_briefcase-24 mr-2" />
                        {ouvrage.edition} le- {ouvrage.dateCreation}
                    </div>
                    <div>
                        <i className="ni education_hat mr-2" />
                        Category: {/*ouvrage !== null ? ouvrage.categorie.libelle : null*/} - Nombre d'exemplaires <Badge color="info" pill>{ouvrage.nbrExemplaire}</Badge>
                    </div>
                    <hr className="my-4" />
                    <p>
                        {ouvrage.resumer}
                    </p>
                    
                    </div>
                </CardBody>
                </Card>
              </div>
              <div className="modal-footer">
                   <Button color="primary" type="button" onClick={CloseOuvrageModal}>
                        Annuler
                    </Button>
                </div>
            </Modal>
            {/* Emprunteur Info */}
            <Modal
              className="modal-dialog-centered"
              isOpen={EmprunteurModal}
              toggle={CloseEmprunteurModal}
            >
              <div className="modal-header">
                  <h6 className="modal-title" id="modal-title-notification">
                    Description Emprunteur
                  </h6>
                  <button
                    aria-label="Close"
                    className="close"
                    data-dismiss="modal"
                    type="button"
                    onClick={CloseEmprunteurModal}
                  >
                    <span aria-hidden={true}>×</span>
                  </button>
                </div>
                <div className="modal-body">
                <Card className="card-profile  border-0 pt-md-0">
                <Row className="justify-content-center">
                    <Col className="order-lg-2" lg="3">
                    
                    </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-md-0" style={{"padding":"0px"}}>
                    <div className="justify-content-center pt-md-0">
                    <img 
                        alt="..."
                        src={`http://localhost:8000/api/images/${user.photo}`}
                        style={{ width: "20%", padding:"3px" }}
                    />
                    <h3>
                        {user.name}
                        <span className="font-weight-light">- {user.numCarte}</span>
                    </h3>
                    <div className="h5 font-weight-300 pt-md-0">
                        <i className="ni location_pin mr-2" />
                        {user.email}
                    </div>
                    </div>
                </CardHeader>
                <CardBody  className="pt-md-0">
                    <div className="pt-md-0">
                    <hr className="my-4" />
                    <div className="h5 font-weight-300">
                        <i className="ni business_briefcase-24 mr-2" />
                        <b>Num d'inscription</b> {user.numInscription}
                    </div>
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
                        <b>Classe</b> {user.niveau}-{user.classe}
                    </div>
                    </div>
                </CardBody>
                </Card>
                </div>
                <div className="modal-footer">
                   <Button color="primary" type="button" onClick={CloseEmprunteurModal}>
                        Annuler
                    </Button>
                </div>
            </Modal>
        </Row>
        </Container>
        </>
    );
}
export default EmpruntsEnCours ;