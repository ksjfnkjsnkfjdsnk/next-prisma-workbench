'use client';

import './index.scss';

import { Overview } from '@/src/components/dashboard/Overview';
import { Sidebar } from '@/src/components/dashboard/Sidebar';
import { Toolbar } from '@/src/components/dashboard/Toolbar';
import { TAB_DETAILS, TAB_LABELS, useDashboard } from '@/src/hooks/useDashboard';

export default function Dashboard() {
  const {
    activeTab,
    setActiveTab,
    isLoading,
    stats,
    activities,
    quickSummary,
    transactions,
    navItems,
    lastUpdated,
    refreshActivities
  } = useDashboard();

  if (isLoading) {
    return (
      <section className="loading-screen">
        <div className="loading-screen__panel">
          <div className="loading-screen__spinner" />
          <p className="loading-screen__message">Cargando panel de control...</p>
        </div>
      </section>
    );
  }

  return (
    <div className="dashboard">
      <Sidebar navItems={navItems} activeTab={activeTab} onTabChange={setActiveTab} />

      <section className="dashboard__main">
        <Toolbar activeTab={activeTab} lastUpdated={lastUpdated} />

        <main className="dashboard__content">
          {activeTab === 'overview' ? (
            <Overview
              stats={stats}
              activities={activities}
              quickSummary={quickSummary}
              transactions={transactions}
              onRefresh={refreshActivities}
              lastUpdated={lastUpdated}
            />
          ) : (
            <section className="tab-panel">
              <h2 className="tab-panel__title">{TAB_LABELS[activeTab]}</h2>
              <p className="tab-panel__text">{TAB_DETAILS[activeTab].description}</p>
              <div className="tab-panel__placeholder">{TAB_DETAILS[activeTab].placeholder}</div>
            </section>
          )}
        </main>
      </section>
    </div>
  );
}
