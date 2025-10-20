// src/admin/views/AdminCategories.js

import { useState } from 'react';
import { Table, Button, Container, Card, Form, Row, Col } from 'react-bootstrap';
import { useAppState } from '../../context/CartContext'; // Asegúrate que el path sea correcto

const AdminCategories = () => {
    const { categories, addCategory, deleteCategory } = useAppState();
    const [newCategoryName, setNewCategoryName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newCategoryName) {
            addCategory(newCategoryName);
            setNewCategoryName(''); // Limpiar el input
        }
    };

    const handleDelete = (id) => {
        if (window.confirm('¿Estás seguro? Si eliminas la categoría, los productos asociados quedarán sin categoría.')) {
            deleteCategory(id);
        }
    };

    return (
        <Container>
            <h2>Administrar Categorías</h2>
            
            {/* Formulario para añadir nueva categoría */}
            <Card className="mb-4">
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={9}>
                                <Form.Group>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Nombre de la nueva categoría" 
                                        value={newCategoryName}
                                        onChange={(e) => setNewCategoryName(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={3} className="d-grid">
                                <Button variant="primary" type="submit">
                                    Crear Categoría
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>

            {/* Tabla de categorías existentes */}
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(category.id)}>
                                    Eliminar
                                </Button>
                                {/* Botón de Editar se puede añadir en el futuro si se desea */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default AdminCategories;
