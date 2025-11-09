import { useState, useEffect } from 'react';

export default function useFetchClubs() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // placeholder fetch
    setTimeout(() => {
      setClubs([]);
      setLoading(false);
    }, 200);
  }, []);
  return { clubs, loading };
}
