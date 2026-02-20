import { useState } from 'react';
import { Plus, Search, X, Trash2 } from 'lucide-react';

interface GRNItem {
  id: string;
  itemName: string;
  itemCode: string;
  qty: number;
  costPrice: number;
  total: number;
}

interface GRN {
  id: string;
  grnDate: string;
  supplierName: string;
  invoiceDate: string;
  invoiceNo: string;
  paymentMethod: string;
  items: GRNItem[];
  total: number;
  discount: number;
  remarks: string;
}

export function GRNManagement() {
  const [grns, setGrns] = useState<GRN[]>([
    {
      id: 'GRN-001',
      grnDate: '2026-02-05',
      supplierName: 'ABC Auto Parts Ltd',
      invoiceDate: '2026-02-04',
      invoiceNo: 'INV-SUP-001',
      paymentMethod: 'Credit',
      items: [
        { id: '1', itemName: 'Engine Oil 10W-40', itemCode: 'EO-001', qty: 50, costPrice: 1200, total: 60000 },
        { id: '2', itemName: 'Brake Pad Set', itemCode: 'BP-102', qty: 30, costPrice: 2000, total: 60000 },
      ],
      total: 125000,
      discount: 5000,
      remarks: 'Monthly stock order',
    },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showItemSearch, setShowItemSearch] = useState(false);
  const [itemSearchQuery, setItemSearchQuery] = useState('');
  const [items, setItems] = useState<GRNItem[]>([]);
  const [formData, setFormData] = useState({
    grnDate: new Date().toISOString().split('T')[0],
    supplierName: '',
    invoiceDate: '',
    invoiceNo: '',
    paymentMethod: 'Cash',
    discount: '',
    remarks: '',
  });

  // Mock items for search
  const mockItems = [
    { id: '1', name: 'Engine Oil 10W-40', code: 'EO-001', costPrice: 1200, sellingPrice: 1500, stock: 50 },
    { id: '2', name: 'Brake Pad Set', code: 'BP-102', costPrice: 2000, sellingPrice: 2500, stock: 30 },
    { id: '3', name: 'Chain Sprocket Kit', code: 'CS-203', costPrice: 2800, sellingPrice: 3500, stock: 20 },
    { id: '4', name: 'Air Filter', code: 'AF-304', costPrice: 600, sellingPrice: 800, stock: 45 },
    { id: '5', name: 'Spark Plug', code: 'SP-405', costPrice: 350, sellingPrice: 450, stock: 100 },
  ];

  const addItem = (item: typeof mockItems[0]) => {
    const newItem: GRNItem = {
      id: Date.now().toString(),
      itemName: item.name,
      itemCode: item.code,
      qty: 1,
      costPrice: item.costPrice,
      total: item.costPrice,
    };
    setItems([...items, newItem]);
    setShowItemSearch(false);
    setItemSearchQuery('');
  };

  const updateItem = (id: string, field: keyof GRNItem, value: number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        updated.total = updated.qty * updated.costPrice;
        return updated;
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const calculateSubTotal = () => items.reduce((sum, item) => sum + item.total, 0);
  const calculateNetTotal = () => calculateSubTotal() - (parseFloat(formData.discount) || 0);

  const handleSave = () => {
    const newGRN: GRN = {
      id: 'GRN-' + (grns.length + 1).toString().padStart(3, '0'),
      grnDate: formData.grnDate,
      supplierName: formData.supplierName,
      invoiceDate: formData.invoiceDate,
      invoiceNo: formData.invoiceNo,
      paymentMethod: formData.paymentMethod,
      items: items,
      total: calculateSubTotal(),
      discount: parseFloat(formData.discount) || 0,
      remarks: formData.remarks,
    };
    setGrns([...grns, newGRN]);
    setShowAddForm(false);
    setItems([]);
    setFormData({
      grnDate: new Date().toISOString().split('T')[0],
      supplierName: '',
      invoiceDate: '',
      invoiceNo: '',
      paymentMethod: 'Cash',
      discount: '',
      remarks: '',
    });
  };

  const filteredGRNs = grns.filter(grn =>
    grn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    grn.supplierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    grn.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredItems = mockItems.filter(item =>
    item.name.toLowerCase().includes(itemSearchQuery.toLowerCase()) ||
    item.code.toLowerCase().includes(itemSearchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">GRN Management</h2>
          <p className="text-xs text-gray-600 mt-1">Goods Received Notes</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New GRN
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
            placeholder="Search GRN..."
          />
        </div>
      </div>

      {/* GRN Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-xs">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-700">GRN ID</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">GRN Date</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Supplier</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Invoice No</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Payment Method</th>
              <th className="px-4 py-3 text-right font-medium text-gray-700">Total</th>
              <th className="px-4 py-3 text-right font-medium text-gray-700">Discount</th>
              <th className="px-4 py-3 text-right font-medium text-gray-700">Net Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredGRNs.map((grn) => (
              <tr key={grn.id} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-blue-600">{grn.id}</td>
                <td className="px-4 py-3">{new Date(grn.grnDate).toLocaleDateString()}</td>
                <td className="px-4 py-3">{grn.supplierName}</td>
                <td className="px-4 py-3">{grn.invoiceNo}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">
                    {grn.paymentMethod}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">Rs. {grn.total.toFixed(2)}</td>
                <td className="px-4 py-3 text-right text-red-600">- Rs. {grn.discount.toFixed(2)}</td>
                <td className="px-4 py-3 text-right font-semibold">Rs. {(grn.total - grn.discount).toFixed(2)}</td>
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
              <h3 className="text-lg font-semibold text-gray-900">New GRN</h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">GRN Date *</label>
                  <input
                    type="date"
                    value={formData.grnDate}
                    onChange={(e) => setFormData({ ...formData, grnDate: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Supplier Name *</label>
                  <input
                    type="text"
                    value={formData.supplierName}
                    onChange={(e) => setFormData({ ...formData, supplierName: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Invoice Date</label>
                  <input
                    type="date"
                    value={formData.invoiceDate}
                    onChange={(e) => setFormData({ ...formData, invoiceDate: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Invoice No</label>
                  <input
                    type="text"
                    value={formData.invoiceNo}
                    onChange={(e) => setFormData({ ...formData, invoiceNo: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Payment Method</label>
                  <select
                    value={formData.paymentMethod}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Cash">Cash</option>
                    <option value="Credit">Credit</option>
                    <option value="Cheque">Cheque</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                  </select>
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
                          <th className="px-3 py-2 text-right font-medium text-gray-700">Cost Price</th>
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
                                value={item.costPrice}
                                onChange={(e) => updateItem(item.id, 'costPrice', parseFloat(e.target.value) || 0)}
                                className="w-20 px-2 py-1 text-right border border-gray-300 rounded text-xs"
                                min="0"
                                step="0.01"
                              />
                            </td>
                            <td className="px-3 py-2 text-right font-medium">Rs. {item.total.toFixed(2)}</td>
                            <td className="px-3 py-2">
                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-red-600 hover:text-red-800"
                              >
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
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Discount:</label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.discount}
                        onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0.00"
                      />
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-200">
                      <span className="font-semibold text-gray-900">Net Total:</span>
                      <span className="font-bold text-lg text-blue-600">Rs. {calculateNetTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Remarks & Notes</label>
                <textarea
                  value={formData.remarks}
                  onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
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
                disabled={items.length === 0 || !formData.supplierName}
                className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Save GRN
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
              <button
                onClick={() => setShowItemSearch(false)}
                className="text-gray-400 hover:text-gray-600"
              >
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
                    <div className="text-right">
                      <p className="text-sm font-semibold text-blue-600">Cost: Rs. {item.costPrice}</p>
                      <p className="text-xs text-gray-600">Stock: {item.stock}</p>
                    </div>
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