// src/admin/views/AdminOrders.js

import { Table, Button, Container, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
// ELIMINAMOS LA IMPORTACIÓN ESTÁTICA DE 'orders'
import { useAppState } from '../../context/CartContext'; // <-- LEER DEL CONTEXTO

const AdminOrders = () => {
    // --- OBTENEMOS 'orders' DEL CONTEXTO ---
    const { formatPrice, orders } = useAppState();

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Completado': return 'success';
            case 'Pendiente': return 'warning';
            case 'Enviado': return 'info';
            case 'Cancelado': return 'danger';
            default: return 'secondary';
        }
    };

    return (
        <Container>
            <h2 className="mb-4">Gestionar Órdenes</h2>
            
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Orden #</th>
                        <th>Fecha</th>
                        <th>Cliente</th>
                        <th>Email</th>
                        <th>Total</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Usamos la variable 'orders' del contexto */}
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.date}</td>
                            <td>{order.clientName}</td>
                            <td>{order.email}</td>
                            <td>{formatPrice(order.total)}</td>
                            <td>
                                <Badge bg={getStatusBadge(order.status)}>
                                    {order.status}
                                </Badge>
                            </td>
                            <td>
                                <Button as={Link} to={`/admin/ordenes/${order.id}`} variant="primary" size="sm">
                                    Ver Detalle
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default AdminOrders;