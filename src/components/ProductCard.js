// src/components/ProductCard.js
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useAppState } from '../context/CartContext'; // Asegúrate que el path sea correcto

const ProductCard = ({ product }) => {
  const { addToCart, formatPrice } = useAppState();

  // --- IMPORTANTE: URL de la imagen ---
  // Si 'product.image' existe y no está vacío, úsalo.
  // Si no, usa un placeholder genérico.
  const imageUrl = product.image || 'https://via.placeholder.com/400x300';

  return (
    <Card className="h-100 text-center">
      {/* Usamos la variable imageUrl */}
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>
          <strong>{formatPrice(product.price)}</strong>
        </Card.Text>
        <Button 
          variant="primary" 
          className="mt-auto"
          onClick={() => addToCart(product)}
        >
          Añadir al Carrito
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;