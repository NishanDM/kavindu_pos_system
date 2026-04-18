import { useState } from 'react';
import { Toaster } from "react-hot-toast";
import { Login } from './components/Login';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { NotificationPanel } from './components/NotificationPanel';

import { NewInvoice } from './components/invoice/NewInvoice';
import { ViewAllInvoices } from './components/invoice/ViewAllInvoices';
import { InvoiceReports } from './components/invoice/InvoiceReports';


import { StockItems } from './components/stock/StockItems';
import { AddItem } from './components/stock/AddItem';
import { StockReports } from './components/stock/StockReports';


import { CustomerManagement } from './components/customers/CustomerManagement';
import { CustomerOutstandings}  from './components/customers/CustomerOutstandings';
import {CustomerCreditNotes}  from './components/customers/CustomerCreditNotes';
import { CustomerSettlements } from './components/customers/CustomerSettlements';
import { CustomerReports } from './components/customers/CustomerReports';


import { SupplierManagement } from './components/suppliers/SupplierManagement';
import { SupplierOutstandings } from './components/suppliers/SupplierOutstandings';
import {SupplierSettlements} from './components/suppliers/SupplierSettlements';
import {SupplierReports} from './components/suppliers/SupplierReports';


import { GRNManagement } from './components/grn/GRNManagement';
import { GRNSettlement } from './components/grn/GRNSettlement';
import {GrnReports} from './components/grn/GrnReports';
import { PurchaseOrderManagement } from './components/po/PurchaseOrderManagement';


import { QuotationManagement } from './components/quotation/QuotationManagement';
import { QuotationReports } from './components/quotation/QuotationReports';


import { AccountsDashboard } from './components/accounts/AccountsDashboard';
import { ExpenseManagement } from './components/accounts/ExpenseManagement';
import { AccountsReprts } from './components/accounts/AccountsReports';




