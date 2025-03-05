import {  useState } from "react";
import {  useNavigate } from "react-router-dom";
import { axiosInstance } from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";
import { useAuthStore } from "@/components/useAuthStore";

const SpeakerForm = () => {
  const navigate = useNavigate();
  const { token} = useAuthStore();

  const [speaker, setSpeaker] = useState({
        cedula: "",
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        empresa: "",
        genero: "",
        ciudad: "",
        direccion: "",
        fecha_nacimiento: ""
  });

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
      const response = await axiosInstance.post(`/speakers/register`, speaker, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success("Ponente creado exitosamente");
      navigate(`/dashboard/speakers/${speaker.cedula}`);
    } catch (error) {
      console.error("Error al crear el ponente:", error);
      const errorMessages = error.response.data.errors.map((err) => err.message).join("\n");
      
      // Mostramos el toast con todos los errores
      toast.error(errorMessages);
    }
  };

  return (
    <div className="p-8">
      <h1 className="font-bold text-2xl mb-6">Agregar Ponente</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="cedula">Cedula</Label>
          <Input
            id="cedula"
            name="cedula"
            type="text"
            value={speaker.cedula}
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
          <Label htmlFor="telefono">Telefono</Label>
          <Input
            id="telefono"
            name="telefono"
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
            <option value="">Selecciona un género</option>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
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

export default SpeakerForm;