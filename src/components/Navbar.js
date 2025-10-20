// src/components/Navbar.js

import { Navbar, Nav, Container, Button, NavDropdown, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAppState } from '../context/CartContext';
import { useState } from 'react';
// --- IMPORTAR ICONOS ---
import { SunFill, MoonStarsFill } from 'react-bootstrap-icons';

const Navigation = () => {
  // --- OBTENER theme y toggleTheme DEL CONTEXTO ---
  const { cartTotal, formatPrice, currentUser, logout, theme, toggleTheme } = useAppState();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // --- FUNCIÓN PARA MANEJAR LA BÚSQUEDA ---
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  return (
    // --- Usar bg="body-tertiary" para que el fondo se adapte al tema ---
    <Navbar bg="body-tertiary" expand="lg" className="mb-4 shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">Puerto Electronic</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* --- LINKS COMPLETOS DE LA TIENDA --- */}
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/productos">Productos</Nav.Link>
            <Nav.Link as={Link} to="/categorias">Categorías</Nav.Link>
            <Nav.Link as={Link} to="/ofertas">Ofertas</Nav.Link>
            <Nav.Link as={Link} to="/nosotros">Nosotros</Nav.Link>
            <Nav.Link as={Link} to="/blog">Blog</Nav.Link>
            <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
          </Nav>

          {/* --- FORMULARIO DE BÚSQUEDA (Funcional) --- */}
          <Form className="d-flex me-3" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Buscar"
              className="me-2"
              aria-label="Buscar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline-success" type="submit">
              Buscar
            </Button>
          </Form>

          {/* --- BOTONES DERECHA (TEMA, CARRITO, LOGIN) --- */}
          <Nav className="align-items-center"> {/* align-items-center para alinear verticalmente */}
            {/* --- BOTÓN DE TEMA --- */}
            <Button
                variant={theme === 'light' ? 'outline-dark' : 'outline-light'} // Cambia el borde según el tema
                onClick={toggleTheme}
                className="me-3"
                aria-label="Cambiar tema"
            >
                {theme === 'light' ? <MoonStarsFill size={20}/> : <SunFill size={20}/>}
            </Button>

            {/* --- CARRITO Y LOGIN/USUARIO --- */}
            <Button as={Link} to="/carrito" variant="success" className="me-3">
              🛒 Carrito {formatPrice(cartTotal)}
            </Button>
            {currentUser ? (
              // Si hay un usuario logueado
              <NavDropdown title={`Hola, ${currentUser.name}`} id="basic-nav-dropdown">
                {(currentUser.role === 'admin' || currentUser.role === 'vendedor') && (
                  <NavDropdown.Item as={Link} to="/admin">
                    Panel Admin
                  </NavDropdown.Item>
                )}
                <NavDropdown.Item onClick={handleLogout}>
                  Cerrar Sesión
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              // Si no hay usuario
              <>
                <Button as={Link} to="/login" variant="outline-primary" className="me-2">
                  Iniciar Sesión
                </Button>
                <Button as={Link} to="/registro" variant="primary">
                  Crear Cuenta
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;