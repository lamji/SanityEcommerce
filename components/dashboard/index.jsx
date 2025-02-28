import React, { useState } from 'react';
import { Container, Row, Col, Nav, Button } from 'react-bootstrap';
import { FaHome, FaUser, FaCog, FaBars, FaBoxOpen } from 'react-icons/fa';
import Orders from '../orders';
import Products from '../products';

const BackOfficePortal = () => {
  const [expanded, setExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState('Dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <p>This is the main content area.</p>;
      case 'Orders':
        return <Orders />;
      case 'Products':
        return <Products />;
      case 'Settings':
        return <p>Settings content goes here.</p>;
      default:
        return <p>This is the main content area.</p>;
    }
  };

  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col md={expanded ? 2 : 1} className="bg-dark text-white vh-100 p-3 sidebar">
          <Button variant="outline-light" className="mb-3" onClick={() => setExpanded(!expanded)}>
            <FaBars />
          </Button>
          <Nav className="flex-column">
            <Nav.Link
              href="#"
              className="text-white d-flex align-items-center"
              onClick={() => setActiveTab('Dashboard')}
            >
              <FaHome className="me-2" /> {expanded && 'Dashboard'}
            </Nav.Link>
            <Nav.Link
              href="#"
              className="text-white d-flex align-items-center"
              onClick={() => setActiveTab('Orders')}
            >
              <FaUser className="me-2" /> {expanded && 'Orders'}
            </Nav.Link>
            <Nav.Link
              href="#"
              className="text-white d-flex align-items-center"
              onClick={() => setActiveTab('Products')}
            >
              <FaBoxOpen className="me-2" /> {expanded && 'Products'}
            </Nav.Link>
            <Nav.Link
              href="#"
              className="text-white d-flex align-items-center"
              onClick={() => setActiveTab('Settings')}
            >
              <FaCog className="me-2" /> {expanded && 'Settings'}
            </Nav.Link>
          </Nav>
        </Col>

        {/* Main Content */}
        <Col md={expanded ? 10 : 11} className="p-4">
          {renderContent()}
        </Col>
      </Row>
    </Container>
  );
};

export default BackOfficePortal;
