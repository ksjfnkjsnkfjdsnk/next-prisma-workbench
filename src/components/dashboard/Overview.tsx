'use client';

import {
  ActivityLog,
  QuickSummaryMetric,
  StatMetric,
  TransactionRow
} from '@/src/hooks/useDashboard';
import { ActivityFeed } from './ActivityFeed';
import { QuickSummary } from './QuickSummary';
import { StatCard } from './StatCard';
import { TransactionsTable } from './TransactionsTable';

interface OverviewProps {
  stats: StatMetric[];
  activities: ActivityLog[];
  quickSummary: QuickSummaryMetric[];
  transactions: TransactionRow[];
  onRefresh: () => void;
  lastUpdated: Date | null;
}

export function Overview({
  stats,
  activities,
  quickSummary,
  transactions,
  onRefresh,
  lastUpdated
}: OverviewProps) {
  return (
    <div>
      <section className="overview__stats">
        {stats.map(metric => (
          <StatCard key={metric.title} metric={metric} />
        ))}
      </section>

      <section className="overview__columns" aria-label="Actividad y resumen">
        <ActivityFeed items={activities} onRefresh={onRefresh} lastUpdated={lastUpdated} />
        <QuickSummary metrics={quickSummary} />
      </section>

      <TransactionsTable rows={transactions} />
    </div>
  );
}
