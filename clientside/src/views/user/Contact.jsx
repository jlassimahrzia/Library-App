import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import React from "react";

// reactstrap components
import { Card, Container, Row,Button,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Col } from "reactstrap";

// core components
import PageHeader from "components/Headers/PageHeader.jsx" 
function Contact(){
    return(
        <>
        <PageHeader />
        <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow border-0">
                    <MapContainer center={[36.813692, 10.063816]} zoom={13} 
                    style={{ height: "50vh", width: "100%" }} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[36.813692, 10.063816]}>
                            <Popup>
                            Adresse <br /> Bibliothéque
                            </Popup>
                        </Marker>
                    </MapContainer>
            </Card>
          </div>
        </Row>
        <Row className="mt-5 mb-5">
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <CardBody className="pt-0 pt-md-4">
                <div className="text-center">
                  <h3>
                    DigitiLab
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    Campus Universitaire de la Manouba, 2010 Manouba, Tunisia
                    Tél. : ( +216 ) 71.600.444. Fax, : ( +216 ) 71.600.449.
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    horaires: la bibliothèque est ouverte de 08h.30 à 16h.30
                    samedi: de 08h.30 à 13h
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    Services: Consultation sur place -- Prêt à domicile
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
                    <h3 className="mb-0">Contactez Nous</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Informations
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Nom et Prénom
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="nom.prénom"
                            id="input-username"
                            placeholder="Username"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Adresse Email 
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="nom@example.com"
                            type="email"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Sujet
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-address"
                            placeholder="Sujet"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  {/* Description */}
                  <h6 className="heading-small text-muted mb-4">Message</h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label>Message</label>
                      <Input
                        className="form-control-alternative"
                        placeholder="Ecrivez votre message"
                        rows="4"
                        defaultValue=""
                        type="textarea"
                      />
                    </FormGroup>
                  </div>
                  <Button color="primary" type="button" >
                      Envoyer
                  </Button> 
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
        </>
    )
}
export default Contact;