
import { useState, useRef, useEffect } from 'react';
import {  Search  } from 'lucide-react';
import { FiMoreVertical } from 'react-icons/fi';

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
  status: 'SETTLED' | 'PENDING' | 'PARTIALLY PAID' | 'OVER PAID';
}

export function GRNSettlement() {
  const [grns, setGrns] = useState<GRN[]>([
     {
    id: 'GRN-001',
    grnDate: '2026-02-01',
    supplierName: 'ABC Auto Parts Ltd',
    invoiceDate: '2026-01-31',
    invoiceNo: 'INV-001',
    paymentMethod: 'Cash',
    items: [
      { id: '1', itemName: 'Engine Oil 10W-40', itemCode: 'EO-001', qty: 40, costPrice: 1200, total: 48000 },
    ],
    total: 48000,
    discount: 0,
    remarks: 'Fully paid order',
    status: 'SETTLED',
  },
  {
    id: 'GRN-002',
    grnDate: '2026-02-02',
    supplierName: 'XYZ Traders',
    invoiceDate: '2026-02-01',
    invoiceNo: 'INV-002',
    paymentMethod: 'Credit',
    items: [
      { id: '1', itemName: 'Brake Pad Set', itemCode: 'BP-102', qty: 25, costPrice: 2000, total: 50000 },
    ],
    total: 50000,
    discount: 2000,
    remarks: 'Waiting for payment',
    status: 'PENDING',
  },
  {
    id: 'GRN-003',
    grnDate: '2026-02-03',
    supplierName: 'LMN Distributors',
    invoiceDate: '2026-02-02',
    invoiceNo: 'INV-003',
    paymentMethod: 'Credit',
    items: [
      { id: '1', itemName: 'Air Filter', itemCode: 'AF-304', qty: 60, costPrice: 600, total: 36000 },
    ],
    total: 36000,
    discount: 1000,
    remarks: 'Half payment completed',
    status: 'PARTIALLY PAID',
  },
  {
    id: 'GRN-004',
    grnDate: '2026-02-04',
    supplierName: 'Speed Motor Supplies',
    invoiceDate: '2026-02-03',
    invoiceNo: 'INV-004',
    paymentMethod: 'Cash',
    items: [
      { id: '1', itemName: 'Spark Plug', itemCode: 'SP-405', qty: 100, costPrice: 350, total: 35000 },
    ],
    total: 35000,
    discount: 0,
    remarks: 'Extra amount paid mistakenly',
    status: 'OVER PAID',
  },
  {
    id: 'GRN-005',
    grnDate: '2026-02-05',
    supplierName: 'AutoZone Lanka',
    invoiceDate: '2026-02-04',
    invoiceNo: 'INV-005',
    paymentMethod: 'Credit',
    items: [
      { id: '1', itemName: 'Chain Sprocket Kit', itemCode: 'CS-203', qty: 15, costPrice: 2800, total: 42000 },
    ],
    total: 42000,
    discount: 2000,
    remarks: '',
    status: 'PENDING',
  },
  {
    id: 'GRN-006',
    grnDate: '2026-02-06',
    supplierName: 'Global Auto Parts',
    invoiceDate: '2026-02-05',
    invoiceNo: 'INV-006',
    paymentMethod: 'Cash',
    items: [
      { id: '1', itemName: 'Engine Oil 10W-40', itemCode: 'EO-001', qty: 30, costPrice: 1200, total: 36000 },
    ],
    total: 36000,
    discount: 1000,
    remarks: 'Completed successfully',
    status: 'SETTLED',
  },
  {
    id: 'GRN-007',
    grnDate: '2026-02-07',
    supplierName: 'Prime Motor Dealers',
    invoiceDate: '2026-02-06',
    invoiceNo: 'INV-007',
    paymentMethod: 'Credit',
    items: [
      { id: '1', itemName: 'Brake Pad Set', itemCode: 'BP-102', qty: 20, costPrice: 2000, total: 40000 },
    ],
    total: 40000,
    discount: 0,
    remarks: 'Partial payment received',
    status: 'PARTIALLY PAID',
  },
  {
    id: 'GRN-008',
    grnDate: '2026-02-08',
    supplierName: 'City Auto Suppliers',
    invoiceDate: '2026-02-07',
    invoiceNo: 'INV-008',
    paymentMethod: 'Cash',
    items: [
      { id: '1', itemName: 'Air Filter', itemCode: 'AF-304', qty: 50, costPrice: 600, total: 30000 },
    ],
    total: 30000,
    discount: 500,
    remarks: 'Overpayment adjustment needed',
    status: 'OVER PAID',
  },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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

  const [statusFilter, setStatusFilter] = useState('ALL');
  const [paymentFilter, setPaymentFilter] = useState('ALL');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [dropdownDirection, setDropdownDirection] = useState<'down' | 'up'>('down');
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

const toggleDropdown = (id: string) => {
  if (openDropdownId === id) {
    setOpenDropdownId(null);
    return;
  }

  const buttonElement = document.getElementById(`dropdown-btn-${id}`);
  if (buttonElement) {
    const rect = buttonElement.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const dropdownHeight = 120; // approx height of dropdown in px
    if (spaceBelow < dropdownHeight) {
      setDropdownDirection('up');
    } else {
      setDropdownDirection('down');
    }
  }

  setOpenDropdownId(id);
};

const dropdownRef = useRef<HTMLDivElement | null>(null);
useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpenDropdownId(null);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);

  // Mock items for search
  const mockItems = [
    { id: '1', name: 'Engine Oil 10W-40', code: 'EO-001', costPrice: 1200, sellingPrice: 1500, stock: 50 },
    { id: '2', name: 'Brake Pad Set', code: 'BP-102', costPrice: 2000, sellingPrice: 2500, stock: 30 },
    { id: '3', name: 'Chain Sprocket Kit', code: 'CS-203', costPrice: 2800, sellingPrice: 3500, stock: 20 },
    { id: '4', name: 'Air Filter', code: 'AF-304', costPrice: 600, sellingPrice: 800, stock: 45 },
    { id: '5', name: 'Spark Plug', code: 'SP-405', costPrice: 350, sellingPrice: 450, stock: 100 },
  ];


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

const filteredGRNs = grns.filter((grn) => {

  const matchesSearch =
    grn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    grn.supplierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    grn.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase());

  const matchesStatus =
    statusFilter === 'ALL' || grn.status === statusFilter;

  const matchesPayment =
    paymentFilter === 'ALL' || grn.paymentMethod === paymentFilter;

  const grnDate = new Date(grn.grnDate);

  const matchesFromDate =
    !fromDate || grnDate >= new Date(fromDate);

  const matchesToDate =
    !toDate || grnDate <= new Date(toDate);

  return matchesSearch && matchesStatus && matchesPayment && matchesFromDate && matchesToDate;
});

  const filteredItems = mockItems.filter(item =>
    item.name.toLowerCase().includes(itemSearchQuery.toLowerCase()) ||
    item.code.toLowerCase().includes(itemSearchQuery.toLowerCase())
  );

  const getStatusStyle = (status: GRN['status']) => {
  switch (status) {
    case 'SETTLED':
      return 'bg-green-100 text-green-700';

    case 'PENDING':
      return 'bg-yellow-100 text-yellow-700';

    case 'PARTIALLY PAID':
      return 'bg-blue-100 text-blue-700';

    case 'OVER PAID':
      return 'bg-red-100 text-red-700';

    default:
      return 'bg-gray-100 text-gray-700';
  }
};

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">GRN Settlement</h2>
        </div>
      </div>

      {/* Search */}
<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
  <div className="flex flex-wrap items-center gap-3">

    {/* Search */}
    <div className="relative flex-1 min-w-[200px]">
      <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search GRN here with ID, Inv No. ,Supplier etc. ..."
      />
    </div>

    {/* Payment Method Filter */}
<select
  value={paymentFilter}
  onChange={(e) => setPaymentFilter(e.target.value)}
  className="px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  <option value="ALL">All Payments</option>
  <option value="Cash">Cash</option>
  <option value="Credit">Credit</option>
  <option value="Cheque">Cheque</option>
  <option value="Bank Transfer">Bank Transfer</option>
</select>

    {/* Status Filter */}
    <select
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
      className="px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="ALL">All Status</option>
      <option value="SETTLED">Settled</option>
      <option value="PENDING">Pending</option>
      <option value="PARTIALLY PAID">Partially Paid</option>
      <option value="OVER PAID">Over Paid</option>
    </select>

    {/* From Date */}
    <input
      type="date"
      value={fromDate}
      onChange={(e) => setFromDate(e.target.value)}
      className="px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    {/* To Date */}
    <input
      type="date"
      value={toDate}
      onChange={(e) => setToDate(e.target.value)}
      className="px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    {/* Clear Filters */}
    <button
      onClick={() => {
        setSearchQuery('');
        setStatusFilter('ALL');
        setPaymentFilter('ALL');
        setFromDate('');
        setToDate('');
      }}
      className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded"
    >
      Clear
    </button>

  </div>
</div>

    {/* Supplier Dropdown  & Outstanding*/}
<div className='flex cols-3 gap-10'>
  <select

  className="px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
>
  <option >Select Supllier To View Outstanding</option>
  <option >Supplier 1</option>
  <option >Supplier 2</option>
  <option >Supplier 3</option>
  <option >Supplier 4</option>
</select>

<div className='m-1'>
  <h2 className='text-gray-600'>Outstanding Amount: </h2>
</div>
<div className='m-1'>
  <h2 className='text-gray-600'>Rs. 0 </h2>
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
              <th className="px-4 py-3 text-right font-medium text-gray-700">Status</th>
              <th className="px-4 py-3 text-center font-medium text-gray-700">Actions</th>
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
                <td className="px-4 py-3 text-right">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${getStatusStyle(grn.status)}`}
                  >
                    {grn.status}
                  </span>
                </td>
<td className="px-3 py-3 relative">
  <div ref={dropdownRef} className="relative inline-block text-left">
<button
  id={`dropdown-btn-${grn.id}`}
  onClick={() => toggleDropdown(grn.id)}
  className="p-1 text-gray-600 hover:bg-gray-100 rounded ml-4"
  title="Actions"
>
<FiMoreVertical className="h-5 w-5" />
</button>

{openDropdownId === grn.id && (
  <div
    className={`absolute right-0 w-32 bg-white border border-gray-200 rounded shadow-lg z-10 ${
      dropdownDirection === 'down' ? 'mt-0' : 'mb-0 bottom-full'
    }`}
  >
    <button
      className="w-full text-left px-4 py-1 text-sm text-gray-700 hover:bg-gray-100"
      onClick={() => {
        console.log('View', grn.id);
        setOpenDropdownId(null);
      }}
    >
      View
    </button>
    <button
      className="w-full text-left px-4 py-1 text-sm text-gray-700 hover:bg-gray-100"
      onClick={() => {
        console.log('Edit', grn.id);
        setOpenDropdownId(null);
      }}
    >
      Pay
    </button>
  </div>
)}
  </div>
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}