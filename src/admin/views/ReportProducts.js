// src/admin/views/ReportProducts.js
import { Container, Table, Button } from 'react-bootstrap';
import { useAppState } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const ReportProducts = () => {
    const { products, formatPrice } = useAppState();
    const navigate = useNavigate();

    return (
        <Container>
            <h2 className="mb-4">Reporte de Stock de Productos</h2>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th>Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(p => (
                        <tr key={p.id}>
                            <td>{p.code}</td>
                            <td>{p.name}</td>
                            <td>{p.category}</td>
                            <td>{formatPrice(p.price)}</td>
                            <td>{p.stock}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Button variant="secondary" onClick={() => navigate('/admin/reportes')}>
                Volver a Reportes
            </Button>
        </Container>
    );
}
export default ReportProducts;