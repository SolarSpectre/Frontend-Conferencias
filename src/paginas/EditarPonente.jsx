import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";
import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/components/useAuthStore";

const EditarPonente = () => {
  const { cedula } = useParams();
  const navigate = useNavigate();
  const { token} = useAuthStore();
  const [speaker, setSpeaker] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    empresa: "",
    genero: "",
    ciudad: "",
    direccion: "",
    fecha_nacimiento: "",
  });

  useEffect(() => {
    const fetchSpeaker = async () => {
      try {
        const response = await axiosInstance.get(`/speakers/${cedula}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        setSpeaker(response.data);
      } catch (error) {
        console.error("Error al obtener el conferencista:", error);
      }
    };

    fetchSpeaker();
  }, [cedula]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSpeaker((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(speaker)
      const response = await axiosInstance.patch(`/speakers/update/${speaker._id}`, speaker, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success("Conferencista actualizado exitosamente");
      navigate(`/dashboard/speakers/${speaker.cedula}`);
    } catch (error) {
      console.error("Error al actualizar el conferencista:", error);
      toast.error("Algo salió mal. No se pudo actualizar.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="font-bold text-2xl mb-6">Editar Conferencista</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="nombre">Nombre</Label>
          <Input
            id="nombre"
            name="nombre"
            type="text"
            value={speaker.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="apellido">Apellido</Label>
          <Input
            id="apellido"
            name="apellido"
            type="text"
            value={speaker.apellido}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={speaker.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="telefono">Teléfono</Label>
          <Input
            id="telefono"
            name="telefono"
            type="text"
            value={speaker.telefono}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="empresa">Empresa</Label>
          <Input
            id="empresa"
            name="empresa"
            type="text"
            value={speaker.empresa}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="genero">Género</Label>
          <select
            id="genero"
            name="genero"
            value={speaker.genero}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
            <option value="otro">Otro</option>
          </select>
        </div>

        <div className="mb-4">
          <Label htmlFor="ciudad">Ciudad</Label>
          <Input
            id="ciudad"
            name="ciudad"
            type="text"
            value={speaker.ciudad}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="direccion">Dirección</Label>
          <Textarea
            id="direccion"
            name="direccion"
            value={speaker.direccion}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="fecha_nacimiento">Fecha de Nacimiento</Label>
          <Input
            id="fecha_nacimiento"
            name="fecha_nacimiento"
            type="date"
            value={speaker.fecha_nacimiento}
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

export default EditarPonente;
