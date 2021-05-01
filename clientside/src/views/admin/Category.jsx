import { Fragment , useState , useEffect} from 'react'
import PageHeader from "components/Headers/PageHeader.jsx"
// reactstrap components
import {
    Badge,Card, CardHeader, CardFooter,
    DropdownMenu,DropdownItem, UncontrolledDropdown, DropdownToggle,
    Pagination,PaginationItem,PaginationLink,
    Table,Container,Row,FormGroup,InputGroup,InputGroupAddon,InputGroupText,
    Button,Col,Modal,Form,Input
  } from "reactstrap"
// Forms
import { useFormik } from 'formik'
import CategoryService from 'services/CategoryService'
import * as Yup from 'yup'
import { Toaster } from 'react-hot-toast';
function Category(){
    
    const [addModal, setAddModal] = useState(false);
    const [categoryUpdate, setCategoryUpdate] = useState(null);
    const [updateModal, setUpdateModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [id_delete , setDeleteId] = useState(null);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");
    // Pagination
    const [pageSize] = useState(2)
    const [currentPage,setCurrentPage] = useState(0)
    const [pagesCount,setPagesCount] = useState(0)
    // load list of categories
    const retrieveCategories = async () => {
      const data = await CategoryService.getAll();
      setCategories([...data])
    }
    // Did Mount
    useEffect(() => {
      retrieveCategories();
    }, [])

    // DidUpdate
    useEffect(() => {

    }, [categoryUpdate , updateModal , categories , addModal , deleteModal 
      , id_delete , search,pageSize , currentPage , pagesCount])
    useEffect(() => {
      let pages_number = Math.ceil(categories.length / pageSize) ;
      setPagesCount(pages_number);
    }, [categories , pagesCount , pageSize])
    // Add Modal
    const toggleAddModal = () => {
      setAddModal(!addModal)
    };
    // Update Modal
    const OpenUpdateModal = (item) => {
      setCategoryUpdate(item)
      setUpdateModal(true)
    };
    const CloseUpdateModal = () => {
      setUpdateModal(false)
    }
    // delete Modal
    const OpenDeleteModal = (id) => {
      setDeleteId(id)
      setDeleteModal(true)
    };
    const CloseDeleteModal = () => {
      setDeleteModal(false)
    };
    // Add Form
    const validationSchema = Yup.object({
      libelle: Yup.string().required('Il faut remplir le champ libellé'),
      description: Yup.string().required('Il faut remplir le champ description')
    })
    const AddForm = useFormik({
      initialValues : {
        libelle: '',
        description: ''
      },
      onSubmit: (values, submitProps)  => {
        CategoryService.add(values,submitProps);
        toggleAddModal();
        retrieveCategories();
      },
      validationSchema,
    })
    // Update Form
    const UpdateForm = useFormik({
      initialValues : {
        libelle: categoryUpdate ? categoryUpdate.libelle : "",
        description: categoryUpdate ? categoryUpdate.description : ""
      },
      onSubmit: (values, submitProps)  => {
        CategoryService.update(categoryUpdate.id ,values,submitProps);
        CloseUpdateModal();
        retrieveCategories();
      },
      validationSchema,
      enableReinitialize:true
    })
    // Delete 
    const delete_category = () => {
      CategoryService.delete(id_delete);
      CloseDeleteModal();
      retrieveCategories();
    };
    // Search
    const handleInput = async(value) =>{
      setSearch(value)
      const data = await CategoryService.search({"search" : search });
      setCategories([...data])
      if(value === "")
        retrieveCategories();
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
                            <h3 className="mb-0">Liste des catégories</h3>
                        </Col>
                    </Row>               
                </CardHeader>
                {/* List */}
                <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                    <tr>
                        <th scope="col"># </th>  
                        <th scope="col">Nom </th>
                        <th scope="col">Description</th>
                        <th scope="col">Nombres des ouvrages</th>
                        <th scope="col" />
                    </tr>
                    </thead>
                    <tbody>
                    { categories.slice(currentPage * pageSize,(currentPage + 1) * pageSize).map((item,index) => (
                        <tr key={index} >
                          <td>{index+1}</td>
                          <td>
                            {item.libelle}
                          </td>
                          <td>
                            {item.description}
                          </td>
                          <td>
                            <Badge color="info" pill>{item.ouvrages.length}</Badge>
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
                                  Supprimer
                              </DropdownItem>
                              </DropdownMenu>
                          </UncontrolledDropdown>
                          </td>
                        </tr> ))}
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
            {/* Add Category */}
            <Modal className="modal-dialog-centered" isOpen={addModal} toggle={toggleAddModal} >
              <div className="modal-header">
                <h4 className="modal-title" id="modal-title-default">
                  Ajouter une nouvelle catégorie
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
                      <label className="form-control-label">libellé</label>
                      <Input
                          className="form-control-alternative"
                          placeholder="libellé" type="text"
                          name="libelle" id="libelle"
                          {...AddForm.getFieldProps('libelle')}
                      />
                      {AddForm.errors.libelle && AddForm.touched.libelle ? 
                      <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                        <i className="ni ni-fat-remove" /> {AddForm.errors.libelle }
                      </span></p> : null}
                      <br/>
                      <label className="form-control-label">Description</label>
                      <Input
                          className="form-control-alternative"
                          placeholder="Description ..." rows="3" type="textarea"
                          name="description" id="description"
                          {...AddForm.getFieldProps('description')}
                      /> 
                      {AddForm.errors.description && AddForm.touched.description ? 
                      <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                        <i className="ni ni-fat-remove" /> {AddForm.errors.description }
                      </span></p> : null}  
                </div>
                <div className="modal-footer">
                  <Button color="primary" type="submit" disabled={!(AddForm.dirty && AddForm.isValid)}>
                    Ajouter
                  </Button>
                  <Button className="ml-auto" color="link" data-dismiss="modal" type="button" onClick={toggleAddModal}  >
                    Annuler
                  </Button>
                </div>
              </Form>
            </Modal>
            {/* Update Category */}
            <Modal className="modal-dialog-centered" isOpen={updateModal} toggle={CloseUpdateModal} >
              <div className="modal-header">
                <h4 className="modal-title" id="modal-title-default">
                  Modifier la catégorie "{categoryUpdate ? categoryUpdate.libelle : ""}"
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
                    <label className="form-control-label">Nom</label>
                    <Input
                        className="form-control-alternative"
                        placeholder="Nom" type="text"
                        name="libelle" id="libelle"
                        {...UpdateForm.getFieldProps('libelle')}
                    />
                    {UpdateForm.errors.libelle && UpdateForm.touched.libelle ? 
                      <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                        <i className="ni ni-fat-remove" /> {UpdateForm.errors.libelle }
                      </span></p> : null}
                    <br/>
                    <label className="form-control-label">Description</label>
                    <Input
                        className="form-control-alternative"
                        placeholder="Description ..." rows="3"type="textarea"
                        name="description" id="description"
                        {...UpdateForm.getFieldProps('description')}
                    /> 
                    {UpdateForm.errors.description && UpdateForm.touched.description ? 
                      <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                        <i className="ni ni-fat-remove" /> {UpdateForm.errors.description }
                      </span></p> : null}    
              </div>
              <div className="modal-footer">
                <Button color="primary" type="submit" disabled={!(UpdateForm.dirty && UpdateForm.isValid)}>
                  Modifier
                </Button>
                <Button className="ml-auto" color="link" data-dismiss="modal" type="button" onClick={CloseUpdateModal}  >
                  Annuler
                </Button>
              </div>
              </Form>
            </Modal>
            {/* delete Category */}
            <Modal
              className="modal-dialog-centered modal-danger"
              contentClassName="bg-gradient-danger"
              isOpen={deleteModal}
              toggle={CloseDeleteModal}
            >
              <div className="modal-header">
                <h6 className="modal-title" id="modal-title-notification">
                  Supprimer une catégorie
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
                    Vous ne pourrez pas récupérer cette catégorie
                  </p>
                </div>
              </div>
              <div className="modal-footer">
                <Button className="btn-white" color="default" type="button" onClick={delete_category}>
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
        </>
    );
}
export default Category ;