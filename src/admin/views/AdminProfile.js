// src/admin/views/AdminProfile.js
import { Container, Card, Row, Col, Button, Form, Alert } from 'react-bootstrap';
import { useAppState } from '../../context/CartContext';
import { Link } from 'react-router-dom'; // <-- Importar Link
import { useState } from 'react'; // <-- Importar useState

const AdminProfile = () => {
    // --- OBTENER DATOS Y FUNCIONES ---
    const { currentUser, updateCurrentUserPassword } = useAppState();
    
    // --- ESTADOS PARA CAMBIO DE CONTRASEÑA ---
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState('');

    if (!currentUser) {
        return <Container><p>Error: No se pudo cargar el perfil.</p></Container>;
    }

    // --- MANEJADOR PARA CAMBIAR CONTRASEÑA ---
    const handlePasswordChange = (e) => {
        e.preventDefault();
        setPasswordError('');
        setPasswordSuccess('');

        // Validaciones
        if (!newPassword || !confirmPassword) {
            setPasswordError('Debes ingresar la nueva contraseña y confirmarla.');
            return;
        }
        if (newPassword !== confirmPassword) {
            setPasswordError('Las contraseñas no coinciden.');
            return;
        }
        if (newPassword.length < 4 || newPassword.length > 10) {
            setPasswordError('La contraseña debe tener entre 4 y 10 caracteres.');
            return;
        }

        // Llamar a la función del contexto
        const success = updateCurrentUserPassword(newPassword);
        if (success) {
            setPasswordSuccess('¡Contraseña actualizada con éxito!');
            setNewPassword('');
            setConfirmPassword('');
        } else {
            setPasswordError('Ocurrió un error al actualizar la contraseña.');
        }
    };

    return (
        <Container>
            <h2>Mi Perfil</h2>
            {passwordSuccess && <Alert variant="success">{passwordSuccess}</Alert>}
            {passwordError && <Alert variant="danger">{passwordError}</Alert>}
            
            <Row>
                <Col md={6}>
                    <Card className="mb-3 mb-md-0">
                        <Card.Header as="h5">Información Personal</Card.Header>
                        <Card.Body>
                            <Card.Text><strong>Nombre:</strong> {currentUser.name} {currentUser.lastName}</Card.Text>
                            <Card.Text><strong>Email:</strong> {currentUser.email}</Card.Text>
                            <Card.Text><strong>RUN:</strong> {currentUser.run || 'No especificado'}</Card.Text>
                            <Card.Text><strong>Fecha Nacimiento:</strong> {currentUser.birthDate || 'No especificada'}</Card.Text>
                            <Card.Text><strong>Rol:</strong> <span className="text-capitalize">{currentUser.role}</span></Card.Text>
                            {/* --- BOTÓN FUNCIONAL (Link a Editar Usuario) --- */}
                            <Button as={Link} to={`/admin/usuarios/editar/${currentUser.id}`} variant="outline-primary" size="sm">
                                Editar Información
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card>
                        <Card.Header as="h5">Dirección</Card.Header>
                        <Card.Body>
                            <Card.Text><strong>Región:</strong> {currentUser.region || 'No especificada'}</Card.Text>
                            <Card.Text><strong>Comuna:</strong> {currentUser.comuna || 'No especificada'}</Card.Text>
                            <Card.Text><strong>Dirección:</strong> {currentUser.address || 'No especificada'}</Card.Text>
                             {/* --- BOTÓN FUNCIONAL (Link a Editar Usuario) --- */}
                            <Button as={Link} to={`/admin/usuarios/editar/${currentUser.id}`} variant="outline-primary" size="sm">
                                Editar Dirección
                            </Button>
                        </Card.Body>
                    </Card>
                    <Card className="mt-3">
                         <Card.Header as="h5">Seguridad</Card.Header>
                         <Card.Body>
                            {/* --- FORMULARIO FUNCIONAL --- */}
                            <Form onSubmit={handlePasswordChange}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nueva Contraseña</Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        placeholder="Nueva Contraseña" 
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Confirmar Contraseña</Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        placeholder="Confirma la Contraseña" 
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                 <Button variant="warning" size="sm" type="submit"> {/* Quitado disabled */}
                                    Actualizar Contraseña
                                 </Button>
                            </Form>
                         </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
export default AdminProfile;