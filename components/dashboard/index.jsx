import React, { useState } from 'react';
import { Container, Row, Col, Nav, Button } from 'react-bootstrap';
import { FaHome, FaUser, FaCog, FaBars, FaBoxOpen } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveTab } from '../../store/features/adminSlices';
import Orders from '../orders';
import Products from '../products';
import BannerForm from '../BannerForm';
import MainDashboard from '../mainDashboard';

const BackOfficePortal = () => {
  const [expanded, setExpanded] = useState(true);
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.activeAdmin.activeTab);

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <MainDashboard />;
      case 'Orders':
        return <Orders />;
      case 'Products':
        return <Products />;
      case 'Settings':
        return <BannerForm />;
      default:
        return <MainDashboard />;
    }
  };

  return (
    <Container fluid style={{ height: '100vh', overflow: 'hidden' }}>
      <Row style={{ height: '100%' }}>
        {/* Sidebar */}
        <Col 
          md={expanded ? 2 : 1} 
          className="bg-dark text-white p-3 sidebar bg-primary" 
          style={{
            height: '100vh',
            position: 'fixed',
            top: 0,
            left: 0,
            overflowY: 'auto',
            zIndex: 1000
          }}
        >
          <Button variant="outline-light" className="mb-3" onClick={() => setExpanded(!expanded)}>
            <FaBars />
          </Button>
          <Nav className="flex-column">
            <Nav.Link
              href="#"
              className={`text-white d-flex align-items-center ${activeTab === 'Dashboard' ? 'active' : ''}`}
              onClick={() => dispatch(setActiveTab('Dashboard'))}
              style={{backgroundColor: activeTab === 'Dashboard' ? 'var(--primary-text-color)' : 'transparent'}}
            >
              <FaHome className="me-2" /> {expanded && 'Dashboard'}
            </Nav.Link>
            <Nav.Link
              href="#"
              className={`text-white d-flex align-items-center ${activeTab === 'Orders' ? 'active' : ''}`}
              onClick={() => dispatch(setActiveTab('Orders'))}
              style={{backgroundColor: activeTab === 'Orders' ? 'var(--primary-text-color)' : 'transparent'}}
            >
              <FaUser className="me-2" /> {expanded && 'Orders'}
            </Nav.Link>
            <Nav.Link
              href="#"
              className={`text-white d-flex align-items-center ${activeTab === 'Products' ? 'active' : ''}`}
              onClick={() => dispatch(setActiveTab('Products'))}
              style={{backgroundColor: activeTab === 'Products' ? 'var(--primary-text-color)' : 'transparent'}}
            >
              <FaBoxOpen className="me-2" /> {expanded && 'Products'}
            </Nav.Link>
            <Nav.Link
              href="#"
              className={`text-white d-flex align-items-center ${activeTab === 'Settings' ? 'active' : ''}`}
              onClick={() => dispatch(setActiveTab('Settings'))}
              style={{backgroundColor: activeTab === 'Settings' ? 'var(--primary-text-color)' : 'transparent'}}
            >
              <FaCog className="me-2" /> {expanded && 'Settings'}
            </Nav.Link>
          </Nav>
        </Col>

        {/* Main Content */}
        <Col 
          md={expanded ? 10 : 11} 
          className="p-4"
          style={{
            marginLeft: expanded ? '16.666667%' : '8.333333%',
            height: '100vh',
            overflowY: 'auto'
          }}
        >
          {renderContent()}
        </Col>
      </Row>
    </Container>
  );
};

export default BackOfficePortal;
