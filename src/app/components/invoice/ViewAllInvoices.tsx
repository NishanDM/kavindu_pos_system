import { useState } from 'react';
import { Search, Filter, Eye, Edit, Trash2, Printer } from 'lucide-react';

interface Invoice {
  id: string;
  date: string;
  customer: { name: string; phone: string };
  paymentMethod: string;
  netTotal: number;
  settled: boolean;
}

interface ViewAllInvoicesProps {
  invoices: Invoice[];
  onEdit: (invoice: Invoice) => void;
  onDelete: (id: string) => void;
}

export function ViewAllInvoices({ invoices, onEdit, onDelete }: ViewAllInvoicesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'settled' | 'pending'>('all');
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; invoice: Invoice } | null>(null);

  const handleContextMenu = (e: React.MouseEvent, invoice: Invoice) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, invoice });
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = 
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.customer.phone.includes(searchQuery);
    
    const matchesStatus = 
      filterStatus === 'all' ||
      (filterStatus === 'settled' && invoice.settled) ||
      (filterStatus === 'pending' && !invoice.settled);

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6" onClick={handleCloseContextMenu}>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">View All Invoices</h2>
        <p className="text-xs text-gray-600 mt-1">Manage and view all sales invoices</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search by invoice ID, customer name or phone..."
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-600" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="settled">Settled</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-xs">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Invoice ID</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Date</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Customer</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Phone</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Payment Method</th>
              <th className="px-4 py-3 text-right font-medium text-gray-700">Net Total</th>
              <th className="px-4 py-3 text-center font-medium text-gray-700">Status</th>
              <th className="px-4 py-3 text-center font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                  No invoices found
                </td>
              </tr>
            ) : (
              filteredInvoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="border-t border-gray-200 hover:bg-gray-50 cursor-pointer"
                  onContextMenu={(e) => handleContextMenu(e, invoice)}
                >
                  <td className="px-4 py-3 font-medium text-blue-600">{invoice.id}</td>
                  <td className="px-4 py-3">{new Date(invoice.date).toLocaleDateString()}</td>
                  <td className="px-4 py-3">{invoice.customer.name}</td>
                  <td className="px-4 py-3">{invoice.customer.phone}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">
                      {invoice.paymentMethod}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-semibold">Rs. {invoice.netTotal.toFixed(2)}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      invoice.settled
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {invoice.settled ? 'Settled' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-2">
                      <button
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onEdit(invoice)}
                        className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1 text-cyan-600 hover:bg-cyan-50 rounded"
                        title="Print"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(invoice.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <div
          className="fixed bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-[60]"
          style={{ left: contextMenu.x, top: contextMenu.y }}
        >
          <button
            onClick={() => {
              console.log('View', contextMenu.invoice);
              handleCloseContextMenu();
            }}
            className="w-full px-4 py-2 text-left text-xs hover:bg-gray-100 flex items-center gap-2"
          >
            <Eye className="w-3 h-3" />
            View Invoice
          </button>
          <button
            onClick={() => {
              onEdit(contextMenu.invoice);
              handleCloseContextMenu();
            }}
            className="w-full px-4 py-2 text-left text-xs hover:bg-gray-100 flex items-center gap-2"
          >
            <Edit className="w-3 h-3" />
            Edit Invoice
          </button>
          <button
            onClick={() => {
              console.log('Print', contextMenu.invoice);
              handleCloseContextMenu();
            }}
            className="w-full px-4 py-2 text-left text-xs hover:bg-gray-100 flex items-center gap-2"
          >
            <Printer className="w-3 h-3" />
            Print Invoice
          </button>
          <div className="border-t border-gray-200 my-1"></div>
          <button
            onClick={() => {
              onDelete(contextMenu.invoice.id);
              handleCloseContextMenu();
            }}
            className="w-full px-4 py-2 text-left text-xs hover:bg-red-50 text-red-600 flex items-center gap-2"
          >
            <Trash2 className="w-3 h-3" />
            Delete Invoice
          </button>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-xs text-blue-700 mb-1">Total Invoices</p>
          <p className="text-2xl font-bold text-blue-900">{invoices.length}</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-xs text-green-700 mb-1">Settled</p>
          <p className="text-2xl font-bold text-green-900">
            {invoices.filter(i => i.settled).length}
          </p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-xs text-yellow-700 mb-1">Pending</p>
          <p className="text-2xl font-bold text-yellow-900">
            {invoices.filter(i => !i.settled).length}
          </p>
        </div>
      </div>
    </div>
  );
}