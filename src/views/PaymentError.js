// src/views/PaymentError.js
import { Container, Alert, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PaymentError = () => (
    <Container className="text-center mt-5">
        <Card border="danger">
            <Card.Header as="h4" className="bg-danger text-white">Error en el Pago</Card.Header>
            <Card.Body>
                <Card.Title>¡Lo sentimos!</Card.Title>
                <Card.Text>
                    Hubo un problema al procesar tu pago. Por favor, verifica tus datos
                    e inténtalo de nuevo. Si el problema persiste, contacta a soporte.
                </Card.Text>
                {/* Llevamos de vuelta al carrito para que pueda reintentar desde el modal */}
                <Button as={Link} to="/carrito" variant="warning">
                    Volver al Carrito e Intentar Nuevamente
                </Button>
                 <Button as={Link} to="/" variant="secondary" className="ms-2">
                    Volver al Inicio
                </Button>
            </Card.Body>
        </Card>
    </Container>
);

export default PaymentError;