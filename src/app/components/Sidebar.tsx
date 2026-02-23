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
  const [expandedMenu, setExpandedMenu] = useState<string | null>('invoice');

  const menuItems: MenuItem[] = [
    {
      id: 'invoice',
      label: 'Invoice',
      icon: <FileText className="w-4 h-4" />,
      children: [
        { id: 'invoice-new', label: 'New Invoice' },
        { id: 'invoice-all', label: 'View All' },
      ],
    },
    {
      id: 'customers',
      label: 'Customers',
      icon: <Users className="w-4 h-4" />,
      children: [
        
        { id: 'customers-all', label: 'View All' },
        { id: 'customers-outstanding', label: 'Outstanding' },
        { id: 'customers-credit-note', label: 'Credit Note' },
        { id: 'customers-settlement', label: 'Settlement' },
      ],
    },
    {
      id: 'stock',
      label: 'Stock',
      icon: <Package className="w-4 h-4" />,
      children: [
        { id: 'stock-items', label: 'Items' },
        { id: 'stock-add', label: 'Add New' },
        { id: 'stock-categories', label: 'Categories' },
      ],
    },
    {
      id: 'suppliers',
      label: 'Suppliers',
      icon: <Truck className="w-4 h-4" />,
      children: [
        { id: 'suppliers-all', label: 'View All' },
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
        { id: 'po-all', label: 'All PO' },
        { id: 'grn-all', label: 'All GRN' },
        { id: 'grn-settlement', label: 'Settlement' },
      ],
    },
    {
      id: 'quotation',
      label: 'Quotation',
      icon: <FileCheck className="w-4 h-4" />,
      children: [
        { id: 'quotation-new', label: 'New' },
        { id: 'quotation-all', label: 'View All' },
      ],
    },
  ];

const toggleMenu = (menuId: string) => {
  setExpandedMenu((prev) => (prev === menuId ? null : menuId));
};

  return (
    <aside className="w-40 bg-slate-800 text-slate-200 fixed left-0 top-14 bottom-0 overflow-y-auto z-20 shadow-xl">
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
                expandedMenu === item.id ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )
              )}
            </button>

{item.children && expandedMenu === item.id && (
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