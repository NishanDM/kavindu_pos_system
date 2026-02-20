import { useState } from 'react';
import { TrendingUp, DollarSign, Package, ShoppingCart, Calendar } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function AccountsDashboard() {
  const [dateRange, setDateRange] = useState<'daily' | 'monthly' | 'yearly' | 'custom'>('monthly');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Mock data for sales
  const monthlySalesData = [
    { month: 'Jan', sales: 45000, profit: 12000 },
    { month: 'Feb', sales: 52000, profit: 14500 },
    { month: 'Mar', sales: 48000, profit: 13200 },
    { month: 'Apr', sales: 61000, profit: 17800 },
    { month: 'May', sales: 55000, profit: 15400 },
    { month: 'Jun', sales: 67000, profit: 19200 },
  ];

  const dailySalesData = [
    { day: 'Mon', sales: 8500 },
    { day: 'Tue', sales: 9200 },
    { day: 'Wed', sales: 7800 },
    { day: 'Thu', sales: 10500 },
    { day: 'Fri', sales: 11200 },
    { day: 'Sat', sales: 13500 },
    { day: 'Sun', sales: 6800 },
  ];

  const topSellingItems = [
    { item: 'Engine Oil 10W-40', qty: 145, revenue: 217500 },
    { item: 'Brake Pad Set', qty: 89, revenue: 222500 },
    { item: 'Chain Sprocket Kit', qty: 67, revenue: 234500 },
    { item: 'Air Filter', qty: 124, revenue: 99200 },
    { item: 'Spark Plug', qty: 203, revenue: 91350 },
  ];

  const expenses = [
    { category: 'Rent', amount: 35000 },
    { category: 'Utilities', amount: 8500 },
    { category: 'Salaries', amount: 120000 },
    { category: 'Transportation', amount: 12000 },
    { category: 'Maintenance', amount: 5500 },
  ];

  const totalSales = monthlySalesData.reduce((sum, item) => sum + item.sales, 0);
  const totalProfit = monthlySalesData.reduce((sum, item) => sum + item.profit, 0);
  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
  const stockValue = 2450000; // Mock stock value

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Accounts Dashboard</h2>
        <p className="text-xs text-gray-600 mt-1">Financial overview and analytics</p>
      </div>

      {/* Date Range Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-4">
          <Calendar className="w-4 h-4 text-gray-600" />
          <div className="flex gap-2">
            {(['daily', 'monthly', 'yearly', 'custom'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-3 py-1.5 text-xs rounded transition-colors ${
                  dateRange === range
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
          {dateRange === 'custom' && (
            <div className="flex gap-2 ml-4">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="px-3 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-600 self-center">to</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="px-3 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-blue-700">Total Sales</p>
              <p className="text-xl font-bold text-blue-900">Rs. {totalSales.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-600 rounded-lg">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-green-700">Total Profit</p>
              <p className="text-xl font-bold text-green-900">Rs. {totalProfit.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-600 rounded-lg">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-purple-700">Stock Value</p>
              <p className="text-xl font-bold text-purple-900">Rs. {stockValue.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-600 rounded-lg">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-red-700">Total Expenses</p>
              <p className="text-xl font-bold text-red-900">Rs. {totalExpenses.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Sales Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Monthly Sales & Profit</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlySalesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="sales" fill="#2563eb" radius={[4, 4, 0, 0]} />
              <Bar dataKey="profit" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-600 rounded"></div>
              <span className="text-xs text-gray-600">Sales</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-600 rounded"></div>
              <span className="text-xs text-gray-600">Profit</span>
            </div>
          </div>
        </div>

        {/* Daily Sales Trend */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Daily Sales Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={dailySalesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#06b6d4" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Selling Items and Expenses */}
      <div className="grid grid-cols-2 gap-6">
        {/* Top Selling Items */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Top Selling Items</h3>
          <div className="space-y-3">
            {topSellingItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-900">{item.item}</p>
                  <p className="text-xs text-gray-600">Qty: {item.qty}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-blue-600">Rs. {item.revenue.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expenses Breakdown */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Expenses Breakdown</h3>
          <div className="space-y-3">
            {expenses.map((expense, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-900">{expense.category}</p>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                    <div
                      className="bg-red-600 h-1.5 rounded-full"
                      style={{ width: `${(expense.amount / totalExpenses) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <p className="text-xs font-semibold text-red-600">Rs. {expense.amount.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">{((expense.amount / totalExpenses) * 100).toFixed(1)}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
