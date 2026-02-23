import { X } from 'lucide-react';
import { Supplier } from './AddSupplier';

interface ViewSupplierProps {
  show: boolean;
  supplier: Supplier | null;
  onClose: () => void;
}

export function ViewSupplier({
  show,
  supplier,
  onClose,
}: ViewSupplierProps) {
  if (!show || !supplier) return null;

  const Field = ({
    label,
    value,
  }: {
    label: string;
    value?: string;
  }) => (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1">
        {label}
      </label>
      <div className="w-full px-3 py-2 text-sm border border-gray-200 rounded bg-gray-50 text-gray-900 min-h-[38px] flex items-center">
        {value || <span className="text-gray-400">—</span>}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-start justify-center z-[100] overflow-y-auto pt-20 pb-10">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl my-auto mx-4">

        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">
            View Supplier
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

            <Field label="Supplier ID" value={supplier.id} />

            <Field label="Supplier Name" value={supplier.name} />

            <Field label="Address" value={supplier.address} />

            <div className="grid grid-cols-2 gap-4">
              <Field
                label="Contact Number"
                value={supplier.contactNumber}
              />

              <Field
                label="WhatsApp Number"
                value={supplier.whatsappNumber}
              />
            </div>

            <Field label="Email" value={supplier.email} />

          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}