import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Shirt, PackageSearch, Settings as SettingsIcon, Loader, Package, AlertTriangle, BarChart } from 'lucide-react';
import { Logo } from './components/layout/Logo';
import { Dashboard } from './pages/Dashboard';
import { LinenManagement } from './pages/LinenManagement';
import { LaundryOrders } from './pages/LaundryOrders';
import { LaundryProcess } from './pages/LaundryProcess';
import { Settings } from './pages/Settings';
import { Inventory } from './pages/Inventory';
import { LossManagement } from './pages/LossManagement';
import { Reports } from './pages/Reports';

const SidebarLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
        isActive 
          ? 'bg-axonic-yellow text-axonic-primary' 
          : 'text-axonic-primary hover:bg-axonic-yellow/10'
      }`}
    >
      {children}
    </Link>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg">
          <div className="p-6 border-b border-gray-100">
            <Logo />
          </div>
          <nav className="mt-6 px-4 space-y-1">
            <SidebarLink to="/">
              <LayoutDashboard className="w-5 h-5 mr-3" />
              Dashboard
            </SidebarLink>
            <SidebarLink to="/linen">
              <Shirt className="w-5 h-5 mr-3" />
              Linen Management
            </SidebarLink>
            <SidebarLink to="/inventory">
              <Package className="w-5 h-5 mr-3" />
              Inventory
            </SidebarLink>
            <SidebarLink to="/laundry">
              <PackageSearch className="w-5 h-5 mr-3" />
              Laundry Orders
            </SidebarLink>
            <SidebarLink to="/process">
              <Loader className="w-5 h-5 mr-3" />
              Process Management
            </SidebarLink>
            <SidebarLink to="/loss">
              <AlertTriangle className="w-5 h-5 mr-3" />
              Loss Management
            </SidebarLink>
            <SidebarLink to="/reports">
              <BarChart className="w-5 h-5 mr-3" />
              Reports & Analytics
            </SidebarLink>
            <SidebarLink to="/settings">
              <SettingsIcon className="w-5 h-5 mr-3" />
              Settings
            </SidebarLink>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/linen" element={<LinenManagement />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/laundry" element={<LaundryOrders />} />
              <Route path="/process" element={<LaundryProcess />} />
              <Route path="/loss" element={<LossManagement />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;