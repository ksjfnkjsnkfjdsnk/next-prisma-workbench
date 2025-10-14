import { render } from '@testing-library/react';
import { StatCard } from '@/src/components/dashboard/StatCard';
import { FiDollarSign } from 'react-icons/fi';

describe('StatCard', () => {
  const metric = {
    title: 'Ingresos Totales',
    value: '$45,231',
    change: '+20%',
    isPositive: true,
    icon: FiDollarSign
  };

  it('muestra la información principal de la métrica', () => {
    const { getByText } = render(<StatCard metric={metric} />);

    expect(getByText('Ingresos Totales')).toBeInTheDocument();
    expect(getByText('$45,231')).toBeInTheDocument();
    expect(getByText('+20%')).toBeInTheDocument();
  });

  it('usa el icono provisto', () => {
    const { getByTestId } = render(<StatCard metric={metric} />);
    expect(getByTestId('stat-card-icon')).toBeInTheDocument();
  });
});
