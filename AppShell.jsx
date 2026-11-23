import { useState } from 'react';
import { Link } from 'react-router';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Toast from './Toast';

export default function AppShell({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className="app-main"><Topbar onMenuClick={() => setMenuOpen(true)} /><main id="main-content" className="main-content"><div className="main-content__inner">{children}</div></main><footer className="app-footer"><span>© 2026 Wayline Logistics</span><span>Built for dependable delivery operations</span><Link to="/profile">Account settings</Link></footer></div>
      <Toast />
    </div>
  );
}
