import { render } from '@testing-library/react';
import { TransactionsTable } from '@/src/components/dashboard/TransactionsTable';

const rows = [
  { id: '#1', name: 'Proyecto A', status: 'Completado' as const, date: '01/01/2024', amount: '$100' },
  { id: '#2', name: 'Proyecto B', status: 'En progreso' as const, date: '02/01/2024', amount: '$200' }
];

describe('TransactionsTable', () => {
  it('renderiza las filas y sus celdas', () => {
    const { getByText } = render(<TransactionsTable rows={rows} />);

    rows.forEach(row => {
      expect(getByText(row.id)).toBeInTheDocument();
      expect(getByText(row.name)).toBeInTheDocument();
      expect(getByText(row.status)).toBeInTheDocument();
      expect(getByText(row.date)).toBeInTheDocument();
      expect(getByText(row.amount)).toBeInTheDocument();
    });
  });

  it('aplica la clase adecuada según el estado', () => {
    const { getByText } = render(<TransactionsTable rows={rows} />);

    expect(getByText('Completado')).toHaveClass('data-table__status--completed');
    expect(getByText('En progreso')).toHaveClass('data-table__status--progress');
  });
});
