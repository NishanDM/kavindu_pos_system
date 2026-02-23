import { useState } from 'react';
import { Plus, Search, X, Trash2, Send } from 'lucide-react';
import NewQuotation from './NewQuotation';
import { ItemTableCommon } from '../common_use_components/ItemTableCommon';  

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
    status: 'pending',
    remarks: 'Special discount for bulk order',
  },
  {
    id: 'QUO-002',
    quotationDate: '2026-02-11',
    customerName: 'Speed Motors',
    customerPhone: '+94771230001',
    validUntil: '2026-02-25',
    items: [
      { id: '1', itemName: 'Brake Pads Front', itemCode: 'BP-101', qty: 10, unitPrice: 3500, discount: 1000, total: 34000 },
    ],
    subTotal: 35000,
    discount: 1000,
    total: 34000,
    status: 'sent',
    remarks: 'Front brake pads quotation',
  },
  {
    id: 'QUO-003',
    quotationDate: '2026-02-12',
    customerName: 'City Car Care',
    customerPhone: '+94771230002',
    validUntil: '2026-02-26',
    items: [
      { id: '1', itemName: 'Air Filter', itemCode: 'AF-202', qty: 25, unitPrice: 1200, discount: 1500, total: 28500 },
    ],
    subTotal: 30000,
    discount: 1500,
    total: 28500,
    status: 'pending',
    remarks: 'Regular customer discount',
  },
  {
    id: 'QUO-004',
    quotationDate: '2026-02-13',
    customerName: 'Highway Auto',
    customerPhone: '+94771230003',
    validUntil: '2026-02-27',
    items: [
      { id: '1', itemName: 'Spark Plug', itemCode: 'SP-303', qty: 50, unitPrice: 600, discount: 2000, total: 28000 },
    ],
    subTotal: 30000,
    discount: 2000,
    total: 28000,
    status: 'sent',
    remarks: 'Bulk spark plug order',
  },
  {
    id: 'QUO-005',
    quotationDate: '2026-02-14',
    customerName: 'Prime Auto Zone',
    customerPhone: '+94771230004',
    validUntil: '2026-02-28',
    items: [
      { id: '1', itemName: 'Oil Filter', itemCode: 'OF-404', qty: 40, unitPrice: 800, discount: 2000, total: 30000 },
    ],
    subTotal: 32000,
    discount: 2000,
    total: 30000,
    status: 'accepted',
    remarks: 'Oil filter bulk price applied',
  },
  {
    id: 'QUO-006',
    quotationDate: '2026-02-15',
    customerName: 'Super Car Hub',
    customerPhone: '+94771230005',
    validUntil: '2026-03-01',
    items: [
      { id: '1', itemName: 'Clutch Plate', itemCode: 'CP-505', qty: 8, unitPrice: 5000, discount: 3000, total: 37000 },
    ],
    subTotal: 40000,
    discount: 3000,
    total: 37000,
    status: 'sent',
    remarks: 'Clutch replacement order',
  },
  {
    id: 'QUO-007',
    quotationDate: '2026-02-16',
    customerName: 'Auto World',
    customerPhone: '+94771230006',
    validUntil: '2026-03-02',
    items: [
      { id: '1', itemName: 'Radiator Coolant', itemCode: 'RC-606', qty: 30, unitPrice: 900, discount: 2000, total: 25000 },
    ],
    subTotal: 27000,
    discount: 2000,
    total: 25000,
    status: 'rejected',
    remarks: 'Coolant seasonal offer',
  },
  {
    id: 'QUO-008',
    quotationDate: '2026-02-17',
    customerName: 'Golden Motors',
    customerPhone: '+94771230007',
    validUntil: '2026-03-03',
    items: [
      { id: '1', itemName: 'Timing Belt', itemCode: 'TB-707', qty: 12, unitPrice: 4000, discount: 3000, total: 45000 },
    ],
    subTotal: 48000,
    discount: 3000,
    total: 45000,
    status: 'accepted',
    remarks: 'Timing belt replacement package',
  },
  {
    id: 'QUO-009',
    quotationDate: '2026-02-18',
    customerName: 'Rapid Auto Parts',
    customerPhone: '+94771230008',
    validUntil: '2026-03-04',
    items: [
      { id: '1', itemName: 'Fuel Pump', itemCode: 'FP-808', qty: 6, unitPrice: 7000, discount: 2000, total: 40000 },
    ],
    subTotal: 42000,
    discount: 2000,
    total: 40000,
    status: 'expired',
    remarks: 'Fuel pump urgent order',
  },
  {
    id: 'QUO-010',
    quotationDate: '2026-02-19',
    customerName: 'NextGen Auto',
    customerPhone: '+94771230009',
    validUntil: '2026-03-05',
    items: [
      { id: '1', itemName: 'Battery 12V', itemCode: 'BT-909', qty: 15, unitPrice: 5500, discount: 5000, total: 77500 },
    ],
    subTotal: 82500,
    discount: 5000,
    total: 77500,
    status: 'sent',
    remarks: 'Battery bulk discount applied',
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

  const [selectedCustomer, setSelectedCustomer] = useState('');
const [selectedStatus, setSelectedStatus] = useState('');
const [fromDate, setFromDate] = useState('');
const [toDate, setToDate] = useState('');
const customerList = Array.from(
  new Set(quotations.map(q => q.customerName))
);

const handleSelectProduct = (product: any) => {
  setItems(prev => {
    const exists = prev.find(i => i.itemCode === product.code);

    if (exists) {
      return prev.map(i =>
        i.itemCode === product.code
          ? { ...i, qty: i.qty + 1, total: (i.qty + 1) * i.unitPrice - i.discount }
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
        unitPrice: product.sellingPrice,
        discount: 0,
        total: product.sellingPrice,
      },
    ];
  });
};
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

const filteredQuotations = quotations.filter((quotation) => {

  const matchesSearch =
    quotation.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    quotation.customerName.toLowerCase().includes(searchQuery.toLowerCase());

  const matchesCustomer =
    selectedCustomer === '' || quotation.customerName === selectedCustomer;

  const matchesStatus =
    selectedStatus === '' || quotation.status === selectedStatus;

  const quotationDate = new Date(quotation.quotationDate);

  const matchesFromDate =
    fromDate === '' || quotationDate >= new Date(fromDate);

  const matchesToDate =
    toDate === '' || quotationDate <= new Date(toDate);

  return (
    matchesSearch &&
    matchesCustomer &&
    matchesStatus &&
    matchesFromDate &&
    matchesToDate
  );
});
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
  <div className="flex flex-wrap gap-3 items-center">

    {/* Search */}
    <div className="relative flex-1 min-w-[200px]">
      <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search quotations..."
      />
    </div>

    {/* Customer Dropdown */}
    <select
      value={selectedCustomer}
      onChange={(e) => setSelectedCustomer(e.target.value)}
      className="px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
    >
      <option value="">All Customers</option>
      {customerList.map((customer) => (
        <option key={customer} value={customer}>
          {customer}
        </option>
      ))}
    </select>

    {/* From Date */}
    <input
      type="date"
      value={fromDate}
      onChange={(e) => setFromDate(e.target.value)}
      className="px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
    />

    {/* To Date */}
    <input
      type="date"
      value={toDate}
      onChange={(e) => setToDate(e.target.value)}
      className="px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
    />

    {/* Status Dropdown */}
    <select
      value={selectedStatus}
      onChange={(e) => setSelectedStatus(e.target.value)}
      className="px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
    >
      <option value="">All Status</option>
      <option value="pending">Pending</option>
      <option value="sent">Sent</option>
      <option value="accepted">Accepted</option>
      <option value="rejected">Rejected</option>
      <option value="expired">Expired</option>
    </select>
<button
  onClick={() => {
    setSearchQuery('');
    setSelectedCustomer('');
    setSelectedStatus('');
    setFromDate('');
    setToDate('');
  }}
  className="px-3 py-2 text-sm bg-gray-100 rounded hover:bg-gray-200"
>
  Clear
</button>
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
                <td className="px-4 py-1 font-medium text-blue-600">{quotation.id}</td>
                <td className="px-4 py-1">{new Date(quotation.quotationDate).toLocaleDateString()}</td>
                <td className="px-4 py-1">{quotation.customerName}</td>
                <td className="px-4 py-1">{quotation.customerPhone}</td>
                <td className="px-4 py-1">{new Date(quotation.validUntil).toLocaleDateString()}</td>
                <td className="px-4 py-1 text-right font-semibold">Rs. {quotation.total.toFixed(2)}</td>
                <td className="px-4 py-1 text-center">{getStatusBadge(quotation.status)}</td>
                <td className="px-4 py-1 text-center">
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
<NewQuotation
  show={showAddForm}
  onClose={() => setShowAddForm(false)}
  formData={formData}
  setFormData={setFormData}
  items={items}
  setShowItemSearch={setShowItemSearch}
  updateItem={updateItem}
  removeItem={removeItem}
  calculateSubTotal={calculateSubTotal}
  calculateTotalDiscount={calculateTotalDiscount}
  calculateTotal={calculateTotal}
  handleSave={handleSave}
/>

<ItemTableCommon
  show={showItemSearch}
  onClose={() => setShowItemSearch(false)}
  onSelect={handleSelectProduct}
/>
    </div>
  );
}