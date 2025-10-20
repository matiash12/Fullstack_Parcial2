// src/admin/views/AdminReports.js

import { Container, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAppState } from '../../context/CartContext'; // Importar contexto
import { useState } from 'react'; // Importar useState

const AdminReports = () => {
    const { orders, formatPrice } = useAppState();
    const [totalVentas, setTotalVentas] = useState(0);

    const handleGenerateSales = () => {
        // Calcula el total sumando el 'total' de cada orden en el estado
        const total = orders.reduce((sum, order) => sum + order.total, 0);
        setTotalVentas(total);
    };

    return (
        <Container>
            <h2>Reportes</h2>
            <p>Selecciona un reporte para generar.</p>

            {/* Reporte de Productos (sin cambios) */}
            <Card className="mb-3">
                <Card.Body>
                    <Card.Title>Reporte de Stock de Productos</Card.Title>
                    <Card.Text>
                        Ver un listado completo del inventario, stock actual y precios.
                    </Card.Text>
                    <Button as={Link} to="/admin/reportes/productos">Generar Reporte de Productos</Button>
                </Card.Body>
            </Card>

            {/* Reporte de Ventas (CORREGIDO) */}
             <Card>
                <Card.Body>
                    <Card.Title>Reporte de Ventas</Card.Title> {/* Ya no dice Simulado */}
                    <Card.Text>
                        Ver un resumen de las ventas totales basado en las órdenes generadas.
                    </Card.Text>
                    {/* --- BOTÓN HABILITADO y onClick --- */}
                    <Button variant="success" onClick={handleGenerateSales}>
                        Generar Reporte de Ventas
                    </Button>
                    
                    {/* Mostrar el resultado */}
                    {totalVentas > 0 && (
                        <div className="mt-3">
                            <h4>Total de Ventas Generadas: {formatPrice(totalVentas)}</h4>
                        </div>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
}

export default AdminReports;