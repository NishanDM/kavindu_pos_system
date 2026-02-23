import { useState, useMemo } from "react";
import { Search, Filter, AlertCircle } from "lucide-react";

interface Product {
  id: string;
  name: string;
  code: string;
  supplierItemCode: string;
  brand?: string;
  partNumber?: string;
  category?: string;
  qty?: number;
  reorderLevel?: number;
  costPrice: number;
  sellingPrice:number,
  status?: "active" | "inactive" | "discontinued";
}

interface SelectItemForGRNProps {
  show: boolean;
  onClose: () => void;
  onSelect: (product: Product) => void;
  products?: Product[];
}

export function ItemsTable({
  show,
  onClose,
  onSelect,
}: SelectItemForGRNProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  
  const products: Product[] = [
  { id: "1", name: "Laptop Pro", code: "LP100", brand: "TechCorp", partNumber: "TC-LP-001", supplierItemCode: "SUP-LP-001", category: "Electronics", qty: 25, reorderLevel: 10, costPrice: 1200, sellingPrice: 1440, status: "active" },
  { id: "2", name: "Wireless Mouse", code: "WM200", brand: "Clicky", partNumber: "CL-WM-002", supplierItemCode: "SUP-WM-002", category: "Electronics", qty: 5, reorderLevel: 10, costPrice: 25, sellingPrice: 30, status: "active" },
  { id: "3", name: "Office Chair", code: "OC300", brand: "ComfortSeat", partNumber: "CS-OC-003", supplierItemCode: "SUP-OC-003", category: "Furniture", qty: 2, reorderLevel: 5, costPrice: 150, sellingPrice: 180, status: "active" },
  { id: "4", name: "Desk Lamp", code: "DL400", brand: "BrightLite", partNumber: "BL-DL-004", supplierItemCode: "SUP-DL-004", category: "Furniture", qty: 12, reorderLevel: 5, costPrice: 35, sellingPrice: 42, status: "inactive" },
  { id: "5", name: "USB-C Cable", code: "UC500", brand: "CablePro", partNumber: "CP-UC-005", supplierItemCode: "SUP-UC-005", category: "Electronics", qty: 50, reorderLevel: 30, costPrice: 10, sellingPrice: 12, status: "active" },
  { id: "6", name: "Notebook", code: "NB600", brand: "PaperWorks", partNumber: "PW-NB-006", supplierItemCode: "SUP-NB-006", category: "Stationery", qty: 100, reorderLevel: 50, costPrice: 5, sellingPrice: 6, status: "active" },
  { id: "7", name: "Pen Set", code: "PS700", brand: "WriteWell", partNumber: "WW-PS-007", supplierItemCode: "SUP-PS-007", category: "Stationery", qty: 20, reorderLevel: 25, costPrice: 12, sellingPrice: 14.4, status: "discontinued" },
  { id: "8", name: "Monitor 24\"", code: "M2400", brand: "ViewTech", partNumber: "VT-M24-008", supplierItemCode: "SUP-M24-008", category: "Electronics", qty: 8, reorderLevel: 10, costPrice: 200, sellingPrice: 240, status: "active" },
  { id: "9", name: "Keyboard", code: "KB900", brand: "KeyMasters", partNumber: "KM-KB-009", supplierItemCode: "SUP-KB-009", category: "Electronics", qty: 15, reorderLevel: 10, costPrice: 45, sellingPrice: 54, status: "active" },
  { id: "10", name: "Stapler", code: "ST1000", brand: "OfficePro", partNumber: "OP-ST-010", supplierItemCode: "SUP-ST-010", category: "Stationery", qty: 0, reorderLevel: 10, costPrice: 8, sellingPrice: 9.6, status: "inactive" },
  { id: "11", name: "Filing Cabinet", code: "FC1100", brand: "SafeStore", partNumber: "SS-FC-011", supplierItemCode: "SUP-FC-011", category: "Furniture", qty: 3, reorderLevel: 2, costPrice: 300, sellingPrice: 360, status: "active" },
  { id: "12", name: "Desk Organizer", code: "DO1200", brand: "OrganizeIt", partNumber: "OI-DO-012", supplierItemCode: "SUP-DO-012", category: "Furniture", qty: 6, reorderLevel: 5, costPrice: 20, sellingPrice: 24, status: "active" },
  { id: "13", name: "HDMI Cable", code: "HC1300", brand: "CablePro", partNumber: "CP-HC-013", supplierItemCode: "SUP-HC-013", category: "Electronics", qty: 25, reorderLevel: 15, costPrice: 15, sellingPrice: 18, status: "active" },
  { id: "14", name: "Printer Ink", code: "PI1400", brand: "PrintMax", partNumber: "PM-PI-014", supplierItemCode: "SUP-PI-014", category: "Electronics", qty: 0, reorderLevel: 5, costPrice: 50, sellingPrice: 60, status: "discontinued" },
  { id: "15", name: "Whiteboard", code: "WB1500", brand: "BoardPro", partNumber: "BP-WB-015", supplierItemCode: "SUP-WB-015", category: "Furniture", qty: 7, reorderLevel: 5, costPrice: 100, sellingPrice: 120, status: "active" },
  { id: "16", name: "Marker Set", code: "MS1600", brand: "WriteWell", partNumber: "WW-MS-016", supplierItemCode: "SUP-MS-016", category: "Stationery", qty: 30, reorderLevel: 20, costPrice: 15, sellingPrice: 18, status: "active" },
  { id: "17", name: "Laptop Stand", code: "LS1700", brand: "TechCorp", partNumber: "TC-LS-017", supplierItemCode: "SUP-LS-017", category: "Electronics", qty: 4, reorderLevel: 5, costPrice: 45, sellingPrice: 54, status: "active" },
  { id: "18", name: "Paper Clips", code: "PC1800", brand: "PaperWorks", partNumber: "PW-PC-018", supplierItemCode: "SUP-PC-018", category: "Stationery", qty: 200, reorderLevel: 100, costPrice: 1, sellingPrice: 1.2, status: "active" },
  { id: "19", name: "Desk Chair Mat", code: "CM1900", brand: "ComfortSeat", partNumber: "CS-CM-019", supplierItemCode: "SUP-CM-019", category: "Furniture", qty: 10, reorderLevel: 5, costPrice: 40, sellingPrice: 48, status: "active" },
  { id: "20", name: "External Hard Drive", code: "HD2000", brand: "StoragePro", partNumber: "SP-HD-020", supplierItemCode: "SUP-HD-020", category: "Electronics", qty: 12, reorderLevel: 10, costPrice: 150, sellingPrice: 180, status: "inactive" },
];
  // categories (can be dynamic)
  const categories = useMemo(() => {
    const unique = new Set(products.map((p) => p.category).filter(Boolean));
    return Array.from(unique) as string[];
  }, [products]);

  // filtering
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.supplierItemCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.brand || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.partNumber || "").toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        filterCategory === "all" || product.category === filterCategory;

      const matchesStatus =
        filterStatus === "all" || product.status === filterStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [products, searchQuery, filterCategory, filterStatus]);

  const lowStockItems = products.filter(
    (p) => p.qty !== undefined && p.reorderLevel !== undefined && p.qty <= p.reorderLevel
  );

  const totalStockValue = products.reduce(
    (sum, p) => sum + (p.qty || 0) * p.costPrice,
    0
  );

  // **only now** can we conditionally return null
  if (!show) return null;


  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-[200]">

      {/* Modal */}
      <div className="bg-white w-[1160px] max-w-[95vw] max-h-[80vh] ml-[160px] rounded-lg shadow-xl border border-gray-200 flex flex-col">

        {/* Header */}
        <div className="p-2 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Select Item for GRN 
            </h2>
          </div>

          <button
            onClick={onClose}
            className="px-3 py-1 text-xs bg-gray-100 hover:text-white hover:bg-red-500 rounded cursor-pointer"
          >
            X
          </button>
        </div>

        {/* Low Stock Alert */}
        {/* {lowStockItems.length > 0 && (
          <div className="mx-4 mt-4 bg-red-50 border border-red-200 rounded-lg p-3 flex gap-2 items-start">
            <AlertCircle className="w-4 h-4 text-red-600 mt-0.5" />
            <div className="text-xs">
              <p className="font-medium text-red-800">
                Low stock warning
              </p>
              <p className="text-red-700">
                {lowStockItems.length} item(s) below reorder level
              </p>
            </div>
          </div>
        )} */}

        {/* Filters */}
        <div className="p-4 border-b border-gray-200 flex gap-3">

          {/* Search */}
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />

            <input
              type="text"
              placeholder="Search by name, code, brand or part number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-600" />

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>

              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="discontinued">Discontinued</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-auto flex-1">

          <table className="w-full text-xs">

            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-3 py-3 text-left font-medium text-gray-700">
                  Code
                </th>

                <th className="px-3 py-3 text-left font-medium text-gray-700">
                  Sup: Code
                </th>

                <th className="px-3 py-3 text-left font-medium text-gray-700">
                  Name
                </th>

                <th className="px-3 py-3 text-left font-medium text-gray-700">
                  Brand
                </th>

                <th className="px-3 py-3 text-left font-medium text-gray-700">
                  Category
                </th>

                <th className="px-3 py-3 text-right font-medium text-gray-700">
                  Qty
                </th>

                <th className="px-3 py-3 text-right font-medium text-gray-700">
                  Cost Price
                </th>

                 <th className="px-3 py-3 text-right font-medium text-gray-700">
                  Selling Price
                </th>

                <th className="px-3 py-3 text-center font-medium text-gray-700">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-8 text-gray-500"
                  >
                    No items found
                  </td>
                </tr>
              )}

              {filteredProducts.map((product) => {
                const isLow =
                  product.qty !== undefined &&
                  product.reorderLevel !== undefined &&
                  product.qty <= product.reorderLevel;

                return (
                  <tr
                    key={product.id}
                    onClick={() => {
                      onSelect(product);
                      onClose();
                    }}
                    className={`border-t border-gray-200 cursor-pointer hover:bg-gray-50 ${
                      isLow ? "bg-red-50" : ""
                    }`}
                  >
                    <td className="px-3 py-1.5 font-medium text-blue-600">
                      {product.code}
                    </td>

                    <td className="px-3 py-1.5 font-medium text-blue-600">
                      {product.supplierItemCode}
                    </td>

                    <td className="px-3 py-1.5">
                      {product.name}
                    </td>

                    <td className="px-3 py-1.5">
                      {product.brand || "-"}
                    </td>

                    <td className="px-3 py-1.5">
                      {product.category || "-"}
                    </td>

                    <td className="px-3 py-1.5 text-right">
                      {product.qty ?? "-"}
                      {isLow && (
                        <AlertCircle className="inline w-3 h-3 ml-1 text-red-600" />
                      )}
                    </td>

                    <td className="px-3 py-1.5 text-right font-semibold">
                      Rs. {product.costPrice.toFixed(2)}
                    </td>

                    <td className="px-3 py-1.5 text-right font-semibold">
                      Rs. {product.sellingPrice.toFixed(2)}
                    </td>

                    <td className="px-3 py-1.5 text-center">
                      {product.status ? (
                        <span
                          className={`px-2 py-0.5 rounded text-xs ${
                            product.status === "active"
                              ? "bg-green-100 text-green-700"
                              : product.status === "inactive"
                              ? "bg-gray-100 text-gray-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {product.status}
                        </span>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>

          </table>

        </div>

        {/* Footer Summary */}
        <div className="grid grid-cols-3 gap-3 p-4 border-t border-gray-200">

          {/* <div className="bg-blue-50 border border-blue-200 rounded p-3">
            <p className="text-xs text-blue-700">Total Items</p>
            <p className="text-lg font-bold text-blue-900">
              {products.length}
            </p>
          </div>

          <div className="bg-red-50 border border-red-200 rounded p-3">
            <p className="text-xs text-red-700">Low Stock</p>
            <p className="text-lg font-bold text-red-900">
              {lowStockItems.length}
            </p>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded p-3">
            <p className="text-xs text-purple-700">
              Total Stock Value
            </p>
            <p className="text-lg font-bold text-purple-900">
              Rs. {totalStockValue.toFixed(2)}
            </p>
          </div> */}

        </div>

      </div>

    </div>
  );
}