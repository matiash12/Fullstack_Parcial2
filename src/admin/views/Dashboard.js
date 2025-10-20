// src/admin/views/Dashboard.js

import { Card, Col, Row, Table, Alert, Button } from 'react-bootstrap';
import { useAppState } from '../../context/CartContext'; // Asegúrate que el path sea correcto
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { products, formatPrice } = useAppState();

    // Filtramos productos donde el stock es igual o menor al stock crítico
    // Opcional: añadimos que el stock sea bajo (ej. < 5) si el stock crítico no se definió (es 0)
    const stockCriticoProducts = products.filter(p => 
        (p.stockCritico > 0 && p.stock <= p.stockCritico) ||
        (p.stockCritico === 0 && p.stock <= 5)
    );

    return (
        <div>
            <h2 className="mb-4">Dashboard</h2>
            <p>Bienvenido al panel de administración de Puerto Electronic.</p>
            
            <Row>
                <Col md={4}>
                    <Card bg="primary" text="white" className="mb-3">
                        <Card.Header>Total de Productos</Card.Header>
                        <Card.Body>
                            {/* DATO REAL */}
                            <Card.Title>{products.length}</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card bg="success" text="white" className="mb-3">
                        <Card.Header>Ventas del Mes </Card.Header>
                        <Card.Body>
                            <Card.Title>$5,430,000</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card bg="info" text="white" className="mb-3">
                        <Card.Header>Nuevos Usuarios </Card.Header>
                        <Card.Body>
                            <Card.Title>7</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* --- NUEVA SECCIÓN: STOCK CRÍTICO --- */}
            <h4>Productos con Stock Crítico</h4>
            {stockCriticoProducts.length > 0 ? (
                <Table striped bordered hover responsive size="sm">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nombre</th>
                            <th>Stock Actual</th>
                            <th>Stock Crítico</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stockCriticoProducts.map(p => (
                            <tr key={p.id}>
                                <td>{p.code}</td>
                                <td>{p.name}</td>
                                <td>
                                    <strong className="text-danger">{p.stock}</strong>
                                </td>
                                <td>{p.stockCritico || 'N/A'}</td>
                                <td>
                                    <Button as={Link} to={`/admin/productos/editar/${p.id}`} variant="warning" size="sm">
                                        Gestionar
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <Alert variant="success">
                    ¡Todo bien! No hay productos con stock crítico.
                </Alert>
            )}
        </div>
    );
}

export default Dashboard;