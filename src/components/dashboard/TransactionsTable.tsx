'use client';

import { TransactionRow } from '@/src/hooks/useDashboard';
import { FiPlus } from 'react-icons/fi';

interface TransactionsTableProps {
  rows: TransactionRow[];
}

export function TransactionsTable({ rows }: TransactionsTableProps) {
  return (
    <section className="data-table" aria-label="Transacciones recientes">
      <div className="data-table__head">
        <h2 className="data-table__title">Transacciones Recientes</h2>
        <button type="button" className="data-table__add">
          <FiPlus size={16} /> Nuevo
        </button>
      </div>
      <div className="data-table__wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Estado</th>
              <th>Fecha</th>
              <th>Monto</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>
                  <span
                    className={`data-table__status ${
                      row.status === 'Completado'
                        ? 'data-table__status--completed'
                        : row.status === 'En progreso'
                        ? 'data-table__status--progress'
                        : 'data-table__status--pending'
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td>{row.date}</td>
                <td>{row.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <footer className="data-table__footer">
        <span className="data-table__info">Mostrando 1 a 5 de 24 entradas</span>
        <div className="data-table__pagination">
          <button type="button" className="data-table__page">
            Anterior
          </button>
          <button type="button" className="data-table__page is-active">
            1
          </button>
          <button type="button" className="data-table__page">
            2
          </button>
          <button type="button" className="data-table__page">
            Siguiente
          </button>
        </div>
      </footer>
    </section>
  );
}
