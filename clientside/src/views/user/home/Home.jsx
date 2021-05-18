import React ,{  useState, useEffect } from 'react'
import Flickity from 'react-flickity-component';
import './style.css';
import OuvrageService from 'services/OuvrageService'
import CategoryService from 'services/CategoryService'
import {Modal,Badge,Button,Row,Col,Table,Form,Input} from "reactstrap"
import Viewer, { Worker } from '@phuocng/react-pdf-viewer';
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';
import ReactReadMoreReadLess from "react-read-more-read-less";
import LocalStorageService from "services/LocalStorageService"
import { ThemeProvider } from 'react-jss';
import Rating, {theme } from 'react-rating-stats';
import BeautyStars from 'beauty-stars';
import { Toaster } from 'react-hot-toast';
import * as Yup from 'yup'
import { useFormik } from 'formik'
import EmpruntService from 'services/EmpruntService'
const flickityOptions = {
  wrapAround: true,
  initialIndex: 1
};

function Home() {
  // Lists
  const [ouvrages, setOuvrages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  // Items
  const [ouvrage,setOuvrage] = useState('');
  const [user,setUser] = useState('');
  const [category,setCategory] = useState('all');
  // Modal
  const [OuvrageModal, setOuvrageModal] = useState(false);
  const [UsersModal, setUsersModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  // PDF
  const [pdfModal, setPdfModal] = useState(false);
  const [pdf, setPdf] = useState("");
  // Star 
  const [stars, setStars] = useState(0);
  const [starstab, setStarstab] = useState([]);
  // autres
  const [currentDay,setCurrentDay] = useState('');
  // load list of ouvrages
  const retrieveOuvrages = async () => {
    const data = await OuvrageService.getAll();
    setOuvrages([...data])
  }
  // load list of categories
  const retrieveCategories = async () => {
    const data = await CategoryService.getAll();
    setCategories([...data])
  }
  // Did Mount
  useEffect(() => {
    retrieveCategories();
    retrieveOuvrages();
    setUser(LocalStorageService.getObject('user'))
    setCurrentDay(getCurrentDay())
  }, [])
  // DidUpdate
  useEffect(() => {

  }, [categories, ouvrages,ouvrage,pdfModal,pdf,user,UsersModal]);
  // Ouvrage Modal
  const OpenOuvrageModal = (ouvrage) => {
    setOuvrage(ouvrage)
    setOuvrageModal(true)
    getRatingValue(ouvrage)
    setNbrStar(ouvrage)
  };
  const CloseOuvrageModal = () => {
      setOuvrageModal(false)
  };
  // list of users
  const OpenUsersModal = (list) => {
    setUsers(list)
    setUsersModal(true)
  };
  const CloseUsersModal = () => {
    setUsersModal(false)
  };
  // PDF Modal
  const OpenPdfModal = (pdf) => {
    setPdf(pdf)
    setPdfModal(true)
  };
  const ClosePdfModal = () => {
      setPdf("")
      setPdfModal(false)
  };
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
  // Add Form
  const validationSchema = Yup.object({
    dateDebut: Yup.string().required('Il faut indiquer la date début'),
    dateFin : Yup.string().required('Il faut indiquer la date début'),
  })
  const AddForm = useFormik({
    initialValues : {
      dateDebut: '',
      dateFin : ''
    },
    onSubmit: (values, submitProps)  => {
      EmpruntService.add({user_id : user.id , ouvrage_id : ouvrage.id 
        , dateDebut : values.dateDebut , dateFin : values.dateFin},submitProps);
      toggleAddModal();
    },
    validationSchema,
  })
  const getRatingValue = (ouvrage) =>{
    if(ouvrage.rating !== null){
      const resultat = ouvrage.rating.find( rate => rate.user_id === user.id);
      if(resultat !== undefined){
        setStars(resultat.rate)
      }
      else {
        setStars(0) 
      }
    }
  }

  const setNbrStar = (ouvrage) =>{
    if(ouvrage.rating !== null){
      let star1 = 0;
      let star2 = 0;
      let star3 = 0;
      let star4 = 0;
      let star5 = 0;
      let stars = [];
      ouvrage.rating.map((item) => {
        if(item.rate === 1){
          star1= star1+1;
        }
        else if(item.rate === 2){
          star2= star2+1;
        }
        else if(item.rate === 3){
          star3= star3+1;
        }
        else if(item.rate === 4){
          star4= star4+1;
        }
        else if(item.rate === 5){
          star5= star5+1;
        }
        return true;
      });
      stars[0]=star1;
      stars[1]=star2;
      stars[2]=star3;
      stars[3]=star4;
      stars[4]=star5;
      setStarstab(stars)
    }
  }
  const storeRating = async (id_ouvrage,rate) => {
    setStars(rate);
    await OuvrageService.store_stars({
      'user_id' : user.id,
      'ouvrage_id' : id_ouvrage,
      'rate': rate
    });
    retrieveOuvrages();
  }
  return (
    <>
    <Toaster />
    <div className="book-store">
      <div className="book-slide">
        <Flickity
          className={'book'} // default ''
          elementType={'div'} // default 'div'
          options={flickityOptions} // takes flickity options {}
          disableImagesLoaded={false} // default false
          reloadOnUpdate // default false
          static // default false
        >
        { ouvrages.slice(1,4).map((item, index) => (
          <div className="book-cell" key={index}>
            <div className="book-img">
              <img
                src={`http://localhost:8000/api/photos_couverture/${item.photoCouverture}`}
                alt=""
                className="book-photo"
                style={{"width":"180px","height":"269.84px"}}
              />
            </div>
            <div className="book-content">
            <div className="book-title">{item.titre}</div>
            <div className="book-author">Ecrit par {item.auteur}</div>
              <div className="rate">
                <fieldset className="rating">
                  <input
                    type="checkbox"
                    id="star5"
                    name="rating"
                    defaultValue={5}
                  />
                  <label className="full" htmlFor="star5" />
                  <input
                    type="checkbox"
                    id="star4"
                    name="rating"
                    defaultValue={4}
                  />
                  <label className="full" htmlFor="star4" />
                  <input
                    type="checkbox"
                    id="star3"
                    name="rating"
                    defaultValue={3}
                  />
                  <label className="full" htmlFor="star3" />
                  <input
                    type="checkbox"
                    id="star2"
                    name="rating"
                    defaultValue={2}
                  />
                  <label className="full" htmlFor="star2" />
                  <input
                    type="checkbox"
                    id="star1"
                    name="rating"
                    defaultValue={1}
                  />
                  <label className="full" htmlFor="star1" />
                </fieldset>
                <span className="book-voters">1.987 voters</span>
              </div>
              <div className="book-sum">
                {item.resumer}
              </div>
              <div className="book-see book-blue" onClick={() => OpenOuvrageModal(item)}>Voir Ouvrage</div>
            </div>
          </div>
          ))}
         </Flickity>
      </div>
     
      <div className="main-wrapper">
        <div className="popular-books">
          <div className="main-menu">
            <div className="genre">Categories</div>

            <div className="book-types">
              {category ==='all' ? 
              <a  onClick={ () => { setCategory('all')}} className="book-type active">
                Toute la liste
              </a>:
              <a onClick={ () => { setCategory('all')}} className="book-type">
                Toute la liste
              </a>
              }
              {categories.map((item,index) => (
                <a onClick={ () => { setCategory(item.id)} } className="book-type" key={index}>
                  {item.libelle}
                </a>
              ))}
            </div>
          </div>
          
          <div className="book-cards">
          { category === 'all' ? 
          ouvrages.map((item,index) => (
            <div className="book-card" key={index} >
              <div className="content-wrapper" onClick={() => OpenOuvrageModal(item)}> 
                <img
                  src={`http://localhost:8000/api/photos_couverture/${item.photoCouverture}`}
                  alt=""
                  className="book-card-img"
                  style={{"width":"166px","height":"245px"}}
                />
                <div className="card-content">
                  <div className="book-name">{item.titre}</div>
                  <div className="book-by">Ecrit par {item.auteur}</div>
                  <div className="book-sum card-sum">
                    {item.resumer}
                  </div>
                </div>
              </div>
              <div className="rate" >
                <div className='rating d-flex' style={{"marginTop":"7px"}}>                
                {item.rating !== undefined ?<span className="book-voters card-vote" 
                onClick={() => OpenUsersModal(item.rating)}>
                  <img alt="..." style={{ width: "20px", height: "20px" ,"marginBottom":"7px" , "marginRight":"7px"}}
                  src={require("assets/img/theme/star.png").default} /> 
                   {item.rating.length} Utilisateurs 
                </span>: null }
                </div>
              </div>
            </div> 
            )) 
          : 
          ouvrages.filter(book => book.categorie_id === category ).map((item,index) => (
              <div className="book-card" key={index} >
                <div className="content-wrapper" onClick={() => OpenOuvrageModal(item)}> 
                  <img
                    src={`http://localhost:8000/api/photos_couverture/${item.photoCouverture}`}
                    alt=""
                    className="book-card-img"
                    style={{"width":"166px","height":"245px"}}
                  />
                  <div className="card-content">
                    <div className="book-name">{item.titre}</div>
                    <div className="book-by">Ecrit par {item.auteur}</div>
                    <div className="book-sum card-sum">
                      {item.resumer}
                    </div>
                  </div>
                </div>
                <div  className='rating d-flex' style={{"marginTop":"7px"}} >
                {item.rating !== undefined ?<span className="book-voters card-vote" 
                onClick={() => OpenUsersModal(item.rating)}>
                  <img alt="..." style={{ width: "20px", height: "20px" ,"marginBottom":"7px" , "marginRight":"7px"}}
                  src={require("assets/img/theme/star.png").default} /> 
                   {item.rating.length} Utilisateurs 
                </span>: null }
                </div>
              </div>
          ))}
           </div>
        </div>
      </div>
      </div>
            {/* Description Modal */}
            <Modal
              className="modal-dialog-centered"
              isOpen={OuvrageModal}
              toggle={CloseOuvrageModal} 
              size="lg"
            >
              <div className="modal-header">
                {user.type==='1' && ouvrage.type !== "2" ?
                <h6 className="modal-title" id="modal-title-notification">
                  Description Ouvrage   
                { ouvrage.nbrExemplaire > ouvrage.nbrEmprunter ?  
                <Badge color="success" className="ml-3">Disponible</Badge>: 
                <Badge color="danger" className="ml-3">Non Disponible</Badge>}
                </h6> : <h6 className="modal-title" id="modal-title-notification"> Description Ouvrage </h6>}
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
                  <Row className='d-flex justify-content-between ml-3'>
                    <Col md="4">
                    <img 
                      src={`http://localhost:8000/api/photos_couverture/${ouvrage.photoCouverture}`} 
                      alt={ouvrage.titre} 
                      style={{height: 'auto', width:"180px" , "marginRight":"30px" , "marginBottom":"20px"}} />
                    <BeautyStars
                      value={stars}
                      onChange={value => storeRating(ouvrage.id,value)}
                      inactiveColor="#b1b1b1"
                      size="20px"
                    />
                    </Col> 
                    <Col md="4">
                        <p style={{"whiteSpace":"initial"}}> <b>Titre : </b>{ouvrage.titre}</p>
                        <p style={{"whiteSpace":"initial"}}> <b>Code ISBN : </b> {ouvrage.codeIsbn}</p>
                        <p style={{"whiteSpace":"initial"}}> <b>Categorie : </b> 
                        {ouvrage.categorie !== undefined ? <span className="badge badge-primary">{ouvrage.categorie.libelle}</span> : null} </p>
                        <p style={{"whiteSpace":"initial"}}> <b>Auteur : </b> {ouvrage.auteur}</p>
                        <p style={{"whiteSpace":"initial"}}> <b>Edition : </b> {ouvrage.edition}</p>
                        <p style={{"whiteSpace":"initial"}}> <b>Date Création : </b> {ouvrage.dateCreation}</p>
                    </Col> 
                    <Col md="4">
                      <p><b>Type Support : </b>
                        {ouvrage.type === "1" ? <span><img alt="..." style={{ width: "20px", height: "20px" }}
                          src={require("assets/img/theme/papier.png").default} /> <span>Papier</span> </span>
                          : null}
                        {ouvrage.type === "2" ? <span><img alt="..." style={{ width: "20px", height: "20px" }}
                          src={require("assets/img/theme/pdf.png").default} /> <span>PDF  <Button color="primary" size="sm" type="button" className="ml-3"
                          onClick={() => OpenPdfModal(ouvrage.pdfVersion)}>Voir PDF</Button></span></span>
                          : null}
                        {ouvrage.type === "3" ? <span> <img alt="..." style={{ width: "20px", height: "20px" }}
                          src={require("assets/img/theme/pdf.png").default} /> 
                          <span>PDF <Button color="primary" size="sm" type="button" className="ml-3"
                          onClick={() => OpenPdfModal(ouvrage.pdfVersion)}>Voir PDF</Button></span>
                          <br />
                          <img alt="..." style={{ width: "20px", height: "20px" }}
                          src={require("assets/img/theme/papier.png").default} /> <span>Papier</span> </span>
                          : null}
                        </p>
                        <p style={{"whiteSpace":"initial"}}><b>Langue : </b>{ouvrage.langue}</p>
                        <p style={{"whiteSpace":"initial"}}><b>Prix : </b> <br/>{ouvrage.prix}dt </p>
                        <p style={{"whiteSpace":"initial"}}><b>Nombre d'exemplaires : </b><Badge color="info" pill>{ouvrage.nbrExemplaire}</Badge></p>

                    </Col>
                  </Row>
                  <div className="ml-3">
                    <hr className="my-4" />
                    {starstab !== undefined ? <ThemeProvider theme={theme}>
                      <Rating values={starstab} /> 
                    </ThemeProvider> : null}
                  </div>
                 <div>
                  </div> 
                  <div >
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
                </div>
                <div className="modal-footer">
                    { user.type==='1' && ouvrage.type !== "2" && ouvrage.nbrExemplaire > ouvrage.nbrEmprunter ? 
                    <Button color="primary" type="button" onClick={toggleAddModal}>
                      Réservation
                    </Button> : null}
                    <Button className="ml-auto" color="primary" type="button" onClick={CloseOuvrageModal}>
                      Annuler
                    </Button>
                 </div>
            </Modal>
            {/* Pdf Modal */}
            <Modal
                        className="modal-dialog-centered"
                        size="lg"
                        style={{ maxWidth: '1600px', width: '80%' }}
                        isOpen={pdfModal}
                        toggle={ClosePdfModal}
                    >

                        <div className="modal-body" style={{ padding: '0px' }}>
                            <Worker workerUrl="https://cdn.jsdelivr.net/npm/pdfjs-dist@2.7.570/build/pdf.worker.js">
                                <div style={{ height: '85vh' }}>
                                    <Viewer fileUrl={`http://localhost:8000/api/files/${pdf}`} />
                                </div>
                            </Worker>
                        </div>

                    </Modal>           
            {/* List of User Modal */}
            <Modal
               className="modal-dialog-centered"
               isOpen={UsersModal}
               toggle={CloseUsersModal} 
               size="lg"

            >
              <div className="modal-header">
                <h4 className="modal-title" id="modal-title-default">
                  Liste des Utilisateurs
                </h4>
                <button
                  aria-label="Close"
                  className="close"
                  data-dismiss="modal"
                  type="button"
                  onClick={CloseUsersModal}
                >
                  <span aria-hidden={true}>×</span>
                </button>
              </div>
              <div className="modal-body"  style={{"height":"300px"}}>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Photo</th>
                    <th scope="col">Nom et Prénom</th>
                    <th scope="col">Stars</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((item,index) =>
                    <tr key={index}>
                      <td style={{"width":"250px"}}>
                        {item.user !== undefined ? <img style={{width:"15%"}}
                          alt="..."
                          src={`http://localhost:8000/api/images/${item.user.photo}`}
                        /> : null}
                      </td>
                      <td>{item.user.name}</td>
                      <td>
                        {item.rate === 1 ? <img alt="..." style={{ width: "20px", height: "20px" ,"marginBottom":"7px" , "marginRight":"7px"}}
                  src={require("assets/img/theme/star.png").default} /> : null}
                        {item.rate === 2 ?
                        <div><img alt="..." style={{ width: "20px", height: "20px" ,"marginBottom":"7px" , "marginRight":"7px"}}
                        src={require("assets/img/theme/star.png").default} /> 
                        <img alt="..." style={{ width: "20px", height: "20px" ,"marginBottom":"7px" , "marginRight":"7px"}}
                        src={require("assets/img/theme/star.png").default} /></div>: null}
                        {item.rate === 3 ?
                        <div><img alt="..." style={{ width: "20px", height: "20px" ,"marginBottom":"7px" , "marginRight":"7px"}}
                        src={require("assets/img/theme/star.png").default} /> 
                        <img alt="..." style={{ width: "20px", height: "20px" ,"marginBottom":"7px" , "marginRight":"7px"}}
                        src={require("assets/img/theme/star.png").default} /> 
                        <img alt="..." style={{ width: "20px", height: "20px" ,"marginBottom":"7px" , "marginRight":"7px"}}
                        src={require("assets/img/theme/star.png").default} /> </div>: null}
                        {item.rate === 4 ? 
                        <div><img alt="..." style={{ width: "20px", height: "20px" ,"marginBottom":"7px" , "marginRight":"7px"}}
                        src={require("assets/img/theme/star.png").default} /> 
                        <img alt="..." style={{ width: "20px", height: "20px" ,"marginBottom":"7px" , "marginRight":"7px"}}
                        src={require("assets/img/theme/star.png").default} /> 
                        <img alt="..." style={{ width: "20px", height: "20px" ,"marginBottom":"7px" , "marginRight":"7px"}}
                        src={require("assets/img/theme/star.png").default} />
                        <img alt="..." style={{ width: "20px", height: "20px" ,"marginBottom":"7px" , "marginRight":"7px"}}
                        src={require("assets/img/theme/star.png").default} /></div>: null}
                        {item.rate === 5 ?
                        <div><img alt="..." style={{ width: "20px", height: "20px" ,"marginBottom":"7px" , "marginRight":"7px"}}
                        src={require("assets/img/theme/star.png").default} /> 
                        <img alt="..." style={{ width: "20px", height: "20px" ,"marginBottom":"7px" , "marginRight":"7px"}}
                        src={require("assets/img/theme/star.png").default} /> 
                        <img alt="..." style={{ width: "20px", height: "20px" ,"marginBottom":"7px" , "marginRight":"7px"}}
                        src={require("assets/img/theme/star.png").default} />
                        <img alt="..." style={{ width: "20px", height: "20px" ,"marginBottom":"7px" , "marginRight":"7px"}}
                        src={require("assets/img/theme/star.png").default} />
                        <img alt="..." style={{ width: "20px", height: "20px" ,"marginBottom":"7px" , "marginRight":"7px"}}
                        src={require("assets/img/theme/star.png").default} /></div>: null}
                      </td>
                    </tr>
                  )}
                  
                </tbody>
              </Table>
              </div>
              <div className="modal-footer">
                  
                  <Button className="ml-auto" color="link" data-dismiss="modal" type="button" onClick={CloseUsersModal}  >
                    Annuler
                  </Button>
                </div>
            </Modal>           
            {/* Reservation  */}
            <Modal className="modal-dialog-centered" isOpen={addModal} toggle={toggleAddModal} >
              <div className="modal-header">
                <h4 className="modal-title" id="modal-title-default">
                  Réservation Ouvrage
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
                      <div className="alert alert-warning" role="alert">
                        Votre réservation en ligne sera automatiquement annuler aprés
                        <b> 3 jours</b> si vous allez pas prendre l'ouvrage.
                      </div>
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
    </>
  );
}
export default Home;
