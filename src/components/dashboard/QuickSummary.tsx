'use client';

import { QuickSummaryMetric } from '@/src/hooks/useDashboard';

interface QuickSummaryProps {
  metrics: QuickSummaryMetric[];
}

export function QuickSummary({ metrics }: QuickSummaryProps) {
  return (
    <aside className="quick-summary">
      <h2 className="panel-title">Estadísticas Rápidas</h2>
      <div className="quick-summary__body">
        {metrics.map(metric => (
          <div key={metric.label} className="quick-summary__metric">
            <p className="quick-summary__metric-label">{metric.label}</p>
            <p className="quick-summary__metric-value">{metric.value}</p>
            <span className="quick-summary__metric-change">{metric.change}</span>
          </div>
        ))}
        <div className="quick-summary__cta">
          <button type="button" className="quick-summary__button">
            Generar Reporte
          </button>
        </div>
      </div>
    </aside>
  );
}
