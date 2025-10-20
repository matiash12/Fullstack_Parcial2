// src/views/Home.js

import { Container, Row, Col, Image, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAppState } from '../context/CartContext'; // Para obtener productos y categorías
import ProductCard from '../components/ProductCard'; // Reutilizamos la tarjeta de producto

const Home = () => {
    const { products, categories } = useAppState();

    // --- Lógica para Productos Destacados ---
    // Simplemente tomamos los primeros 4 productos como "destacados"
    // En una app real, esto podría ser por categoría, más vendidos, etc.
    const featuredProducts = products.slice(0, 4); 

    // --- Lógica para Imágenes de Categorías (Placeholders) ---
    // Asignamos URLs de placeholder a cada categoría para mostrarlas visualmente
    const categoryImages = {
        'Laptops': 'https://hiraoka.com.pe/media/wysiwyg/tipos-de-laptops-modelos.jpg',
        'Monitores': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz_4ongqJSqP9IEc-_Ez7PyI_ny6lrfMDidA&s',
        'Periféricos': 'https://www.shutterstock.com/image-vector/computer-accessories-set-pc-equipment-260nw-2372532743.jpg',
        'Audio': 'https://cdn.shopify.com/s/files/1/0528/8008/1052/t/8/assets/boseqc35ii-1637766217367.jpg?v=1637766218',
        'Mobiliario': 'https://www.ikea.com/ext/ingkadam/m/3a0bffcc44af0b84/original/PH181139.jpg?f=s',
        // Añade más si creaste otras categorías
    };
    // Tomamos solo las primeras categorías si hay muchas
    const displayedCategories = categories.slice(0, 5); 

    return (
        <Container fluid className="px-0"> {/* fluid y px-0 para que el banner ocupe todo */}
            
            {/* --- SECCIÓN BANNER --- */}
            <Row className="mb-5">
                <Col>
                    {/* Puedes reemplazar esto con un componente Carousel de react-bootstrap si quieres */}
                    <Image 
                        src="https://img.freepik.com/vector-premium/banner-horizontal-evento-promocion-venta-descuento_554907-284.jpg" 
                        fluid 
                        alt="Banner Promocional"
                    />
                </Col>
            </Row>

            {/* --- SECCIÓN PRODUCTOS DESTACADOS --- */}
            <Container className="mb-5"> {/* Container normal para centrar contenido */}
                <h2 className="mb-4 text-center">Productos Destacados</h2>
                <Row xs={1} md={2} lg={4} className="g-4 justify-content-center">
                    {featuredProducts.map((product) => (
                        <Col key={product.id}>
                            <ProductCard product={product} />
                        </Col>
                    ))}
                </Row>
                <div className="text-center mt-4">
                     <Button as={Link} to="/productos" variant="outline-primary">Ver Todos los Productos</Button>
                </div>
            </Container>

            {/* --- SECCIÓN CATEGORÍAS --- */}
            <Container className="my-5">
                 <h2 className="mb-4 text-center">Explora Nuestras Categorías</h2>
                 <Row xs={1} sm={2} md={3} lg={displayedCategories.length} className="g-4 justify-content-center">
                    {displayedCategories.map(category => (
                        <Col key={category.id} className="text-center">
                           <Card as={Link} to="/categorias" className="text-decoration-none text-dark h-100">
                               <Card.Img 
                                   variant="top" 
                                   src={categoryImages[category.name] || 'https://via.placeholder.com/300x200/EEEEEE/000000?text=Categoría'} 
                                   alt={category.name}
                               />
                               <Card.Body>
                                   <Card.Title>{category.name}</Card.Title>
                               </Card.Body>
                           </Card>
                        </Col>
                    ))}
                 </Row>
            </Container>

        </Container>
    );
}

export default Home;