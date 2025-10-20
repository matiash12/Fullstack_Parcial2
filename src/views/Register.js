// src/views/Register.js

import { useState, useEffect } from 'react';
import { Container, Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom'; // Importamos useParams
import { useAppState } from '../context/CartContext';
import { regiones } from '../data/regiones'; // Importamos las regiones

const Register = () => {
  const [formData, setFormData] = useState({
    run: '',
    name: '',
    lastName: '',
    email: '',
    birthDate: '',
    role: 'client', // Rol por defecto
    region: '',
    comuna: '',
    address: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [comunas, setComunas] = useState([]);
  const [success, setSuccess] = useState('');
  
  // --- OBTENER DATOS DE LA URL ---
  const { id } = useParams(); // Obtenemos el ID de la URL
  const isEditing = id !== undefined; // Si hay ID, estamos editando

  // --- OBTENER FUNCIONES DEL CONTEXTO ---
  const { registerUser, currentUser, getUserById, updateUser } = useAppState();
  const navigate = useNavigate();

  // --- EFECTO: CARGAR DATOS SI ESTAMOS EDITANDO ---
  useEffect(() => {
    if (isEditing) {
      const existingUser = getUserById(id);
      if (existingUser) {
        // Cargamos los datos, pero dejamos la contraseña vacía por seguridad
        setFormData({ ...existingUser, password: '' });
      }
    }
  }, [id, isEditing, getUserById]); // Dependencias del efecto


  // --- EFECTO: LÓGICA DE REGIONES Y COMUNAS ---
  useEffect(() => {
    if (formData.region) {
      const regionSeleccionada = regiones.find(r => r.nombre === formData.region);
      const comunasRegion = regionSeleccionada ? regionSeleccionada.comunas : [];
      setComunas(comunasRegion);
      
      // Si la comuna guardada no está en la nueva lista, la resetea
      if (!comunasRegion.includes(formData.comuna)) {
         setFormData(f => ({ ...f, comuna: '' }));
      }
    } else {
      setComunas([]);
    }
  }, [formData.region]); // Dependencia: solo se ejecuta al cambiar la región


  // --- LÓGICA DE VALIDACIÓN ---
  const validarRun = (run) => {
    let runLimpio = run.replace(/\./g, '').replace(/-/,''); 
    const dv = runLimpio.slice(-1).toUpperCase();
    let rut = runLimpio.slice(0, -1);
    
    if (!/^\d+$/.test(rut)) return false; 

    let m = 0, s = 1;
    for (; rut; rut = Math.floor(rut / 10)) {
        s = (s + rut % 10 * (9 - m++ % 6)) % 11;
    }
    const dvCalculado = s ? s - 1 : 'K';
    return dvCalculado == dv;
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;

    // RUN: Requerido, min 7, max 9, válido
    if (!formData.run) newErrors.run = 'El RUN es requerido.';
    else if (formData.run.length < 7 || formData.run.length > 10) newErrors.run = 'Formato de RUN inválido (ej: 12345678-9).';
    else if (!validarRun(formData.run)) newErrors.run = 'El RUN no es válido.';

    // Nombre: Requerido, max 50
    if (!formData.name) newErrors.name = 'El nombre es requerido.';
    else if (formData.name.length > 50) newErrors.name = 'Máximo 50 caracteres.';

    // Apellidos: Requerido, max 100
    if (!formData.lastName) newErrors.lastName = 'El apellido es requerido.';
    else if (formData.lastName.length > 100) newErrors.lastName = 'Máximo 100 caracteres.';
    
    // Email: Requerido, max 100, dominio válido
    if (!formData.email) newErrors.email = 'El email es requerido.';
    else if (formData.email.length > 100) newErrors.email = 'Máximo 100 caracteres.';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Email inválido (solo @duoc.cl, @profesor.duoc.cl, @gmail.com).';

    // Password: Requerida solo al crear
    if (!isEditing && !formData.password) {
      newErrors.password = 'La contraseña es requerida.';
    } else if (formData.password && (formData.password.length < 4 || formData.password.length > 10)) {
      newErrors.password = 'La contraseña debe tener entre 4 y 10 caracteres.';
    }
    
    // Dirección: Requerido, max 300
    if (!formData.address) newErrors.address = 'La dirección es requerida.';
    else if (formData.address.length > 300) newErrors.address = 'Máximo 300 caracteres.';
    
    if (!formData.region) newErrors.region = 'La región es requerida.';
    if (!formData.comuna) newErrors.comuna = 'La comuna es requerida.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Devuelve true si no hay errores
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      
      if (isEditing) {
        // --- LLAMA A ACTUALIZAR ---
        updateUser(formData);
        setSuccess('¡Usuario actualizado! Redirigiendo...');
      } else {
        // --- LLAMA A REGISTRAR ---
        registerUser(formData);
        setSuccess('¡Registro exitoso! Redirigiendo...');
      }

      setTimeout(() => {
        // Navega al panel si fue un admin, o al home si fue un cliente
        if (currentUser && currentUser.role === 'admin') {
            navigate('/admin/usuarios');
        } else {
            navigate('/');
        }
      }, 2000);
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">
                {isEditing ? 'Editar Usuario' : 'Crear Cuenta'}
              </Card.Title>
              {success && <Alert variant="success">{success}</Alert>}
              
              <Form noValidate onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>RUN</Form.Label>
                      <Form.Control type="text" name="run" value={formData.run} onChange={handleChange} isInvalid={!!errors.run} placeholder="12345678-9" />
                      <Form.Control.Feedback type="invalid">{errors.run}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Fecha de Nacimiento</Form.Label>
                      <Form.Control type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} isInvalid={!!errors.name} />
                      <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Apellidos</Form.Label>
                      <Form.Control type="text" name="lastName" value={formData.lastName} onChange={handleChange} isInvalid={!!errors.lastName} />
                      <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} isInvalid={!!errors.email} />
                      <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Contraseña</Form.Label>
                      <Form.Control 
                        type="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        isInvalid={!!errors.password} 
                        placeholder={isEditing ? '(Dejar en blanco para no cambiar)' : ''} 
                      />
                      <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Región</Form.Label>
                      <Form.Select name="region" value={formData.region} onChange={handleChange} isInvalid={!!errors.region}>
                        <option value="">Selecciona una región</option>
                        {regiones.map(r => <option key={r.nombre} value={r.nombre}>{r.nombre}</option>)}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">{errors.region}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Comuna</Form.Label>
                      <Form.Select name="comuna" value={formData.comuna} onChange={handleChange} isInvalid={!!errors.comuna} disabled={comunas.length === 0}>
                        <option value="">Selecciona una comuna</option>
                        {comunas.map(c => <option key={c} value={c}>{c}</option>)}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">{errors.comuna}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} isInvalid={!!errors.address} placeholder="Av. Siempre Viva 123" />
                  <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
                </Form.Group>

                {/* --- ESTO SOLO SE MUESTRA SI UN ADMIN ESTÁ CREANDO/EDITANDO --- */}
                {currentUser && currentUser.role === 'admin' && (
                  <Form.Group className="mb-3">
                    <Form.Label>Tipo de Usuario</Form.Label>
                    <Form.Select name="role" value={formData.role} onChange={handleChange}>
                      <option value="client">Cliente</option>
                      <option value="admin">Administrador</option>
                      <option value="vendedor">Vendedor</option>
                    </Form.Select>
                  </Form.Group>
                )}

                <div className="d-grid">
                  <Button variant="primary" type="submit">
                    {isEditing ? 'Guardar Cambios' : 'Crear Cuenta'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;