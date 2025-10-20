// src/views/Categories.js

import { useState } from 'react';
import { Container, Row, Col, Button, ButtonGroup } from 'react-bootstrap';
// --- IMPORTANTE: Importar el Contexto ---
import { useAppState } from '../context/CartContext'; // Asegúrate que el path sea correcto

import ProductCard from '../components/ProductCard';

const Categories = () => {
  // --- IMPORTANTE: Obtener los productos del Contexto ---
  const { products } = useAppState();

  // Obtenemos categorías únicas de la lista de productos *dinámica*
  const categories = [...new Set(products.map(p => p.category))];
  
  // Selecciona la primera categoría por defecto, si existe
  const [selectedCategory, setSelectedCategory] = useState(categories[0] || '');

  // Filtramos los productos según la categoría seleccionada
  const filteredProducts = products.filter(
    (product) => product.category === selectedCategory
  );

  return (
    <Container>
      <h2 className="text-center mb-4">Categorías</h2>
      
      <Row className="mb-4 justify-content-center">
        <Col md={8}>
          <ButtonGroup className="w-100">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'primary' : 'outline-primary'}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </ButtonGroup>
        </Col>
      </Row>

      <h3 className="mb-3">{selectedCategory}</h3>
      <Row xs={1} md={2} lg={4} className="g-4">
        {filteredProducts.map((product) => (
          <Col key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Categories;