// src/views/Login.js
import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../context/CartContext'; // Asegúrate que el path sea correcto

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAppState();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError(''); // Limpia errores previos

    // Validaciones de P1 (Asegúrate de que estas validaciones sean las que necesitas)
    const emailRegex = /@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
    if (!emailRegex.test(email)) {
      setError('Email inválido (solo se permiten @duoc.cl, @profesor.duoc.cl, @gmail.com).');
      return;
    }
    if (password.length < 4 || password.length > 10) {
        setError('La contraseña debe tener entre 4 y 10 caracteres.');
        return;
    }

    const user = login(email, password);

    if (user) {
      // Si el usuario es 'admin' O 'vendedor', llévalo al panel de admin
      if (user.role === 'admin' || user.role === 'vendedor') {
        navigate('/admin');
      } else {
        // Si es cliente, llévalo a la página principal
        navigate('/');
      }
    } else {
      setError('Credenciales incorrectas. Por favor, intenta de nuevo.');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <Card style={{ width: '30rem' }}>
        <Card.Body>
          <Card.Title className="text-center">Iniciar Sesión</Card.Title>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleLogin}>
            {/* --- CORRECCIÓN AQUÍ: Añadir controlId --- */}
            <Form.Group className="mb-3" controlId="loginEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa tu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            {/* --- CORRECCIÓN AQUÍ: Añadir controlId --- */}
            <Form.Group className="mb-3" controlId="loginPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <div className="d-grid">
              <Button variant="primary" type="submit">
                Ingresar
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;