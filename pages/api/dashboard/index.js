// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Hardcoded dashboard data
  const dashboardData = {
    salesData: {
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
          ]
        }
      ]
    },
    summaryData: {
      totalSales: {
        value: 71000,
        trend: 15,
        isPositive: true
      },
      totalOrders: {
        value: 1248,
        trend: 12,
        isPositive: true
      },
      totalCustomers: {
        value: 3247,
        trend: 18,
        isPositive: true
      },
      averageOrder: {
        value: 72.50,
        trend: 5,
        isPositive: true
      }
    },
    topProducts: [
      {
        name: 'iPhone 13 Pro',
        sales: 258,
        revenue: 257742,
        growth: 25,
        isPositive: true
      },
      {
        name: 'MacBook Air M1',
        sales: 224,
        revenue: 291076,
        growth: 18,
        isPositive: true
      },
      {
        name: 'AirPods Pro',
        sales: 352,
        revenue: 87648,
        growth: 32,
        isPositive: true
      },
      {
        name: 'iPad Mini',
        sales: 185,
        revenue: 92315,
        growth: 15,
        isPositive: true
      },
      {
        name: 'Apple Watch S7',
        sales: 142,
        revenue: 56800,
        growth: -8,
        isPositive: false
      }
    ],
    recentOrders: [
      {
        id: '#ORD-0234',
        customer: 'John Doe',
        product: 'iPhone 13 Pro',
        amount: 999.00,
        status: 'delivered'
      },
      {
        id: '#ORD-0233',
        customer: 'Jane Smith',
        product: 'MacBook Air',
        amount: 1299.00,
        status: 'intransit'
      },
      {
        id: '#ORD-0232',
        customer: 'Robert Johnson',
        product: 'AirPods Pro',
        amount: 249.00,
        status: 'pending'
      },
      {
        id: '#ORD-0231',
        customer: 'Emily Brown',
        product: 'iPad Mini',
        amount: 499.00,
        status: 'cancelled'
      }
    ],
    orderStatusCounts: [
      {
        status: 'Pending',
        count: 12,
        icon: 'FaClock'
      },
      {
        status: 'In Transit',
        count: 28,
        icon: 'FaTruck'
      },
      {
        status: 'Delivered',
        count: 45,
        icon: 'FaCheckCircle'
      },
      {
        status: 'Complete',
        count: 158,
        icon: 'FaCheckCircle'
      },
      {
        status: 'Cancelled',
        count: 8,
        icon: 'FaTimesCircle'
      }
    ]
  };

  res.status(200).json(dashboardData);
} 