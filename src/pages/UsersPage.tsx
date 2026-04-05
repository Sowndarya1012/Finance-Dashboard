import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useAppStore } from '../store/useAppStore';
import { UserPlus, Trash2, Shield, Eye, EyeOff, X } from 'lucide-react';
import { format, parseISO } from 'date-fns';

const UsersPage: React.FC = () => {
  const { users, addUser, deleteUser, currentUser } = useAppStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<'Admin' | 'Viewer'>('Viewer');
  const [userToDelete, setUserToDelete] = useState<any>(null);
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) return;

    if (users.find(u => u.username === username.trim())) {
      showToast('Username already exists', 'error');
      return;
    }

    addUser({ username: username.trim(), password: password.trim(), role });
    setUsername('');
    setPassword('');
    setRole('Viewer');
    showToast(`User "${username.trim()}" successfully created!`, 'success');
  };

  if (currentUser?.role !== 'Admin') {
    return <div className="empty-state-large">Access Denied</div>;
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Manage Users</h1>
        <p className="page-subtitle">Add and manage access to the Zorvyn Dashboard</p>
      </div>

      <div className="users-grid">
        {/* Add User Form */}
        <div className="settings-card" style={{ background: 'var(--card-bg)', borderRadius: '16px', border: '1px solid var(--border)', padding: '24px' }}>
          <h3 style={{ marginBottom: '20px', fontSize: '16px', fontWeight: '600' }}>Add New User</h3>
          <form onSubmit={handleAddUser} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. john_doe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-input"
                  style={{ width: '100%', paddingRight: '40px' }}
                  placeholder="Min 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', top: '10px', right: '12px', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Role</label>
              <select
                className="form-input"
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
              >
                <option value="Viewer">Viewer (Read Only)</option>
                <option value="Admin">Admin (Full Access)</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary" style={{ marginTop: '8px', justifyContent: 'center' }}>
              <UserPlus size={16} /> Create User
            </button>
          </form>
        </div>

        {/* Users List */}
        <div className="settings-card" style={{ background: 'var(--card-bg)', borderRadius: '16px', border: '1px solid var(--border)', padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600' }}>Active Users ({users.length})</h3>
          </div>
          <div className="table-wrapper" style={{ margin: 0, padding: 0 }}>
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Role</th>
                  <th>Created</th>
                  <th style={{ width: '80px', textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="table-row">
                    <td>
                      <div style={{ fontWeight: '500' }}>{u.username}</div>
                    </td>
                    <td>
                      <span className="category-badge" style={{ background: u.role === 'Admin' ? 'var(--primary-light)' : 'var(--bg-main)', color: u.role === 'Admin' ? 'var(--primary)' : 'var(--text)', border: '1px solid var(--border)', display: 'inline-flex', gap: '6px' }}>
                        {u.role === 'Admin' ? <Shield size={12} /> : <Eye size={12} />}
                        {u.role}
                      </span>
                    </td>
                    <td className="date-cell">
                      {format(parseISO(u.createdAt), 'dd MMM yyyy')}
                    </td>
                    <td className="actions-cell" style={{ justifyContent: 'center' }}>
                      <button
                        className="icon-btn delete-btn"
                        onClick={() => setUserToDelete(u)}
                        disabled={u.id === currentUser?.id || u.username === 'admin'}
                        title={u.username === 'admin' ? "Cannot delete primary admin" : "Delete user"}
                        style={{ opacity: u.id === currentUser?.id || u.username === 'admin' ? 0.3 : 1, cursor: u.id === currentUser?.id || u.username === 'admin' ? 'not-allowed' : 'pointer'}}
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {userToDelete && createPortal(
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setUserToDelete(null)}>
          <div className="modal" style={{ maxWidth: '400px' }}>
            <div className="modal-header">
              <h3 className="modal-title">Delete User</h3>
              <button className="modal-close" onClick={() => setUserToDelete(null)} aria-label="Close modal">
                <X size={20} />
              </button>
            </div>
            
            <div style={{ padding: '24px', fontSize: '15px', color: 'var(--text)' }}>
              Are you sure you want to permanently delete the user <strong style={{ color: 'var(--danger)' }}>{userToDelete.username}</strong>?
            </div>

            <div className="modal-footer" style={{ padding: '0 24px 24px', margin: 0 }}>
              <button className="btn btn-ghost" onClick={() => setUserToDelete(null)}>
                Cancel
              </button>
              <button 
                className="btn btn-primary" 
                style={{ backgroundColor: 'var(--danger)', boxShadow: '0 2px 4px var(--danger-light)' }} 
                onClick={() => { deleteUser(userToDelete.id); setUserToDelete(null); }}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {toast && createPortal(
        <div style={{
          position: 'fixed',
          bottom: '32px',
          right: '32px',
          backgroundColor: toast.type === 'success' ? '#10b981' : '#ef4444',
          color: 'white',
          padding: '16px 24px',
          borderRadius: '12px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          zIndex: 5000,
          fontWeight: '500',
          fontSize: '15px',
          animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          {toast.type === 'success' ? <Shield size={18} /> : <X size={18} />}
          {toast.message}
        </div>,
        document.body
      )}
    </div>
  );
};

export default UsersPage;
