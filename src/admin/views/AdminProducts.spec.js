// src/admin/views/AdminProducts.spec.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AppStateContext } from '../../context/CartContext';
import { BrowserRouter } from 'react-router-dom';
import AdminProducts from './AdminProducts';

// (Quitamos el 'import jasmineDom' y el 'jasmine.addMatchers' de aquí)

// Definir datos simulados
const mockProducts = [
  { id: 1, code: 'L001', name: 'Laptop Pro', category: 'Laptops', price: 1000, stock: 10, onOffer: false },
  { id: 2, code: 'M002', name: 'Monitor Curvo', category: 'Monitores', price: 300, stock: 5, onOffer: true },
  { id: 3, code: 'T003', name: 'Teclado Mecánico', category: 'Periféricos', price: 150, stock: 20, onOffer: false },
];

// Definir spies y mocks
const mockDeleteProduct = jasmine.createSpy('deleteProduct');
const mockFormatPrice = (p) => `$${p}`; 

// Definir el valor del contexto
const mockContextValue = {
  products: mockProducts, 
  deleteProduct: mockDeleteProduct,
  formatPrice: mockFormatPrice,
  cartItems: [], currentUser: null, theme: 'light',
};

describe('AdminProducts Component (Jasmine/RTL)', () => {

  beforeEach(() => {
    mockDeleteProduct.calls.reset();

    render(
      <BrowserRouter>
        <AppStateContext.Provider value={mockContextValue}>
          <AdminProducts />
        </AppStateContext.Provider>
      </BrowserRouter>
    );
  });

  // --- 1. Prueba de Renderizado de Listas ---
  it('debería renderizar todos los elementos de la lista de productos', () => {
    expect(screen.getByText('Laptop Pro')).toBeInTheDocument();
    expect(screen.getByText('Monitor Curvo')).toBeInTheDocument();
    expect(screen.getByText('Teclado Mecánico')).toBeInTheDocument();

    const deleteButtons = screen.getAllByRole('button', { name: /eliminar/i });
    expect(deleteButtons.length).toBe(mockProducts.length);
  });

  // --- 2. Prueba de Evento (Clic en Eliminar) ---
  it('debería llamar a deleteProduct con el ID correcto al hacer clic en Eliminar', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const deleteButtons = screen.getAllByRole('button', { name: /eliminar/i });
    fireEvent.click(deleteButtons[1]); 
    expect(window.confirm).toHaveBeenCalledTimes(1);
    expect(mockDeleteProduct).toHaveBeenCalledTimes(1);
    expect(mockDeleteProduct).toHaveBeenCalledWith(2); 
  });

  it('NO debería llamar a deleteProduct si el usuario cancela la confirmación', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    const deleteButtons = screen.getAllByRole('button', { name: /eliminar/i });
    fireEvent.click(deleteButtons[0]);
    expect(window.confirm).toHaveBeenCalledTimes(1);
    expect(mockDeleteProduct).not.toHaveBeenCalled();
  });
});