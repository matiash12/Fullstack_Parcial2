// src/views/About.js

import { Container, Row, Col, Image } from 'react-bootstrap';

const About = () => {
  return (
    <Container className="my-5">
      <Row>
        <Col md={6}>
          <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBc-KXXpdub6wfWCz3mBTlCeXHMmf9CQyMXQ&s" fluid rounded />
        </Col>
        <Col md={6}>
          <h2>Sobre Puerto Electronic</h2>
          <p>
            Fundada en 2020, Puerto Electronic nació con la misión de proveer 
            la mejor tecnología a la región sur de Chile. 
            Somos un equipo de apasionados por la electrónica y el gaming.
          </p>
          <p>
            Nuestra visión es ser la tienda líder en productos electrónicos, 
            ofreciendo no solo precios competitivos, sino también una 
            asesoría experta y un servicio al cliente inigualable.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default About;