import { useState } from 'react';
import { TrendingUp, DollarSign, Package, ShoppingCart, Calendar } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function SupplierReports() {
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
        <h2 className="text-xl font-semibold text-gray-900">Supplier Reports Dashboard</h2>
        <p className="text-xs text-gray-600 mt-1">In here you can see supplier reports</p>
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


    </div>
  );
}
