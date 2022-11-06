import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import { AiFillCamera } from "react-icons/ai";

const Index = (props) => {
  const { data, status, dataOutStatus } = props;
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [validated, setValidated] = useState(false);

  console.log(data)

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
            <Modal.Title className="color-primary">Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
         
            <Row className="justify-content-center text-center">
              <div className="">
              <img
                  src={data?.[0]?.image || ""}
                  className="product-details-image"
                />
              </div>
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
                <Form.Control required type="text" value={data?.[0]?.product || ""} placeholder={data?.[0]?.product || ""} />
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>stocks</Form.Label>
                <Form.Control required type="number" value={data?.[0]?.stocks || ""}  placeholder={data?.[0]?.stocks || ""} />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="8" controlId="validationCustom03">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" value={data?.[0]?.description || ""} placeholder={data?.[0]?.description || ""}  required />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom04">
                <Form.Label>Price</Form.Label>
                <Form.Control type="text" value={data?.[0]?.price || ""} placeholder={data?.[0]?.price || ""} required />
              </Form.Group>

            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="subbmit" className="addProduct" variant="primary">
                Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default Index;
