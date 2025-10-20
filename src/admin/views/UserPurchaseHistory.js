// src/admin/views/UserPurchaseHistory.js

import { useParams, useNavigate } from 'react-router-dom';
import { Container, Table, Button, Alert, Card } from 'react-bootstrap';
// ELIMINAMOS LA IMPORTACIÓN ESTÁTICA DE 'orders'
import { useAppState } from '../../context/CartContext'; // <-- LEER DEL CONTEXTO

const UserPurchaseHistory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // --- OBTENEMOS 'orders' DEL CONTEXTO ---
  const { getUserById, formatPrice, orders } = useAppState();

  const user = getUserById(id);

  if (!user) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">Usuario no encontrado.</Alert>
        <Button variant="secondary" onClick={() => navigate('/admin/usuarios')}>
          Volver a Usuarios
        </Button>
      </Container>
    );
  }

  // Filtramos la lista DINÁMICA de órdenes del contexto
  const userOrders = orders.filter(order => order.email === user.email);

  return (
    <Container>
      <Card className="mb-4">
        <Card.Header as="h4">Historial de Compras de: {user.name} {user.lastName}</Card.Header>
        <Card.Body>
            <Card.Text><strong>Email:</strong> {user.email}</Card.Text>
            <Card.Text><strong>RUN:</strong> {user.run}</Card.Text>
        </Card.Body>
      </Card>

      {userOrders.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Orden #</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {/* Iteramos sobre la lista filtrada */}
            {userOrders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.date}</td>
                <td>{formatPrice(order.total)}</td>
                <td>{order.status}</td> {/* Podrías añadir el Badge aquí si quieres */}
                <td>
                  <Button 
                    variant="primary" 
                    size="sm"
                    onClick={() => navigate(`/admin/ordenes/${order.id}`)}
                  >
                    Ver Detalle
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Alert variant="info">Este usuario no tiene historial de compras.</Alert>
      )}

      <Button variant="secondary" onClick={() => navigate('/admin/usuarios')}>
        Volver a Usuarios
      </Button>
    </Container>
  );
}

export default UserPurchaseHistory;