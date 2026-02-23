import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, X } from 'lucide-react';
import { AddNewCustomer } from "./AddNewCustomer";
import { ViewCustomer } from './ViewCustomer';
import { CustomerDeleteConfirm } from './CustomerDeleteConfirm';

interface Customer {
  id: string;
  name: string;
  address:string;
  whatsappNumber: string;
  phone: string;
  brNumber?: string;
  creditLimit: number;
  idImage?: string;
  creditPeriod:number;
  agreementPhoto?: string;
}

export function CustomerManagement() {
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: 'CUST-001',
      name: 'John Auto Parts',
      whatsappNumber: '+94771234567',
      address: '130, kadawatha',
      creditLimit: 23000,
      creditPeriod:60,
      phone: '+94771234567',
      brNumber: 'BR123456',
    },
    {
      id: 'CUST-002',
      name: 'Lanka Motors',
      address: '130, kadawatha',
      creditLimit: 23000,
      creditPeriod:60,
      whatsappNumber: '+94779876543',
      phone: '+94119876543',
    },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [formData, setFormData] = useState<Partial<Customer>>({});
  const [viewCustomer, setViewCustomer] = useState<Customer | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(null);

const handleView = (customer: Customer) => {
  setViewCustomer(customer);
  setShowViewModal(true);
};

  const handleAdd = () => {
    setFormData({});
    setEditingCustomer(null);
    setShowAddForm(true);
  };

  const handleEdit = (customer: Customer) => {
    setFormData(customer);
    setEditingCustomer(customer);
    setShowAddForm(true);
  };

  const handleSave = () => {
    if (editingCustomer) {
      setCustomers(customers.map(c => c.id === editingCustomer.id ? { ...editingCustomer, ...formData } : c));
    } else {
      const newCustomer: Customer = {
        id: 'CUST-' + (customers.length + 1).toString().padStart(3, '0'),
        name: formData.name || '',
        whatsappNumber: formData.whatsappNumber || '',
        phone: formData.phone || '',
        brNumber: formData.brNumber,
        idImage: formData.idImage,
        agreementPhoto: formData.agreementPhoto,
      };
      setCustomers([...customers, newCustomer]);
    }
    setShowAddForm(false);
  };

const confirmDelete = () => {
  if (customerToDelete) {
    setCustomers(customers.filter(c => c.id !== customerToDelete.id));
  }
  setShowDeleteConfirm(false);
  setCustomerToDelete(null);
};

const cancelDelete = () => {
  setShowDeleteConfirm(false);
  setCustomerToDelete(null);
};

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery) ||
    customer.whatsappNumber.includes(searchQuery)
  );

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Customer Management</h2>
          <p className="text-xs text-gray-600 mt-1">Manage customer information</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Customer
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
            placeholder="Search by name or phone number..."
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-xs">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Customer ID</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Name</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">WhatsApp</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Phone</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">BR Number</th>
              <th className="px-4 py-3 text-center font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-blue-600">{customer.id}</td>
                <td className="px-4 py-3">{customer.name}</td>
                <td className="px-4 py-3">{customer.whatsappNumber}</td>
                <td className="px-4 py-3">{customer.phone}</td>
                <td className="px-4 py-3">{customer.brNumber || '-'}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">
                    <button
                    onClick={() => handleView(customer)}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEdit(customer)}
                      className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => {
                        setCustomerToDelete(customer);
                        setShowDeleteConfirm(true);
                      }}
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
<AddNewCustomer
  show={showAddForm}
  onClose={() => setShowAddForm(false)}
  onSave={handleSave}
  editingCustomer={editingCustomer}
  formData={formData}
  setFormData={setFormData}
/>

<ViewCustomer
  show={showViewModal}
  onClose={() => setShowViewModal(false)}
  customer={viewCustomer}
/>

<CustomerDeleteConfirm
  show={showDeleteConfirm}
  onCancel={cancelDelete}
  onConfirm={confirmDelete}
  customer={customerToDelete}
/>

      {/* Summary Card */}
      <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-xs text-blue-700 mb-1">Total Customers</p>
        <p className="text-2xl font-bold text-blue-900">{customers.length}</p>
      </div>
    </div>
  );
}