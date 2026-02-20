import { useState } from 'react';
import {
  FileText,
  Users,
  Package,
  Truck,
  DollarSign,
  ClipboardList,
  FileCheck,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  children?: {
    id: string;
    label: string;
  }[];
}

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['invoice']);

  const menuItems: MenuItem[] = [
    {
      id: 'invoice',
      label: 'Invoice',
      icon: <FileText className="w-4 h-4" />,
      children: [
        { id: 'invoice-new', label: 'New Invoice' },
        { id: 'invoice-all', label: 'View All Invoices' },
        { id: 'invoice-pending', label: 'Pending Invoices' },
      ],
    },
    {
      id: 'customers',
      label: 'Customers',
      icon: <Users className="w-4 h-4" />,
      children: [
        { id: 'customers-new', label: 'Add Customer' },
        { id: 'customers-all', label: 'View All Customers' },
      ],
    },
    {
      id: 'stock',
      label: 'Stock',
      icon: <Package className="w-4 h-4" />,
      children: [
        { id: 'stock-items', label: 'Items' },
        { id: 'stock-add', label: 'Add New Item' },
        { id: 'stock-categories', label: 'Categories' },
        { id: 'stock-low', label: 'Low Stock Items' },
      ],
    },
    {
      id: 'suppliers',
      label: 'Suppliers',
      icon: <Truck className="w-4 h-4" />,
      children: [
        { id: 'suppliers-new', label: 'Add Supplier' },
        { id: 'suppliers-all', label: 'View All Suppliers' },
        { id: 'suppliers-outstandings', label: 'Outstandings' },
      ],
    },
    {
      id: 'accounts',
      label: 'Accounts',
      icon: <DollarSign className="w-4 h-4" />,
      children: [
        { id: 'accounts-dashboard', label: 'Dashboard' },
        { id: 'accounts-reports', label: 'Reports' },
        { id: 'accounts-expenses', label: 'Expenses' },
      ],
    },
    {
      id: 'po-grn',
      label: 'PO & GRN',
      icon: <ClipboardList className="w-4 h-4" />,
      children: [
        { id: 'po-new', label: 'New Purchase Order' },
        { id: 'po-all', label: 'View All PO' },
        { id: 'grn-new', label: 'New GRN' },
        { id: 'grn-all', label: 'View All GRN' },
      ],
    },
    {
      id: 'quotation',
      label: 'Quotation',
      icon: <FileCheck className="w-4 h-4" />,
      children: [
        { id: 'quotation-new', label: 'New Quotation' },
        { id: 'quotation-all', label: 'View All Quotations' },
      ],
    },
  ];

  const toggleMenu = (menuId: string) => {
    setExpandedMenus((prev) =>
      prev.includes(menuId)
        ? prev.filter((id) => id !== menuId)
        : [...prev, menuId]
    );
  };

  return (
    <aside className="w-64 bg-slate-800 text-slate-200 fixed left-0 top-14 bottom-0 overflow-y-auto z-20 shadow-xl">
      <nav className="py-4">
        {menuItems.map((item) => (
          <div key={item.id} className="mb-1">
            <button
              onClick={() => {
                if (item.children) {
                  toggleMenu(item.id);
                } else {
                  onSectionChange(item.id);
                }
              }}
              className={`w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-slate-700 transition-colors ${
                activeSection.startsWith(item.id) ? 'bg-slate-700 text-white' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span>{item.label}</span>
              </div>
              {item.children && (
                expandedMenus.includes(item.id) ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )
              )}
            </button>

            {item.children && expandedMenus.includes(item.id) && (
              <div className="bg-slate-900">
                {item.children.map((child) => (
                  <button
                    key={child.id}
                    onClick={() => onSectionChange(child.id)}
                    className={`w-full text-left px-11 py-2 text-xs hover:bg-slate-700 transition-colors ${
                      activeSection === child.id ? 'bg-blue-600 text-white' : ''
                    }`}
                  >
                    {child.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}