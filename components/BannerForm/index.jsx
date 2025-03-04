/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Row, Col, Container, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useNotification } from '../../hooks/useNotification';
import { useBanner } from '../../hooks/useBanner';
import HeroBanner from '../HeroBanner';
import { useViewModel } from './useViewModel';

const BannerForm = () => {
  const { styles } = useViewModel();
  const { showError } = useNotification();
  const { banner, isLoading, error, mutationAdd, mutationUpdate } = useBanner();
  const [validation, setValidation] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [bannerData, setBannerData] = useState(banner?.data[0]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  const handleSelect = (eventKey) => {
    console.log('Selected product:', eventKey);
    setSelectedProduct(eventKey);
  };

  const handleImageClick = (index) => {
    setActiveIndex(index); // Set active index
    console.log(`Image ${index + 1} clicked`);
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setBannerData((prev) => ({
            ...prev,
            image: reader.result,
          }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setBannerData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    const newValidation = {
      buttonText: !bannerData.buttonText,
      discount: !bannerData.discount,
      desc: !bannerData.desc,
      smallText: !bannerData.smallText,
      largeText2: !bannerData.largeText2,
      saleTime: !bannerData.saleTime,
      largeText1: !bannerData.largeText1,
      product: !bannerData.product,
      midText: !bannerData.midText,
    };

    setValidation(newValidation);
    return !Object.values(newValidation).some((isInvalid) => isInvalid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showError('Please fill in all required fields');
      return;
    }

    try {
      if (banner?._id) {
        await mutationUpdate.mutateAsync({
          id: banner._id,
          updatedBanner: bannerData,
        });
      } else {
        await mutationAdd.mutateAsync(bannerData);
      }
    } catch (error) {
      console.error('Error in form submission:', error);
    }
  };

  useEffect(() => {
    if (banner) {
      setBannerData(banner.data[0]);
      setIsEditing(true);
    }
  }, [banner]);

  if (isLoading) return <>loading</>;
  // if (error) return <div className="text-danger">Error: {error.message}</div>;

  return (
    <div className="d-flex flex-column gap-4">
      <Card className="shadow-sm">
        <Card.Header className="bg-primary text-white">
          <h4 className="mb-0">Banner Preview</h4>
        </Card.Header>
        <Card.Body
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: '400px' }}
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
            <Dropdown onSelect={handleSelect} as={ButtonGroup}>
              {/* <Dropdown.Toggle variant="success" id="dropdown-basic" style={{minWidth: "130px", textAlign: "left"}}>
                {selectedProduct || "Select Product"}
            </Dropdown.Toggle> */}

              <Button variant="success"> Select Featured Product</Button>
              <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
              <Dropdown.Menu>
                <Dropdown.Item eventKey="Product 1">Product 1</Dropdown.Item>
                <Dropdown.Item eventKey="Product 2">Product 2</Dropdown.Item>
                <Dropdown.Item eventKey="Product 3">Product 3</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Button Text</Form.Label>
                  <Form.Control
                    type="text"
                    name="buttonText"
                    value={bannerData?.buttonText}
                    onChange={handleChange}
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
                    onChange={handleChange}
                    isInvalid={validation.discount}
                    placeholder="e.g., 20% Off"
                    disabled={true}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    value={bannerData?.product}
                    onChange={handleChange}
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
                    onChange={handleChange}
                    isInvalid={validation.desc}
                    placeholder="e.g., Best headphones in the market"
                  />
                  <Form.Control.Feedback type="invalid">
                    Description is required
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Select Featured Image</Form.Label>
                  <Container>
                    <Row>
                      {[...Array(4)].map((_, index) => (
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
                          onClick={() => handleImageClick(index)}
                        >
                          {bannerData?.image && (
                            <img
                              src={bannerData.image}
                              alt={`Banner ${index + 1}`}
                              style={{ width: '50%', height: 'auto' }}
                            />
                          )}
                        </Col>
                      ))}
                    </Row>
                  </Container>
                </Form.Group>
              </Col>

              <Col md={12}>
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
    </div>
  );
};

export default BannerForm;
