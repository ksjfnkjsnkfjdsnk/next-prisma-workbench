"use client";

import './prueba.scss';

import axios from 'axios';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  FiClock,
  FiLayers,
  FiMail,
  FiRefreshCcw,
  FiTrendingUp,
  FiUsers
} from 'react-icons/fi';

interface Usuario {
  id: string;
  uuid?: string;
  nombre: string;
  apellido?: string | null;
  correo: string;
  createdAt?: string | null;
}

interface Categoria {
  id: string;
  name: string;
  description: string;
  products: number;
  coverImage: string;
  updatedAt?: string | null;
}

type UsuariosPayload = { result?: Usuario[]; data?: Usuario[] } | Usuario[] | undefined;
type CategoriasPayload = { data?: any; result?: any } | any[] | undefined;

const HERO_IMAGE =
  'https://nest-app-6t3h.onrender.com/api/v1/product/image/product/carrie-product.jpg';

const FALLBACK_USUARIOS: Usuario[] = [
  {
    id: 'usr-101',
    nombre: 'Valentina',
    apellido: 'Arrieta',
    correo: 'valentina.arrieta@example.com',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString()
  },
  {
    id: 'usr-102',
    nombre: 'Ignacio',
    apellido: 'Ramírez',
    correo: 'ignacio.ramirez@example.com',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9).toISOString()
  },
  {
    id: 'usr-103',
    nombre: 'Catalina',
    apellido: 'Fernández',
    correo: 'catalina.fernandez@example.com',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString()
  },
  {
    id: 'usr-104',
    nombre: 'Gabriel',
    apellido: 'Peña',
    correo: 'gabriel.pena@example.com',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 27).toISOString()
  },
  {
    id: 'usr-105',
    nombre: 'Rocío',
    apellido: 'Herrera',
    correo: 'rocio.herrera@example.com',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 42).toISOString()
  }
];

const FALLBACK_CATEGORIAS: Categoria[] = [
  {
    id: 'cat-01',
    name: 'Tecnología',
    description: 'Hardware, software y servicios gestionados.',
    products: 148,
    coverImage: HERO_IMAGE,
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString()
  },
  {
    id: 'cat-02',
    name: 'Experiencias',
    description: 'Eventos corporativos, workshops y team building.',
    products: 63,
    coverImage: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef',
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString()
  },
  {
    id: 'cat-03',
    name: 'Logística',
    description: 'Centros de distribución y optimización de rutas.',
    products: 91,
    coverImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString()
  },
  {
    id: 'cat-04',
    name: 'Finanzas',
    description: 'Contabilidad, tesorería y analítica financiera.',
    products: 72,
    coverImage: 'https://images.unsplash.com/photo-1454165205744-3b78555e5572',
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 11).toISOString()
  },
  {
    id: 'cat-05',
    name: 'Talento',
    description: 'Selección, onboarding y evaluaciones de desempeño.',
    products: 38,
    coverImage: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61',
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString()
  }
];

interface RawUser {
  id?: string | number;
  uuid?: string;
  nombre?: string;
  name?: string;
  apellido?: string | null;
  lastname?: string;
  apellidos?: string;
  correo?: string;
  email?: string;
  createdAt?: string | null;
  fechaCreacion?: string | null;
  [key: string]: any; // For any other unexpected properties
}

const normalizeUsuarios = (payload: UsuariosPayload): Usuario[] => {
  const raw: RawUser[] = (() => {
    if (Array.isArray(payload)) return payload as RawUser[];
    if (Array.isArray(payload?.result)) return payload.result as RawUser[];
    if (Array.isArray(payload?.data)) return payload.data as RawUser[];
    return [];
  })();

  return raw
    .filter((item): item is Record<string, any> => item != null)
    .map((item, index) => ({
      id: String(item.id ?? item.uuid ?? `user-${index}`),
      nombre: item.nombre ?? item.name ?? 'Usuario',
      apellido: item.apellido ?? item.lastname ?? item.apellidos ?? null,
      correo: item.correo ?? item.email ?? 'sin-email@example.com',
      createdAt: item.createdAt ?? item.fechaCreacion ?? null
    }))
    .filter((item): item is Usuario | any => Boolean(item.nombre));
};