export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ name: '', email: '', userType: '' });
  const [activeSection, setActiveSection] = useState('accounts-dashboard');
  const [showNotifications, setShowNotifications] = useState(false);
  
  // State for invoices
  const [invoices, setInvoices] = useState<any[]>([
    {
      id: 'INV-001',
      date: '2026-02-08',
      customer: { name: 'John Auto Parts', phone: '+94771234567' },
      paymentMethod: 'Credit',
      salesRef: 'Sarah',
      items: [],
      subTotal: 45000,
      discount: 2000,
      netTotal: 43000,
      settled: false,
    },
    {
      id: 'INV-002',
      date: '2026-02-09',
      customer: { name: 'Lanka Motors', phone: '+94779876543' },
      paymentMethod: 'Cash',
      salesRef: 'Mike',
      items: [],
      subTotal: 28500,
      discount: 500,
      netTotal: 28000,
      settled: true,
    },
  ]);

  // State for stock items
  const [stockItems, setStockItems] = useState<any[]>([
    {
      id: '1',
      itemName: 'Engine Oil 10W-40',
      itemCode: 'EO-001',
      brand: 'Castrol',
      partNumber: 'CTL-10W40-1L',
      category: 'oil',
      qty: 5,
      reorderLevel: 10,
      costPrice: 1200,
      sellingPrice: 1500,
      status: 'active',
      supplier: 'ABC Auto Parts Ltd',
    },
    {
      id: '2',
      itemName: 'Brake Pad Set',
      itemCode: 'BP-102',
      brand: 'Brembo',
      partNumber: 'BRB-BP-SET-001',
      category: 'body parts',
      qty: 3,
      reorderLevel: 5,
      costPrice: 2000,
      sellingPrice: 2500,
      status: 'active',
      supplier: 'Premium Motor Parts',
    },
    {
      id: '3',
      itemName: 'Chain Sprocket Kit',
      itemCode: 'CS-203',
      brand: 'RK',
      partNumber: 'RK-CSK-520',
      category: 'engine parts',
      qty: 20,
      reorderLevel: 8,
      costPrice: 2800,
      sellingPrice: 3500,
      status: 'active',
      supplier: 'ABC Auto Parts Ltd',
    },
    {
      id: '4',
      itemName: 'Air Filter',
      itemCode: 'AF-304',
      brand: 'Mann',
      partNumber: 'MNN-AF-001',
      category: 'engine parts',
      qty: 45,
      reorderLevel: 15,
      costPrice: 600,
      sellingPrice: 800,
      status: 'active',
      supplier: 'Premium Motor Parts',
    },
    {
      id: '5',
      itemName: 'Spark Plug',
      itemCode: 'SP-405',
      brand: 'NGK',
      partNumber: 'NGK-SP-CR7',
      category: 'electrical parts',
      qty: 100,
      reorderLevel: 30,
      costPrice: 350,
      sellingPrice: 450,
      status: 'active',
      supplier: 'ABC Auto Parts Ltd',
    },
  ]);

  const handleLogin = (email: string, userType: string, name: string) => {
    setUser({ name, email, userType });
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser({ name: '', email: '', userType: '' });
    setActiveSection('accounts-dashboard');
  };

  const handleSaveInvoice = (invoice: any) => {
    setInvoices([invoice, ...invoices]);
    setActiveSection('invoice-all');
  };

  const handleEditInvoice = (invoice: any) => {
    console.log('Edit invoice:', invoice);
    setActiveSection('invoice-new');
  };

  const handleDeleteInvoice = (id: string) => {
    if (confirm('Are you sure you want to delete this invoice?')) {
      setInvoices(invoices.filter(inv => inv.id !== id));
    }
  };

  const handleSaveItem = (item: any) => {
    setStockItems([...stockItems, item]);
    setActiveSection('stock-items');
  };

  const handleEditItem = (item: any) => {
    console.log('Edit item:', item);
    setActiveSection('stock-add');
  };

  const handleDeleteItem = (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      setStockItems(stockItems.filter(item => item.id !== id));
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      // Invoice sections
      case 'invoice-new':   return <NewInvoice onSave={handleSaveInvoice} />;
      case 'invoice-all':
        return (
          <ViewAllInvoices
            invoices={invoices}
            onEdit={handleEditInvoice}
            onDelete={handleDeleteInvoice}
          />
        );

      // Stock sections
      case 'stock-items':
      case 'stock-low':
        return (
          <StockItems
            items={stockItems}
            onEdit={handleEditItem}
            onDelete={handleDeleteItem}
          />
        );
      case 'stock-add':   return <AddItem onSave={handleSaveItem} />;
      case 'stock-categories':
        return (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Categories</h2>
            <div className="grid grid-cols-3 gap-4">
              {['oil', 'grease', 'sealant', 'engine parts', 'bearing', 'belt', 'body parts', 'electrical parts', 'battery'].map(cat => (
                <div key={cat} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <p className="text-sm font-medium text-gray-900 capitalize">{cat}</p>
                  <p className="text-xs text-gray-600 mt-1">
                    {stockItems.filter(item => item.category === cat).length} items
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      // Customer section
      case 'customers-new':
      case 'customers-all':  return <CustomerManagement />;
      case 'customers-outstanding': return < CustomerOutstandings/>
      case 'customers-credit-note':  return < CustomerCreditNotes/>
      case 'customers-settlement':  return < CustomerSettlements/>

  

      // Supplier section
      case 'suppliers-new':
      case 'suppliers-all':  return <SupplierManagement />;
      case 'suppliers-settlements': return <SupplierSettlements/>
      case 'suppliers-outstandings':  return <SupplierOutstandings />;
      

      // Accounts sections
      case 'accounts-dashboard':  return <AccountsDashboard />;
      case 'accounts-expenses':     return <ExpenseManagement />;
    

      // PO & GRN sections
      case 'po-new':
      case 'po-all':   return <PurchaseOrderManagement />;
      case 'grn-settlement':   return <GRNSettlement/>
      case 'grn-all':   return <GRNManagement />;
      

      // Quotation sections
      case 'quotation-new':
      case 'quotation-all':   return <QuotationManagement />;
      

      default:  return <AccountsDashboard />;
      
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  // Count low stock items for notifications
  const lowStockCount = stockItems.filter(item => item.qty <= item.reorderLevel).length;
  const notificationCount = lowStockCount + 2; // + payment dues and outstanding

  return (
<>
 <Toaster position="top-right" reverseOrder={false} />
    <div className="h-screen w-screen overflow-hidden bg-gray-50">
      <Header
        user={user}
        onLogout={handleLogout}
        notifications={notificationCount}
        onNotificationClick={() => setShowNotifications(true)}
      />
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <main className="fixed left-40 right-0 top-14 bottom-0 overflow-y-auto">
        {renderContent()}
      </main>

      <NotificationPanel
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </div>
</>
  );
}