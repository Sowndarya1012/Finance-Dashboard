import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { Lock, User, Eye, EyeOff } from 'lucide-react';

const LoginPage: React.FC = () => {
  const { login, users } = useAppStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const matchedUser = users.find(u => u.username === username && u.password === password);
    if (matchedUser) {
      login(matchedUser);
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-container" style={{ display: 'flex', height: '100vh', width: '100vw', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-main)' }}>
      <div className="login-card" style={{ background: 'var(--card-bg)', padding: '40px', borderRadius: '24px', width: '100%', maxWidth: '420px', border: '1px solid var(--border)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>Welcome to Zorvyn</h1>
          <p style={{ color: 'var(--text-muted)' }}>Sign in to continue to your dashboard</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {error && <div style={{ padding: '12px', background: 'var(--danger-light)', color: 'var(--danger)', borderRadius: '8px', fontSize: '14px', textAlign: 'center' }}>{error}</div>}
          
          <div className="form-group">
            <label style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '6px', display: 'block' }}>Username</label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', top: '13px', left: '14px', color: 'var(--text-muted)' }} />
              <input
                type="text"
                className="form-input"
                style={{ width: '100%', paddingLeft: '40px' }}
                placeholder="admin or viewer"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '6px', display: 'block' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', top: '13px', left: '14px', color: 'var(--text-muted)' }} />
              <input
                type={showPassword ? "text" : "password"}
                className="form-input"
                style={{ width: '100%', paddingLeft: '40px', paddingRight: '40px' }}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', top: '13px', right: '14px', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '8px', padding: '12px' }}>
            Sign In
          </button>
        </form>

        <div style={{ marginTop: '32px', padding: '16px', background: 'var(--bg-main)', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <h4 style={{ fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '12px', fontWeight: 'bold', letterSpacing: '0.05em' }}>Sample Accounts</h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px' }}>
            <span style={{ fontWeight: '500' }}>Admin:</span>
            <span style={{ color: 'var(--text-muted)' }}>admin / admin123</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
            <span style={{ fontWeight: '500' }}>Viewer:</span>
            <span style={{ color: 'var(--text-muted)' }}>viewer / viewer123</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
