/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useStateContext } from '../../context/stateContext';
import { urlFor } from '../../lib/client';
import PaymentMethod from '../../components/Checkbox';
import { numberWithCommas } from '../../lib/helper';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiOutlineArrowRight } from 'react-icons/ai';

const Index = () => {
  const router = useRouter();
  const { cartItems, totalPrice, shippingFee } = useStateContext();
  const [validated, setValidated] = useState(false);
  const [modePayment, setModePayment] = useState('');

  cartItems.sort(function (a, b) {
    return new Date(a.added).getTime() - new Date(b.added).getTime();
  });

  const paymongo = () => {
    alert('handle paymongo');
  };
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      event.stopPropagation();
      modePayment === '' || modePayment === 'cod' ? router.push('/success') : paymongo();
    }

    setValidated(true);
  };

  return (
    <Container className="container-billing flex">
      <Form noValidate className="mt-3" validated={validated} onSubmit={handleSubmit}>
        <Row>
          <Col className="border-end col-billing" lg={6} xs={12}>
            <div>
              <div className="head-cart">
                <h6 className="color-primary">Shopping Cart</h6>
                <Link href="/" className="linkNext">
                  <h6 className="color-primary linkNext">
                    Continue Shopping <AiOutlineArrowRight />
                  </h6>
                </Link>
              </div>

              <Row className="mt-4 head">
                <Col md={2} xs={3}>
                  <p className=" color-primary">Product</p>
                </Col>
                <Col md={4} xs={3}>
                  <p className=" color-primary">Name</p>
                </Col>
                <Col md={3} xs={3}>
                  <p className="color-primary">Quantity</p>
                </Col>
                <Col md={3} xs={3}>
                  <p className="color-primary">Total Price</p>
                </Col>
              </Row>

              <div className="preview-items">
                {cartItems &&
                  cartItems.map((res) => {
                    const totalPrice2 = parseInt(res?.quantity) * parseInt(res?.price);
                    return (
                      <Row className="mt-2 border-bottom" key={res._id}>
                        <Col md={2} xs={3}>
                          <img
                            src={urlFor(res?.image?.[0])}
                            className="cart-product-image-small"
                            width={50}
                            height={50}
                            alt=""
                          />
                        </Col>
                        <Col md={4} xs={3}>
                          <p className=" color-primary">{res?.name}</p>
                        </Col>
                        <Col md={3} xs={3}>
                          <p className="color-primary">{res?.quantity}x</p>
                        </Col>
                        <Col md={3} xs={3}>
                          <p className="color-primary">₱{totalPrice2.toFixed(2)}</p>
                        </Col>
                      </Row>
                    );
                  })}
              </div>
              <div>
                <p className="text-end p-0">
                  Subtotal: <span className="span">₱{totalPrice.toFixed(2)}</span>
                </p>
                <p className="text-end p-0">
                  Shipping Fee: <span className="span">₱{shippingFee.toFixed(2)}</span>
                </p>
                <p className="text-end p-0 fw-bold">
                  Total:{' '}
                  <span className="span fw-bold">
                    ₱{numberWithCommas((shippingFee + totalPrice).toFixed(2))}
                  </span>
                </p>
              </div>
              <div>
                <h6 className="color-primary mt-2">Payment Method</h6>
                <PaymentMethod dataOut={(i) => setModePayment(i)} />
              </div>

              {modePayment === '' || modePayment === 'cod' ? (
                <></>
              ) : (
                <div className="container">
                  <Row>
                    <Form.Group as={Col} md="6" controlId="validationCustom05">
                      <Form.Label>Name on Gcash</Form.Label>
                      <Form.Control type="text" placeholder="" required />
                    </Form.Group>

                    <Form.Group as={Col} md="6" controlId="validationCustom05">
                      <Form.Label>Gcash Number</Form.Label>
                      <Form.Control type="text" placeholder="" required />
                    </Form.Group>
                  </Row>
                </div>
              )}
            </div>
          </Col>
          <Col className="col-billing">
            <h6 className="color-primary">Billing Details</h6>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom01">
                <Form.Label>First Name</Form.Label>
                <Form.Control required type="text" placeholder="first name" />
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="validationCustom02">
                <Form.Label>Last name</Form.Label>
                <Form.Control required type="text" placeholder="Last name" />
              </Form.Group>

              <Form.Group as={Col} className="mt-2" md="6" controlId="validationCustomUsername">
                <Form.Label>Phone Number</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="number"
                    placeholder="09 xxx xxx xxx"
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group as={Col} className="mt-2" md="6" controlId="validationCustom02">
                <Form.Label>Email</Form.Label>
                <Form.Control required type="email" placeholder="email" />
              </Form.Group>
            </Row>

            <h6 className="color-primary">Delivery Address</h6>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="validationCustom03">
                <Form.Label>Address 1</Form.Label>
                <Form.Control type="text" placeholder="House #, Street, Brangay ...." required />
              </Form.Group>

              <Form.Group as={Col} md="12" controlId="validationCustom04">
                <Form.Label>Address 2 (optional)</Form.Label>
                <Form.Control type="text" placeholder="Address 2" />
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="validationCustom05">
                <Form.Label>State</Form.Label>
                <Form.Control type="text" placeholder="National Capital Region" required />
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="validationCustom05">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" placeholder="Valenzuela City" required />
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="validationCustom05">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control type="number" placeholder="123" required />
              </Form.Group>
            </Row>
          </Col>
        </Row>
        <Button type="submit" className="btnPay">
          {modePayment === '' || modePayment === 'cod' ? 'Confirm Order ' : 'Pay Now'}
        </Button>
      </Form>
    </Container>
  );
};

export default Index;
