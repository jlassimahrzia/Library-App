import { Fragment , useState } from 'react'
import PageHeader from "components/Headers/PageHeader.jsx";
import {
    Card, CardHeader, CardFooter,
    DropdownMenu,DropdownItem, UncontrolledDropdown, DropdownToggle,
    Pagination,PaginationItem,PaginationLink,
    Table,Container,Modal,
    Row,Col,
    Button,
    FormGroup,InputGroup,InputGroupAddon,InputGroupText,Form,Input
} from "reactstrap";
function User(){
    const [state, setState] = useState({
        addModal: false,
        updateModal: false,
        deleteModal: false,
        EmpruntsModal: false,
    });
    const toggleAddModal = () => {
        setState({ addModal: ! state.addModal });
    };
    const toggleUpdateModal = () => {
        setState({ updateModal: ! state.updateModal });
    };
    const toggleDeleteModal = () => {
        setState({ deleteModal: ! state.deleteModal });
    };
    const toggleEmpruntsModal = () => {
        setState({ EmpruntsModal: ! state.EmpruntsModal });
    };
    return (
        <Fragment>
            <PageHeader />
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
                                <h3 className="mb-0">Liste des emprunteur</h3>
                            </Col>
                        </Row>               
                    </CardHeader>
                    {/* List */}
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
                        <tr>
                            <td>
                                <img style={{width:"100%"}}
                                    alt="..."
                                    src={require("assets/img/theme/profile-cover.jpg").default}
                                />
                            </td>
                            <td>
                                Jlassi Mahrzia
                            </td>
                            <td>
                                mahrzia.jlassi@ensi-uma.tn
                            </td>
                            <td>
                                11403758
                            </td>  
                            <td>
                                123-456-789
                            </td>
                            <td>
                                II2564897
                            </td>
                            <td>
                                07-08-1997
                            </td>
                            <td>
                                25324210 
                            </td> 
                            <td>
                                Bizerte
                            </td> 
                            <td>
                                app 13
                            </td> 
                            <td>
                                Bizerte
                            </td>    
                            <td>
                                7024
                            </td> 
                            <td>
                                II2
                            </td>  
                            <td>
                               II2-E
                            </td>        
                            <td className="text-right">
                            <UncontrolledDropdown>
                                <DropdownToggle
                                className="btn-icon-only text-light"
                                href="#pablo"
                                role="button"
                                size="sm"
                                color=""
                                onClick={(e) => e.preventDefault()}
                                >
                                <i className="fas fa-ellipsis-v" />
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-arrow" right>
                                <DropdownItem
                                    onClick={toggleEmpruntsModal}
                                >
                                    Liste des emprunts
                                </DropdownItem>
                                <DropdownItem
                                    onClick={toggleUpdateModal}
                                >
                                    Modifier
                                </DropdownItem>
                                <DropdownItem
                                    onClick={toggleDeleteModal}
                                >
                                    Supprimer
                                </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <img style={{width:"100%"}}
                                    alt="..."
                                    src={require("assets/img/theme/profile-cover.jpg").default}
                                />
                            </td>
                            <td>
                                Jlassi Mahrzia
                            </td>
                            <td>
                                mahrzia.jlassi@ensi-uma.tn
                            </td>
                            <td>
                                11403758
                            </td>  
                            <td>
                                123-456-789
                            </td>
                            <td>
                                II2564897
                            </td>
                            <td>
                                07-08-1997
                            </td>
                            <td>
                                25324210 
                            </td> 
                            <td>
                                Bizerte
                            </td> 
                            <td>
                                app 13
                            </td> 
                            <td>
                                Bizerte
                            </td>    
                            <td>
                                7024
                            </td> 
                            <td>
                                II2
                            </td>  
                            <td>
                               II2-E
                            </td>        
                            <td className="text-right">
                            <UncontrolledDropdown>
                                <DropdownToggle
                                className="btn-icon-only text-light"
                                href="#pablo"
                                role="button"
                                size="sm"
                                color=""
                                onClick={(e) => e.preventDefault()}
                                >
                                <i className="fas fa-ellipsis-v" />
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-arrow" right>
                                <DropdownItem
                                    onClick={toggleEmpruntsModal}
                                >
                                    Liste des emprunts
                                </DropdownItem>
                                <DropdownItem
                                    onClick={toggleUpdateModal}
                                >
                                    Modifier
                                </DropdownItem>
                                <DropdownItem
                                    onClick={toggleDeleteModal}
                                >
                                    Supprimer
                                </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                    {/* Pagination */}
                    <CardFooter className="py-4">
                        <nav aria-label="...">
                        <Pagination
                            className="pagination justify-content-end mb-0"
                            listClassName="justify-content-end mb-0"
                        >
                            <PaginationItem className="disabled">
                            <PaginationLink
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                                tabIndex="-1"
                            >
                                <i className="fas fa-angle-left" />
                                <span className="sr-only">Previous</span>
                            </PaginationLink>
                            </PaginationItem>
                            <PaginationItem className="active">
                            <PaginationLink
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                            >
                                1
                            </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                            <PaginationLink
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                            >
                                2 <span className="sr-only">(current)</span>
                            </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                            <PaginationLink
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                            >
                                3
                            </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                            <PaginationLink
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                            >
                                <i className="fas fa-angle-right" />
                                <span className="sr-only">Next</span>
                            </PaginationLink>
                            </PaginationItem>
                        </Pagination>
                        </nav>
                    </CardFooter>
                </Card>
            </div>
            {/* Add user */}
            <Modal className="modal-dialog-centered"
            size="lg" isOpen={state.addModal} toggle={toggleAddModal} >
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
              <div className="modal-body">
                <Form>
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
                                placeholder="Nom et Prenom"
                                type="text"
                            />
                        </FormGroup>
                        </Col>
                        <Col md="6">
                        <FormGroup>
                            <label className="form-control-label">Email</label>
                            <Input
                                className="form-control-alternative"
                                placeholder="Email"
                                type="email"
                            /> 
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
                                placeholder="Date de Naissance"
                                type="date"
                            />
                        </FormGroup>
                        </Col>
                        <Col md="6">
                        <FormGroup>
                            <label className="form-control-label">Telephone</label>
                            <Input
                                className="form-control-alternative"
                                placeholder="Telephone"
                                type="text"
                            /> 
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
                            />
                        </FormGroup>
                        </Col>
                        <Col md="6">
                        <FormGroup>
                            <label className="form-control-label">CIN</label>
                            <Input
                                className="form-control-alternative"
                                placeholder="CIN"
                                type="text"
                            />
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
                                placeholder="NUM Inscription"
                                type="text"
                            />
                        </FormGroup>
                        </Col>
                        <Col md="6">
                        <FormGroup>
                            <label className="form-control-label">NUM Carte</label>
                            <Input
                                className="form-control-alternative"
                                placeholder="NUM Carte"
                                type="text"
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
                            <Input type="select" name="select" id="exampleSelect">
                                <option value="II1">II1</option>
                                <option value="II2">II2</option>
                                <option value="II3">II3</option>
                            </Input>
                        </FormGroup>
                        </Col>
                        <Col md="6">
                        <FormGroup>
                            <label className="form-control-label">Classe</label>
                            <Input type="select" name="select" id="exampleSelect">
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                                <option value="E">E</option>
                                <option value="F">F</option>
                            </Input>
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
                                placeholder="Adresse"
                                type="text"
                            />
                        </FormGroup>
                        </Col>
                        <Col md="6">
                        <FormGroup>
                            <label className="form-control-label">Appartement</label>
                            <Input
                                className="form-control-alternative"
                                placeholder="Appartement"
                                type="text"
                            />
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
                                placeholder="Ville"
                                type="text"
                            />
                        </FormGroup>
                        </Col>
                        <Col md="6">
                        <FormGroup>
                            <label className="form-control-label">Code Postal</label>
                            <Input
                                className="form-control-alternative"
                                placeholder="Code Postal"
                                type="text"
                            />
                        </FormGroup>
                        </Col>
                    </Row>   
                    </div>         
                </Form>
              </div>
              <div className="modal-footer">
                <Button color="primary" type="button">
                  Ajouter
                </Button>
                <Button className="ml-auto" color="link" data-dismiss="modal" type="button" onClick={toggleAddModal}  >
                  Annuler
                </Button>
              </div>
            </Modal>
            {/* Update user */}
            <Modal className="modal-dialog-centered"
            size="lg" isOpen={state.updateModal} toggle={toggleUpdateModal} >
              <div className="modal-header">
                <h4 className="modal-title" id="modal-title-default">
                  Modifier un emprunteur
                </h4>
                <button
                  aria-label="Close"
                  className="close"
                  data-dismiss="modal"
                  type="button"
                  onClick={toggleUpdateModal}
                >
                  <span aria-hidden={true}>×</span>
                </button>
              </div>
              <div className="modal-body">
                <Form>
                    <h6 className="heading-small text-muted mb-4">
                        Informations Générales
                    </h6>
                    <div className="pl-lg-4">
                    <Row>
                        <Col md="6">
                            <FormGroup>
                            <label
                                className="form-control-label"
                                htmlFor="name"
                            >
                                Nom et Prenom
                            </label>
                            <Input
                                className="form-control-alternative"
                                id="name"
                                placeholder="Nom et Prenom"
                                type="text"
                            />
                            </FormGroup>
                        </Col>
                        <Col md="6">
                        <FormGroup>
                            <FormGroup>
                            <label
                                className="form-control-label"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <Input
                                className="form-control-alternative"
                                id="email"
                                placeholder="Nom et Prenom"
                                type="email"
                            />
                            </FormGroup>
                        </FormGroup>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col md="6">
                            <FormGroup>
                            <label
                                className="form-control-label"
                                htmlFor="dateNaissance"
                            >
                                Date de Naissance
                            </label>
                            <Input
                                className="form-control-alternative"
                                id="dateNaissance"
                                placeholder="Date de Naissance"
                                type="date"
                            />
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <label
                                    className="form-control-label"
                                    htmlFor="telephone"
                                >
                                    Telephone
                                </label>
                                <Input
                                    className="form-control-alternative"
                                    id="telephone"
                                    placeholder="Telephone"
                                    type="number"
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col md="6">
                            <FormGroup>
                                <label
                                    className="form-control-label"
                                    htmlFor="photo"
                                >
                                    Photo
                                </label>
                                <Input
                                    className="form-control-alternative"
                                    id="photo"
                                    type="file"
                                />
                            </FormGroup> 
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <label
                                    className="form-control-label"
                                    htmlFor="cin"
                                >
                                    CIN
                                </label>
                                <Input
                                    className="form-control-alternative"
                                    id="cin"
                                    type="number"
                                    placeholder="CIN"
                                />
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
                                <label
                                    className="form-control-label"
                                    htmlFor="numInscription"
                                >
                                    NUM Inscription
                                </label>
                                <Input
                                    className="form-control-alternative"
                                    id="numInscription"
                                    type="text"
                                    placeholder="NUM Inscription"
                                />
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <label
                                    className="form-control-label"
                                    htmlFor="numCarte"
                                >
                                    NUM Carte
                                </label>
                                <Input
                                    className="form-control-alternative"
                                    id="numCarte"
                                    type="text"
                                    placeholder="NUM Carte"
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
                                <label
                                    className="form-control-label"
                                    htmlFor="numCarte"
                                >
                                    Niveau
                                </label>
                                <Input type="select" name="select" id="exampleSelect">
                                    <option value="II1">II1</option>
                                    <option value="II2">II2</option>
                                    <option value="II3">II3</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md="6">
                        <FormGroup>
                                <label
                                    className="form-control-label"
                                    htmlFor="numCarte"
                                >
                                    Classe
                                </label>
                            <Input type="select" name="select" id="exampleSelect">
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                                <option value="E">E</option>
                                <option value="F">F</option>
                            </Input>
                        </FormGroup>
                        </Col>
                    </Row> 
                    </div>
                    <h6 className="heading-small text-muted mb-4">
                        Adresse
                    </h6>
                    <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Address
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                            id="input-address"
                            placeholder="Home Address"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-city"
                          >
                            Ville
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="New York"
                            id="input-city"
                            placeholder="Ville"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Appartement
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="United States"
                            id="input-country"
                            placeholder="Appartement"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Code Postal
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-postal-code"
                            placeholder="Code Postal"
                            type="number"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>        
                </Form>
              </div>
              <div className="modal-footer">
                <Button color="primary" type="button">
                  Modifier
                </Button>
                <Button className="ml-auto" color="link" data-dismiss="modal" type="button" onClick={toggleUpdateModal}  >
                  Annuler
                </Button>
              </div>
            </Modal>
            {/* delete Ouvrage */}
            <Modal
              className="modal-dialog-centered modal-danger"
              contentClassName="bg-gradient-danger"
              isOpen={state.deleteModal}
              toggle={toggleDeleteModal}
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
                  onClick={toggleDeleteModal}
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
                <Button className="btn-white" color="default" type="button">
                  Supprimer
                </Button>
                <Button
                  className="text-white ml-auto"
                  color="link"
                  data-dismiss="modal"
                  type="button"
                  onClick={toggleDeleteModal}
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