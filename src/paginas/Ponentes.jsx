import React, { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuthStore } from "@/components/useAuthStore";
import { formatearFecha } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Ponentes = () => {
  const [speakers, setSpeakers] = useState([]);
  const { token } = useAuthStore();
  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const response = await axiosInstance.get("/speakers", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setSpeakers(response.data);
      } catch (error) {
        console.error("Error al obtener los conferencistas:", error);
      }
    };

    fetchSpeakers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/speakers/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSpeakers(speakers.filter((speaker) => speaker._id !== id));
    } catch (error) {
      console.error("Error al eliminar el conferencista:", error);
    }
  };

  return (
    <>
      <div>
        <h1 className="font-black text-4xl text-gray-500">Ponentes</h1>
        <hr className="my-4" />
        <p className="mb-8">
          Este módulo te permite visualizar los ponentes para cada conferencia.
        </p>
      </div>

      <Table>
        <TableCaption>Ponentes Registrados</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Cedula</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Apellido</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Telefono</TableHead>
            <TableHead>Empresa</TableHead>
            <TableHead>Genero</TableHead>
            <TableHead>Ciudad</TableHead>
            <TableHead>Direccion</TableHead>
            <TableHead>Fecha de Nacimiento</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {speakers.map((speaker) => (
            <TableRow key={speaker._id}>
              <TableCell className="font-medium">
                {speaker.cedula}
              </TableCell>
              <TableCell>{speaker.nombre}</TableCell>
              <TableCell>{speaker.apellido}</TableCell>
              <TableCell>{speaker.email}</TableCell>
              <TableCell>{speaker.telefono}</TableCell>
              <TableCell>{speaker.empresa}</TableCell>
              <TableCell>{speaker.genero}</TableCell>
              <TableCell>{speaker.ciudad}</TableCell>
              <TableCell>{speaker.direccion}</TableCell>
              <TableCell>{formatearFecha(speaker.fecha_nacimiento)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-4">
                  <Link
                    to={`/dashboard/speakers/${speaker.cedula}`}
                    className="text-blue-600 hover:underline"
                  >
                    Ver
                  </Link>
                  <Link
                    to={`/dashboard/edit-speaker/${speaker.cedula}`}
                    className="text-yellow-600 hover:underline"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(speaker._id)}
                    className="text-red-600 hover:underline"
                  >
                    Eliminar
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link
        to="/dashboard/add-speaker"
      >
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 ">
          Agregar Ponente
        </Button>
      </Link>

    </>
  );
};

export default Ponentes;