const normalizeCategorias = (payload: CategoriasPayload): Categoria[] => {
  const raw = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.data?.categories)
    ? payload.data.categories
    : Array.isArray(payload?.data)
    ? payload.data
    : Array.isArray(payload?.result)
    ? payload.result
    : [];

  return raw
    .map((item: any, index: any) => ({
      id: String(item?.id ?? item?._id ?? index),
      name: item?.name ?? item?.nombre ?? `Categoría ${index + 1}`,
      description:
        item?.description ??
        item?.descripcion ??
        'Descripción pendiente de sincronización con el ERP.',
      products:
        Number(item?.totalProducts ?? item?.products ?? item?.productCount ?? 0) || 0,
      coverImage:
        item?.image?.url ??
        item?.image ??
        item?.cover ??
        HERO_IMAGE,
      updatedAt: item?.updatedAt ?? item?.fechaActualizacion ?? null
    }))
    .filter((item: any) => Boolean(item.name));
};

const formatNumber = (value: number) =>
  new Intl.NumberFormat('es-AR', { maximumFractionDigits: 0 }).format(value);

const formatLastUpdated = (value: Date | null) => {
  if (!value) {
    return 'Sincronización pendiente';
  }

  return new Intl.DateTimeFormat('es-AR', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(value);
};

const formatRelativeDate = (value?: string | null) => {
  if (!value) {
    return 'Fecha sin confirmar';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return 'Fecha sin confirmar';
  }

  const diff = Date.now() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days <= 0) {
    return 'Actualizado hace unas horas';
  }

  if (days === 1) {
    return 'Actualizado hace 1 día';
  }

  if (days < 30) {
    return `Actualizado hace ${days} días`;
  }

  return new Intl.DateTimeFormat('es-AR', { dateStyle: 'medium' }).format(date);
};

const getInitials = (nombre: string, apellido?: string | null) => {
  const fullName = [nombre, apellido].filter(Boolean).join(' ');
  const matches = fullName.match(/\b\w/g);
  return matches ? matches.slice(0, 2).join('').toUpperCase() : nombre.charAt(0).toUpperCase();
};

