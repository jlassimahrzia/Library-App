import { Fragment , useState ,useEffect} from 'react'
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
import { useFormik } from 'formik'
import CategoryService from 'services/CategoryService'
import OuvrageService from 'services/OuvrageService'
import { Toaster } from 'react-hot-toast'
import * as Yup from 'yup'
function Ouvrage(){
    // Add
    const [addModal, setAddModal] = useState(false);
    const [photo , setPhoto] = useState('');
    const [FileError , setFileError] = useState(null); // For image error
    const [pdfFile , setpdfFile] = useState('');
    const [PdfError , setPdfError] = useState(null); 
    const [activePdfInput , setactivePdfInput] = useState(false); 
    // Lists
    const [categories, setCategories] = useState([]);
    const [ouvrages, setOuvrages] = useState([]);
    // Description
    const [descriptionModal, setDescriptionModal] = useState(false);
    const [description, setDescription] = useState("");
    // Update
    const [updateModal, setUpdateModal] = useState(false);
    const [ouvrageUpdate, setOuvrageUpdate] = useState(null);
    // Delete 
    const [deleteModal, setDeleteModal] = useState(false);
    const [id_delete , setDeleteId] = useState(null);
    // Pagination
    const [pageSize] = useState(2)
    const [currentPage,setCurrentPage] = useState(0)
    const [pagesCount,setPagesCount] = useState(0)
    // Search
    const [search, setSearch] = useState("");
    /* Modals */
    const toggleAddModal = () => {
        setAddModal(!addModal);
    };
    // Update
    const OpenUpdateModal = (item) => {
        setOuvrageUpdate(item)
        if(ouvrageUpdate !== null){
            if(ouvrageUpdate.type ==="2" || ouvrageUpdate.type ==="3") {setactivePdfInput(true)} 
        }
        setUpdateModal(true)
    };
    const CloseUpdateModal = () => {
        setOuvrageUpdate(null)
        setUpdateModal(false)
    };
    // Delete
    const OpenDeleteModal = (id) => {
        setDeleteId(id)
        setDeleteModal(true)
    };
    const CloseDeleteModal = () => {
        setDeleteId(null)
        setDeleteModal(false)
    };
    const delete_ouvrage = () => {
        OuvrageService.delete(id_delete);
        CloseDeleteModal();
        retrieveOuvrages();
    };
    // Description
    const OpenDescriptionModal = (description) => {
        setDescription(description)
        setDescriptionModal(true)
    };
    const CloseDescriptionModal = () => {
        setDescription("")
        setDescriptionModal(false)
    };
    // load list of categories
    const retrieveCategories = async () => {
      const data = await CategoryService.getAll();
      setCategories([...data])
    }
    // load list of ouvrages
    const retrieveOuvrages = async () => {
        const data = await OuvrageService.getAll();
        setOuvrages([...data])
      }
    // Did Mount
    useEffect(() => {
        retrieveCategories();
        retrieveOuvrages();
    }, [])
    // DidUpdate
    useEffect(() => {

    },[addModal,updateModal,deleteModal,descriptionModal,categories,
    photo,ouvrages,description,id_delete,ouvrageUpdate ,search]);

    // Pagination
    useEffect(() => {
        let pages_number = Math.ceil(ouvrages.length / pageSize) ;
        setPagesCount(pages_number);
    }, [ouvrages , pagesCount , pageSize])
    
    const handleClick = (e, index) => {
        e.preventDefault();
        setCurrentPage(index);
      }
    // Photo de couverture
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
        if (!files.length){
            return;
        }
        else if ((files[0].type !== "image/jpeg") && (files[0].type !== "image/png")){
                setFileError('Que les images .png , .jpeg ou .jpg sont acceptées');
                return;
        }
        else if (files[0].size > 20e6) {
                setFileError('Image de très grande taille - taille Max = 2MB');
                return;
        }
        console.log("ok")
        createImage(files[0]);
    }
    // PDF File
    const handleInputChange = (event) => {
        let files = event.target.files;
        if (!files.length){
            return;
        }
        else if (files[0].type !== "application/pdf"){
            setPdfError('Que les documents .pdf sont acceptées');
            return;
        }
        else if (files[0].size > 20e6) {
            setPdfError('Image de très grande taille  - taille Max = 2MB');
            return;
    }
        setPdfError(null)
        setpdfFile(event.target.files[0]);
    }
    // Form
    const validationSchema = Yup.object({
        codeIsbn:  Yup.string().required('Il faut remplir le champ Code ISBN'),
        titre: Yup.string().required('Il faut remplir le champ Titre'),
        auteur: Yup.string().required('Il faut remplir le champ Auteur'),
        edition: Yup.string().required('Il faut remplir le champ Edition'),
        prix: Yup.number().required('Il faut remplir le champ Prix'),
        resumer: Yup.string().required('Il faut remplir le champ Description'),
        langue: Yup.string().required('Il faut selectionner la Langue'),
        dateCreation: Yup.string().required('Il faut indiquer la date de création'),
        nbrExemplaire: Yup.string().required('Il faut indiquer le nombre d\'exemplaire disponible'),
        type: Yup.string().required('Il faut selectionner le type de support disponible'),
        categorie_id: Yup.string().required('Il faut indiquer la catégorie de l\'ouvrage')
    })
    const AddForm = useFormik({
        initialValues : {
            codeIsbn: '',
            titre: '',
            auteur: '',
            edition: '',
            prix:'',
            resumer:'',
            langue:'',
            dateCreation:'',
            nbrExemplaire:'',
            type:'',
            categorie_id:''
        },
        onSubmit: (values,submitProps)  => {
            if(pdfFile !== ''){
                let data = new FormData() 
                data.append("file", pdfFile)
                OuvrageService.add(values, photo, data, submitProps)
            }
            else {
                OuvrageService.add(values, photo, '', submitProps)
            }
            retrieveOuvrages()
            toggleAddModal()
            setPhoto("")
            setpdfFile("")
        },
        validationSchema
    })
    const UpdateForm = useFormik({
        initialValues : {
            codeIsbn: ouvrageUpdate ? ouvrageUpdate.codeIsbn : "",
            titre: ouvrageUpdate ? ouvrageUpdate.titre : "",
            auteur: ouvrageUpdate ? ouvrageUpdate.auteur : "",
            edition: ouvrageUpdate ? ouvrageUpdate.edition : "",
            prix: ouvrageUpdate ? ouvrageUpdate.prix : "",
            resumer: ouvrageUpdate ? ouvrageUpdate.resumer : "",
            langue: ouvrageUpdate ? ouvrageUpdate.langue : "",
            dateCreation: ouvrageUpdate ? ouvrageUpdate.dateCreation : "",
            nbrExemplaire: ouvrageUpdate ? ouvrageUpdate.nbrExemplaire : "",
            type: ouvrageUpdate ? ouvrageUpdate.type : "",
            categorie_id: ouvrageUpdate ? ouvrageUpdate.categorie_id : ""
        },
        onSubmit: (values,submitProps)  => {
                console.log(pdfFile)
                if(pdfFile !== ''){
                    let data = new FormData() 
                    data.append("file", pdfFile)
                    OuvrageService.update(ouvrageUpdate.id,values, photo, data, submitProps)
                    console.log('with data')
                }
                else {
                    OuvrageService.update(ouvrageUpdate.id,values, photo, '', submitProps)
                    console.log('without data')
                }
                retrieveOuvrages()
                CloseUpdateModal()
                setPhoto("")
                setpdfFile("")
        },
        validationSchema,
        enableReinitialize:true
    })
    // Search
    const handleInput = async(value) =>{
        setSearch(value)
        const data = await OuvrageService.search({"search" : search });
        setOuvrages([...data])
        if(value === "")
            retrieveOuvrages();
      }
    return (
        <>
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
                            placeholder="Chercher par codeIsbn ou titre ou auteur ou edition .... "
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
                    { ouvrages.slice(currentPage * pageSize,(currentPage + 1) * pageSize).map((item,index) => (
                    <tr key={index}>
                        <td>
                            <img style={{width:"30%"}}alt="..."
                            src={`http://localhost:8000/api/photos_couverture/${item.photoCouverture}`}/>                            
                        </td>
                        <td>
                            {item.titre}
                        </td>
                        <td>
                            { item.nbrExemplaire > item.nbrEmprunter ?
                                <Badge color="" className="badge-dot mr-4">
                                <i className="bg-success" />
                                    Disponible
                                </Badge> :
                                <Badge color="" className="badge-dot mr-4">
                                <i className="bg-danger" />
                                    Non Disponible
                                </Badge>
                            }
                        </td>
                        <td>
                            { item.codeIsbn}
                        </td>  
                        <td>
                            {item.auteur}
                        </td>
                        <td>
                            {item.edition}
                        </td>
                        <td>
                            {item.langue}
                        </td>
                        <td>
                            {item.categorie.libelle} 
                        </td> 
                        <td>
                            {item.prix} dt
                        </td> 
                        <td>
                            {item.dateCreation}
                        </td> 
                        <td>
                            { item.type === "1" ? 
                            <div><img alt="..." style={{width:"20px",height:"20px"}}
                            src={require("assets/img/theme/papier.png").default}/> <span>Papier</span> </div>
                            : null}
                            {item.type === "2" ? <div><img alt="..." style={{width:"20px",height:"20px"}}
                                src={require("assets/img/theme/pdf.png").default}/> <span>PDF</span></div> 
                                : null}
                            {item.type === "3" ? 
                               <div> <img alt="..." style={{width:"20px",height:"20px"}}
                                src={require("assets/img/theme/pdf.png").default}/> <span>PDF</span> 
                                <br/>
                                <img alt="..." style={{width:"20px",height:"20px"}}
                                src={require("assets/img/theme/papier.png").default}/> <span>Papier</span> </div>
                                : null }
                            
                        </td> 

                        <td>
                            {item.pdfVersion !== null ? <a href={`http://localhost:8000/files/${item.pdfVersion}`} target="_blank">{item.pdfVersion}</a> : null}
                        </td> 
                        <td>
                            <Badge color="info" pill>{item.nbrExemplaire}</Badge>
                        </td>  
                        <td>
                            <Badge color="info" pill>{item.nbrEmprunter}</Badge>
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
                                onClick={() => OpenDescriptionModal(item.resumer)}
                            >
                                Description
                            </DropdownItem>
                            <DropdownItem
                            >
                                Liste des emprunts
                            </DropdownItem>
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
                    </tr>))}
                  
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
            {/* Add Ouvrage */}
            <Modal className="modal-dialog-centered"
            size="lg" isOpen={addModal} toggle={toggleAddModal} >
              <div className="modal-header">
                <h4 className="modal-title" id="modal-title-default">
                  Ajouter un nouveau ouvrage
                </h4>
                <button
                  aria-label="Close" className="close" data-dismiss="modal" type="button"
                  onClick={toggleAddModal}
                >
                  <span aria-hidden={true}>×</span>
                </button>
              </div>
              <Form onSubmit={AddForm.handleSubmit}>
              <div className="modal-body">
                    <Row>
                        <Col md="6">
                            <label className="form-control-label">Code ISBN</label>
                            <Input
                                className="form-control-alternative"
                                placeholder="code ISBN"
                                type="text"
                                name="codeIsbn" id="codeIsbn"
                                {...AddForm.getFieldProps('codeIsbn')}
                            />
                        {AddForm.errors.codeIsbn && AddForm.touched.codeIsbn ? 
                        <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                            <i className="ni ni-fat-remove" /> {AddForm.errors.codeIsbn }
                        </span></p> : null}        
                        </Col>
                        <Col md="6">
                            <label className="form-control-label">Titre</label>
                            <Input
                                className="form-control-alternative"
                                placeholder="Titre"
                                type="text"
                                name="titre" id="titre"
                                {...AddForm.getFieldProps('titre')}
                            />
                        {AddForm.errors.titre && AddForm.touched.titre ? 
                        <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                            <i className="ni ni-fat-remove" /> {AddForm.errors.titre }
                        </span></p> : null}   
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
                                name="auteur" id="auteur"
                                {...AddForm.getFieldProps('auteur')}
                            />
                        {AddForm.errors.auteur && AddForm.touched.auteur ? 
                        <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                            <i className="ni ni-fat-remove" /> {AddForm.errors.auteur }
                        </span></p> : null}      
                        </Col>
                        <Col md="6">
                            <label className="form-control-label">Edition</label>
                            <Input
                                className="form-control-alternative"
                                placeholder="Edition"
                                type="text"
                                name="edition" id="edition"
                                {...AddForm.getFieldProps('edition')}
                            /> 
                        {AddForm.errors.auteur && AddForm.touched.auteur ? 
                        <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                            <i className="ni ni-fat-remove" /> {AddForm.errors.auteur }
                        </span></p> : null}    
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col md="6">
                            <label className="form-control-label">Prix</label>
                            <Input
                                className="form-control-alternative"
                                placeholder="Prix"
                                type="number"
                                name="prix" id="prix"
                                {...AddForm.getFieldProps('prix')}
                            />
                        {AddForm.errors.prix && AddForm.touched.prix ? 
                        <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                            <i className="ni ni-fat-remove" /> {AddForm.errors.prix }
                        </span></p> : null} 
                        </Col>
                        <Col md="6">
                            <label className="form-control-label">Langue</label>
                            <Input type="select" name="langue" id="langue"
                            {...AddForm.getFieldProps('langue')}>
                                <option hidden>Selectionner ...</option> 
                                <option value="FR">FR</option>
                                <option value="ANG">ANG</option>
                                <option value="AR">AR</option>
                            </Input>
                        {AddForm.errors.langue && AddForm.touched.langue ? 
                        <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                            <i className="ni ni-fat-remove" /> {AddForm.errors.langue }
                        </span></p> : null} 
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
                                name="dateCreation" id="dateCreation"
                                {...AddForm.getFieldProps('dateCreation')}
                            />
                        {AddForm.errors.dateCreation && AddForm.touched.dateCreation ? 
                        <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                            <i className="ni ni-fat-remove" /> {AddForm.errors.dateCreation }
                        </span></p> : null} 
                        </Col>
                        <Col md="6">
                            <label className="form-control-label">Nombres Exemplaires</label>
                            <Input
                                className="form-control-alternative"
                                placeholder="Nombres Exemplaires"
                                type="number"
                                name="nbrExemplaire" id="nbrExemplaire"
                                {...AddForm.getFieldProps('nbrExemplaire')}
                            />
                        {AddForm.errors.nbrExemplaire && AddForm.touched.nbrExemplaire ? 
                        <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                            <i className="ni ni-fat-remove" /> {AddForm.errors.nbrExemplaire }
                        </span></p> : null}  
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col md="6">
                            <label className="form-control-label">Type</label>
                            <Input type="select" name="type" id="type"
                            {...AddForm.getFieldProps('type')} 
                            onClick={() => { setactivePdfInput(false) ; if(AddForm.values.type ==="2" || AddForm.values.type ==="3" ) {setactivePdfInput(true)}}}>
                                <option hidden>Selectionner ...</option> 
                                <option value="1">Papier</option>
                                <option value="2">PDF</option>
                                <option value="3">Papier et PDF</option>
                            </Input>
                        {AddForm.errors.type && AddForm.touched.type ? 
                        <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                            <i className="ni ni-fat-remove" /> {AddForm.errors.type }
                        </span></p> : null}  
                        </Col>
                        <Col md="6">
                            <label className="form-control-label">Catégories</label>
                            <Input type="select" name="categorie_id" id="categorie_id"
                            {...AddForm.getFieldProps('categorie_id')}>
                                <option hidden>Selectionner ...</option> 
                                {categories.map((item,index)=>(
                                    <option key={index} value={item.id}>{item.libelle}</option>
                                ))}
                            </Input>
                        {AddForm.errors.categorie_id && AddForm.touched.categorie_id ? 
                        <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                            <i className="ni ni-fat-remove" /> {AddForm.errors.categorie_id }
                        </span></p> : null}  
                        </Col>
                    </Row> 
                    <br/>
                    <Row>
                        <Col md="12">
                            <label className="form-control-label">Description</label>
                            <Input
                                className="form-control-alternative"
                                placeholder="Description ..."
                                type="textarea"name="resumer" id="resumer"
                                {...AddForm.getFieldProps('resumer')}
                            />
                        </Col>
                        {AddForm.errors.resumer && AddForm.touched.resumer ? 
                        <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                            <i className="ni ni-fat-remove" /> {AddForm.errors.resumer }
                        </span></p> : null}
                    </Row>
                    <br/>
                    <Row>
                        <Col md="6">
                            <label className="form-control-label">Photo Couverture</label>
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
                        </Col>
                        {!activePdfInput ? null :  
                            <Col md="6">
                                <label className="form-control-label">Version PDF</label>
                                <Input
                                    className="form-control-alternative"
                                    type="file" onChange={handleInputChange}
                                    
                                />
                                { PdfError != null ? 
                                <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                                    <i className="ni ni-fat-remove" /> { PdfError }
                                </span></p> : null}
                            </Col>
                        }
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
            {/* Update Ouvrage */}
            <Modal className="modal-dialog-centered" 
            size="lg" isOpen={updateModal} toggle={CloseUpdateModal} 
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
                  onClick={CloseUpdateModal}
                >
                  <span aria-hidden={true}>×</span>
                </button>
              </div>
              <Form onSubmit={UpdateForm.handleSubmit}>
              <div className="modal-body">
                    <Row>
                        <Col md="6">
                            <label className="form-control-label">Code ISBN</label>
                            <Input
                                className="form-control-alternative"
                                placeholder="code ISBN"
                                type="text"
                                name="codeIsbn" id="codeIsbn"
                                {...UpdateForm.getFieldProps('codeIsbn')}
                            />
                        {UpdateForm.errors.codeIsbn && UpdateForm.touched.codeIsbn ? 
                        <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                            <i className="ni ni-fat-remove" /> {UpdateForm.errors.codeIsbn }
                        </span></p> : null}        
                        </Col>
                        <Col md="6">
                            <label className="form-control-label">Titre</label>
                            <Input
                                className="form-control-alternative"
                                placeholder="Titre"
                                type="text"
                                name="titre" id="titre"
                                {...UpdateForm.getFieldProps('titre')}
                            />
                        {UpdateForm.errors.titre && UpdateForm.touched.titre ? 
                        <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                            <i className="ni ni-fat-remove" /> {UpdateForm.errors.titre }
                        </span></p> : null}   
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
                                name="auteur" id="auteur"
                                {...UpdateForm.getFieldProps('auteur')}
                            />
                        {UpdateForm.errors.auteur && UpdateForm.touched.auteur ? 
                        <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                            <i className="ni ni-fat-remove" /> {UpdateForm.errors.auteur }
                        </span></p> : null}      
                        </Col>
                        <Col md="6">
                            <label className="form-control-label">Edition</label>
                            <Input
                                className="form-control-alternative"
                                placeholder="Edition"
                                type="text"
                                name="edition" id="edition"
                                {...UpdateForm.getFieldProps('edition')}
                            /> 
                        {UpdateForm.errors.auteur && UpdateForm.touched.auteur ? 
                        <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                            <i className="ni ni-fat-remove" /> {UpdateForm.errors.auteur }
                        </span></p> : null}    
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col md="6">
                            <label className="form-control-label">Prix</label>
                            <Input
                                className="form-control-alternative"
                                placeholder="Prix"
                                type="number"
                                name="prix" id="prix"
                                {...UpdateForm.getFieldProps('prix')}
                            />
                        {UpdateForm.errors.prix && UpdateForm.touched.prix ? 
                        <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                            <i className="ni ni-fat-remove" /> {UpdateForm.errors.prix }
                        </span></p> : null} 
                        </Col>
                        <Col md="6">
                            <label className="form-control-label">Langue</label>
                            <Input type="select" name="langue" id="langue"
                            {...UpdateForm.getFieldProps('langue')}>
                                <option hidden>Selectionner ...</option> 
                                <option value="FR">FR</option>
                                <option value="ANG">ANG</option>
                                <option value="AR">AR</option>
                            </Input>
                        {UpdateForm.errors.langue && UpdateForm.touched.langue ? 
                        <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                            <i className="ni ni-fat-remove" /> {UpdateForm.errors.langue }
                        </span></p> : null} 
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
                                name="dateCreation" id="dateCreation"
                                {...UpdateForm.getFieldProps('dateCreation')}
                            />
                        {UpdateForm.errors.dateCreation && UpdateForm.touched.dateCreation ? 
                        <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                            <i className="ni ni-fat-remove" /> {UpdateForm.errors.dateCreation }
                        </span></p> : null} 
                        </Col>
                        <Col md="6">
                            <label className="form-control-label">Nombres Exemplaires</label>
                            <Input
                                className="form-control-alternative"
                                placeholder="Nombres Exemplaires"
                                type="number"
                                name="nbrExemplaire" id="nbrExemplaire"
                                {...UpdateForm.getFieldProps('nbrExemplaire')}
                            />
                        {UpdateForm.errors.nbrExemplaire && UpdateForm.touched.nbrExemplaire ? 
                        <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                            <i className="ni ni-fat-remove" /> {UpdateForm.errors.nbrExemplaire }
                        </span></p> : null}  
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col md="6">
                            <label className="form-control-label">Type</label>
                            <Input type="select" name="type" id="type"
                            {...UpdateForm.getFieldProps('type')}
                            onClick={() => { 
                                setactivePdfInput(false) ; 
                                if(UpdateForm.values.type ==="1" ) {setactivePdfInput(false)} 
                                else{setactivePdfInput(true)} 
                            }}> 
                                <option hidden>Selectionner ...</option> 
                                <option value="1">Papier</option>
                                <option value="2">PDF</option>
                                <option value="3">Papier et PDF</option>
                            </Input>
                        {UpdateForm.errors.type && UpdateForm.touched.type ? 
                        <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                            <i className="ni ni-fat-remove" /> {UpdateForm.errors.type }
                        </span></p> : null}  
                        </Col>
                        <Col md="6">
                            <label className="form-control-label">Catégories</label>
                            <Input type="select" name="categorie_id" id="categorie_id"
                            {...UpdateForm.getFieldProps('categorie_id')}>
                                <option hidden>Selectionner ...</option> 
                                {categories.map((item,index)=>(
                                    <option key={index} value={item.id}>{item.libelle}</option>
                                ))}
                            </Input>
                        {UpdateForm.errors.categorie_id && UpdateForm.touched.categorie_id ? 
                        <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                            <i className="ni ni-fat-remove" /> {UpdateForm.errors.categorie_id }
                        </span></p> : null}  
                        </Col>
                    </Row> 
                    <br/>
                    <Row>
                        <Col md="12">
                            <label className="form-control-label">Description</label>
                            <Input
                                className="form-control-alternative"
                                placeholder="Description ..."
                                type="textarea"name="resumer" id="resumer"
                                {...UpdateForm.getFieldProps('resumer')}
                            />
                        </Col>
                        {UpdateForm.errors.resumer && UpdateForm.touched.resumer ? 
                        <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                            <i className="ni ni-fat-remove" /> {UpdateForm.errors.resumer }
                        </span></p> : null}
                    </Row>
                    <br/>
                    <Row>
                        <Col md="6">
                            <label className="form-control-label">Photo Couverture</label>
                            <Input
                                className="form-control-alternative"
                                type="file"
                                name="photo" id="photo"
                                onChange={ (e) => handleImage(e)}
                            />
                            {ouvrageUpdate !== null ? <a href={`http://localhost:8000/photos_couverture/${ouvrageUpdate.photoCouverture}`} target="_blank">{ouvrageUpdate.photoCouverture}</a> : null}
                            { FileError != null ? 
                            <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                                <i className="ni ni-fat-remove" /> { FileError }
                            </span></p> : null}
                        </Col>
                        {!activePdfInput ? null :
                        <Col md="6">
                            <label className="form-control-label">Version PDF</label>
                            <Input
                                className="form-control-alternative"
                                type="file" onChange={handleInputChange}
                            />
                            {ouvrageUpdate !== null && ouvrageUpdate.pdfVersion !== null ? <a href={`http://localhost:8000/files/${ouvrageUpdate.pdfVersion}`} target="_blank">{ouvrageUpdate.pdfVersion}</a> : null}
                            { PdfError != null ? 
                            <p className="mt-3 mb-0 text-muted text-sm"><span className="text-danger mr-2">
                                <i className="ni ni-fat-remove" /> { PdfError }
                            </span></p> : null}
                        </Col>
                        }
                    </Row>  
              </div>
              <div className="modal-footer">
                <Button color="primary" type="submit">
                  Modifier
                </Button>
                <Button className="ml-auto" color="link" data-dismiss="modal" type="button" onClick={CloseUpdateModal}  >
                  Annuler
                </Button>
              </div>
            </Form>
            </Modal>
            {/* delete Ouvrage */}
            <Modal
              className="modal-dialog-centered modal-danger"
              contentClassName="bg-gradient-danger"
              isOpen={deleteModal}
              toggle={CloseDeleteModal}
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
                    Vous ne pourrez pas récupérer cette ouvrage
                  </p>
                </div>
              </div>
              <div className="modal-footer">
                <Button className="btn-white" color="default" type="button" onClick={delete_ouvrage}>
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
            {/* description Ouvrage */}
            <Modal
              className="modal-dialog-centered"
              isOpen={descriptionModal}
              toggle={CloseDescriptionModal}
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
                  onClick={CloseDescriptionModal}
                >
                  <span aria-hidden={true}>×</span>
                </button>
              </div>
              <div className="modal-body">
                <p>
                    {description ? description :  null}
                </p>
              </div>
              <div className="modal-footer">
                <Button
                  className="ml-auto"
                  color="link"
                  data-dismiss="modal"
                  type="button"
                  onClick={CloseDescriptionModal}
                >
                  Fermer
                </Button>
              </div>
            </Modal>
        </Row>
        </Container>
        </>
    );
}
export default Ouvrage ;