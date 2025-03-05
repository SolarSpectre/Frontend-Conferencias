import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/components/useAuthStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Ponente = () => {
  const { cedula } = useParams();
  const [speaker, setSpeaker] = useState(null);
  const { token } = useAuthStore();

  useEffect(() => {
    const fetchSpeaker = async () => {
      try {
        const response = await axiosInstance.get(`/speakers/${cedula}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSpeaker(response.data);
      } catch (error) {
        console.error("Error al obtener el conferencista:", error);
      }
    };

    fetchSpeaker();
  }, [cedula, token]);

  if (!speaker) return <div>Cargando...</div>;

  return (
    <div className="p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            {speaker.nombre} {speaker.apellido}
          </CardTitle>
          <CardDescription>{speaker.empresa}</CardDescription>
        </CardHeader>

        <CardContent>
          <p className="mb-2"><strong>Email:</strong> {speaker.email}</p>
          <p className="mb-2"><strong>Teléfono:</strong> {speaker.telefono}</p>
          <p className="mb-2"><strong>Ciudad:</strong> {speaker.ciudad}</p>
          <p className="mb-2"><strong>Dirección:</strong> {speaker.direccion}</p>
          <p className="mb-2"><strong>Fecha de Nacimiento:</strong> {speaker.fecha_nacimiento}</p>
        </CardContent>

        <CardFooter>
          <p className="text-sm text-gray-500">Detalles del conferencista</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Ponente;
