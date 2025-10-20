// src/views/Contact.js

import { useState } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    // Validación de Nombre
    if (!formData.name) newErrors.name = 'El nombre es requerido.';
    else if (formData.name.length > 100) newErrors.name = 'El nombre no debe exceder los 100 caracteres.';
    
    // Validación de Email
    if (!formData.email) newErrors.email = 'El email es requerido.';
    // --- LÍNEA CORRECTA ---
    else if (!/@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(formData.email)) newErrors.email = 'Email inválido (solo se permiten @duoc.cl, @profesor.duoc.cl, @gmail.com).';
    

    // Validación de Mensaje
    if (!formData.message) newErrors.message = 'El mensaje es requerido.';
    else if (formData.message.length > 500) newErrors.message = 'El mensaje no debe exceder los 500 caracteres.';

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Formulario válido: aquí se enviaría la data
      console.log('Formulario enviado:', formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' }); // Limpiar formulario
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Contáctanos</h2>
          {submitted && <Alert variant="success">¡Mensaje enviado con éxito!</Alert>}
          
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mensaje</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="message"
                value={formData.message}
                onChange={handleChange}
                isInvalid={!!errors.message}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.message}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-grid">
              <Button type="submit" variant="primary">Enviar Mensaje</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Contact;