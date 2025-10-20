// src/views/PaymentSuccess.js
import { Container, Alert, Card, Table, Row, Col, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom'; // <-- Importar useLocation
import { useAppState } from '../context/CartContext'; // <-- Para formatPrice

const PaymentSuccess = () => {
    const location = useLocation(); // <-- Hook para obtener el state
    const order = location.state?.order; // <-- Obtener la orden pasada
    const { formatPrice } = useAppState();

    if (!order) {
        // Caso de error: si se llega aquí sin datos de orden
        return (
            <Container className="text-center mt-5">
                <Alert variant="warning">
                    <Alert.Heading>¡Oops!</Alert.Heading>
                    <p>No se encontraron los detalles de la orden. Es posible que hayas recargado la página.</p>
                </Alert>
                <Link to="/">Volver al Inicio</Link>
            </Container>
        );
    }

    // --- DISEÑO TIPO BOLETA ---
    return (
        <Container className="my-5">
            <Alert variant="success" className="text-center">
                <Alert.Heading>¡Pago Exitoso! Tu compra ha sido realizada.</Alert.Heading>
            </Alert>

            <Card className="p-4">
                <h3 className="text-center mb-4">Resumen de tu Compra (Boleta)</h3>
                <Row className="mb-3">
                    <Col><strong>Orden #:</strong> {order.id}</Col>
                    <Col className="text-end"><strong>Fecha:</strong> {order.date}</Col>
                </Row>
                <Row className="mb-3">
                     <Col><strong>Cliente:</strong> {order.clientName}</Col>
                     <Col className="text-end"><strong>Email:</strong> {order.email}</Col>
                </Row>
                <hr/>
                <h4>Productos Comprados</h4>
                <Table striped bordered responsive size="sm">
                     <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Precio Unit.</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.items.map(item => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{formatPrice(item.price)}</td>
                                <td>{formatPrice(item.price * item.quantity)}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <hr/>
                <h4 className="text-end">Total Pagado: {formatPrice(order.total)}</h4>
            </Card>

            <div className="text-center mt-4">
                <Button as={Link} to="/" variant="primary">Volver al Inicio</Button>
            </div>
        </Container>
    );
}

export default PaymentSuccess;