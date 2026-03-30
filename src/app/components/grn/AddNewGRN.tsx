import { X, Plus, Trash2, Search } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { ItemsTable } from "./ItemsTable";

interface GRNItem {
  id: string;
  itemName: string;
  itemCode: string;
  qty: number;
  costPrice: number;
  total: number;
  discount: number;
}

interface GRNFormData {
  grnDate: string;
  supplierName: string;
  invoiceDate: string;
  invoiceNo: string;
  paymentMethod: string;
  discount: string;
  remarks: string;
  customerPODate: string;
  customerPONumber: string;
  grnImage?: File | null;

  paymentDetails: {
    creditPeriod?: string;
    creditRemark?: string;

    chequeDate?: string;
    chequeNumber?: string;
    fromBank?: string;
    toBank?: string;
    branch?: string;
    amount?: string;
    chequeRemark?: string;

    transferFromBank?: string;
    transferToBank?: string;
    transferAmount?: string;
    transferRemark?: string;
  };
}

interface AddNewGRNProps {
  show: boolean;
  onClose: () => void;
  onSave: () => void;
  formData: GRNFormData;
  setFormData: React.Dispatch<React.SetStateAction<GRNFormData>>;
  items: GRNItem[];
  setItems: React.Dispatch<React.SetStateAction<GRNItem[]>>;
  calculateSubTotal: () => number;
  calculateNetTotal: () => number;
  updateItem: (id: string, field: keyof GRNItem, value: number) => void;
  removeItem: (id: string) => void;
  
}


export function AddNewGRN({
  show,
  onClose,
  onSave,
  formData,
  setFormData,
  items,
  setItems,
  calculateSubTotal,
  calculateNetTotal,
  updateItem,
  removeItem,
  
}: AddNewGRNProps) {
  if (!show) return null;

  

  const [showItemSelector, setShowItemSelector] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-start justify-center z-[100] overflow-y-auto pt-20 pb-10">

      {/* Modal */}
      <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl ml-[160px] flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
          <h3 className="text-lg font-semibold text-gray-900">
            New GRN
          </h3>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1">

          {/* Top Fields */}
          <div className="grid grid-cols-6 gap-4 mb-6">

                        <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                GRN ID *
              </label>

              <input
                type="text"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                GRN Date *
              </label>

              <input
                type="date"
                value={formData.grnDate}
                onChange={(e) =>
                  setFormData({ ...formData, grnDate: e.target.value })
                }
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Supplier Name *
              </label>

              <input
                type="text"
                value={formData.supplierName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    supplierName: e.target.value,
                  })
                }
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                 Invoice Date
              </label>

              <input
                type="date"
                value={formData.invoiceDate}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    invoiceDate: e.target.value,
                  })
                }
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Supplier Invoice No
              </label>

              <input
                type="text"
                value={formData.invoiceNo}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    invoiceNo: e.target.value,
                  })
                }
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Payment Method
              </label>

              <select
                value={formData.paymentMethod}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    paymentMethod: e.target.value,
                    paymentDetails: {} 
                  })
                }
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              >
                <option value="Cash">Cash</option>
                <option value="Credit">Credit</option>
                <option value="Cheque">Cheque</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </select>
            </div>


{formData.paymentMethod === "Credit" && (
  <div className="col-span-6 grid grid-cols-3 gap-4 mt-2">
    
    <input
      type="number"
      placeholder="Credit Period (days)"
      value={formData.paymentDetails.creditPeriod || ""}
      onChange={(e) =>
        setFormData({
          ...formData,
          paymentDetails: {
            ...formData.paymentDetails,
            creditPeriod: e.target.value,
          },
        })
      }
      className="px-3 py-2 border rounded text-sm"
    />

    <input
      type="text"
      placeholder="Remark"
      value={formData.paymentDetails.creditRemark || ""}
      onChange={(e) =>
        setFormData({
          ...formData,
          paymentDetails: {
            ...formData.paymentDetails,
            creditRemark: e.target.value,
          },
        })
      }
      className="px-3 py-2 border rounded text-sm col-span-2"
    />
  </div>
)}

