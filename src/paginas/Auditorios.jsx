import { useAuthStore } from '@/components/useAuthStore';
import { axiosInstance } from '@/lib/axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Auditorios = () => {
  const [auditoriums, setAuditoriums] = useState([]);
  const { token} = useAuthStore();

  useEffect(() => {
    const fetchAuditoriums = async () => {
      try {
        const response = await axiosInstance.get('/auditorium', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        setAuditoriums(response.data);
      } catch (error) {
        console.error('Error al obtener los auditorios:', error);
      }
    };

    fetchAuditoriums();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/auditorium/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAuditoriums(auditoriums.filter((auditorium) => auditorium._id !== id));
    } catch (error) {
      console.error('Error al eliminar el auditorio:', error);
    }
  };

  return (
    <div>
      <h2>Lista de Auditorios</h2>
      <Link to="/add/auditorium">Agregar Nuevo Auditorio</Link>
      <ul>
        {auditoriums.map((auditorium) => (
          <li key={auditorium._id}>
            <Link to={`/auditorium/${auditorium.codigo}`}>
              {auditorium.nombre}
            </Link>
            <button onClick={() => handleDelete(auditorium._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Auditorios;
