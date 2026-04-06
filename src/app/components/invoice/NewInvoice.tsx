import { useState } from 'react';
import { Plus, Trash2, Search, X } from 'lucide-react';
import { ItemsForNewInvoice } from './ItemsForNewInvoice';

interface InvoiceItem {
  id: string;
  itemName: string;
  itemCode: string;
  qty: number;
  cost: number;
  price: number;
  discount: number;
  discountType: 'manual' | 'percentage';
  total: number;
}

interface Customer {
  id: string;
  name: string;
  phone: string;
  address: string;
  outstandings: number;
  creditLimit:number;
  lastPendingInvoiceNumber: string;
  lastPendingInvoiceDate: string;
}

interface NewInvoiceProps {
  onSave: (invoice: any) => void;
}

export function NewInvoice({ onSave }: NewInvoiceProps) {
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'Credit' | 'Cheque' | 'Bank Transfer'>('Cash');
  const [salesRef, setSalesRef] = useState('');
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [showItemSearch, setShowItemSearch] = useState(false);
  const [showCustomerSearch, setShowCustomerSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [customerSearchQuery, setCustomerSearchQuery] = useState('');
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [descriptionText, setDescriptionText] = useState('');
  const [descriptionAmount, setDescriptionAmount] = useState<number>(0);
  const [creditDays, setCreditDays] = useState<number>(0);
  const [creditRemarks, setCreditRemarks] = useState('');
  const [showManualDiscountModal, setShowManualDiscountModal] = useState(false);
  const [manualDiscountValue, setManualDiscountValue] = useState<number>(0);

// Cheque
const [chequeDetails, setChequeDetails] = useState({
  date: '',
  chequeNo: '',
  fromBank: '',
  toBank: '',
  branch: '',
  amount: 0,
  remark: '',
});

// Bank Transfer
const [bankTransfer, setBankTransfer] = useState({
  fromBank: '',
  toBank: '',
  amount: 0,
  remark: '',
});

  // Mock customers
  const mockCustomers: Customer[] = [
    { id: 'CUST-001', name: 'John Auto Parts', phone: '+94771234567', address: '123 Main St, Colombo 03', outstandings: 1200, creditLimit: 200000 , lastPendingInvoiceNumber: 'INV1278', lastPendingInvoiceDate:'08.12.2025'},
    { id: 'CUST-002', name: 'Lanka Motors', phone: '+94779876543', address: '456 Galle Rd, Mount Lavinia', outstandings: 2200, creditLimit: 180000 , lastPendingInvoiceNumber: 'INV1280',  lastPendingInvoiceDate: '10.12.2025' },
    { id: 'CUST-003', name: 'Royal Bike Shop', phone: '+94112223344', address: '789 Kandy Rd, Kadawatha', outstandings: 3200, creditLimit: 350000 , lastPendingInvoiceNumber: 'INV1285',  lastPendingInvoiceDate: '12.12.2025' },
    { id: 'CUST-004', name: 'Speed Auto Center', phone: '+94777778888', address: '321 Negombo Rd, Wattala' , outstandings: 4200, creditLimit: 180000 , lastPendingInvoiceNumber: 'INV1290',   lastPendingInvoiceDate: '15.12.2025'},
  ];

  // Mock items for search
  const mockItems = [
    { id: '1', name: 'Engine Oil 10W-40', code: 'EO-001', price: 1500, cost: 150, stock: 50 },
    { id: '2', name: 'Brake Pad Set', code: 'BP-102', price: 2500, cost: 150, stock: 30 },
    { id: '3', name: 'Chain Sprocket Kit', code: 'CS-203', price: 3500, cost: 150, stock: 20 },
    { id: '4', name: 'Air Filter', code: 'AF-304', price: 800, cost: 150, stock: 45 },
    { id: '5', name: 'Spark Plug', code: 'SP-405', price: 450, cost: 150, stock: 100 },
  ];

  const selectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setCustomerAddress(customer.address);
    setShowCustomerSearch(false);
    setCustomerSearchQuery('');
  };

  const addItem = (item: typeof mockItems[0]) => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      itemName: item.name,
      itemCode: item.code,
      qty: 1,
      cost: item.cost,
      price: item.price,
      discount: 0,
      discountType: 'manual',
      total: item.price,
    };
    setItems([...items, newItem]);
    setShowItemSearch(false);
    setSearchQuery('');
  };

  const addDescriptionItem = () => {
  if (!descriptionText || descriptionAmount <= 0) return;

  const newItem: InvoiceItem = {
    id: Date.now().toString(),
    itemName: descriptionText,
    itemCode: '-', // no code
    qty: 1,
    cost: 0, // no cost tracking
    price: descriptionAmount,
    discount: 0,
    discountType: 'manual',
    total: descriptionAmount,
  };

  setItems([...items, newItem]);

  // reset + close
  setDescriptionText('');
  setDescriptionAmount(0);
  setShowDescriptionModal(false);
};

