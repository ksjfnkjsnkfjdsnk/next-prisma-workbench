import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ActivityFeed } from '@/src/components/dashboard/ActivityFeed';

const items = [
  { id: 1, title: 'Nuevo pedido recibido', user: 'Juan Pérez', action: 'creado', time: 'Hace 1 min' },
  { id: 2, title: 'Pago procesado', user: 'María García', action: 'completado', time: 'Hace 5 min' }
];

describe('ActivityFeed', () => {
  it('muestra la lista de actividades', () => {
    const { getByText } = render(
      <ActivityFeed items={items} onRefresh={jest.fn()} lastUpdated={new Date('2024-01-01T10:00:00')} />
    );

    items.forEach(item => {
      expect(getByText(item.title)).toBeInTheDocument();
      expect(getByText(new RegExp(item.user))).toBeInTheDocument();
      expect(getByText(item.time)).toBeInTheDocument();
    });
  });

  it('invoca onRefresh al pulsar el botón', async () => {
    const onRefresh = jest.fn();
    const user = userEvent.setup();
    const { getByRole } = render(
      <ActivityFeed items={items} onRefresh={onRefresh} lastUpdated={new Date('2024-01-01T10:00:00')} />
    );

    await user.click(getByRole('button', { name: /Actualizar/i }));
    expect(onRefresh).toHaveBeenCalledTimes(1);
  });
});
