// src/views/Checkout.js

import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useAppState } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Checkout = () => {
    const { cartTotal, formatPrice, currentUser, createOrder } = useAppState();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: ''
    });

    useEffect(() => {
        if (currentUser) {
            setFormData({
                email: currentUser.email || '',
                firstName: currentUser.name || '',
                // Rellenamos Apellido y Dirección, pero no los bloqueamos
                lastName: currentUser.lastName || '', 
                address: currentUser.address || '' 
            });
        }
    }, [currentUser]);

    // Función para manejar cambios en el formulario (si no hay usuario)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePaymentSuccess = () => {
        // Aquí podrías guardar los datos de formData si no hay currentUser
        console.log("Datos de envío (si no hay sesión):", formData); 
        
        const newOrder = createOrder(); 
        if (newOrder) {
            navigate("/pago-exitoso");
        } else {
            navigate("/pago-fallido");
        }
    };
    
    return (
        <Container>
            <h2 className="my-4">Proceso de Pago</h2>
            <Row>
                <Col md={7}>
                    <h4>Dirección de Envío</h4>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            {/* Email: ReadOnly si hay sesión */}
                            <Form.Control 
                                name="email"
                                type="email" 
                                value={formData.email} 
                                onChange={handleChange}
                                readOnly={!!currentUser} 
                            />
                        </Form.Group>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Nombre</Form.Label>
                                {/* Nombre: ReadOnly si hay sesión */}
                                <Form.Control 
                                    name="firstName"
                                    value={formData.firstName} 
                                    onChange={handleChange}
                                    readOnly={!!currentUser} 
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Apellido</Form.Label>
                                {/* --- APELLIDO: SIEMPRE EDITABLE --- */}
                                <Form.Control 
                                    name="lastName"
                                    value={formData.lastName} 
                                    onChange={handleChange} 
                                    readOnly={false} // Siempre editable
                                />
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Dirección</Form.Label>
                             {/* --- DIRECCIÓN: SIEMPRE EDITABLE --- */}
                            <Form.Control 
                                name="address"
                                value={formData.address} 
                                onChange={handleChange} 
                                readOnly={false} // Siempre editable
                            />
                        </Form.Group>

                        <div className="d-grid gap-2">
                            <Button variant="success" onClick={handlePaymentSuccess}>
                                Simular Pago Exitoso
                            </Button>
                            <Button as={Link} to="/pago-fallido" variant="danger">
                                Simular Pago Fallido
                            </Button>
                        </div>
                    </Form>
                </Col>
                <Col md={5}>
                    <h4>Resumen de tu compra</h4>
                    <p>Total a pagar: <strong>{formatPrice(cartTotal)}</strong></p>
                    <hr/>
                    {/* Aquí podrías mapear cartItems si quieres mostrar los productos */}
                </Col>
            </Row>
        </Container>
    );
}

export default Checkout;