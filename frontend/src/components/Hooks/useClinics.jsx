import { useState, useEffect } from 'react';
import axios from 'axios';

const useClinics = () => {
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchClinics = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/clinics');
      setClinics(res.data);
    } catch (err) {
      setError('Failed to load clinics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClinics();
  }, []);

  return { clinics, loading, error, refetch: fetchClinics };
};

export default useClinics;
