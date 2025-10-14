'use client';

import { DashboardTab, TAB_LABELS } from '@/src/hooks/useDashboard';
import { FiBell, FiSearch } from 'react-icons/fi';

interface ToolbarProps {
  activeTab: DashboardTab;
  lastUpdated: Date | null;
}

export function Toolbar({ activeTab, lastUpdated }: ToolbarProps) {
  return (
    <header className="dashboard__header">
      <div>
        <h1 className="dashboard__title">{TAB_LABELS[activeTab]}</h1>
        {lastUpdated && (
          <p className="dashboard__subtitle">Última actualización: {lastUpdated.toLocaleTimeString()}</p>
        )}
      </div>
      <div className="dashboard__actions">
        <div className="dashboard__search">
          <FiSearch className="dashboard__search-icon" size={18} />
          <input type="text" className="dashboard__search-input" placeholder="Buscar..." />
        </div>
        <button type="button" className="dashboard__notification">
          <FiBell size={20} />
          <span className="dashboard__notification-indicator" />
        </button>
        <div className="dashboard__avatar">U</div>
      </div>
    </header>
  );
}
