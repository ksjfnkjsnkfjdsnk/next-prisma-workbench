import { render } from '@testing-library/react';
import Dashboard from '@/app/page';
import { useDashboard } from '@/src/hooks/useDashboard';
import { FiHome } from 'react-icons/fi';

jest.mock('@/src/hooks/useDashboard', () => {
  const actual = jest.requireActual('@/src/hooks/useDashboard');
  return {
    ...actual,
    useDashboard: jest.fn()
  };
});

type UseDashboardReturn = ReturnType<typeof useDashboard>;
const useDashboardMock = useDashboard as jest.MockedFunction<typeof useDashboard>;

function createState(partial: Partial<UseDashboardReturn>): UseDashboardReturn {
  return {
    activeTab: 'overview',
    setActiveTab: jest.fn(),
    isLoading: false,
    stats: [],
    activities: [],
    quickSummary: [],
    transactions: [],
    navItems: [],
    lastUpdated: null,
    refreshActivities: jest.fn(),
    ...partial
  };
}

describe('Dashboard page', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('muestra la pantalla de carga cuando isLoading es true', () => {
    useDashboardMock.mockReturnValueOnce(createState({ isLoading: true }));

    const { getByText } = render(<Dashboard />);

    expect(getByText('Cargando panel de control...')).toBeInTheDocument();
  });

  it('renderiza el contenido principal cuando los datos están listos', () => {
    useDashboardMock.mockReturnValueOnce(
      createState({
        stats: [
          { title: 'Ingresos', value: '$1000', change: '+10%', isPositive: true, icon: FiHome }
        ],
        activities: [
          { id: 1, title: 'Actividad 1', user: 'Usuario', action: 'creado', time: 'Hace 1 min' }
        ],
        quickSummary: [{ label: 'Usuarios Activos', value: '100', change: '+5%' }],
        transactions: [
          { id: '#1', name: 'Proyecto', status: 'Completado', date: '01/01/2024', amount: '$100' }
        ],
        navItems: [{ label: 'Resumen', value: 'overview', icon: FiHome }],
        lastUpdated: new Date('2024-01-01T10:00:00Z')
      })
    );

    const { getByText, getByRole } = render(<Dashboard />);

    expect(getByRole('heading', { level: 1 })).toHaveTextContent('Resumen');
    expect(getByText('Ingresos')).toBeInTheDocument();
    expect(getByText('Actividad 1')).toBeInTheDocument();
    expect(getByText('Transacciones Recientes')).toBeInTheDocument();
  });
});
