// src/views/CartView.js

import { Container, Row, Col, Table, Button, InputGroup, FormControl, Alert, Modal, Form } from 'react-bootstrap'; // <-- Añadir Modal y Form
import { useNavigate } from 'react-router-dom'; // <-- Cambiado Link por useNavigate
import { useAppState } from '../context/CartContext';
import { useState, useEffect } from 'react'; // <-- Añadir useState y useEffect

const CartView = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    cartTotal, 
    formatPrice, 
    clearCart, // <-- Necesitamos clearCart
    currentUser, // <-- Para auto-relleno
    createOrder // <-- Para crear la orden
  } = useAppState();
  
  const navigate = useNavigate();

  // --- ESTADOS PARA EL MODAL Y EL FORMULARIO ---
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
      email: '', firstName: '', lastName: '', address: ''
  });

  // --- LÓGICA DE AUTO-RELLENO (Movida desde Checkout.js) ---
  useEffect(() => {
    if (showModal && currentUser) { // Solo rellena si el modal está abierto y hay usuario
      setFormData({
        email: currentUser.email || '',
        firstName: currentUser.name || '',
        lastName: currentUser.lastName || '',
        address: currentUser.address || ''
      });
    } else if (!currentUser) { // Limpiar si no hay usuario
        setFormData({ email: '', firstName: '', lastName: '', address: '' });
    }
  }, [currentUser, showModal]); // Ejecutar cuando cambie el usuario O se abra el modal

  // --- MANEJADORES DEL MODAL ---
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  // --- MANEJADOR DE CAMBIOS EN EL FORMULARIO DEL MODAL ---
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // --- MANEJADOR PARA CONFIRMAR COMPRA (Movido desde Checkout.js) ---
  const handlePurchaseConfirm = () => {
    // Aquí podrías añadir validaciones al formData si no hay currentUser
    console.log("Datos de envío (modal):", formData); 

    const newOrder = createOrder(); 
    if (newOrder) {
      handleCloseModal(); // Cierra el modal
      // Navega a la página de éxito PASANDO la orden creada
      navigate("/pago-exitoso", { state: { order: newOrder } }); 
    } else {
      // Manejar error (ej. carrito vacío, aunque el botón debería estar deshabilitado)
      handleCloseModal();
      navigate("/pago-fallido"); // O mostrar un error en el modal
    }
  };

  return (
    <> {/* Usamos Fragment para envolver todo */}
      <Container>
        <h2 className="my-4">Carrito de Compras</h2>
        {cartItems.length === 0 ? (
          <Alert variant="info">Tu carrito está vacío.</Alert>
        ) : (
          <Row>
            {/* --- TABLA DEL CARRITO (sin cambios internos, pero con botón Limpiar) --- */}
            <Col md={8}>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Producto</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th><th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map(item => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{formatPrice(item.price)}</td>
                      <td>
                        <InputGroup style={{ width: '120px' }}>
                          <Button variant="outline-secondary" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</Button>
                          <FormControl className="text-center" value={item.quantity} readOnly />
                          <Button variant="outline-secondary" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</Button>
                        </InputGroup>
                      </td>
                      <td>{formatPrice(item.price * item.quantity)}</td>
                      <td>
                        <Button variant="danger" size="sm" onClick={() => removeFromCart(item.id)}>
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              {/* --- NUEVO BOTÓN LIMPIAR CARRITO --- */}
              <Button variant="outline-danger" onClick={clearCart}>
                Limpiar Carrito
              </Button>
            </Col>

            {/* --- RESUMEN Y BOTÓN COMPRAR --- */}
            <Col md={4}>
              <h4>Resumen del Pedido</h4>
              <hr />
              <h5>Total: {formatPrice(cartTotal)}</h5>
              <div className="d-grid gap-2">
                  {/* --- BOTÓN ACTUALIZADO PARA ABRIR MODAL --- */}
                  <Button 
                    variant="primary" 
                    size="lg" 
                    onClick={handleShowModal}
                    disabled={cartItems.length === 0 || !currentUser} // Deshabilitado si no hay items o no hay sesión
                  >
                      Comprar Ahora
                  </Button>
                  {!currentUser && <small className="text-danger">Debes iniciar sesión para comprar.</small>}
              </div>
            </Col>
          </Row>
        )}
      </Container>

      {/* --- MODAL DE CHECKOUT --- */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Información de Envío</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* --- FORMULARIO MOVIDO DESDE Checkout.js --- */}
             <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control name="email" type="email" value={formData.email} onChange={handleFormChange} readOnly={!!currentUser} />
            </Form.Group>
            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control name="firstName" value={formData.firstName} onChange={handleFormChange} readOnly={!!currentUser} />
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control name="lastName" value={formData.lastName} onChange={handleFormChange} readOnly={false} />
                </Form.Group>
            </Row>
            <Form.Group className="mb-3">
                <Form.Label>Dirección</Form.Label>
                <Form.Control name="address" value={formData.address} onChange={handleFormChange} readOnly={false} />
            </Form.Group>
            {/* Aquí podrías añadir más campos si fueran necesarios */}
          </Form>
          <hr />
          <h5>Total a pagar: {formatPrice(cartTotal)}</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button variant="success" onClick={handlePurchaseConfirm}>
            Confirmar Compra 
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CartView;