import { X } from "lucide-react";

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

interface ViewCustomerProps {
  show: boolean;
  onClose: () => void;
  customer: Customer | null;
}

export function ViewCustomer({ show, onClose, customer }: ViewCustomerProps) {
  if (!show || !customer) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-start justify-center z-[100] overflow-y-auto pt-20 pb-10">
      
      {/* Modal */}
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl my-auto mx-4">

        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">
            Customer Details
          </h3>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 text-sm">

          {/* Customer Code */}
          <div>
            <p className="text-xs text-gray-500">Customer Code</p>
            <p className="font-medium text-gray-900">{customer.id}</p>
          </div>

          {/* Name */}
          <div>
            <p className="text-xs text-gray-500">Customer Name</p>
            <p className="font-medium text-gray-900">{customer.name}</p>
          </div>

          {/* Address */}
          <div>
            <p className="text-xs text-gray-500">Address</p>
            <p className="font-medium text-gray-900 whitespace-pre-line">
              {customer.address}
            </p>
          </div>

          {/* Phone grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500">WhatsApp Number</p>
              <p className="font-medium text-gray-900">
                {customer.whatsappNumber}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Phone Number</p>
              <p className="font-medium text-gray-900">
                {customer.phone || "-"}
              </p>
            </div>
          </div>

          {/* BR */}
          <div>
            <p className="text-xs text-gray-500">BR Number</p>
            <p className="font-medium text-gray-900">
              {customer.brNumber || "-"}
            </p>
          </div>

            {/* Credit Limit */}
          <div>
            <p className="text-xs text-gray-500">Credit Limit</p>
            <p className="font-medium text-gray-900">
              {customer.creditLimit || "-"}
            </p>
          </div>

            {/* Credit Period */}
          <div>
            <p className="text-xs text-gray-500">Credit Period</p>
            <p className="font-medium text-gray-900">
              {customer.creditPeriod || "-"}
            </p>
          </div>

          {/* ID Image */}
          {customer.idImage && (
            <div>
              <p className="text-xs text-gray-500 mb-1">ID / BR Image</p>
              <div className="border rounded p-2 bg-gray-50">
                <p className="text-blue-600 text-xs">{customer.idImage}</p>
              </div>
            </div>
          )}

          {/* Agreement Photo */}
          {customer.agreementPhoto && (
            <div>
              <p className="text-xs text-gray-500 mb-1">Agreement Photo</p>
              <div className="border rounded p-2 bg-gray-50">
                <p className="text-blue-600 text-xs">
                  {customer.agreementPhoto}
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}