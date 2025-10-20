// src/views/Products.js

import { Container, Row, Col } from 'react-bootstrap';
// --- IMPORTANTE: Importar el Contexto ---
import { useAppState } from '../context/CartContext'; // Asegúrate que el path sea correcto

import ProductCard from '../components/ProductCard'; 

const Products = () => {
  // --- IMPORTANTE: Obtener los productos del Contexto ---
  const { products } = useAppState();

  return (
    <Container>
      <h2 className="mb-4">Nuestro Catálogo</h2>
      <Row xs={1} md={2} lg={4} className="g-4">
        {products.map((product) => (
          <Col key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Products;