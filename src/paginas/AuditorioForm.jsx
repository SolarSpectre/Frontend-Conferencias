import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";
import { useAuthStore } from "@/components/useAuthStore";

const AuditorioForm = () => {
  const navigate = useNavigate();
  const { token} = useAuthStore();

  const [auditorio, setAuditorio] = useState({
    codigo: "",
    nombre: "",
    ubicacion: "",
    capacidad: "",
    descripcion: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuditorio((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.patch(`/auditorium/register`, auditorio, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success("Auditorio actualizado exitosamente");
      navigate(`/auditorium/${auditorio.codigo}`); 
    } catch (error) {
      console.error("Error al actualizar el auditorio:", error);
      toast.error("Algo salió mal. No se pudo actualizar.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="font-bold text-2xl mb-6">Agregar Auditorio</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="codigo">Código</Label>
          <Input
            id="codigo"
            name="codigo"
            type="text"
            value={auditorio.codigo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="nombre">Nombre</Label>
          <Input
            id="nombre"
            name="nombre"
            type="text"
            value={auditorio.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="ubicacion">Ubicación</Label>
          <Input
            id="ubicacion"
            name="ubicacion"
            type="text"
            value={auditorio.ubicacion}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="capacidad">Capacidad</Label>
          <Input
            id="capacidad"
            name="capacidad"
            type="number"
            value={auditorio.capacidad}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="descripcion">Descripción</Label>
          <Textarea
            id="descripcion"
            name="descripcion"
            value={auditorio.descripcion}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            Guardar Cambios
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AuditorioForm;
