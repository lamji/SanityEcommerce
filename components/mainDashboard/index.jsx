import React from 'react';
import { Row, Col, Card, Table, ProgressBar } from 'react-bootstrap';
import { 
  FaShoppingCart, 
  FaUsers, 
  FaDollarSign, 
  FaChartLine,
  FaArrowUp,
  FaArrowDown,
  FaBox,
  FaClock,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle
} from 'react-icons/fa';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import useViewModel from './useViewModel';
import useStyles from './useStyles';
import { getStatusColor, getStatusDisplayText } from '../../helpers/statusHelpers';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MainDashboard = () => {
  const {
    salesData,
    summaryData,
    topProducts,
    recentOrders,
    orderStatusCounts,
    chartOptions,
    formatCurrency,
    formatNumber,
  } = useViewModel();

  const styles = useStyles();

  // Map icon names to components
  const statusIcons = {
    FaClock,
    FaTruck,
    FaCheckCircle,
    FaTimesCircle
  };

  const renderTrendIndicator = (trend, isPositive) => (
    <small style={{...styles.trendIndicator, ...(isPositive ? styles.trendPositive : styles.trendNegative)}}>
      {isPositive ? <FaArrowUp /> : <FaArrowDown />}
      {trend}% {isPositive ? 'increase' : 'decrease'}
    </small>
  );

  return (
    <div style={styles.dashboardWrapper} data-testid="main-dashboard">
      {/* All Cards in Single Row */}
      <Row className="g-3 mb-4" data-testid="dashboard-metrics-row">
        <Col md={3}>
          <Card style={styles.card} data-testid="total-sales-card">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2" data-testid="total-sales-label">Total Sales</h6>
                  <h3 className="mb-0" style={{ fontSize: '1.25rem' }} data-testid="total-sales-value">
                    {formatCurrency(summaryData.totalSales.value)}
                  </h3>
                  {renderTrendIndicator(summaryData.totalSales.trend, summaryData.totalSales.isPositive)}
                </div>
                <div style={{...styles.iconWrapper, backgroundColor: 'rgba(var(--bs-primary-rgb), 0.1)'}} data-testid="total-sales-icon">
                  <FaDollarSign className="text-primary fs-4" />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card style={styles.card} data-testid="total-orders-card">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2" data-testid="total-orders-label">Total Orders</h6>
                  <h3 className="mb-0" style={{ fontSize: '1.25rem' }} data-testid="total-orders-value">
                    {formatNumber(summaryData.totalOrders.value)}
                  </h3>
                  {renderTrendIndicator(summaryData.totalOrders.trend, summaryData.totalOrders.isPositive)}
                </div>
                <div style={{...styles.iconWrapper, backgroundColor: 'rgba(var(--bs-success-rgb), 0.1)'}} data-testid="total-orders-icon">
                  <FaShoppingCart className="text-success fs-4" />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card style={styles.card} data-testid="total-customers-card">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2" data-testid="total-customers-label">Total Customers</h6>
                  <h3 className="mb-0" style={{ fontSize: '1.25rem' }} data-testid="total-customers-value">
                    {formatNumber(summaryData.totalCustomers.value)}
                  </h3>
                  {renderTrendIndicator(summaryData.totalCustomers.trend, summaryData.totalCustomers.isPositive)}
                </div>
                <div style={{...styles.iconWrapper, backgroundColor: 'rgba(var(--bs-info-rgb), 0.1)'}} data-testid="total-customers-icon">
                  <FaUsers className="text-info fs-4" />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card style={styles.card} data-testid="average-order-card">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2" data-testid="average-order-label">Average Order</h6>
                  <h3 className="mb-0" style={{ fontSize: '1.25rem' }} data-testid="average-order-value">
                    {formatCurrency(summaryData.averageOrder.value)}
                  </h3>
                  {renderTrendIndicator(summaryData.averageOrder.trend, summaryData.averageOrder.isPositive)}
                </div>
                <div style={{...styles.iconWrapper, backgroundColor: 'rgba(var(--bs-warning-rgb), 0.1)'}} data-testid="average-order-icon">
                  <FaChartLine className="text-warning fs-4" />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Order Status Cards */}
      <div className='status-row' style={styles.statusRow}>
        {orderStatusCounts.map((status, index) => {
          const IconComponent = statusIcons[status.icon];

          const statusColor = getStatusColor(status.status.replace(' ', '').toLowerCase());
          
          
          return (
            <Col key={index} md={2}>
              <Card style={{
                ...styles.card, 
                height: '100%', 
                backgroundColor: "transparent",
                boxShadow: 'none'
              }} data-testid={`order-status-card-${status.status.toLowerCase()}`}>
                <Card.Body style={{ padding: '0px', backgroundColor: "transparent" }}>
                  <div className="d-flex align-items-center">
                    <div style={{
                      ...styles.iconWrapper,
                      backgroundColor: `${statusColor}`,
                      marginRight: '1rem',
                      width: '50px',
                      height: '50px'
                    }} data-testid={`order-status-icon-${status.status.toLowerCase()}`}>
                      <IconComponent style={{ color: statusColor, fontSize: '5rem' }} />
                    </div>
                    <div>
                      <h3 className="mb-0" style={{ fontSize: '1.25rem', fontWeight: 600 }} data-testid={`order-status-count-${status.status.toLowerCase()}`}>
                        {formatNumber(status.count)}
                      </h3>
                      <small className="text-muted" style={{ fontSize: '0.8rem' }} data-testid={`order-status-label-${status.status.toLowerCase()}`}>
                        {status.status}
                      </small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </div>

      {/* Charts and Tables */}
      <Row className="g-3 mb-4">
        <Col md={8}>
          <Card style={styles.card}>
            <Card.Body style={styles.cardBody}>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 style={styles.cardTitle}>Annual Sales Overview</h5>
                <div className="d-flex align-items-center">
                  <small className="text-muted me-2">Total Sales:</small>
                  <span style={{color: 'var(--primary-color)', fontWeight: 600}}>
                    {formatCurrency(summaryData.totalSales.value)}
                  </span>
                </div>
              </div>
              <div style={styles.chartContainer}>
                <Line data={salesData} options={chartOptions} />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card style={styles.card}>
            <Card.Body style={styles.cardBody}>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 style={styles.cardTitle}>Top Products</h5>
                <div style={{...styles.iconWrapper, backgroundColor: 'rgba(var(--bs-primary-rgb), 0.1)'}}>
                  <FaBox className="text-primary" />
                </div>
              </div>
              <div style={styles.cardContent}>
                {topProducts.map((product, index) => {
                  // Calculate max sales for progress bar
                  const maxSales = Math.max(...topProducts.map(p => p.sales));
                  
                  return (
                    <div key={index} style={{
                      ...styles.progressBarContainer, 
                      borderBottom: index !== topProducts.length - 1 ? '1px solid #eee' : 'none',
                      paddingBottom: '0.75rem',
                      marginBottom: '0.75rem'
                    }}>
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div>
                          <h6 className="mb-0" style={{fontSize: '0.9rem', fontWeight: 600}}>
                            #{index + 1} {product.name}
                          </h6>
                          <small className="text-muted d-block" style={{fontSize: '0.8rem'}}>
                            {formatNumber(product.sales)} units sold
                          </small>
                        </div>
                        <div className="text-end">
                          <div style={{fontSize: '0.9rem', fontWeight: 600, color: 'var(--primary-color)'}}>
                            {formatCurrency(product.revenue)}
                          </div>
                          <small style={{
                            color: product.isPositive ? 'var(--bs-success)' : 'var(--bs-danger)',
                            fontSize: '0.8rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            gap: '0.25rem'
                          }}>
                            {product.isPositive ? <FaArrowUp size={10} /> : <FaArrowDown size={10} />}
                            {Math.abs(product.growth)}%
                          </small>
                        </div>
                      </div>
                      <ProgressBar 
                        now={(product.sales / maxSales) * 100} 
                        variant={product.variant}
                        style={{...styles.progress, height: '6px'}}
                      />
                    </div>
                  );
                })}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Orders */}
      <Row className="g-3">
        <Col md={12}>
          <Card style={styles.card}>
            <Card.Body>
              <h5 style={styles.cardTitle}>Recent Orders</h5>
              <div style={styles.tableResponsive}>
                <Table hover style={styles.ordersTable} className="mb-0">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Product</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order, index) => {
                      const statusColor = getStatusColor(order.status);
                      return (
                        <tr key={index} data-testid={`order-row-${index}`}>
                          <td data-testid={`order-id-${index}`}>{order.id}</td>
                          <td data-testid={`order-customer-${index}`}>{order.customer}</td>
                          <td data-testid={`order-product-${index}`}>{order.product}</td>
                          <td data-testid={`order-amount-${index}`}>{formatCurrency(order.amount)}</td>
                          <td>
                            <span 
                              style={{
                                ...styles.statusBadge,
                                backgroundColor: `${statusColor}`,
                                // color: statusColor
                              }}
                              data-testid={`order-status-${index}`}
                            >
                              {getStatusDisplayText(order.status)}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default MainDashboard; 