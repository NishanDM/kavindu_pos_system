import { useState } from 'react';
import { Search, DollarSign, AlertCircle } from 'lucide-react';

interface SupplierOutstanding {
  id: string;
  supplierName: string;
  grnId: string;
  grnDate: string;
  invoiceNo: string;
  totalAmount: number;
  paidAmount: number;
  outstandingAmount: number;
  dueDate: string;
  daysOverdue: number;
  status: 'current' | 'overdue' | 'critical';
}

export function SupplierOutstandings() {
  const [searchQuery, setSearchQuery] = useState('');
  const [outstandings] = useState<SupplierOutstanding[]>([
    {
      id: 'OUT-001',
      supplierName: 'ABC Auto Parts Ltd',
      grnId: 'GRN-001',
      grnDate: '2026-01-15',
      invoiceNo: 'INV-SUP-001',
      totalAmount: 125000,
      paidAmount: 50000,
      outstandingAmount: 75000,
      dueDate: '2026-02-15',
      daysOverdue: 0,
      status: 'current',
    },
    {
      id: 'OUT-002',
      supplierName: 'Premium Motor Parts',
      grnId: 'GRN-002',
      grnDate: '2025-12-20',
      invoiceNo: 'INV-SUP-002',
      totalAmount: 85000,
      paidAmount: 20000,
      outstandingAmount: 65000,
      dueDate: '2026-01-20',
      daysOverdue: 29,
      status: 'overdue',
    },
    {
      id: 'OUT-003',
      supplierName: 'Speed Parts Distributor',
      grnId: 'GRN-003',
      grnDate: '2025-11-10',
      invoiceNo: 'INV-SUP-003',
      totalAmount: 150000,
      paidAmount: 0,
      outstandingAmount: 150000,
      dueDate: '2025-12-10',
      daysOverdue: 70,
      status: 'critical',
    },
    {
      id: 'OUT-004',
      supplierName: 'Elite Bike Components',
      grnId: 'GRN-004',
      grnDate: '2026-02-01',
      invoiceNo: 'INV-SUP-004',
      totalAmount: 95000,
      paidAmount: 40000,
      outstandingAmount: 55000,
      dueDate: '2026-03-01',
      daysOverdue: 0,
      status: 'current',
    },
  ]);

  const filteredOutstandings = outstandings.filter(
    (outstanding) =>
      outstanding.supplierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      outstanding.grnId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      outstanding.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalOutstanding = outstandings.reduce((sum, item) => sum + item.outstandingAmount, 0);
  const criticalCount = outstandings.filter((item) => item.status === 'critical').length;
  const overdueCount = outstandings.filter((item) => item.status === 'overdue').length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'current':
        return <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium">Current</span>;
      case 'overdue':
        return <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded text-xs font-medium">Overdue</span>;
      case 'critical':
        return <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs font-medium">Critical</span>;
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Supplier Outstandings</h2>
        <p className="text-xs text-gray-600 mt-1">Track pending payments to suppliers</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-red-600" />
            <p className="text-xs text-gray-600">Total Outstanding</p>
          </div>
          <p className="text-2xl font-bold text-red-600">Rs. {totalOutstanding.toLocaleString()}</p>
        </div>
        <div className="bg-white border border-orange-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-orange-600" />
            <p className="text-xs text-gray-600">Overdue Payments</p>
          </div>
          <p className="text-2xl font-bold text-orange-600">{overdueCount}</p>
        </div>
        <div className="bg-white border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <p className="text-xs text-gray-600">Critical Payments</p>
          </div>
          <p className="text-2xl font-bold text-red-600">{criticalCount}</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search by supplier, GRN ID, or invoice number..."
          />
        </div>
      </div>

      {/* Outstandings Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-xs">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Supplier</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">GRN ID</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Invoice No</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">GRN Date</th>
              <th className="px-4 py-3 text-right font-medium text-gray-700">Total Amount</th>
              <th className="px-4 py-3 text-right font-medium text-gray-700">Paid</th>
              <th className="px-4 py-3 text-right font-medium text-gray-700">Outstanding</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Due Date</th>
              <th className="px-4 py-3 text-center font-medium text-gray-700">Days Overdue</th>
              <th className="px-4 py-3 text-center font-medium text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOutstandings.map((outstanding) => (
              <tr
                key={outstanding.id}
                className={`border-t border-gray-200 hover:bg-gray-50 ${
                  outstanding.status === 'critical' ? 'bg-red-50' : outstanding.status === 'overdue' ? 'bg-orange-50' : ''
                }`}
              >
                <td className="px-4 py-3 font-medium text-gray-900">{outstanding.supplierName}</td>
                <td className="px-4 py-3 text-blue-600">{outstanding.grnId}</td>
                <td className="px-4 py-3">{outstanding.invoiceNo}</td>
                <td className="px-4 py-3">{new Date(outstanding.grnDate).toLocaleDateString()}</td>
                <td className="px-4 py-3 text-right">Rs. {outstanding.totalAmount.toLocaleString()}</td>
                <td className="px-4 py-3 text-right text-green-600">Rs. {outstanding.paidAmount.toLocaleString()}</td>
                <td className="px-4 py-3 text-right font-semibold text-red-600">
                  Rs. {outstanding.outstandingAmount.toLocaleString()}
                </td>
                <td className="px-4 py-3">{new Date(outstanding.dueDate).toLocaleDateString()}</td>
                <td className="px-4 py-3 text-center">
                  {outstanding.daysOverdue > 0 ? (
                    <span className="font-semibold text-red-600">{outstanding.daysOverdue}</span>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="px-4 py-3 text-center">{getStatusBadge(outstanding.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Footer */}
      <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">Total Outstanding Balance</p>
          <p className="text-xl font-bold text-red-600">Rs. {totalOutstanding.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
