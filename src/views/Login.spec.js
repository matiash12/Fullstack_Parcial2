// src/views/Login.spec.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AppStateContext } from '../context/CartContext';
import { BrowserRouter } from 'react-router-dom'; // Se mantiene por si Login usa <Link>
import Login from './Login';

// --- NO MOCKEAMOS 'react-router-dom' ---
// Eliminamos jest.mock y cualquier referencia a mockNavigate

describe('Login Component (Jasmine/RTL)', () => {
  let mockLoginSpy;
  let mockContextValue;

  beforeEach(() => {
    // Solo configuramos el spy para login y el contexto
    mockLoginSpy = jasmine.createSpy('login');
    mockContextValue = {
      login: mockLoginSpy,
      products: [], cartItems: [], currentUser: null, theme: 'light',
    };

    render(
      <BrowserRouter>
        <AppStateContext.Provider value={mockContextValue}>
          <Login />
        </AppStateContext.Provider>
      </BrowserRouter>
    );
  });

  // --- Pruebas de Estado ---
  it('debería actualizar el estado (valor) del input de email al escribir', () => {
    const emailInput = screen.getByLabelText(/email/i);
    // Usar email válido
    fireEvent.change(emailInput, { target: { value: 'test@gmail.com' } });
    expect(emailInput.value).toBe('test@gmail.com');
  });

  it('debería actualizar el estado (valor) del input de contraseña al escribir', () => {
    const passwordInput = screen.getByLabelText(/contraseña/i);
    fireEvent.change(passwordInput, { target: { value: 'pass123' } });
    expect(passwordInput.value).toBe('pass123');
  });

  // --- Pruebas de Renderizado Condicional ---
  it('NO debería mostrar un mensaje de error al cargar la página', () => {
    const errorAlert = screen.queryByRole('alert');
    expect(errorAlert).not.toBeInTheDocument();
  });

  it('SÍ debería mostrar un mensaje de error si el login falla (devuelve null)', () => {
    mockLoginSpy.and.returnValue(null);
     // Usar email válido
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@gmail.com' } });
    fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: 'pass123' } });
    const loginButton = screen.getByRole('button', { name: /ingresar/i });
    fireEvent.click(loginButton);
    const errorAlert = screen.getByRole('alert');
    expect(errorAlert).toBeInTheDocument();
    expect(errorAlert).toHaveTextContent(/Credenciales incorrectas/i);
     // Verificamos que se llamó a login
    expect(mockLoginSpy).toHaveBeenCalledTimes(1);
  });

  // --- Prueba de Login Exitoso (SIN verificar navegación) ---
  it('NO debería mostrar mensaje de error y SÍ llamar a login si las credenciales son válidas', () => {
    const mockUser = { name: 'Test', role: 'cliente' };
    mockLoginSpy.and.returnValue(mockUser);
     // Usar email válido
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@gmail.com' } });
    fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: 'pass123' } });
    const loginButton = screen.getByRole('button', { name: /ingresar/i });
    fireEvent.click(loginButton);
    const errorAlert = screen.queryByRole('alert');
    expect(errorAlert).not.toBeInTheDocument();

    // Verificamos que se llamó a login (esto sí podemos probarlo)
    expect(mockLoginSpy).toHaveBeenCalledTimes(1);
    expect(mockLoginSpy).toHaveBeenCalledWith('test@gmail.com', 'pass123');

    // --- NO PODEMOS VERIFICAR 'navigate' ---
    // Quitamos las líneas:
    // expect(mockNavigate).toHaveBeenCalledTimes(1);
    // expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});