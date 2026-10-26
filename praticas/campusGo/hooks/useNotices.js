import { useCallback, useEffect, useState } from 'react';
import { api } from '../services/api';

export default function useNotices() {
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await api.get('/posts?_limit=10');
      setNotices(data);
    } catch (err) {
      setError(err.message);
    } finally {
  
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { notices, isLoading, error, reload };
}
