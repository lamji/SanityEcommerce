/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react';
import { Form, Button, Card, Row, Col, Container, ButtonGroup, Dropdown } from 'react-bootstrap';
import HeroBanner from '../HeroBanner';
import { useViewModel } from './useViewModel';
import Navbar from '../Navbar';
import ResponsivePreview from '../preview';

const BannerForm = () => {
  const {
    styles,
    isChecked,
    isLoading,
    mutationAdd,
    mutationUpdate,
    validation,
    isEditing,
    bannerData,
    selectedProduct,
    navData,
    validationNavbar,
    activeIndex,
    actions,
    productsList,
    buttonLableDropDown
  } = useViewModel();

  if (isLoading) return <>loading</>;
  // if (error) return <div className="text-danger">Error: {error.message}</div>;


  return (
    <div className="d-flex flex-column gap-4">
      <Card className="shadow-sm">
      {/* Card Header */}
      <Card.Header className="bg-primary text-white">
        <h4 className="mb-0">Banner Preview</h4>
      </Card.Header>

      {/* Card Body */}
      <Card.Body
        className="d-flex flex-column align-items-center justify-content-center"
        style={{ minHeight: "400px", overflow: "hidden" }}
      >
   
          {bannerData && <HeroBanner heroBanner={bannerData} />}
        
      </Card.Body>
    </Card>

      <Card className="shadow-sm">
        <Card.Header className="bg-primary text-white">
          <h4 className="mb-0">Banner Configuration</h4>
        </Card.Header>
        <Card.Body>
          <div className="select-sale-product">
            <Dropdown onSelect={actions.handleSelect} as={ButtonGroup}>
                <Button variant="success">
                  {buttonLableDropDown || "Select Product"}
                </Button>
                <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

                <Dropdown.Menu style={{ maxHeight: "300px", overflowY: "auto" }}>
                  {productsList?.map((product, key) => (
                    <Dropdown.Item key={key} eventKey={key}>
                      {product.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
          </div>
          <Form onSubmit={actions.handleSubmit}>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Button Text</Form.Label>
                  <Form.Control
                    type="text"
                    name="buttonText"
                    value={bannerData?.buttonText}
                    onChange={actions.handleChangeInput}
                    isInvalid={validation.buttonText}
                    placeholder="e.g., Shop Now"
                  />
                  <Form.Control.Feedback type="invalid">
                    Button text is required
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Discount</Form.Label>
                  <Form.Control
                    type="text"
                    name="discount"
                    value={bannerData?.discount}
                    onChange={actions.handleChangeInput}
                    isInvalid={validation.discount}
                    placeholder="e.g., 20% Off"
                    disabled={isChecked}
                  />
                  <Form.Control.Feedback type="invalid">
                    Discount text is required
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Large Text</Form.Label>
                  <Form.Control
                    type="text"
                    name="largeText1"
                    value={bannerData?.largeText1}
                    onChange={actions.handleChangeInput}
                    isInvalid={validation.largeText1}
                    placeholder="e.g., FINE"
                  />
                  <Form.Control.Feedback type="invalid">
                    Large text 1 is required
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Sale Time</Form.Label>
                  <Form.Control
                    type="text"
                    name="saleTime"
                    value={bannerData?.saleTime}
                    onChange={actions.handleChangeInput}
                    isInvalid={validation.saleTime}
                    placeholder="e.g., 15 November to December 30"
                  />
                  <Form.Control.Feedback type="invalid">
                    Sale time is required
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="product"
                    value={ bannerData?.product}
                    onChange={actions.handleChangeInput}
                    isInvalid={validation.product}
                    placeholder="e.g., headphones"
                    disabled={true}
                  />
                  <Form.Control.Feedback type="invalid">
                    Product category is required
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="desc"
                    value={bannerData?.desc}
                    onChange={actions.handleChangeInput}
                    isInvalid={validation.desc}
                    placeholder="e.g., Best headphones in the market"
                  />
                  <Form.Control.Feedback type="invalid">
                    Description is required
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Select Featured Image</Form.Label>
                  <Container>
                    <Row>
                      {bannerData?.images?.map((img,index) => {
                        return (
                           <Col
                          key={index}
                          style={{
                            cursor: 'pointer',
                            backgroundColor:
                              activeIndex === index ? 'rgb(179, 211, 245)' : 'transparent',
                            borderRadius: '5px',
                            padding: '5px',
                            ...styles.imageStyles,
                          }}
                          onClick={() => actions.handleImageClick(index)}
                        >
                            <img
                              src={img}
                              alt={`Banner ${index + 1}`}
                              style={{ width: '100%', height: 'auto' }}
                            />
                         
                        </Col>
                        )
                      })}
              
                    </Row>
                  </Container>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label={<span className="mx-2">Product Discount?</span>}
                  checked={isChecked}
                  onChange={actions.handleChange}
         
                />
              </Col>

              <Col md={2}>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={mutationAdd.isLoading || mutationUpdate.isLoading}
                  className="w-100"
                >
                  {mutationAdd.isLoading || mutationUpdate.isLoading
                    ? 'Saving...'
                    : isEditing
                    ? 'Update Banner'
                    : 'Save Banner'}
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
      <Card className="shadow-sm">
        <Card.Header className="bg-primary text-white">
          <h4 className="mb-0">Navbar Preview</h4>
        </Card.Header>
        <Card.Body
          className="d-flex align-items-center justify-content-center"
          style={{ padding: '10px' }}
        >
          <Navbar />
        </Card.Body>
      </Card>
      <Card className="shadow-sm">
        <Card.Header className="bg-primary text-white">
          <h4 className="mb-0">Navbar Configuration</h4>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={actions.handleSubmitNav}>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Button Text</Form.Label>
                  <Form.Control
                    type="text"
                    name="header"
                    value={navData?.header}
                    onChange={actions.handleChangeInputHeader}
                    isInvalid={validationNavbar.header}
                    placeholder="Dog Shop"
                  />
                  <Form.Control.Feedback type="invalid">
                    Header text is required
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Contact number</Form.Label>
                  <Form.Control
                    type="number"
                    name="number"
                    value={navData?.number}
                    onChange={actions.handleChangeInputHeader}
                    isInvalid={validationNavbar?.number}
                    placeholder="09206327853"
    
                  />
                  <Form.Control.Feedback type="invalid">
                    Discount text is required
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Large Text</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={navData?.email}
                    onChange={actions.handleChangeInputHeader}
                    isInvalid={validationNavbar?.email}
                    placeholder="yourmail@gmail.com"
                  />
                  <Form.Control.Feedback type="invalid">
                    Email is required
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={2}>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={mutationAdd.isLoading || mutationUpdate.isLoading}
                  className="w-20"
                >
                  {mutationAdd.isLoading || mutationUpdate.isLoading
                    ? 'Saving...'
                    : isEditing
                    ? 'Update Navbar'
                    : 'Save Navbar'}
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default BannerForm;
