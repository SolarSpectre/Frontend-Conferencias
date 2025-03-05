import { useAuthStore } from '@/components/useAuthStore';
import { axiosInstance } from '@/lib/axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';

const Auditorios = () => {
  const [auditoriums, setAuditoriums] = useState([]);
  const { token } = useAuthStore();

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
  }, [token]);

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
      <Link to="/add/auditorium"><Button type="submit" className="bg-blue-600 hover:bg-blue-700 ">
          Agregar Auditorio
        </Button></Link>
      
      {/* Tabla para mostrar los auditorios */}
      <Table>
        <TableCaption>Lista de auditorios disponibles</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Ubicación</TableHead>
            <TableHead>Capacidad</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {auditoriums.map((auditorium) => (
            <TableRow key={auditorium._id}>
              <TableCell>
                <Link to={`/auditorium/${auditorium.codigo}`}>
                  {auditorium.nombre}
                </Link>
              </TableCell>
              <TableCell>{auditorium.ubicacion}</TableCell>
              <TableCell>{auditorium.capacidad}</TableCell>
              <TableCell>{auditorium.descripcion}</TableCell>
              <TableCell>
              <Button type="submit" className="bg-red-400 hover:bg-red-600 " onClick={() => handleDelete(auditorium._id)}>Eliminar</Button>
              </TableCell>
              <TableCell>
              <Button type="submit" className="bg-blue-400 hover:bg-blue-600 " onClick={() => handleDelete(auditorium._id)}>Eliminar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Auditorios;
