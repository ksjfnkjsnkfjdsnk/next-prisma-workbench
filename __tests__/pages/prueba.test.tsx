import { render, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import Prueba from '@/app/prueba/page';

jest.mock('axios');
jest.mock('next/image', () => ({ alt, ...props }: { alt: string; [key: string]: any }) => (
  <img alt={alt} {...props} />
));

describe('Prueba page', () => {
  const axiosGet = axios.get as jest.Mock;

  beforeEach(() => {
    axiosGet.mockReset();
  });

  it('muestra la pantalla de carga inicial', () => {
    axiosGet.mockImplementation(() => new Promise(() => {}));

    const { getByTestId } = render(<Prueba />);

    expect(getByTestId('prueba-loading')).toBeInTheDocument();
  });

  it('renderiza métricas y usuarios cuando la carga es exitosa', async () => {
    axiosGet
      .mockResolvedValueOnce({
        status: 200,
        data: {
          result: [
            {
              id: '1',
              nombre: 'Ana',
              apellido: 'Pérez',
              correo: 'ana@example.com',
              createdAt: new Date().toISOString()
            }
          ]
        }
      })
      .mockResolvedValueOnce({
        status: 200,
        data: {
          categories: [
            {
              id: 'cat-1',
              name: 'Tecnología',
              description: 'Equipos y licencias',
              totalProducts: 42,
              image: {
                url: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef'
              },
              updatedAt: new Date().toISOString()
            }
          ]
        }
      });

    render(<Prueba />);

    await waitFor(() => {
      expect(screen.getByText('Visión 360° de la operación digital')).toBeInTheDocument();
    });

    expect(screen.getByText('Usuarios registrados')).toBeInTheDocument();
    expect(screen.getByText(/Ana Pérez/)).toBeInTheDocument();
    expect(screen.getAllByText(/Tecnología/).length).toBeGreaterThan(0);
    expect(screen.queryByTestId('prueba-overlay')).not.toBeInTheDocument();
  });

  it('muestra mensaje de error y datos locales cuando la carga falla', async () => {
    axiosGet.mockRejectedValue(new Error('network error'));

    render(<Prueba />);

    await waitFor(() => {
      expect(
        screen.getByText('No pudimos sincronizar con la API. Mostramos datos locales.')
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/Valentina/)).toBeInTheDocument();
    });
    expect(screen.getAllByText(/Tecnología/).length).toBeGreaterThan(0);
  });
});
