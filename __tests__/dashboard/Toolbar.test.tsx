import { render } from '@testing-library/react';
import { Toolbar } from '@/src/components/dashboard/Toolbar';
import { DashboardTab } from '@/src/hooks/useDashboard';

describe('Toolbar', () => {
  const tab: DashboardTab = 'overview';

  it('muestra el título de la pestaña activa', () => {
    const { getByRole } = render(<Toolbar activeTab={tab} lastUpdated={null} />);
    expect(getByRole('heading', { level: 1 })).toHaveTextContent('Resumen');
  });

  it('muestra la marca de última actualización cuando está disponible', () => {
    const lastUpdated = new Date('2024-01-01T10:00:00.000Z');
    const { getByText } = render(<Toolbar activeTab={tab} lastUpdated={lastUpdated} />);
    expect(getByText(/Última actualización/i)).toBeInTheDocument();
  });

  it('renderiza el campo de búsqueda y la campana de notificaciones', () => {
    const { getByPlaceholderText, getByRole } = render(
      <Toolbar activeTab={tab} lastUpdated={null} />
    );

    expect(getByPlaceholderText('Buscar...')).toBeInTheDocument();
    expect(getByRole('button')).toBeInTheDocument();
  });
});
