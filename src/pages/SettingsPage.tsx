import React from 'react';
import { useAppStore } from '../store/useAppStore';

const SettingsPage: React.FC = () => {
  const { currentUser } = useAppStore();

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Manage your account and preferences</p>
      </div>

      <div className="settings-grid" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div className="settings-card" style={{ background: 'var(--card-bg)', borderRadius: '16px', border: '1px solid var(--border)', padding: '24px' }}>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600' }}>Account Profile</h3>
          <div className="form-group" style={{ maxWidth: '400px' }}>
            <div style={{ padding: '16px', background: 'var(--bg-main)', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <div style={{ marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Username:</span>
                <strong style={{ display: 'block', fontSize: '16px', marginTop: '4px' }}>{currentUser?.username}</strong>
              </div>
              <div style={{ marginTop: '16px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Role Level:</span>
                <strong style={{ display: 'block', fontSize: '16px', marginTop: '4px', color: 'var(--primary)' }}>{currentUser?.role}</strong>
              </div>
            </div>
            <p style={{ marginTop: '12px', fontSize: '13px', color: 'var(--text-muted)' }}>
              Your account role defines the level of access you have in the dashboard.
            </p>
          </div>
        </div>

        <div className="settings-card" style={{ background: 'var(--card-bg)', borderRadius: '16px', border: '1px solid var(--border)', padding: '24px' }}>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600' }}>Preferences</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }} />
              <span>Email Notifications</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }} />
              <span>Weekly Reports</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <input type="checkbox" style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }} />
              <span>Marketing Emails</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
