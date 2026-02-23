import { X, Plus, Trash2 } from 'lucide-react';

interface QuotationItem {
  id: string;
  itemName: string;
  itemCode: string;
  qty: number;
  unitPrice: number;
  discount: number;
  total: number;
}

interface Props {
  show: boolean;
  onClose: () => void;
  formData: any;
  setFormData: any;
  items: QuotationItem[];
  setShowItemSearch: (value: boolean) => void;
  updateItem: (id: string, field: keyof QuotationItem, value: number) => void;
  removeItem: (id: string) => void;
  calculateSubTotal: () => number;
  calculateTotalDiscount: () => number;
  calculateTotal: () => number;
  handleSave: () => void;
}

export default function NewQuotation({
  show,
  onClose,
  formData,
  setFormData,
  items,
  setShowItemSearch,
  updateItem,
  removeItem,
  calculateSubTotal,
  calculateTotalDiscount,
  calculateTotal,
  handleSave,
}: Props) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[100] flex justify-center items-center p-4">
      
      {/* Modal container */}
      <div className="bg-white w-full max-w-7xl ml-[120px] mt-25 mb-10 rounded-lg shadow-xl flex flex-col max-h-[90vh]">

        {/* HEADER (FIXED) */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 flex-shrink-0">
          <h3 className="text-lg font-semibold">New Quotation</h3>

          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
          </button>
        </div>


        {/* SCROLLABLE BODY */}
        <div className="overflow-y-auto p-6 flex-1">

          {/* FORM */}
          <div className="grid grid-cols-2 gap-4 mb-6">

            <div>
              <label className="block text-xs font-medium mb-1">
                Quotation Date *
              </label>

              <input
                type="date"
                value={formData.quotationDate}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    quotationDate: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded text-sm"
              />
            </div>


            <div>
              <label className="block text-xs font-medium mb-1">
                Valid Until *
              </label>

              <input
                type="date"
                value={formData.validUntil}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    validUntil: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded text-sm"
              />
            </div>


            <div>
              <label className="block text-xs font-medium mb-1">
                Customer Name *
              </label>

              <input
                type="text"
                value={formData.customerName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    customerName: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded text-sm"
              />
            </div>


            <div>
              <label className="block text-xs font-medium mb-1">
                Customer Phone
              </label>

              <input
                type="tel"
                value={formData.customerPhone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    customerPhone: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded text-sm"
              />
            </div>

          </div>


          {/* ITEMS */}
          <div className="mb-6">

            <div className="flex justify-between mb-3">

              <label className="text-xs font-medium">
                Items
              </label>

              <button
                onClick={() => setShowItemSearch(true)}
                className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded text-xs"
              >
                <Plus className="w-3 h-3" />
                Add Item
              </button>

            </div>


            {items.length > 0 && (

              <table className="w-full text-xs border">

                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-2 text-left">Item</th>
                    <th className="p-2 text-left">Code</th>
                    <th className="p-2 text-right">Qty</th>
                    <th className="p-2 text-right">Unit Price</th>
                    <th className="p-2 text-right">Discount</th>
                    <th className="p-2 text-right">Total</th>
                    <th className="p-2 text-right"></th>
                  </tr>
                </thead>

                <tbody>

                  {items.map((item) => (

                    <tr key={item.id} className="border-t">

                      <td className="p-2">{item.itemName}</td>

                      <td className="p-2">{item.itemCode}</td>

                      <td className="p-2 text-right">
                        <input
                          type="number"
                          value={item.qty}
                          onChange={(e) =>
                            updateItem(
                              item.id,
                              'qty',
                              parseInt(e.target.value) || 0
                            )
                          }
                          className="w-16 border rounded px-1 py-0.5 text-right"
                        />
                      </td>

                      <td className="p-2 text-right">
                        <input
                          type="number"
                          value={item.unitPrice}
                          onChange={(e) =>
                            updateItem(
                              item.id,
                              'unitPrice',
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className="w-20 border rounded px-1 py-0.5 text-right"
                        />
                      </td>

                      <td className="p-2 text-right">
                        <input
                          type="number"
                          value={item.discount}
                          onChange={(e) =>
                            updateItem(
                              item.id,
                              'discount',
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className="w-20 border rounded px-1 py-0.5 text-right"
                        />
                      </td>

                      <td className="p-2 text-right">
                        Rs. {item.total.toFixed(2)}
                      </td>

                      <td>
                        <button onClick={() => removeItem(item.id)}>
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            )}

          </div>


          {/* TOTAL */}
          {items.length > 0 && (

            <div className="flex justify-end mb-6">

              <div className="w-64 text-sm space-y-1">

                <div className="flex justify-between">
                  <span>Sub Total</span>
                  <span>Rs. {calculateSubTotal().toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-red-600">
                  <span>Discount</span>
                  <span>
                    - Rs. {calculateTotalDiscount().toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between font-bold border-t pt-1">
                  <span>Total</span>
                  <span className="text-blue-600">
                    Rs. {calculateTotal().toFixed(2)}
                  </span>
                </div>

              </div>

            </div>

          )}


          {/* REMARKS */}
          <textarea
            value={formData.remarks}
            onChange={(e) =>
              setFormData({
                ...formData,
                remarks: e.target.value,
              })
            }
            className="w-full border rounded px-3 py-2 text-sm"
            rows={3}
            placeholder="Remarks..."
          />

        </div>


        {/* FOOTER (FIXED) */}
        <div className="border-t p-4 flex justify-end gap-2 flex-shrink-0">

          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded text-sm"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={items.length === 0 || !formData.customerName}
            className="px-4 py-2 bg-blue-600 text-white rounded text-sm disabled:bg-gray-300"
          >
            Create Quotation
          </button>

        </div>

      </div>

    </div>
  );
}