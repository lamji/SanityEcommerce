import { useState, useEffect } from 'react';

import { getStatusColor } from '../../helpers/statusHelpers';


export const useViewModel = () => {
  const [salesData, setSalesData] = useState({
    labels: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    datasets: [
      {
        label: 'Monthly Sales',
        data: [
          3000, 3500, 4200, 4800, 5100, 5800,
          6200, 6800, 7100, 7500, 8200, 8800
        ],
        fill: false,
        borderColor: 'var(--primary-color)',
        tension: 0.4,
        pointBackgroundColor: 'var(--primary-color)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  });

  const [summaryData, setSummaryData] = useState({
    totalSales: {
      value: 71000, // Updated to reflect yearly total
      trend: 15,
      isPositive: true,
    },
    totalOrders: {
      value: 1248,
      trend: 12,
      isPositive: true,
    },
    totalCustomers: {
      value: 3247,
      trend: 18,
      isPositive: true,
    },
    averageOrder: {
      value: 72.50,
      trend: 5,
      isPositive: true,
    },
  });

  const [topProducts, setTopProducts] = useState([
    { 
      name: 'iPhone 13 Pro',
      sales: 258,
      revenue: 257742,
      growth: 25,
      isPositive: true,
      variant: 'primary'
    },
    { 
      name: 'MacBook Air M1',
      sales: 224,
      revenue: 291076,
      growth: 18,
      isPositive: true,
      variant: 'success'
    },
    { 
      name: 'AirPods Pro',
      sales: 352,
      revenue: 87648,
      growth: 32,
      isPositive: true,
      variant: 'info'
    },
    { 
      name: 'iPad Mini',
      sales: 185,
      revenue: 92315,
      growth: 15,
      isPositive: true,
      variant: 'warning'
    },
    { 
      name: 'Apple Watch S7',
      sales: 142,
      revenue: 56800,
      growth: -8,
      isPositive: false,
      variant: 'danger'
    }
  ]);

  const [recentOrders, setRecentOrders] = useState([
    {
      id: '#ORD-0234',
      customer: 'John Doe',
      product: 'iPhone 13 Pro',
      amount: 999.00,
      status: 'delivered' ,
    },
    {
      id: '#ORD-0233',
      customer: 'Jane Smith',
      product: 'MacBook Air',
      amount: 1299.00,
      status: 'intransit' ,
    },
    {
      id: '#ORD-0232',
      customer: 'Robert Johnson',
      product: 'AirPods Pro',
      amount: 249.00,
      status: 'pending',
    },
    {
      id: '#ORD-0231',
      customer: 'Emily Brown',
      product: 'iPad Mini',
      amount: 499.00,
      status: 'cancelled',
    },
  ]);

  const [orderStatusCounts, setOrderStatusCounts] = useState([
    {
      status: 'Pending',
      count: 12,
      color: getStatusColor('pending'),
      icon: 'FaClock'
    },
    {
      status: 'In Transit',
      count: 28,
      color: getStatusColor('intransit'),
      icon: 'FaTruck'
    },
    {
      status: 'Delivered',
      count: 45,
      color: getStatusColor('delivered'),
      icon: 'FaCheckCircle'
    },
    {
      status: 'Complete',
      count: 158,
      color: getStatusColor('complete'),
      icon: 'FaCheckCircle'
    },
    {
      status: 'Cancelled',
      count: 8,
      color: getStatusColor('cancelled'),
      icon: 'FaTimesCircle'
    }
  ]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: 13,
        },
        bodyFont: {
          size: 12,
        },
        padding: 10,
        cornerRadius: 4,
        displayColors: false,
        callbacks: {
          label: (context) => `Sales: $${context.parsed.y.toLocaleString()}`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          drawBorder: false,
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          callback: (value) => `$${value.toLocaleString()}`,
          font: {
            size: 11,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
    resizeDelay: 0,
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        hitRadius: 10
      }
    }
  };

  // Function to format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  // Function to format large numbers
  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  // Function to handle date range changes
  const handleDateRangeChange = (range) => {
    // TODO: Implement date range filtering
    console.log('Date range changed:', range);
  };

  // Function to handle order status changes
  const handleStatusChange = (orderId, newStatus) => {
    // TODO: Implement order status update
    console.log('Status changed for order:', orderId, 'to', newStatus);
  };

  // Fetch dashboard data
  useEffect(() => {
    // TODO: Implement API calls to fetch real data
    // For now, we're using static data
  }, []);

  return {
    salesData,
    summaryData,
    topProducts,
    recentOrders,
    orderStatusCounts,
    chartOptions,
    formatCurrency,
    formatNumber,
    handleDateRangeChange,
    handleStatusChange,
  };
};

export default useViewModel; 