const Prueba = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [usuariosResponse, categoriasResponse] = await Promise.all([
        axios.get('/api/usuarios'),
        axios.get('https://nest-app-6t3h.onrender.com/api/v1/category?limit=100', {
          withCredentials: true,
          headers: {
            Authorization: 'Bearer dsbfjsbhdfsbj'
          }
        })
      ]);

      const usuariosNormalizados =
        usuariosResponse.status === 200
          ? normalizeUsuarios(usuariosResponse.data)
          : [];

      const categoriasNormalizadas =
        categoriasResponse.status === 200
          ? normalizeCategorias(categoriasResponse.data)
          : [];

      setUsuarios(usuariosNormalizados.length ? usuariosNormalizados : FALLBACK_USUARIOS);
      setCategorias(
        categoriasNormalizadas.length ? categoriasNormalizadas : FALLBACK_CATEGORIAS
      );
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error al sincronizar datos del panel de prueba', err);
      setUsuarios((prev) => (prev.length ? prev : FALLBACK_USUARIOS));
      setCategorias((prev) => (prev.length ? prev : FALLBACK_CATEGORIAS));
      setError('No pudimos sincronizar con la API. Mostramos datos locales.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  const totalUsuarios = usuarios.length;
  const totalCategorias = categorias.length;
  const productosTotales = categorias.reduce((acc, categoria) => acc + categoria.products, 0);
  const usuariosActivos = usuarios.filter((usuario) => {
    if (!usuario.createdAt) {
      return false;
    }
    const created = new Date(usuario.createdAt);
    if (Number.isNaN(created.getTime())) {
      return false;
    }
    return Date.now() - created.getTime() <= 1000 * 60 * 60 * 24 * 30;
  }).length;

  const metricas = useMemo(
    () => [
      {
        label: 'Usuarios registrados',
        value: formatNumber(totalUsuarios),
        helper: `${formatNumber(usuariosActivos)} activos últimos 30 días`,
        icon: FiUsers
      },
      {
        label: 'Categorías activas',
        value: formatNumber(totalCategorias),
        helper: 'Con inventario sincronizado',
        icon: FiLayers
      },
      {
        label: 'Productos totales',
        value: formatNumber(productosTotales),
        helper: 'Sumatoria del porfolio',
        icon: FiTrendingUp
      }
    ],
    [productosTotales, totalCategorias, totalUsuarios, usuariosActivos]
  );

  const usuariosDestacados = useMemo(() => usuarios.slice(0, 4), [usuarios]);
  const usuariosRestantes = useMemo(() => usuarios.slice(4), [usuarios]);
  const categoriasDestacadas = useMemo(() => categorias.slice(0, 6), [categorias]);
  const categoriaMasRelevante = useMemo(() => {
    return categorias
      .slice()
      .sort((a, b) => b.products - a.products)
      .at(0);
  }, [categorias]);

  const handleRefresh = useCallback(() => {
    void fetchData();
  }, [fetchData]);

  if (isLoading && !lastUpdated) {
    return (
      <section className="prueba-loading" data-testid="prueba-loading">
        <div className="prueba-loading__panel">
          <div className="prueba-loading__spinner" />
          <p className="prueba-loading__message">Sincronizando panel de insights...</p>
        </div>
      </section>
    );
  }

  return (
    <div className="prueba-page">
      <div className="prueba-page__background" aria-hidden="true" />
      <div className="prueba-page__container">
        <header className="prueba-hero">
          <div className="prueba-hero__intro">
            <span className="prueba-hero__badge">Centro de Gestión de Usuarios</span>
            <h1 className="prueba-hero__title">Visión 360° de la operación digital</h1>
            <p className="prueba-hero__subtitle">
              Consolida datos de usuarios, categorías y productos con una interfaz cuidada.
              Sincroniza cuando lo necesites y mantén visibilidad total del ecosistema.
            </p>

            <div className="prueba-hero__cta">
              <button
                type="button"
                className="prueba-hero__button"
                onClick={handleRefresh}
              >
                <FiRefreshCcw aria-hidden="true" />
                Actualizar panel
              </button>
              <div className="prueba-hero__status">
                <FiClock aria-hidden="true" />
                <span>{formatLastUpdated(lastUpdated)}</span>
              </div>
            </div>

            {error ? <p className="prueba-hero__error">{error}</p> : null}
          </div>

          <div className="prueba-hero__media">
            <div className="prueba-hero__media-card">
              <Image
                src={categoriaMasRelevante?.coverImage ?? HERO_IMAGE}
                alt={categoriaMasRelevante?.name ?? 'Categoría destacada'}
                width={420}
                height={320}
                priority
              />
              <div className="prueba-hero__media-overlay">
                <span>Top categoría</span>
                <strong>{categoriaMasRelevante?.name ?? 'Tecnología'}</strong>
                <small>{formatNumber(categoriaMasRelevante?.products ?? 0)} productos</small>
              </div>
            </div>
          </div>
        </header>

        <section className="prueba-metrics" aria-label="Métricas consolidadas">
          {metricas.map((metrica) => (
            <article className="prueba-metric-card" key={metrica.label}>
              <div className="prueba-metric-card__icon" aria-hidden="true">
                <metrica.icon size={22} />
              </div>
              <div className="prueba-metric-card__content">
                <span className="prueba-metric-card__label">{metrica.label}</span>
                <strong className="prueba-metric-card__value">{metrica.value}</strong>
                <span className="prueba-metric-card__helper">{metrica.helper}</span>
              </div>
            </article>
          ))}
        </section>

        <section className="prueba-grid">
          <article className="prueba-panel prueba-panel--users" aria-label="Usuarios registrados">
            <header className="prueba-panel__header">
              <div>
                <h2 className="prueba-panel__title">Usuarios conectados</h2>
                <p className="prueba-panel__subtitle">
                  Detalles de acceso, correo y fecha de registro sincronizada.
                </p>
              </div>
              <span className="prueba-panel__count">{formatNumber(totalUsuarios)}</span>
            </header>

            <div className="prueba-user-grid">
              {usuariosDestacados.map((usuario) => (
                <div className="prueba-user-card" key={usuario.id}>
                  <div className="prueba-user-card__avatar" aria-hidden="true">
                    {getInitials(usuario.nombre, usuario.apellido)}
                  </div>
                  <div className="prueba-user-card__body">
                    <h3 className="prueba-user-card__name">
                      {usuario.nombre} {usuario.apellido ?? ''}
                    </h3>
                    <span className="prueba-user-card__email">
                      <FiMail aria-hidden="true" />
                      {usuario.correo}
                    </span>
                    <span className="prueba-user-card__date">
                      {formatRelativeDate(usuario.createdAt)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {usuariosRestantes.length ? (
              <div className="prueba-user-compact" role="list">
                {usuariosRestantes.map((usuario) => (
                  <span className="prueba-user-compact__item" key={usuario.id} role="listitem">
                    {usuario.nombre} {usuario.apellido ?? ''}
                  </span>
                ))}
              </div>
            ) : null}
          </article>

          <aside className="prueba-panel prueba-panel--categories" aria-label="Categorías destacadas">
            <header className="prueba-panel__header">
              <div>
                <h2 className="prueba-panel__title">Categorías estratégicas</h2>
                <p className="prueba-panel__subtitle">
                  Top categorías ordenadas por inventario activo.
                </p>
              </div>
              <span className="prueba-panel__count">{formatNumber(totalCategorias)}</span>
            </header>

            <div className="prueba-categories-grid">
              {categoriasDestacadas.map((categoria) => (
                <article className="prueba-category-card" key={categoria.id}>
                  <div className="prueba-category-card__media">
                    <Image
                      src={categoria.coverImage || HERO_IMAGE}
                      alt={categoria.name}
                      width={160}
                      height={120}
                    />
                  </div>
                  <div className="prueba-category-card__body">
                    <h3 className="prueba-category-card__name">{categoria.name}</h3>
                    <p className="prueba-category-card__description">{categoria.description}</p>
                    <div className="prueba-category-card__meta">
                      <span>{formatNumber(categoria.products)} productos</span>
                      <span>{formatRelativeDate(categoria.updatedAt)}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </aside>
        </section>

        <section className="prueba-activity" aria-label="Bitácora de actividad">
          <header className="prueba-activity__header">
            <h2 className="prueba-activity__title">Bitácora de sincronizaciones</h2>
            <p className="prueba-activity__subtitle">
              Observa la evolución de categorías y usuarios en el ecosistema.
            </p>
          </header>

          <ul className="prueba-timeline">
            {categorias.slice(0, 4).map((categoria) => (
              <li className="prueba-timeline__item" key={`timeline-${categoria.id}`}>
                <div className="prueba-timeline__marker" aria-hidden="true" />
                <div className="prueba-timeline__content">
                  <h3 className="prueba-timeline__title">{categoria.name}</h3>
                  <p className="prueba-timeline__description">
                    {categoria.description}
                  </p>
                  <div className="prueba-timeline__meta">
                    <span>{formatNumber(categoria.products)} productos</span>
                    <span>{formatRelativeDate(categoria.updatedAt)}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {isLoading ? (
          <div className="prueba-page__overlay" data-testid="prueba-overlay">
            <div className="prueba-page__spinner" />
            <span>Actualizando datos del panel...</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Prueba;
