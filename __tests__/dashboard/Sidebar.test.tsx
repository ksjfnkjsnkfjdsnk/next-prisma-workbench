import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Sidebar } from '@/src/components/dashboard/Sidebar';
import { DashboardNavItem } from '@/src/hooks/useDashboard';
import { FiHome, FiPieChart } from 'react-icons/fi';

describe('Sidebar', () => {
  const navItems: DashboardNavItem[] = [
    { label: 'Resumen', value: 'overview', icon: FiHome },
    { label: 'Analíticas', value: 'analytics', icon: FiPieChart }
  ];

  it('renderiza los elementos de navegación y resalta el activo', () => {
    const { getByText, getByRole } = render(
      <Sidebar navItems={navItems} activeTab="overview" onTabChange={jest.fn()} />
    );

    expect(getByText('Resumen')).toBeInTheDocument();
    expect(getByText('Analíticas')).toBeInTheDocument();
    expect(getByRole('button', { name: 'Resumen' })).toHaveClass('is-active');
  });

  it('ejecuta onTabChange cuando se hace clic en un elemento', async () => {
    const onTabChange = jest.fn();
    const user = userEvent.setup();
    const { getByRole } = render(
      <Sidebar navItems={navItems} activeTab="overview" onTabChange={onTabChange} />
    );

    await user.click(getByRole('button', { name: 'Analíticas' }));
    expect(onTabChange).toHaveBeenCalledWith('analytics');
  });
});
