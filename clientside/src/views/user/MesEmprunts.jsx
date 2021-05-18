import { Fragment , useState , useEffect} from 'react'
import PageHeader from "components/Headers/PageHeader.jsx"
// reactstrap components
import {
    Badge,Card, CardHeader, CardFooter,
    DropdownMenu,DropdownItem, UncontrolledDropdown, DropdownToggle,
    Pagination,PaginationItem,PaginationLink,
    Table,Container,Row,
    Button,Col,Modal,Form,Input,CardBody
  } from "reactstrap"
// Forms
import { useFormik } from 'formik'
import EmpruntService from 'services/EmpruntService'
import OuvrageService from 'services/OuvrageService'
import * as Yup from 'yup'
import { Toaster } from 'react-hot-toast';
import LocalStorageService from "services/LocalStorageService"
import ReactReadMoreReadLess from "react-read-more-read-less";
import EmpruntsEnArchive from 'views/admin/emprunts/EmpruntsEnArchive'
function MesEmprunts(){
    // Modal
    const [addModal, setAddModal] = useState(false);
    const [OuvrageModal, setOuvrageModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    // Autres
    const [currentDay,setCurrentDay] = useState('');
    const [empruntEnCours,setEmpruntEnCours] = useState([]);
    const [empruntEnRetards,setEmpruntEnRetards] = useState([]);
    const [empruntEnArchives,setEmpruntEnArchives] = useState([]);
    const [ouvrage,setOuvrage] = useState('');
    const [ouvrageDispo,setOuvrageDispo] = useState([]);
    const [user,setUser] = useState('');
    const [emprunt,setEmprunt] = useState('');
    const [id_emprunt,setIdEmprunt] = useState('');
    // Pagination
    const [pageSize] = useState(2)
    const [currentPage,setCurrentPage] = useState(0)
    const [pagesCount,setPagesCount] = useState(0)
    // Pagination
    const [pageSize2] = useState(2)
    const [currentPage2,setCurrentPage2] = useState(0)
    const [pagesCount2,setPagesCount2] = useState(0)
    // Pagination
    const [pageSize3] = useState(2)
    const [currentPage3,setCurrentPage3] = useState(0)
    const [pagesCount3,setPagesCount3] = useState(0)
    // load list of ouvrages  
    const ouvragesDispo = async() => {
      let data = [];
      const tab = await OuvrageService.getAll();
      tab.map((item)=>{
        if(item.nbrExemplaire>item.nbrEmprunter){
          data.push(item)
        }
      })
      setOuvrageDispo([...data])
    }

    const retrieveEmpruntsEnCoursList = async () => {
      const data = await EmpruntService.getEmpruntsEnCoursByUser();
      setEmpruntEnCours([...data])
    }
    const retrieveEmpruntsEnRetardsList = async () => {
      const data = await EmpruntService.getEmpruntsEnRetardsByUser();
      setEmpruntEnRetards([...data])
    }
    const retrieveEmpruntsEnArchivesList = async () => {
      const data = await EmpruntService.getEmpruntsEnArchivesByUser();
      setEmpruntEnArchives([...data])
    }

    // Did Mount
    useEffect(() => {
      setUser(LocalStorageService.getObject('user'))
      retrieveEmpruntsEnCoursList();
      retrieveEmpruntsEnRetardsList();
      retrieveEmpruntsEnArchivesList();
      setCurrentDay(getCurrentDay());
      ouvragesDispo();
    }, [])

    // DidUpdate
    useEffect(() => {

    }, [updateModal ,addModal , deleteModal , ouvrageDispo  , ouvrage 
      ,empruntEnRetards,empruntEnArchives])
    //Pagination
    useEffect(() => {
      let pages_number = Math.ceil(empruntEnCours.length / pageSize) ;
      setPagesCount(pages_number);
    }, [empruntEnCours , pagesCount , pageSize])
    useEffect(() => {
      let pages_number2 = Math.ceil(empruntEnRetards.length / pageSize2) ;
      setPagesCount2(pages_number2);
    }, [empruntEnRetards , pagesCount2 , pageSize2])
    useEffect(() => {
      let pages_number3 = Math.ceil(empruntEnArchives.length / pageSize3) ;
      setPagesCount3(pages_number3);
    }, [empruntEnArchives , pagesCount3 , pageSize3])
    // Pagination
    const handleClick = (e, index) => {
      e.preventDefault();
      setCurrentPage(index);
    }
    const handleClick2 = (e, index) => {
      e.preventDefault();
      setCurrentPage2(index);
    }
    const handleClick3 = (e, index) => {
      e.preventDefault();
      setCurrentPage3(index);
    }
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
      retrieveEmpruntsEnCoursList();
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
    // Add Form
    const validationSchema = Yup.object({
      ouvrage_id : Yup.number().required('Il faut sélèctionner l\'ouvrage'),
      dateDebut: Yup.string().required('Il faut indiquer la date début'),
      dateFin : Yup.string().required('Il faut indiquer la date début'),
    })
    const AddForm = useFormik({
      initialValues : {
        ouvrage_id : '',
        dateDebut: '',
        dateFin : ''
      },
      onSubmit: (values, submitProps)  => {
        EmpruntService.reserver(values,submitProps);
        retrieveEmpruntsEnCoursList();
        toggleAddModal();
      },
      validationSchema,
    })
    const UpdateForm = useFormik({
      initialValues : {
        ouvrage_id : emprunt ? emprunt.ouvrage_id : "",
        dateDebut: emprunt ? emprunt.dateDebut : "",
        dateFin : emprunt ? emprunt.dateFin : ""
      },
      onSubmit: (values, submitProps)  => {
        const data = { user_id: user.id, ...values };
        EmpruntService.update(emprunt.id,data,submitProps);
        retrieveEmpruntsEnCoursList()
        CloseUpdateModal();
      },
      validationSchema,
      enableReinitialize:true
    })
   
    
    return (
        <>
        <PageHeader />
        <Toaster />
        <Container className="mt--7" fluid>  
        <div>
                <Row>
                    <Col xs="8" className="mb-4">
                        <Button className="btn-icon btn-3" color="primary" type="button"
                            onClick={toggleAddModal}>
                                <span className="btn-inner--icon">
                                    <i className="ni ni-calendar-grid-58" />
                                </span>
                                <span className="btn-inner--text">Réservation</span>
                        </Button>
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
                        <th scope="col">Valider</th>
                        <th scope="col" />
                    </tr>
                    </thead>
                    <tbody>
                    { empruntEnCours.slice(currentPage * pageSize,(currentPage + 1) * pageSize).map((item,index) => ( 
                        <tr key={index}>
                            <td>{currentPage===0 ? index+1 : index+3}</td>
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
                              {item.isValid === 'false' ? <span className="badge badge-warning">Non valider</span>: null}
                              {item.isValid === 'true' ? <span className="badge badge-success">Valider</span>: null}
                              {item.isValid === null ? <span>-</span> : null}
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
                                {item.isValid === 'false' ? <DropdownItem  
                                    onClick={ () => OpenUpdateModal(item)}
                                >
                                  Modifier
                                </DropdownItem> : null }
                                {item.isValid === 'false' ?<DropdownItem
                                    onClick={() => OpenDeleteModal(item.id)}
                                >
                                  Annuler
                                </DropdownItem>: null }
                                <DropdownItem
                                    onClick={() => OpenOuvrageModal(item.ouvrage)}
                                >
                                  Ouvrage Info
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
            </Row>
            <Row className="mt-5">
            <div className="col">    
                <Card className="shadow">
                  {/* Header */}
                <CardHeader className="border-0">
                    <Row className="align-items-center">
                        <Col xs="8">
                            <h3 className="mb-0">Liste des emprunts en retards</h3>
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
                        <th scope="col">Valider</th>
                        <th scope="col" />
                    </tr>
                    </thead>
                    <tbody>
                    { empruntEnRetards.slice(currentPage2 * pageSize2,(currentPage2 + 1) * pageSize2).map((item,index) => ( 
                        <tr key={index}>
                            <td>{currentPage2===0 ? index+1 : index+3}</td>
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
                              {item.isValid === 'false' ? <span className="badge badge-warning">Non valider</span>: null}
                              {item.isValid === 'true' ? <span className="badge badge-success">Valider</span>: null}
                              {item.isValid === null ? <span>-</span> : null}
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
                                    onClick={() => OpenOuvrageModal(item.ouvrage)}
                                >
                                  Ouvrage Info
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
                        <PaginationItem disabled={currentPage2 <= 0}>
                          <PaginationLink
                            onClick={e => handleClick2(e, currentPage2 - 1)}
                            previous
                          />
                        </PaginationItem>
                        {[...Array(pagesCount2)].map((page, i) => 
                          <PaginationItem active={i === currentPage2} key={i}>
                            <PaginationLink onClick={e => handleClick2(e, i)}>
                              {i + 1}
                            </PaginationLink>
                          </PaginationItem>
                        )}
                        <PaginationItem disabled={currentPage2 >= pagesCount2 - 1}>
                          <PaginationLink
                            onClick={e => handleClick2(e, currentPage2 + 1)}
                            next
                          />
                        </PaginationItem>
                        </Pagination>
                  </nav>
                </CardFooter>
                </Card>
            </div>   
            </Row>
            <Row className="mt-5">
            <div className="col">    
                <Card className="shadow">
                  {/* Header */}
                <CardHeader className="border-0">
                    <Row className="align-items-center">
                        <Col xs="8">
                            <h3 className="mb-0">Liste des emprunts en archives</h3>
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
                        <th scope="col" />
                    </tr>
                    </thead>
                    <tbody>
                    { empruntEnArchives.slice(currentPage3 * pageSize3,(currentPage3 + 1) * pageSize3).map((item,index) => ( 
                        <tr key={index}>
                            <td>{currentPage3===0 ? index+1 : index+3}</td>
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
                                    onClick={() => OpenOuvrageModal(item.ouvrage)}
                                >
                                  Ouvrage Info
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
                        <PaginationItem disabled={currentPage3 <= 0}>
                          <PaginationLink
                            onClick={e => handleClick3(e, currentPage3 - 1)}
                            previous
                          />
                        </PaginationItem>
                        {[...Array(pagesCount3)].map((page, i) => 
                          <PaginationItem active={i === currentPage3} key={i}>
                            <PaginationLink onClick={e => handleClick3(e, i)}>
                              {i + 1}
                            </PaginationLink>
                          </PaginationItem>
                        )}
                        <PaginationItem disabled={currentPage3 >= pagesCount3 - 1}>
                          <PaginationLink
                            onClick={e => handleClick3(e, currentPage3 + 1)}
                            next
                          />
                        </PaginationItem>
                        </Pagination>
                  </nav>
                </CardFooter>
                </Card>
            </div>   
            </Row>
            {/* Add Emprunt */}
            <Modal className="modal-dialog-centered" isOpen={addModal} toggle={toggleAddModal} >
              <div className="modal-header">
                <h4 className="modal-title" id="modal-title-default">
                  Réservation ouvrage en ligne
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
                    <div className="alert alert-warning" role="alert">
                      Votre réservation en ligne sera automatiquement annuler aprés
                      <b> 3 jours</b> si vous allez pas prendre l'ouvrage.
                    </div>
                    <Row>
                        <Col>
                        <label className="form-control-label">Ouvrage</label>
                        <Input type="select" name="ouvrage_id" id="ouvrage_id"
                            {...AddForm.getFieldProps('ouvrage_id')}>
                            <option hidden>Selectionner ...</option>
                            {ouvrageDispo.map((item, index) => (
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
                    Réserver
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
                    <div className="alert alert-warning" role="alert">
                      Votre réservation en ligne sera automatiquement annuler aprés
                      <b> 3 jours</b> si vous allez pas prendre l'ouvrage.
                    </div>
                    <Row>
                        <Col>
                        <label className="form-control-label">Ouvrage</label>
                        <Input type="select" name="ouvrage_id" id="ouvrage_id"
                            {...UpdateForm.getFieldProps('ouvrage_id')}>
                            <option hidden>Selectionner ...</option>
                            {ouvrageDispo.map((item, index) => (
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
                            <Input className="form-control" placeholder="Date Début" type="date" min={emprunt.dateDebut}
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
                  Annuler
                </Button>
                <Button
                  className="text-white ml-auto"
                  color="link"
                  data-dismiss="modal"
                  type="button"
                  onClick={CloseDeleteModal}
                >
                  Fermer
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
                    {ouvrage.resumer !== undefined ? 
                      <ReactReadMoreReadLess
                        charLimit={200}
                        readMoreText={"Voir Plus ▼"}
                        readLessText={"Voir Moins ▲"}
                        readMoreClassName="read-more-less--more"
                        readLessClassName="read-more-less--less"
                      >
                        {ouvrage.resumer}
                      </ReactReadMoreReadLess> : null}
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
        </Container>
        </>
    );
}
export default MesEmprunts ;