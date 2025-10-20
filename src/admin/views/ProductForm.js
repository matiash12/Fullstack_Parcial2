// src/admin/views/ProductForm.js

import { useState, useEffect } from 'react';
import { Form, Button, Container, Card, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppState } from '../../context/CartContext'; // Asegúrate que el path sea correcto

const ProductForm = () => {
    // Obtenemos 'categories' del contexto
    const { addProduct, updateProduct, getProductById, categories } = useAppState();
    const navigate = useNavigate();
    const { id } = useParams();
    
    const [formData, setFormData] = useState({
        code: '',
        name: '',
        description: '',
        price: 0,
        stock: 0,
        stockCritico: 0,
        category: '',
        image: '',
        onOffer: false // <-- AÑADIDO AL ESTADO INICIAL
    });
    const [errors, setErrors] = useState({});
    const isEditing = id !== undefined;

    useEffect(() => {
        if (isEditing) {
            // Modo Edición: Cargar producto existente
            const existingProduct = getProductById(id);
            if (existingProduct) {
                setFormData(existingProduct);
            }
        } else {
            // Modo Creación: Asignar la primera categoría por defecto
            if (categories.length > 0) {
                setFormData(prev => ({ ...prev, category: categories[0].name }));
            }
        }
    }, [id, isEditing, getProductById, categories]);

    // Validaciones (según P1)
    const validateForm = (data) => {
        const newErrors = {};
        
        if (!data.code) newErrors.code = 'El código es requerido.';
        else if (data.code.length < 3) newErrors.code = 'El código debe tener al menos 3 caracteres.';

        if (!data.name) newErrors.name = 'El nombre es requerido.';
        else if (data.name.length > 100) newErrors.name = 'Máximo 100 caracteres.';

        if (data.description && data.description.length > 500) newErrors.description = 'Máximo 500 caracteres.';
        
        if (data.price === '' || data.price < 0) newErrors.price = 'El precio es requerido y debe ser 0 o más.';

        if (data.stock === '' || data.stock < 0) newErrors.stock = 'El stock es requerido y debe ser 0 o más.';
        else if (!Number.isInteger(data.stock)) newErrors.stock = 'El stock debe ser un número entero.';
        
        if (data.stockCritico && data.stockCritico < 0) newErrors.stockCritico = 'Debe ser 0 o más.';
        else if (data.stockCritico && !Number.isInteger(data.stockCritico)) newErrors.stockCritico = 'Debe ser un número entero.';

        if (!data.category) newErrors.category = 'La categoría es requerida.';
        
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        // --- LÓGICA ACTUALIZADA PARA MANEJAR CHECKBOX ---
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Convertimos a número ANTES de validar
        const productData = {
            ...formData,
            price: parseFloat(formData.price) || 0,
            stock: parseInt(formData.stock, 10) || 0,
            stockCritico: parseInt(formData.stockCritico, 10) || 0,
        };

        // Validamos los datos ya parseados
        const newErrors = validateForm(productData);
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            // Si no hay errores, guardamos
            if (isEditing) {
                updateProduct(productData);
            } else {
                addProduct(productData);
            }
            navigate('/admin/productos');
        } else {
            // Si hay errores, actualizamos el estado para que se vean
            setFormData(productData);
        }
    };
    
    return (
        <Container>
            <Card>
                <Card.Header as="h4">{isEditing ? 'Editar Producto' : 'Añadir Nuevo Producto'}</Card.Header>
                <Card.Body>
                    <Form noValidate onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Código Producto</Form.Label>
                                    <Form.Control type="text" name="code" value={formData.code} onChange={handleChange} isInvalid={!!errors.code} />
                                    <Form.Control.Feedback type="invalid">{errors.code}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nombre del Producto</Form.Label>
                                    <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} isInvalid={!!errors.name} />
                                    <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} isInvalid={!!errors.description} />
                            <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                        </Form.Group>
                        
                        <Row>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Precio</Form.Label>
                                    <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} isInvalid={!!errors.price} min="0" step="0.01" />
                                    <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Stock</Form.Label>
                                    <Form.Control type="number" name="stock" value={formData.stock} onChange={handleChange} isInvalid={!!errors.stock} min="0" />
                                    <Form.Control.Feedback type="invalid">{errors.stock}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                             <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Stock Crítico</Form.Label>
                                    <Form.Control type="number" name="stockCritico" value={formData.stockCritico} onChange={handleChange} isInvalid={!!errors.stockCritico} min="0" />
                                    <Form.Control.Feedback type="invalid">{errors.stockCritico}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Categoría</Form.Label>
                                    <Form.Select 
                                        name="category" 
                                        value={formData.category} 
                                        onChange={handleChange} 
                                        isInvalid={!!errors.category}
                                    >
                                        <option value="">Selecciona una categoría</option>
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.name}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.category}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>URL de la Imagen</Form.Label>
                                    <Form.Control type="text" name="image" value={formData.image} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* --- NUEVO CAMPO: CHECKBOX DE OFERTA --- */}
                        <Form.Group className="mb-3">
                            <Form.Check 
                                type="checkbox"
                                label="Marcar como Oferta"
                                name="onOffer"
                                checked={formData.onOffer}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">{isEditing ? 'Guardar Cambios' : 'Crear Producto'}</Button>
                        <Button variant="secondary" onClick={() => navigate('/admin/productos')} className="ms-2">Cancelar</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ProductForm;