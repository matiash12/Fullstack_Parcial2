// src/views/Blog.js

import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blog';

const Blog = () => {
  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Nuestro Blog</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {blogPosts.map(post => (
          <Col key={post.id}>
            <Card className="h-100">
              <Card.Img variant="top" src={post.image} />
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Por {post.author} el {post.date}
                </Card.Subtitle>
                <Button as={Link} to={`/blog/${post.id}`} variant="primary">
                  Leer Más
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Blog;