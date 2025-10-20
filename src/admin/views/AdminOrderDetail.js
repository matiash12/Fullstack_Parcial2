// src/admin/views/AdminOrderDetail.js

import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Table, Badge, Button, Alert } from 'react-bootstrap';
// ELIMINAMOS LA IMPORTACIÓN ESTÁTICA DE 'orders'
import { useAppState } from '../../context/CartContext'; // <-- LEER DEL CONTEXTO

const AdminOrderDetail = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  // --- OBTENEMOS 'orders' DEL CONTEXTO ---
  const { formatPrice, orders } = useAppState();
  
  // Buscamos la orden en la lista dinámica del contexto
  const order = orders.find(o => o.id === Number(id));

  const getStatusBadge = (status) => {
    switch (status) {
        case 'Completado': return 'success';
        case 'Pendiente': return 'warning';
        case 'Enviado': return 'info';
        case 'Cancelado': return 'danger';
        default: return 'secondary';
    }
  };

  if (!order) {
    return (
        <Container className="mt-5">
            <Alert variant="danger">Orden no encontrada.</Alert>
            <Button variant="secondary" onClick={() => navigate('/admin/ordenes')}>
                Volver a Órdenes
            </Button>
        </Container>
    );
  }

  return (
    <Container>
      <h2 className="mb-4">Detalle de la Orden #{order.id}</h2>
      
      <Row className="mb-4">
        <Col md={4}>
          <Card>
            <Card.Header as="h5">Datos del Cliente</Card.Header>
            <Card.Body>
              <Card.Text><strong>Nombre:</strong> {order.clientName}</Card.Text>
              <Card.Text><strong>Email:</strong> {order.email}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <Card.Header as="h5">Datos de la Orden</Card.Header>
            <Card.Body>
              <Card.Text><strong>Fecha:</strong> {order.date}</Card.Text>
              <Card.Text>
                <strong>Estado:</strong> 
                <Badge bg={getStatusBadge(order.status)} className="ms-2">{order.status}</Badge>
              </Card.Text>
              <Card.Text><strong>Total:</strong> {formatPrice(order.total)}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h4>Productos en la Orden</h4>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID Producto</th>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{formatPrice(item.price)}</td>
              <td>{formatPrice(item.price * item.quantity)}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button variant="secondary" onClick={() => navigate('/admin/ordenes')}>
        Volver a Órdenes
      </Button>
    </Container>
  );
}

export default AdminOrderDetail;