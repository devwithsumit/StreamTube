// src/hooks/useInfiniteScroll.js
import { useState, useEffect, useRef, useCallback } from 'react';

const useInfiniteScroll = (fetchMore, hasMore = true) => {
  const [isFetching, setIsFetching] = useState(false);
  const observerRef = useRef();
  const sentinelRef = useRef();

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore && !isFetching) {
      setIsFetching(true);
    }
  }, [hasMore, isFetching]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
      rootMargin: '100px'
    });
    observerRef.current = observer;

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver]);

  useEffect(() => {
    if (!isFetching) return;

    const fetchData = async () => {
      try {
        await fetchMore();
      } catch (error) {
        console.error('Error fetching more data:', error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
  }, [isFetching, fetchMore]);

  const resetScroll = () => {
    setIsFetching(false);
  };

  return {
    isFetching,
    sentinelRef,
    resetScroll
  };
};

export default useInfiniteScroll;