import { render, screen } from '@testing-library/react';
import { QuickSummary } from '@/src/components/dashboard/QuickSummary';

const metrics = [
  { label: 'Usuarios Activos', value: '1,234', change: '+20%' },
  { label: 'Tasa de Conversión', value: '12.5%', change: '+1%' }
];

describe('QuickSummary', () => {
  it('muestra cada métrica y el botón de acción', () => {
    render(<QuickSummary metrics={metrics} />);

    metrics.forEach(metric => {
      expect(screen.getByText(metric.label)).toBeInTheDocument();
      expect(screen.getByText(metric.value)).toBeInTheDocument();
      expect(screen.getByText(metric.change)).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: /Generar Reporte/i })).toBeInTheDocument();
  });
});
