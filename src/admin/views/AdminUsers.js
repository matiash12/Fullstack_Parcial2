// src/admin/views/AdminUsers.js

import { Table, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAppState } from '../../context/CartContext'; 

const AdminUsers = () => {
    const { userList, deleteUser } = useAppState();

    const handleDelete = (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
            deleteUser(id);
        }
    };

    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Administrar Usuarios</h2>
                <Button as={Link} to="/admin/usuarios/nuevo" variant="primary">
                    Añadir Nuevo Usuario
                </Button>
            </div>
            
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {userList.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name} {user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                {/* --- NUEVO BOTÓN DE HISTORIAL --- */}
                                <Button as={Link} to={`/admin/usuarios/historial/${user.id}`} variant="info" size="sm" className="me-2">
                                    Historial
                                </Button>
                                <Button as={Link} to={`/admin/usuarios/editar/${user.id}`} variant="warning" size="sm" className="me-2">
                                    Editar
                                </Button>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(user.id)}>
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default AdminUsers;