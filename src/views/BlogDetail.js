// src/views/BlogDetail.js

import { Container, Row, Col, Image } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '../data/blog';

const BlogDetail = () => {
  const { id } = useParams(); // Obtiene el ID de la URL
  const post = blogPosts.find(p => p.id === parseInt(id));

  if (!post) {
    return (
      <Container className="text-center my-5">
        <h2>Post no encontrado</h2>
        <Link to="/blog">Volver al Blog</Link>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Image src={post.image} fluid className="mb-4" />
          <h2>{post.title}</h2>
          <p className="text-muted">
            Por {post.author} el {post.date}
          </p>
          <hr />
          <p>{post.content}</p>
          <p>{post.content}</p> {/* Repetido para simular más texto */}
          <Link to="/blog">Volver al Blog</Link>
        </Col>
      </Row>
    </Container>
  );
}

export default BlogDetail;