import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import TransactionsPage from './pages/TransactionsPage';
import InsightsPage from './pages/InsightsPage';
import SettingsPage from './pages/SettingsPage';
import UsersPage from './pages/UsersPage';
import LoginPage from './pages/LoginPage';
import { useAppStore } from './store/useAppStore';


const App: React.FC = () => {
  const { activeTab, setActiveTab, currentUser, logout, darkMode, setDarkMode } = useAppStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const toggleDark = () => setDarkMode(!darkMode);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardPage />;
      case 'transactions':
        return <TransactionsPage />;
      case 'insights':
        return <InsightsPage />;
      case 'users':
        return <UsersPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  if (!currentUser) {
    return <LoginPage />;
  }

  return (
    <div className={`app-container ${darkMode ? 'dark' : 'light'}`}>
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <span className="brand-text">Zorvyn</span>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`sidebar-link ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => { setActiveTab('dashboard'); setSidebarOpen(false); }}
          >

            <span>Dashboard</span>
          </button>
          <button
            className={`sidebar-link ${activeTab === 'transactions' ? 'active' : ''}`}
            onClick={() => { setActiveTab('transactions'); setSidebarOpen(false); }}
          >

            <span>Transactions</span>
          </button>
          <button
            className={`sidebar-link ${activeTab === 'insights' ? 'active' : ''}`}
            onClick={() => { setActiveTab('insights'); setSidebarOpen(false); }}
          >

            <span>Insights</span>
          </button>
          {currentUser.role === 'Admin' && (
            <button
              className={`sidebar-link ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => { setActiveTab('users'); setSidebarOpen(false); }}
            >
              <span>Manage Users</span>
            </button>
          )}
        </nav>

        <div className="sidebar-footer">
          <button
            className={`sidebar-link ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => { setActiveTab('settings'); setSidebarOpen(false); }}
          >
            <span>Settings</span>
          </button>
          <button className="sidebar-link text-danger" onClick={() => logout()}>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <Navbar 
          darkMode={darkMode} 
          toggleDark={toggleDark} 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <div className="content-wrapper">
          {renderContent()}
        </div>
      </main>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
};

export default App;
