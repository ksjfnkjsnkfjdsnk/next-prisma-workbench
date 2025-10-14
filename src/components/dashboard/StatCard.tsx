'use client';

import { FiArrowDownRight, FiArrowUpRight } from 'react-icons/fi';
import { StatMetric } from '@/src/hooks/useDashboard';

interface StatCardProps {
  metric: StatMetric;
}

export function StatCard({ metric }: StatCardProps) {
  const Icon = metric.icon;

  return (
    <article className="stat-card">
      <div className="stat-card__content">
        <div className="stat-card__details">
          <p className="stat-card__title">{metric.title}</p>
          <p className="stat-card__value">{metric.value}</p>
          <span
            className={`stat-card__change ${
              metric.isPositive ? 'stat-card__change--positive' : 'stat-card__change--negative'
            }`}
          >
            {metric.isPositive ? <FiArrowUpRight size={14} /> : <FiArrowDownRight size={14} />}
            {metric.change}
          </span>
        </div>
        <div className="stat-card__icon" data-testid="stat-card-icon">
          <Icon size={22} />
        </div>
      </div>
    </article>
  );
}
