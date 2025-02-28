import React, { useState } from 'react';
import { Table, Button, Modal, Form, Pagination } from 'react-bootstrap';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    name: '',
    regularPrice: '',
    interest: '',
    discount: '',
    isDiscounted: false,
    description: '',
    images: [],
    stock: '',
    featuredImageIndex: null,
    priceWithInterest: '',
  });
  const [editIndex, setEditIndex] = useState(null);
  const [validation, setValidation] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleShowModal = (index = null) => {
    setEditIndex(index);
    if (index !== null) {
      setCurrentProduct(products[index]);
    } else {
      setCurrentProduct({
        name: '',
        regularPrice: '',
        interest: '',
        discount: '',
        isDiscounted: false,
        description: '',
        images: [],
        stock: '',
        featuredImageIndex: null,
        priceWithInterest: '',
      });
    }
    setValidation({});
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditIndex(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    console.log('currentProduct', name, value);
    if (type === 'file') {
      setCurrentProduct((prevState) => ({
        ...prevState,
        [name]: [...prevState[name], ...Array.from(files)].slice(0, 4),
      }));
    } else if (type === 'checkbox' && name === 'featuredImageIndex') {
      setCurrentProduct((prevState) => ({
        ...prevState,
        [name]: checked ? parseInt(value) : null,
      }));
    } else {
      setCurrentProduct((prevState) => ({
        ...prevState,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleSave = () => {
    currentProduct.priceWithInterest = calculatePriceWithInterest(
      currentProduct.regularPrice,
      currentProduct.interest
    );
    currentProduct.discountedPrice = calculateDiscountedPrice(
      currentProduct.priceWithInterest,
      currentProduct.discount
    );
    const { name, regularPrice, interest, discount, images, stock } = currentProduct;
    const newValidation = {
      name: !name,
      regularPrice: !regularPrice,
      interest: !interest,
      discount: !discount,
      images: images.length === 0,
      stock: !stock,
    };
    setValidation(newValidation);

    if (Object.values(newValidation).some((isInvalid) => isInvalid)) {
      return;
    }

    if (editIndex !== null) {
      const updatedProducts = [...products];
      updatedProducts[editIndex] = currentProduct;
      setProducts(updatedProducts);
    } else {
      setProducts([...products, currentProduct]);
    }
    handleCloseModal();
  };

  const handleDelete = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const handleRemoveImage = (index) => {
    setCurrentProduct((prevState) => ({
      ...prevState,
      images: prevState.images.filter((_, i) => i !== index),
      featuredImageIndex:
        prevState.featuredImageIndex === index ? null : prevState.featuredImageIndex,
    }));
  };

  const calculateDiscountedPrice = (price, discount) => {
    return price - (price * discount) / 100;
  };

  const calculatePriceWithInterest = (price, interest) => {
    const interestDecimal = interest / 100; // Convert percentage to decimal
    return Number(price) + Number(price) * interestDecimal;
  };

  const formatPrice = (price) => {
    const numericPrice = parseFloat(price);
    return `₱${
      !isNaN(numericPrice) ? numericPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0.00'
    }`;
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div className=" mt-4">
      <h2>Product Management</h2>
      <Button onClick={() => handleShowModal()} className="mb-3">
        Add Product
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Regular Price</th>
            <th>Interest (%)</th>
            <th>Price with Interest</th>
            <th>Discount</th>
            <th>Discounted</th>
            <th>Discounted Price</th>

            <th>Stock</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>{formatPrice(product.regularPrice)}</td>
              <td>{product.interest}%</td>
              <td>{formatPrice(product.priceWithInterest)}</td>
              <td>{product.discount}%</td>
              <td>{product.isDiscounted ? 'Yes' : 'No'}</td>
              <td>{formatPrice(product.discountedPrice)}</td>

              <td>{product.stock}</td>
              <td>
                {product.images.length > 0 && (
                  <img
                    src={URL.createObjectURL(product.images[product.featuredImageIndex || 0])}
                    alt={product.name}
                    width="50"
                    height="50"
                  />
                )}
              </td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleShowModal(index)}>
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  className="ms-2"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editIndex !== null ? 'Edit Product' : 'Add Product'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={currentProduct.name}
                onChange={handleChange}
                required
                className={validation.name ? 'is-invalid' : ''}
              />
              <Form.Control.Feedback type="invalid">Please provide a name.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Regular Price</Form.Label>
              <Form.Control
                type="number"
                name="regularPrice"
                value={currentProduct.regularPrice}
                onChange={handleChange}
                required
                className={validation.regularPrice ? 'is-invalid' : ''}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a regular price.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Interest (%)</Form.Label>
              <Form.Control
                type="number"
                name="interest"
                value={currentProduct.interest}
                onChange={handleChange}
                required
                className={validation.interest ? 'is-invalid' : ''}
              />
              <Form.Control.Feedback type="invalid">
                Please provide the interest.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Price with Interest</Form.Label>
              <Form.Control
                type="number"
                name="priceWithInterest"
                value={calculatePriceWithInterest(
                  currentProduct.regularPrice,
                  currentProduct.interest
                )}
                readOnly
                className={validation.priceWithInterest ? 'is-invalid' : ''}
              />
              <Form.Control.Feedback type="invalid">
                Please provide the price with interest.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Discount (%)</Form.Label>
              <Form.Control
                type="number"
                name="discount"
                value={currentProduct.discount}
                onChange={handleChange}
                required
                className={validation.discount ? 'is-invalid' : ''}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a discount.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Is Discounted?"
                name="isDiscounted"
                checked={currentProduct.isDiscounted}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={currentProduct.description}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a description.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                value={currentProduct.stock}
                onChange={handleChange}
                required
                className={validation.stock ? 'is-invalid' : ''}
              />
              <Form.Control.Feedback type="invalid">
                Please provide the stock.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Images (Minimum of 4 images)</Form.Label>
              <div className="d-flex flex-wrap">
                {currentProduct.images.map((image, index) => (
                  <div key={index} className="position-relative me-2 mb-2">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Product ${index + 1}`}
                      width="100"
                      height="100"
                      style={{ marginBottom: '20px' }}
                    />
                    <Button
                      variant="danger"
                      className="position-absolute top-0 end-0 p-0 m-0 image-x"
                      onClick={() => handleRemoveImage(index)}
                    >
                      &times;
                    </Button>
                    <Form.Check
                      type="checkbox"
                      label="Feature this?"
                      name="featuredImageIndex"
                      value={index}
                      checked={currentProduct.featuredImageIndex === index}
                      onChange={handleChange}
                      className="position-absolute bottom-0 start-0 mt-3"
                    />
                  </div>
                ))}
                {currentProduct.images.length < 4 && (
                  <div className="position-relative me-2 mb-2">
                    <label className="btn btn-primary p-2 m-0 image-add">
                      +
                      <input
                        type="file"
                        name="images"
                        onChange={handleChange}
                        multiple
                        className="d-none"
                      />
                    </label>
                  </div>
                )}
              </div>
              <Form.Control.Feedback type="invalid">
                Please upload at least one image.
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {editIndex !== null ? 'Update' : 'Save'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Products;
