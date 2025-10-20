// src/admin/views/AdminProducts.js
import React from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAppState } from '../../context/CartContext'; 
 
const AdminProducts = () => {
    const { products, deleteProduct, formatPrice } = useAppState();

    const handleDelete = (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            deleteProduct(id);
        }
    };

    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Administrar Productos</h2>
                <div>
                    {/* --- NUEVO BOTÓN DE STOCK CRÍTICO --- */}
                    <Button as={Link} to="/admin/productos/criticos" variant="danger" className="me-2">
                        Ver Stock Crítico
                    </Button>
                    <Button as={Link} to="/admin/productos/nuevo" variant="primary">
                        Añadir Nuevo Producto
                    </Button>
                </div>
            </div>
            
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Código</th> {/* <-- Cambiado de ID a Código */}
                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>En Oferta</th> {/* <-- Nueva Columna */}
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.code}</td>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>{formatPrice(product.price)}</td>
                            <td>{product.stock}</td>
                            <td>{product.onOffer ? 'Sí' : 'No'}</td>
                            <td>
                                <Button as={Link} to={`/admin/productos/editar/${product.id}`} variant="warning" size="sm" className="me-2">
                                    Editar
                                </Button>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(product.id)}>
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

export default AdminProducts;
