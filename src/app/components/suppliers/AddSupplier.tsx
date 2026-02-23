import { X } from 'lucide-react';

export interface Supplier {
  id: string;
  name: string;
  address: string;
  contactNumber: string;
  whatsappNumber: string;
  email: string;
}

interface AddSupplierProps {
  show: boolean;
  editingSupplier: Supplier | null;
  formData: Partial<Supplier>;
  setFormData: (data: Partial<Supplier>) => void;
  onClose: () => void;
  onSave: () => void;
}

export function AddSupplier({
  show,
  editingSupplier,
  formData,
  setFormData,
  onClose,
  onSave,
}: AddSupplierProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-start justify-center z-[100] overflow-y-auto pt-20 pb-10">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl my-auto mx-4">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">
            {editingSupplier ? 'Edit Supplier' : 'Add New Supplier'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="space-y-4">

          {/* Supplier ID */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Supplier ID *
              </label>
              <input
                type="text"
                value={formData.id || ''}
                onChange={(e) =>
                  setFormData({ ...formData, id: e.target.value })
                }
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Name */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Supplier Name *
              </label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Address *
              </label>
              <textarea
                value={formData.address || ''}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={2}
              />
            </div>

            {/* Phone numbers */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Contact Number *
                </label>
                <input
                  type="tel"
                  value={formData.contactNumber || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contactNumber: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

             <div className="mb-3">
            <label className="block text-xs font-medium text-gray-700 mb-1">
                WhatsApp Number
            </label>

  <div className="flex gap-2">
    <input
      type="tel"
      value={formData.whatsappNumber || ''}
      onChange={(e) =>
        setFormData({
          ...formData,
          whatsappNumber: e.target.value,
        })
      }
      className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <button
      type="button"
      className="px-3 py-2 text-sm text-white bg-cyan-700 border border-gray-300 rounded hover:bg-cyan-800"
    >
      Paste
    </button>
  </div>
</div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
          >
            Cancel
          </button>

          <button
            onClick={onSave}
            className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            {editingSupplier ? 'Update' : 'Add'} Supplier
          </button>
        </div>

      </div>
    </div>
  );
}