// src/admin/components/AdminLayout.js

import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import { useAppState } from '../../context/CartContext'; 
import './AdminLayout.css';

const AdminLayout = () => {
    const { currentUser } = useAppState(); 
    const isAdmin = currentUser && currentUser.role === 'admin';

    return (
        <Container fluid>
            <Row>
                <Col md={3} lg={2} className="bg-dark sidebar">
                    <Nav className="flex-column">
                        <Nav.Link as={Link} to="/admin" className="text-white">Dashboard</Nav.Link>
                        <Nav.Link as={Link} to="/admin/productos" className="text-white">Productos</Nav.Link>
                        <Nav.Link as={Link} to="/admin/ordenes" className="text-white">Órdenes</Nav.Link>
                        
                        {/* --- AÑADIDO ENLACE A REPORTES --- */}
                        <Nav.Link as={Link} to="/admin/reportes" className="text-white">Reportes</Nav.Link>

                        {/* --- ENLACES SOLO PARA ADMIN --- */}
                        {isAdmin && (
                            <>
                                <hr className="text-secondary" />
                                <Nav.Link as={Link} to="/admin/usuarios" className="text-white">Usuarios</Nav.Link>
                                <Nav.Link as={Link} to="/admin/categorias" className="text-white">Categorías</Nav.Link>
                            </>
                        )}
                        
                        <hr className="text-secondary" />
                        
                        {/* --- AÑADIDO ENLACE A PERFIL --- */}
                        <Nav.Link as={Link} to="/admin/perfil" className="text-white">Perfil</Nav.Link>
                        <Nav.Link as={Link} to="/" className="text-warning">Volver a la Tienda</Nav.Link>
                    </Nav>
                </Col>

                <Col md={9} lg={10} className="main-content">
                    <Outlet />
                </Col>
            </Row>
        </Container>
    );
}

export default AdminLayout;