import { useState } from 'react';
import { Save, X } from 'lucide-react';

interface AddItemProps {
  onSave: (item: any) => void;
  onCancel?: () => void;
}

export function AddItem({ onSave, onCancel }: AddItemProps) {
  const [formData, setFormData] = useState({
    itemName: '',
    itemDescription: '',
    brand: '',
    myItemCode: '',
    supplierItemCode: '',
    partNumber: '',
    serialNumber: '',
    itemType: 'Unit',
    costPrice: '',
    sellingPrice: '',
    warranty: '',
    purchasedDate: '',
    supplier: '',
    poNumber: '',
    grnDate: '',
    qty: '',
    discount: '',
    category: '',
    subCategory: '',
    model: '',
    barcode: '',
    qrCode: '',
    compatibility: '',
    reorderLevel: '',
    status: 'active',
    imageUrl: '',
    color: '',
  });

  const categories = ['oil', 'grease', 'sealant', 'engine parts', 'bearing', 'belt', 'body parts', 'electrical parts', 'battery'];
  const itemTypes = ['Unit', 'Set', 'Pcs', 'Kilo', 'Gram', 'Liter'];
  const statusOptions = ['active', 'inactive', 'discontinued'];

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const item = {
      id: 'ITEM-' + Date.now(),
      itemName: formData.itemName,
      itemCode: formData.myItemCode,
      brand: formData.brand,
      partNumber: formData.partNumber,
      category: formData.category,
      qty: parseInt(formData.qty) || 0,
      reorderLevel: parseInt(formData.reorderLevel) || 0,
      costPrice: parseFloat(formData.costPrice) || 0,
      sellingPrice: parseFloat(formData.sellingPrice) || 0,
      status: formData.status as 'active' | 'inactive' | 'discontinued',
      supplier: formData.supplier,
      ...formData,
    };
    onSave(item);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Add New Item</h2>
        <p className="text-xs text-gray-600 mt-1">Add a new item to inventory</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
       {/* Categories */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Categories</h3>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Sub Category</label>
              <input
                type="text"
                value={formData.subCategory}
                onChange={(e) => handleChange('subCategory', e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Model</label>
              <input
                type="text"
                value={formData.model}
                onChange={(e) => handleChange('model', e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
              <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Country/Origin/Region</label>
              <input
                type="text"
                value={formData.model}
                onChange={(e) => handleChange('model', e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        {/* Basic Information */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Basic Information</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Item Name *</label>
              <input
                type="text"
                value={formData.itemName}
                onChange={(e) => handleChange('itemName', e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Brand</label>
              <input
                type="text"
                value={formData.brand}
                onChange={(e) => handleChange('brand', e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">My Item Code *</label>
              <input
                type="text"
                value={formData.myItemCode}
                onChange={(e) => handleChange('myItemCode', e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
                    <div className="grid grid-cols-3 gap-4 pt-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Supplier Item Code</label>
              <input
                type="text"
                value={formData.supplierItemCode}
                onChange={(e) => handleChange('supplierItemCode', e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Part Number</label>
              <input
                type="text"
                value={formData.partNumber}
                onChange={(e) => handleChange('partNumber', e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Serial Number</label>
              <input
                type="text"
                value={formData.serialNumber}
                onChange={(e) => handleChange('serialNumber', e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-3">
              <label className="block text-xs font-medium text-gray-700 mb-1">Item Description</label>
              <textarea
                value={formData.itemDescription}
                onChange={(e) => handleChange('itemDescription', e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={2}
              />
            </div>
          </div>
        </div>

        {/* Product Codes */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Product Codes</h3>

        </div>

        {/* Pricing & Inventory */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Pricing & Inventory</h3>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Item Type</label>
              <select
                value={formData.itemType}
                onChange={(e) => handleChange('itemType', e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {itemTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Cost Price *</label>
              <input
                type="number"
                step="0.01"
                value={formData.costPrice}
                onChange={(e) => handleChange('costPrice', e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Selling Price *</label>
              <input
                type="number"
                step="0.01"
                value={formData.sellingPrice}
                onChange={(e) => handleChange('sellingPrice', e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Discount (%)</label>
              <input
                type="number"
                step="0.01"
                value={formData.discount}
                onChange={(e) => handleChange('discount', e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 mt-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Quantity *</label>
              <input
                type="number"
                value={formData.qty}
                onChange={(e) => handleChange('qty', e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Reorder Level</label>
              <input
                type="number"
                value={formData.reorderLevel}
                onChange={(e) => handleChange('reorderLevel', e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Warranty (months)</label>
              <input
                type="text"
                value={formData.warranty}
                onChange={(e) => handleChange('warranty', e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Color</label>
              <input
                type="text"
                value={formData.color}
                onChange={(e) => handleChange('color', e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>



        {/* Supplier Information */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Supplier Information</h3>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Supplier</label>
              <input
                type="text"
                value={formData.supplier}
                onChange={(e) => handleChange('supplier', e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">PO Number</label>
              <input
                type="text"
                value={formData.poNumber}
                onChange={(e) => handleChange('poNumber', e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">GRN Date</label>
              <input
                type="date"
                value={formData.grnDate}
                onChange={(e) => handleChange('grnDate', e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Purchased Date</label>
              <input
                type="date"
                value={formData.purchasedDate}
                onChange={(e) => handleChange('purchasedDate', e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Additional Information</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Barcode</label>
              <input
                type="text"
                value={formData.barcode}
                onChange={(e) => handleChange('barcode', e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">QR Code</label>
              <input
                type="text"
                value={formData.qrCode}
                onChange={(e) => handleChange('qrCode', e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Compatibility</label>
              <input
                type="text"
                value={formData.compatibility}
                onChange={(e) => handleChange('compatibility', e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Honda CB150, Yamaha FZ"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Item Image</label>
              <input
                type="file"
                value={formData.imageUrl}
                onChange={(e) => handleChange('imageUrl', e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Item
          </button>
        </div>
      </form>
    </div>
  );
}
