import { useState, useRef, useEffect  } from 'react';
import { Plus, Search, X, Trash2 } from 'lucide-react';
import { PurchaseOrderFormModal } from './PurchaseOrderFormModal';
import { FiMoreVertical } from 'react-icons/fi';
import { ItemTableCommon } from '../common_use_components/ItemTableCommon';

interface POItem {
  id: string;
  itemName: string;
  itemCode: string;
  qty: number;
  unitPrice: number;
  total: number;
}

interface Product {
  id: string;
  name: string;
  code: string;
  supplierItemCode: string;
  costPrice: number;
  sellingPrice: number;
}

const handleSelectProduct = (product: Product) => {
  const newItem: POItem = {
    id: Date.now().toString(),
    itemName: product.name,
    itemCode: product.code,
    qty: 1,
    unitPrice: product.costPrice,
    total: product.costPrice,
  };

  setItems(prev => [...prev, newItem]);
};

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
    poDate: '2026-02-01',
    supplierName: 'ABC Auto Parts Ltd',
    deliveryDate: '2026-02-05',
    items: [
      { id: '1', itemName: 'Engine Oil 10W-40', itemCode: 'EO-001', qty: 50, unitPrice: 1200, total: 60000 },
    ],
    total: 60000,
    status: 'pending',
    remarks: 'Weekly stock refill',
  },
  {
    id: 'PO-002',
    poDate: '2026-02-02',
    supplierName: 'Speed Motors Supply',
    deliveryDate: '2026-02-07',
    items: [
      { id: '1', itemName: 'Oil Filter', itemCode: 'OF-002', qty: 100, unitPrice: 350, total: 35000 },
    ],
    total: 35000,
    status: 'pending',
    remarks: 'Fast moving item',
  },
  {
    id: 'PO-003',
    poDate: '2026-02-03',
    supplierName: 'Global Auto Components',
    deliveryDate: '2026-02-08',
    items: [
      { id: '1', itemName: 'Air Filter', itemCode: 'AF-003', qty: 80, unitPrice: 500, total: 40000 },
    ],
    total: 40000,
    status: 'approved',
    remarks: 'Monthly requirement',
  },
  {
    id: 'PO-004',
    poDate: '2026-02-04',
    supplierName: 'Prime Parts Co',
    deliveryDate: '2026-02-09',
    items: [
      { id: '1', itemName: 'Brake Pads', itemCode: 'BP-004', qty: 60, unitPrice: 1500, total: 90000 },
    ],
    total: 90000,
    status: 'pending',
    remarks: 'Brake service stock',
  },
  {
    id: 'PO-005',
    poDate: '2026-02-05',
    supplierName: 'AutoPro Distributors',
    deliveryDate: '2026-02-10',
    items: [
      { id: '1', itemName: 'Coolant 5L', itemCode: 'CL-005', qty: 40, unitPrice: 1800, total: 72000 },
    ],
    total: 72000,
    status: 'pending',
    remarks: 'Coolant restock',
  },
  {
    id: 'PO-006',
    poDate: '2026-02-06',
    supplierName: 'Mega Auto Supplies',
    deliveryDate: '2026-02-11',
    items: [
      { id: '1', itemName: 'Spark Plug', itemCode: 'SP-006', qty: 200, unitPrice: 250, total: 50000 },
    ],
    total: 50000,
    status: 'approved',
    remarks: 'High demand item',
  },
  {
    id: 'PO-007',
    poDate: '2026-02-07',
    supplierName: 'Elite Auto Traders',
    deliveryDate: '2026-02-12',
    items: [
      { id: '1', itemName: 'Battery 12V', itemCode: 'BT-007', qty: 30, unitPrice: 8500, total: 255000 },
    ],
    total: 255000,
    status: 'pending',
    remarks: 'Battery stock',
  },
  {
    id: 'PO-008',
    poDate: '2026-02-08',
    supplierName: 'Rapid Parts Center',
    deliveryDate: '2026-02-13',
    items: [
      { id: '1', itemName: 'Transmission Oil', itemCode: 'TO-008', qty: 45, unitPrice: 2200, total: 99000 },
    ],
    total: 99000,
    status: 'pending',
    remarks: 'Transmission service stock',
  },
  {
    id: 'PO-009',
    poDate: '2026-02-09',
    supplierName: 'Superior Auto Parts',
    deliveryDate: '2026-02-14',
    items: [
      { id: '1', itemName: 'Clutch Plate', itemCode: 'CP-009', qty: 25, unitPrice: 4500, total: 112500 },
    ],
    total: 112500,
    status: 'cancelled',
    remarks: 'Clutch replacement stock',
  },
  {
    id: 'PO-010',
    poDate: '2026-02-10',
    supplierName: 'NextGen Auto Supply',
    deliveryDate: '2026-02-15',
    items: [
      { id: '1', itemName: 'Brake Fluid', itemCode: 'BF-010', qty: 70, unitPrice: 900, total: 63000 },
    ],
    total: 63000,
    status: 'partial',
    remarks: 'Brake fluid refill',
  },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showItemSearch, setShowItemSearch] = useState(false);
  const [itemSearchQuery, setItemSearchQuery] = useState('');
  const [items, setItems] = useState<POItem[]>([]);
  const menuRef = useRef<HTMLTableCellElement | null>(null);
  const [formData, setFormData] = useState({
    poDate: new Date().toISOString().split('T')[0],
    supplierName: '',
    deliveryDate: '',
    remarks: '',
  });

  const [dateFrom, setDateFrom] = useState('');
