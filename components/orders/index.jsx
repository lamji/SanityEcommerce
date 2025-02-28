import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Pagination from 'react-bootstrap/Pagination';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';

import { FaEye, FaSort, FaSortUp, FaSortDown, FaSearch } from 'react-icons/fa';
import order from '../../src/constants/order.json';
import DatePicker from 'react-datepicker';

export const generateTrackingNumber = () => {
  return `TRK-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
};

const getStatusClass = (status) => {
  switch (status) {
    case 'Pending':
      return 'bg-pending';
    case 'In Transit':
      return 'bg-transit color-white';
    case 'Complete':
      return 'bg-success';
    case 'Cancelled':
      return 'bg-danger';
    default:
      return 'bg-primary';
  }
};

const Orders = () => {
  const [orders, setOrders] = useState(order.orders);
  const [filteredOrders, setFilteredOrders] = useState(order.orders);
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const maxPageButtons = 10;
  const [pageGroup, setPageGroup] = useState(0);

  const handleStatusChange = (newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === selectedOrder.id ? { ...order, status: newStatus } : order
      )
    );
    setSelectedOrder({ ...selectedOrder, status: newStatus });
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    filterOrders(status, searchTerm, startDate, endDate);
    setCurrentPage(1);
    setPageGroup(0);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    setFilteredOrders((prevOrders) =>
      [...prevOrders].sort((a, b) => {
        if (a[key] < b[key]) {
          return direction === 'asc' ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return direction === 'asc' ? 1 : -1;
        }
        return 0;
      })
    );
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <FaSort />;
    }
    return sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />;
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterOrders(filterStatus, term, startDate, endDate);
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    filterOrders(filterStatus, searchTerm, start, end);
  };

  const filterOrders = (status, term, start, end) => {
    let filtered = orders;
    if (status !== 'All') {
      filtered = filtered.filter((order) => order.status === status);
    }
    if (term) {
      filtered = filtered.filter(
        (order) =>
          order?.trackingNumber?.toLowerCase().includes(term.toLowerCase()) ||
          `${order.firstName} ${order.lastName}`.toLowerCase().includes(term.toLowerCase())
      );
    }
    if (start && end) {
      filtered = filtered.filter(
        (order) => new Date(order.date) >= start && new Date(order.date) <= end
      );
    }
    setFilteredOrders(filtered);
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => {
    if (currentPage === (pageGroup + 1) * maxPageButtons) {
      setPageGroup(pageGroup + 1);
    }
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };
  const prevPage = () => {
    if (currentPage === pageGroup * maxPageButtons + 1) {
      setPageGroup(pageGroup - 1);
    }
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const getPageNumbers = () => {
    const startPage = pageGroup * maxPageButtons + 1;
    const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);
    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  };

  return (
    <div>
      <div className="d-flex justify-content-between mb-3 bg-gray">
        <div className="d-flex">
          <DropdownButton
            id="dropdown-basic-button"
            title={`Filter: ${filterStatus}`}
            className={getStatusClass(filterStatus)}
          >
            <Dropdown.Item onClick={() => handleFilterChange('All')}>All</Dropdown.Item>
            <Dropdown.Item onClick={() => handleFilterChange('Pending')}>Pending</Dropdown.Item>
            <Dropdown.Item onClick={() => handleFilterChange('In Transit')}>
              In Transit
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleFilterChange('Complete')}>Complete</Dropdown.Item>
            <Dropdown.Item onClick={() => handleFilterChange('Cancelled')}>Cancelled</Dropdown.Item>
          </DropdownButton>
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            isClearable
            placeholderText="Select date range"
            className="form-control date-picker"
          />
        </div>

        <InputGroup style={{ maxWidth: '300px' }}>
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
          <FormControl
            type="text"
            placeholder="Search by Tracking No. or Name"
            value={searchTerm}
            onChange={handleSearch}
            style={{ maxWidth: '300px' }}
          />
        </InputGroup>
      </div>

      <div style={{ height: '480px' }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th onClick={() => handleSort('date')}>Date {getSortIcon('date')}</th>
              <th onClick={() => handleSort('trackingNumber')}>
                Tracking No. {getSortIcon('trackingNumber')}
              </th>
              <th onClick={() => handleSort('firstName')}>Name {getSortIcon('firstName')}</th>
              <th onClick={() => handleSort('email')}>Email {getSortIcon('email')}</th>
              <th onClick={() => handleSort('address')}>Address {getSortIcon('address')}</th>
              <th onClick={() => handleSort('totalAmount')}>
                Total Amount {getSortIcon('totalAmount')}
              </th>
              <th onClick={() => handleSort('status')}>Status {getSortIcon('status')}</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.date}</td>
                <td>{order.trackingNumber}</td>
                <td>{`${order.firstName} ${order.lastName}`}</td>
                <td>{order.email}</td>
                <td className="truncate">{order.address}</td>

                <td>{order.totalAmount}</td>
                <td className={getStatusClass(order.status)}>{order.status}</td>

                <td>
                  <Button
                    variant="link"
                    className="p-0 m-0 border-0"
                    onClick={() => handleViewDetails(order)}
                  >
                    <FaEye />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div className="d-flex justify-content-center">
        <Pagination>
          <Pagination.Prev onClick={prevPage} disabled={currentPage === 1} />
          {getPageNumbers().map((pageNumber) => (
            <Pagination.Item
              key={pageNumber}
              active={pageNumber === currentPage}
              onClick={() => paginate(pageNumber)}
            >
              {pageNumber}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={nextPage} disabled={currentPage === totalPages} />
        </Pagination>
      </div>

      {selectedOrder && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Order Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="p-0">
              <strong>Tracking No.:</strong> {selectedOrder.trackingNumber}
            </p>
            <p className="p-0">
              <strong>Name:</strong> {`${selectedOrder.firstName} ${selectedOrder.lastName}`}
            </p>
            <p className="p-0">
              <strong>Email:</strong> {selectedOrder.email}
            </p>
            <p className="p-0">
              <strong>Address:</strong> {selectedOrder.address}
            </p>
            <p className="p-0">
              <strong>Mobile:</strong> {selectedOrder.mobileNumber}
            </p>
            <p className="p-0">
              <strong>Date:</strong> {selectedOrder.date}
            </p>
            <div className="cart-items">
              {selectedOrder.items.map((item, index) => (
                <div key={index} className="cart-item">
                  <img src={item.image} alt={item.name} className="item-image" />
                  <span className="item-name">{item.name}</span>
                  <span>x{item.quantity}</span>
                  <span>{item.price}</span>
                </div>
              ))}
            </div>
            <p className="py-2 px-0">
              <strong>Total Amount:</strong> {selectedOrder.totalAmount}
            </p>

            <DropdownButton
              id="dropdown-basic-button"
              title={selectedOrder.status}
              className={getStatusClass(selectedOrder.status)}
            >
              <Dropdown.Item onClick={() => handleStatusChange('Pending')}>Pending</Dropdown.Item>
              <Dropdown.Item onClick={() => handleStatusChange('In Transit')}>
                In Transit
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleStatusChange('Complete')}>Complete</Dropdown.Item>
              <Dropdown.Item onClick={() => handleStatusChange('Cancelled')}>
                Cancelled
              </Dropdown.Item>
            </DropdownButton>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default Orders;