{formData.paymentMethod === "Cheque" && (
  <div className="col-span-6 grid grid-cols-3 gap-4 mt-2">

    <input type="date" placeholder="Cheque Date"
      value={formData.paymentDetails.chequeDate || ""}
      onChange={(e) =>
        setFormData({
          ...formData,
          paymentDetails: {
            ...formData.paymentDetails,
            chequeDate: e.target.value,
          },
        })
      }
      className="px-3 py-2 border rounded text-sm"
    />

    <input type="text" placeholder="Cheque Number"
      value={formData.paymentDetails.chequeNumber || ""}
      onChange={(e) =>
        setFormData({
          ...formData,
          paymentDetails: {
            ...formData.paymentDetails,
            chequeNumber: e.target.value,
          },
        })
      }
      className="px-3 py-2 border rounded text-sm"
    />

    <input type="text" placeholder="From Bank"
      value={formData.paymentDetails.fromBank || ""}
      onChange={(e) =>
        setFormData({
          ...formData,
          paymentDetails: {
            ...formData.paymentDetails,
            fromBank: e.target.value,
          },
        })
      }
      className="px-3 py-2 border rounded text-sm"
    />

    <input type="text" placeholder="To Bank"
      value={formData.paymentDetails.toBank || ""}
      onChange={(e) =>
        setFormData({
          ...formData,
          paymentDetails: {
            ...formData.paymentDetails,
            toBank: e.target.value,
          },
        })
      }
      className="px-3 py-2 border rounded text-sm"
    />

    <input type="text" placeholder="Branch"
      value={formData.paymentDetails.branch || ""}
      onChange={(e) =>
        setFormData({
          ...formData,
          paymentDetails: {
            ...formData.paymentDetails,
            branch: e.target.value,
          },
        })
      }
      className="px-3 py-2 border rounded text-sm"
    />

    <input type="number" placeholder="Amount"
      value={formData.paymentDetails.amount || ""}
      onChange={(e) =>
        setFormData({
          ...formData,
          paymentDetails: {
            ...formData.paymentDetails,
            amount: e.target.value,
          },
        })
      }
      className="px-3 py-2 border rounded text-sm"
    />

    <input type="text" placeholder="Remark"
      value={formData.paymentDetails.chequeRemark || ""}
      onChange={(e) =>
        setFormData({
          ...formData,
          paymentDetails: {
            ...formData.paymentDetails,
            chequeRemark: e.target.value,
          },
        })
      }
      className="px-3 py-2 border rounded text-sm col-span-3"
    />

  </div>
)}


{formData.paymentMethod === "Bank Transfer" && (
  <div className="col-span-6 grid grid-cols-3 gap-4 mt-2">

    <input type="text" placeholder="From Bank"
      value={formData.paymentDetails.transferFromBank || ""}
      onChange={(e) =>
        setFormData({
          ...formData,
          paymentDetails: {
            ...formData.paymentDetails,
            transferFromBank: e.target.value,
          },
        })
      }
      className="px-3 py-2 border rounded text-sm"
    />

    <input type="text" placeholder="To Bank"
      value={formData.paymentDetails.transferToBank || ""}
      onChange={(e) =>
        setFormData({
          ...formData,
          paymentDetails: {
            ...formData.paymentDetails,
            transferToBank: e.target.value,
          },
        })
      }
      className="px-3 py-2 border rounded text-sm"
    />

    <input type="number" placeholder="Amount"
      value={formData.paymentDetails.transferAmount || ""}
      onChange={(e) =>
        setFormData({
          ...formData,
          paymentDetails: {
            ...formData.paymentDetails,
            transferAmount: e.target.value,
          },
        })
      }
      className="px-3 py-2 border rounded text-sm"
    />

    <input type="text" placeholder="Remark"
      value={formData.paymentDetails.transferRemark || ""}
      onChange={(e) =>
        setFormData({
          ...formData,
          paymentDetails: {
            ...formData.paymentDetails,
            transferRemark: e.target.value,
          },
        })
      }
      className="px-3 py-2 border rounded text-sm col-span-3"
    />

  </div>
)}




            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                 Customer PO Date
              </label>

              <input
                type="date"
                value={formData.customerPODate}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    customerPODate: e.target.value,
                  })
                }
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Customer PO Number
              </label>

              <input
                type="text"
                value={formData.customerPONumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    customerPONumber: e.target.value,
                  })
                }
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
  <label className="block text-xs font-medium text-gray-700 mb-1">
    Supplier Inv Image
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files?.[0] || null;
      setFormData({
        ...formData,
        grnImage: file,
      });
    }}
    className="w-full px-3 py-2 text-sm border border-gray-300 rounded bg-white"
  />

  {formData.grnImage && (
    <>
      <p className="text-xs text-green-600 mt-1">
        Selected: {formData.grnImage.name}
      </p>

      <img
        src={URL.createObjectURL(formData.grnImage)}
        alt="Preview"
        className="mt-2 h-24 rounded border"
      />
    </>
  )}
