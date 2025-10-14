'use client';

import { ActivityLog } from '@/src/hooks/useDashboard';
import { FiRefreshCw, FiUser } from 'react-icons/fi';

interface ActivityFeedProps {
  items: ActivityLog[];
  onRefresh: () => void;
  lastUpdated: Date | null;
}

export function ActivityFeed({ items, onRefresh, lastUpdated }: ActivityFeedProps) {
  return (
    <section className="activity-panel">
      <div className="panel-header">
        <div>
          <h2 className="panel-title">Actividad Reciente</h2>
          {lastUpdated && (
            <p className="panel-subtitle">Actualizado {lastUpdated.toLocaleTimeString()}</p>
          )}
        </div>
        <button type="button" className="panel-action" onClick={onRefresh}>
          <FiRefreshCw size={16} /> Actualizar
        </button>
      </div>

      <div className="activity-list">
        {items.map(item => (
          <div key={item.id} className="activity-item">
            <div className="activity-item__icon">
              <FiUser size={18} />
            </div>
            <div className="activity-item__body">
              <p className="activity-item__title">{item.title}</p>
              <p className="activity-item__meta">
                {item.action} por <strong>{item.user}</strong>
              </p>
            </div>
            <span className="activity-item__time">{item.time}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
