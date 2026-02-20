import { useState } from 'react';
import { Search, Filter, Eye, Edit, Trash2, AlertCircle } from 'lucide-react';

interface StockItem {
  id: string;
  itemName: string;
  itemCode: string;
  brand: string;
  partNumber: string;
  category: string;
  qty: number;
  reorderLevel: number;
  costPrice: number;
  sellingPrice: number;
  status: 'active' | 'inactive' | 'discontinued';
  supplier: string;
}

interface StockItemsProps {
  items: StockItem[];
  onEdit: (item: StockItem) => void;
  onDelete: (id: string) => void;
}

export function StockItems({ items, onEdit, onDelete }: StockItemsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; item: StockItem } | null>(null);

  const categories = ['oil', 'grease', 'sealant', 'engine parts', 'bearing', 'belt', 'body parts', 'electrical parts', 'battery'];

  const handleContextMenu = (e: React.MouseEvent, item: StockItem) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, item });
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = 
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.itemCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.partNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const lowStockItems = items.filter(item => item.qty <= item.reorderLevel);

  return (
    <div className="p-6" onClick={handleCloseContextMenu}>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Stock Items</h2>
        <p className="text-xs text-gray-600 mt-1">View and manage inventory items</p>
      </div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-red-900">Low Stock Alert</p>
            <p className="text-xs text-red-700 mt-1">
              {lowStockItems.length} item(s) are below reorder level
            </p>
          </div>
        </div>
      )}

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
              placeholder="Search by item name, code, brand or part number..."
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-600" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="discontinued">Discontinued</option>
            </select>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-3 text-left font-medium text-gray-700">Item Code</th>
                <th className="px-3 py-3 text-left font-medium text-gray-700">Item Name</th>
                <th className="px-3 py-3 text-left font-medium text-gray-700">Brand</th>
                <th className="px-3 py-3 text-left font-medium text-gray-700">Part No.</th>
                <th className="px-3 py-3 text-left font-medium text-gray-700">Category</th>
                <th className="px-3 py-3 text-right font-medium text-gray-700">Qty</th>
                <th className="px-3 py-3 text-right font-medium text-gray-700">Cost</th>
                <th className="px-3 py-3 text-right font-medium text-gray-700">Selling Price</th>
                <th className="px-3 py-3 text-center font-medium text-gray-700">Status</th>
                <th className="px-3 py-3 text-center font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-4 py-8 text-center text-gray-500">
                    No items found
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    className={`border-t border-gray-200 hover:bg-gray-50 cursor-pointer ${
                      item.qty <= item.reorderLevel ? 'bg-red-50' : ''
                    }`}
                    onContextMenu={(e) => handleContextMenu(e, item)}
                  >
                    <td className="px-3 py-3 font-medium text-blue-600">{item.itemCode}</td>
                    <td className="px-3 py-3">{item.itemName}</td>
                    <td className="px-3 py-3">{item.brand}</td>
                    <td className="px-3 py-3 text-gray-600">{item.partNumber}</td>
                    <td className="px-3 py-3">
                      <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-right">
                      <span className={item.qty <= item.reorderLevel ? 'text-red-600 font-semibold' : ''}>
                        {item.qty}
                        {item.qty <= item.reorderLevel && (
                          <AlertCircle className="w-3 h-3 inline ml-1" />
                        )}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-right">Rs. {item.costPrice.toFixed(2)}</td>
                    <td className="px-3 py-3 text-right font-semibold">Rs. {item.sellingPrice.toFixed(2)}</td>
                    <td className="px-3 py-3 text-center">
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        item.status === 'active' ? 'bg-green-100 text-green-700' :
                        item.status === 'inactive' ? 'bg-gray-100 text-gray-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex justify-center gap-2">
                        <button
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onEdit(item)}
                          className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDelete(item.id)}
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
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <div
          className="fixed bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-[60]"
          style={{ left: contextMenu.x, top: contextMenu.y }}
        >
          <button
            onClick={() => {
              console.log('View', contextMenu.item);
              handleCloseContextMenu();
            }}
            className="w-full px-4 py-2 text-left text-xs hover:bg-gray-100 flex items-center gap-2"
          >
            <Eye className="w-3 h-3" />
            View Details
          </button>
          <button
            onClick={() => {
              onEdit(contextMenu.item);
              handleCloseContextMenu();
            }}
            className="w-full px-4 py-2 text-left text-xs hover:bg-gray-100 flex items-center gap-2"
          >
            <Edit className="w-3 h-3" />
            Edit Item
          </button>
          <div className="border-t border-gray-200 my-1"></div>
          <button
            onClick={() => {
              onDelete(contextMenu.item.id);
              handleCloseContextMenu();
            }}
            className="w-full px-4 py-2 text-left text-xs hover:bg-red-50 text-red-600 flex items-center gap-2"
          >
            <Trash2 className="w-3 h-3" />
            Delete Item
          </button>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mt-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-xs text-blue-700 mb-1">Total Items</p>
          <p className="text-2xl font-bold text-blue-900">{items.length}</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-xs text-green-700 mb-1">Active Items</p>
          <p className="text-2xl font-bold text-green-900">
            {items.filter(i => i.status === 'active').length}
          </p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-xs text-red-700 mb-1">Low Stock</p>
          <p className="text-2xl font-bold text-red-900">{lowStockItems.length}</p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <p className="text-xs text-purple-700 mb-1">Total Stock Value</p>
          <p className="text-xl font-bold text-purple-900">
            Rs. {items.reduce((sum, item) => sum + (item.qty * item.costPrice), 0).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}