</div>
          </div>
{/* Items */}
<div className="mb-6">

  <div className="flex justify-between items-center mb-3">

    <label className="text-xs font-medium text-gray-700">
      Items
    </label>

<button
  onClick={() => setShowItemSelector(true)}
  className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
>
  <Plus className="w-3 h-3" />
  Add Item
</button>

  </div>

<ItemsTable
  show={showItemSelector}
  onClose={() => setShowItemSelector(false)}
onSelect={(product) => {

  const exists = items.some(item => item.id === product.id);

  if (exists) {
    toast.error("Item already added to GRN");
    return;
  }

  const newItem: GRNItem = {
    id: product.id,
    itemName: product.name,
    itemCode: product.code,
    qty: 1,
    costPrice: product.costPrice,
    total: product.costPrice,
    discount: 0,
  };

  setItems(prev => [...prev, newItem]);

  toast.success("Item added successfully");

}}
/>
</div>

{/* Items & Totals Section */}
{items.length > 0 && (
  <div className="mb-6">

    {/* Items Table */}
    <div className="overflow-auto border border-gray-200 rounded mb-4">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 py-2 font-medium text-gray-700">Code</th>
            <th className="px-3 py-2 font-medium text-gray-700">Name</th>
            <th className="px-3 py-2 font-medium text-gray-700">Qty</th>
            <th className="px-3 py-2 font-medium text-gray-700">Cost Price</th>
            <th className="px-3 py-2 font-medium text-gray-700">Discount</th>
            <th className="px-3 py-2 font-medium text-gray-700">Total</th>
            <th className="px-3 py-2 font-medium text-gray-700 text-center">Actions</th>
          </tr>
        </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="px-3 py-2 font-medium text-gray-800">{item.itemCode}</td>
                <td className="px-3 py-2">{item.itemName}</td>
                <td className="px-3 py-2">
                  <input
                    type="number"
                    value={item.qty}
                    min={1}
                    onChange={(e) =>
                      updateItem(item.id, "qty", parseInt(e.target.value) || 1)
                    }
                    className="w-16 px-2 py-1 border rounded text-sm"
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    type="number"
                    value={item.costPrice}
                    min={0}
                    step={1}
                    onChange={(e) =>
                      updateItem(item.id, "costPrice", parseFloat(e.target.value) || 0)
                    }
                    className="w-20 px-2 py-1 border rounded text-sm"
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    type="number"
                    value={item.discount}
                    min={0}
                    step={1}
                    onChange={(e) =>
                      updateItem(item.id, "discount", parseFloat(e.target.value) || 0)
                    }
                    className="w-20 px-2 py-1 border rounded text-sm"
                  />
                </td>
                <td className="px-3 py-2 font-semibold">
                  Rs. {((item.qty * item.costPrice) - item.discount).toFixed(2)}
                </td>
                <td className="px-3 py-2 text-center">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
      </table>
    </div>

    {/* Sub Total / Discount / Net Total */}
    <div className="flex justify-end">
      <div className="w-64 space-y-2 text-sm">

        <div className="flex justify-between">
          <span>Sub Total</span>
          <span>Rs. {calculateSubTotal().toFixed(2)}</span>
        </div>

        <input
          type="number"
          placeholder="Discount"
          value={formData.discount}
          onChange={(e) =>
            setFormData({
              ...formData,
              discount: e.target.value,
            })
          }
          className="w-full px-3 py-2 border rounded"
        />

        <div className="flex justify-between font-bold text-blue-600">
          <span>Net Total</span>
          <span>Rs. {calculateNetTotal().toFixed(2)}</span>
        </div>
      </div>
    </div>
  </div>
)}

          {/* Remarks */}

          <textarea
            value={formData.remarks}
            onChange={(e) =>
              setFormData({
                ...formData,
                remarks: e.target.value,
              })
            }
            placeholder="Remarks"
            className="w-full px-3 py-2 border rounded"
          />

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-end gap-3 flex-shrink-0">

          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-gray-100 rounded hover:bg-gray-200"
          >
            Cancel
          </button>

          <button
            onClick={onSave}
            disabled={items.length === 0 || !formData.supplierName}
            className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 disabled:bg-gray-300"
          >
            Save GRN
          </button>

        </div>

      </div>

    </div>
  );
}