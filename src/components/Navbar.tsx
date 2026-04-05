import React from 'react';
import { useAppStore } from '../store/useAppStore';
import type { UserRole } from '../types';
import { Shield, Eye, Menu, X, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  toggleDark: () => void;
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDark, sidebarOpen, setSidebarOpen }) => {
  const { currentUser, setActiveTab } = useAppStore();
  const role = currentUser?.role || 'Viewer';

  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'transactions', label: 'Transactions' },
    { id: 'insights', label: 'Insights' },
  ] as const;

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button
          className="menu-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <div className="brand">
          <span className="brand-name">Zorvyn</span>
        </div>
      </div>



      <div className="navbar-right">
        <div className="role-selector">
          <div className={`role-icon ${role === 'Admin' ? 'admin' : 'viewer'}`}>
            {role === 'Admin' ? <Shield size={14} /> : <Eye size={14} />}
          </div>
          <div className="role-user-text" style={{ paddingLeft: '4px', paddingRight: '8px', fontSize: '14px', fontWeight: '600' }}>
            {currentUser?.username || 'Guest'}
          </div>
        </div>

        <button
          className="theme-toggle"
          onClick={toggleDark}
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
