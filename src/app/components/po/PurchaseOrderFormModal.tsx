// PurchaseOrderFormModal.tsx
import { Plus, X, Trash2 } from 'lucide-react';
import React from 'react';

interface POItem {
  id: string;
  itemName: string;
  itemCode: string;
  qty: number;
  unitPrice: number;
  total: number;
}

interface FormData {
  poDate: string;
  supplierName: string;
  deliveryDate: string;
  remarks: string;
}

interface PurchaseOrderFormModalProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  items: POItem[];
  updateItem: (id: string, field: keyof POItem, value: number) => void;
  removeItem: (id: string) => void;
  calculateTotal: () => number;
  handleSave: () => void;
  setShowAddForm: (val: boolean) => void;
  setShowItemSearch: (val: boolean) => void;
}

export function PurchaseOrderFormModal({
  formData,
  setFormData,
  items,
  updateItem,
  removeItem,
  calculateTotal,
  handleSave,
  setShowAddForm,
  setShowItemSearch,
}: PurchaseOrderFormModalProps) {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-start justify-center z-[100] overflow-y-auto pt-20 pb-10">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl ml-[160px] flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-white">
          <h3 className="text-lg font-semibold text-gray-900">New Purchase Order</h3>
          <button onClick={() => setShowAddForm(false)} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          <div className="grid grid-cols-5 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">PO ID *</label>
              <input
                type="text"
                
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
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
          <div>
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
                      <th className="px-3 py-2 text-left font-medium text-gray-700">Qty</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-700">Unit Price</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-700">Total</th>
                      <th className="px-3 py-2 text-center font-medium text-gray-700">Action</th>
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
                            step="1"
                          />
                        </td>
                        <td className="px-3 py-2 text-left font-medium">Rs. {item.total.toFixed(2)}</td>
                        <td className="px-3 py-2 text-center">
                          <button onClick={() => removeItem(item.id)} className="text-center text-red-600 hover:text-red-800">
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
            <div className="flex justify-end">
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

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-end gap-3 bg-white">
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
  );
}