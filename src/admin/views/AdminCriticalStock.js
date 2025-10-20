// src/admin/views/AdminCriticalStock.js

import { Table, Alert, Container, Button } from 'react-bootstrap';
import { useAppState } from '../../context/CartContext'; 
import { Link, useNavigate } from 'react-router-dom';

const AdminCriticalStock = () => {
    const { products } = useAppState();
    const navigate = useNavigate();

    // Misma lógica que el Dashboard
    const stockCriticoProducts = products.filter(p => 
        (p.stockCritico > 0 && p.stock <= p.stockCritico) ||
        (p.stockCritico === 0 && p.stock <= 5) // Fallback por si no se define
    );

    return (
        <Container>
            <h2 className="mb-4">Productos con Stock Crítico</h2>
            
            {stockCriticoProducts.length > 0 ? (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nombre</th>
                            <th>Stock Actual</th>
                            <th>Stock Crítico</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stockCriticoProducts.map(p => (
                            <tr key={p.id}>
                                <td>{p.code}</td>
                                <td>{p.name}</td>
                                <td>
                                    <strong className="text-danger">{p.stock}</strong>
                                </td>
                                <td>{p.stockCritico || 'N/A'}</td>
                                <td>
                                    <Button as={Link} to={`/admin/productos/editar/${p.id}`} variant="warning" size="sm">
                                        Gestionar Stock
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <Alert variant="success">
                    No hay productos con stock crítico en este momento.
                </Alert>
            )}
             <Button variant="secondary" onClick={() => navigate('/admin/productos')}>
                Volver a Productos
            </Button>
        </Container>
    );
}

export default AdminCriticalStock;