import { X } from "lucide-react";

interface Customer {
  id: string;
  name: string;
  address: string;
  whatsappNumber: string;
  phone: string;
  brNumber?: string;
  idImage?: string;
  agreementPhoto?: string;
}

interface CustomerDeleteConfirmProps {
  show: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  customer: Customer | null;
}

export function CustomerDeleteConfirm({
  show,
  onCancel,
  onConfirm,
  customer,
}: CustomerDeleteConfirmProps) {
  if (!show || !customer) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">

      {/* Modal */}
      <div className="bg-white rounded-lg shadow-lg w-80 p-4 border border-gray-200">

        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-semibold text-gray-900">
            Confirm Delete
          </h3>

          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <p className="text-xs text-gray-600 mb-4">
          Are you sure you want to delete{" "}
          <span className="font-medium text-gray-900">
            {customer.name}
          </span>
          ?
        </p>

        {/* Footer */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>

      </div>

    </div>
  );
}