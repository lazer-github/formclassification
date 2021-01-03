import React from "react";
import { Col, Container, Row } from 'react-bootstrap';
import Upload from './Upload'
const Home = () => {
  return (
    <Container className='flexbox-container'>
      <Row>
        <Col>
        <Upload />
        </Col>
      </Row>
    </Container>
    );
}
export default Home