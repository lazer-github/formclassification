import react, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import DisplayChart from './DisplayChart';
import DisplayTable from './DisplayTable';

const FETCH = async (url, requestOptions) => {
  const response = await fetch(url, requestOptions);
  return await response.json();
};

const ViewClassification = () => {
  const { id } = useParams();
  const [formsList, setForms] = useState([]);

  useEffect(() => {
    FETCH(`/api/jobs/${id}/forms`, { method: "GET" }).then(s => {
      console.log(s);
      setForms(s);
    });
  }, []);
  return (
    <>
      <Container className='flexbox-container'>
        <Row>
          <Col md={8}>
            <DisplayTable data={formsList} />
          </Col>
          <Col md={4}>
            <DisplayChart data={formsList} />
          </Col>
        </Row>
      </Container>

    </>

  );
}
export default ViewClassification;