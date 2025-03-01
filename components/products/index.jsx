/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Pagination, Spinner } from 'react-bootstrap';
import TodoList from '../toDo';
import useViewModel from './useViewModel';

const Products = () => {
  const {
    products,
    isLoading,
    error,
    currentItems,
    currentPage,
    totalPages,
    showModal,
    editIndex,
    validation,
    handleChange,
    currentProduct,
    loading,
    handleShowModal,
    formatPrice,
    handlePageChange,
    handleConfirmDelete,
    handleShowDeleteModal,
    showDeleteModal,
    calculatePriceWithInterest,
    handleCloseModal,
    handleSave,
    setShowDeleteModal,
    handleRemoveImage,
  } = useViewModel();

  if (isLoading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={product.images[product.featuredImageIndex || 0]}
                    alt={product.name}
                    width="50"
                    height="50"
                  />
                )}
              </td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleShowModal(index, product)}>
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  className="ms-2"
                  onClick={() => handleShowDeleteModal(product._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-center">
        <Pagination>
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>

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
          <Button variant="primary" onClick={handleSave} disabled={loading}>
            {loading ? (
              <Spinner animation="border" size="sm" />
            ) : editIndex !== null ? (
              'Update'
            ) : (
              'Save'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/* <TodoList /> */}
    </div>
  );
};

export default Products;
