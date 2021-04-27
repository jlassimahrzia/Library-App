import { Fragment , useState} from 'react'
import PageHeader from "components/Headers/PageHeader.jsx";
// reactstrap components
import {
    Card, CardHeader, CardFooter,
    DropdownMenu,DropdownItem, UncontrolledDropdown, DropdownToggle,
    Pagination,PaginationItem,PaginationLink,
    Table,Container,Modal,
    Row,Col,
    Button,Badge,
    FormGroup,InputGroup,InputGroupAddon,InputGroupText,Form,Input
} from "reactstrap";

function Ouvrage(){
    const [state, setState] = useState({
        addModal: false,
        updateModal: false,
        deleteModal: false,
        descriptionModal: false,
    });

    /* Modals*/
    const toggleAddModal = () => {
        setState({ addModal: ! state.addModal });
    };
    const toggleUpdateModal = () => {
        setState({ updateModal: ! state.updateModal });
    };
    const toggleDeleteModal = () => {
        setState({ deleteModal: ! state.deleteModal });
    };
    const toggleDescriptionModal = () => {
        setState({ descriptionModal: ! state.descriptionModal });
    };
    return (
        <>
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
                            <h3 className="mb-0">Liste des ouvrages</h3>
                        </Col>
                    </Row>               
                </CardHeader>
                {/* List */}
                <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                    <tr>
                        <th scope="col">Photo Couverture</th>
                        <th scope="col">Titre </th>
                        <th scope="col">Disponibilité</th>
                        <th scope="col">Code Isbn </th>  
                        <th scope="col">Auteur</th>
                        <th scope="col">Edition</th>
                        <th scope="col">Langue</th>
                        <th scope="col">Categorie</th>
                        <th scope="col">Prix</th>
                        <th scope="col">Date Creation</th>
                        <th scope="col">Support</th>
                        <th scope="col">PDF</th>
                        <th scope="col">Nombre Exemplaires</th>
                        <th scope="col">Nombre Emprunts</th>
                        <th scope="col" />
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            <img style={{width:"30%"}}
                                alt="..."
                                src={require("assets/img/theme/livre.jpg").default}
                            />
                        </td>
                        <td>
                            L'évolution du graffiti
                        </td>
                        <td>
                            <Badge color="" className="badge-dot mr-4">
                            <i className="bg-success" />
                                Disponible
                            </Badge>
                        </td>
                        <td>
                            123-789-123
                        </td>  
                        <td>
                            Pierre Dufour
                        </td>
                        <td>
                            EdiLivre
                        </td>
                        <td>
                            <img alt="..." style={{width:"20px",height:"20px"}}
                            src={require("../../assets/img/theme/france.png").default }/> fr
                        </td>
                        <td>
                            Catégorie 
                        </td> 
                        <td>
                            10.000 dt
                        </td> 
                        <td>
                            10-02-2010
                        </td> 
                        <td>
                            <img alt="..." style={{width:"20px",height:"20px"}}
                            src={require("assets/img/theme/pdf.png").default}/> pdf <br/>
                            <img alt="..." style={{width:"20px",height:"20px"}}
                            src={require("assets/img/theme/papier.png").default}/> Papier
                        </td>    
                        <td>
                            
                        </td> 
                        <td>
                            <Badge color="info" pill>4</Badge>
                        </td>  
                        <td>
                            <Badge color="info" pill>3</Badge>
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
                                onClick={toggleDescriptionModal}
                            >
                                Description
                            </DropdownItem>
                            <DropdownItem
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
                            <img style={{width:"30%"}}
                                alt="..."
                                src={require("assets/img/theme/livre.jpg").default}
                            />
                        </td>
                        <td>
                            L'évolution du graffiti
                        </td>
                        <td>
                            <Badge color="" className="badge-dot mr-4">
                            <i className="bg-success" />
                                Disponible
                            </Badge>
                        </td>
                        <td>
                            123-789-123
                        </td>  
                        <td>
                            Pierre Dufour
                        </td>
                        <td>
                            EdiLivre
                        </td>
                        <td>
                            <img alt="..." style={{width:"20px",height:"20px"}}
                            src={
                              require("assets/img/theme/france.png")
                                .default
                            }/> fr
                        </td>
                        <td>
                            Catégorie 
                        </td> 
                        <td>
                            10.000 dt
                        </td> 
                        <td>
                            10-02-2010
                        </td> 
                        <td>
                            <img alt="..." style={{width:"20px",height:"20px"}}
                            src={
                              require("assets/img/theme/pdf.png")
                                .default
                            }/> pdf <br/>
                            <img alt="..." style={{width:"20px",height:"20px"}}
                            src={
                              require("assets/img/theme/papier.png")
                                .default
                            }/> Papier
                        </td>    
                        <td>
                            livre.pdf
                        </td> 
                        <td>
                            <Badge color="info" pill>4</Badge>
                        </td>  
                        <td>
                            <Badge color="info" pill>3</Badge>
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
                                href="#pablo"
                            >
                                Description
                            </DropdownItem>
                            <DropdownItem
                                href="#pablo"
                            >
                                Liste des emprunts
                            </DropdownItem>
                            <DropdownItem
                                href="#pablo"
                                onClick={toggleUpdateModal}
                            >
                                Modifier
                            </DropdownItem>
                            <DropdownItem
                                href="#pablo"
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
            {/* Add Ouvrage */}
            <Modal className="modal-dialog-centered"
            size="lg" isOpen={state.addModal} toggle={toggleAddModal} >
              <div className="modal-header">
                <h4 className="modal-title" id="modal-title-default">
                  Ajouter un nouveau ouvrage
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
                    <Row>
                        <Col md="6">
                            <label className="form-control-label">Code ISBN</label>
                            <Input
                                className="form-control-alternative"
                                placeholder="code ISBN"
                                type="text"
                            />
                        </Col>
                        <Col md="6">
                            <label className="form-control-label">Titre</label>
                            <Input
                                className="form-control-alternative"
                                placeholder="Titre"
                                type="text"
                            /> 
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col md="6">
                            <label className="form-control-label">Auteur</label>
                            <Input
                                className="form-control-alternative"
                                placeholder="Auteur"
                                type="text"
                            />
                        </Col>
                        <Col md="6">
                            <label className="form-control-label">Edition</label>
                            <Input
                                className="form-control-alternative"
                                placeholder="Edition"
                                type="text"
                            /> 
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col md="6">
                            <label className="form-control-label">Prix</label>
                            <Input
                                className="form-control-alternative"
                                placeholder="Prix"
                                type="text"
                            />
                        </Col>
                        <Col md="6">
                            <label className="form-control-label">Langue</label>
                            <Input
                                className="form-control-alternative"
                                placeholder="Langue"
                                type="text"
                            /> 
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col md="6">
                            <label className="form-control-label">Date Creation</label>
                            <Input
                                className="form-control-alternative"
                                placeholder="Date Creation"
                                type="date"
                            />
                        </Col>
                        <Col md="6">
                            <label className="form-control-label">Nombres Exemplaires</label>
                            <Input
                                className="form-control-alternative"
                                placeholder="Nombres Exemplaires"
                                type="number"
                            /> 
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col md="6">
                            <label className="form-control-label">Type</label>
                            <Input type="select" name="select" id="exampleSelect">
                                <option value="1">Papier</option>
                                <option value="2">PDF</option>
                                <option value="3">Papier et PDF</option>
                            </Input>
                        </Col>
                        <Col md="6">
                            <label className="form-control-label">Catégories</label>
                            <Input type="select" name="select" id="exampleSelect">
                                <option value="1">Cat 1</option>
                                <option value="2">Cat 2</option>
                                <option value="3">Cat 3</option>
                            </Input>
                        </Col>
                    </Row> 
                    <br/>
                    <Row>
                        <Col md="12">
                            <label className="form-control-label">Description</label>
                            <Input
                                className="form-control-alternative"
                                placeholder="Description ..."
                                type="textarea"
                            />
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col md="6">
                            <label className="form-control-label">Photo Couverture</label>
                            <Input
                                className="form-control-alternative"
                                type="file"
                            />
                        </Col>
                        <Col md="6">
                            <label className="form-control-label">Version PDF</label>
                            <Input
                                className="form-control-alternative"
                                type="file"
                            />
                        </Col>
                    </Row>            
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
            {/* Update Ouvrage */}
            <Modal className="modal-dialog-centered" 
            size="lg" isOpen={state.updateModal} toggle={toggleUpdateModal} 
            style={{width:"1000px"}}>
              <div className="modal-header">
                <h4 className="modal-title" id="modal-title-default">
                  Modifier un ouvrage
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
                    <Row>
                        <Col md="6">
                            <label className="form-control-label">Code ISBN</label>
                            <Input
                                className="form-control-alternative"
                                placeholder="code ISBN"
                                type="text"
                            />
                        </Col>
                        <Col md="6">
                            <label className="form-control-label">Titre</label>
                            <Input
                                className="form-control-alternative"
                                placeholder="Titre"
                                type="text"
                            /> 
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col md="6">
                            <label className="form-control-label">Auteur</label>
                            <Input
                                className="form-control-alternative"
                                placeholder="Auteur"
                                type="text"
                            />
                        </Col>
                        <Col md="6">
                            <label className="form-control-label">Edition</label>
                            <Input
                                className="form-control-alternative"
                                placeholder="Edition"
                                type="text"
                            /> 
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col md="6">
                            <label className="form-control-label">Prix</label>
                            <Input
                                className="form-control-alternative"
                                placeholder="Prix"
                                type="text"
                            />
                        </Col>
                        <Col md="6">
                            <label className="form-control-label">Langue</label>
                            <Input
                                className="form-control-alternative"
                                placeholder="Langue"
                                type="text"
                            /> 
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col md="6">
                            <label className="form-control-label">Date Creation</label>
                            <Input
                                className="form-control-alternative"
                                placeholder="Date Creation"
                                type="date"
                            />
                        </Col>
                        <Col md="6">
                            <label className="form-control-label">Nombres Exemplaires</label>
                            <Input
                                className="form-control-alternative"
                                placeholder="Nombres Exemplaires"
                                type="number"
                            /> 
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col md="6">
                            <label className="form-control-label">Type</label>
                            <Input type="select" name="select" id="exampleSelect">
                                <option value="1">Papier</option>
                                <option value="2">PDF</option>
                                <option value="3">Papier et PDF</option>
                            </Input>
                        </Col>
                        <Col md="6">
                            <label className="form-control-label">Catégories</label>
                            <Input type="select" name="select" id="exampleSelect">
                                <option value="1">Cat 1</option>
                                <option value="2">Cat 2</option>
                                <option value="3">Cat 3</option>
                            </Input>
                        </Col>
                    </Row> 
                    <br/>
                    <Row>
                        <Col md="12">
                    
                            <label className="form-control-label">Description</label>
                            <Input
                                className="form-control-alternative"
                                placeholder="Description ..."
                                type="textarea"
                            />
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col md="6">
                            <label className="form-control-label">Photo Couverture</label>
                            <Input
                                className="form-control-alternative"
                                type="file"
                            />
                        </Col>
                        <Col md="6">
                            <label className="form-control-label">Version PDF</label>
                            <Input
                                className="form-control-alternative"
                                type="file"
                            />
                        </Col>
                    </Row>            
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
                  Supprimer un ouvrage
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
                    Vous ne pourrez pas récupérer cette ouvrage
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
            {/* description Ouvrage */}
            <Modal
              className="modal-dialog-centered"
              isOpen={state.descriptionModal}
              toggle={toggleDescriptionModal}
            >
              <div className="modal-header">
                <h6 className="modal-title" id="modal-title-default">
                  Description Ouvrage
                </h6>
                <button
                  aria-label="Close"
                  className="close"
                  data-dismiss="modal"
                  type="button"
                  onClick={toggleDescriptionModal}
                >
                  <span aria-hidden={true}>×</span>
                </button>
              </div>
              <div className="modal-body">
                <p>
                  Far far away, behind the word mountains, far from the
                  countries Vokalia and Consonantia, there live the blind
                  texts. Separated they live in Bookmarksgrove right at the
                  coast of the Semantics, a large language ocean.
                </p>
                <p>
                  A small river named Duden flows by their place and supplies
                  it with the necessary regelialia. It is a paradisematic
                  country, in which roasted parts of sentences fly into your
                  mouth.
                </p>
              </div>
              <div className="modal-footer">
                <Button
                  className="ml-auto"
                  color="link"
                  data-dismiss="modal"
                  type="button"
                  onClick={toggleDescriptionModal}
                >
                  Close
                </Button>
              </div>
            </Modal>
        </Row>
        </Container>
        </>
    );
}
export default Ouvrage ;