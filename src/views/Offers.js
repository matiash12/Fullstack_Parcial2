// src/views/Offers.js

import { Container, Row, Col, Alert } from 'react-bootstrap';
import { useAppState } from '../context/CartContext'; // Asegúrate que el path sea correcto
import ProductCard from '../components/ProductCard';

const Offers = () => {
  const { products } = useAppState();

  // Filtramos solo los productos que tienen onOffer === true
  const offerProducts = products.filter(product => product.onOffer);

  return (
    <Container>
      <h2 className="mb-4">Productos en Oferta</h2>
      
      {offerProducts.length > 0 ? (
        <Row xs={1} md={2} lg={4} className="g-4">
          {offerProducts.map((product) => (
            <Col key={product.id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      ) : (
        <Alert variant="info">
          Actualmente no tenemos productos en oferta. ¡Vuelve pronto!
        </Alert>
      )}
    </Container>
  );
}

export default Offers;