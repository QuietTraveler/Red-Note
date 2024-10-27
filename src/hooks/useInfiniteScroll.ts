import { useEffect, useRef, useState } from 'react';

interface UseInfiniteScrollOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useInfiniteScroll(
  callback: () => Promise<void>,
  options: UseInfiniteScrollOptions = {}
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const currentTarget = targetRef.current;

    observer.current = new IntersectionObserver(
      async (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !loading) {
          try {
            setLoading(true);
            setError(null);
            await callback();
          } catch (err) {
            setError(err instanceof Error ? err : new Error('An error occurred'));
          } finally {
            setLoading(false);
          }
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px',
      }
    );

    if (currentTarget) {
      observer.current.observe(currentTarget);
    }

    return () => {
      if (currentTarget && observer.current) {
        observer.current.unobserve(currentTarget);
      }
    };
  }, [callback, loading, options.threshold, options.rootMargin]);

  return {
    targetRef,
    loading,
    error,
  };
}