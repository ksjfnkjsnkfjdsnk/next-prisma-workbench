import { act, renderHook } from '@testing-library/react';
import { useDashboard } from '@/src/hooks/useDashboard';

jest.useFakeTimers();

describe('useDashboard', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('comienza en estado de carga y cambia después del timeout', () => {
    const { result } = renderHook(() => useDashboard());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.lastUpdated).toBeNull();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.lastUpdated).not.toBeNull();
  });

  it('expone métricas y navegación predefinidas', () => {
    const { result } = renderHook(() => useDashboard());

    expect(result.current.stats).toHaveLength(4);
    expect(result.current.activities).toHaveLength(4);
    expect(result.current.transactions).toHaveLength(5);
    expect(result.current.quickSummary).toHaveLength(2);
    expect(result.current.navItems.map(item => item.value)).toEqual([
      'overview',
      'analytics',
      'reports',
      'settings'
    ]);
  });

  it('actualiza lastUpdated cuando se invoca refreshActivities', () => {
    const { result } = renderHook(() => useDashboard());

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    const previous = result.current.lastUpdated;
    expect(previous).not.toBeNull();

    act(() => {
      result.current.refreshActivities();
    });

    expect(result.current.lastUpdated).not.toBe(previous);
  });
});
