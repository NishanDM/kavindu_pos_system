import { X } from "lucide-react";

interface Customer {
  id: string;
  name: string;
  address: string;
  whatsappNumber: string;
  phone: string;
  brNumber?: string;
  creditLimit: number;
  creditPeriod: number;
  idImage?: string;
  agreementPhoto?: string;
}

interface AddNewCustomerProps {
  show: boolean;
  onClose: () => void;
  onSave: () => void;
  editingCustomer: Customer | null;
  formData: Partial<Customer>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Customer>>>;
}

export function AddNewCustomer({
  show,
  onClose,
  onSave,
  editingCustomer,
  formData,
  setFormData,
}: AddNewCustomerProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-start justify-center z-[100] overflow-y-auto pt-20 pb-10">

      {/* Modal */}
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl my-auto mx-4">

        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">
            {editingCustomer ? "Edit Customer" : "Add New Customer"}
          </h3>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="space-y-4">
            {/* Customer ID */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Customer Code *
              </label>
              <input
                type="text"
                value={formData.id || ""}
                onChange={(e) =>
                  setFormData({ ...formData, id: e.target.value })
                }
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Name */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Customer Name *
              </label>
              <input
                type="text"
                value={formData.name || ""}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Customer Address *
              </label>
              <textarea
                value={formData.address || ""}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                rows={2}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Phone section */}
            <div className="grid grid-cols-2 gap-4">

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  WhatsApp Number *
                </label>
                <input
                  type="tel"
                  value={formData.whatsappNumber || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      whatsappNumber: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Fixed Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phone: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

            </div>

            {/* BR Number */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                BR Number
              </label>
              <input
                type="text"
                value={formData.brNumber || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    brNumber: e.target.value,
                  })
                }
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

           {/* Credit Limit */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Credit Limit
              </label>
              <input
              placeholder="10 00 000"
                type="number"
                value={formData.creditLimit || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    creditLimit: e.target.value,
                  })
                }
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Credit Period */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Credit Period (Number of Days)
              </label>
              <input
              placeholder="60"
                type="number"
                value={formData.creditPeriod || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    creditPeriod: e.target.value,
                  })
                }
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* ID Image */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                ID & BR Images
              </label>
              <input
                type="file"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    idImage: e.target.files?.[0]?.name,
                  })
                }
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Agreement */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Agreement Photo
              </label>
              <input
                type="file"
                value={formData.agreementPhoto || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    agreementPhoto: e.target.value,
                  })
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
            className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={onSave}
            className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors cursor-pointer"
          >
            {editingCustomer ? "Update" : "Add"} Customer
          </button>

        </div>

      </div>
    </div>
  );
}