const [dateTo, setDateTo] = useState('');
const [selectedSupplier, setSelectedSupplier] = useState('');
const [selectedStatus, setSelectedStatus] = useState('');
const suppliers = [...new Set(orders.map(order => order.supplierName))];

  useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuOpen(null);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);

  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);

    const [menuOpen, setMenuOpen] = useState<string | null>(null); // Track which row's menu is open

  const toggleMenu = (id: string) => {
    setMenuOpen(menuOpen === id ? null : id);
  };

  const handleMenuClick = (action: 'view' | 'edit', orderId: string) => {
    console.log(`${action} clicked for ${orderId}`);
    setMenuOpen(null); // Close the menu
  };

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

const filteredOrders = orders.filter(order => {

  const matchesSearch =
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.supplierName.toLowerCase().includes(searchQuery.toLowerCase());

  const orderDate = new Date(order.poDate);

  const matchesDateFrom =
    !dateFrom || orderDate >= new Date(dateFrom);

  const matchesDateTo =
    !dateTo || orderDate <= new Date(dateTo);

  const matchesSupplier =
    !selectedSupplier || order.supplierName === selectedSupplier;

  const matchesStatus =
    !selectedStatus || order.status === selectedStatus;

  return (
    matchesSearch &&
    matchesDateFrom &&
    matchesDateTo &&
    matchesSupplier &&
    matchesStatus
  );
});
  const filteredItems = mockItems.filter(item =>
    item.name.toLowerCase().includes(itemSearchQuery.toLowerCase()) ||
    item.code.toLowerCase().includes(itemSearchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-700',
      partial: 'bg-blue-100 text-blue-700',
      approved: 'bg-green-100 text-green-700',
      cancelled: 'bg-red-100 text-red-700',
    };
    return <span className={`px-2 py-0.5 rounded text-xs font-medium ${styles[status as keyof typeof styles]}`}>{status.toUpperCase()}</span>;
  };

  const handleSelectProduct = (product: Product) => {
  setItems(prev => {
    const exists = prev.find(i => i.itemCode === product.code);

    if (exists) {
      return prev.map(i =>
        i.itemCode === product.code
          ? { ...i, qty: i.qty + 1, total: (i.qty + 1) * i.unitPrice }
          : i
      );
    }

    return [
      ...prev,
      {
        id: Date.now().toString(),
        itemName: product.name,
        itemCode: product.code,
        qty: 1,
        unitPrice: product.costPrice,
        total: product.costPrice,
      },
    ];
  });
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

      {/* Filter Options */}
<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
  <div className="flex flex-wrap gap-3 items-center">

    {/* Search */}
    <div className="relative flex-1 min-w-[200px]">
      <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search PO or Supplier..."
      />
    </div>

    {/* Date From */}
    <div>
      <input
        type="date"
        value={dateFrom}
        onChange={(e) => setDateFrom(e.target.value)}
        className="px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* Date To */}
    <div>
      <input
        type="date"
        value={dateTo}
        onChange={(e) => setDateTo(e.target.value)}
        className="px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* Supplier Dropdown */}
    <div>
      <select
        value={selectedSupplier}
        onChange={(e) => setSelectedSupplier(e.target.value)}
        className="px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Suppliers</option>
        {suppliers.map((supplier) => (
          <option key={supplier} value={supplier}>
            {supplier}
          </option>
        ))}
      </select>
    </div>

    {/* Status Dropdown */}
    <div>
      <select
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
        className="px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="partial">Partial</option>
        <option value="cancelled">Cancelled</option>
      </select>
    </div>

  </div>
</div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 ">
        <table className="w-full text-xs">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-700">PO ID</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">PO Date</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Supplier</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Delivery Date</th>
              <th className="px-4 py-3 text-right font-medium text-gray-700">Total Amount</th>
              <th className="px-4 py-3 text-center font-medium text-gray-700">Status</th>
              <th className="px-4 py-3 text-center font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-1 font-medium text-blue-600">{order.id}</td>
                <td className="px-4 py-1">{new Date(order.poDate).toLocaleDateString()}</td>
                <td className="px-4 py-1">{order.supplierName}</td>
                <td className="px-4 py-1">{new Date(order.deliveryDate).toLocaleDateString()}</td>
                <td className="px-4 py-1 text-right font-semibold">Rs. {order.total.toFixed(2)}</td>
                <td className="px-4 py-1 text-center">{getStatusBadge(order.status)}</td>
                <td
                  ref={menuOpen === order.id ? menuRef : null}
                  className="px-4 py-1 text-center relative"
                >
                  <button
                    onClick={() => toggleMenu(order.id)}
                    className="p-1 rounded hover:bg-gray-100"
                  >
                    <FiMoreVertical className="w-5 h-5 text-gray-600" />
                  </button>

                  {menuOpen === order.id && (
                    <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded shadow-lg z-10">
                      <button
                        onClick={() => handleMenuClick('view', order.id)}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleMenuClick('edit', order.id)}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Form Modal */}
      {showAddForm && (
        <PurchaseOrderFormModal
          formData={formData}
          setFormData={setFormData}
          items={items}
          updateItem={updateItem}
          removeItem={removeItem}
          calculateTotal={calculateTotal}
          handleSave={handleSave}
          setShowAddForm={setShowAddForm}
          setShowItemSearch={setShowItemSearch}
        />
      )}
<ItemTableCommon
  show={showItemSearch}
  onClose={() => setShowItemSearch(false)}
  onSelect={handleSelectProduct}
/>

    </div>
  );
}