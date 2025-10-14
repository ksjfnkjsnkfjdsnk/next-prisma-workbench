'use client';

import { DashboardNavItem, DashboardTab } from '@/src/hooks/useDashboard';
import { FiUser } from 'react-icons/fi';

interface SidebarProps {
  navItems: DashboardNavItem[];
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
}

export function Sidebar({ navItems, activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="dashboard__sidebar">
      <div className="dashboard__brand">
        <div className="dashboard__brand-logo">L</div>
        <span className="dashboard__brand-text">Logo</span>
      </div>

      <nav className="dashboard__nav">
        {navItems.map(item => (
          <button
            key={item.value}
            type="button"
            className={`dashboard__nav-button ${activeTab === item.value ? 'is-active' : ''}`}
            onClick={() => onTabChange(item.value)}
          >
            <item.icon />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="dashboard__profile">
        <div className="dashboard__avatar-small">
          <FiUser size={18} />
          <span className="dashboard__avatar-status" />
        </div>
        <div className="dashboard__profile-info">
          <p className="dashboard__profile-name">Usuario</p>
          <p className="dashboard__profile-email">admin@ejemplo.com</p>
        </div>
      </div>
    </aside>
  );
}