const updateItem = (
  id: string,
  field: keyof InvoiceItem,
  value: number | string
) => {
  setItems(items.map(item => {
    if (item.id === id) {
      const updated = { ...item, [field]: value };

      const subTotal = updated.qty * updated.price;

      let discountAmount = 0;

      if (updated.discountType === 'percentage') {
        discountAmount = (subTotal * Number(updated.discount)) / 100;
      } else {
        discountAmount = Number(updated.discount);
      }

      updated.total = subTotal - discountAmount;

      return updated;
    }
    return item;
  }));
};

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const calculateSubTotal = () => items.reduce((sum, item) => sum + (item.qty * item.price), 0);
  const calculateItemDiscount = () =>
  items.reduce((sum, item) => {
    const subTotal = item.qty * item.price;

    let discountAmount = 0;

    if (item.discountType === 'percentage') {
      discountAmount = (subTotal * item.discount) / 100;
    } else {
      discountAmount = item.discount;
    }

    return sum + discountAmount;
  }, 0);

const calculateTotalDiscount = () =>
  calculateItemDiscount() + manualDiscountValue;
  const calculateNetTotal = () => calculateSubTotal() - calculateTotalDiscount();
  const calculateProfit = () =>
  items.reduce((sum, item) => {
    const revenue = item.qty * item.price;
    const cost = item.qty * item.cost;
    const discountShare = item.discount; // assumes discount reduces profit fully
    return sum + (revenue - cost - discountShare);
  }, 0);


  const handleExtraAction = (value: string) => {
  switch (value) {
    case 'manual-discount':
      setShowManualDiscountModal(true);
      break;

    case 'expenses':
      setShowDescriptionModal(true);
      break;

    case 'overhead':
      console.log('Overhead clicked');
      // TODO: implement overhead logic
      break;

    default:
      break;
  }
};

  const handleSave = () => {
    const invoice = {
      id: 'INV-' + Date.now(),
      date: invoiceDate,
      customer: {
        name: selectedCustomer?.name || '',
        phone: selectedCustomer?.phone || '',
        address: customerAddress,
      },
      paymentMethod,
      salesRef,
      items,
      subTotal: calculateSubTotal(),
      discount: calculateTotalDiscount(),
      netTotal: calculateNetTotal(),
      settled: paymentMethod === 'Cash',
    };
    onSave(invoice);
    // Reset form
    setSelectedCustomer(null);
    setCustomerAddress('');
    setItems([]);
  };

  const filteredItems = mockItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCustomers = mockCustomers.filter(customer =>
    customer.name.toLowerCase().includes(customerSearchQuery.toLowerCase()) ||
    customer.phone.includes(customerSearchQuery)
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">New Invoice</h2>
        <p className="text-xs text-gray-600 mt-1">Create a new sales invoice</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {/* Invoice Header */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Invoice Date</label>
            <input
              type="date"
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">Customer *</label>
            <div className="flex gap-2">
              {selectedCustomer ? (
                <div className="flex-1 px-3 py-1.5 text-sm border border-green-300 bg-green-50 rounded flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900">{selectedCustomer.name} - ({selectedCustomer.phone})</p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedCustomer(null);
                      setCustomerAddress('');
                    }}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowCustomerSearch(true)}
                  className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-left text-gray-500 flex items-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  Search customer...
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Customer Address */}
        {selectedCustomer && (
          <div className="mb-6">
            <label className="block text-xs font-medium text-gray-700 mb-1">Customer Address</label>
            <textarea
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={2}
              placeholder="Enter customer address"
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 mb-6">

            <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value as any)}
              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Cash">Cash</option>
              <option value="Credit">Credit</option>
              <option value="Cheque">Cheque</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Sales Reference</label>
        <div className='flex cols-2 gap-4 mb-6'>
              <input
              type="text"
              value={salesRef}
              onChange={(e) => setSalesRef(e.target.value)}
              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Sales person name"
            />
               <button
              
              className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-3 h-3" />
               REP
            </button>
        </div>
          </div>

