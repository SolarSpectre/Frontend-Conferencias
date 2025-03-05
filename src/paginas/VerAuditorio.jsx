import { useAuthStore } from '@/components/useAuthStore';
import { axiosInstance } from '@/lib/axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuditoriumForm = ({ auditorium, action }) => {
  const [formData, setFormData] = useState({
    codigo: '',
    nombre: '',
    ubicacion: '',
    capacidad: '',
    descripcion: '',
  });
  const { token} = useAuthStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (auditorium) {
      setFormData(auditorium);
    }
  }, [auditorium]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (action === 'add') {
        await axiosInstance.post('/auditoriums/register', formData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        navigate('/');
      } else if (action === 'edit') {
        await axiosInstance.put(`/auditoriums/${auditorium._id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        navigate('/');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Codigo</label>
        <input
          type="text"
          name="codigo"
          value={formData.codigo}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Nombre</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Ubicacion</label>
        <input
          type="text"
          name="ubicacion"
          value={formData.ubicacion}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Capacidad</label>
        <input
          type="number"
          name="capacidad"
          value={formData.capacidad}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Descripcion</label>
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">{action === 'add' ? 'Registrar' : 'Actualizar'} Auditorio</button>
    </form>
  );
};

export default AuditoriumForm;
