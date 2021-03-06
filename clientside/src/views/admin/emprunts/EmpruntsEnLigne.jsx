import { useState , useEffect} from 'react'
import PageHeader from "components/Headers/PageHeader.jsx"
import { Toaster } from 'react-hot-toast'
// reactstrap components
import {
    Badge,Card, CardHeader, CardFooter,
    DropdownMenu,DropdownItem, UncontrolledDropdown, DropdownToggle,
    Pagination,PaginationItem,PaginationLink,
    Table,Container,Row,FormGroup,InputGroup,InputGroupAddon,InputGroupText,
    Button,Col,Modal,Input,CardBody
  } from "reactstrap"
import EmpruntService from 'services/EmpruntService'
function EmpruntsEnLigne(){
    // Modal
    const [ValiderModal, setValiderModal] = useState(false);
    const [OuvrageModal, setOuvrageModal] = useState(false);
    const [EmprunteurModal, setEmprunteurModal] = useState(false);
    // List
    const [empruntsList,setEmpruntsList] = useState([])
    // Pagination
    const [pageSize] = useState(2)
    const [currentPage,setCurrentPage] = useState(0)
    const [pagesCount,setPagesCount] = useState(0)
    // Autres
    const [ouvrage,setOuvrage] = useState('');
    const [user,setUser] = useState('');
    const [id_emprunt,setIdEmprunt] = useState('');
    const [search, setSearch] = useState("");
    // Load List
    const retrieveEmpruntsList = async () => {
        const data = await EmpruntService.getEmpruntsEnLigne();
        setEmpruntsList([...data])
    }
    // Did Mount
    useEffect(() => {
        retrieveEmpruntsList();
    }, [])
    // DidUpdate
    useEffect(() => {

    }, [empruntsList ,pageSize , currentPage , pagesCount , 
      ValiderModal,OuvrageModal,EmprunteurModal,search])
    
    useEffect(() => {
        let pages_number = Math.ceil(empruntsList.length / pageSize) ;
        setPagesCount(pages_number);
    }, [empruntsList , pagesCount , pageSize])
    // Pagination
    const handleClick = (e, index) => {
        e.preventDefault();
        setCurrentPage(index);
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
    // Valider Modal
    const OpenValiderModal = (id) => {
        setIdEmprunt(id)
        setValiderModal(true)
    };
    const CloseValiderModal = () => {
        setIdEmprunt('')
        setValiderModal(false)
    }
    const setAsValider = ()=> {
      EmpruntService.setValider(id_emprunt);
      retrieveEmpruntsList();
      CloseValiderModal();
    }
    // Search
    const handleInput = async(value) =>{
      setSearch(value)
      const data = await EmpruntService.searchEnLigne({"search" : search });
      setEmpruntsList([...data])
      if(value === "")
        retrieveEmpruntsList();
    }
    return (
        <>
        <PageHeader />
        <Toaster />
        <Container className="mt--7" fluid>  
        <div>
            <Row>
                <Col xs="5">
                    <FormGroup>
                        <InputGroup className="input-group-alternative mb-4">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                            <i className="ni ni-zoom-split-in" />
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input
                            className="form-control-alternative"
                            placeholder="Chercher par nom / titre / Date debut - Fin ..."
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
                        <th scope="col">Date D??but</th>
                        <th scope="col">Date Fin</th>
                        <th scope="col">Valider</th>
                        <th scope="col" />
                    </tr>
                    </thead>
                    <tbody>
                    { empruntsList.slice(currentPage * pageSize,(currentPage + 1) * pageSize).map((item,index) => ( 
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
                                <button type="button" className="btn btn-success btn-sm" onClick={()=>OpenValiderModal(item.id)}>
                                    <i className="ni ni-check-bold"></i>
                                    Valider !!
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
                  <span aria-hidden={true}>??</span>
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
                    <span aria-hidden={true}>??</span>
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
                </CardBody>
                </Card>
                </div>
                <div className="modal-footer">
                   <Button color="primary" type="button" onClick={CloseEmprunteurModal}>
                        Annuler
                    </Button>
                </div>
            </Modal>
            {/* Marque comme Valider */}
            <Modal
              className="modal-dialog-centered modal-success"
              contentClassName="bg-gradient-success"
              isOpen={ValiderModal}
              toggle={CloseValiderModal}
            >
              <div className="modal-header">
                <h6 className="modal-title" id="modal-title-notification">
                  Valider Emprunt
                </h6>
                <button
                  aria-label="Close"
                  className="close"
                  data-dismiss="modal"
                  type="button"
                  onClick={CloseValiderModal}
                >
                  <span aria-hidden={true}>??</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="py-3 text-center">
                  <i className="ni ni-check-bold ni-4x" />
                  <h4 className="heading mt-4">??tes-vous s??r!</h4>
                  <p>
                    Vous ne pourrez pas refaire cette op??ration
                  </p>
                </div>
              </div>
              <div className="modal-footer">
                <Button className="btn-white" color="default" type="button" onClick={()=>setAsValider()}>
                  Valider
                </Button>
                <Button
                  className="text-white ml-auto"
                  color="link"
                  data-dismiss="modal"
                  type="button"
                  onClick={CloseValiderModal}
                >
                  Annuler
                </Button>
              </div>
            </Modal>
        </Row>    
        </Container>
        </>
    )
}
export default EmpruntsEnLigne;