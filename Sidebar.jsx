import { NavLink } from 'react-router';
import Icon from './Icon';
import { useApp } from '../context/AppContext';

const links = [
  { to: '/', label: 'Overview', icon: 'grid', end: true },
  { to: '/shipments', label: 'Shipments', icon: 'truck' },
  { to: '/admin', label: 'Admin panel', icon: 'chart' },
];

export default function Sidebar({ open, onClose }) {
  const { shipments } = useApp();
  return (
    <>
      <button className={`sidebar-backdrop ${open ? 'is-visible' : ''}`} onClick={onClose} aria-label="Close navigation" tabIndex={open ? 0 : -1} />
      <aside className={`sidebar ${open ? 'sidebar--open' : ''}`} aria-label="Main navigation">
        <div className="brand"><span className="brand__mark"><Icon name="package" size={21} /></span><span>wayline<span className="brand__dot">.</span><small>LOGISTICS WORKSPACE</small></span></div>
        <div className="sidebar__label">WORKSPACE</div>
        <nav className="sidebar__nav">{links.map((link) => <NavLink key={link.to} to={link.to} end={link.end} onClick={onClose} className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`}><Icon name={link.icon} size={18} /><span>{link.label}</span>{link.label === 'Shipments' && <span className="nav-link__count">{shipments.length}</span>}</NavLink>)}</nav>
        <div className="sidebar__bottom"><div className="support-card"><span className="support-card__icon"><Icon name="clipboard" size={17} /></span><strong>Need a hand?</strong><p>Visit the operations guide for quick answers.</p><a href="mailto:support@wayline.example">Contact support <span aria-hidden="true">↗</span></a></div><p className="sidebar__version">WAYLINE WORKSPACE <span>v1.0.0</span></p></div>
      </aside>
    </>
  );
}
