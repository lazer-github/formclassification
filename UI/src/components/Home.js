import React from "react";
import { Col, Container, Row } from 'react-bootstrap';
import DisplayChart from "./DisplayChart";
import DisplayTable from "./DisplayTable";

const Home = ({ data }) => {
  return (
    <Container className='flexbox-container'>
      <Row>
        <Col md={8}>
          <DisplayTable data={data} />
        </Col>
        <Col md={4}>
          <DisplayChart data={data} />
        </Col>
      </Row>
    </Container>
    );
}
export default Home