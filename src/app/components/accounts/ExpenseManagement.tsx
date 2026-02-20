import { useState } from 'react';
import { Plus, Search, X, Edit, Trash2 } from 'lucide-react';

interface Expense {
  id: string;
  expenseDate: string;
  category: string;
  description: string;
  amount: number;
  paymentMethod: string;
  receiptNo?: string;
  addedBy: string;
}

export function ExpenseManagement() {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: 'EXP-001',
      expenseDate: '2026-02-10',
      category: 'Utilities',
      description: 'Electricity Bill - January 2026',
      amount: 15000,
      paymentMethod: 'Bank Transfer',
      receiptNo: 'EB-2026-01',
      addedBy: 'Admin',
    },
    {
      id: 'EXP-002',
      expenseDate: '2026-02-12',
      category: 'Transportation',
      description: 'Fuel for delivery van',
      amount: 8500,
      paymentMethod: 'Cash',
      addedBy: 'Admin',
    },
    {
      id: 'EXP-003',
      expenseDate: '2026-02-15',
      category: 'Rent',
      description: 'Shop Rent - February 2026',
      amount: 45000,
      paymentMethod: 'Cheque',
      receiptNo: 'RENT-FEB-2026',
      addedBy: 'Admin',
    },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [formData, setFormData] = useState({
    expenseDate: new Date().toISOString().split('T')[0],
    category: 'Utilities',
    description: '',
    amount: '',
    paymentMethod: 'Cash',
    receiptNo: '',
  });

  const categories = [
    'Utilities',
    'Rent',
    'Salaries',
    'Transportation',
    'Maintenance',
    'Office Supplies',
    'Marketing',
    'Insurance',
    'Taxes',
    'Other',
  ];

  const handleAdd = () => {
    setFormData({
      expenseDate: new Date().toISOString().split('T')[0],
      category: 'Utilities',
      description: '',
      amount: '',
      paymentMethod: 'Cash',
      receiptNo: '',
    });
    setEditingExpense(null);
    setShowAddForm(true);
  };

  const handleEdit = (expense: Expense) => {
    setFormData({
      expenseDate: expense.expenseDate,
      category: expense.category,
      description: expense.description,
      amount: expense.amount.toString(),
      paymentMethod: expense.paymentMethod,
      receiptNo: expense.receiptNo || '',
    });
    setEditingExpense(expense);
    setShowAddForm(true);
  };

  const handleSave = () => {
    if (editingExpense) {
      setExpenses(
        expenses.map((e) =>
          e.id === editingExpense.id
            ? {
                ...editingExpense,
                expenseDate: formData.expenseDate,
                category: formData.category,
                description: formData.description,
                amount: parseFloat(formData.amount),
                paymentMethod: formData.paymentMethod,
                receiptNo: formData.receiptNo,
              }
            : e
        )
      );
    } else {
      const newExpense: Expense = {
        id: 'EXP-' + (expenses.length + 1).toString().padStart(3, '0'),
        expenseDate: formData.expenseDate,
        category: formData.category,
        description: formData.description,
        amount: parseFloat(formData.amount),
        paymentMethod: formData.paymentMethod,
        receiptNo: formData.receiptNo,
        addedBy: 'Admin',
      };
      setExpenses([...expenses, newExpense]);
    }
    setShowAddForm(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this expense?')) {
      setExpenses(expenses.filter((e) => e.id !== id));
    }
  };

  const filteredExpenses = expenses.filter(
    (expense) =>
      expense.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Expense Management</h2>
          <p className="text-xs text-gray-600 mt-1">Track all business expenses</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Expense
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4 col-span-1">
          <p className="text-xs text-gray-600 mb-1">Total Expenses</p>
          <p className="text-2xl font-bold text-red-600">Rs. {totalExpenses.toLocaleString()}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 col-span-3">
          <p className="text-xs text-gray-600 mb-2">Expenses by Category</p>
          <div className="flex gap-4 flex-wrap">
            {Object.entries(categoryTotals)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 5)
              .map(([category, amount]) => (
                <div key={category} className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-700">{category}:</span>
                  <span className="text-xs font-semibold text-gray-900">Rs. {amount.toLocaleString()}</span>
                </div>
              ))}
          </div>
        </div>
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
            placeholder="Search expenses..."
          />
        </div>
      </div>

      {/* Expenses Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-xs">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Expense ID</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Date</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Category</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Description</th>
              <th className="px-4 py-3 text-right font-medium text-gray-700">Amount</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Payment Method</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Receipt No</th>
              <th className="px-4 py-3 text-center font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((expense) => (
              <tr key={expense.id} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-blue-600">{expense.id}</td>
                <td className="px-4 py-3">{new Date(expense.expenseDate).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs">{expense.category}</span>
                </td>
                <td className="px-4 py-3">{expense.description}</td>
                <td className="px-4 py-3 text-right font-semibold text-red-600">Rs. {expense.amount.toLocaleString()}</td>
                <td className="px-4 py-3">{expense.paymentMethod}</td>
                <td className="px-4 py-3 text-gray-600">{expense.receiptNo || '-'}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(expense)}
                      className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(expense.id)}
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
      {showAddForm && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-start justify-center z-[100] overflow-y-auto pt-20 pb-10">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl my-auto mx-4">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingExpense ? 'Edit Expense' : 'Add New Expense'}
              </h3>
              <button onClick={() => setShowAddForm(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Expense Date *</label>
                    <input
                      type="date"
                      value={formData.expenseDate}
                      onChange={(e) => setFormData({ ...formData, expenseDate: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Enter expense description..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Amount *</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Payment Method *</label>
                    <select
                      value={formData.paymentMethod}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Cash">Cash</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Cheque">Cheque</option>
                      <option value="Card">Card</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Receipt/Reference No</label>
                  <input
                    type="text"
                    value={formData.receiptNo}
                    onChange={(e) => setFormData({ ...formData, receiptNo: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Optional"
                  />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!formData.description || !formData.amount}
                className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {editingExpense ? 'Update' : 'Add'} Expense
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}