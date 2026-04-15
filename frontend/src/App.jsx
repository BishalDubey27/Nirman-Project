import React, { useState, useEffect } from 'react';
import './App.css';
import { API_BASE_URL } from './config';
import { TopAppBar, BottomNavBar } from './components/Navigation';
import ExecutiveDashboard from './components/ExecutiveDashboard';
import IntakePlanning from './components/IntakePlanning';
import AgentWorkforceHub from './components/AgentWorkforceHub';
import RiskComplianceMonitor from './components/RiskComplianceMonitor';
import OnboardingTour from './components/OnboardingTour';

export default function App() {
  // Simulate login for this iteration, keeping user state
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [theme, setTheme] = useState('dark'); // Default to dark for this design
  const [runTour, setRunTour] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    console.log('User from localStorage:', user);
    if (user) {
      setCurrentUser(JSON.parse(user));
      const hasSeenTour = localStorage.getItem('hasSeenTour');
      if (!hasSeenTour) {
        setRunTour(true);
      }
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setCurrentUser(null);
  };

  const toggleTheme = () => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'));
  };

  if (!currentUser) {
    return <LoginPage setCurrentUser={setCurrentUser} />;
  }

  return (
    <div className={`app ${theme}`}>
      <OnboardingTour run={runTour} setRun={setRunTour} />
      <TopAppBar onToggleTheme={toggleTheme} />
      
      <div className="content-wrapper min-h-screen">
        {currentPage === 'dashboard' && <ExecutiveDashboard />}
        {currentPage === 'intake' && <IntakePlanning />}
        {currentPage === 'agents' && <AgentWorkforceHub />}
        {currentPage === 'compliance' && <RiskComplianceMonitor />}
      </div>

      <BottomNavBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}

function LoginPage({ setCurrentUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('employee');
  const [fullName, setFullName] = useState('');
  const [tenantId, setTenantId] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    const endpoint = isLogin ? '/auth/login' : '/auth/register';
    const payload = isLogin
      ? { email, password }
      : { email, password, full_name: fullName, role };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.detail || 'Authentication failed');

      if (!isLogin) {
        // Registration success — switch to login tab
        setMessage('✅ Account created! Please log in.');
        setIsLogin(true);
        setPassword('');
        setFullName('');
        setLoading(false);
        return;
      }

      // Login success
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.access_token);
      setCurrentUser(data.user);
    } catch (err) {
      setMessage('❌ ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="bg-surface-container-high p-8 rounded-2xl w-full max-w-md border border-white/5">
        <div className="flex items-center gap-3 mb-8 justify-center">
          <span className="material-symbols-outlined text-primary-fixed-dim text-4xl">grid_view</span>
          <h1 className="font-['Space_Grotesk'] text-2xl font-bold tracking-tighter text-primary">NIRMAN</h1>
        </div>
        
        <div className="flex bg-surface-container-low rounded-lg p-1 mb-6">
          <button 
            className={`flex-1 py-2 text-sm font-bold rounded-md transition-colors ${isLogin ? 'bg-primary-fixed-dim text-on-primary' : 'text-on-surface-variant'}`}
            onClick={() => setIsLogin(true)}
          >
            LOGIN
          </button>
          <button 
            className={`flex-1 py-2 text-sm font-bold rounded-md transition-colors ${!isLogin ? 'bg-primary-fixed-dim text-on-primary' : 'text-on-surface-variant'}`}
            onClick={() => setIsLogin(false)}
          >
            REGISTER
          </button>
        </div>

        {message && (
          <div className={`mb-4 p-3 text-sm rounded-lg border ${
            message.startsWith('✅')
              ? 'bg-secondary/10 text-secondary border-secondary/20'
              : 'bg-error/10 text-error border-error/20'
          }`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-3 text-on-surface placeholder:text-on-surface-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none appearance-none"
              >
                <option value="employee">👷 Employee</option>
                <option value="admin">🛡️ Admin</option>
                <option value="client">💼 Client</option>
              </select>
            </>
          )}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-3 text-on-surface placeholder:text-on-surface-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-3 text-on-surface placeholder:text-on-surface-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-on-surface-variant"
              onClick={() => setShowPassword(!showPassword)}
            >
              <span className="material-symbols-outlined text-sm">{showPassword ? 'visibility_off' : 'visibility'}</span>
            </button>
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 bg-primary-fixed-dim hover:bg-primary text-on-primary font-bold rounded-lg transition-colors mt-6 uppercase tracking-wider"
          >
            {loading ? 'Authenticating...' : isLogin ? 'Access Portal' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
}
