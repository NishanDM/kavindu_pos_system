import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, X } from 'lucide-react';
import { AddSupplier } from './AddSupplier';
import { ViewSupplier } from './ViewSupplier';

interface Supplier {
  id: string;
  name: string;
  address: string;
  contactNumber: string;
  whatsappNumber: string;
  email: string;
}

export function SupplierManagement() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([
    {
      id: 'SUP-001',
      name: 'ABC Auto Parts Ltd',
      address: '123 Main St, Colombo',
      contactNumber: '+94112345678',
      whatsappNumber: '+94771234567',
      email: 'abc@autoparts.lk',
    },
    {
      id: 'SUP-002',
      name: 'Premium Motor Parts',
      address: '456 Galle Road, Dehiwala',
      contactNumber: '+94118765432',
      whatsappNumber: '+94779876543',
      email: 'info@premiumparts.lk',
    },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [formData, setFormData] = useState<Partial<Supplier>>({});
  const [viewSupplier, setViewSupplier] = useState<Supplier | null>(null);
  const [showView, setShowView] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [supplierToDelete, setSupplierToDelete] = useState<Supplier | null>(null);

  const handleAdd = () => {
    setFormData({});
    setEditingSupplier(null);
    setShowAddForm(true);
  };

  const handleEdit = (supplier: Supplier) => {
    setFormData(supplier);
    setEditingSupplier(supplier);
    setShowAddForm(true);
  };

  const handleSave = () => {
    if (editingSupplier) {
      setSuppliers(suppliers.map(s => s.id === editingSupplier.id ? { ...editingSupplier, ...formData } as Supplier : s));
    } else {
      const newSupplier: Supplier = {
        id: 'SUP-' + (suppliers.length + 1).toString().padStart(3, '0'),
        name: formData.name || '',
        address: formData.address || '',
        contactNumber: formData.contactNumber || '',
        whatsappNumber: formData.whatsappNumber || '',
        email: formData.email || '',
      };
      setSuppliers([...suppliers, newSupplier]);
    }
    setShowAddForm(false);
  };

const handleDeleteClick = (supplier: Supplier) => {
  setSupplierToDelete(supplier);
  setShowDeleteConfirm(true);
};

const confirmDelete = () => {
  if (supplierToDelete) {
    setSuppliers(suppliers.filter(s => s.id !== supplierToDelete.id));
    setSupplierToDelete(null);
    setShowDeleteConfirm(false);
  }
};

const cancelDelete = () => {
  setSupplierToDelete(null);
  setShowDeleteConfirm(false);
};

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    supplier.contactNumber.includes(searchQuery) ||
    supplier.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Supplier Management</h2>
          <p className="text-xs text-gray-600 mt-1">Manage supplier information</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Supplier
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
            placeholder="Search by name, phone or email..."
          />
        </div>
      </div>

      {/* Suppliers Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-xs">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Supplier ID</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Name</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Address</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Contact</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">WhatsApp</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Email</th>
              <th className="px-4 py-3 text-center font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSuppliers.map((supplier) => (
              <tr key={supplier.id} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-blue-600">{supplier.id}</td>
                <td className="px-4 py-3">{supplier.name}</td>
                <td className="px-4 py-3 text-xs">{supplier.address}</td>
                <td className="px-4 py-3">{supplier.contactNumber}</td>
                <td className="px-4 py-3">{supplier.whatsappNumber}</td>
                <td className="px-4 py-3">{supplier.email}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">
                    <button
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                      title="View"
                        onClick={() => {
                      setViewSupplier(supplier);
                      setShowView(true);
                    }}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEdit(supplier)}
                      className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(supplier)}
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

      {/* Summary Card */}
      <div className="mt-4 bg-cyan-50 border border-cyan-200 rounded-lg p-4">
        <p className="text-xs text-cyan-700 mb-1">Total Suppliers</p>
        <p className="text-2xl font-bold text-cyan-900">{suppliers.length}</p>
      </div>


{showDeleteConfirm && (
  <div className="fixed inset-0 flex items-center justify-center bg-none z-50">
    <div className="bg-white rounded-lg shadow-lg w-80 p-4">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-semibold text-gray-900">
          Confirm Delete
        </h3>
        <button
          onClick={cancelDelete}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Body */}
      <p className="text-xs text-gray-600 mb-4">
        Are you sure you want to delete{" "}
        <span className="font-medium">{supplierToDelete?.name}</span>?
      </p>

      {/* Footer */}
      <div className="flex justify-end gap-2">
        <button
          onClick={cancelDelete}
          className="px-3 py-1 text-xs border rounded hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={confirmDelete}
          className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>

    </div>
  </div>
)}

      <AddSupplier
  show={showAddForm}
  editingSupplier={editingSupplier}
  formData={formData}
  setFormData={setFormData}
  onClose={() => setShowAddForm(false)}
  onSave={handleSave}
/>
<ViewSupplier
  show={showView}
  supplier={viewSupplier}
  onClose={() => setShowView(false)}
/>
    </div>
  );
}