{/* Dynamic Payment Fields */}
<div className="mb-6">
  {paymentMethod === 'Credit' && (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="text-xs">Credit Period (Days)</label>
        <input
          type="number"
          value={creditDays}
          onChange={(e) => setCreditDays(parseInt(e.target.value))}
          className="w-full px-3 py-1.5 text-sm border rounded"
        />
      </div>

      <div>
        <label className="text-xs">Remarks</label>
        <input
          type="text"
          value={creditRemarks}
          onChange={(e) => setCreditRemarks(e.target.value)}
          className="w-full px-3 py-1.5 text-sm border rounded"
        />
      </div>
    </div>
  )}

  {paymentMethod === 'Cheque' && (
    <div className="grid grid-cols-2 gap-4">
      <input type="date" value={chequeDetails.date}
        onChange={(e) => setChequeDetails({ ...chequeDetails, date: e.target.value })}
        className="px-3 py-1.5 border rounded text-sm"
      />

      <input placeholder="Cheque No"
        value={chequeDetails.chequeNo}
        onChange={(e) => setChequeDetails({ ...chequeDetails, chequeNo: e.target.value })}
        className="px-3 py-1.5 border rounded text-sm"
      />

      <input placeholder="From Bank"
        value={chequeDetails.fromBank}
        onChange={(e) => setChequeDetails({ ...chequeDetails, fromBank: e.target.value })}
        className="px-3 py-1.5 border rounded text-sm"
      />

      <input placeholder="To Bank"
        value={chequeDetails.toBank}
        onChange={(e) => setChequeDetails({ ...chequeDetails, toBank: e.target.value })}
        className="px-3 py-1.5 border rounded text-sm"
      />

      <input placeholder="Branch"
        value={chequeDetails.branch}
        onChange={(e) => setChequeDetails({ ...chequeDetails, branch: e.target.value })}
        className="px-3 py-1.5 border rounded text-sm"
      />

      <input type="number" placeholder="Amount"
        value={chequeDetails.amount}
        onChange={(e) => setChequeDetails({ ...chequeDetails, amount: parseFloat(e.target.value) })}
        className="px-3 py-1.5 border rounded text-sm"
      />

      <input placeholder="Remark"
        value={chequeDetails.remark}
        onChange={(e) => setChequeDetails({ ...chequeDetails, remark: e.target.value })}
        className="col-span-2 px-3 py-1.5 border rounded text-sm"
      />
    </div>
  )}

  {paymentMethod === 'Bank Transfer' && (
    <div className="grid grid-cols-2 gap-4">
      <input placeholder="From Bank"
        value={bankTransfer.fromBank}
        onChange={(e) => setBankTransfer({ ...bankTransfer, fromBank: e.target.value })}
        className="px-3 py-1.5 border rounded text-sm"
      />

      <input placeholder="To Bank"
        value={bankTransfer.toBank}
        onChange={(e) => setBankTransfer({ ...bankTransfer, toBank: e.target.value })}
        className="px-3 py-1.5 border rounded text-sm"
      />

      <input type="number" placeholder="Amount"
        value={bankTransfer.amount}
        onChange={(e) => setBankTransfer({ ...bankTransfer, amount: parseFloat(e.target.value)  })}
        className="px-3 py-1.5 border rounded text-sm"
      />

      <input placeholder="Remark"
        value={bankTransfer.remark}
        onChange={(e) => setBankTransfer({ ...bankTransfer, remark: e.target.value })}
        className="px-3 py-1.5 border rounded text-sm col-span-2"
      />
    </div>
  )}
