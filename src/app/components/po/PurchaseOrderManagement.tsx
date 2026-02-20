import { useState } from 'react';
import { Plus, Search, X, Trash2 } from 'lucide-react';

interface POItem {
  id: string;
  itemName: string;
  itemCode: string;
  qty: number;
  unitPrice: number;
  total: number;
}

interface PurchaseOrder {
  id: string;
  poDate: string;
  supplierName: string;
  deliveryDate: string;
  items: POItem[];
  total: number;
  status: 'pending' | 'partial' | 'completed' | 'cancelled';
  remarks: string;
}

export function PurchaseOrderManagement() {
  const [orders, setOrders] = useState<PurchaseOrder[]>([
    {
      id: 'PO-001',
      poDate: '2026-02-10',
      supplierName: 'ABC Auto Parts Ltd',
      deliveryDate: '2026-02-20',
      items: [
        { id: '1', itemName: 'Engine Oil 10W-40', itemCode: 'EO-001', qty: 100, unitPrice: 1200, total: 120000 },
      ],
      total: 120000,
      status: 'pending',
      remarks: 'Urgent order for month-end stock',
    },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showItemSearch, setShowItemSearch] = useState(false);
  const [itemSearchQuery, setItemSearchQuery] = useState('');
  const [items, setItems] = useState<POItem[]>([]);
  const [formData, setFormData] = useState({
    poDate: new Date().toISOString().split('T')[0],
    supplierName: '',
    deliveryDate: '',
    remarks: '',
  });

  // Mock items
  const mockItems = [
    { id: '1', name: 'Engine Oil 10W-40', code: 'EO-001', unitPrice: 1200 },
    { id: '2', name: 'Brake Pad Set', code: 'BP-102', unitPrice: 2000 },
    { id: '3', name: 'Chain Sprocket Kit', code: 'CS-203', unitPrice: 2800 },
    { id: '4', name: 'Air Filter', code: 'AF-304', unitPrice: 600 },
    { id: '5', name: 'Spark Plug', code: 'SP-405', unitPrice: 350 },
  ];

  const addItem = (item: typeof mockItems[0]) => {
    const newItem: POItem = {
      id: Date.now().toString(),
      itemName: item.name,
      itemCode: item.code,
      qty: 1,
      unitPrice: item.unitPrice,
      total: item.unitPrice,
    };
    setItems([...items, newItem]);
    setShowItemSearch(false);
    setItemSearchQuery('');
  };

  const updateItem = (id: string, field: keyof POItem, value: number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        updated.total = updated.qty * updated.unitPrice;
        return updated;
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const calculateTotal = () => items.reduce((sum, item) => sum + item.total, 0);

  const handleSave = () => {
    const newPO: PurchaseOrder = {
      id: 'PO-' + (orders.length + 1).toString().padStart(3, '0'),
      poDate: formData.poDate,
      supplierName: formData.supplierName,
      deliveryDate: formData.deliveryDate,
      items: items,
      total: calculateTotal(),
      status: 'pending',
      remarks: formData.remarks,
    };
    setOrders([...orders, newPO]);
    setShowAddForm(false);
    setItems([]);
    setFormData({
      poDate: new Date().toISOString().split('T')[0],
      supplierName: '',
      deliveryDate: '',
      remarks: '',
    });
  };

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.supplierName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredItems = mockItems.filter(item =>
    item.name.toLowerCase().includes(itemSearchQuery.toLowerCase()) ||
    item.code.toLowerCase().includes(itemSearchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-700',
      partial: 'bg-blue-100 text-blue-700',
      completed: 'bg-green-100 text-green-700',
      cancelled: 'bg-red-100 text-red-700',
    };
    return <span className={`px-2 py-0.5 rounded text-xs font-medium ${styles[status as keyof typeof styles]}`}>{status.toUpperCase()}</span>;
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Purchase Orders</h2>
          <p className="text-xs text-gray-600 mt-1">Manage purchase orders to suppliers</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Purchase Order
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
            placeholder="Search PO..."
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-xs">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-700">PO ID</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">PO Date</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Supplier</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Delivery Date</th>
              <th className="px-4 py-3 text-right font-medium text-gray-700">Total Amount</th>
              <th className="px-4 py-3 text-center font-medium text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-blue-600">{order.id}</td>
                <td className="px-4 py-3">{new Date(order.poDate).toLocaleDateString()}</td>
                <td className="px-4 py-3">{order.supplierName}</td>
                <td className="px-4 py-3">{new Date(order.deliveryDate).toLocaleDateString()}</td>
                <td className="px-4 py-3 text-right font-semibold">Rs. {order.total.toFixed(2)}</td>
                <td className="px-4 py-3 text-center">{getStatusBadge(order.status)}</td>
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
              <h3 className="text-lg font-semibold text-gray-900">New Purchase Order</h3>
              <button onClick={() => setShowAddForm(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">PO Date *</label>
                  <input
                    type="date"
                    value={formData.poDate}
                    onChange={(e) => setFormData({ ...formData, poDate: e.target.value })}
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
                  <label className="block text-xs font-medium text-gray-700 mb-1">Expected Delivery Date</label>
                  <input
                    type="date"
                    value={formData.deliveryDate}
                    onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
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

              {/* Total */}
              {items.length > 0 && (
                <div className="flex justify-end mb-6">
                  <div className="w-64 border-t border-gray-200 pt-2">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-900">Total Amount:</span>
                      <span className="font-bold text-lg text-blue-600">Rs. {calculateTotal().toFixed(2)}</span>
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
                Create Purchase Order
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
                    <p className="text-sm font-semibold text-blue-600">Rs. {item.unitPrice}</p>
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