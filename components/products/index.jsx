import React from 'react';
import { Table, Button, Modal, Form, Spinner, InputGroup } from 'react-bootstrap';
import { FaSort, FaSortUp, FaSortDown, FaSearch } from 'react-icons/fa';
import Pagination from '../Pagination';
import useViewModel from './useViewModel';

const Products = () => {
  const {
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
    handleSort,
    sorting,
    searchQuery,
    setSearchQuery
  } = useViewModel();


  const renderSortIcon = (field) => {
    if (sorting.field !== field) {
      return <FaSort style={{ float: 'right' }} />;
    }
    return sorting.direction === 'asc' ? 
      <FaSortUp style={{ float: 'right' }} /> : 
      <FaSortDown style={{ float: 'right' }} />;
  };

  return (
    <div className="mt-4">
      <h2>Product Management</h2>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center">
          <InputGroup style={{ width: '300px' }}>
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              type="search"
              placeholder="Search by product name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <Button 
                variant="outline-secondary"
                onClick={() => setSearchQuery('')}
              >
                
              </Button>
            )}
          </InputGroup>
        </div>
        <Button onClick={() => handleShowModal()}>
          Add Product
        </Button>
      </div>
      
      <div className="position-relative">
        <div className="text-muted mb-2 d-flex align-items-center">
        </div>
        <div style={{
          overflowX: 'auto',
          overflowY: 'auto',
          height: '550px',
          width: '100%',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderRadius: '8px',
          scrollbarWidth: 'thin',
          scrollbarColor: '#6c757d transparent',
          WebkitOverflowScrolling: 'touch',
        }}>
          <style jsx>{`
            div::-webkit-scrollbar {
              height: 8px;
              width: 8px;
            }
            div::-webkit-scrollbar-track {
              background: transparent;
            }
            div::-webkit-scrollbar-thumb {
              background-color: #6c757d;
              border-radius: 20px;
              border: 3px solid transparent;
            }
          `}</style>
          <Table striped bordered hover className="mb-0">
            <thead style={{ position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 1 }}>
              <tr>
                <th 
                  style={{ minWidth: '100px', cursor: 'pointer' }} 
                  onClick={() => handleSort('name')}
                >
                  Name {renderSortIcon('name')}
                </th>
                <th 
                  style={{ minWidth: '120px', cursor: 'pointer' }} 
                  onClick={() => handleSort('regularPrice')}
                >
                  Regular Price {renderSortIcon('regularPrice')}
                </th>
                <th 
                  style={{ minWidth: '100px', cursor: 'pointer' }} 
                  onClick={() => handleSort('interest')}
                >
                  Interest (%) {renderSortIcon('interest')}
                </th>
                <th 
                  style={{ minWidth: '120px', cursor: 'pointer' }} 
                  onClick={() => handleSort('priceWithInterest')}
                >
                  Price with Interest {renderSortIcon('priceWithInterest')}
                </th>
                <th 
                  style={{ minWidth: '100px', cursor: 'pointer' }} 
                  onClick={() => handleSort('discount')}
                >
                  Discount {renderSortIcon('discount')}
                </th>
                <th style={{ minWidth: '100px' }}>Discounted</th>
                <th 
                  style={{ minWidth: '120px', cursor: 'pointer' }} 
                  onClick={() => handleSort('discountedPrice')}
                >
                 Price {renderSortIcon('discountedPrice')}
                </th>
                <th 
                  style={{ minWidth: '80px', cursor: 'pointer' }} 
                  onClick={() => handleSort('stock')}
                >
                  Stock {renderSortIcon('stock')}
                </th>
                <th style={{ minWidth: '100px' }}>Image</th>
                <th style={{ minWidth: '160px' }}>Actions</th>
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
                  <td style={{ 
                    backgroundColor: product.isDiscounted ? '#d4edda' : '#f8f9fa',
                    color: product.isDiscounted ? '#0f5132' : '#6c757d',
                    textAlign: 'center',
                    fontWeight: product.isDiscounted ? '500' : 'normal'
                  }}>
                    {product.isDiscounted ? 'Yes' : 'No'}
                  </td>
                  <td>{formatPrice(product.discountedPrice)}</td>
                  <td>{product.stock}</td>
                  <td>
                    {product.images.length > 0 && (
                      <img
                        src={product.images[product.featuredImageIndex || 0]}
                        alt={product.name}
                        width="50"
                        height="50"
                        style={{ 
                          objectFit: 'cover',
                          borderRadius: '4px',
                          border: '1px solid #dee2e6'
                        }}
                      />
                    )}
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <Button variant="warning" size="sm" onClick={() => handleShowModal(index, product)}>
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleShowDeleteModal(product._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      <div className="mt-3">
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
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
                      src={typeof image === 'string' ? image : URL.createObjectURL(image)}
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
