import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import { AiFillCamera } from "react-icons/ai";

const Index = (props) => {
  const { status, dataOutStatus } = props;
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const handleClose = () => dataOutStatus(false);

  return (
    <>
      <Modal show={status} onHide={handleClose}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title className="color-primary">Add Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Form.Group as={Col} md={6}controlId="validationCustomUsername">
                <Form.Label>Product Image</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="file"
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="mb-0">
              <Form.Group as={Col} md="8" controlId="validationCustom01">
                <Form.Label>Product Name</Form.Label>
                <Form.Control required type="text" placeholder="headphones" />
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Quantity</Form.Label>
                <Form.Control required type="number" placeholder="quantity" />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="8" controlId="validationCustom03">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="description" required />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom04">
                <Form.Label>Price</Form.Label>
                <Form.Control type="text" placeholder="State" required />
              </Form.Group>

            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="subbmit" className="addProduct" variant="primary">
                Add
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default Index;