</div>


        </div>

        {/* Items Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <label className="text-xs font-medium text-gray-700">Items</label>
          <div className='flex gap-4 cols-2'>
              <button
              onClick={() => setShowItemSearch(true)}
              className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-3 h-3" />
              Add Item
            </button>

            <div className="relative">
              <select
                onChange={(e) => {
                  handleExtraAction(e.target.value);
                  e.target.selectedIndex = 0;
                }}
                className="appearance-none flex items-center gap-1 px-3 py-1.5 bg-gray-600 text-white text-xs rounded hover:bg-gray-700 cursor-pointer pr-8"
              >
                <option value="">More</option>
                <option value="manual-discount">Manual Discount</option>
                <option value="expenses">Add Expenses</option>
                <option value="overhead">Overhead</option>
              </select>

              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-xs">
                ▼
              </span>
            </div>
        </div>

          </div>

          {items.length > 0 && (
            <div className="border border-gray-200 rounded overflow-hidden">
              <table className="w-full text-xs">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium text-gray-700">Item</th>
                    <th className="px-3 py-2 text-left font-medium text-gray-700">Code</th>
                    <th className="px-3 py-2 text-right font-medium text-gray-700">Qty</th>
                    <th className="px-3 py-2 text-right font-medium text-gray-700">Cost</th>
                    <th className="px-3 py-2 text-right font-medium text-gray-700">Price</th>
                    <th className="px-3 py-2 text-right font-medium text-gray-700">Dis: Type</th>
                    <th className="px-3 py-2 text-right font-medium text-gray-700">Discount</th>
                    <th className="px-3 py-2 text-right font-medium text-gray-700">Total</th>
                    <th className="px-3 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => {
                    const isDescription = item.itemCode === '-';

                    return (
                      <tr key={item.id} className="border-t border-gray-200">
                        <td className="px-3 py-2">
                          {isDescription ? (
                            <span className="italic text-gray-600">{item.itemName}</span>
                          ) : (
                            item.itemName
                          )}
                        </td>

                        <td className="px-3 py-2">
                          {isDescription ? '-' : item.itemCode}
                        </td>

                        <td className="px-3 py-2 align-middle">
                          <div className="flex items-center justify-end">
                            <input
                              type="number"
                              value={item.qty}
                              disabled={isDescription}
                              onChange={(e) =>
                                updateItem(item.id, 'qty', parseInt(e.target.value) || 0)
                              }
                              className="w-14 px-2 py-1 text-right border border-gray-300 rounded text-xs leading-none"
                              min="1"
                            />
                          </div>
                        </td>

                        <td className="px-3 py-2 text-right">
                          {isDescription ? '-' : item.cost.toFixed(2)}
                        </td>

                        <td className="px-3 py-2 text-right">
                          {item.price.toFixed(2)}
                        </td>

                      <td className="px-3 py-2 text-right">
                        <select
                          value={item.discountType}
                          onChange={(e) =>
                            updateItem(item.id, 'discountType', e.target.value)
                          }
                          className="border border-gray-300 rounded text-xs px-1 py-1"
                        >
                          <option value="manual">Manual</option>
                          <option value="percentage">%</option>
                        </select>
                      </td>

                        <td className="px-3 py-2 align-middle">
                          <div className="flex items-center justify-end">
                          <input
                            type="number"
                            value={item.discount}
                            onChange={(e) =>
                              updateItem(item.id, 'discount', parseFloat(e.target.value) )
                            }
                            className="w-16 px-2 py-1 text-right border border-gray-300 rounded text-xs"
                            min="0"
                          />
                          </div>
                        </td>

                        <td className="px-3 py-2 text-right font-medium">
                          {item.total.toFixed(2)}
                        </td>

                        <td className="px-3 py-2">
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Totals */}
        {items.length > 0 && (
          <div className="flex justify-end">
            <div className="w-64 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Sub Total:</span>
                <span className="font-medium">Rs. {calculateSubTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Manual Discount:</span>
                <span className="font-medium text-red-600">
                  - Rs. {manualDiscountValue.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Item Discount:</span>
                <span className="font-medium text-red-600">
                  - Rs. {calculateItemDiscount().toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Discount:</span>
                <span className="font-medium text-red-600">- Rs. {calculateTotalDiscount().toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <span className="font-semibold text-gray-900">Net Total:</span>
                <span className="font-bold text-lg text-blue-600">Rs. {calculateNetTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <span className="font-semibold text-gray-900">Profit:</span>
                <span className="font-bold text-lg text-green-600">Rs. {calculateProfit().toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
          <button className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={items.length === 0 || !selectedCustomer}
            className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Save Invoice
          </button>
        </div>
      </div>

      {/* Customer Search Modal */}
      {showCustomerSearch && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[100]">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden mx-4">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-sm font-semibold text-gray-900">Search Customer</h3>
              <button
                onClick={() => setShowCustomerSearch(false)}
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
                  value={customerSearchQuery}
                  onChange={(e) => setCustomerSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search by name or phone..."
                  autoFocus
                />
              </div>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {filteredCustomers.map((customer) => (
                <button
                  key={customer.id}
                  onClick={() => selectCustomer(customer)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{customer.name}</p>
                      <p className="text-xs text-gray-600 mt-0.5">{customer.phone}</p>
                      <p className="text-xs text-gray-500 mt-1">{customer.address}</p>
                      <p className="text-xs text-orange-400 mt-1"> Outstandings : Rs. {customer.outstandings}</p>
                      <p className="text-xs text-red-500 mt-1"> Credit Limit : Rs. {customer.creditLimit}</p>
                      <p className="text-xs text-cyan-700 mt-1"> Last Pending Bill Number: {customer.lastPendingInvoiceNumber} - Date: {customer.lastPendingInvoiceDate}</p>
                    </div>
                    <span className="text-xs text-blue-600 font-medium">{customer.id}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}


{showDescriptionModal && (
  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[120]">
    <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-5 mx-4">
      
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-semibold text-gray-900">
          Add Description
        </h3>
        <button
          onClick={() => setShowDescriptionModal(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        {/* Description */}
        <div>
          <label className="text-xs text-gray-600">Description</label>
          <input
            type="text"
            value={descriptionText}
            onChange={(e) => setDescriptionText(e.target.value)}
            className="w-full px-3 py-2 text-sm border rounded"
            placeholder="e.g. Transport cost"
          />
        </div>

        {/* Amount */}
        <div>
          <label className="text-xs text-gray-600">Amount</label>
          <input
            type="number"
            value={descriptionAmount}
            onChange={(e) => setDescriptionAmount(parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 text-sm border rounded"
            placeholder="Enter amount"
          />
        </div>

        {/* Add Button */}
        <button
          onClick={addDescriptionItem}
          className="w-full bg-green-600 text-white py-2 rounded text-sm hover:bg-green-700"
        >
          Add to Invoice
        </button>
      </div>

    </div>
  </div>
)}

      {/* Item Search Modal */}
{showItemSearch && (
  <ItemsForNewInvoice
    show={showItemSearch}
    onClose={() => setShowItemSearch(false)}
onSelect={(products) => {
  const newItems: InvoiceItem[] = products.map((product) => ({
    id: Date.now().toString() + product.id,
    itemName: product.name,
    itemCode: product.code,
    qty: 1,
    cost: product.costPrice,
    price: product.sellingPrice,
    discount: 0,
    discountType: 'manual',
    total: product.sellingPrice,
  }));

  setItems((prev) => {
  const existingCodes = new Set(prev.map((i) => i.itemCode));

  const newItems = products
    .filter((p) => !existingCodes.has(p.code))
    .map((product) => ({
      id: Date.now().toString() + product.id,
      itemName: product.name,
      itemCode: product.code,
      qty: 1,
      cost: product.costPrice,
      price: product.sellingPrice,
      discount: 0,
      discountType: 'manual',
      total: product.sellingPrice,
    }));

  return [...prev, ...newItems];
});
  setShowItemSearch(false);
}}
  />
)}

{showManualDiscountModal && (
  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[130]">
    <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-5 mx-4">
      
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-semibold text-gray-900">
          Add Manual Discount
        </h3>
        <button
          onClick={() => setShowManualDiscountModal(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-xs text-gray-600">Discount Amount</label>
          <input
            type="number"
            value={manualDiscountValue}
            onChange={(e) =>
              setManualDiscountValue(parseFloat(e.target.value) || 0)
            }
            className="w-full px-3 py-2 text-sm border rounded"
            placeholder="Enter discount"
          />
        </div>

        <button
          onClick={() => setShowManualDiscountModal(false)}
          className="w-full bg-blue-600 text-white py-2 rounded text-sm hover:bg-blue-700"
        >
          Apply Discount
        </button>
      </div>

    </div>
  </div>
)}
    </div>
  );
}