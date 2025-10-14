import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Overview } from '@/src/components/dashboard/Overview';
import { FiActivity, FiDollarSign, FiShoppingCart, FiUsers } from 'react-icons/fi';

describe('Overview', () => {
  const stats = [
    { title: 'Ingresos Totales', value: '$45,231', change: '+20%', isPositive: true, icon: FiDollarSign },
    { title: 'Usuarios', value: '2,345', change: '+15%', isPositive: true, icon: FiUsers },
    { title: 'Ventas', value: '12,234', change: '+5%', isPositive: true, icon: FiShoppingCart },
    { title: 'Activos Ahora', value: '573', change: '+30', isPositive: true, icon: FiActivity }
  ];

  const activities = [
    { id: 1, title: 'Nuevo pedido recibido', user: 'Juan Pérez', action: 'creado', time: 'Hace 1 min' }
  ];

  const quickSummary = [
    { label: 'Usuarios Activos', value: '1,234', change: '+20%' }
  ];

  const transactions = [
    { id: '#1', name: 'Proyecto A', status: 'Completado' as const, date: '01/01/2024', amount: '$100' }
  ];

  it('renderiza estadísticas, actividad y transacciones', () => {
    const { getByText, getAllByRole } = render(
      <Overview
        stats={stats}
        activities={activities}
        quickSummary={quickSummary}
        transactions={transactions}
        onRefresh={jest.fn()}
        lastUpdated={new Date('2024-01-01T10:00:00Z')}
      />
    );

    expect(getByText('Ingresos Totales')).toBeInTheDocument();
    expect(getByText('Nuevo pedido recibido')).toBeInTheDocument();
    expect(getByText('Usuarios Activos')).toBeInTheDocument();
    expect(getByText('Transacciones Recientes')).toBeInTheDocument();
    expect(getAllByRole('row')).toHaveLength(transactions.length + 1); // header + rows
  });

  it('propaga onRefresh al botón de actividad', async () => {
    const onRefresh = jest.fn();
    const user = userEvent.setup();
    const { getByRole } = render(
      <Overview
        stats={stats}
        activities={activities}
        quickSummary={quickSummary}
        transactions={transactions}
        onRefresh={onRefresh}
        lastUpdated={new Date('2024-01-01T10:00:00Z')}
      />
    );

    await user.click(getByRole('button', { name: /Actualizar/i }));
    expect(onRefresh).toHaveBeenCalledTimes(1);
  });
});
