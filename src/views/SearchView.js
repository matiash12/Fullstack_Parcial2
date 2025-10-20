// src/views/SearchView.js

import { Container, Row, Col, Alert } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom'; // <-- Hook para obtener parámetros query
import { useAppState } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { useEffect, useState } from 'react';

const SearchView = () => {
  const [searchParams] = useSearchParams();
  const { products } = useAppState();
  const [filteredProducts, setFilteredProducts] = useState([]);

  const query = searchParams.get('query') || ''; // Obtener la búsqueda desde la URL

  useEffect(() => {
    if (query) {
      // Filtrar productos por nombre o descripción (insensible a mayúsculas/minúsculas)
      const results = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(query.toLowerCase()))
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]); // Limpiar resultados si no hay búsqueda
    }
  }, [query, products]); // Re-ejecutar filtro si cambia la búsqueda o los productos

  return (
    <Container>
      <h2 className="mb-4">Resultados de Búsqueda para: "{query}"</h2>

      {filteredProducts.length > 0 ? (
        <Row xs={1} md={2} lg={4} className="g-4">
          {filteredProducts.map((product) => (
            <Col key={product.id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      ) : (
        <Alert variant="info">
          No se encontraron productos que coincidan con tu búsqueda.
        </Alert>
      )}
    </Container>
  );
}

export default SearchView;