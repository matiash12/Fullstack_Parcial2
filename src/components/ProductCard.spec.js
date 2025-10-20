// src/components/ProductCard.spec.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from './ProductCard';
import { AppStateContext } from '../context/CartContext'; 
import { BrowserRouter } from 'react-router-dom';

// (Quitamos el 'import * as jasmineDom' y el 'jasmine.addMatchers' de aquí)

// Definir los spies de Jasmine
const mockAddToCart = jasmine.createSpy('addToCart');
const mockFormatPrice = (p) => `$${p}`;

const mockProduct = {
  id: 1, name: 'Test Product RTL', price: 123.45, image: 'test.jpg', category: 'Test Category',
};

// Definir el VALOR mockeado del contexto
const mockContextValue = {
  formatPrice: mockFormatPrice,
  addToCart: mockAddToCart,
  products: [],
  cartItems: [],
  currentUser: null,
  theme: 'light',
};

describe('ProductCard Component (Jasmine/RTL)', () => {

  // Configurar el renderizado y limpiar mocks antes de CADA prueba
  beforeEach(() => {
    mockAddToCart.calls.reset(); 

    render(
      <BrowserRouter>
        <AppStateContext.Provider value={mockContextValue}> 
          <ProductCard product={mockProduct} />
        </AppStateContext.Provider>
      </BrowserRouter>
    );
  });

  // --- Prueba de Renderizado ---
  it('debería renderizar el nombre y precio del producto', () => {
    // Esta prueba debería funcionar ahora
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(mockFormatPrice(mockProduct.price))).toBeInTheDocument();
  });

  // --- Prueba de Eventos ---
  it('debería llamar a addToCart cuando se hace clic en el botón', () => {
    // Esta prueba ya funcionaba
    const button = screen.getByRole('button', { name: /añadir al carrito/i });
    fireEvent.click(button); 
    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });
});