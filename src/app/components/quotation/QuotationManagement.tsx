import { useState } from 'react';
import { Plus, Search, X, Trash2, Send } from 'lucide-react';

interface QuotationItem {
  id: string;
  itemName: string;
  itemCode: string;
  qty: number;
  unitPrice: number;
  discount: number;
  total: number;
}

interface Quotation {
  id: string;
  quotationDate: string;
  customerName: string;
  customerPhone: string;
  validUntil: string;
  items: QuotationItem[];
  subTotal: number;
  discount: number;
  total: number;
  status: 'pending' | 'sent' | 'accepted' | 'rejected' | 'expired';
  remarks: string;
}

export function QuotationManagement() {
  const [quotations, setQuotations] = useState<Quotation[]>([
    {
      id: 'QUO-001',
      quotationDate: '2026-02-10',
      customerName: 'John Auto Parts',
      customerPhone: '+94771234567',
      validUntil: '2026-02-24',
      items: [
        { id: '1', itemName: 'Engine Oil 10W-40', itemCode: 'EO-001', qty: 20, unitPrice: 1500, discount: 500, total: 29500 },
      ],
      subTotal: 30000,
      discount: 500,
      total: 29500,
      status: 'sent',
      remarks: 'Special discount for bulk order',
    },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showItemSearch, setShowItemSearch] = useState(false);
  const [itemSearchQuery, setItemSearchQuery] = useState('');
  const [items, setItems] = useState<QuotationItem[]>([]);
  const [formData, setFormData] = useState({
    quotationDate: new Date().toISOString().split('T')[0],
    customerName: '',
    customerPhone: '',
    validUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    remarks: '',
  });

  // Mock items
  const mockItems = [
    { id: '1', name: 'Engine Oil 10W-40', code: 'EO-001', price: 1500 },
    { id: '2', name: 'Brake Pad Set', code: 'BP-102', price: 2500 },
    { id: '3', name: 'Chain Sprocket Kit', code: 'CS-203', price: 3500 },
    { id: '4', name: 'Air Filter', code: 'AF-304', price: 800 },
    { id: '5', name: 'Spark Plug', code: 'SP-405', price: 450 },
  ];

  const addItem = (item: typeof mockItems[0]) => {
    const newItem: QuotationItem = {
      id: Date.now().toString(),
      itemName: item.name,
      itemCode: item.code,
      qty: 1,
      unitPrice: item.price,
      discount: 0,
      total: item.price,
    };
    setItems([...items, newItem]);
    setShowItemSearch(false);
    setItemSearchQuery('');
  };

  const updateItem = (id: string, field: keyof QuotationItem, value: number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        updated.total = (updated.qty * updated.unitPrice) - updated.discount;
        return updated;
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const calculateSubTotal = () => items.reduce((sum, item) => sum + (item.qty * item.unitPrice), 0);
  const calculateTotalDiscount = () => items.reduce((sum, item) => sum + item.discount, 0);
  const calculateTotal = () => calculateSubTotal() - calculateTotalDiscount();

  const handleSave = () => {
    const newQuotation: Quotation = {
      id: 'QUO-' + (quotations.length + 1).toString().padStart(3, '0'),
      quotationDate: formData.quotationDate,
      customerName: formData.customerName,
      customerPhone: formData.customerPhone,
      validUntil: formData.validUntil,
      items: items,
      subTotal: calculateSubTotal(),
      discount: calculateTotalDiscount(),
      total: calculateTotal(),
      status: 'pending',
      remarks: formData.remarks,
    };
    setQuotations([...quotations, newQuotation]);
    setShowAddForm(false);
    setItems([]);
    setFormData({
      quotationDate: new Date().toISOString().split('T')[0],
      customerName: '',
      customerPhone: '',
      validUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      remarks: '',
    });
  };

  const filteredQuotations = quotations.filter(quotation =>
    quotation.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    quotation.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredItems = mockItems.filter(item =>
    item.name.toLowerCase().includes(itemSearchQuery.toLowerCase()) ||
    item.code.toLowerCase().includes(itemSearchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-700',
      sent: 'bg-blue-100 text-blue-700',
      accepted: 'bg-green-100 text-green-700',
      rejected: 'bg-red-100 text-red-700',
      expired: 'bg-gray-100 text-gray-700',
    };
    return <span className={`px-2 py-0.5 rounded text-xs font-medium ${styles[status as keyof typeof styles]}`}>{status.toUpperCase()}</span>;
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Quotations</h2>
          <p className="text-xs text-gray-600 mt-1">Manage customer quotations</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Quotation
        </button>
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
            placeholder="Search quotations..."
          />
        </div>
      </div>

      {/* Quotations Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-xs">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Quotation ID</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Date</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Customer</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Phone</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Valid Until</th>
              <th className="px-4 py-3 text-right font-medium text-gray-700">Total</th>
              <th className="px-4 py-3 text-center font-medium text-gray-700">Status</th>
              <th className="px-4 py-3 text-center font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredQuotations.map((quotation) => (
              <tr key={quotation.id} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-blue-600">{quotation.id}</td>
                <td className="px-4 py-3">{new Date(quotation.quotationDate).toLocaleDateString()}</td>
                <td className="px-4 py-3">{quotation.customerName}</td>
                <td className="px-4 py-3">{quotation.customerPhone}</td>
                <td className="px-4 py-3">{new Date(quotation.validUntil).toLocaleDateString()}</td>
                <td className="px-4 py-3 text-right font-semibold">Rs. {quotation.total.toFixed(2)}</td>
                <td className="px-4 py-3 text-center">{getStatusBadge(quotation.status)}</td>
                <td className="px-4 py-3 text-center">
                  <button
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                    title="Send to Customer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-start justify-center z-[100] overflow-y-auto pt-20 pb-10">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl my-auto mx-4">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-white sticky top-0 z-10 rounded-t-lg">
              <h3 className="text-lg font-semibold text-gray-900">New Quotation</h3>
              <button onClick={() => setShowAddForm(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Quotation Date *</label>
                  <input
                    type="date"
                    value={formData.quotationDate}
                    onChange={(e) => setFormData({ ...formData, quotationDate: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Valid Until *</label>
                  <input
                    type="date"
                    value={formData.validUntil}
                    onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Customer Name *</label>
                  <input
                    type="text"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Customer Phone</label>
                  <input
                    type="tel"
                    value={formData.customerPhone}
                    onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Items Section */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-xs font-medium text-gray-700">Items</label>
                  <button
                    onClick={() => setShowItemSearch(true)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                    Add Item
                  </button>
                </div>

                {items.length > 0 && (
                  <div className="border border-gray-200 rounded overflow-hidden">
                    <table className="w-full text-xs">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-3 py-2 text-left font-medium text-gray-700">Item</th>
                          <th className="px-3 py-2 text-left font-medium text-gray-700">Code</th>
                          <th className="px-3 py-2 text-right font-medium text-gray-700">Qty</th>
                          <th className="px-3 py-2 text-right font-medium text-gray-700">Unit Price</th>
                          <th className="px-3 py-2 text-right font-medium text-gray-700">Discount</th>
                          <th className="px-3 py-2 text-right font-medium text-gray-700">Total</th>
                          <th className="px-3 py-2"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item) => (
                          <tr key={item.id} className="border-t border-gray-200">
                            <td className="px-3 py-2">{item.itemName}</td>
                            <td className="px-3 py-2">{item.itemCode}</td>
                            <td className="px-3 py-2">
                              <input
                                type="number"
                                value={item.qty}
                                onChange={(e) => updateItem(item.id, 'qty', parseInt(e.target.value) || 0)}
                                className="w-16 px-2 py-1 text-right border border-gray-300 rounded text-xs"
                                min="1"
                              />
                            </td>
                            <td className="px-3 py-2">
                              <input
                                type="number"
                                value={item.unitPrice}
                                onChange={(e) => updateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                                className="w-20 px-2 py-1 text-right border border-gray-300 rounded text-xs"
                                min="0"
                                step="0.01"
                              />
                            </td>
                            <td className="px-3 py-2">
                              <input
                                type="number"
                                value={item.discount}
                                onChange={(e) => updateItem(item.id, 'discount', parseFloat(e.target.value) || 0)}
                                className="w-20 px-2 py-1 text-right border border-gray-300 rounded text-xs"
                                min="0"
                              />
                            </td>
                            <td className="px-3 py-2 text-right font-medium">Rs. {item.total.toFixed(2)}</td>
                            <td className="px-3 py-2">
                              <button onClick={() => removeItem(item.id)} className="text-red-600 hover:text-red-800">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Totals */}
              {items.length > 0 && (
                <div className="flex justify-end mb-6">
                  <div className="w-64 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sub Total:</span>
                      <span className="font-medium">Rs. {calculateSubTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Discount:</span>
                      <span className="font-medium text-red-600">- Rs. {calculateTotalDiscount().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-200">
                      <span className="font-semibold text-gray-900">Total:</span>
                      <span className="font-bold text-lg text-blue-600">Rs. {calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Terms & Conditions / Remarks</label>
                <textarea
                  value={formData.remarks}
                  onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Enter terms and conditions or special notes..."
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3 sticky bottom-0 bg-white">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={items.length === 0 || !formData.customerName}
                className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Create Quotation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Item Search Modal */}
      {showItemSearch && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[70]">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-sm font-semibold text-gray-900">Search Item</h3>
              <button onClick={() => setShowItemSearch(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="text"
                  value={itemSearchQuery}
                  onChange={(e) => setItemSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search by item name or code..."
                  autoFocus
                />
              </div>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {filteredItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => addItem(item)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-600">Code: {item.code}</p>
                    </div>
                    <p className="text-sm font-semibold text-blue-600">Rs. {item.price}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}