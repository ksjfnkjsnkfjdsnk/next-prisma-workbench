'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  FiActivity,
  FiBarChart2,
  FiDollarSign,
  FiHome,
  FiPieChart,
  FiSettings,
  FiShoppingCart,
  FiUsers
} from 'react-icons/fi';
import { IconType } from 'react-icons';

export type DashboardTab = 'overview' | 'analytics' | 'reports' | 'settings';

export interface StatMetric {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: IconType;
}

export interface ActivityLog {
  id: number;
  title: string;
  user: string;
  action: string;
  time: string;
}

export interface TransactionRow {
  id: string;
  name: string;
  status: 'Completado' | 'En progreso' | 'Pendiente';
  date: string;
  amount: string;
}

export interface QuickSummaryMetric {
  label: string;
  value: string;
  change: string;
}

export interface DashboardNavItem {
  label: string;
  value: DashboardTab;
  icon: IconType;
}

export const TAB_LABELS: Record<DashboardTab, string> = {
  overview: 'Resumen',
  analytics: 'Analíticas',
  reports: 'Reportes',
  settings: 'Configuración'
};

export const TAB_DETAILS: Record<DashboardTab, { description: string; placeholder: string }> = {
  overview: {
    description: 'Visualiza tus métricas clave, actividad reciente y transacciones en tiempo real.',
    placeholder: ''
  },
  analytics: {
    description: 'Explora tendencias y profundiza en los datos para tomar mejores decisiones.',
    placeholder: 'Gráfico de análisis'
  },
  reports: {
    description: 'Selecciona un período para generar reportes detallados y exportarlos fácilmente.',
    placeholder: 'Sección de reportes'
  },
  settings: {
    description: 'Ajusta las preferencias de tu cuenta y la configuración del sistema.',
    placeholder: 'Preferencias del sistema'
  }
};

export function useDashboard() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setLastUpdated(new Date());
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const stats = useMemo<StatMetric[]>(
    () => [
      {
        title: 'Ingresos Totales',
        value: '$45,231',
        change: '+20.1% desde el mes pasado',
        isPositive: true,
        icon: FiDollarSign
      },
      {
        title: 'Usuarios',
        value: '2,345',
        change: '+180.1% desde el mes pasado',
        isPositive: true,
        icon: FiUsers
      },
      {
        title: 'Ventas',
        value: '12,234',
        change: '+19% desde el mes pasado',
        isPositive: true,
        icon: FiShoppingCart
      },
      {
        title: 'Activos Ahora',
        value: '573',
        change: '+201 desde ayer',
        isPositive: true,
        icon: FiActivity
      }
    ],
    []
  );

  const activities = useMemo<ActivityLog[]>(
    () => [
      { id: 1, title: 'Nuevo pedido recibido', time: 'Hace 2 min', user: 'Juan Pérez', action: 'creado' },
      { id: 2, title: 'Pago procesado', time: 'Hace 10 min', user: 'María García', action: 'completado' },
      { id: 3, title: 'Usuario registrado', time: 'Hace 1 hora', user: 'Carlos López', action: 'registrado' },
      { id: 4, title: 'Producto agotado', time: 'Ayer', user: 'Ana Martínez', action: 'actualizado' }
    ],
    []
  );

  const transactions = useMemo<TransactionRow[]>(
    () => [
      { id: '#INV-001', name: 'Diseño de logotipo', status: 'Completado', date: '12/10/2023', amount: '$1,200' },
      { id: '#INV-002', name: 'Desarrollo web', status: 'En progreso', date: '11/10/2023', amount: '$3,500' },
      { id: '#INV-003', name: 'Marketing Digital', status: 'Pendiente', date: '10/10/2023', amount: '$2,300' },
      { id: '#INV-004', name: 'Consultoría SEO', status: 'Completado', date: '09/10/2023', amount: '$1,800' },
      { id: '#INV-005', name: 'Rediseño UI/UX', status: 'En progreso', date: '08/10/2023', amount: '$4,200' }
    ],
    []
  );

  const quickSummary = useMemo<QuickSummaryMetric[]>(
    () => [
      {
        label: 'Usuarios Activos',
        value: '1,234',
        change: '+20.1% desde el mes pasado'
      },
      {
        label: 'Tasa de Conversión',
        value: '12.5%',
        change: '+1.2% desde ayer'
      }
    ],
    []
  );

  const navItems = useMemo<DashboardNavItem[]>(
    () => [
      { label: TAB_LABELS.overview, value: 'overview', icon: FiHome },
      { label: TAB_LABELS.analytics, value: 'analytics', icon: FiPieChart },
      { label: TAB_LABELS.reports, value: 'reports', icon: FiBarChart2 },
      { label: TAB_LABELS.settings, value: 'settings', icon: FiSettings }
    ],
    []
  );

  const refreshActivities = useCallback(() => {
    setLastUpdated(new Date());
  }, []);

  return {
    activeTab,
    setActiveTab,
    isLoading,
    stats,
    activities,
    transactions,
    quickSummary,
    navItems,
    lastUpdated,
    refreshActivities
  };
}
